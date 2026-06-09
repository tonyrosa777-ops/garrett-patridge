import type { Metadata } from "next";

import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import CtaLink from "@/components/ui/Button";
import InstrumentTable from "@/components/ui/InstrumentTable";
import StatusRow from "@/components/ui/StatusRow";
import FadeUp from "@/components/animations/FadeUp";
import SlideIn from "@/components/animations/SlideIn";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

import { method, problem, engagements, diagnosticTeaser, seo } from "@/data/site";

// ============================================================
// /method — the deep dive on Standard Work 2.0(TM), the four-pillar operating system.
// Expands the homepage method bento (design-system §4 row 3 → its own page here).
//
// Tone rhythm (footer is DARK globally → page MUST end LIGHT, strict alternation):
//   [Nav]            — D — chrome (fixed bookend)
//   PageHeader       — D — intro / orientation        → drift
//   Four pillars     — L — education (the method)      → grain    (bento / asymmetric per pillar)
//   What it fixes    — D — proof (fault → response)    → twinkle  (instrument readout signature)
//   Engagement + CTA — L — conversion (bridge + book)  → orbs
//   [Footer]         — D — chrome (fixed bookend)
// Tone string: D · L · D · L → ends LIGHT opposite the DARK footer. Adjacent motions all differ.
// All copy from site.ts; pillar descriptions expanded only within site.ts meaning. Zero em dashes.
// Server Component. One H1 (PageHeader). Trademark rendered as "Standard Work 2.0(TM)" via ™.
// ============================================================

export const metadata: Metadata = {
  title: seo["/method"].title,
  description: seo["/method"].description,
};

const TM = "™";

