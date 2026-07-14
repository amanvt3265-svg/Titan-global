# Content Editing Guide

> **No admin dashboard required.** All website content is edited in plain TypeScript
> files under `src/config/`. No database, no login, no CMS — just edit a file and
> the website updates when rebuilt.

---

## Quick-reference table

| What you want to change | File to edit |
|---|---|
| Company name, phone, email, address, hours | `src/config/company.ts` |
| Hero headline, eyebrow, subheading, buttons | `src/config/company.ts` → `hero` block |
| Footer copy, buttons, legal links | `src/config/company.ts` → `footer` block |
| SEO titles, descriptions, keywords, schema | `src/config/company.ts` → `seo` block |
| Logo, dark logo, favicon file paths | `src/config/company.ts` → brand asset fields |
| Navigation menu | `src/config/company.ts` → `nav` array |
| Services list, descriptions, benefits | `src/config/content.ts` → `services` array |
| Industries list | `src/config/content.ts` → `industries` array |
| Testimonials | `src/config/content.ts` → `testimonials` array |
| FAQs | `src/config/content.ts` → `faqs` array |
| Stats / counters | `src/config/content.ts` → `stats` array |
| Page headings (About, Services, Contact, etc.) | `src/config/content.ts` → `pageContent` object |
| Home section headings | `src/config/content.ts` → `homeSections` object |
| Form labels, placeholders, success messages | `src/config/content.ts` → `formContent` object |
| Gallery images | `src/config/content.ts` → `fleetGallery` array |
| All photos / images (local paths) | `src/config/images.ts` |

---

## 1. Company Information — `src/config/company.ts`

This is the most important file. It controls everything about your brand.

```typescript
// ── Identity ──────────────────────
companyName: "Titan Global Transport",   // Display name everywhere
legalName: "Titan Global Enterprises Limited", // Legal entity on footer
shortName: "Titan",                      // Abbreviated version
tagline: "Moving New Zealand Forward",   // Used in header strip + SEO
positioning: "..."                       // One-line positioning blurb

// ── Contact ────────────────────────
phone: "+64 220 849 292"                 // Displayed in header, footer, CTA blocks
phoneHref: "tel:+64220849292"            // Clickable phone link
email: "dispatch@titanglobal.co.nz"     // Display email
contactReceiver: "dispatch@titanglobal.co.nz"  // Where forms actually deliver
```

### How to change logo

| What | Field | Default |
|---|---|---|
| Main logo | `logo` | `"/logo.png"` |
| Favicon | `favicon` | `"/favicon.png"` |

**To swap:** Replace the file in `public/` (e.g. `public/logo.png`) with your new file,
keeping the same filename. Or update the path in `company.ts` to point to your new file.

### How to change phone / email

Edit `phone`, `phoneHref`, `email`, `emailHref` in `company.ts`.

- `phoneHref` must be a `tel:` link (e.g. `"tel:+64220849292"`)
- `emailHref` must be a `mailto:` link (e.g. `"mailto:dispatch@..."`)

### How to change business hours

```typescript
businessHours: {
  weekdays: { label: "Monday – Friday", value: "5:30am – 7:00pm" },
  saturday: { label: "Saturday", value: "6:00am – 2:00pm" },
  sunday: { label: "Sunday & Public Holidays", value: "By arrangement" },
  dispatchNote: "Dispatch operates 24/7 for contracted container and import/export freight partners.",
}
```

### How to change Google Maps

```typescript
maps: {
  embedUrl: "https://www.google.com/maps?q=Auckland+2112+New+Zealand&output=embed",
  link: "https://www.google.com/maps/place/Auckland+2112",
}
```

- `embedUrl` is the iframe embed (used on the Contact page map)
- `link` is the clickable directions link

To get a new embed URL:
1. Go to Google Maps
2. Search your location
3. Click "Share" → "Embed a map"
4. Copy the `src="..."` URL

### How to change social links

```typescript
social: [
  { name: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { name: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
  { name: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
]
```

To add a new platform, add an object with `name`, `href`, and `icon`.
The `icon` value must match a key in the icon map in `Header.tsx` / `Footer.tsx`.

---

## 2. Hero section — `src/config/company.ts` → `hero`

