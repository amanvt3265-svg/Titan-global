import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whyTitan, homeSections } from "@/config/content";
import { Icon } from "@/components/Icon";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";

export function WhyChoose() {
  const s = homeSections.whyChoose;
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
      <div className="pointer-events-none absolute right-0 top-0 h-[40rem] w-[40rem] translate-x-1/3 rounded-full bg-gold/5 blur-3xl" />
      <div className="container-px relative grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal direction="right">
          <span className="eyebrow">
            <span className="h-px w-6 bg-gold" />
            {s.eyebrow}
          </span>
          <h2 className="heading-display mt-4 text-3xl text-white sm:text-4xl lg:text-5xl">
            {s.title}
          </h2>
          <p className="mt-5 max-w-lg leading-relaxed text-white/60">
            {s.description}
          </p>

          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={s.image}
              alt={s.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-2xl bg-ink/70 px-5 py-3 backdrop-blur-md">
              <div className="heading-display text-2xl text-gradient-gold">
                {s.badgeTitle}
              </div>
              <p className="text-xs text-white/60">{s.badgeText}</p>
            </div>
          </div>

          <Link
            href={s.link.href}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-light"
          >
            {s.link.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Stagger className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2">
          {whyTitan.map((item) => (
            <RevealItem key={item.title}>
              <div className="group h-full bg-ink p-7 transition-colors duration-300 hover:bg-ink-700">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-gold transition-colors duration-300 group-hover:bg-gold-gradient group-hover:text-ink">
                  <Icon name={item.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {item.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
