import type { ReactNode } from "react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { images } from "@/config/images";
import { pageContent } from "@/config/content";

// Shared shell for Privacy / Terms style long-form legal pages.
// All text is configurable via pageContent.legal in content.ts.
export function LegalLayout({
  title,
  breadcrumb,
  updated,
  children,
}: {
  title: string;
  breadcrumb: string;
  updated: string;
  children: ReactNode;
}) {
  const l = pageContent.legal;
  return (
    <>
      <PageHero
        eyebrow={l.eyebrow}
        title={title}
        description={`${l.descriptionPrefix}${breadcrumb.toLowerCase()}${l.descriptionSuffix}`}
        image={images.containersStacked}
        breadcrumb={breadcrumb}
      />
      <section className="bg-white py-20 sm:py-24">
        <div className="container-px">
          <Reveal className="mx-auto max-w-3xl">
            <p className="text-sm text-ink/45">
              {l.lastUpdatedPrefix}{updated}
            </p>
            <div className="legal-prose mt-8 space-y-8">{children}</div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
        {heading}
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed text-ink/65">
        {children}
      </div>
    </div>
  );
}
