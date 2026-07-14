// ═══════════════════════════════════════════════════════════════
//  Shared Zod schemas + validation primitives for the contact and
//  quote forms. Safe to import from both client and server code —
//  contains no secrets or server-only APIs.
// ═══════════════════════════════════════════════════════════════

import { z } from "zod";

// Client-side regexes (used for react-hook-form inline validation).
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_RE = /^[+()\-\s\d]{6,20}$/;

// ── Reusable field schemas ──────────────────────────────────
const name = z
  .string()
  .trim()
  .min(2, "Please enter your name.")
  .max(100, "Name is too long.");

const email = z
  .string()
  .trim()
  .min(5, "Please enter your email.")
  .max(254, "Email is too long.")
  .email("Please enter a valid email address.");

const phone = z
  .string()
  .trim()
  .min(6, "Please enter your phone number.")
  .max(20, "Phone number is too long.")
  .regex(PHONE_RE, "Please enter a valid phone number.");

const location = z
  .string()
  .trim()
  .min(2, "Please enter a location.")
  .max(200, "Location is too long.");

const preferredDate = z
  .string()
  .trim()
  .max(40, "Invalid date.")
  .optional()
  .or(z.literal(""));

const message = z
  .string()
  .trim()
  .min(10, "Please add a little more detail (at least 10 characters).")
  .max(3000, "Message is too long (max 3000 characters).");

const optionalShort = z
  .string()
  .trim()
  .max(120, "This value is too long.")
  .optional()
  .or(z.literal(""));

// Honeypot — must be empty. Bots fill it; humans never see it.
const honeypot = z
  .string()
  .max(0, "rejected")
  .optional()
  .or(z.literal(""));

// ── Contact form ────────────────────────────────────────────
// Fields (per spec): Name, Phone, Email, Pickup, Delivery,
// Preferred Date, Message.
export const contactSchema = z.object({
  name,
  phone,
  email,
  pickup: location,
  delivery: location,
  preferredDate,
  message,
  company_website: honeypot,
});

export type ContactInput = z.infer<typeof contactSchema>;

// ── Quote form ──────────────────────────────────────────────
// Same shape plus an optional company name. No freight dimensions.
export const quoteSchema = z.object({
  name,
  company: optionalShort,
  phone,
  email,
  pickup: location,
  delivery: location,
  preferredDate,
  message: z
    .string()
    .trim()
    .max(3000, "Message is too long (max 3000 characters).")
    .optional()
    .or(z.literal("")),
  company_website: honeypot,
});

export type QuoteInput = z.infer<typeof quoteSchema>;

// ── Shared Server-Action result shape ───────────────────────
// Returned by the contact/quote actions and consumed by the client
// forms via useActionState. `values` echoes sanitised input back so
// the form repopulates on a validation error.
export type FormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
};

export const emptyFormState: FormState = { ok: false };
