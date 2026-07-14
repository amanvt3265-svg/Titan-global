import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { buildMetadata } from "@/lib/seo";
import { company } from "@/config/company";
import { pageContent } from "@/config/content";

export const metadata = buildMetadata({
  title: pageContent.legal.terms.title,
  description:
    "The terms that govern your use of the Titan Global Transport website and enquiries made through it.",
  path: "/terms",
});

export default function TermsPage() {
  const l = pageContent.legal.terms;
  return (
    <LegalLayout title={l.title} breadcrumb={l.breadcrumb} updated={l.updated}>
      <LegalSection heading="Agreement">
        <p>
          These terms govern your use of the {company.companyName} website. By
          accessing this site or submitting an enquiry, you agree to these terms.
          The site is operated by {company.legalName}.
        </p>
      </LegalSection>

      <LegalSection heading="Quotes & Enquiries">
        <p>
          Quotes provided in response to website enquiries are indicative and
          subject to confirmation once full container and freight details are
          reviewed. A binding transport agreement is formed only when confirmed in
          writing by our team.
        </p>
      </LegalSection>

      <LegalSection heading="Website Content">
        <p>
          All content on this website — including text, branding, imagery and
          design — is provided for information purposes and remains the property
          of {company.legalName} or its licensors. You may not reproduce it
          without permission.
        </p>
      </LegalSection>

      <LegalSection heading="Service Standards">
        <p>
          We are committed to safe, reliable container transport delivered to New
          Zealand load-restraint and compliance standards. Specific service
          levels, liability and insurance arrangements are set out in the formal
          agreement for each engagement.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of Liability">
        <p>
          To the extent permitted by law, {company.companyName} is not liable for
          indirect or consequential loss arising from use of this website.
          Nothing in these terms limits rights you may have under the New Zealand
          Consumer Guarantees Act where it applies.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms can be directed to {company.email} or{" "}
          {company.phone}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
