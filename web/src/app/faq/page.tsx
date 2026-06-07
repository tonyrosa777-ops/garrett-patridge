import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { seo } from "@/data/site";
import FaqClient from "./FaqClient";

// ----------------------------------------------------------------------------
// /faq — instrument-readout Q&A (design-system §5), direct-answer-first for AEO.
// This page is the FAQPage schema surface (JSON-LD added later in the SEO stage).
//
// Tone string (strictly alternating, ends LIGHT opposite the DARK global footer):
//   PageHeader(D, orbs) · FaqClient[accordion + closing CTA](L, drift) · [Footer D]
// Two content bands, no DD/LL run, final band LIGHT before the dark footer.
// The accordion is text-dense, so its band uses a static gradient (motion="drift"
// is a slow ambient orb-drift kept under the 0.3Hz budget; never flat).
// ----------------------------------------------------------------------------

const meta = seo["/faq"];

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: { title: meta.title, description: meta.description, type: "website" },
};

export default function FaqPage() {
  return (
    <>
      {/* 1 — Header (dark) */}
      <PageHeader
        tone="dark"
        motion="orbs"
        eyebrow="Direct answers"
        title="Questions an operator hears before the first conversation."
        intro="Straight answers on CMMC timing and cost, the Hidden Factory, SPRS exposure, how a fractional engagement starts, and why there is no rate card. Every figure cites its primary source."
      />

      {/* 2 — Accordion + closing CTA (light/gunmetal), final band before the dark footer */}
      <FaqClient />
    </>
  );
}
