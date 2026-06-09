"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import CtaLink from "@/components/ui/Button";
import FadeUp from "@/components/animations/FadeUp";
import { faq, diagnosticTeaser } from "@/data/site";

// ----------------------------------------------------------------------------
// /faq accordion — instrument-readout Q&A (design-system §5).
// Hairline (--border-subtle) "machined seam" between rows, mono question header
// with a rotating +/− indicator, smooth height + opacity reveal via a CSS
// grid-template-rows 0fr→1fr transition (no library) that degrades cleanly under
// prefers-reduced-motion (the globals.css reduce block zeroes the transition).
// Accessible: each header is a <button aria-expanded> with aria-controls/id paired
// to its panel. The first sentence of each answer is the AEO direct answer; it is
// rendered prominently (brushed-aluminum --text-primary) ahead of the rest.
//
// Single LIGHT (gunmetal) band, motion="drift" (slow ambient orbs under 0.3Hz) —
// text-dense, so motion is restrained but the radial gradient is never flat. This
// is the final content band before the DARK global footer (ends LIGHT).
// ----------------------------------------------------------------------------

function splitAnswer(a: string): { lead: string; rest: string } {
  // First sentence = the AEO direct answer; keep it prominent.
  const match = a.match(/^(.*?[.!?])\s+(.*)$/);
  if (match) {
    return { lead: match[1], rest: match[2] };
  }
  return { lead: a, rest: "" };
}

export default function FaqClient() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section tone="light" motion="drift">
      <FadeUp>
        <Eyebrow>Frequently asked</Eyebrow>
        <h2 className="mt-4 max-w-3xl" style={{ fontSize: "var(--text-h2)" }}>
          The questions, answered the way an engineer would want them.
        </h2>
      </FadeUp>

      <div
        className="mt-12 border-t"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        {faq.map((item, i) => {
          const isOpen = open === i;
          const { lead, rest } = splitAnswer(item.a);
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-button-${i}`;

          return (
            <div
              key={item.q}
              className="border-b"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <h3 className="m-0">
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-1 font-mono text-[0.8125rem] tabular-nums"
                      style={{ color: "var(--accent)", letterSpacing: "0.12em" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-medium leading-snug"
                      style={{ fontSize: "var(--text-h3)" }}
                    >
                      {item.q}
                    </span>
                  </span>

                  {/* +/− indicator: the horizontal bar stays, the vertical bar rotates to hide */}
                  <span
                    aria-hidden="true"
                    className="relative mt-2 inline-block h-3.5 w-3.5 shrink-0"
                  >
                    <span
                      className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
                      style={{ background: "var(--accent)" }}
                    />
                    <span
                      className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 transition-transform duration-300"
                      style={{
                        background: "var(--accent)",
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                      }}
                    />
                  </span>
                </button>
              </h3>

              {/* Smooth height reveal via grid-template-rows 0fr → 1fr (no library). */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="grid transition-all duration-300 ease-out"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <div className="pb-7 pl-0 sm:pl-10">
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "var(--text-body)",
                      }}
                    >
                      {lead}
                    </p>
                    {rest ? (
                      <p
                        className="mt-3 leading-relaxed"
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "var(--text-body)",
                        }}
                      >
                        {rest}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Closing nudge: diagnostic (secondary) + booking (primary). Lives inside this
          final LIGHT band so the page ends LIGHT before the dark footer. */}
      <FadeUp delay={0.1}>
        <div
          className="mt-16 rounded-md border p-8 md:p-10"
          style={{
            borderColor: "var(--border-subtle)",
            background: "var(--bg-card)",
          }}
        >
          <Eyebrow>{diagnosticTeaser.eyebrow}</Eyebrow>
          <p
            className="mt-4 max-w-2xl leading-relaxed"
            style={{ color: "var(--text-primary)", fontSize: "var(--text-h3)" }}
          >
            {diagnosticTeaser.statement}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CtaLink href="/booking#book" variant="primary">
              Request a Strategic Conversation
            </CtaLink>
            <CtaLink href={diagnosticTeaser.cta.href} variant="secondary">
              {diagnosticTeaser.cta.label}
            </CtaLink>
          </div>
        </div>
      </FadeUp>
    </Section>
  );
}
