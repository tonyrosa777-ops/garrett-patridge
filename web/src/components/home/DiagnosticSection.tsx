import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import CtaLink from "@/components/ui/Button";
import FadeUp from "@/components/animations/FadeUp";
import { diagnosticTeaser } from "@/data/site";

// Band 6 — Diagnostic teaser. Tone light (gunmetal), motion ash, layout = pulled statement.
// A single large control-panel statement (mid-page nudge), distinct format/intent from
// the hero + capacity CTAs (design-system §4 #6, no duplicate "Ready to..?" block).
export default function DiagnosticSection() {
  return (
    <Section tone="light" motion="ash" id="diagnostic" containerClassName="max-w-3xl text-center">
      <FadeUp>
        <Eyebrow>{diagnosticTeaser.eyebrow}</Eyebrow>
        <p
          className="mt-6 font-display font-semibold leading-snug"
          style={{ fontSize: "var(--text-h2)", color: "var(--text-primary)" }}
        >
          {diagnosticTeaser.statement}
        </p>
        <div className="mt-9 flex justify-center">
          <CtaLink href={diagnosticTeaser.cta.href} variant="secondary">
            {diagnosticTeaser.cta.label} →
          </CtaLink>
        </div>
      </FadeUp>
    </Section>
  );
}
