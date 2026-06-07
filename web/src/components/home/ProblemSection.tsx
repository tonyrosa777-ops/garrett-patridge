import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import InstrumentTable from "@/components/ui/InstrumentTable";
import StatusRow from "@/components/ui/StatusRow";
import FadeUp from "@/components/animations/FadeUp";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { problem } from "@/data/site";

// Band 2 — Problem. Tone light (gunmetal), motion grain, layout = held title + hairline rows.
// Loss-framed fault list rendered through the instrument-readout table (design-system §4 #2, §12.6).
export default function ProblemSection() {
  return (
    <Section tone="light" motion="grain" id="problem">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        {/* Held title (left) */}
        <FadeUp className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>{problem.eyebrow}</Eyebrow>
          <h2
            className="mt-4 font-display font-bold"
            style={{ fontSize: "var(--text-h2)", color: "var(--text-primary)" }}
          >
            {problem.title}
          </h2>
          <p
            className="mt-5 leading-relaxed"
            style={{ color: "var(--text-secondary)", maxWidth: "34rem" }}
          >
            {problem.intro}
          </p>
        </FadeUp>

        {/* Fault readout (right) */}
        <Stagger>
          <InstrumentTable caption="Operational fault readout · scored the way a buyer scores a part">
            {problem.rows.map((row) => (
              <StaggerItem key={row.label}>
                <StatusRow status={row.status} label={row.label} detail={row.detail} />
              </StaggerItem>
            ))}
          </InstrumentTable>
        </Stagger>
      </div>
    </Section>
  );
}
