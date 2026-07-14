# Project Structure

> Titan Global Transport — Premium Next.js website for an Auckland container transport
> and logistics company. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS,
> and Framer Motion.

---

## Architecture principles

1. **All content is config-driven.** Every editable string lives in `src/config/`.
   Components contain layout and rendering logic only.
2. **No database.** Content is authored in TypeScript files and compiled at build time.
   This means zero security surface, instant page loads, and no CMS maintenance.
3. **Static by default.** All pages are statically generated at build time. No server
   required at runtime.
4. **Future-proofed for a CMS.** Clean interfaces, separated concerns, and a single
   data layer make it straightforward to swap config files for an API later.

---

## Directory layout

```
titan-global-transport/
├── public/                        # Static assets served at /
│   ├── images/
│   │   ├── hero/                  # Hero background images
│   │   ├── services/              # Service page photos
│   │   ├── industries/            # Industry page photos
│   │   ├── fleet/                 # Fleet gallery photos
│   │   └── about/                 # About page photos
│   ├── logo.png                   # Brand logo (PNG)
│   └── favicon.png                # Browser tab icon
│
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── layout.tsx             # Root layout (header, footer, fonts, JSON-LD)
│   │   ├── page.tsx               # Homepage — composes 12 section components
│   │   ├── about/page.tsx         # About page — story, mission, values, timeline
│   │   ├── services/page.tsx      # Services page — all 8 services with detail
│   │   ├── industries/page.tsx    # Industries page — sectors + capabilities
│   │   ├── contact/page.tsx       # Contact page — form, hours, map
│   │   ├── quote/page.tsx         # Quote page — form + assurances sidebar
│   │   ├── privacy/page.tsx       # Privacy policy (legal content)
│   │   ├── terms/page.tsx         # Terms of service (legal content)
│   │   ├── not-found.tsx          # Custom 404 page
│   │   ├── sitemap.ts             # Dynamic sitemap.xml
│   │   ├── robots.ts              # Dynamic robots.txt
│   │   ├── manifest.ts            # PWA manifest
│   │   ├── globals.css            # Tailwind imports + custom utilities
│   │   └── actions.ts             # Server actions (contact + quote form handling)
│   │
│   ├── config/                    # ★ ALL editable content lives here ★
│   │   ├── company.ts             # Brand identity, contact, hero, footer, SEO, nav
│   │   ├── content.ts             # Services, industries, page copy, form content
│   │   └── images.ts              # Image paths (local files in public/images/)
│   │
│   ├── components/
│   │   ├── home/                  # Homepage section components
│   │   │   ├── Hero.tsx           # Full-screen hero with parallax + trust badges
│   │   │   ├── Partners.tsx       # Trust/brand strip
│   │   │   ├── WhyChoose.tsx      # Why Titan section
│   │   │   ├── ServicesPreview.tsx # 6 featured service cards
│   │   │   ├── Stats.tsx          # Animated counters
│   │   │   ├── ContainerTypes.tsx # Container type cards
│   │   │   ├── Process.tsx        # 4-step process
│   │   │   ├── IndustriesStrip.tsx # Industry grid
│   │   │   ├── Coverage.tsx       # Nationwide coverage map
│   │   │   ├── Safety.tsx         # Certifications + promise
│   │   │   ├── Testimonials.tsx   # Client quote carousel
│   │   │   ├── FleetGallery.tsx   # Photo grid
│   │   │   └── Faqs.tsx           # Accordion FAQ
│   │   │
│   │   ├── forms/                 # Form components
│   │   │   ├── QuoteForm.tsx      # Quote request form (reads config labels)
│   │   │   ├── ContactForm.tsx    # Contact form (reads config labels)
│   │   │   ├── Field.tsx          # Shared form field primitives
│   │   │   └── Turnstile.tsx      # Cloudflare Turnstile CAPTCHA
│   │   │
│   │   ├── motion/                # Animation utilities
│   │   │   └── Reveal.tsx         # Scroll-triggered reveal animations
│   │   │
│   │   ├── Header.tsx             # Sticky header with nav, logo, utility bar
│   │   ├── Footer.tsx             # 4-column footer (all text from config)
│   │   ├── Logo.tsx               # Responsive logo renderer
│   │   ├── Icon.tsx               # Icon mapping component
│   │   ├── PageHero.tsx           # Reusable inner-page hero
│   │   ├── SectionHeading.tsx     # Consistent section title component
│   │   ├── CtaSection.tsx         # Full-width CTA band
│   │   ├── JsonLd.tsx             # JSON-LD structured data injector
│   │   └── LegalLayout.tsx        # Layout wrapper for privacy/terms pages
│   │
│   ├── lib/                       # Utilities (no React)
│   │   ├── seo.ts                 # buildMetadata(), organizationSchema(), breadcrumbSchema(), faqSchema()
│   │   ├── mailer.ts              # Nodemailer SMTP transport
│   │   ├── validation.ts          # Zod schemas + server-side validation
│   │   └── security.ts            # Honeypot, rate-limiting, sanitisation
│   │
│   └── config/                    # (alias — see above)
│
├── .env.example                   # Required environment variables
├── next.config.ts                 # Next.js configuration
├── tailwind.config.ts             # Tailwind theme + custom tokens
├── tsconfig.json                  # TypeScript configuration
├── docs/                          # Documentation
│   ├── README.md                  # Project overview
│   ├── CONTENT_EDITING_GUIDE.md   # How to edit website content
│   ├── DEPLOYMENT_GUIDE.md        # Deployment & maintenance
│   └── PROJECT_STRUCTURE.md       # This file
└── package.json                   # Dependencies and scripts
```

