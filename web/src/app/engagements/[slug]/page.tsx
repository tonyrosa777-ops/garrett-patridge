import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import CtaLink from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import FadeUp from "@/components/animations/FadeUp";
import SlideIn from "@/components/animations/SlideIn";
import { engagements } from "@/data/site";

// /engagements/[slug] (detail). Next 16 — params is a Promise, MUST await.
// Static-generated for all three engagement slugs via generateStaticParams.
// Rhythm map (footer is dark navy → last content band must be LIGHT):
// [Nav]          — light — fixed bookend (chrome)
// PageHeader     — dark  — intro                → drift
// Who / What     — light — education            → orbs   (asymmetric split, not centered)
// How it works   — dark  — process              → ash
// Closing CTA    — light — conversion (final)   → grain  (LIGHT before dark footer)
// [Footer]       — dark  — fixed bookend (navy)
// Tones: L D L D L D — strict alternation, ends light before the dark footer.

export function generateStaticParams() {
  return engagements.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = engagements.find((x) => x.slug === slug);
  if (!e) return {};

  const title = `${e.name} | Garrett Partridge`;
  const description = `${e.tagline} ${e.forWho}`;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function EngagementDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const e = engagements.find((x) => x.slug === slug);
  if (!e) notFound();

  return (
    <>
      <PageHeader
        tone="dark"
        motion="drift"
        eyebrow="Engagement"
        title={e.name}
        intro={e.tagline}
      />

      {/* WHO IT'S FOR + WHAT YOU GET — light / orbs — asymmetric split, not centered. */}
      <Section tone="light" motion="orbs">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left rail: who it's for */}
          <SlideIn from="left" className="lg:col-span-5">
            <Eyebrow>Who it is for</Eyebrow>
            <p
              className="mt-4"
              style={{ color: "var(--text-primary)", fontSize: "var(--text-h3)", lineHeight: 1.4 }}
            >
              {e.forWho}
            </p>
          </SlideIn>

          {/* Right rail: what you get checklist */}
          <div className="lg:col-span-7">
            <Eyebrow>What you get</Eyebrow>
            <Stagger className="mt-5 flex flex-col gap-4">
              {e.whatYouGet.map((point) => (
                <StaggerItem key={point} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0"
                    style={{ color: "var(--accent)" }}
                  >
                    ✓
                  </span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}>
                    {point}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS — dark / ash — process band. */}
      <Section tone="dark" motion="ash">
        <FadeUp className="max-w-3xl">
          <Eyebrow>How it works</Eyebrow>
          <p
            className="mt-4"
            style={{ color: "var(--text-primary)", fontSize: "var(--text-h3)", lineHeight: 1.45 }}
          >
            {e.how}
          </p>
        </FadeUp>
      </Section>

      {/* CLOSING CTA — light / grain — final band, LIGHT before the dark footer. */}
      <Section tone="light" motion="grain" containerClassName="text-center">
        <FadeUp className="mx-auto max-w-2xl">
          <Eyebrow>Start here</Eyebrow>
          <h2 className="mt-3" style={{ fontSize: "var(--text-h2)" }}>
            Put this engagement in front of an operator.
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl"
            style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
          >
            Every engagement opens with a strategic conversation. Name your trigger and I respond
            within 48 hours with a realistic timing window.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <CtaLink href={e.cta.href} variant="primary">
              {e.cta.label}
            </CtaLink>
            <CtaLink href="/engagements" variant="ghost">
              ← All engagements
            </CtaLink>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
