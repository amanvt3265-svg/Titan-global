import Link from "next/link";
import { Phone, Mail, MapPin, Linkedin, Facebook, Instagram, ArrowUpRight, Clock } from "lucide-react";
import { nav, company } from "@/config/company";
import { services } from "@/config/content";
import { Logo } from "./Logo";

const socialIcons = { linkedin: Linkedin, facebook: Facebook, instagram: Instagram } as const;

export function Footer() {
  const f = company.footer;

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="container-px relative">
        <div className="flex flex-col gap-6 border-b border-white/10 py-14 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="heading-display text-3xl text-white sm:text-4xl">{f.ctaTitle}</h2>
            <p className="mt-3 max-w-xl text-white/60">{f.ctaText}</p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Link href="/quote" className="btn-gold">{f.quoteButton}<ArrowUpRight className="h-4 w-4" /></Link>
            <a href={company.phoneHref} className="btn-outline"><Phone className="h-4 w-4" />{f.phoneButton}</a>
          </div>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:pr-8">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-white/60">{f.blurb}</p>
            <p className="mt-5 text-xs uppercase tracking-widest text-white/40">{company.legalName}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gold">{f.quickLinksTitle}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}><Link href={item.href} className="text-white/70 transition-colors hover:text-gold">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gold">{f.servicesTitle}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}><Link href={`/services#${s.slug}`} className="text-white/70 transition-colors hover:text-gold">{s.title}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gold">{f.contactTitle}</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span className="text-white/70">{company.address.full}</span></li>
              <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={company.phoneHref} className="text-white/70 transition-colors hover:text-gold">{company.phone}</a></li>
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={company.emailHref} className="break-all text-white/70 transition-colors hover:text-gold">{company.email}</a></li>
              <li className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span className="text-white/70">{company.businessHours.weekdays.value} · {f.businessHoursSuffix}</span></li>
            </ul>

            <div className="mt-6 flex gap-3">
              {company.social.map((s) => {
                const Icon = socialIcons[s.icon as keyof typeof socialIcons];
                return (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-gold hover:text-gold">
                    {Icon && <Icon className="h-4 w-4" />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-white/50 sm:flex-row">
          <p>© {f.year} {company.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {f.legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-gold">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
