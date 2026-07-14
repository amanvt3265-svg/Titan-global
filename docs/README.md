# Titan Global Transport — Website

A premium, responsive website for **Titan Global Transport** (Titan Global Enterprises Limited), an Auckland-based freight and logistics company.

> **Moving New Zealand Forward** — Reliable freight. Professional transport. Trusted logistics partner.

## Tech Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS** (custom luxury design system — matte black / metallic gold)
- **Framer Motion** (scroll reveals, parallax, counters, transitions)
- **Lucide Icons**
- **React Hook Form** (client validation)
- **Nodemailer** (contact + quote emails)

## Pages

| Route | Description |
| --- | --- |
| `/` | Home — hero, why choose, services, stats, industries, process, testimonials, fleet gallery, FAQs, CTA |
| `/about` | Story, mission, vision, core values, timeline, why businesses trust Titan |
| `/services` | Eight premium service cards (description, benefits, industries, CTA) |
| `/industries` | Nine sectors served |
| `/quote` | Full quote request form |
| `/contact` | Contact form, company info, business hours, Google Map |
| `/privacy`, `/terms` | Legal pages |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
#   then edit .env.local with your SMTP credentials

# 3. Run the dev server
npm run dev        # http://localhost:3000

# 4. Production build
npm run build && npm start
```

## Environment Variables

Set these in `.env.local` (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `EMAIL_USER` | SMTP mailbox that sends the emails |
| `EMAIL_PASS` | SMTP password / app password |
| `CONTACT_RECEIVER` | Inbox that receives contact + quote submissions |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (canonical + OG tags) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | *(optional)* custom SMTP transport; defaults to Gmail |

### Gmail note

For Gmail, enable 2-Step Verification and create an **App Password**
(<https://myaccount.google.com/apppasswords>), then use it as `EMAIL_PASS`.

## Email Sending

- `POST /api/contact` — validates and emails contact enquiries.
- `POST /api/quote` — validates and emails quote requests.

Both routes run on the Node.js runtime and include:

- Server-side validation of every field
- **Honeypot** field + **rate limiting** (5 requests / minute / IP) + basic spam heuristics
- Branded HTML email templates delivered to `CONTACT_RECEIVER`

## Assets

- Imagery is loaded from Unsplash (royalty-free) via `next/image` — swap the URLs
  in `src/lib/site.ts` (`img`) for your own photography when available.
- Replace `public/favicon.png` and add `public/og-image.jpg` (1200×630) for
  richer social sharing.

## Content

All copy is original and written for Titan Global Transport. Edit services,
industries, testimonials, FAQs and contact details in a single place:
`src/lib/site.ts`.
