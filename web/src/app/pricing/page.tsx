import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import PricingClient from "@/components/pricing/PricingClient";

// /pricing — INTERNAL Optimus three-tier sales tool, shown during the June 9 demo only.
// DELETED before public launch (the client publishes no pricing — design-system §10.9,
// §11). Hard noindex so it never reaches a search engine even if it briefly ships.
// Server Component: it exports metadata (a Client Component cannot) and renders the
// interactive PricingClient (sliders + booking disclosure need state).
export const metadata: Metadata = {
  title: "Pricing (internal)",
  description: "Internal Optimus sales tool. Not for public indexing.",
  robots: { index: false, follow: false },
};

export default function PricingPage() {
  return (
    <main>
      <PageHeader
        tone="dark"
        motion="orbs"
        eyebrow="Internal sales tool · deleted before launch"
        title="What it costs to build this."
        intro="Three fixed packages, the same on every Optimus build. This page is shown during the demo only and never published on garrettpartridge.com."
      />
      <PricingClient />
    </main>
  );
}
