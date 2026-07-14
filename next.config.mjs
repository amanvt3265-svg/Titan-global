/** @type {import('next').NextConfig} */

// ── Content-Security-Policy ──────────────────────────────────
// Strict allow-list. Notes:
//  • 'unsafe-inline' is required in script-src for Next.js's inline
//    bootstrap runtime when nonces aren't used; it is intentionally
//    NOT paired with a permissive host list, and object/base/frame
//    are locked down so the XSS surface stays minimal.
//  • 'unsafe-eval' is added in DEVELOPMENT ONLY: `next dev` serves
//    eval-based source maps and React Fast Refresh, and Cloudflare
//    Turnstile's api.js evaluates code at runtime. Without it, dev
//    throws a CSP violation on load that breaks React hydration —
//    leaving every framer-motion scroll-reveal section stuck at
//    opacity:0 (blank below the hero). Production never evals, so the
//    prod CSP stays strict.
//  • Cloudflare Turnstile (script + frame) and the Google Maps embed
//    (frame) are the only third-party origins permitted.
//  • Unsplash is the only remote image host.
const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  isDev && "'unsafe-eval'",
  "https://challenges.cloudflare.com",
]
  .filter(Boolean)
  .join(" ");

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com",
  "font-src 'self' data:",
  "connect-src 'self' https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com https://www.google.com https://maps.google.com",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()",
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Disable Next.js dev indicators (turbopack popup, route info, etc.)
  devIndicators: false,
  // Pin the tracing root to this project (multiple lockfiles exist on the machine).
  outputFileTracingRoot: import.meta.dirname,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
