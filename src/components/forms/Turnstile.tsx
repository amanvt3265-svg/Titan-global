"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

// ── Cloudflare Turnstile widget ─────────────────────────────
// Renders an invisible/managed Turnstile challenge that writes its
// token into a hidden `cf-turnstile-response` input inside the form.
// Only renders when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set, so the
// site works locally without keys. The secret half lives server-side.
declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: Record<string, unknown>
      ) => string | undefined;
      reset: (id?: string) => void;
    };
  }
}

export function Turnstile() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!siteKey || !ref.current) return;
    const tryRender = () => {
      if (window.turnstile && ref.current && !widgetId.current) {
        widgetId.current = window.turnstile.render(ref.current, {
          sitekey: siteKey,
          theme: "auto",
          action: "form_submit",
        });
        return true;
      }
      return false;
    };
    if (!tryRender()) {
      const t = setInterval(() => {
        if (tryRender()) clearInterval(t);
      }, 300);
      return () => clearInterval(t);
    }
  }, [siteKey]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
      />
      <div ref={ref} className="cf-turnstile" />
    </>
  );
}
