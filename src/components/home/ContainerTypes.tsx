import { containerTypes, homeSections } from "@/config/content";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger, RevealItem } from "@/components/motion/Reveal";
import { Container } from "lucide-react";

export function ContainerTypes() {
  const s = homeSections.containerTypes;
  return (
    <section className="bg-mist py-24 sm:py-28">
      <div className="container-px">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} description={s.description} />

        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {containerTypes.map((c, i) => (
            <RevealItem key={`${c.code}-${i}`}>
              <div className="group relative flex h-full items-center gap-5 overflow-hidden rounded-3xl border border-ink/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-card">
                <div className="relative flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-ink text-white">
                  <Container className="h-5 w-5 text-gold" />
                  <span className="mt-1 text-sm font-bold tracking-wide">{c.code}</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{c.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/55">{c.detail}</p>
                </div>
                <span className="absolute inset-x-0 bottom-0 h-1 w-0 bg-gold-gradient transition-all duration-500 group-hover:w-full" />
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
