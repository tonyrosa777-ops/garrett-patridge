import Hero from "@/components/Hero";

// Homepage — scaffold baseline. Hero (Architecture B movie header) is wired and live.
// The full section sweep (Problem → Method → Stats → Engagements → Diagnostic CTA →
// Blog preview → Capacity/waitlist) is built at Stage 1E per design-system.md §4 rhythm map.
export default function Home() {
  return (
    <main>
      <Hero />
      <section
        className="mx-auto w-full max-w-[1280px] px-6 py-24 md:px-10"
        style={{ background: "var(--bg-elevated)" }}
      >
        <p className="eyebrow">Build in progress</p>
        <h2 style={{ fontSize: "var(--text-h2)", marginTop: "0.75rem" }}>
          Homepage sections are being assembled.
        </h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "1rem", maxWidth: "40rem" }}>
          The hero movie header is live. Next: pain-point instrument panel, the Standard
          Work 2.0 method bento, proof-of-operating-role stats, engagement models, the
          operational diagnostic, the insights hub, and the capacity section.
        </p>
      </section>
    </main>
  );
}
