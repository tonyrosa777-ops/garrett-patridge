"use client";

import { useMemo, useState } from "react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import CtaLink from "@/components/ui/Button";
import FadeUp from "@/components/animations/FadeUp";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { testimonials, featuredTestimonials, type Testimonial } from "@/data/site";

const PER_PAGE = 9; // CLAUDE.md Testimonials Rule: 9/page, 3-col × 3-row, never 8.

// "All" plus the unique engagement types in data order (covers Triage / Fractional COO /
// Strategic Consultancy / Full-Time Leadership without hard-coding the list).
const FILTERS: string[] = [
  "All",
  ...Array.from(new Set(testimonials.map((t) => t.engagementType))),
];

const featured: Testimonial = testimonials[featuredTestimonials[0]];

function Attribution({ t }: { t: Testimonial }) {
  return (
    <p className="font-mono mt-5 text-[13px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
      <span style={{ color: "var(--text-secondary)" }}>{t.role}</span>
      {", "}
      {t.context}
    </p>
  );
}

export default function TestimonialsClient() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [page, setPage] = useState<number>(0);

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? testimonials
        : testimonials.filter((t) => t.engagementType === activeFilter),
    [activeFilter],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, pageCount - 1);
  const pageItems = filtered.slice(safePage * PER_PAGE, safePage * PER_PAGE + PER_PAGE);

  function selectFilter(f: string) {
    setActiveFilter(f);
    setPage(0);
  }

  return (
    <>
      {/* 2 — Featured full-width quote (light) */}
      <Section tone="light" motion="grain">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <Eyebrow as="p">On the record</Eyebrow>
          <blockquote
            className="mt-6"
            style={{ fontSize: "var(--text-h3)", lineHeight: 1.5, color: "var(--text-primary)" }}
          >
            “{featured.quote}”
          </blockquote>
          {/* Brass rule under the featured quote */}
          <span
            aria-hidden="true"
            className="mx-auto mt-8 block h-px w-16"
            style={{ background: "var(--accent)" }}
          />
          <p className="font-mono mt-5 text-[13px]" style={{ color: "var(--text-muted)" }}>
            <span style={{ color: "var(--accent)" }}>{featured.role}</span>
            {", "}
            {featured.context}
            {"  ·  "}
            {featured.engagementType}
          </p>
        </FadeUp>
      </Section>

      {/* 3 — Filter + paginated 3×3 grid (dark) */}
      <Section tone="dark" motion="twinkle">
        {/* Filter chips — squared, brass when active */}
        <FadeUp>
          <div className="flex flex-wrap items-center gap-3" role="group" aria-label="Filter testimonials by engagement type">
            {FILTERS.map((f) => {
              const isActive = f === activeFilter;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => selectFilter(f)}
                  aria-pressed={isActive}
                  className="font-mono rounded-none border px-4 py-2 text-[12px] uppercase tracking-wide transition-colors"
                  style={{
                    borderColor: isActive ? "var(--accent)" : "var(--border-subtle)",
                    background: isActive ? "var(--accent)" : "transparent",
                    color: isActive ? "var(--primary)" : "var(--text-secondary)",
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </FadeUp>

        {/* Count line */}
        <p className="mt-6 text-[14px]" style={{ color: "var(--text-muted)" }}>
          {filtered.length} {filtered.length === 1 ? "engagement" : "engagements"} shown
          {pageCount > 1 ? `, page ${safePage + 1} of ${pageCount}` : ""}.
        </p>

        {/* 3-col × 3-row grid, 9 per page. Re-mounts per page/filter so the stagger replays. */}
        <Stagger
          key={`${activeFilter}-${safePage}`}
          className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {pageItems.map((t, i) => (
            <StaggerItem key={`${safePage}-${i}`} className="h-full">
              <Card className="flex h-full flex-col">
                <blockquote
                  className="grow"
                  style={{ color: "var(--text-primary)", fontSize: "var(--text-body)", lineHeight: 1.6 }}
                >
                  “{t.quote}”
                </blockquote>
                <Attribution t={t} />
                <span
                  className="font-mono mt-4 inline-block self-start border px-2.5 py-1 text-[11px] uppercase tracking-wide"
                  style={{ borderColor: "var(--border-subtle)", color: "var(--accent)" }}
                >
                  {t.engagementType}
                </span>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Pagination — squared, brass active. Hidden when a single page. */}
        {pageCount > 1 ? (
          <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Testimonial pages">
            <button
              type="button"
              onClick={() => setPage(Math.max(0, safePage - 1))}
              disabled={safePage === 0}
              className="font-mono rounded-none border px-4 py-2 text-[12px] uppercase tracking-wide transition-colors disabled:opacity-30"
              style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
            >
              Prev
            </button>

            {Array.from({ length: pageCount }, (_, n) => {
              const isActive = n === safePage;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  aria-current={isActive ? "page" : undefined}
                  className="font-mono rounded-none border px-4 py-2 text-[12px] tabular-nums transition-colors"
                  style={{
                    borderColor: isActive ? "var(--accent)" : "var(--border-subtle)",
                    background: isActive ? "var(--accent)" : "transparent",
                    color: isActive ? "var(--primary)" : "var(--text-secondary)",
                  }}
                >
                  {n + 1}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setPage(Math.min(pageCount - 1, safePage + 1))}
              disabled={safePage === pageCount - 1}
              className="font-mono rounded-none border px-4 py-2 text-[12px] uppercase tracking-wide transition-colors disabled:opacity-30"
              style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
            >
              Next
            </button>
          </nav>
        ) : null}
      </Section>

      {/* 4 — Booking CTA (light, opposite the dark footer) */}
      <Section tone="light" motion="none">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <Eyebrow as="p">The next conversation</Eyebrow>
          <h2 className="mt-4" style={{ fontSize: "var(--text-h2)", color: "var(--text-primary)" }}>
            Put your constraint in front of an operator.
          </h2>
          <p className="mt-5 text-[var(--text-body)]" style={{ color: "var(--text-secondary)" }}>
            A maximum of four concurrent engagements. Name your trigger when you request the
            conversation and receive a realistic timing window within 48 hours.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaLink href="/booking#book" variant="primary">
              Request a Strategic Conversation
            </CtaLink>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
