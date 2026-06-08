import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import SlideIn from "@/components/animations/SlideIn";
import { proof } from "@/data/site";

// Band 4 — Proof of operating role. Tone light (gunmetal), motion twinkle, layout = asymmetric split.
// Mono stat block (left, values in brass) + authority line (right) (design-system §4 #4).
export default function StatsSection() {
  return (
    <Section tone="light" motion="twinkle" id="proof">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16">
        {/* Mono stat block (left) */}
        <SlideIn from="left">
          <Eyebrow>{proof.eyebrow}</Eyebrow>
          <h2
            className="mt-4 font-display font-bold"
            style={{ fontSize: "var(--text-h2)", color: "var(--text-primary)" }}
          >
            {proof.title}
          </h2>

          <dl className="mt-10 grid grid-cols-1 gap-px sm:grid-cols-2">
            {proof.stats.map((stat) => (
              <div
                key={stat.label}
                className="border-t py-6 sm:pr-6"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <dt className="flex items-baseline gap-2">
                  <span className="text-lg leading-none" aria-hidden="true">
                    {stat.emoji}
                  </span>
                  <span
                    className="font-mono text-[1.6rem] font-medium leading-tight"
                    style={{ color: "var(--accent)" }}
                  >
                    {stat.value}
                  </span>
                </dt>
                <dd>
                  <p
                    className="font-mono mt-2 text-[12px] uppercase tracking-[0.12em]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="mt-2 text-[14px] leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {stat.note}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </SlideIn>

        {/* Authority line (right) */}
        <SlideIn from="right" className="lg:self-center">
          <div
            className="border-l-2 pl-6"
            style={{ borderColor: "var(--accent)" }}
          >
            <p
              className="font-display leading-relaxed"
              style={{ fontSize: "var(--text-h3)", color: "var(--text-primary)" }}
            >
              {proof.authorityLine}
            </p>
          </div>
        </SlideIn>
      </div>
    </Section>
  );
}
