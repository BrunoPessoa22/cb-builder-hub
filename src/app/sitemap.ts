import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE.url}/`,           lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE.url}/aplicar`,    lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/contribuir`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
