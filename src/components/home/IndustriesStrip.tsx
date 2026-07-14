import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries, homeSections } from "@/config/content";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger, RevealItem } from "@/components/motion/Reveal";

export function IndustriesStrip() {
  const s = homeSections.industries;
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="container-px">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} description={s.description} />

        <Stagger className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <RevealItem key={ind.title}>
              <div className="group flex h-full items-start gap-4 rounded-2xl border border-ink/8 bg-mist/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white hover:shadow-card">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                  <Icon name={ind.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{ind.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/55">{ind.description}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </Stagger>

        <div className="mt-12 text-center">
          <Link href={s.cta.href} className="btn-dark">
            {s.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
