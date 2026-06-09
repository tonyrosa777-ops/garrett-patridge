import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import BookingCalendar from "@/components/BookingCalendar";
import { capacity, seo } from "@/data/site";

// /booking — each distinct idea gets its OWN alternating-tone band (Error #108: never
// stack multiple ideas in one gray blob). Rhythm with the dark PageHeader + dark footer
// bookends → odd content-band count ending LIGHT:
//   [Nav] D · PageHeader D · How-it-starts L · Two-tier ladder D · Calendar L · [Footer] D
// Strict alternation, ends LIGHT opposite the DARK footer. Adjacent motions all differ.
// Server Component; copy only from site.ts. No price, no countdown.
export const metadata: Metadata = {
  title: seo["/booking"].title,
  description: seo["/booking"].description,
};

export default function BookingPage() {
  const { eyebrow, body, fullEngagement, consult } = capacity;

  return (
    <main>
      <PageHeader
        tone="dark"
        motion="orbs"
        eyebrow={eyebrow}
        title="Request a Strategic Conversation"
        intro={body[0]}
      />

      {/* Idea 1 — how a conversation starts (LIGHT band, its own container) */}
      <Section tone="light" motion="grain" containerClassName="max-w-3xl">
        <div className="mx-auto flex flex-col items-center text-center">
          <Eyebrow>How a conversation starts</Eyebrow>
          <p
            className="mt-4 max-w-2xl"
            style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)", lineHeight: 1.65 }}
          >
            {body[1]}
          </p>
        </div>
      </Section>

      {/* Idea 2 — the two-tier ladder (DARK band, its own container) */}
      <Section tone="dark" motion="twinkle">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Two ways to start</Eyebrow>
          <h2
            className="mt-4 font-display font-bold"
            style={{ fontSize: "var(--text-h3)", color: "var(--text-primary)" }}
          >
            Wait for a full slot, or start this week with a paid consult.
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-3xl gap-5 text-left md:grid-cols-2">
          {[fullEngagement, consult].map((rung) => (
            <div
              key={rung.label}
              className="card-surface rounded-md border p-6 md:p-8"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                {rung.label}
              </p>
              <p
                className="mt-3 text-[15px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {rung.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Idea 3 — the conversion (LIGHT band, its own container). The calendar is a
          self-sufficient elevated surface (Error #107), so it reads on this light band.
          id="book" + scroll-mt = the /booking#book deep-link target so the CTAs snap here. */}
      <Section tone="light" motion="none">
        <div id="book" className="mx-auto w-full max-w-2xl scroll-mt-28 md:scroll-mt-32">
          <BookingCalendar />
        </div>
      </Section>
    </main>
  );
}