```typescript
hero: {
  eyebrow: "Auckland's Trusted Container Transport & Port Logistics Partner",
  headlineTop: "Moving New Zealand",
  headlineAccent: "Forward",
  subheading: "Titan Global Transport delivers reliable container transport...",
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
}
```

- `headlineTop` + `headlineAccent` = the H1 (they render together with a line break; accent is gold)
- `markers` appear as icon+label items below the buttons
- `trustStrip` appears as checkmark items below buttons
- `trustBadges` appears as a floating bar at the bottom of the hero (desktop only)

---

## 3. Services — `src/config/content.ts` → `services`

Each service has these editable fields:

```typescript
{
  slug: "container-transport",          // URL fragment (used in /services#slug)
  title: "Container Transport",         // Display name
  icon: "container",                    // Icon name (from Icon component)
  summary: "Laden and empty...",        // Short blurb for cards
  description: "Container transport is...",  // Full description
  idealFor: "Importers, exporters...",       // Who this service targets
  whyTitan: "A dedicated skeletal...",       // Titan-specific advantage
  typicalFreight: ["20ft & 40ft laden..."],  // Freight types handled
  process: ["Confirm box size..."],          // Step-by-step process
  benefits: ["20ft & 40ft skeletal..."],     // Key benefit bullets
  image: images.containerTruck,              // Photo
}
```

To add a new service:
1. Copy one of the objects in the `services` array
2. Give it a unique `slug` (lowercase, hyphens)
3. Fill in the fields

The first 6 services appear on the homepage. All 8 appear on the Services page.

---

## 4. Industries — `src/config/content.ts` → `industries`

```typescript
{
  slug: "import-export",               // Used for quote prefill (?industry=import-export)
  title: "Import & Export",            // Display name
  icon: "Ship",                        // Icon name
  description: "Container movement...", // Short description
}
```

---

## 5. Images — `src/config/images.ts`

All images load from `public/images/`. The config file simply points to local paths:

```typescript
hero: "/images/hero/hero.svg",
containerTruck: "/images/services/container-truck.svg",
```

### To replace a photo

1. Prepare your new image (1200×800px or larger recommended)
2. Drop it into the matching `public/images/SUBDIR/` folder
3. Update the path in `images.ts` if the filename changed
4. That's it — no other files need changing

### Image directory structure

```
public/images/
├── hero/hero.svg                ← Homepage hero background
├── services/
│   ├── container-truck.svg      ← Container Transport service card
│   └── ship-crane.svg           ← Heavy Freight service card
├── industries/
│   └── cranes-vessel.svg        ← Industries page hero
├── fleet/
│   ├── terminal-sunset.svg      ← CTA band + gallery
│   ├── motorway-truck.svg       ← Coverage + gallery
│   └── containers-stacked.svg   ← Stats background + gallery
├── about/
│   ├── crane-lift.svg           ← About story + Why Choose
│   └── port-operations.svg      ← About hero + Process background
└── gallery/                     ← Add more images here as needed
```

### File format recommendations

| Format | Best for | Notes |
|---|---|---|
| JPEG | Photos, hero images | Good compression, universal support |
| WebP | Photos, hero images | Better compression than JPEG (~30% smaller) |
| PNG | Graphics, logos | Lossless, larger files |

### Recommended image sizes by section

| Section | Usage | Recommended size | Aspect ratio |
|---|---|---|---|
| **Hero** | Homepage full-screen background | 2400×1600px | 3:2 |
| **Services** | Service detail cards (on Services page) | 1200×800px | 3:2 |
| **Services Preview** | Homepage service grid thumbnails | 1200×800px | 3:2 |
| **Industries** | Industries page hero | 1200×800px | 3:2 |
| **Gallery** | Fleet gallery grid | 1200×800px | 3:2 |
| **Coverage** | Homepage coverage section | 1200×800px | 3:2 |
| **Safety** | Homepage safety section | 1200×800px | 5:4 |
| **About Story** | About page story section | 1200×960px | 4:5 |
| **About Hero** | About page hero banner | 1200×800px | 3:2 |
| **CTA Band** | Full-width call-to-action background | 2400×800px | 3:1 |

> **Minimum safe size:** 1200×800px for all interior images. Next.js optimises
> images down for each device, so starting larger than needed gives best quality.

### Image best practices

