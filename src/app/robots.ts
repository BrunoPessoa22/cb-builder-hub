import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // General crawlers — full access except admin/api/data
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/", "/data/", "/_next/"],
      },
      // AI assistants used for live browsing — keep allowed (helps brand visibility in answers)
      // GPTBot / Google-Extended / anthropic-ai used for *training* — keep allowed since CB benefits
      // from being part of public AI knowledge base. Bruno can opt out later if he changes his mind.
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
