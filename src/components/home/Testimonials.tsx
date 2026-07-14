"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials, homeSections } from "@/config/content";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];
  const s = homeSections.testimonials;

  const go = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/5 blur-3xl" />
      <div className="container-px relative">
        <div className="text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-gold" />
            {s.eyebrow}
          </span>
          <h2 className="heading-display mt-4 text-3xl text-white sm:text-4xl">{s.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">{s.description}</p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl sm:p-14">
            <Quote className="absolute right-8 top-8 h-20 w-20 text-gold/10" />

            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold text-gold" />
              ))}
            </div>

            <div className="relative mt-6 min-h-[180px] sm:min-h-[150px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-display text-xl leading-relaxed text-white sm:text-2xl">
                    "{active.quote}"
                  </p>
                  <div className="mt-6 not-italic">
                    <div className="font-semibold text-white">{active.name}</div>
                    <div className="text-sm text-gold">{active.role}</div>
                  </div>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`${s.showLabel} ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-gold" : "w-2 bg-white/20"}`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => go(-1)}
                  aria-label={s.previousLabel}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-gold hover:text-gold"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label={s.nextLabel}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-gold hover:text-gold"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
