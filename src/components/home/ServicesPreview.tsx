import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services, homeSections } from "@/config/content";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger, RevealItem, Reveal } from "@/components/motion/Reveal";

export function ServicesPreview() {
  const featured = services.slice(0, 6);
  const s = homeSections.servicesPreview;

  return (
    <section className="relative bg-mist py-24 sm:py-28">
      <div className="container-px">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={s.eyebrow}
            title={s.title}
            description={s.description}
            align="left"
          />
          <Reveal direction="left" className="hidden lg:block">
            <Link href={s.cta.href} className="btn-dark">
              {s.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((svc, i) => (
            <RevealItem key={svc.slug}>
              <Link
                href={`/services#${svc.slug}`}
                className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-3xl"
              >
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10 transition-opacity duration-300 group-hover:from-ink" />

                <span className="absolute left-5 top-5 font-display text-sm font-semibold text-white/50">
                  0{i + 1}
                </span>
                <span className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-gold backdrop-blur-md transition-colors group-hover:bg-gold group-hover:text-ink">
                  <Icon name={svc.icon} className="h-5 w-5" />
                </span>

                <div className="relative p-6">
                  <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-white">
                    {svc.title}
                    <ArrowUpRight className="h-5 w-5 text-gold opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-white/70 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                    {svc.summary}
                  </p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </Stagger>

        <div className="mt-10 lg:hidden">
          <Link href={s.cta.href} className="btn-dark w-full">
            {s.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
