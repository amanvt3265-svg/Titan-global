// ═══════════════════════════════════════════════════════════════
//  Server-side security utilities for form submissions.
//  Sanitisation, HTML escaping, spam/bot heuristics, rate limiting,
//  origin checking, Cloudflare Turnstile verification and safe
//  structured logging. Used only inside Server Actions — this module
//  imports "server-only" so it can never be bundled to the client.
// ═══════════════════════════════════════════════════════════════

import "server-only";
import { headers } from "next/headers";
import { company } from "@/config/company";

// ── HTML escaping (defence-in-depth for email rendering) ─────
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── Field sanitisation ───────────────────────────────────────
// Strips control chars, script/tag remnants and collapses whitespace.
// Applied BEFORE validation so payloads are normalised.
export function sanitize(value: unknown, maxLen = 5000): string {
  if (typeof value !== "string") return "";
  let s = value.normalize("NFKC");
  // Remove control chars except tab (\x09), newline (\x0A) and CR (\x0D).
  // eslint-disable-next-line no-control-regex
  s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  // Strip obvious script/style/tag structures.
  s = s.replace(
    /<\s*\/?\s*(script|style|iframe|object|embed|link|meta)[^>]*>/gi,
    ""
  );
  // Neutralise angle brackets entirely — no HTML is expected in any field.
  s = s.replace(/[<>]/g, "");
  // Collapse excessive whitespace.
  s = s.replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n");
  return s.trim().slice(0, maxLen);
}

// ── Spam / injection heuristics ──────────────────────────────
// Rejects payloads that look like link spam, code injection or
// NoSQL/SQL operator smuggling. Returns a reason string, or null.
export function detectSuspicious(text: string): string | null {
  const links = (text.match(/https?:\/\//gi) || []).length;
  if (links >= 3) return "too_many_links";
  if (
    /\b(viagra|casino|crypto\s?airdrop|bitcoin\s?doubler|seo\s?services|loan\s?offer)\b/i.test(
      text
    )
  )
    return "spam_keyword";
  // Script / template injection markers.
  if (/(<script|javascript:|onerror\s*=|onload\s*=|\$\{.*\})/i.test(text))
    return "injection_marker";
  // NoSQL operator injection ($where, $ne, $gt …) and Mongo-style objects.
  if (/\$(where|ne|gt|lt|regex|or|and|in)\b/i.test(text)) return "nosql_marker";
  // Classic SQL injection tautologies / stacked queries.
  if (
    /('|")\s*(or|and)\s*('|")?\d|union\s+select|;\s*drop\s+table|--\s|\/\*/i.test(
      text
    )
  )
    return "sql_marker";
  return null;
}

// ── Sliding-window rate limiter (per IP) ─────────────────────
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_HITS = 5; // 5 submissions / minute / IP

export function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  HITS.set(ip, recent);
  if (HITS.size > 5000) {
    for (const [key, times] of HITS) {
      if (times.every((t) => now - t > WINDOW_MS)) HITS.delete(key);
    }
  }
  return recent.length > MAX_HITS;
}

// ── Request metadata (IP + origin), read from headers() ──────
export async function requestMeta(): Promise<{ ip: string; origin: string; host: string; referer: string }> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  const ip = fwd ? fwd.split(",")[0].trim() : h.get("x-real-ip") || "unknown";
  const origin = h.get("origin") || "";
  const host = h.get("host") || "";
  const referer = h.get("referer") || "";
  return { ip, origin, host, referer };
}

// ── Trusted origin list ──────────────────────────────────────
// Production domains + Vercel preview deployments.
const TRUSTED_DOMAINS = [
  "titanglobaltransport.co.nz",
  "titanglobal.co.nz",
];

// ── Origin allow-list check (CSRF defence-in-depth) ──────────
// Server Actions already carry Next.js CSRF protection; this adds a
// second, explicit same-origin check. Empty origin (same-origin
// navigations / server-to-server) is allowed.
export function isTrustedOrigin(origin: string): boolean {
  if (!origin) return true;
  try {
    const host = new URL(origin).host;

    // Local development
    if (/^localhost(:\d+)?$/.test(host) || /^127\.0\.0\.1(:\d+)?$/.test(host))
      return true;

    // Vercel preview deployments (*.vercel.app)
    if (/\.vercel\.app$/.test(host)) return true;

    // Strip www prefix for comparison
    const apex = host.replace(/^www\./, "");

    // Check against configured domain from company.url
    let configuredApex = "";
    try {
      configuredApex = new URL(company.url).host.replace(/^www\./, "");
    } catch {
      /* ignore malformed configured url */
    }

    // Build the full trusted list: hardcoded + config-driven
    const trusted = new Set(TRUSTED_DOMAINS);
    if (configuredApex) trusted.add(configuredApex);

    // Match exact domain or any subdomain of a trusted domain
    for (const domain of trusted) {
      if (apex === domain || apex.endsWith(`.${domain}`)) return true;
    }

    return false;
  } catch {
    return false;
  }
}

// ── Cloudflare Turnstile verification (optional) ─────────────
// Only enforced when TURNSTILE_SECRET_KEY is configured, so the
// site works in development without keys.
export async function verifyTurnstile(
  token: string | undefined,
  ip: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured → skip (graceful)
  if (!token) return false;

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      }
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

// ── Safe structured logging (no PII in message, no secrets) ──
export function logRequest(
  kind: string,
  status: "ok" | "rejected" | "error",
  meta: Record<string, string | number> = {}
) {
  const entry = { at: new Date().toISOString(), kind, status, ...meta };
  // Route through console; a real deployment would ship these to a
  // logging service. Never includes message bodies or credentials.
  if (status === "error") console.error("[form]", JSON.stringify(entry));
  else console.info("[form]", JSON.stringify(entry));
}
