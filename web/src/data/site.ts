// ============================================================
// site.ts — single source of all copy (CLAUDE.md: zero hard-coded strings in components)
// SKELETON written at scaffold (Stage 1C). The content-writer agent (Stage 1D)
// EXPANDS this with services, engagement models, testimonials (real-or-empty per
// the premortem trust-layer gate), FAQ, quiz data, blog, niche-landing copy, etc.
// All copy below marked [DEMO COPY] is placeholder pending content-writer + client review.
// Voice: design-system.md §7 (executive + engineer, quiet certainty, em-dash-free,
// affirmative first-person). NO em dashes in any string value.
// ============================================================

export const siteConfig = {
  name: "Garrett Partridge",
  url: "https://garrettpartridge.com",
  // Canonical positioning string (CLAUDE.md Canonical Positioning Rule) — keep byte-identical across surfaces
  positioning: "Fractional COO | Operations Architect | Defense Industrial Base",
  titleDefault: "Garrett Partridge | Fractional COO for Defense Manufacturers",
  description:
    "Operations architect and fractional COO for New England defense industrial base manufacturers. Standard Work 2.0, CMMC and ITAR readiness, and IT/OT alignment that turns backlog into cash.",

  // Hero (Architecture B movie header). H1 = tagline (design-system §6). [DEMO COPY]
  hero: {
    eyebrow: "Fractional COO · Defense Industrial Base · New England",
    // H1 — the tagline, gets .hero-shimmer-brass
    tagline: "Predictable operations for high consequence manufacturing.",
    subhead:
      "When the backlog is outrunning cash and the CMMC clock is running, I install the operating system that holds. Across the IT and OT divide, before the auditor ever walks in.",
    ctaPrimary: { label: "Request a Strategic Conversation", href: "/booking" },
    ctaSecondary: { label: "Run the operational diagnostic", href: "/diagnostic" },
    microcopy: "A maximum of four concurrent engagements. Response within 48 hours.",
  },

  // Primary nav (no shop). "⬥ Pricing" is the internal sales-tool marker, deleted pre-launch.
  nav: [
    { label: "Method", href: "/method" },
    { label: "Engagements", href: "/engagements" },
    { label: "Insights", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "⬥ Pricing", href: "/pricing", internal: true },
  ],
  navCta: { label: "Request a Strategic Conversation", href: "/booking" },

  contactEmail: "garrett@garrettpartridge.com", // confirm at launch
  location: "Brookline, NH",
  serviceArea: "Greater Boston & Southern New Hampshire",

  social: {
    // sameAs entity graph (Pattern #100) — fill with the real live LinkedIn URL (Tuesday ask)
    linkedin: "", // [LAUNCH-BLOCKER: real LinkedIn URL]
  },
} as const;

export type SiteConfig = typeof siteConfig;
