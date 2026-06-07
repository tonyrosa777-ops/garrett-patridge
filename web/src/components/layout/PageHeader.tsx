import type { ReactNode } from "react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";

type Tone = "dark" | "light";
type Motion = "orbs" | "drift" | "ash" | "twinkle" | "grain" | "none";

interface PageHeaderProps {
  tone: Tone;
  /** Ambient motion; default "orbs". */
  motion?: Motion;
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}

/**
 * Interior-page header band with the fixed-nav clearance baked in (Error #40 forget-proof).
 *
 * This is the SINGLE place interior-page nav clearance lives: the inner <Section> gets
 * pt-28 md:pt-36 lg:pt-40 so content always clears the h-20 md:h-24 fixed SiteHeader with
 * breathing room. Interior pages render <PageHeader> as their first band and never worry
 * about it. The H1 always carries the brass shimmer (CLAUDE.md Hero Architecture shared rules).
 * Server Component.
 */
export default function PageHeader({
  tone,
  motion = "orbs",
  eyebrow,
  title,
  intro,
  children,
}: PageHeaderProps) {
  return (
    <Section tone={tone} motion={motion} className="pt-28 md:pt-36 lg:pt-40">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}

      <h1
        className="hero-shimmer-brass mt-4 max-w-4xl"
        style={{ fontSize: "var(--text-display)" }}
      >
        {title}
      </h1>

      {intro ? (
        <p
          className="mt-6 max-w-2xl"
          style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
        >
          {intro}
        </p>
      ) : null}

      {children}
    </Section>
  );
}
