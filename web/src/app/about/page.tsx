import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import CtaLink from "@/components/ui/Button";
import FadeUp from "@/components/animations/FadeUp";
import SlideIn from "@/components/animations/SlideIn";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { about, proof, seo } from "@/data/site";

// ----------------------------------------------------------------------------
// /about — proof-of-operating-role is the #1 trust signal for this audience
// (market-intel §7; design-system §11). Leads with checkable specifics, no
// owner headshot anywhere (CLAUDE.md Hero Architecture Rule), no missing-image
// references (token placeholder box stands in for the industrial still).
//
// Tone string (strictly alternating, ends LIGHT opposite the DARK global footer):
//   PageHeader(D) · Origin(L) · Beliefs(D) · Proof(L) · WhoIServe(D) · Credentials(L) · [Footer D]
// Adjacent motions all differ: orbs · grain · drift · twinkle · ash · none.
// Layout archetypes vary per band (design-system §4: asymmetric split + instrument
// readouts over centered marketing stacks).
// ----------------------------------------------------------------------------

const meta = seo["/about"];

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: { title: meta.title, description: meta.description, type: "profile" },
};

export default function AboutPage() {
  return (
    <>
      {/* 1 — Header (dark) */}
      <PageHeader
        tone="dark"
        motion="orbs"
        eyebrow={about.eyebrow}
        title={about.title}
        intro={about.origin[0]}
      />

      {/* 2 — Origin story (light) · asymmetric split: long-form text left, industrial still placeholder right */}
      <Section tone="light" motion="grain">
        <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <SlideIn from="left" className="order-2 lg:order-1">
            <Eyebrow>The path here</Eyebrow>
            <div className="mt-6 space-y-6">
              {about.origin.slice(1).map((para) => (
                <p
                  key={para.slice(0, 32)}
                  className="leading-relaxed"
                  style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
                >
                  {para}
                </p>
              ))}
            </div>
          </SlideIn>

          <SlideIn from="right" className="order-1 lg:order-2 lg:sticky lg:top-32">
            {/* Industrial still placeholder — NO headshot, NO missing image file reference.
                Token box keeps the machined-steel register (design-system §6). */}
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-md border"
              style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
              aria-hidden="true"
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 90% at 78% 18%, rgba(184,134,75,0.16) 0%, rgba(184,134,75,0) 52%)",
                }}
              />
              <div
                className="absolute left-5 top-5 font-mono text-[11px] uppercase tracking-[0.16em]"
                style={{ color: "var(--text-muted)" }}
              >
                Shop floor, 6 a.m.
              </div>
              {/* Single brass torque-indicator seam under raking light (design-system §6 mood). */}
              <div
                className="absolute bottom-8 left-6 right-6 h-px"
                style={{ background: "var(--accent)" }}
              />
            </div>
          </SlideIn>
        </div>
      </Section>

      {/* 3 — What I believe (dark) · staggered hairline rows */}
      <Section tone="dark" motion="drift">
        <FadeUp>
          <Eyebrow>What I believe</Eyebrow>
          <h2 className="mt-4 max-w-3xl" style={{ fontSize: "var(--text-h2)" }}>
            The operating principles behind every engagement.
          </h2>
        </FadeUp>

        <Stagger className="mt-10 space-y-4 md:mt-12">
          {about.beliefs.map((belief) => (
            <StaggerItem key={belief.statement.slice(0, 32)}>
              <div
                className="flex items-start gap-5 border-t pt-5"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <span className="shrink-0 text-2xl leading-none" aria-hidden="true">
                  {belief.emoji}
                </span>
                <p
                  className="leading-relaxed"
                  style={{ color: "var(--text-primary)", fontSize: "var(--text-body)" }}
                >
                  {belief.statement}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 4 — Proof of operating role (light) · mono instrument-readout stat block + authority line. The trust core. */}
      <Section tone="light" motion="twinkle">
        <FadeUp>
          <Eyebrow>{proof.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-3xl" style={{ fontSize: "var(--text-h2)" }}>
            {proof.title}
          </h2>
        </FadeUp>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
          {proof.stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <Card className="h-full">
                <div className="flex items-baseline gap-3">
                  <span className="text-xl leading-none" aria-hidden="true">
                    {stat.emoji}
                  </span>
                  <span
                    className="font-mono text-2xl font-medium md:text-3xl"
                    style={{ color: "var(--accent)" }}
                  >
                    {stat.value}
                  </span>
                </div>
                <p
                  className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {stat.label}
                </p>
                <p
                  className="mt-2 text-[14px] leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {stat.note}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeUp delay={0.1}>
          <p
            className="mt-10 max-w-3xl border-l-2 pl-5 leading-relaxed md:mt-12"
            style={{
              borderColor: "var(--accent)",
              color: "var(--text-primary)",
              fontSize: "var(--text-body)",
            }}
          >
            {proof.authorityLine}
          </p>
        </FadeUp>
      </Section>

      {/* 5 — Who I serve (dark) · two-column: audience profile left, the why-us checklist right */}
      <Section tone="dark" motion="ash">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <FadeUp>
              <Eyebrow>Who I serve</Eyebrow>
              <h2 className="mt-4" style={{ fontSize: "var(--text-h2)" }}>
                You already recognize your shop in this.
              </h2>
            </FadeUp>
            <Stagger className="mt-8 space-y-4">
              {about.whoWeServe.map((line) => (
                <StaggerItem key={line.slice(0, 32)}>
                  <p
                    className="leading-relaxed"
                    style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
                  >
                    {line}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <FadeUp delay={0.1}>
            <Card className="h-full">
              <p
                className="font-mono text-[11px] uppercase tracking-[0.16em]"
                style={{ color: "var(--text-muted)" }}
              >
                Why an operator, not an advisor
              </p>
              <ul className="mt-5 space-y-4">
                {about.whyUs.map((line) => (
                  <li key={line.slice(0, 32)} className="flex items-start gap-3">
                    <span
                      className="shrink-0 leading-relaxed"
                      style={{ color: "var(--status-cleared)" }}
                      aria-hidden="true"
                    >
                      ✅
                    </span>
                    <span
                      className="leading-relaxed"
                      style={{ color: "var(--text-primary)", fontSize: "var(--text-body)" }}
                    >
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </FadeUp>
        </div>
      </Section>

      {/* 6 — Credentials + named primes (light, static gradient ok — text-dense) · closes with booking CTA. Last band LIGHT, opposite dark footer. */}
      <Section tone="light" motion="none">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <FadeUp>
              <Eyebrow>Credentials</Eyebrow>
              <h2 className="mt-4" style={{ fontSize: "var(--text-h2)" }}>
                The discipline behind the method.
              </h2>
            </FadeUp>
            <Stagger className="mt-8 space-y-3">
              {about.credentials.map((line) => (
                <StaggerItem key={line.slice(0, 32)}>
                  <div
                    className="border-t pt-3 leading-relaxed"
                    style={{
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-secondary)",
                      fontSize: "var(--text-body)",
                    }}
                  >
                    {line}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <FadeUp delay={0.1}>
            <Card className="flex h-full flex-col justify-between">
              <div>
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.16em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Named prime relationships
                </p>
                <p
                  className="mt-5 leading-relaxed"
                  style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
                >
                  {about.namedPrimes}
                </p>
              </div>
              <div className="mt-8">
                <CtaLink href="/booking" variant="primary">
                  Request a Strategic Conversation
                </CtaLink>
              </div>
            </Card>
          </FadeUp>
        </div>
      </Section>
    </>
  );
}
