import type { MetadataRoute } from "next";
import { siteConfig, engagements, niches, blog } from "@/data/site";

// ----------------------------------------------------------------------------
// sitemap.ts — Next 16 special file (static by default; reads from the static
// site.ts import, so no async needed). Every PUBLIC route only.
// EXCLUDES /pricing — internal Optimus sales tool, noindex, deleted pre-launch
// (CLAUDE.md Always-Built Features Rule + internal /pricing note). It is also
// Disallow-ed in robots.ts.
// ----------------------------------------------------------------------------

const base = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static public routes with tuned priority + change frequency.
  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${base}/`, priority: 1.0, changeFrequency: "weekly" },
      { url: `${base}/about`, priority: 0.8, changeFrequency: "monthly" },
      { url: `${base}/method`, priority: 0.9, changeFrequency: "monthly" },
      { url: `${base}/engagements`, priority: 0.9, changeFrequency: "monthly" },
      { url: `${base}/diagnostic`, priority: 0.7, changeFrequency: "monthly" },
      { url: `${base}/testimonials`, priority: 0.6, changeFrequency: "monthly" },
      { url: `${base}/faq`, priority: 0.7, changeFrequency: "monthly" },
      { url: `${base}/contact`, priority: 0.6, changeFrequency: "yearly" },
      { url: `${base}/blog`, priority: 0.8, changeFrequency: "weekly" },
      { url: `${base}/tools/cmmc-readiness`, priority: 0.8, changeFrequency: "monthly" },
    ] satisfies MetadataRoute.Sitemap
  ).map((r) => ({ ...r, lastModified: now }));

  // Dynamic: engagement detail pages.
  const engagementRoutes: MetadataRoute.Sitemap = engagements.map((e) => ({
    url: `${base}/engagements/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic: niche landing pages (high-intent audience entry points).
  const nicheRoutes: MetadataRoute.Sitemap = niches.map((n) => ({
    url: `${base}/niches/${n.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic: blog posts — use each post's own publish date as lastModified.
  const blogRoutes: MetadataRoute.Sitemap = blog.posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date + "T00:00:00"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...engagementRoutes, ...nicheRoutes, ...blogRoutes];
}