---

## Key technology choices

| Concern | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15 (App Router) | Static generation, server components, App Router |
| Language | TypeScript strict | Type safety catches content mismatches at build time |
| Styling | Tailwind CSS v3 | Utility-first, consistent design tokens |
| Animation | Framer Motion v11 | Scroll-triggered reveals, parallax, micro-interactions |
| Forms | Server Actions + Zod | Zero JS client-side, validation on both ends |
| Email | Nodemailer (SMTP) | Simple, no third-party API keys required |
| Security | Cloudflare Turnstile + Honeypot | Bot protection without user friction |
| Icons | Lucide React | Consistent icon set, tree-shakeable |
| Fonts | Playfair Display + Inter | Premium serif + clean sans pairing |

---

## Data flow

```
config/*.ts  ──→  Components (read at build time)
                       │
                       ▼
                 Static HTML (pre-rendered)
                       │
                       ▼
                 Client-side hydration
                       │
               ┌───────┴───────┐
               ▼               ▼
       Framer Motion     Form Server Actions
       (animations)      (POST → mailer)
```

---

## Key patterns

### Adding a new page

1. Create `src/app/your-page/page.tsx`
2. Import `buildMetadata` from `@/lib/seo` and `pageContent` from `@/config/content`
3. Add page copy to the `pageContent` object in `src/config/content.ts`
4. Compose existing components or create new ones in `src/components/`

### Adding a new service

1. Add an object to the `services` array in `src/config/content.ts`
2. The service automatically appears on the Services page
3. If it's in the first 6, it also appears on the homepage

### Adding a new icon

1. Add the icon name to the `IconName` type in `src/config/content.ts`
2. Import the Lucide icon in `src/components/Icon.tsx` and add it to the map
3. Reference it by name in config files

### Config-driven form labels

Form field labels, placeholders, and success messages all come from
`formContent` in `src/config/content.ts`. The form components (`QuoteForm.tsx`,
`ContactForm.tsx`) read from this object rather than hardcoding any strings.

---

## Image strategy

The site uses Unsplash CDN URLs by default so it works out of the box.
For production, you can:

1. Drop your own images into `public/images/SUBDIR/`
2. Update the path in `src/config/images.ts`
3. No code changes needed

See `CONTENT_EDITING_GUIDE.md` (in `docs/`) → "Images" for the directory structure.

---

## Email delivery

Forms use Next.js Server Actions (`src/app/actions.ts`) to validate and send email
via Nodemailer (`src/lib/mailer.ts`).

Two environment variables control delivery:
- `EMAIL_USER` / `EMAIL_PASS` — SMTP credentials
- `CONTACT_RECEIVER` — where email lands (falls back to `company.contactReceiver`)

Without SMTP configured, forms log to the server console — useful for local development.

---

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start development server (localhost:3000) |
| `npm run build` | Production build (static site generation) |
| `npm start` | Serve production build (localhost:3000) |
| `npm run lint` | ESLint check |
| `npx tsc --noEmit` | TypeScript type check |

---

## Future CMS migration path

The architecture is designed to make this straightforward:

1. Replace imports from `@/config/content` with API calls to your CMS
2. The `pageContent`, `homeSections`, `formContent` objects become API responses
3. No component changes needed — they already read from config objects
4. Add a `revalidate` trigger for on-demand static regeneration

Recommended CMS options: Strapi (self-hosted), Sanity (hosted), or Contentful.
Migration effort: roughly 2-3 days.
