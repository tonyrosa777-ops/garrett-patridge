import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import FadeUp from "@/components/animations/FadeUp";
import BookingCalendar from "@/components/BookingCalendar";
import { capacity } from "@/data/site";

// Band 8 — Capacity / waitlist. Tone light (gunmetal), motion orbs, layout = centered stack
// (the one rationed centered stack). Two-tier ladder (full engagement waitlist + consult),
// plainly stated, NO countdown, then the inline BookingCalendar as the ONE closing CTA
// (design-system §4 #8; CLAUDE.md two-tier capacity ladder Patch #3). Opposite tone to dark footer.
const rungs = [capacity.fullEngagement, capacity.consult];

export default function CapacitySection() {
  return (
    <Section tone="light" motion="orbs" id="capacity" containerClassName="max-w-4xl">
      <FadeUp className="text-center">
        <Eyebrow>{capacity.eyebrow}</Eyebrow>
        <h2
          className="mx-auto mt-4 max-w-2xl font-display font-bold"
          style={{ fontSize: "var(--text-h2)", color: "var(--text-primary)" }}
        >
          {capacity.title}
        </h2>
        <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-4">
          {capacity.body.map((para) => (
            <p key={para} className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {para}
            </p>
          ))}
        </div>
      </FadeUp>

      {/* Two-tier ladder, plainly stated */}
      <FadeUp delay={0.08} className="mt-12 grid gap-6 md:grid-cols-2">
        {rungs.map((rung) => (
          <div
            key={rung.label}
            className="rounded-md border p-6 md:p-7"
            style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
          >
            <p
              className="font-mono text-[12px] uppercase tracking-[0.14em]"
              style={{ color: "var(--accent)" }}
            >
              {rung.label}
            </p>
            <p
              className="mt-3 text-[14px] leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {rung.detail}
            </p>
          </div>
        ))}
      </FadeUp>

      {/* The one closing conversion: inline branded BookingCalendar */}
      <FadeUp delay={0.12} className="mt-14">
        <BookingCalendar
          heading="Request a Strategic Conversation"
          intro="Name your trigger, a prime supplier letter, a CMMC window, an LOI in diligence. I respond within 48 hours with a realistic timing window."
          eventTypeLabel="Strategic Conversation"
        />
      </FadeUp>
    </Section>
  );
}
