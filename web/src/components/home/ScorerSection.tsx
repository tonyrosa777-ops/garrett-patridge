import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import CtaLink from "@/components/ui/Button";
import SlideIn from "@/components/animations/SlideIn";
import { gatedTool } from "@/data/site";

// Band 9 — CMMC Readiness Self-Scorer (the forwardable, no-commitment tool). Tone dark,
// motion drift, layout = asymmetric split (statement left, "what it checks" preview right).
// Added after the Prospect-Journey audit: the scorer (Premortem Patch #2 day-one conversion
// path) was footer-only, so the not-ready-to-buy / forward-to-CFO visitor never saw it on
// the homepage. This is the low-commitment on-ramp the waitlist-only funnel lacked.
export default function ScorerSection() {
  return (
    <Section tone="dark" motion="drift">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <SlideIn from="left">
          <Eyebrow>{gatedTool.eyebrow}</Eyebrow>
          <h2
            className="mt-4 font-display font-bold"
            style={{ fontSize: "var(--text-h2)", color: "var(--text-primary)" }}
          >
            {gatedTool.headline}
          </h2>
          <p
            className="mt-5 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {gatedTool.body}
          </p>
          <div className="mt-8">
            <CtaLink href={`/${gatedTool.slug}`} variant="primary">
              {gatedTool.submitLabel}
            </CtaLink>
          </div>
        </SlideIn>

        <SlideIn from="right">
          <Card>
            <p
              className="font-mono"
              style={{ color: "var(--accent)", fontSize: "var(--text-eyebrow)", letterSpacing: "0.04em" }}
            >
              What it checks
            </p>
            <ul className="mt-5 flex flex-col gap-3.5">
              {gatedTool.fields.slice(0, 5).map((field) => (
                <li
                  key={field}
                  className="grid grid-cols-[auto_1fr] gap-3 text-[14px] leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span style={{ color: "var(--accent)" }} aria-hidden="true">
                    ◦
                  </span>
                  <span>{field}</span>
                </li>
              ))}
            </ul>
            <p
              className="mt-5 text-[13px]"
              style={{ color: "var(--text-muted)" }}
            >
              Ten questions, a readiness band, the gaps named in plain language. No sales call,
              no email required to see your score.
            </p>
          </Card>
        </SlideIn>
      </div>
    </Section>
  );
}
