"use server";

// ═══════════════════════════════════════════════════════════════
//  Server Actions for the contact + quote forms.
//  Every submission passes through a defence-in-depth pipeline:
//    1. Origin check (CSRF defence-in-depth on top of Next.js's own)
//    2. Honeypot trap
//    3. Per-IP rate limiting
//    4. Field sanitisation (strip control chars / tags / scripts)
//    5. Zod schema validation (server-side, authoritative)
//    6. Suspicious-payload rejection (XSS / SQL / NoSQL / spam)
//    7. Cloudflare Turnstile verification (when configured)
//    8. HTML-escaped email delivery via SMTP (credentials server-only)
//  Backend errors are logged but never leaked to the client.
// ═══════════════════════════════════════════════════════════════

import {
  contactSchema,
  quoteSchema,
  type FormState,
} from "@/lib/validation";
import {
  sanitize,
  detectSuspicious,
  rateLimited,
  requestMeta,
  isTrustedOrigin,
  verifyTurnstile,
  logRequest,
} from "@/lib/security";
import { sendMail, emailTemplate } from "@/lib/mailer";

const GENERIC_ERROR =
  "We couldn't process your request right now. Please try again, or call us directly.";

// Silent success — used when we drop bot/spam traffic without telling
// the sender their submission was rejected.
const SILENT_OK: FormState = {
  ok: true,
  message: "Thank you — we'll be in touch shortly.",
};

// ─────────────────────────────────────────────────────────────
//  Contact
// ─────────────────────────────────────────────────────────────
export async function submitContact(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const { ip, origin } = await requestMeta();

  if (!isTrustedOrigin(origin)) {
    logRequest("contact", "rejected", { reason: "bad_origin", ip });
    return { ok: false, message: GENERIC_ERROR };
  }

  // Honeypot — hidden field only bots complete.
  if (String(formData.get("company_website") ?? "").trim()) {
    logRequest("contact", "rejected", { reason: "honeypot", ip });
    return SILENT_OK;
  }

  if (rateLimited(ip)) {
    logRequest("contact", "rejected", { reason: "rate_limited", ip });
    return {
      ok: false,
      message: "Too many requests. Please wait a moment and try again.",
    };
  }

  // Sanitise every field before validation.
  const raw = {
    name: sanitize(formData.get("name"), 100),
    phone: sanitize(formData.get("phone"), 20),
    email: sanitize(formData.get("email"), 254),
    pickup: sanitize(formData.get("pickup"), 200),
    delivery: sanitize(formData.get("delivery"), 200),
    preferredDate: sanitize(formData.get("preferredDate"), 40),
    message: sanitize(formData.get("message"), 3000),
    company_website: "",
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    logRequest("contact", "rejected", { reason: "validation", ip });
    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      fieldErrors,
      values: stripHoneypot(raw),
    };
  }

  const data = parsed.data;

  const suspicious = detectSuspicious(
    `${data.name} ${data.pickup} ${data.delivery} ${data.message}`
  );
  if (suspicious) {
    logRequest("contact", "rejected", { reason: suspicious, ip });
    return SILENT_OK; // silently drop
  }

  const token = String(formData.get("cf-turnstile-response") ?? "");
  if (!(await verifyTurnstile(token, ip))) {
    logRequest("contact", "rejected", { reason: "turnstile", ip });
    return {
      ok: false,
      message: "Verification failed. Please refresh the page and try again.",
      values: stripHoneypot(raw),
    };
  }

  try {
    await sendMail({
      subject: `New Contact Enquiry — ${data.name}`,
      replyTo: data.email,
      text: [
        `New contact enquiry from ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Pickup: ${data.pickup}`,
        `Delivery: ${data.delivery}`,
        `Preferred Date: ${data.preferredDate || "—"}`,
        "",
        data.message,
      ].join("\n"),
      html: emailTemplate("New Contact Enquiry", [
        ["Name", data.name],
        ["Phone", data.phone],
        ["Email", data.email],
        ["Pickup Location", data.pickup],
        ["Delivery Location", data.delivery],
        ["Preferred Date", data.preferredDate || ""],
        ["Message", data.message],
      ]),
    });

    logRequest("contact", "ok", { ip });
    return {
      ok: true,
      message: "Thank you! Your enquiry has reached our team.",
    };
  } catch (err) {
    // Never surface backend error detail to the client.
    logRequest("contact", "error", {
      ip,
      detail: err instanceof Error ? err.name : "unknown",
    });
    return { ok: false, message: GENERIC_ERROR, values: stripHoneypot(raw) };
  }
}

