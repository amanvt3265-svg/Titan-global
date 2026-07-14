"use client";

import Image from "next/image";
import { useState, type ComponentProps } from "react";

// Default fallback shown when an image fails to load.
function Placeholder({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-mist p-6 text-center ${className}`}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-3 text-ink/20"
      >
        <rect x="4" y="10" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="22" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M4 30L14 22L22 28L30 20L44 33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/30">
        Image Coming Soon
      </span>
      <span className="mt-1 text-[10px] text-ink/20">
        Titan Global Transport
      </span>
    </div>
  );
}

type ImageProps = ComponentProps<typeof Image>;

export function ImageWithFallback(props: ImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <Placeholder
        className={typeof props.className === "string" ? props.className : ""}
      />
    );
  }

  return (
    <Image
      {...props}
      onError={() => setError(true)}
      alt={props.alt || ""}
    />
  );
}

// Standalone fallback for use outside the Image component (e.g. inline).
export { Placeholder as ImageComingSoon };
