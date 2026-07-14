import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { buildMetadata } from "@/lib/seo";
import { company } from "@/config/company";
import { pageContent } from "@/config/content";

export const metadata = buildMetadata({
  title: pageContent.legal.privacy.title,
  description:
    "How Titan Global Transport collects, uses and protects the personal information you share with us.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const l = pageContent.legal.privacy;
  return (
    <LegalLayout title={l.title} breadcrumb={l.breadcrumb} updated={l.updated}>
      <LegalSection heading="Overview">
        <p>
          {company.legalName} (&ldquo;{company.companyName}&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy
          explains what information we collect through this website and how we
          use it, in line with the New Zealand Privacy Act 2020.
        </p>
      </LegalSection>

      <LegalSection heading="Information We Collect">
        <p>
          When you complete a contact or quote form, we collect the details you
          provide — such as your name, phone number, email address, pickup and
          delivery locations and any message relevant to your enquiry. We do not
          collect payment details through this website.
        </p>
      </LegalSection>

      <LegalSection heading="How We Use Your Information">
        <p>
          We use the information solely to respond to your enquiry, prepare
          quotes, arrange transport services and communicate with you about your
          request. We do not sell your personal information to third parties.
        </p>
      </LegalSection>

      <LegalSection heading="Data Security">
        <p>
          Enquiries are validated and sanitised server-side, transmitted
          securely, and delivered to our team by email. We take reasonable steps
          to protect the information you share against loss, misuse and
          unauthorised access.
        </p>
      </LegalSection>

      <LegalSection heading="Your Rights">
        <p>
          You may request access to, or correction of, the personal information
          we hold about you at any time by contacting us at{" "}
          <a
            href={company.emailHref}
            className="font-medium text-gold-dark underline"
          >
            {company.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          For any privacy questions, contact {company.companyName} at{" "}
          {company.phone} or {company.email}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
