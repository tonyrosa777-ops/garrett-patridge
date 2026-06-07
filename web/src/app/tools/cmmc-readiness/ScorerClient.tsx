"use client";

import { useMemo, useState } from "react";

import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import InstrumentTable from "@/components/ui/InstrumentTable";
import StatusRow from "@/components/ui/StatusRow";
import FadeUp from "@/components/animations/FadeUp";
import BookingCalendar from "@/components/BookingCalendar";
import { gatedTool } from "@/data/site";

// ============================================================
// ScorerClient — the interactive CMMC Level 2 readiness self-scorer.
//
// - 10 yes / partial / no questions (gatedTool.fields). Each scores 2 / 1 / 0.
// - "Score my readiness" computes a deterministic, pure readiness BAND from the total.
// - Result is an instrument readout using the status tokens (blocked / warn / cleared),
//   with low-scoring answers mapped to plain-language gap statements derived ONLY from
//   the question text (no invented numbers; CMMC / NIST referenced only as framed in copy).
// - NO email gate. The result shows immediately and lands on the inline BookingCalendar.
// - An honest self-assessment disclaimer ("not a C3PAO assessment" — allowed negation in a
//   compliance disclaimer per CLAUDE.md Copy Writing Rule).
//
// Everything lives in ONE LIGHT (gunmetal) Section so the page ends LIGHT, opposite the
// global DARK footer (CLAUDE.md footer-anchored alternation: Nav(D)·PageHeader(D)·this(L)·Footer(D)).
// Respects prefers-reduced-motion (FadeUp + globals.css reduce-motion block).
// ============================================================

type Answer = "yes" | "partial" | "no";

const ANSWER_SCORE: Record<Answer, number> = { yes: 2, partial: 1, no: 0 };

const ANSWER_OPTIONS: { value: Answer; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "partial", label: "Partial" },
  { value: "no", label: "No" },
];

const QUESTIONS = gatedTool.fields;
const MAX_SCORE = QUESTIONS.length * 2;

// Plain-language gap statement for a low-scoring answer (score 0 or 1), derived only from
// the meaning of the corresponding question. Index-aligned to gatedTool.fields. No new numbers.
const GAP_STATEMENTS: string[] = [
  "Confirm whether you actually hold or process CUI. The CMMC Level 2 scope starts with knowing where your Controlled Unclassified Information lives.",
  "A prime's CMMC or DFARS 252.204-7021 supplier letter is the real deadline. Read it for the clause and the date, and answer it from a position of readiness.",
  "Post a current, dated SPRS self-assessment score. A stale or missing score is a false-affirmation exposure, not just a gap.",
  "Write a System Security Plan that covers the NIST SP 800-171 controls. The SSP is the document the assessor opens first.",
  "Map and access-control your MES, ERP, and SCADA environments. Three uncontrolled networks are three separate liabilities until they are one auditable thread.",
  "Stand up a Plan of Action and Milestones for every open control. The POA&M is how you show the open items are being closed on a schedule.",
  "Enforce multi-factor authentication on every system that touches CUI. This is one of the controls an assessor checks first and fastest.",
  "Log and review security events across both IT and OT. Unmonitored events are an open control and a blind spot at the same time.",
  "Scope a CUI enclave or boundary. CUI spread across the whole network widens the assessment scope and the cost with it.",
  "Set a target date for the C3PAO Level 2 assessment and sequence the work backward from it, against your prime's actual deadline.",
];

interface Band {
  status: "blocked" | "warn" | "cleared";
  name: string;
  rangeLabel: string;
  summary: string;
}

// Deterministic band from the total score (0..MAX_SCORE), expressed as a percentage of MAX_SCORE.
// 0-40% non-compliant exposure (blocked) / 41-70% POA&M territory (warn) / 71-100% assessment-ready (cleared).
function bandFor(total: number): Band {
  const pct = (total / MAX_SCORE) * 100;
  if (pct <= 40) {
    return {
      status: "blocked",
      name: "Non-compliant exposure",
      rangeLabel: "0 to 40 percent",
      summary:
        "On these answers you would not pass a CMMC Level 2 assessment today, and a wrong SPRS score posted in the meantime is a false-affirmation risk. The faults below are where the work starts.",
    };
  }
  if (pct <= 70) {
    return {
      status: "warn",
      name: "POA&M territory",
      rangeLabel: "41 to 70 percent",
      summary:
        "You have a foundation, but enough controls are open that you need a documented Plan of Action and Milestones to close them on a schedule. The faults below are the ones to sequence first.",
    };
  }
  return {
    status: "cleared",
    name: "Assessment-ready track",
    rangeLabel: "71 to 100 percent",
    summary:
      "You are on the track an assessor wants to see. The remaining faults below are the gaps to close before you book the C3PAO, so the controls are already running when they walk in.",
  };
}

