"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import Image from "next/image";
import { stats } from "@/config/content";
import { images } from "@/config/images";

// Splits a stat like "12,000+" into a numeric target and prefix/suffix.
function parseStat(value: string) {
  const match = value.match(/([\d,.]+)/);
  if (!match) return { target: null as number | null, prefix: "", suffix: value };
  const numeric = parseFloat(match[1].replace(/,/g, ""));
  const idx = match.index ?? 0;
  return {
    target: numeric,
    prefix: value.slice(0, idx),
    suffix: value.slice(idx + match[1].length),
    decimals: match[1].includes(".") ? 1 : 0,
    hasComma: match[1].includes(","),
  };
}

function Counter({ value }: { value: string }) {
  const { target, prefix, suffix, hasComma, decimals } = parseStat(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (decimals) return v.toFixed(1);
    return hasComma ? Math.round(v).toLocaleString("en-NZ") : Math.round(v).toString();
  });
  const [display, setDisplay] = useState(decimals ? "0.0" : "0");

  useEffect(() => {
    if (target === null) return;
    const unsub = rounded.on("change", (v) => setDisplay(v));
    if (inView) {
      const controls = animate(count, target, {
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
      });
      return () => {
        controls.stop();
        unsub();
      };
    }
    return unsub;
  }, [inView, target, count, rounded]);

  if (target === null) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 sm:py-24">
      <div className="absolute inset-0">
        <Image
          src={images.containersStacked}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.12]"
        />
        <div className="absolute inset-0 bg-ink/85" />
      </div>

      <div className="container-px relative">
        <div className="grid grid-cols-2 gap-y-12 divide-white/10 lg:grid-cols-4 lg:divide-x">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center lg:px-6"
            >
              <div className="heading-display text-4xl text-gradient-gold sm:text-5xl lg:text-[3.5rem]">
                <Counter value={s.value} />
              </div>
              <div className="mx-auto mt-3 h-px w-10 bg-gold/40" />
              <p className="mt-3 text-sm font-medium uppercase tracking-widest text-white/60">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
