"use client";

import { useActionState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { submitQuote } from "@/app/actions";
import { emptyFormState } from "@/lib/validation";
import { FieldWrap, Honeypot, SubmitButton, inputClass } from "./Field";
import { Turnstile } from "./Turnstile";
import { services, industries, formContent } from "@/config/content";

function resolveSlug(list: { slug: string; title: string }[], slug: string): string {
  return list.find((item) => item.slug === slug)?.title ?? slug;
}

export function QuoteForm() {
  const params = useSearchParams();
  const rawService = params.get("service") || "";
  const rawIndustry = params.get("industry") || "";
  const presetService = rawService ? resolveSlug(services, rawService) : "";
  const presetIndustry = rawIndustry ? resolveSlug(industries, rawIndustry) : "";
  const fc = formContent.quote;

  const presetMessage = [
    presetService ? `${fc.fields.service.prefix}: ${presetService}` : "",
    presetIndustry ? `${fc.fields.industry.prefix}: ${presetIndustry}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const [state, action] = useActionState(submitQuote, emptyFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const v = state.values ?? {};
  const errs = state.fieldErrors ?? {};

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  if (state.ok) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-3xl border border-gold/30 bg-white p-12 text-center shadow-card"
      >
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient text-ink">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
          {state.message ?? fc.successDefault}
        </h3>
        <p className="mt-3 max-w-md text-ink/60">{fc.successText}</p>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} action={action} noValidate className="relative rounded-3xl border border-ink/8 bg-white p-6 shadow-card sm:p-10">
      <Honeypot />

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{fc.legends.contact}</legend>

        <FieldWrap label={fc.fields.name.label} htmlFor="q-name" required error={errs.name}>
          <input id="q-name" name="name" className={inputClass} placeholder={fc.fields.name.placeholder} required minLength={2} maxLength={100} autoComplete="name" defaultValue={v.name} aria-invalid={!!errs.name} />
        </FieldWrap>

        <FieldWrap label={fc.fields.company.label} htmlFor="q-company" error={errs.company}>
          <input id="q-company" name="company" className={inputClass} placeholder={fc.fields.company.placeholder} maxLength={120} autoComplete="organization" defaultValue={v.company} />
        </FieldWrap>

        <FieldWrap label={fc.fields.phone.label} htmlFor="q-phone" required error={errs.phone}>
          <input id="q-phone" name="phone" type="tel" className={inputClass} placeholder={fc.fields.phone.placeholder} required maxLength={20} autoComplete="tel" defaultValue={v.phone} aria-invalid={!!errs.phone} />
        </FieldWrap>

        <FieldWrap label={fc.fields.email.label} htmlFor="q-email" required error={errs.email}>
          <input id="q-email" name="email" type="email" className={inputClass} placeholder={fc.fields.email.placeholder} required maxLength={254} autoComplete="email" defaultValue={v.email} aria-invalid={!!errs.email} />
        </FieldWrap>
      </fieldset>

      <fieldset className="mt-8 grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{fc.legends.freight}</legend>

        <FieldWrap label={fc.fields.pickup.label} htmlFor="q-pickup" required error={errs.pickup}>
          <input id="q-pickup" name="pickup" className={inputClass} placeholder={fc.fields.pickup.placeholder} required maxLength={200} defaultValue={v.pickup} aria-invalid={!!errs.pickup} />
        </FieldWrap>

        <FieldWrap label={fc.fields.delivery.label} htmlFor="q-delivery" required error={errs.delivery}>
          <input id="q-delivery" name="delivery" className={inputClass} placeholder={fc.fields.delivery.placeholder} required maxLength={200} defaultValue={v.delivery} aria-invalid={!!errs.delivery} />
        </FieldWrap>

        <FieldWrap label={fc.fields.preferredDate.label} htmlFor="q-date" error={errs.preferredDate}>
          <input id="q-date" name="preferredDate" type="date" className={inputClass} defaultValue={v.preferredDate} />
        </FieldWrap>

        <div className="hidden sm:block" aria-hidden="true" />

        <FieldWrap label={fc.fields.message.label} htmlFor="q-message" error={errs.message} className="sm:col-span-2">
          <textarea id="q-message" name="message" rows={5} className={`${inputClass} resize-none`} placeholder={fc.fields.message.placeholder} maxLength={3000} defaultValue={v.message ?? presetMessage} />
        </FieldWrap>
      </fieldset>

      <div className="mt-6"><Turnstile /></div>

      {state.message && !state.ok && (
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{state.message}
        </div>
      )}

      <div className="mt-8">
        <SubmitButton idle={fc.submit.idle} pending={fc.submit.pending} icon={<ArrowRight className="h-4 w-4" />} />
      </div>
      <p className="mt-4 text-center text-xs text-ink/45">{fc.privacy}</p>
    </form>
  );
}
