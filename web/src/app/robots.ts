import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

// ----------------------------------------------------------------------------
// robots.ts — Next 16 special file. Allow public crawl; disallow the internal
// /pricing sales tool (noindex, deleted pre-launch) and /api/ route handlers.
// Points to sitemap.xml and sets host for canonical-host disambiguation.
// ----------------------------------------------------------------------------

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/pricing", "/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
