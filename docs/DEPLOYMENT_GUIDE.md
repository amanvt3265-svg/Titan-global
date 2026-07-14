# Deployment Guide

> Complete guide to deploying, maintaining, and troubleshooting the Titan Global
> Transport website. Written for any developer — no prior knowledge of this project
> required.

---

## Table of Contents

1. [Local Development](#1-local-development)
2. [Environment Variables](#2-environment-variables)
3. [SMTP Configuration](#3-smtp-configuration)
4. [Contact Form Testing](#4-contact-form-testing)
5. [Production Build](#5-production-build)
6. [Vercel Deployment](#6-vercel-deployment)
7. [Domain Connection](#7-domain-connection)
8. [SSL / HTTPS](#8-ssl--https)
9. [Cloudflare Setup](#9-cloudflare-setup)
10. [Google Search Console](#10-google-search-console)
11. [Google Analytics](#11-google-analytics)
12. [Google Maps](#12-google-maps)
13. [Robots.txt & Sitemap](#13-robotstxt--sitemap)
14. [Backup Procedure](#14-backup-procedure)
15. [Updating the Logo](#15-updating-the-logo)
16. [Updating Content](#16-updating-content)
17. [Updating Images](#17-updating-images)
18. [Common Troubleshooting](#18-common-troubleshooting)

---

## 1. Local Development

### Prerequisites

- **Node.js** v18 or later (v20 LTS recommended)
- **npm** v9 or later
- **Git**

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd titan-global-transport

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start the dev server
npm run dev
```

The site runs at **http://localhost:3000**.

### Available commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | TypeScript type check |

### Dev server features

- **Hot module replacement** — changes appear instantly in the browser
- **Next.js dev overlay** — errors show in-browser (expected in dev)
- **No email delivery** — form submissions log to console unless SMTP is configured

---

## 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

### Variable reference

| Variable | Required | Default | Description |
|---|---|---|---|
| `EMAIL_HOST` | No (forms log to console) | — | SMTP server hostname |
| `EMAIL_PORT` | No | `587` | SMTP server port |
| `EMAIL_USER` | No | — | SMTP username |
| `EMAIL_PASS` | No | — | SMTP password or app password |
| `CONTACT_RECEIVER` | No | `company.contactReceiver` | Override the email address that receives form submissions |
| `NEXT_PUBLIC_SITE_URL` | No | `https://www.titanglobaltransport.co.nz` | Canonical site URL (used in sitemap, OG tags, canonical links) |

### Production secrets

When deploying to Vercel (or another platform), set these as **environment variables**
in the project settings. Never commit secrets to the repository.

---

## 3. SMTP Configuration

The contact and quote forms send email via **Nodemailer** using SMTP.

### Configuration

Set these in `.env.local` (local) or in your hosting provider's dashboard (production):

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=dispatch@titanglobal.co.nz
EMAIL_PASS=your-app-password
```

### Using Gmail

1. Enable **2-Step Verification** on your Google account
2. Generate an **App Password** (Google Account → Security → App Passwords)
3. Use the app password as `EMAIL_PASS`
4. Use `smtp.gmail.com` as `EMAIL_HOST` and `587` as `EMAIL_PORT`

### Using another provider

Any SMTP provider works (SendGrid, Mailgun, SMTP2GO, your web host's mail server).
Set the host, port, username, and password accordingly.

### How the receiving email is determined

1. If `CONTACT_RECEIVER` env var is set → use it
2. Otherwise → use `company.contactReceiver` from `src/config/company.ts`
3. Default: `dispatch@titanglobal.co.nz`

### Verify SMTP is working

Run the dev server and submit a form. Check the server console for:
```
✓ Quote form submitted to dispatch@titanglobal.co.nz
```
or an error message explaining what's wrong.

---

## 4. Contact Form Testing

### Without SMTP (development)

When SMTP is not configured, forms **log to the server console** instead of sending
email. The user sees a success message on screen. This is the expected behaviour
for local development.

Fill in the form fields and submit. Check your terminal for the submitted data.

### With SMTP

1. Configure `.env.local` with valid SMTP credentials
2. Start the dev server
3. Fill in the form and submit
4. Check the receiving inbox for the email

### Common issues

| Issue | Likely cause |
|---|---|
| "Email configuration incomplete" error | SMTP env vars not set |
| Form hangs on "Submitting…" | Network error or SMTP timeout |
| Spam folder | Mark as "Not spam" or add sender to contacts |
| Gmail "invalid credentials" | App password needed (not regular password) |

---

## 5. Production Build

```bash
npm run build
```

This generates a fully static site in the `.next/` directory.

### Build output

```
✓ Compiled successfully
✓ Generating static pages (14/14)
```

All 14 pages are statically generated. No server is required at runtime (except
for form handling, which uses serverless functions on Vercel).

### Preview the production build locally

```bash
npm run build
npm start
```

Site runs at **http://localhost:3000**. Test all pages, forms, and navigation.

---

## 6. Vercel Deployment

### One-click from Git

1. Push the repository to GitHub (or GitLab / Bitbucket)
2. Go to **vercel.com** and click **Add New → Project**
3. Import your repository
4. Vercel auto-detects Next.js — keep the default settings
5. Add environment variables (see [Environment Variables](#2-environment-variables))
6. Click **Deploy**

### CLI deployment

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Post-deployment checks

- [ ] Homepage loads at your domain
- [ ] All pages render (click through services, industries, about, contact)
- [ ] Contact form submits (check email arrives)
- [ ] Quote form submits (check email arrives)
- [ ] Mobile menu works
- [ ] Images load
- [ ] No console errors

### Vercel project settings

| Setting | Value |
|---|---|
| Framework preset | Next.js |
| Build command | `npm run build` |
| Output directory | `.next` |
| Node.js version | 20.x |
| Environment variables | Add EMAIL_HOST, EMAIL_USER, EMAIL_PASS, CONTACT_RECEIVER |

---

## 7. Domain Connection

1. In your Vercel project dashboard, go to **Settings → Domains**
2. Enter your domain (e.g. `titanglobaltransport.co.nz`)
3. Follow Vercel's instructions to update DNS:
   - Add a **CNAME** record for `www` pointing to `cname.vercel-dns.com`
   - Add **A records** for the apex domain pointing to Vercel's IPs:
     - `76.76.21.21`
     - `76.76.21.98`
4. Wait for DNS propagation (5 minutes to 24 hours)
5. Vercel automatically provisions an SSL certificate

### Using Cloudflare DNS (recommended)

See [Cloudflare Setup](#9-cloudflare-setup) below.

---

## 8. SSL / HTTPS

Vercel provides **automatic SSL certificates** via Let's Encrypt for all custom
domains. No configuration needed.

- Certificates renew automatically
- HTTP is redirected to HTTPS
- HSTS headers are included

If using Cloudflare, enable **Full (strict)** SSL mode in the Cloudflare dashboard
under SSL/TLS.

---

## 9. Cloudflare Setup

### Recommended DNS configuration

```
Type    Name            Content                     Proxy status
CNAME   www             your-project.vercel.app     Proxied (orange cloud)
A       @               76.76.21.21                 Proxied
A       @               76.76.21.98                 Proxied
```

### SSL settings

- **SSL/TLS → Overview:** Full (strict)
- **SSL/TLS → Edge Certificates:** Enable "Always Use HTTPS"

### Performance settings

- **Speed → Optimization:** Enable Auto Minify (HTML, CSS, JS)
- **Speed → Optimization:** Enable Brotli
- **Caching:** Set Edge Cache TTL to "Respect Existing Headers"

### Important

When Cloudflare proxying is enabled, Vercel sees Cloudflare's IPs, not the visitor's.
This is fine for this static site. If you need real visitor IPs later, configure
Vercel's `trust` middleware or Cloudflare's "X-Forwarded-For" header.

---

## 10. Google Search Console

### Add your site

1. Go to **search.google.com/search-console**
2. Add your domain (e.g. `titanglobaltransport.co.nz`)
3. Choose **Domain** property type

### Verify ownership

**Option A — DNS record (recommended):**
1. Copy the TXT record value from Search Console
2. Add it as a TXT record in your DNS provider (Cloudflare)
3. Click "Verify"

**Option B — HTML file:**
1. Download the verification HTML file
2. Place it in `public/` directory
3. Deploy the site
4. Click "Verify"

### Submit sitemap

1. In Search Console, go to **Sitemaps**
2. Enter `sitemap.xml`
3. Click "Submit"

The sitemap is automatically generated at build time (`src/app/sitemap.ts`).

---

## 11. Google Analytics

### Setup

1. Go to **analytics.google.com** and create a new property
2. Get your **Measurement ID** (starts with `G-`)
3. Add the Measurement ID to your site

### For this project

The cleanest approach is to add the Google Analytics script to `src/app/layout.tsx`:

```tsx
// In layout.tsx, inside <head> or before </body>:
const Analytics = () => (
  <>
    <script src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} async />
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `,
      }}
    />
  </>
);
```

Or use the `next/script` component with `strategy="afterInteractive"` for better
performance.

---

## 12. Google Maps

The contact page embed URL is configured in `src/config/company.ts`:

```typescript
maps: {
  embedUrl: "https://www.google.com/maps?q=Auckland+2112+New+Zealand&output=embed",
  link: "https://www.google.com/maps/place/Auckland+2112",
}
```

### To update the map

1. Go to **Google Maps**
2. Search for your location
3. Click **Share → Embed a map**
4. Copy the `src` URL
5. Replace `maps.embedUrl` in `src/config/company.ts`
6. Update `maps.link` with the standard directions URL

**Note:** The embed URL uses `?q=` for the location query and `&output=embed`
for the embed format. Free Google Maps embeds have no API key requirement.

---

## 13. Robots.txt & Sitemap

Both are auto-generated at build time:

- `src/app/robots.ts` → `/robots.txt`
- `src/app/sitemap.ts` → `/sitemap.xml`

### Robots.txt

By default, all pages are indexable. The sitemap URL is automatically included.

### Sitemap

The sitemap includes all 12 content pages. It uses the canonical URL from your
`NEXT_PUBLIC_SITE_URL` environment variable.

### Verify

After deployment, check:
```
https://yourdomain.com/robots.txt
https://yourdomain.com/sitemap.xml
```

---

## 14. Backup Procedure

### What to back up

| Item | Location | Frequency |
|---|---|---|
| Source code | GitHub repository | Every commit |
| Environment variables | Vercel dashboard + local `.env.local` | When changed |
| Custom images | `public/images/` | When added/changed |
| Content edits | `src/config/` (part of the repo) | Every commit |

### Backup steps

1. **Push to GitHub regularly:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

2. **Export environment variables** from Vercel:
   - Vercel Dashboard → Project → Settings → Environment Variables
   - Copy them to a secure password manager

3. **Back up original images** separately if they're large (Git LFS or cloud storage)

### Restore

1. Clone the repository from GitHub
2. Restore environment variables from backup
3. Restore images from backup
4. Run `npm install && npm run build`
5. Deploy

---

## 15. Updating the Logo

### Prepare your logo

You need three logo variants:

| File | Purpose | Format |
|---|---|---|
| `public/logo.png` | Brand logo (header, footer, mobile menu) | PNG |
| `public/favicon.png` | Browser tab icon, Apple touch icon | PNG |

### Steps

1. Export your logo as **SVG** files
2. Name them exactly as above
3. Replace the files in `public/`
4. If your filenames differ, update the paths in `src/config/company.ts`:
   ```typescript
   logo: "/your-logo.png",
   favicon: "/your-favicon.png",
   ```
5. Rebuild and deploy

### Dimensions

- Wordmark logos should be approximately **200×45px** (the component scales
  responsively, so the aspect ratio matters more than exact dimensions)
- Icon should be approximately **44×44px** (square)

### Favicon

Replace `public/favicon.png` with your favicon file. Recommended: at least 512×512px
(square, PNG format). Next.js and modern browsers handle PNG favicons natively.

---

## 16. Updating Content

**All editable content** lives in `src/config/`. See `docs/CONTENT_EDITING_GUIDE.md`
for the complete file-by-file reference.

### Quick reference

| What to change | File |
|---|---|
| Company name, phone, email, address | `src/config/company.ts` |
| Hero headline, eyebrow, buttons | `src/config/company.ts` → `hero` |
| SEO titles, descriptions | `src/config/company.ts` → `seo` |
| Services | `src/config/content.ts` → `services` |
| Testimonials | `src/config/content.ts` → `testimonials` |
| FAQs | `src/config/content.ts` → `faqs` |
| Page headings | `src/config/content.ts` → `pageContent` |
| Images | `src/config/images.ts` |

### Workflow

1. Edit the relevant file in `src/config/`
2. Preview with `npm run dev`
3. Build with `npm run build` (catches type errors)
4. Commit and deploy

---

## 17. Updating Images

### Replace a single image

1. Prepare your image (recommended: 1200×800px or larger, JPEG or WebP)
2. Drop it into the matching `public/images/SUBDIR/` folder
3. Use the **same filename** as the existing file, OR update the path in
   `src/config/images.ts`
4. Rebuild and deploy

### Image directories

```
public/images/
├── hero/hero.svg              → Homepage hero background
├── services/
│   ├── container-truck.svg    → Container Transport service
│   └── ship-crane.svg         → Heavy Freight service
├── industries/
│   └── cranes-vessel.svg      → Industries hero
├── fleet/
│   ├── terminal-sunset.svg    → CTA band, gallery
│   ├── motorway-truck.svg     → Coverage, gallery
│   └── containers-stacked.svg → Stats, gallery
├── about/
│   ├── crane-lift.svg         → About story, Why Choose
│   └── port-operations.svg    → About hero, Process
└── gallery/                   → Additional images (add as needed)
```

### Image best practices

- **Format:** JPEG for photos, WebP for better compression, PNG for graphics
- **Size:** 1200-2400px wide (Next.js optimises down)
- **File size:** Under 500KB per image after optimisation
- **Aspect ratio:** 3:2 or 16:9 for hero images, 4:5 for portrait cards
- **Alt text:** Set in the component or config (descriptive, not keyword-stuffed)

### Batch image replacement

1. Prepare all new images with matching filenames
2. Replace the files in each `public/images/SUBDIR/` folder
3. Run `npm run build` to verify
4. Deploy

---

## 18. Common Troubleshooting

### Build fails

| Error | Likely cause | Fix |
|---|---|---|
| `TypeScript error in ...` | Type mismatch in config | Check the field types in the config file |
| `Module not found` | Missing import | Check the import path (use `@/` alias) |
| `Image Optimization` error | Sharp not installed | `npm install sharp` (Vercel includes it) |
| `Generating static pages (X/14)` hangs | Infinite loop or error in page component | Check the page component for errors |

### Forms not sending email

1. Check SMTP env vars are set correctly
2. Verify the SMTP provider allows connections from your deployment platform
3. Check spam folder
4. Look at Vercel Function logs for error details
5. Try a different SMTP port (465 for SSL, 587 for TLS)

### Images not loading

1. Check the file exists in `public/images/SUBDIR/`
2. Check the path in `src/config/images.ts` matches the filename
3. Verify the file extension is correct (case-sensitive)
4. Run `npm run build` — Next.js copies `public/` to the output
5. If using `.svg`, ensure it's valid SVG XML

### 404 on page

1. Check the file exists in `src/app/SUBDIR/page.tsx`
2. Run `npm run build` — the page should appear in the route list
3. Check for typos in the URL

### "Hydration mismatch" warning

1. Check if the warning mentions `__processed_` or `bis_register` attributes
   on `<body>` — these are from **browser extensions**, not the application
2. Test in Incognito/private mode with extensions disabled
3. If the warning disappears in Incognito, no code change is needed
4. React 19 suppresses extension-related hydration warnings in production

### "Route" button / "Try Turbopack" popup

These are **Next.js development tools** and only appear during `npm run dev`.
They are invisible in the production build (`npm start` or deployed site).

### Slow page loads

1. Check image file sizes — optimize large images
2. Verify images use proper formats (WebP recommended)
3. Check the `next.config.ts` for image optimization settings
4. If using Cloudflare, enable caching and minification

### Need help?

- Check the Vercel deployment logs
- Look at the browser's DevTools Console for errors
- Review the Network tab for failed requests
- Check the server console for form submission errors

---

## Quick deploy checklist

- [ ] Replace placeholder SVGs with real photos in `public/images/`
- [ ] Update `src/config/company.ts` with real company details
- [ ] Update `src/config/content.ts` with real content
- [ ] Update logo and favicon in `public/`
- [ ] Configure `.env.local` with SMTP credentials
- [ ] Run `npm run build` locally (must pass)
- [ ] Deploy to Vercel
- [ ] Add environment variables in Vercel dashboard
- [ ] Connect custom domain
- [ ] Verify SSL certificate (auto-provisioned)
- [ ] Add Cloudflare DNS (if using)
- [ ] Submit sitemap to Google Search Console
- [ ] Test all pages, forms, and navigation on the live site
- [ ] Test form email delivery
- [ ] Check mobile responsiveness
