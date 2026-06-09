"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/data/site";

// Architecture B — full-bleed movie header (Pattern #80).
// 3-clip CNC machine-shop loop (shop → cut → part), subject right / dark left.
// Dual-axis gradient guarantees the left H1/CTA zone stays dark over any frame.
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  const { hero } = siteConfig;

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      style={{ background: "var(--primary)" }}
    >
      {/* Layer 1 — full-bleed movie loop (hidden under reduced-motion) */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/hero-poster.webp"
        aria-hidden="true"
      >
        <source src="/videos/hero-loop.webm" type="video/webm" />
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* Layer 1b — poster still for reduced-motion (never flat color) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-poster.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 hidden h-full w-full object-cover motion-reduce:block"
      />

      {/* Layer 2 — dual-axis gradient: dark-left (text zone) + bottom fade */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background: [
            "linear-gradient(to right, rgba(14,17,22,0.92) 0%, rgba(14,17,22,0.78) 22%, rgba(14,17,22,0.30) 45%, rgba(14,17,22,0) 68%)",
            "linear-gradient(to bottom, rgba(14,17,22,0.35) 0%, rgba(14,17,22,0) 30%, rgba(14,17,22,0) 60%, rgba(14,17,22,0.7) 100%)",
          ].join(", "),
        }}
      />

      {/* Layer 3 — content (left) */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pt-28 pb-20 md:px-10 md:pt-40 md:pb-28"
      >
        <div className="flex max-w-2xl flex-col gap-7">
          <motion.p variants={item} className="eyebrow">
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="hero-shimmer-brass"
            style={{ fontSize: "var(--text-display)", textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}
          >
            {hero.tagline}
          </motion.h1>

          <motion.p
            variants={item}
            className="leading-relaxed"
            style={{ color: "var(--text-secondary)", fontSize: "var(--text-lead)", maxWidth: "36rem", textShadow: "0 1px 16px rgba(0,0,0,0.5)" }}
          >
            {hero.subhead}
          </motion.p>

          <motion.div variants={item} className="mt-1 flex flex-wrap gap-4">
            <Link
              href={hero.ctaPrimary.href}
              className="rounded border px-6 py-3.5 text-[15px] font-medium transition-colors"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            >
              {hero.ctaPrimary.label}
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="rounded border px-6 py-3.5 text-[15px] font-medium transition-colors"
              style={{ borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
            >
              {hero.ctaSecondary.label} →
            </Link>
          </motion.div>

          <motion.p variants={item} className="font-mono mt-1" style={{ fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.04em" }}>
            {hero.microcopy}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
