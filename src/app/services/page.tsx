import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/CtaSection";
import { Stats } from "@/components/home/Stats";
import { Safety } from "@/components/home/Safety";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { services, pageContent } from "@/config/content";

export const metadata = buildMetadata({ ...pageContent.services.seo, path: "/services" });

function servicesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.summary,
        provider: { "@type": "Organization", name: "Titan Global Transport" },
        areaServed: { "@type": "Country", name: "New Zealand" },
      },
    })),
  };
}

export default function ServicesPage() {
  const p = pageContent.services;
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <JsonLd data={servicesSchema()} />

      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} description={p.hero.description} image={p.hero.image} breadcrumb={p.hero.breadcrumb} />

      <section className="bg-mist py-24 sm:py-28">
        <div className="container-px space-y-8">
          {services.map((s, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal key={s.slug} direction={reversed ? "left" : "right"}>
                <article id={s.slug} className="group grid scroll-mt-28 overflow-hidden rounded-[2rem] border border-ink/5 bg-white shadow-card lg:grid-cols-2">
                  <div className={`relative min-h-[260px] overflow-hidden lg:min-h-[440px] ${reversed ? "lg:order-2" : ""}`}>
                    <Image src={s.image} alt={s.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                    <div className="absolute left-6 top-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ink/70 text-gold backdrop-blur-md">
                      <Icon name={s.icon} className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-8 sm:p-12">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                      {p.cardLabels.servicePrefix} {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="heading-display mt-3 text-2xl text-ink sm:text-3xl">{s.title}</h2>
                    <p className="mt-4 leading-relaxed text-ink/65">{s.description}</p>

                    <div className="mt-6">
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/40">{p.cardLabels.idealFor}</h3>
                      <p className="mt-2 text-sm text-ink/60">{s.idealFor}</p>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/40">{p.cardLabels.whyTitan}</h3>
                      <p className="mt-2 text-sm text-ink/60">{s.whyTitan}</p>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/40">{p.cardLabels.typicalFreight}</h3>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {s.typicalFreight.map((f) => (
                          <li key={f} className="rounded-full bg-mist px-3 py-1 text-xs text-ink/60">{f}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/40">{p.cardLabels.process}</h3>
                      <ol className="mt-2 space-y-1.5 text-sm text-ink/60">
                        {s.process.map((step, si) => (
                          <li key={si} className="flex items-start gap-2"><span className="mt-0.5 text-gold font-semibold">{si + 1}.</span>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/40">{p.cardLabels.benefits}</h3>
                      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                        {s.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-ink/70"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{b}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <Link href={`/quote?service=${encodeURIComponent(s.slug)}`} className="btn-gold">
                        {p.cardLabels.cta}<ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Stats />
      <Safety />
      <CtaSection title={p.cta.title} description={p.cta.description} />
    </>
  );
}
