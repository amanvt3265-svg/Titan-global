import Image from "next/image";
import { ShieldCheck, BadgeCheck } from "lucide-react";
import { certifications, promises, homeSections } from "@/config/content";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";

export function Safety() {
  const s = homeSections.safety;
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="container-px">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal direction="right" className="relative order-2 lg:order-1">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-card">
              <Image src={s.image} alt={s.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="absolute -right-4 -top-4 hidden rounded-2xl bg-ink px-6 py-4 text-white shadow-gold sm:block">
              <ShieldCheck className="h-6 w-6 text-gold" />
              <div className="mt-2 font-display text-lg font-semibold">{s.badgeTitle}</div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <div>
              <span className="eyebrow">
                <span className="h-px w-6 bg-gold" />
                {s.eyebrow}
              </span>
              <h2 className="heading-display mt-4 text-3xl text-ink sm:text-4xl">{s.title}</h2>
              <p className="mt-4 max-w-lg leading-relaxed text-ink/60">{s.description}</p>
            </div>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
              {certifications.map((c) => (
                <RevealItem key={c.title}>
                  <div className="flex gap-3 rounded-2xl border border-ink/8 bg-mist/60 p-5">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <h3 className="font-display font-semibold text-ink">{c.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink/55">{c.detail}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </Stagger>
          </div>
        </div>

        <div className="mt-24 rounded-[2.5rem] bg-ink-gradient p-8 sm:p-12 lg:p-16">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">
              <span className="h-px w-6 bg-gold" />
              {s.promiseEyebrow}
            </span>
            <h2 className="heading-display mt-4 text-3xl text-white sm:text-4xl">{s.promiseTitle}</h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-8 sm:grid-cols-2">
            {promises.map((p, i) => (
              <RevealItem key={p.title}>
                <div className="flex gap-5">
                  <span className="heading-display text-3xl text-gradient-gold">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-white/60">{p.description}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
