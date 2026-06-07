import type { ReactNode } from "react";
import Container from "./Container";

type Tone = "dark" | "light";
type Motion = "orbs" | "drift" | "ash" | "twinkle" | "grain" | "none";

interface SectionProps {
  tone: Tone;
  /** Ambient CSS-only motion layer. Adjacent sections MUST pick different values. Default "none". */
  motion?: Motion;
  id?: string;
  /** Extra classes on the <section> (e.g. tone-spanning overrides). */
  className?: string;
  /** Extra classes on the inner Container (e.g. max-width or alignment tweaks). */
  containerClassName?: string;
  children: ReactNode;
}

/**
 * THE background-rule enforcement point (CLAUDE.md Homepage Section Architecture Rule).
 *
 * - Radial gradients ONLY. No flat fills, no linear/conic/mesh.
 * - NO white / near-white ever. "dark" = --primary base; "light" = --bg-elevated gunmetal.
 * - Every section carries its own ambient motion (a CSS class), distinct from neighbors.
 * - CSS-only (canvas is hero-only). Server Component — no hooks needed.
 * - Under prefers-reduced-motion the motion stops but the radial gradient remains
 *   (handled in globals.css; never degrades to flat color).
 *
 * The base color sits on the <section>; the radial gradient overlay + the ambient
 * motion both live on the absolute z-0 layer (class .amb-{motion} for animated
 * variants, .amb-static for motion="none"). Content sits at relative z-10.
 */
export default function Section({
  tone,
  motion = "none",
  id,
  className = "",
  containerClassName = "",
  children,
}: SectionProps) {
  const baseColor = tone === "dark" ? "var(--primary)" : "var(--bg-elevated)";

  // The radial gradient overlay is tone-specific: brass glow, off-center, low alpha.
  // Dark sections take a slightly stronger overlay (0.05–0.10); light a touch softer (0.04–0.08).
  const overlayClass = tone === "dark" ? "sec-overlay-dark" : "sec-overlay-light";
  const motionClass = motion === "none" ? "amb-static" : `amb-${motion}`;

  return (
    <section
      id={id}
      className={`relative overflow-hidden py-16 md:py-24 lg:py-32 ${className}`}
      style={{ background: baseColor }}
    >
      {/* Ambient layer: radial gradient overlay + (for animated variants) the motion effect. */}
      <div
        className={`pointer-events-none absolute inset-0 z-0 ${overlayClass} ${motionClass}`}
        aria-hidden="true"
      />

      <Container className={`relative z-10 ${containerClassName}`}>{children}</Container>
    </section>
  );
}
