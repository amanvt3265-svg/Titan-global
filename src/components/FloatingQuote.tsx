"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText } from "lucide-react";

// Sticky floating "Request Quote" button that appears after the hero
// and hides itself on the quote page.
export function FloatingQuote() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/quote") return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7"
        >
          <Link
            href="/quote"
            className="group flex items-center gap-2.5 rounded-full bg-gold-gradient px-5 py-3.5 text-sm font-semibold text-ink shadow-gold transition-transform hover:scale-[1.03]"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Request a Quote</span>
            <span className="sm:hidden">Quote</span>
            <span className="absolute -inset-px -z-10 rounded-full bg-gold-gradient opacity-0 blur-md transition-opacity group-hover:opacity-60" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
