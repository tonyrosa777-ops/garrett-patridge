import type { Metadata } from "next";
import { seo } from "@/data/site";
import DiagnosticClient from "./DiagnosticClient";

// /diagnostic — the operational self-diagnostic (a full-page archetype quiz, reframed per
// design-system §11). Types the visitor into one of four archetypes and lands them on the
// inline BookingCalendar. NO email gate, no lead-capture step (Always-Built quiz architecture).
// This page.tsx is a thin Server Component: it owns metadata + the immersive dark wrapper;
// DiagnosticClient owns the three-phase experience. The global SiteHeader/Footer stay; the
// experience is made self-contained below the nav with min-h + nav clearance.
export const metadata: Metadata = {
  title: seo["/diagnostic"].title,
  description: seo["/diagnostic"].description,
};

export default function DiagnosticPage() {
  return (
    <main>
      <DiagnosticClient />
    </main>
  );
}