export default function ScorerClient() {
  const [answers, setAnswers] = useState<(Answer | null)[]>(
    () => Array.from({ length: QUESTIONS.length }, () => null),
  );
  const [scored, setScored] = useState(false);

  const answeredCount = useMemo(
    () => answers.filter((a) => a !== null).length,
    [answers],
  );
  const allAnswered = answeredCount === QUESTIONS.length;

  const total = useMemo(
    () => answers.reduce<number>((sum, a) => sum + (a ? ANSWER_SCORE[a] : 0), 0),
    [answers],
  );

  const band = useMemo(() => bandFor(total), [total]);

  // Gaps: low-scoring answers (no = blocked, partial = warn), in question order.
  const gaps = useMemo(
    () =>
      answers
        .map((a, i) => ({ a, i }))
        .filter(({ a }) => a === "no" || a === "partial")
        .map(({ a, i }) => ({
          status: (a === "no" ? "blocked" : "warn") as "blocked" | "warn",
          label: QUESTIONS[i],
          detail: GAP_STATEMENTS[i],
        })),
    [answers],
  );

  function setAnswer(index: number, value: Answer) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function handleScore() {
    if (!allAnswered) return;
    setScored(true);
  }

  function handleReset() {
    setAnswers(Array.from({ length: QUESTIONS.length }, () => null));
    setScored(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    // LIGHT band, grain motion (distinct from the DARK PageHeader's ash above it).
    <Section tone="light" motion="grain">
      {!scored ? (
        <FadeUp>
          <Eyebrow>Ten questions · five minutes</Eyebrow>
          <h2
            className="mt-4 max-w-3xl"
            style={{ fontSize: "var(--text-h2)", color: "var(--text-primary)" }}
          >
            Answer honestly. The scorer reads the gaps back to you.
          </h2>
          <p
            className="mt-5 max-w-2xl"
            style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
          >
            Answer each control question Yes, Partial, or No. Partial means it exists but is
            not documented or not enforced everywhere. Nothing is sent and no email is asked.
          </p>

          <div className="mt-12 flex flex-col gap-4 md:mt-16">
            {QUESTIONS.map((question, i) => {
              const selected = answers[i];
              const indexLabel = String(i + 1).padStart(2, "0");
              return (
                <div
                  key={question}
                  className="rounded-md border p-5 md:p-6"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="font-mono text-[12px] uppercase tracking-[0.14em]"
                        style={{ color: "var(--text-muted)", paddingTop: "2px" }}
                      >
                        {indexLabel}
                      </span>
                      <p
                        className="text-[15px] leading-relaxed md:text-base"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {question}
                      </p>
                    </div>

                    <fieldset className="shrink-0">
                      <legend className="sr-only">{question}</legend>
                      <div className="flex gap-2" role="radiogroup" aria-label={question}>
                        {ANSWER_OPTIONS.map((opt) => {
                          const isSel = selected === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              role="radio"
                              aria-checked={isSel}
                              onClick={() => setAnswer(i, opt.value)}
                              className="scorer-opt rounded px-4 py-2.5 text-[14px] font-medium transition-colors"
                              style={{
                                border: "1px solid var(--border-subtle)",
                                background: isSel ? "var(--accent)" : "transparent",
                                color: isSel ? "var(--primary)" : "var(--text-secondary)",
                                fontFamily: "var(--font-mono)",
                                letterSpacing: "0.02em",
                              }}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress + score button */}
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p
              className="font-mono text-[12px] uppercase tracking-[0.14em]"
              style={{ color: "var(--text-muted)" }}
              aria-live="polite"
            >
              {answeredCount} of {QUESTIONS.length} answered
            </p>
            <button
              type="button"
              onClick={handleScore}
              disabled={!allAnswered}
              className="rounded border px-6 py-3.5 text-[15px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                borderColor: "var(--accent)",
                color: allAnswered ? "var(--accent)" : "var(--text-muted)",
                background: "transparent",
              }}
            >
              {gatedTool.submitLabel}
            </button>
          </div>

          <p
            className="mt-6 max-w-2xl text-[13px] leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            This is a self-assessment for your own planning. It is not a C3PAO assessment and it
            does not post a score to SPRS on your behalf.
          </p>
        </FadeUp>
      ) : (
        <div>
          {/* RESULT — instrument readout, then the named gaps, then inline BookingCalendar. */}
          <FadeUp>
            <Eyebrow>Readiness band</Eyebrow>

            <div
              className="mt-5 rounded-md border p-6 md:p-8"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ background: `var(--status-${band.status})` }}
                  aria-hidden="true"
                />
                <span
                  className="font-mono text-[12px] uppercase tracking-[0.16em]"
                  style={{ color: `var(--status-${band.status})` }}
                >
                  {band.status === "blocked"
                    ? "Non-compliant"
                    : band.status === "warn"
                      ? "Action needed"
                      : "On track"}
                </span>
              </div>

              <h2
                className="mt-4"
                style={{ fontSize: "var(--text-h2)", color: "var(--text-primary)" }}
              >
                {band.name}
              </h2>

              <p
                className="mt-2 font-mono text-[13px] uppercase tracking-[0.12em]"
                style={{ color: "var(--text-muted)" }}
              >
                Score {total} of {MAX_SCORE} · {band.rangeLabel}
              </p>

              <p
                className="mt-5 max-w-2xl text-[15px] leading-relaxed md:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                {band.summary}
              </p>
            </div>
          </FadeUp>

          {/* Named gaps as an instrument readout, or a cleared note if none. */}
          <FadeUp delay={0.1}>
            <div className="mt-10">
              {gaps.length > 0 ? (
                <InstrumentTable
                  caption={`Open faults · ${gaps.length} of ${QUESTIONS.length} controls`}
                >
                  {gaps.map((gap) => (
                    <StatusRow
                      key={gap.label}
                      status={gap.status}
                      label={gap.label}
                      detail={gap.detail}
                    />
                  ))}
                </InstrumentTable>
              ) : (
                <InstrumentTable caption="Open faults · none on these answers">
                  <StatusRow
                    status="cleared"
                    label="No open controls flagged"
                    detail="Every control above scored a clear Yes. The next step is to validate that posture with an operator before you book the C3PAO, so the evidence holds the day the assessor walks in."
                  />
                </InstrumentTable>
              )}
            </div>
          </FadeUp>

          {/* Booking — the result lands here. No email gate to see the score. */}
          <FadeUp delay={0.15}>
            <div className="mt-12">
              <Eyebrow>Turn the readout into a plan</Eyebrow>
              <h3
                className="mt-4 max-w-2xl"
                style={{ fontSize: "var(--text-h3)", color: "var(--text-primary)" }}
              >
                Bring this band to a strategic conversation.
              </h3>
              <p
                className="mt-4 max-w-2xl text-[15px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                The scorer names the faults. The engagement sequences them against your prime's
                actual deadline and builds the controls into the daily workflow. Name your
                trigger when you request the conversation.
              </p>

              <div className="mt-8">
                <BookingCalendar />
              </div>
            </div>
          </FadeUp>

          {/* Honest disclaimer (allowed negation in a compliance disclaimer) + re-run. */}
          <FadeUp delay={0.2}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p
                className="max-w-2xl text-[13px] leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                This band is a self-assessment for your own planning. It is not a C3PAO
                assessment and it does not post a score to SPRS on your behalf.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="scorer-reset shrink-0 text-[14px] font-medium transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                Run the scorer again
              </button>
            </div>
          </FadeUp>
        </div>
      )}

      <style>{`
        .scorer-opt:focus-visible,
        .scorer-reset:focus-visible {
          outline: none;
          box-shadow: 0 0 0 1px var(--accent);
          border-radius: 4px;
        }
        .scorer-reset:hover {
          color: var(--accent);
        }
        @media (prefers-reduced-motion: reduce) {
          .scorer-opt,
          .scorer-reset { transition: none !important; }
        }
      `}</style>
    </Section>
  );
}
