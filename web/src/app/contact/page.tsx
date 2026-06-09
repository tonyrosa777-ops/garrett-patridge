import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import BookingCalendar from "@/components/BookingCalendar";
import { siteConfig, footer, seo } from "@/data/site";

// /contact — routes to the booking flow as the primary action (Sections Matrix: no bare
// contact form). Rhythm: PageHeader dark (orbs) → ONE light Section (static, form-dense)
// with an asymmetric two-column block: left = how to reach Garrett + the DFARS-grade
// privacy posture; right = the inline branded BookingCalendar (contact = book). Last band
// LIGHT, opposite the global DARK footer. No Google Maps (on-site service across New
// England; the buyer inspects for trackers). No off-domain redirect (Conversion Flow Rule).
// LinkedIn renders only when social.linkedin is non-empty, so there is never a dead link.
// Server Component; copy only from site.ts.
export const metadata: Metadata = {
  title: seo["/contact"].title,
  description: seo["/contact"].description,
};

// Mono control-panel label, reused for the left-column field headings (design-system §3).
const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
};

export default function ContactPage() {
  const linkedin = siteConfig.social.linkedin;

  return (
    <main>
      <PageHeader
        tone="dark"
        motion="orbs"
        eyebrow="Contact"
        title="One operator, four engagements, a 48 hour reply."
        intro="The fastest path is to request a strategic conversation and name your trigger. Email works too, if you would rather start there."
      />

      {/* Last band LIGHT, opposite the dark footer. Asymmetric two-column: reach + posture
          on the left, the booking conversion on the right. Single column at 390. */}
      <Section tone="light" motion="none">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* Left — how to reach Garrett + the privacy posture. */}
          <div>
            <Eyebrow>How to reach Garrett</Eyebrow>
            <p
              className="mt-4 max-w-md"
              style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
            >
              The booking flow is the front door. It puts a real timing window in
              front of you, not a queue.
            </p>

            <dl className="mt-10 flex flex-col gap-8">
              <div>
                <dt style={labelStyle}>Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="transition-colors"
                    style={{ color: "var(--text-primary)", fontSize: "var(--text-body)" }}
                  >
                    {siteConfig.contactEmail}
                  </a>
                </dd>
              </div>

              <div>
                <dt style={labelStyle}>Based in</dt>
                <dd
                  className="mt-2"
                  style={{ color: "var(--text-primary)", fontSize: "var(--text-body)" }}
                >
                  {siteConfig.location}
                </dd>
              </div>

              <div>
                <dt style={labelStyle}>On-site across</dt>
                <dd
                  className="mt-2"
                  style={{ color: "var(--text-primary)", fontSize: "var(--text-body)" }}
                >
                  {siteConfig.serviceArea}
                </dd>
              </div>

              {linkedin ? (
                <div>
                  <dt style={labelStyle}>LinkedIn</dt>
                  <dd className="mt-2">
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost text-[15px] font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Connect on LinkedIn
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>

            {/* DFARS-grade privacy posture — the credibility signal for this buyer. */}
            <div
              className="card-surface mt-10 rounded-md border p-6"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <p style={{ ...labelStyle, color: "var(--accent)" }}>Privacy posture</p>
              <p
                className="mt-3 text-[15px]"
                style={{ color: "var(--text-secondary)" }}
              >
                {footer.privacyNote}
              </p>
            </div>
          </div>

          {/* Right — the conversion. Contact = book, inline and fully branded. */}
          <div>
            <BookingCalendar />
          </div>
        </div>
      </Section>
    </main>
  );
}
