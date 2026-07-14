import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { company } from "@/config/company";
import { images } from "@/config/images";
import { Reveal } from "./motion/Reveal";
import { ImageWithFallback } from "./ImageWithFallback";

interface CtaSectionProps {
  title?: string;
  description?: string;
}

export function CtaSection({
  title = company.cta.title,
  description = company.cta.description,
}: CtaSectionProps) {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="absolute inset-0">
        <ImageWithFallback
          src={images.terminalSunset}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-px relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-gold" />
            {company.cta.eyebrow}
          </span>
          <h2 className="heading-display mt-4 text-3xl text-white sm:text-4xl lg:text-5xl text-balance">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">
            {description}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={company.cta.primary.href} className="btn-gold">
              {company.cta.primary.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={company.phoneHref} className="btn-outline">
              <Phone className="h-4 w-4" />
              {company.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
