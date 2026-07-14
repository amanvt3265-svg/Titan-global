import Image from "next/image";
import { MapPin } from "lucide-react";
import { coverage, homeSections } from "@/config/content";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";

export function Coverage() {
  const s = homeSections.coverage;
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
      <div className="pointer-events-none absolute right-0 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 translate-x-1/3 rounded-full bg-gold/5 blur-3xl" />
      <div className="container-px relative grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal direction="right">
            <span className="eyebrow">
              <span className="h-px w-6 bg-gold" />
              {s.eyebrow}
            </span>
            <h2 className="heading-display mt-4 text-3xl text-white sm:text-4xl lg:text-5xl">{s.title}</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-white/60">{s.description}</p>
          </Reveal>

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {coverage.map((c) => (
              <RevealItem key={c.region}>
                <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <h3 className="font-display font-semibold text-white">{c.region}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/55">{c.detail}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>

        <Reveal direction="left" className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
            <Image src={s.image} alt={s.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-gold-gradient px-6 py-4 text-ink shadow-gold sm:block">
            <div className="heading-display text-2xl font-bold">{s.badgeTitle}</div>
            <p className="text-xs font-medium">{s.badgeText}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
