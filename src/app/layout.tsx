import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingQuote } from "@/components/FloatingQuote";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, organizationSchema } from "@/lib/seo";
import { company } from "@/config/company";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Home",
    description: company.seo.description,
    path: "/",
  }),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  applicationName: company.companyName,
  authors: [{ name: company.companyName }],
  creator: company.companyName,
};

export const viewport: Viewport = {
  themeColor: company.ui.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={company.ui.htmlLang} className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-ink font-sans">
        <JsonLd data={organizationSchema()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          {company.ui.skipLink}
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingQuote />
      </body>
    </html>
  );
}
