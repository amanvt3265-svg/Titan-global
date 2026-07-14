"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export const inputClass =
  "w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 aria-[invalid=true]:border-red-400";

export function FieldWrap({
  label,
  htmlFor,
  error,
  required,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60"
      >
        {label}
        {required && <span className="ml-0.5 text-gold">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

// Hidden honeypot input — real users never fill this. Kept out of the
// tab order and hidden from assistive tech; bots that auto-fill forms
// populate it and get silently dropped server-side.
export function Honeypot() {
  return (
    <div
      className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
      aria-hidden="true"
    >
      <label htmlFor="company_website">Company Website</label>
      <input
        id="company_website"
        name="company_website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}

// Large CTA submit button that reflects the enclosing form's pending
// state via useFormStatus — no prop threading required.
export function SubmitButton({
  idle,
  pending,
  icon,
  className = "",
}: {
  idle: string;
  pending: string;
  icon?: ReactNode;
  className?: string;
}) {
  const { pending: isPending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={isPending}
      className={`btn-gold w-full text-base disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {isPending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          {pending}
        </>
      ) : (
        <>
          {idle}
          {icon}
        </>
      )}
    </button>
  );
}
