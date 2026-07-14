import { Suspense } from "react";
import { ShieldCheck, Clock, Banknote, PhoneCall } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { company } from "@/config/company";
import { pageContent } from "@/config/content";

export const metadata = buildMetadata({ ...pageContent.quote.seo, path: "/quote" });

const assuranceIcons = [Banknote, Clock, ShieldCheck];

export default function QuotePage() {
  const p = pageContent.quote;
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Request a Quote", path: "/quote" }])} />

      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} description={p.hero.description} image={p.hero.image} breadcrumb={p.hero.breadcrumb} />

      <section className="bg-mist py-20 sm:py-24">
        <div className="container-px grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal direction="right" className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow"><span className="h-px w-6 bg-gold" />{p.intro.eyebrow}</span>
            <h2 className="heading-display mt-4 text-3xl text-ink sm:text-4xl">{p.intro.title}</h2>
            <p className="mt-4 leading-relaxed text-ink/60">{p.intro.description}</p>

            <ul className="mt-8 space-y-4">
              {p.assurances.map((a, i) => {
                const AIcon = assuranceIcons[i];
                return (
                  <li key={a.title} className="flex gap-4 rounded-2xl border border-ink/5 bg-white p-5">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-gold">
                      <AIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-display font-semibold text-ink">{a.title}</div>
                      <p className="mt-0.5 text-sm text-ink/60">{a.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 rounded-2xl bg-ink-gradient p-6 text-white">
              <div className="flex items-center gap-3">
                <PhoneCall className="h-5 w-5 text-gold" />
                <span className="text-sm text-white/70">{p.phonePrompt}</span>
              </div>
              <a href={company.phoneHref} className="mt-2 block font-display text-2xl font-semibold text-gradient-gold">{company.phone}</a>
            </div>
          </Reveal>

          <Reveal direction="left">
            <Suspense fallback={<div className="rounded-3xl border border-ink/8 bg-white p-10 text-center text-ink/50 shadow-card">{p.loading}</div>}>
              <QuoteForm />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </>
  );
}