// ─────────────────────────────────────────────────────────────
//  Quote
// ─────────────────────────────────────────────────────────────
export async function submitQuote(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const { ip, origin } = await requestMeta();

  if (!isTrustedOrigin(origin)) {
    logRequest("quote", "rejected", { reason: "bad_origin", ip });
    return { ok: false, message: GENERIC_ERROR };
  }

  if (String(formData.get("company_website") ?? "").trim()) {
    logRequest("quote", "rejected", { reason: "honeypot", ip });
    return SILENT_OK;
  }

  if (rateLimited(ip)) {
    logRequest("quote", "rejected", { reason: "rate_limited", ip });
    return {
      ok: false,
      message: "Too many requests. Please wait a moment and try again.",
    };
  }

  const raw = {
    name: sanitize(formData.get("name"), 100),
    company: sanitize(formData.get("company"), 120),
    phone: sanitize(formData.get("phone"), 20),
    email: sanitize(formData.get("email"), 254),
    pickup: sanitize(formData.get("pickup"), 200),
    delivery: sanitize(formData.get("delivery"), 200),
    preferredDate: sanitize(formData.get("preferredDate"), 40),
    message: sanitize(formData.get("message"), 3000),
    company_website: "",
  };

  const parsed = quoteSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    logRequest("quote", "rejected", { reason: "validation", ip });
    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      fieldErrors,
      values: stripHoneypot(raw),
    };
  }

  const data = parsed.data;

  const suspicious = detectSuspicious(
    `${data.name} ${data.company} ${data.pickup} ${data.delivery} ${data.message}`
  );
  if (suspicious) {
    logRequest("quote", "rejected", { reason: suspicious, ip });
    return SILENT_OK;
  }

  const token = String(formData.get("cf-turnstile-response") ?? "");
  if (!(await verifyTurnstile(token, ip))) {
    logRequest("quote", "rejected", { reason: "turnstile", ip });
    return {
      ok: false,
      message: "Verification failed. Please refresh the page and try again.",
      values: stripHoneypot(raw),
    };
  }

  try {
    await sendMail({
      subject: `New Quote Request — ${data.name}${
        data.company ? ` (${data.company})` : ""
      }`,
      replyTo: data.email,
      text: [
        "New quote request",
        `Name: ${data.name}`,
        `Company: ${data.company || "—"}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email}`,
        `Pickup: ${data.pickup}`,
        `Delivery: ${data.delivery}`,
        `Preferred Date: ${data.preferredDate || "—"}`,
        "",
        `Message:\n${data.message || "—"}`,
      ].join("\n"),
      html: emailTemplate("New Quote Request", [
        ["Name", data.name],
        ["Company", data.company || ""],
        ["Phone", data.phone],
        ["Email", data.email],
        ["Pickup Location", data.pickup],
        ["Delivery Location", data.delivery],
        ["Preferred Date", data.preferredDate || ""],
        ["Message", data.message || ""],
      ]),
    });

    logRequest("quote", "ok", { ip });
    return {
      ok: true,
      message: "Thank you! Your quote request is with our team.",
    };
  } catch (err) {
    logRequest("quote", "error", {
      ip,
      detail: err instanceof Error ? err.name : "unknown",
    });
    return { ok: false, message: GENERIC_ERROR, values: stripHoneypot(raw) };
  }
}

// Remove the honeypot before echoing values back to the client.
function stripHoneypot(
  raw: Record<string, string>
): Record<string, string> {
  const { company_website: _hp, ...rest } = raw;
  return rest;
}
