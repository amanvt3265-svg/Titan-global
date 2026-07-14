import { Phone, Mail, MapPin, Clock, Headphones } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { company } from "@/config/company";
import { pageContent } from "@/config/content";

export const metadata = buildMetadata({ ...pageContent.contact.seo, path: "/contact" });

const iconMap = [Phone, Mail, MapPin];

export default function ContactPage() {
  const p = pageContent.contact;
  const cards = [
    { icon: iconMap[0], label: p.cards.call, value: company.phone, href: company.phoneHref },
    { icon: iconMap[1], label: p.cards.email, value: company.email, href: company.emailHref },
    { icon: iconMap[2], label: p.cards.visit, value: `${company.address.city}, ${company.address.country}`, href: company.maps.link },
  ];
  const hours = [company.businessHours.weekdays, company.businessHours.saturday, company.businessHours.sunday];

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />

      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} description={p.hero.description} image={p.hero.image} breadcrumb={p.hero.breadcrumb} />

      <section className="bg-mist py-16 sm:py-20">
        <div className="container-px grid gap-5 sm:grid-cols-3">
          {cards.map((c, i) => {
            const content = (
              <div className="flex h-full items-center gap-5 rounded-3xl border border-ink/5 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-gold">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-gold">
                  <c.icon className="h-6 w-6" />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-ink/40">{c.label}</div>
                  <div className="mt-1 font-display text-lg font-semibold text-ink">{c.value}</div>
                </div>
              </div>
            );
            return (
              <Reveal key={c.label} delay={i * 0.08}>
                {c.href ? <a href={c.href} className="block h-full">{content}</a> : content}
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-px grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal direction="right">
            <span className="eyebrow"><span className="h-px w-6 bg-gold" />{p.formIntro.eyebrow}</span>
            <h2 className="heading-display mt-4 text-3xl text-ink sm:text-4xl">{p.formIntro.title}</h2>
            <p className="mt-3 text-ink/60">{p.formIntro.description}</p>
            <div className="mt-8"><ContactForm /></div>
          </Reveal>

          <Reveal direction="left" className="space-y-6">
            <div className="rounded-3xl bg-ink-gradient p-8 text-white shadow-card">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-gold" />
                <h3 className="font-display text-xl font-semibold">{p.sidebar.hoursTitle}</h3>
              </div>
              <ul className="mt-6 space-y-4">
                {hours.map((h) => (
                  <li key={h.label} className="flex items-center justify-between border-b border-white/10 pb-3 text-sm last:border-0 last:pb-0">
                    <span className="text-white/70">{h.label}</span>
                    <span className="font-medium text-white">{h.value}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-white/5 p-4">
                <Headphones className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <p className="text-sm text-white/70">{company.businessHours.dispatchNote}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-ink/8 bg-mist p-8">
              <h3 className="font-display text-lg font-semibold text-ink">{p.sidebar.companyTitle}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div><dt className="text-ink/45">{p.sidebar.tradingName}</dt><dd className="font-medium text-ink">{company.companyName}</dd></div>
                <div><dt className="text-ink/45">{p.sidebar.registeredEntity}</dt><dd className="font-medium text-ink">{company.legalName}</dd></div>
                <div><dt className="text-ink/45">{p.sidebar.address}</dt><dd className="font-medium text-ink">{company.address.full}</dd></div>
                <div><dt className="text-ink/45">{p.sidebar.phone}</dt><dd className="font-medium text-ink"><a href={company.phoneHref} className="hover:text-gold-dark">{company.phone}</a></dd></div>
                <div><dt className="text-ink/45">{p.sidebar.email}</dt><dd className="font-medium text-ink"><a href={company.emailHref} className="hover:text-gold-dark">{company.email}</a></dd></div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist pb-20">
        <div className="container-px">
          <Reveal className="overflow-hidden rounded-[2rem] border border-ink/8 shadow-card">
            <iframe title={`${company.companyName} — ${company.address.city} location`} src={company.maps.embedUrl} width="100%" height="460" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block w-full grayscale-[0.2]" allowFullScreen />
          </Reveal>
        </div>
      </section>
    </>
  );
}
