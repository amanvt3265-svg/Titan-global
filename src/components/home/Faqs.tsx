"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs, homeSections } from "@/config/content";

export function Faqs() {
  const [open, setOpen] = useState<number | null>(0);
  const s = homeSections.faqs;

  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="container-px">
        <div className="text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-gold" />
            {s.eyebrow}
          </span>
          <h2 className="heading-display mt-4 text-3xl text-ink sm:text-4xl">{s.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-ink/60">{s.description}</p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl divide-y divide-ink/8 rounded-3xl border border-ink/8 bg-mist/40">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
                >
                  <span className="font-display text-lg font-semibold text-ink">{faq.q}</span>
                  <span
                    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? "rotate-45 border-gold bg-gold text-ink" : "border-ink/15 text-ink"}`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-base leading-relaxed text-ink/65 sm:px-8">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
