// ═══════════════════════════════════════════════════════════════
//  TITAN GLOBAL TRANSPORT — MASTER CONFIGURATION
//  ---------------------------------------------------------------
//  This is the single source of truth for everything that changes
//  frequently. Edit values here and the whole website updates:
//    • Company name / legal entity / tagline
//    • Phone / email / address
//    • Business hours
//    • Social links
//    • Logo + favicon file paths
//    • SEO defaults (title, description, OG image)
//    • Hero copy
//    • Footer copy
//    • Google Maps embed + link
//  Nothing user-facing should be hard-coded elsewhere.
// ═══════════════════════════════════════════════════════════════

import { images } from "./images";

export const company = {
  // ── Identity ──────────────────────────────────────────────
  companyName: "Titan Global Transport",
  legalName: "Titan Global Enterprises Limited",
  shortName: "Titan",
  tagline: "Moving New Zealand Forward",
  /** One-line positioning used in intros and SEO. */
  positioning:
    "Auckland's premium container transport and cartage specialists — moving import, export and heavy freight between the ports and your door.",

  // ── Contact (edit these to update every page) ─────────────
  phone: "+64 220 910 555",
  phoneHref: "tel:+64220910555",
  dispatchPhone: "+64 220 910 555",
  dispatchPhoneHref: "tel:+64220910555",
  email: "dispatch@titanglobal.co.nz",
  emailHref: "mailto:dispatch@titanglobal.co.nz",
  /**
   * Inbox that receives contact + quote submissions. Defaults to the
   * public email above; override per-environment with CONTACT_RECEIVER.
   * The mailer reads `process.env.CONTACT_RECEIVER || company.contactReceiver`.
   */
  contactReceiver: "dispatch@titanglobal.co.nz",

  // ── Address ───────────────────────────────────────────────
  address: {
    line1: "",
    line2: "",
    city: "Auckland",
    region: "Auckland",
    postcode: "2112",
    country: "New Zealand",
    /** Single-line form for compact display. */
    full: "Auckland 2112, New Zealand",
  },

  // ── Business hours ────────────────────────────────────────
  businessHours: {
    weekdays: { label: "Monday – Friday", value: "5:30am – 7:00pm" },
    saturday: { label: "Saturday", value: "6:00am – 2:00pm" },
    sunday: { label: "Sunday & Public Holidays", value: "By arrangement" },
    /** Highlighted note shown beside the hours. */
    dispatchNote:
      "Dispatch operates 24/7 for contracted container and import/export freight partners.",
  },

  // ── Social links ──────────────────────────────────────────
  social: [
    { name: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
    { name: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
    { name: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
  ],

  // ── Brand assets ──────────────────────────────────────────
  //  logo      → official horizontal lockup (public/logo-new.png)
  //  logoMark  → same artwork, referenced in JSON-LD Organization.logo
  //  favicon   → browser tab icon (unchanged square mark)
  //  The website header/footer render this file via <Logo> —
  //  see src/components/Logo.tsx.
  logo: "/logo-new.png",
  logoDark: "/logo-new.png",
  logoMark: "/logo-new.png",
  favicon: "/favicon.svg",

  // ── Google Maps ───────────────────────────────────────────
  maps: {
    embedUrl:
      "https://www.google.com/maps?q=Auckland+2112+New+Zealand&output=embed",
    link: "https://www.google.com/maps/place/Auckland+2112",
  },

  // ── Canonical site URL ────────────────────────────────────
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.titanglobaltransport.co.nz",
  locale: "en_NZ",

  // ── SEO defaults ──────────────────────────────────────────
  seo: {
    titleDefault: "Titan Global Transport — Container Transport & Cartage Auckland",
    titleTemplate: "%s | Titan Global Transport",
    description:
      "Titan Global Transport is an Auckland container transport and cartage specialist — port deliveries, import & export logistics, container movements and heavy B2B freight across New Zealand.",
    keywords: [
      "container transport Auckland",
      "container cartage",
      "port deliveries Auckland",
      "import export logistics New Zealand",
      "heavy freight transport",
      "B2B freight Auckland",
      "container movements",
      "sideloader transport",
    ],
    ogImage: `${images.hero}`,
    twitterHandle: "@titantransport",
    schemaType: "MovingCompany",
    priceRange: "$$",
    areaServed: "New Zealand",
    addressCountryCode: "NZ",
  },

  // ── UI / accessibility ───────────────────────────────────
  ui: {
    htmlLang: "en-NZ",
    skipLink: "Skip to content",
    themeColor: "#0F0F10",
  },

  // ── Hero copy (Home) ──────────────────────────────────────
  hero: {
    eyebrow: "Auckland's Trusted Container Transport & Port Logistics Partner",
    headlineTop: "Moving New Zealand",
    headlineAccent: "Forward",
    subheading:
      "Titan Global Transport delivers reliable container transport, port cartage, import & export logistics, and heavy freight solutions across Auckland and New Zealand. With experienced dispatch, professional drivers, and a commitment to on-time delivery, we keep your supply chain moving.",
    primaryCta: { label: "Request a Free Quote", href: "/quote" },
    secondaryCta: { label: "Speak with Dispatch", href: "/contact" },
    markers: [
      { icon: "anchor", label: "Port Cartage" },
      { icon: "container", label: "Container Transport" },
      { icon: "clock", label: "24/7 Dispatch" },
    ],
    trustStrip: [
      "Port Cartage Specialists",
      "Container Transport",
      "Import & Export Logistics",
      "Professional Dispatch",
      "Real-Time Communication",
      "Reliable Delivery",
    ],
    trustBadges: [
      { icon: "users", label: "Experienced Transport Team" },
      { icon: "zap", label: "Fast Response Times" },
      { icon: "heart-handshake", label: "Customer-Focused Service" },
      { icon: "shield-check", label: "Safety & Compliance" },
    ],
  },

  // ── Trust indicators (shown directly below the hero) ──────
  trustPoints: [
    "Reliable Container Transport",
    "Port Cartage Specialists",
    "Auckland Based",
    "Fast Turnaround",
    "Professional Dispatch",
    "Experienced Team",
  ],

  // ── Service commitment (reused on home / contact / quote) ─
  responsePromise: {
    heading: "We respond fast",
    value: "Every enquiry answered within 1 business day — often within the hour.",
    /** Short form for badges. */
    short: "1 business day response",
  },

  // ── Geo (for LocalBusiness structured data / maps) ────────
  geo: { latitude: -36.9944, longitude: 174.7877 },

  // ── Default CTA band ──────────────────────────────────────
  cta: {
    eyebrow: "Get Started",
    title: "Ready to move your containers?",
    description:
      "Tell us your pickup, delivery and vessel timing. We'll build a dependable, competitively priced cartage plan and keep your freight moving on schedule.",
    primary: { label: "Get Your Free Quote", href: "/quote" },
  },

  // ── Footer copy ───────────────────────────────────────────
  footer: {
    year: "2026",
    blurb:
      "Titan Global Transport is an Auckland-based container transport and cartage specialist, moving import, export and heavy freight between the ports and businesses across New Zealand.",
    ctaTitle: "Move your containers with a partner you can trust.",
    ctaText:
      "From single container cartage to dedicated port runs, Titan keeps your freight moving on time.",
    quoteButton: "Request a Quote",
    phoneButton: "Call Dispatch",
    quickLinksTitle: "Quick Links",
    servicesTitle: "Services",
    contactTitle: "Contact",
    businessHoursSuffix: "Mon–Fri",
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
} as const;

// ── Primary navigation ──────────────────────────────────────
export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Quote", href: "/quote" },
  { label: "Contact", href: "/contact" },
] as const;

export type Company = typeof company;
