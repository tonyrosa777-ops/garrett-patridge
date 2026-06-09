import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import BookingCalendar from "@/components/BookingCalendar";
import { capacity, seo } from "@/data/site";

// /booking — centered-stack conversion page with a breathing-orb header (design-system §4).
// Rhythm: PageHeader dark (orbs) → Section light (static, form-dense). Last band LIGHT,
// opposite the global DARK footer. The inline BookingCalendar is the conversion. No price,
// no countdown — the two-tier ladder (full-engagement waitlist + consult lower rung) is
// stated plainly per the capacity data. Server Component; copy only from site.ts.
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

      <Section tone="light" motion="none" containerClassName="max-w-3xl">
        <div className="mx-auto flex flex-col items-center text-center">
          <Eyebrow>How a conversation starts</Eyebrow>
          <p
            className="mt-4 max-w-2xl"
            style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
          >
            {body[1]}
          </p>

          {/* Two-tier ladder — full-engagement waitlist + consult lower rung, plainly stated. */}
          <div className="mt-10 grid w-full gap-4 text-left md:grid-cols-2">
            {[fullEngagement, consult].map((rung) => (
              <div
                key={rung.label}
                className="rounded-md p-6 md:p-8"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                }}
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
                  className="mt-3 text-[15px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {rung.detail}
                </p>
              </div>
            ))}
          </div>

          {/* The conversion — custom branded scheduler, self-sufficient surface.
              id="book" is the deep-link target so the hero/nav "Request a Strategic
              Conversation" CTAs (/booking#book) snap straight to the calendar; the
              scroll-mt clears the fixed nav so it isn't tucked underneath. */}
          <div id="book" className="mt-12 w-full max-w-2xl scroll-mt-28 text-left md:scroll-mt-32">
            <BookingCalendar />
          </div>
        </div>
      </Section>
    </main>
  );
}
