import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { company } from "@/config/company";

// Lazily-created singleton transporter so we don't reconnect per request.
let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const { EMAIL_USER, EMAIL_PASS, SMTP_HOST, SMTP_PORT, SMTP_SECURE } =
    process.env;

  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error(
      "Email is not configured. Set EMAIL_USER and EMAIL_PASS in your environment."
    );
  }

  // Use a custom SMTP host if provided, otherwise default to Gmail service.
  transporter = SMTP_HOST
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT ? Number(SMTP_PORT) : 587,
        secure: SMTP_SECURE === "true",
        auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      })
    : nodemailer.createTransport({
        service: "gmail",
        auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      });

  return transporter;
}

interface SendArgs {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export async function sendMail({ subject, html, text, replyTo }: SendArgs) {
  // Delivery inbox: env override wins, otherwise the central config value,
  // finally the sending mailbox. Keeps the recipient config-driven.
  const receiver =
    process.env.CONTACT_RECEIVER ||
    company.contactReceiver ||
    process.env.EMAIL_USER;
  if (!receiver) {
    throw new Error("CONTACT_RECEIVER is not configured.");
  }

  const tx = getTransporter();
  await tx.sendMail({
    from: `"${company.companyName}" <${process.env.EMAIL_USER}>`,
    to: receiver,
    subject,
    text,
    html,
    replyTo,
  });
}

// Basic HTML entity escaping to keep injected values safe inside the email body.
export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Wraps a set of label/value rows in a branded HTML email shell.
export function emailTemplate(title: string, rows: [string, string][]): string {
  const body = rows
    .filter(([, v]) => v && v.trim().length > 0)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #eee;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#9E7F1C;font-weight:600;white-space:nowrap;vertical-align:top;">${esc(
          label
        )}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #eee;font-size:15px;color:#0F0F10;">${esc(
          value
        ).replace(/\n/g, "<br/>")}</td>
      </tr>`
    )
    .join("");

  return `
  <div style="background:#f5f5f4;padding:32px 0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">
        <table role="presentation" width="600" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(15,15,16,0.08);">
          <tr>
            <td style="background:#0F0F10;padding:28px 32px;">
              <div style="font-size:20px;font-weight:700;color:#ffffff;font-family:Georgia,serif;">${esc(
                company.companyName
              )}</div>
              <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#C9A227;margin-top:4px;">${esc(
                title
              )}</div>
            </td>
          </tr>
          <tr><td style="padding:24px 16px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${body}</table>
          </td></tr>
          <tr>
            <td style="background:#0F0F10;padding:20px 32px;color:#888;font-size:12px;">
              Submitted via ${esc(
                company.url.replace(/^https?:\/\//, "")
              )} — ${esc(company.tagline)}.
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </div>`;
}