- **Size:** 1200–2400px wide (Next.js optimises down for each device)
- **File size:** Under 300KB per image after optimisation
- **Tools:** Use Squoosh (squoosh.app), ImageOptim, or `sharp` CLI to compress
- **Naming:** Use kebab-case (e.g. `container-truck.jpg`), no spaces or special characters

### Image missing fallback

If an image file is missing or fails to load, the site displays a branded
**"Image Coming Soon"** card in its place. This uses the `ImageWithFallback`
component (`src/components/ImageWithFallback.tsx`) which wraps Next.js `<Image>`
and catches load errors.

The fallback is already integrated into:
- `Hero` (homepage background)
- `PageHero` (all interior page banners)
- `CtaSection` (CTA band backgrounds)

Other components can be updated to use it by replacing `<Image>` with
`<ImageWithFallback>` and adding the import.

---

## 6. Testimonials — `src/config/content.ts` → `testimonials`

```typescript
{
  quote: "Titan clears our containers off the wharf...",
  name: "Marcus Reid",
  role: "Operations Manager · Import Distributor",
}
```

Add or remove entries as needed. The carousel handles any count.

---

## 7. FAQs — `src/config/content.ts` → `faqs`

```typescript
{
  q: "Do you move both laden and empty containers?",
  a: "Yes. We handle laden import and export containers...",
}
```

The first question is open by default on page load.

---

## 8. Contact form & quote form — `src/config/content.ts` → `formContent`

All form labels, placeholders, success messages, and button text:

```typescript
formContent: {
  contact: {
    successDefault: "Thank you! We'll contact you shortly.",
    fields: {
      name: { label: "Name", placeholder: "Your full name" },
      // ...
    },
    submit: { idle: "Send Message", pending: "Sending…" },
  },
  quote: {
    successDefault: "Thank you! We'll contact you shortly.",
    fields: {
      name: { label: "Name", placeholder: "Full name" },
      // ...
    },
    submit: { idle: "Submit Quote Request", pending: "Submitting…" },
    privacy: "We respect your privacy. Your details are used only to prepare your quote.",
  },
}
```

---

## 9. SEO — `src/config/company.ts` → `seo`

```typescript
seo: {
  titleDefault: "Titan Global Transport — Container Transport & Cartage Auckland",
  titleTemplate: "%s | Titan Global Transport",  // %s is replaced with page title
  description: "Titan Global Transport is an Auckland container transport...",
  keywords: ["container transport Auckland", ...],
  ogImage: images.hero,         // Open Graph image for social sharing
  twitterHandle: "@titantransport",
  schemaType: "MovingCompany",  // Schema.org type for structured data
  priceRange: "$$",
  areaServed: "New Zealand",
  addressCountryCode: "NZ",
}
```

---

## 10. SMTP / Email Configuration

Contact and quote forms send email via Nodemailer using SMTP.

### Where it's configured

**Email sending logic:** `src/lib/mailer.ts`
**Form actions:** `src/app/actions.ts`

### Environment variables (set in `.env.local`)

```
# SMTP credentials (required for email delivery)
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_USER=your@email.com
EMAIL_PASS=your-app-password

# Optional: override the receiving inbox
# If not set, uses company.contactReceiver from src/config/company.ts
CONTACT_RECEIVER=dispatch@titanglobal.co.nz
```

### How to change the receiving email

**Option 1:** Edit `contactReceiver` in `src/config/company.ts`
**Option 2:** Set the `CONTACT_RECEIVER` environment variable (overrides config)

### How to test

1. Copy `.env.example` to `.env.local`
2. Fill in your SMTP credentials
3. Run `npm run dev`
4. Submit the contact or quote form
5. Check the receiver's inbox

If SMTP is not configured, forms log the submission to the server console instead
of sending an email — useful for development.

---

## File structure overview

```
src/
├── config/
│   ├── company.ts    ← Brand, contact, hero, footer, SEO, nav
│   ├── content.ts    ← Services, industries, page copy, forms, testimonials, FAQs
│   └── images.ts     ← All photo URLs
├── components/       ← Layout + rendering only (no hardcoded copy)
├── app/              ← Page shells (compose components, add metadata)
└── lib/              ← Utilities (SEO, validation, mailer, security)
```
