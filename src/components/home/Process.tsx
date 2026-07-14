import Image from "next/image";
import { processSteps, homeSections } from "@/config/content";
import { images } from "@/config/images";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger, RevealItem } from "@/components/motion/Reveal";

export function Process() {
  const s = homeSections.process;
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
      <div className="absolute inset-0">
        <Image src={images.portOperations} alt="" fill sizes="100vw" className="object-cover opacity-[0.08]" />
      </div>
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="container-px relative">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} description={s.description} light />

        <Stagger className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <RevealItem key={step.step}>
              <div className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:border-gold/30 hover:bg-white/[0.07]">
                <div className="flex items-center gap-3">
                  <span className="heading-display text-5xl text-white/10 transition-colors duration-300 group-hover:text-gold/40">{step.step}</span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{step.description}</p>
                {i < processSteps.length - 1 && <span className="absolute -right-3 top-12 z-10 hidden text-gold/50 lg:block">→</span>}
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
