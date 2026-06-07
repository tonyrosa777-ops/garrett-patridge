import Hero from "@/components/Hero";
import ProblemSection from "@/components/home/ProblemSection";
import MethodSection from "@/components/home/MethodSection";
import StatsSection from "@/components/home/StatsSection";
import EngagementsSection from "@/components/home/EngagementsSection";
import DiagnosticSection from "@/components/home/DiagnosticSection";
import BlogSection from "@/components/home/BlogSection";
import CapacitySection from "@/components/home/CapacitySection";

// ───────────────────────────────────────────────────────────────────────────────────
// Homepage rhythm map (design-system §4 Layout Directions — authoritative).
// No two adjacent bands share TONE, PURPOSE, or LAYOUT ARCHETYPE or AMBIENT MOTION.
// Tone string: D · D · L · D · L · D · L · D · L · D  (alternates after the nav→hero
// chrome seam; ends LIGHT before the fixed DARK footer per Pattern #98 footer-anchoring).
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
// Capacity       | light| conversion (final, ONE closing CTA)  | centered stack (#12)      | orbs
// [Footer]       | dark | chrome (fixed bookend)               | fixed bookend             | —
//
// Layout column distinct on every adjacency (8,5,3,1,9,7,4,12 — no repeat). Centered stack
// rationed to once (Capacity). Grain repeats only at non-adjacent bands (Problem, Blog).
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
      <CapacitySection />
    </main>
  );
}
