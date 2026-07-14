import { partners } from "@/config/content";
import { homeSections } from "@/config/content";
import { Reveal } from "@/components/motion/Reveal";

export function Partners() {
  return (
    <section className="border-b border-white/5 bg-ink py-12">
      <div className="container-px">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            {homeSections.partners.eyebrow}
          </p>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {partners.map((p) => (
            <span
              key={p}
              className="font-display text-base font-semibold text-white/30 transition-colors duration-300 hover:text-gold sm:text-lg"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
