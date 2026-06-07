import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import CtaLink from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import FadeUp from "@/components/animations/FadeUp";
import { engagements, capacity, seo } from "@/data/site";

// /engagements (index). All copy from site.ts. NO pricing. CTA → /booking.
// Rhythm map (footer is dark navy, so the last content band must be LIGHT):
// [Nav]            — light — fixed bookend (chrome)
// PageHeader       — dark  — conversion intro      → orbs
// Engagement cards — light — education (the offer)  → grain   (staggered cards, §4)
// Capacity ladder  — dark  — qualification          → ash
// Closing CTA      — light — conversion (final)     → grain  (LIGHT before dark footer)
// [Footer]         — dark  — fixed bookend (navy)
// Tones: L D L D L D — strict alternation, ends light before the dark footer.

const entry = seo["/engagements"];

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
  openGraph: { title: entry.title, description: entry.description },
};

export default function EngagementsPage() {
  return (
    <>
      <PageHeader
        tone="dark"
        motion="orbs"
        eyebrow="Engagements"
        title="Three ways to put an operator on your floor."
        intro="Each engagement is scoped to the constraint you are actually fighting. A fixed-scope diagnostic, an embedded fractional COO, or a strategic consultancy aimed at one defined event. Every path opens with a strategic conversation, not a pitch."
      />

      {/* ENGAGEMENT CARDS — light / grain — staggered, not uniform (design-system §4). */}
      <Section tone="light" motion="grain">
        <Eyebrow>The engagements</Eyebrow>
        <h2 className="mt-3 max-w-3xl" style={{ fontSize: "var(--text-h2)" }}>
          Pick the depth the situation calls for.
        </h2>

        <Stagger className="mt-12 flex flex-col gap-6 md:gap-8">
          {engagements.map((e, i) => {
            // Staggered, non-uniform: alternate the panel width + offset so the column
            // reads as an editorial stack rather than an equal card grid.
            const offset =
              i === 1 ? "md:ml-auto md:mr-0" : i === 2 ? "md:mx-auto" : "md:mr-auto md:ml-0";
            const widthClass = i === 0 ? "md:max-w-2xl" : i === 1 ? "md:max-w-xl" : "md:max-w-3xl";

            return (
              <StaggerItem key={e.slug} className={`${widthClass} ${offset} w-full`}>
                <Card>
                  <div className="flex items-baseline gap-3">
                    <span aria-hidden="true" style={{ fontSize: "1.75rem", lineHeight: 1 }}>
                      {e.emoji}
                    </span>
                    <h3 style={{ fontSize: "var(--text-h3)" }}>{e.name}</h3>
                  </div>

                  <p
                    className="mt-3"
                    style={{ color: "var(--accent)", fontSize: "var(--text-body)", fontWeight: 500 }}
                  >
                    {e.tagline}
                  </p>

                  <p
                    className="mt-4"
                    style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
                  >
                    {e.forWho}
                  </p>

                  <ul className="mt-6 flex flex-col gap-3">
                    {e.whatYouGet.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-1 shrink-0"
                          style={{ color: "var(--accent)" }}
                        >
                          ✓
                        </span>
                        <span style={{ color: "var(--text-secondary)" }}>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <p
                    className="mt-6 border-t pt-5"
                    style={{
                      color: "var(--text-secondary)",
                      borderColor: "var(--border-subtle)",
                      fontSize: "var(--text-body)",
                    }}
                  >
                    {e.how}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <CtaLink href={e.cta.href} variant="primary">
                      {e.cta.label}
                    </CtaLink>
                    <CtaLink href={`/engagements/${e.slug}`} variant="ghost">
                      Details →
                    </CtaLink>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* CAPACITY LADDER — dark / ash — the real constraint, two rungs. */}
      <Section tone="dark" motion="ash">
        <FadeUp>
          <Eyebrow>{capacity.eyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-3xl" style={{ fontSize: "var(--text-h2)" }}>
            {capacity.title}
          </h2>
          {capacity.body.map((para) => (
            <p
              key={para}
              className="mt-4 max-w-2xl"
              style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
            >
              {para}
            </p>
          ))}
        </FadeUp>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[capacity.fullEngagement, capacity.consult].map((rung) => (
            <Card key={rung.label}>
              <h3 style={{ fontSize: "var(--text-h3)" }}>{rung.label}</h3>
              <p
                className="mt-3"
                style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
              >
                {rung.detail}
              </p>
              <div className="mt-6">
                <CtaLink href={rung.cta.href} variant="secondary">
                  {rung.cta.label}
                </CtaLink>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* CLOSING CTA — light / grain — final band, LIGHT before the dark footer. */}
      <Section tone="light" motion="grain" containerClassName="text-center">
        <FadeUp className="mx-auto max-w-2xl">
          <Eyebrow>Start here</Eyebrow>
          <h2 className="mt-3" style={{ fontSize: "var(--text-h2)" }}>
            Name the trigger. Get a realistic window in 48 hours.
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl"
            style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
          >
            A prime supplier letter, a CMMC audit window, an LOI in diligence. Tell me which
            one is running and I respond within 48 hours with a realistic timing window.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaLink href="/booking" variant="primary">
              Request a Strategic Conversation
            </CtaLink>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
