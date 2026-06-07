import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import FadeUp from "@/components/animations/FadeUp";
import { method } from "@/data/site";

// Band 3 — Method. Tone dark, motion drift, layout = bento grid (4 unequal cells).
// Standard Work 2.0 four pillars (design-system §4 #3). Reads as a system, not a slogan.
// Bento: pillar 0 + pillar 3 span wider on lg; pillars 1 + 2 are narrower.
const SPAN = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"] as const;

export default function MethodSection() {
  return (
    <Section tone="dark" motion="drift" id="method">
      <FadeUp className="max-w-3xl">
        <Eyebrow>{method.eyebrow}</Eyebrow>
        <h2
          className="mt-4 font-display font-bold"
          style={{ fontSize: "var(--text-h2)", color: "var(--text-primary)" }}
        >
          {method.title}
        </h2>
        <p className="mt-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {method.intro}
        </p>
      </FadeUp>

      <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
        {method.pillars.map((pillar, i) => (
          <FadeUp key={pillar.name} delay={i * 0.08} className={SPAN[i] ?? "lg:col-span-6"}>
            <Card className="h-full">
              <div className="flex items-start gap-4">
                <span className="text-3xl leading-none" aria-hidden="true">
                  {pillar.emoji}
                </span>
                <div>
                  <h3
                    className="font-display font-semibold"
                    style={{ fontSize: "var(--text-h3)", color: "var(--text-primary)" }}
                  >
                    {pillar.name}
                  </h3>
                  <p
                    className="font-mono mt-1 text-[12px] uppercase tracking-[0.12em]"
                    style={{ color: "var(--accent)" }}
                  >
                    {pillar.plainName}
                  </p>
                </div>
              </div>
              <p
                className="mt-5 leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {pillar.description}
              </p>
            </Card>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}
