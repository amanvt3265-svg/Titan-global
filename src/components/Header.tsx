"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import { nav, company } from "@/config/company";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl"
          : "bg-gradient-to-b from-ink/60 to-transparent"
      }`}
    >
      {/* Top utility strip */}
      <div
        className={`hidden overflow-hidden border-b border-white/5 transition-all duration-500 lg:block ${
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}
      >
        <div className="container-px flex h-8 items-center justify-between text-xs text-white/60">
          <span className="tracking-wide">
            {company.tagline} · {company.address.city}, {company.address.country}
          </span>
          <div className="flex items-center gap-6">
            <a
              href={company.phoneHref}
              className="flex items-center gap-1.5 transition-colors hover:text-gold"
            >
              <Phone className="h-3.5 w-3.5" />
              {company.phone}
            </a>
            <a
              href={company.emailHref}
              className="transition-colors hover:text-gold"
            >
              {company.email}
            </a>
          </div>
        </div>
      </div>

      <div className="container-px">
        <div className="flex h-[72px] items-center justify-between gap-4 lg:h-[76px]">
          <Link href="/" aria-label={`${company.companyName} home`} className="relative z-10">
            <Logo priority />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`link-underline text-sm font-medium tracking-wide transition-colors ${
                    active ? "text-gold" : "text-white/85 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link href="/quote" className="btn-gold">
              Request Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden"
          >
            <nav className="border-t border-white/10 bg-ink px-5 pb-8 pt-4">
              <ul className="flex flex-col">
                {nav.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between border-b border-white/5 py-4 text-lg font-medium ${
                          active ? "text-gold" : "text-white"
                        }`}
                      >
                        {item.label}
                        <ArrowRight className="h-4 w-4 opacity-40" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link href="/quote" className="btn-gold mt-6 w-full">
                Request Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={company.phoneHref}
                className="mt-3 flex items-center justify-center gap-2 text-sm text-white/70"
              >
                <Phone className="h-4 w-4 text-gold" />
                {company.phone}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