export default function MethodPage() {
  return (
    <main>
      {/* 1. PageHeader — DARK, drift */}
      <PageHeader
        tone="dark"
        motion="drift"
        eyebrow={method.eyebrow}
        title={`Standard Work 2.0${TM}, the operating system.`}
        intro={method.intro}
      />

      {/* 2. The four pillars — LIGHT, grain. Asymmetric split per pillar (alternating side),
          NOT a uniform 3-up grid. Each pillar: emoji + name + plainName + what-it-is /
          why-it-matters-to-your-P&L-and-floor framing (design-system §7). */}
      <Section tone="light" motion="grain">
        <Eyebrow>The four pillars</Eyebrow>
        <h2
          className="mt-4 max-w-3xl"
          style={{ fontSize: "var(--text-h2)", color: "var(--text-primary)" }}
        >
          Four pillars. Each one ties a mechanism to a number you already watch.
        </h2>
        <p
          className="mt-5 max-w-2xl"
          style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
        >
          The discipline of lean standard work, taken off the production floor and applied to
          the whole company. Back office and shop floor on one auditable system.
        </p>

        <div className="mt-12 flex flex-col gap-6 md:mt-16 md:gap-10">
          {method.pillars.map((pillar, i) => {
            const fromSide = i % 2 === 0 ? "left" : "right";
            // Asymmetric split: name block (~2/5) + expanded body (~3/5). On even rows the
            // name leads; on odd rows the body leads, so no two adjacent pillars share a layout.
            const nameFirst = i % 2 === 0;
            const indexLabel = String(i + 1).padStart(2, "0");

            const nameBlock = (
              <div className="md:col-span-2">
                <div className="flex items-baseline gap-3">
                  <span
                    aria-hidden="true"
                    className="text-3xl md:text-4xl"
                    style={{ lineHeight: 1 }}
                  >
                    {pillar.emoji}
                  </span>
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.16em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Pillar {indexLabel}
                  </span>
                </div>
                <h3
                  className="mt-4"
                  style={{ fontSize: "var(--text-h3)", color: "var(--text-primary)" }}
                >
                  {pillar.name}
                </h3>
                <p
                  className="mt-2 text-[15px] leading-relaxed"
                  style={{ color: "var(--accent)" }}
                >
                  {pillar.plainName}
                </p>
              </div>
            );

            const bodyBlock = (
              <div className="md:col-span-3">
                <p
                  className="text-[15px] leading-relaxed md:text-base"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {pillar.description}
                </p>
              </div>
            );

            return (
              <SlideIn key={pillar.name} from={fromSide}>
                <Card>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:items-start md:gap-10">
                    {nameFirst ? (
                      <>
                        {nameBlock}
                        {bodyBlock}
                      </>
                    ) : (
                      <>
                        {bodyBlock}
                        {nameBlock}
                      </>
                    )}
                  </div>
                </Card>
              </SlideIn>
            );
          })}
        </div>
      </Section>

      {/* 3. What it fixes — DARK, twinkle. The instrument-readout signature: each fault from
          the homepage Problem panel, with the pillar that responds and the status moving from
          blocked/warn to CLEARED. Source: problem.rows mapped to method.pillars (no new claims). */}
      <Section tone="dark" motion="twinkle">
        <Eyebrow>Fault, then response</Eyebrow>
        <h2
          className="mt-4 max-w-3xl"
          style={{ fontSize: "var(--text-h2)", color: "var(--text-primary)" }}
        >
          What the method clears, one fault at a time.
        </h2>
        <p
          className="mt-5 max-w-2xl"
          style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
        >
          The same faults you already feel, scored the way a buyer scores a part. Here each one
          reads CLEARED, with the pillar that does the clearing named on the line.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-10">
          <FadeUp>
            <InstrumentTable caption="Before: the fault readout">
              {problem.rows.map((row) => (
                <StatusRow
                  key={row.label}
                  status={row.status}
                  label={row.label}
                  detail={row.detail}
                />
              ))}
            </InstrumentTable>
          </FadeUp>

          <FadeUp delay={0.1}>
            <InstrumentTable caption={`After: Standard Work 2.0${TM} installed`}>
              {FAULT_RESPONSES.map((res) => (
                <StatusRow
                  key={res.label}
                  status="cleared"
                  label={res.label}
                  detail={res.detail}
                />
              ))}
            </InstrumentTable>
          </FadeUp>
        </div>
      </Section>

      {/* 4. How an engagement applies it + closing — LIGHT, orbs. Bridge to /engagements,
          the diagnostic nudge → /diagnostic, and the primary booking CTA. This is the final
          band → LIGHT, opposite the DARK footer. */}
      <Section tone="light" motion="orbs">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Bridge to engagements */}
          <div className="lg:col-span-7">
            <Eyebrow>How it gets installed</Eyebrow>
            <h2
              className="mt-4"
              style={{ fontSize: "var(--text-h2)", color: "var(--text-primary)" }}
            >
              The method runs through an engagement.
            </h2>
            <p
              className="mt-5 max-w-2xl"
              style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
            >
              The four pillars are not a deliverable on their own. They get installed through one
              of three ways to work, scoped to the constraint you are actually fighting.
            </p>

            <Stagger className="mt-8 flex flex-col gap-4">
              {engagements.map((eng) => (
                <StaggerItem key={eng.slug}>
                  <Card>
                    <div className="flex items-start gap-4">
                      <span aria-hidden="true" className="text-2xl" style={{ lineHeight: 1 }}>
                        {eng.emoji}
                      </span>
                      <div>
                        <h3
                          style={{ fontSize: "var(--text-h3)", color: "var(--text-primary)" }}
                        >
                          {eng.name}
                        </h3>
                        <p
                          className="mt-2 text-[15px] leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {eng.tagline}
                        </p>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-8">
              <CtaLink href="/engagements" variant="ghost">
                See the three engagements
              </CtaLink>
            </div>
          </div>

          {/* Diagnostic nudge + closing booking CTA */}
          <div className="lg:col-span-5">
            <FadeUp>
              <Card className="lg:sticky lg:top-32">
                <Eyebrow>{diagnosticTeaser.eyebrow}</Eyebrow>
                <p
                  className="mt-5 text-lg leading-relaxed md:text-xl"
                  style={{ color: "var(--text-primary)" }}
                >
                  {diagnosticTeaser.statement}
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <CtaLink href={diagnosticTeaser.cta.href} variant="secondary">
                    {diagnosticTeaser.cta.label}
                  </CtaLink>
                  <CtaLink href="/booking#book" variant="primary">
                    Request a Strategic Conversation
                  </CtaLink>
                </div>
              </Card>
            </FadeUp>
          </div>
        </div>
      </Section>
    </main>
  );
}

// ============================================================
// Fault → response mapping. Each entry pairs a problem.row fault with the pillar that clears
// it, restated as a CLEARED instrument line. Labels + details stay within the meaning already
// established in site.ts (problem.rows + method.pillars). No new claims, numbers, or em dashes.
// ============================================================

interface FaultResponse {
  label: string;
  detail: string;
}

const FAULT_RESPONSES: FaultResponse[] = [
  {
    label: "CMMC Phase 2 gate",
    detail:
      "Sovereign Tier builds CMMC, ITAR, and AS9100 into the work itself, so the controls are already running and stand as evidence the day the C3PAO walks in.",
  },
  {
    label: "Backlog outrunning cash",
    detail:
      "Margin Engineering maps the value stream and converts recovered capacity into cash conversion days, so the order book stops starving working capital.",
  },
  {
    label: "The Hidden Factory",
    detail:
      "Margin Engineering finds the rework and waste the ERP never recorded and turns the loss Feigenbaum named into margin you can bank.",
  },
  {
    label: "SPRS score exposure",
    detail:
      "Sovereign Tier gets the score right and documented, so a self-assessment survives scrutiny instead of standing as a false-affirmation risk.",
  },
  {
    label: "IT and OT as separate liabilities",
    detail:
      "IT/OT Convergence turns MES, ERP, and SCADA into one auditable digital thread the assessor can follow end to end, not three networks with three owners.",
  },
  {
    label: "No full-time COO at the helm",
    detail:
      "Human-in-the-Loop lifts technicians into site leadership while verified human judgment stays on every decision, so the system holds without a 300,000 dollar hire.",
  },
];
