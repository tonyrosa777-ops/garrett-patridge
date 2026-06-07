import type { Metadata } from "next";

import PageHeader from "@/components/layout/PageHeader";
import { gatedTool } from "@/data/site";
import ScorerClient from "./ScorerClient";

// ============================================================
// /tools/cmmc-readiness — the forwardable CMMC Level 2 readiness self-scorer
// (Premortem Patch #2: indexable, genuinely useful, no sales call attached, no email gate).
//
// Ten yes/partial/no questions map against the NIST SP 800-171 control families and
// return a readiness BAND with the gaps named in plain language, landing on the inline
// BookingCalendar. Scoring is deterministic + pure (lives in ScorerClient).
//
// This page.tsx is a thin Server Component: it owns metadata + the dark PageHeader band;
// ScorerClient ("use client") owns the interactive scorer + result + booking.
// No `seo` entry exists for this tool, so the metadata is written locally in brand voice
// (design-system §7 — cited, anti-hype, quiet certainty). One H1 (PageHeader).
// ============================================================

export const metadata: Metadata = {
  title: "CMMC Level 2 Readiness Self-Scorer | Garrett Partridge",
  description:
    "Score your CMMC Level 2 readiness in ten questions. Maps your answers against the NIST SP 800-171 control families and returns a readiness band with the gaps named in plain language. No email, no sales call.",
};

export default function CmmcReadinessPage() {
  return (
    <main>
      {/* DARK PageHeader with ash motion. Eyebrow / headline / body from site.ts gatedTool. */}
      <PageHeader
        tone="dark"
        motion="ash"
        eyebrow={gatedTool.eyebrow}
        title={gatedTool.headline}
        intro={gatedTool.body}
      />

      <ScorerClient />
    </main>
  );
}
