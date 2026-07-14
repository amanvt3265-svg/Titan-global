import type { Metadata } from "next";
import { company } from "@/config/company";

interface PageSeo {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = company.seo.ogImage,
}: PageSeo): Metadata {
  const url = `${company.url}${path}`;
  const fullTitle =
    path === "/"
      ? company.seo.titleDefault
      : company.seo.titleTemplate.replace("%s", title);

  return {
    title: fullTitle,
    description,
    keywords: [...company.seo.keywords],
    metadataBase: new URL(company.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: company.locale,
      url,
      siteName: company.companyName,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: company.companyName }],
    },
    twitter: {
      card: "summary_large_image",
      site: company.seo.twitterHandle,
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": company.seo.schemaType,
    name: company.companyName,
    legalName: company.legalName,
    slogan: company.tagline,
    description: company.seo.description,
    url: company.url,
    telephone: company.phone,
    email: company.email,
    logo: `${company.url}${company.logoMark}`,
    image: company.seo.ogImage,
    priceRange: company.seo.priceRange,
    areaServed: { "@type": "Country", name: company.seo.areaServed },
    address: {
      "@type": "PostalAddress",
      ...(company.address.line2 ? { streetAddress: company.address.line2 } : {}),
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      postalCode: company.address.postcode,
      addressCountry: company.seo.addressCountryCode,
    },
    sameAs: company.social.map((s) => s.href),
    ...(company.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: company.geo.latitude,
        longitude: company.geo.longitude,
      },
    }),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${company.url}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
