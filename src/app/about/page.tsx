import Image from "next/image";
import { Target, Eye, Compass, ShieldCheck, Scale, Crosshair, BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { coreValues, timeline, certifications, pageContent } from "@/config/content";
import { company } from "@/config/company";

export const metadata = buildMetadata({ ...pageContent.about.seo, path: "/about" });

const valueIcons = [ShieldCheck, Scale, ShieldCheck, BadgeCheck, Crosshair];
const missionIcons = [Target, Eye];

export default function AboutPage() {
  const p = pageContent.about;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />

      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} description={p.hero.description} image={p.hero.image} breadcrumb={p.hero.breadcrumb} />

      {/* Company Story */}
      <section className="bg-mist py-24 sm:py-28">
        <div className="container-px grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="right">
            <span className="eyebrow"><span className="h-px w-6 bg-gold" />{p.story.eyebrow}</span>
            <h2 className="heading-display mt-4 text-3xl text-ink sm:text-4xl">{p.story.title}</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/65">
              {p.story.paragraphs.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </Reveal>

          <Reveal direction="left" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card">
              <Image src={p.story.image} alt={p.story.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-ink p-6 text-white shadow-gold sm:block">
              <div className="heading-display text-4xl text-gradient-gold">{p.story.badgeTitle}</div>
              <p className="mt-1 text-sm text-white/60">{p.story.badgeText}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-24 sm:py-28">
        <div className="container-px grid gap-6 lg:grid-cols-2">
          {p.missionVision.map((mv, i) => {
            const MvIcon = missionIcons[i];
            return (
              <Reveal key={mv.title} delay={i * 0.1}
                className={i === 0 ? "rounded-[2rem] bg-ink-gradient p-10 text-white shadow-card" : "rounded-[2rem] border border-ink/8 bg-mist p-10 shadow-card"}>
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${i === 0 ? "bg-gold-gradient text-ink" : "bg-ink text-gold"}`}>
                  <MvIcon className="h-6 w-6" />
                </div>
                <h3 className={`mt-6 font-display text-2xl font-semibold ${i === 0 ? "" : "text-ink"}`}>{mv.title}</h3>
                <p className={`mt-4 leading-relaxed ${i === 0 ? "text-white/70" : "text-ink/65"}`}>{mv.description}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-mist py-24 sm:py-28">
        <div className="container-px">
          <SectionHeading eyebrow={p.valuesHeading.eyebrow} title={p.valuesHeading.title} description={p.valuesHeading.description} />
          <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, i) => {
              const ValIcon = valueIcons[i] ?? Compass;
              return (
                <RevealItem key={value.title}>
                  <article className="group h-full rounded-3xl border border-ink/5 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-gold">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-gold transition-colors group-hover:bg-gold-gradient group-hover:text-ink">
                        <ValIcon className="h-5 w-5" />
                      </span>
                      <h3 className="font-display text-xl font-semibold text-ink">{value.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-ink/60">{value.description}</p>
                  </article>
                </RevealItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="container-px relative">
          <SectionHeading eyebrow={p.timelineHeading.eyebrow} title={p.timelineHeading.title} light />
          <div className="mx-auto mt-16 max-w-3xl">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.05}>
                <div className="relative flex gap-6 pb-10 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span className="inline-flex h-4 w-4 shrink-0 rounded-full bg-gold-gradient ring-4 ring-gold/15" />
                    {i < timeline.length - 1 && <span className="mt-1 w-px flex-1 bg-white/15" />}
                  </div>
                  <div className="-mt-1 pb-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{item.year}</span>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-white/60">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white py-24 sm:py-28">
        <div className="container-px">
          <SectionHeading eyebrow={p.certificationsHeading.eyebrow} title={p.certificationsHeading.title} description={p.certificationsHeading.description} />
          <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((c) => (
              <RevealItem key={c.title}>
                <div className="h-full rounded-3xl border border-ink/5 bg-mist p-7 transition-all duration-300 hover:border-gold/30 hover:shadow-card">
                  <BadgeCheck className="h-7 w-7 text-gold" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{c.detail}</p>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaSection title={p.cta.title} description={p.cta.description} />
    </>
  );
}
