"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import CtaLink from "@/components/ui/Button";
import BookingCalendar from "@/components/BookingCalendar";
import {
  QUIZ_QUESTIONS,
  QUIZ_RESULTS,
  scoreQuiz,
  type QuizType,
} from "@/data/quiz";

type Phase = "intro" | "question" | "result";

const TOTAL = QUIZ_QUESTIONS.length;

export default function DiagnosticClient() {
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizType[]>([]);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [resultType, setResultType] = useState<QuizType | null>(null);

  const begin = useCallback(() => {
    setDirection(1);
    setPhase("question");
  }, []);

  const restart = useCallback(() => {
    setPhase("intro");
    setQuestionIndex(0);
    setAnswers([]);
    setDirection(1);
    setPendingIndex(null);
    setResultType(null);
  }, []);

  const selectOption = useCallback(
    (optionIndex: number) => {
      if (pendingIndex !== null) return; // ignore double clicks during the 400ms glow
      setPendingIndex(optionIndex);

      const chosen = QUIZ_QUESTIONS[questionIndex].options[optionIndex].type;
      const nextAnswers = [...answers.slice(0, questionIndex), chosen];

      const advance = () => {
        setAnswers(nextAnswers);
        setPendingIndex(null);
        if (questionIndex + 1 >= TOTAL) {
          setResultType(scoreQuiz(nextAnswers));
          setPhase("result");
        } else {
          setDirection(1);
          setQuestionIndex((i) => i + 1);
        }
      };

      if (reduceMotion) {
        advance();
      } else {
        window.setTimeout(advance, 400);
      }
    },
    [answers, pendingIndex, questionIndex, reduceMotion],
  );

  const goBack = useCallback(() => {
    if (questionIndex === 0 || pendingIndex !== null) return;
    setDirection(-1);
    // Drop only the answer for the question we are LEAVING; KEEP the returned-to question's
    // answer so it re-highlights (CLAUDE.md quiz contract). Re-answering rewrites it cleanly.
    setAnswers((prev) => prev.slice(0, questionIndex));
    setQuestionIndex((i) => i - 1);
  }, [questionIndex, pendingIndex]);

  // Slide offset — forward slides right-to-left, back slides left-to-right.
  const slideVariants = {
    enter: (dir: 1 | -1) => ({ x: reduceMotion ? 0 : dir * 48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: 1 | -1) => ({ x: reduceMotion ? 0 : dir * -48, opacity: 0 }),
  };
  const slideTransition = { duration: reduceMotion ? 0 : 0.32, ease: "easeOut" as const };

  return (
    <section
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden py-16 pt-28 md:py-24 md:pt-36"
      style={{ background: "var(--primary)" }}
    >
      {/* Immersive backdrop (full-page-archetype quiz standard / Enchanted Madison reference):
          a LOW-OPACITY defense shop-floor brand image → contrast scrim + depth vignette →
          brass radial glow → a hero-grade rising-ash + twinkle particle stack. Never flat. */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/images/blog/hidden-factory-find-it-in-30-days-header.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ opacity: 0.3 }}
        />
        {/* Scrim — keeps the floor visible at center but darkens to a premium vignette so the
            centered copy holds 4.5:1+ contrast over the image. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(135% 105% at 50% 30%, rgba(14,17,22,0.30) 0%, rgba(14,17,22,0.74) 55%, rgba(14,17,22,0.90) 100%)",
          }}
        />
        {/* Brass radial glow — same language as every Section. */}
        <div className="absolute inset-0 sec-overlay-dark" />
        {/* Hero-grade particle stack: rising ash + low-density twinkles. */}
        <div className="absolute inset-0 amb-ash" />
        <div className="absolute inset-0 amb-twinkle" />
      </div>

      {/* Outer container is WIDE (max-w-5xl) so the question grid fills the desktop and the
          option cards read large; the intro + result constrain their own inner blocks so the
          hero/copy stay comfortably narrow. */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
        {/* ---------- INTRO ---------- */}
        {phase === "intro" && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <Eyebrow>Operational self-diagnostic</Eyebrow>
            <h1
              className="hero-shimmer-brass mt-5"
              style={{ fontSize: "var(--text-display)", lineHeight: 1.05 }}
            >
              Find the constraint that is costing you the most.
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl leading-relaxed"
              style={{
                color: "var(--text-primary)",
                fontSize: "var(--text-lead)",
              }}
            >
              Six questions, about two minutes. You will name the fault you are actually
              fighting and see the one move that frees the most capacity. No email, no
              follow-up sequence. The result is yours, right here on the screen.
            </p>
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={begin}
                className="btn-primary rounded border px-7 py-3.5 text-[15px] font-medium transition-colors"
              >
                Begin the diagnostic
              </button>
            </div>
          </motion.div>
        )}

        {/* ---------- QUESTION ---------- */}
        {phase === "question" && (
          <div>
            {/* Progress */}
            <div className="mb-8 flex items-center justify-between gap-4">
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                Question {questionIndex + 1} of {TOTAL}
              </p>
              <div className="flex gap-1.5" aria-hidden="true">
                {QUIZ_QUESTIONS.map((q, i) => (
                  <span
                    key={q.id}
                    className="h-1 w-6 rounded-full transition-colors"
                    style={{
                      background:
                        i <= questionIndex ? "var(--accent)" : "var(--border-subtle)",
                    }}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={QUIZ_QUESTIONS[questionIndex].id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
              >
                <h1
                  className="max-w-3xl"
                  style={{
                    fontSize: "var(--text-h2)",
                    lineHeight: 1.15,
                    color: "var(--text-primary)",
                  }}
                >
                  {QUIZ_QUESTIONS[questionIndex].question}
                </h1>

                <div className="mt-8 grid gap-4 md:mt-10 md:gap-5 sm:grid-cols-2">
                  {/* When idle (not mid-glow), re-highlight the saved answer for this
                      question so back-navigation shows the prior pick (CLAUDE.md contract). */}
                  {QUIZ_QUESTIONS[questionIndex].options.map((opt, optionIndex) => {
                    const savedType =
                      pendingIndex === null ? answers[questionIndex] : undefined;
                    const isPending = pendingIndex === optionIndex;
                    const isSaved = savedType !== undefined && opt.type === savedType;
                    const active = isPending || isSaved;
                    const dimmed = pendingIndex !== null && !isPending;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => selectOption(optionIndex)}
                        disabled={pendingIndex !== null}
                        className="diag-option rounded-md p-6 text-left transition-all duration-300 disabled:cursor-default md:p-8"
                        style={{
                          background: active
                            ? "color-mix(in srgb, var(--accent) 12%, var(--bg-card))"
                            : "var(--bg-card)",
                          border: `1px solid ${
                            active ? "var(--accent)" : "var(--border-subtle)"
                          }`,
                          opacity: dimmed ? 0.3 : 1,
                          color: "var(--text-primary)",
                        }}
                      >
                        <span className="block text-3xl leading-none md:text-4xl" aria-hidden="true">
                          {opt.emoji}
                        </span>
                        <span className="mt-4 block text-[17px] font-semibold md:text-[20px]">
                          {opt.label}
                        </span>
                        <span
                          className="mt-2 block text-[15px] leading-relaxed md:text-[16px]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {opt.detail}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {questionIndex > 0 && (
              <div className="mt-8">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={pendingIndex !== null}
                  className="btn-ghost text-[14px] font-medium disabled:opacity-40"
                >
                  ‹ Back
                </button>
              </div>
            )}
          </div>
        )}

        {/* ---------- RESULT ---------- */}
        {phase === "result" && resultType && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          >
            <div className="text-center">
              <Eyebrow>{QUIZ_RESULTS[resultType].eyebrow}</Eyebrow>
              <h1
                className="hero-shimmer-brass mt-5"
                style={{ fontSize: "var(--text-display)", lineHeight: 1.05 }}
              >
                {QUIZ_RESULTS[resultType].name}
              </h1>
            </div>

            <div className="mx-auto mt-8 max-w-3xl space-y-6">
              {QUIZ_RESULTS[resultType].body.map((para, i) => (
                <p
                  key={i}
                  className="leading-relaxed"
                  style={{
                    color: i === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                    fontSize: "var(--text-lead)",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Recommended starting line */}
            <div
              className="card-surface mx-auto mt-10 max-w-2xl rounded-md p-6 md:p-8"
              style={{ border: "1px solid var(--border-subtle)" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                Your starting line
              </p>
              <p
                className="mt-3 text-[18px] font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {QUIZ_RESULTS[resultType].recommended.name}
              </p>
              <p className="mt-2 text-[14px]" style={{ color: "var(--text-secondary)" }}>
                {QUIZ_RESULTS[resultType].recommended.reason}
              </p>
              <div className="mt-5">
                <CtaLink href={QUIZ_RESULTS[resultType].recommended.href} variant="secondary">
                  See the detail
                </CtaLink>
              </div>
            </div>

            {/* The conversion — inline branded scheduler, directly below the result. */}
            <div className="mx-auto mt-12 max-w-2xl">
              <BookingCalendar
                heading="Bring this to a strategic conversation"
                intro="You have named the fault. Request a time and receive a realistic timing window within 48 hours. No follow-up sequence."
              />
            </div>

            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={restart}
                className="btn-ghost text-[13px] font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Start over
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
