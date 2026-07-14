"use client";

import { useRef } from "react";
import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
  Anchor,
  Container,
  Clock,
  Check,
  Users,
  Zap,
  Handshake,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { company } from "@/config/company";
import { images } from "@/config/images";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  anchor: Anchor,
  container: Container,
  clock: Clock,
};

const badgeIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  zap: Zap,
  "heart-handshake": Handshake,
  "shield-check": ShieldCheck,
};

export function Hero() {
  const h = company.hero;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden bg-ink"
    >
      {/* Background with parallax */}
      <motion.div
        initial={{ scale: 1.14 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: bgY }}
        className="absolute inset-0 will-change-transform"
      >
        <ImageWithFallback
          src={images.hero}
          alt="Gantry crane above stacked shipping containers at a container terminal"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />

      {/* Content */}
      <div className="container-px relative flex min-h-[100dvh] flex-col justify-center pb-28 pt-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="eyebrow"
          >
            <span className="h-px w-8 bg-gold" />
            {h.eyebrow}
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="heading-display mt-6 text-[2.7rem] leading-[0.98] text-white sm:text-6xl lg:text-[5rem]"
          >
            {h.headlineTop}
            <br />
            <span className="text-gradient-gold">{h.headlineAccent}</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl"
          >
            {h.subheading}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <Link href={h.primaryCta.href} className="btn-gold">
              {h.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={h.secondaryCta.href} className="btn-outline">
              <PhoneCall className="h-4 w-4" />
              {h.secondaryCta.label}
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.ul
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
          >
            {h.trustStrip.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm font-medium text-white/75"
              >
                <span className="inline-flex items-center justify-center rounded-full bg-gold/20 p-0.5">
                  <Check className="h-3.5 w-3.5 text-gold" />
                </span>
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* Trust badges — sits between hero content and the fade */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.15 }}
        className="absolute bottom-20 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-ink/60 px-7 py-4 backdrop-blur-md">
          {h.trustBadges.map((badge) => {
            const BadgeIcon = badgeIconMap[badge.icon] ?? ShieldCheck;
            return (
              <div key={badge.label} className="flex items-center gap-2.5">
                <BadgeIcon className="h-4 w-4 text-gold" />
                <span className="whitespace-nowrap text-sm font-medium text-white/80">
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4 text-white/30" />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
    </section>
  );
}
