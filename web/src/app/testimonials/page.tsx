import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import TestimonialsClient from "./TestimonialsClient";
import { seo } from "@/data/site";

// ----------------------------------------------------------------------------
// /testimonials — social proof page (CLAUDE.md Testimonials Rule: 36 quotes,
// 9 per page, 3-col × 3-row, 4 pages, zero orphans). All quotes are [DEMO COPY],
// role-cited, no fabricated personal names (premortem Patch #1).
//
// Tone string (strictly alternating, ends LIGHT opposite the DARK global footer):
//   PageHeader(D) · FeaturedQuote(L) · FilteredGrid(D) · BookingCTA(L) · [Footer D]
// Adjacent motions all differ: orbs · grain · twinkle · none.
// The interactive filter + pagination live in TestimonialsClient (needs state).
// page.tsx stays a thin Server Component owning metadata + the H1 header.
// ----------------------------------------------------------------------------

const meta = seo["/testimonials"];

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: { title: meta.title, description: meta.description, type: "website" },
};

export default function TestimonialsPage() {
  return (
    <>
      {/* 1 — Header (dark) */}
      <PageHeader
        tone="dark"
        motion="orbs"
        eyebrow="Engagements under NDA, voices on the record"
        title="What it sounds like when the system holds."
        intro="Owners, GMs, and PE operating partners describing embedded operations work across the New England defense industrial base. Engagements are held under NDA, so these are cited by role, not by name."
      />

      {/* 2 — Featured quote · 3 — Filtered grid · 4 — Booking CTA */}
      <TestimonialsClient />
    </>
  );
}
