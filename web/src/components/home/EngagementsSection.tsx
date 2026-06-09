import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import CtaLink from "@/components/ui/Button";
import FadeUp from "@/components/animations/FadeUp";
import { engagements } from "@/data/site";

// Band 5 — Engagement models. Tone dark, motion orbs. EQUAL aligned 3-up grid (symmetry —
// Error #109; the prior vertical "stagger" offset read as misaligned). 3 cards, NO price.
const OFFSET = ["lg:mt-0", "lg:mt-0", "lg:mt-0"] as const;

export default function EngagementsSection() {
  return (
    <Section tone="dark" motion="orbs" id="engagements">
      <FadeUp className="max-w-3xl">
        <Eyebrow>Engagement models</Eyebrow>
        <h2
          className="mt-4 font-display font-bold"
          style={{ fontSize: "var(--text-h2)", color: "var(--text-primary)" }}
        >
          Three ways to put the constraint in front of an operator.
        </h2>
      </FadeUp>

      <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-start lg:gap-8">
        {engagements.map((eng, i) => (
          <FadeUp key={eng.slug} delay={i * 0.1} className={OFFSET[i] ?? "lg:mt-0"}>
            <Card className="flex h-full flex-col">
              <span className="text-3xl leading-none" aria-hidden="true">
                {eng.emoji}
              </span>
              <h3
                className="mt-4 font-display font-semibold"
                style={{ fontSize: "var(--text-h3)", color: "var(--text-primary)" }}
              >
                {eng.name}
              </h3>
              <p
                className="mt-2 text-[14px] leading-relaxed"
                style={{ color: "var(--accent)" }}
              >
                {eng.tagline}
              </p>
              <p
                className="mt-4 text-[15px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {eng.forWho}
              </p>

              <ul className="mt-5 flex flex-col gap-2.5">
                {eng.whatYouGet.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-[auto_1fr] gap-2.5 text-[14px] leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span style={{ color: "var(--accent)" }} aria-hidden="true">
                      ◦
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                <CtaLink href={eng.cta.href} variant="primary">
                  {eng.cta.label}
                </CtaLink>
              </div>
            </Card>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}
