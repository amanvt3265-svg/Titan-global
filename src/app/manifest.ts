import type { MetadataRoute } from "next";
import { company } from "@/config/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.companyName,
    short_name: company.shortName,
    description: company.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0F0F10",
    theme_color: "#0F0F10",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/favicon.svg", type: "image/svg+xml" },
      { src: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
