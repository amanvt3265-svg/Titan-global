import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { Icon } from "@/components/Icon";
import { Process } from "@/components/home/Process";
import { Stats } from "@/components/home/Stats";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { Stagger, RevealItem } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { industries, industryCapabilities, pageContent } from "@/config/content";

export const metadata = buildMetadata({ ...pageContent.industries.seo, path: "/industries" });

export default function IndustriesPage() {
  const p = pageContent.industries;
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }])} />

      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} description={p.hero.description} image={p.hero.image} breadcrumb={p.hero.breadcrumb} />

      <section className="bg-mist py-24 sm:py-28">
        <div className="container-px">
          <SectionHeading eyebrow={p.sectorsHeading.eyebrow} title={p.sectorsHeading.title} description={p.sectorsHeading.description} />

          <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <RevealItem key={ind.title}>
                <article className="group h-full overflow-hidden rounded-3xl border border-ink/5 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-gold">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-gold transition-colors duration-300 group-hover:bg-gold-gradient group-hover:text-ink">
                    <Icon name={ind.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-ink">{ind.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">{ind.description}</p>
                  <Link href={`/quote?industry=${encodeURIComponent(ind.slug)}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors group-hover:text-gold-dark">
                    {p.cardCta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Process />

      <section className="bg-white py-24 sm:py-28">
        <div className="container-px">
          <SectionHeading eyebrow={p.capabilitiesHeading.eyebrow} title={p.capabilitiesHeading.title} description={p.capabilitiesHeading.description} />
          <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industryCapabilities.map((cap) => (
              <RevealItem key={cap.title}>
                <article className="group h-full rounded-3xl border border-ink/5 bg-mist p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-card">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-gold transition-colors duration-300 group-hover:bg-gold-gradient group-hover:text-ink">
                    <Icon name={cap.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-ink">{cap.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">{cap.description}</p>
                </article>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Stats />
      <ServicesPreview />
      <CtaSection title={p.cta.title} description={p.cta.description} />
    </>
  );
}
