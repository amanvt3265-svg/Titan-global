import type { MetadataRoute } from "next";
import { company } from "@/config/company";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/industries",
    "/quote",
    "/contact",
    "/privacy",
    "/terms",
  ];

  // Static build timestamp (deterministic output).
  const lastModified = new Date("2026-07-13");

  return routes.map((path) => ({
    url: `${company.url}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/quote" ? 0.9 : 0.7,
  }));
}
