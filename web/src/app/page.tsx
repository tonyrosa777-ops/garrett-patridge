import Hero from "@/components/Hero";
import ProblemSection from "@/components/home/ProblemSection";
import MethodSection from "@/components/home/MethodSection";
import StatsSection from "@/components/home/StatsSection";
import EngagementsSection from "@/components/home/EngagementsSection";
import DiagnosticSection from "@/components/home/DiagnosticSection";
import BlogSection from "@/components/home/BlogSection";
import WhoIServeSection from "@/components/home/WhoIServeSection";
import ScorerSection from "@/components/home/ScorerSection";
import CapacitySection from "@/components/home/CapacitySection";

// ───────────────────────────────────────────────────────────────────────────────────
// Homepage rhythm map (design-system §4 Layout Directions — authoritative).
// No two adjacent bands share TONE, PURPOSE, or LAYOUT ARCHETYPE or AMBIENT MOTION.
// Tone string: D · D · L · D · L · D · L · D · L · D · L · D  (alternates after the nav→hero
// chrome seam; ends LIGHT before the fixed DARK footer per Pattern #98 footer-anchoring).
// WhoIServe + Scorer appended (positions 8-9) after the Prospect-Journey audit surfaced
// that the 3 niche pages + the CMMC scorer were footer-only / invisible on the homepage —
// the two highest-leverage conversion leaks. Placed before Capacity so existing bands keep
// their tone (zero re-tone cascade): Blog(D) → WhoIServe(L) → Scorer(D) → Capacity(L) → Footer(D).
//
// Section        | D/L  | Purpose                              | Layout archetype          | Motion
// ---------------|------|--------------------------------------|---------------------------|--------
// [Nav]          | dark | chrome (fixed bookend)               | fixed bookend             | —
// Hero           | dark | conversion (primary + diagnostic)    | Z-pattern hero (#8)       | video
// Problem        | light| empathy / loss-frame                 | held title + hairline (#5)| grain
// Method         | dark | education                            | bento grid (#3)           | drift
// Stats          | light| social proof                        | asymmetric split (#1)     | twinkle
// Engagements    | dark | education / qualification            | staggered cards (#9)      | orbs
// Diagnostic     | light| conversion (mid-page nudge)          | pulled statement (#7)     | ash
// Blog           | dark | content preview                      | editorial / magazine (#4) | grain
// WhoIServe      | light| audience self-identification         | peer-equal card grid (#11)| twinkle
// Scorer         | dark | free tool / low-commitment on-ramp   | asymmetric split (#1)     | drift
// Capacity       | light| conversion (final, ONE closing CTA)  | centered stack (#12)      | orbs
// [Footer]       | dark | chrome (fixed bookend)               | fixed bookend             | —
//
// Adjacent motions all distinct (grain→twinkle→drift→orbs at the new seam). Centered stack
// rationed to once (Capacity). Card grid used once (WhoIServe, peer-equal audiences).
// ───────────────────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <MethodSection />
      <StatsSection />
      <EngagementsSection />
      <DiagnosticSection />
      <BlogSection />
      <WhoIServeSection />
      <ScorerSection />
      <CapacitySection />
    </main>
  );
}
