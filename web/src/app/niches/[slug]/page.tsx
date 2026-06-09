import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import CtaLink from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import FadeUp from "@/components/animations/FadeUp";
import SlideIn from "@/components/animations/SlideIn";
import { niches, gatedTool, seo } from "@/data/site";

// /niches/[slug] — 3 loss-framed niche landings (design-system §12.6).
// LOSS BEFORE CAPABILITY: the PageHeader intro IS the loss vector (lossOpener); the
// mechanism (capability) only appears AFTER the loss is expanded. This ordering is binding.
//
// Rhythm map (footer is dark navy, so the last content band must be LIGHT):
// [Nav]              — light — fixed bookend (chrome)
// PageHeader         — dark  — the LOSS vector leads (lossOpener as intro)  → ash
// Loss expanded      — light — what the buyer stands to lose this year      → grain  (asymmetric split, §4)
// Mechanism          — dark  — THEN the readiness mechanism + who it's for  → orbs   (staggered, §4)
// Gated tool + CTA   — light — forwardable tool nudge + primary booking CTA  → none   (LIGHT before dark footer)
// [Footer]           — dark  — fixed bookend (navy)
// Tones: D L D L — strict alternation, ends LIGHT before the dark footer.

// The gated CMMC Readiness Self-Scorer is on-topic for the compliance-driven niches
// (DIB contract manufacturer + foreign-manufacturer onshoring). It is not a fit for the
// PE diligence niche, where the relevant next step is the strategic conversation alone.
const SHOW_GATED_TOOL = new Set<string>(["dib-contract-manufacturer", "onshoring"]);

export function generateStaticParams() {
  return niches.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = seo[`/niches/${slug}`];
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.description,
    openGraph: { title: entry.title, description: entry.description },
  };
}

export default async function NichePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = niches.find((niche) => niche.slug === slug);
  if (!n) notFound();

  const showTool = SHOW_GATED_TOOL.has(n.slug);

  return (
    <>
      {/* PAGE HEADER — dark / ash — the LOSS vector leads (lossOpener as intro). */}
      <PageHeader tone="dark" motion="ash" eyebrow={n.eyebrow} title={n.title} intro={n.lossOpener} />

      {/* LOSS EXPANDED — light / grain — what the buyer stands to lose this year.
          Asymmetric split: a held title column on the left, the loss body on the right. */}
      <Section tone="light" motion="grain">
        <div className="grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
          <SlideIn from="left">
            <Eyebrow>What is at stake</Eyebrow>
            <h2 className="mt-3" style={{ fontSize: "var(--text-h2)" }}>
              The cost of waiting is not measured in weeks.
            </h2>
          </SlideIn>

          <SlideIn from="right" delay={0.08} className="flex flex-col gap-5 md:pt-2">
            {n.body.map((para) => (
              <p
                key={para}
                className="leading-relaxed"
                style={{ color: "var(--text-secondary)", fontSize: "var(--text-lead)" }}
              >
                {para}
              </p>
            ))}
          </SlideIn>
        </div>
      </Section>

      {/* MECHANISM — dark / orbs — THEN the capability that meets the loss + who it's for. */}
      <Section tone="dark" motion="orbs">
        <FadeUp>
          <Eyebrow>The mechanism</Eyebrow>
          <h2 className="mt-3 max-w-3xl" style={{ fontSize: "var(--text-h2)" }}>
            How the work meets the loss.
          </h2>
        </FadeUp>

        <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
          {n.mechanism.map((step, i) => (
            <StaggerItem key={step}>
              <Card className="h-full">
                <div className="flex gap-4">
                  <span
                    className="font-mono shrink-0 text-[13px] tracking-[0.14em]"
                    style={{ color: "var(--accent)" }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p style={{ color: "var(--text-primary)", fontSize: "var(--text-body)" }}>
                    {step}
                  </p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        {/* hairline frame keeps "who it's for" distinct from the mechanism grid */}
        <FadeUp delay={0.1} className="mt-10 max-w-3xl">
          <div className="border-t pt-6" style={{ borderColor: "var(--border-subtle)" }}>
            <p
              className="font-mono text-[11px] uppercase tracking-[0.16em]"
              style={{ color: "var(--text-muted)" }}
            >
              Who it is for
            </p>
            <p
              className="mt-3"
              style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
            >
              {n.forWho}
            </p>
          </div>
        </FadeUp>
      </Section>

      {/* GATED TOOL NUDGE + PRIMARY CTA — light / none — final band, LIGHT before the dark footer. */}
      <Section tone="light" motion="none">
        <div className="grid items-start gap-10 md:gap-14 lg:grid-cols-2">
          {showTool ? (
            <FadeUp>
              <Card className="h-full">
                <Eyebrow>{gatedTool.eyebrow}</Eyebrow>
                <h2 className="mt-3" style={{ fontSize: "var(--text-h3)" }}>
                  {gatedTool.headline}
                </h2>
                <p
                  className="mt-4"
                  style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
                >
                  {gatedTool.body}
                </p>
                <div className="mt-6">
                  {/* The scorer page lives at /tools/cmmc-readiness (gatedTool.slug is the
                      tool's identifier, not its route). Point at the real route, not /slug. */}
                  <CtaLink href="/tools/cmmc-readiness" variant="secondary">
                    {gatedTool.submitLabel}
                  </CtaLink>
                </div>
              </Card>
            </FadeUp>
          ) : null}

          <FadeUp delay={showTool ? 0.1 : 0} className={showTool ? "" : "mx-auto max-w-2xl text-center"}>
            <Eyebrow>Start here</Eyebrow>
            <h2 className="mt-3" style={{ fontSize: "var(--text-h2)" }}>
              Put the constraint in front of an operator.
            </h2>
            <p
              className={`mt-4 max-w-xl leading-relaxed ${showTool ? "" : "mx-auto"}`}
              style={{ color: "var(--text-secondary)", fontSize: "var(--text-lead)" }}
            >
              Name your trigger when you request the conversation, a prime supplier letter, a
              CMMC window, an LOI in diligence, and I respond within 48 hours with a realistic
              timing window.
            </p>
            <div className={`mt-8 flex ${showTool ? "" : "justify-center"}`}>
              <CtaLink href={n.cta.href} variant="primary">
                {n.cta.label}
              </CtaLink>
            </div>
          </FadeUp>
        </div>
      </Section>
    </>
  );
}
