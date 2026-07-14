"use client";

import { useActionState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContact } from "@/app/actions";
import { emptyFormState } from "@/lib/validation";
import { FieldWrap, Honeypot, SubmitButton, inputClass } from "./Field";
import { Turnstile } from "./Turnstile";
import { formContent } from "@/config/content";

export function ContactForm() {
  const [state, action] = useActionState(submitContact, emptyFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const v = state.values ?? {};
  const errs = state.fieldErrors ?? {};
  const fc = formContent.contact;

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  if (state.ok) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-3xl border border-gold/30 bg-mist p-12 text-center"
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
    <AnimatePresence mode="wait">
      <motion.form key="form" ref={formRef} action={action} initial={{ opacity: 0 }} animate={{ opacity: 1 }} noValidate className="relative grid gap-5 sm:grid-cols-2">
        <Honeypot />

        <FieldWrap label={fc.fields.name.label} htmlFor="name" required error={errs.name}>
          <input id="name" name="name" className={inputClass} placeholder={fc.fields.name.placeholder} required minLength={2} maxLength={100} autoComplete="name" defaultValue={v.name} aria-invalid={!!errs.name} />
        </FieldWrap>

        <FieldWrap label={fc.fields.phone.label} htmlFor="phone" required error={errs.phone}>
          <input id="phone" name="phone" type="tel" className={inputClass} placeholder={fc.fields.phone.placeholder} required maxLength={20} autoComplete="tel" defaultValue={v.phone} aria-invalid={!!errs.phone} />
        </FieldWrap>

        <FieldWrap label={fc.fields.email.label} htmlFor="email" required error={errs.email} className="sm:col-span-2">
          <input id="email" name="email" type="email" className={inputClass} placeholder={fc.fields.email.placeholder} required maxLength={254} autoComplete="email" defaultValue={v.email} aria-invalid={!!errs.email} />
        </FieldWrap>

        <FieldWrap label={fc.fields.pickup.label} htmlFor="pickup" required error={errs.pickup}>
          <input id="pickup" name="pickup" className={inputClass} placeholder={fc.fields.pickup.placeholder} required maxLength={200} defaultValue={v.pickup} aria-invalid={!!errs.pickup} />
        </FieldWrap>

        <FieldWrap label={fc.fields.delivery.label} htmlFor="delivery" required error={errs.delivery}>
          <input id="delivery" name="delivery" className={inputClass} placeholder={fc.fields.delivery.placeholder} required maxLength={200} defaultValue={v.delivery} aria-invalid={!!errs.delivery} />
        </FieldWrap>

        <FieldWrap label={fc.fields.preferredDate.label} htmlFor="preferredDate" error={errs.preferredDate} className="sm:col-span-2">
          <input id="preferredDate" name="preferredDate" type="date" className={inputClass} defaultValue={v.preferredDate} aria-invalid={!!errs.preferredDate} />
        </FieldWrap>

        <FieldWrap label={fc.fields.message.label} htmlFor="message" required error={errs.message} className="sm:col-span-2">
          <textarea id="message" name="message" rows={5} className={`${inputClass} resize-none`} placeholder={fc.fields.message.placeholder} required minLength={10} maxLength={3000} defaultValue={v.message} aria-invalid={!!errs.message} />
        </FieldWrap>

        <div className="sm:col-span-2"><Turnstile /></div>

        {state.message && !state.ok && (
          <div className="sm:col-span-2 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{state.message}
          </div>
        )}

        <div className="sm:col-span-2">
          <SubmitButton idle={fc.submit.idle} pending={fc.submit.pending} icon={<Send className="h-4 w-4" />} />
        </div>
      </motion.form>
    </AnimatePresence>
  );
}
