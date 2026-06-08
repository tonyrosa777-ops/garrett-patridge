import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import CtaLink from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { niches } from "@/data/site";

// Band 8 — Who I serve (audience self-identification). Tone light, motion twinkle.
// Added after the Prospect-Journey audit: the 3 niche pages were footer-only, so a
// homepage entrant (onshoring / PE / DIB manufacturer) could not self-identify a path.
// Layout = peer-equal 3-up card grid (the three audiences are genuinely equal, so a
// card grid is justified here per the rationing rule). id anchors the nav "Who I Serve".
export default function WhoIServeSection() {
  return (
    <Section tone="light" motion="twinkle" id="who-i-serve">
      <div className="max-w-3xl">
        <Eyebrow>Who I serve</Eyebrow>
        <h2
          className="mt-4 font-display font-bold"
          style={{ fontSize: "var(--text-h2)", color: "var(--text-primary)" }}
        >
          Find the version of this that is yours.
        </h2>
        <p className="mt-4" style={{ color: "var(--text-secondary)" }}>
          Three situations, one operator. Each starts with what you stand to lose this year,
          then the mechanism that meets it.
        </p>
      </div>

      <Stagger className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
        {niches.map((niche) => (
          <StaggerItem key={niche.slug}>
            <Card className="flex h-full flex-col">
              <p
                className="font-mono"
                style={{ color: "var(--accent)", fontSize: "var(--text-eyebrow)", letterSpacing: "0.04em" }}
              >
                {niche.eyebrow}
              </p>
              <h3
                className="mt-3 font-display font-semibold"
                style={{ fontSize: "var(--text-h3)", color: "var(--text-primary)" }}
              >
                {niche.title}
              </h3>
              <p
                className="mt-4 text-[14px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {niche.lossOpener}
              </p>
              <div className="mt-auto pt-7">
                <CtaLink href={`/niches/${niche.slug}`} variant="ghost">
                  See the playbook →
                </CtaLink>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
