import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./motion/Reveal";
import { ImageWithFallback } from "./ImageWithFallback";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  breadcrumb: string;
}

// Reusable dark hero banner for interior pages.
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumb,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink pt-[72px] lg:pt-20">
      <div className="absolute inset-0">
        <ImageWithFallback
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/85 to-ink" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="container-px relative">
        <div className="max-w-3xl py-20 sm:py-24 lg:py-32">
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/50"
            >
              <Link href="/" className="hover:text-gold">
                Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-gold">{breadcrumb}</span>
            </nav>
            <span className="eyebrow">
              <span className="h-px w-6 bg-gold" />
              {eyebrow}
            </span>
            <h1 className="heading-display mt-5 text-4xl text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              {description}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
