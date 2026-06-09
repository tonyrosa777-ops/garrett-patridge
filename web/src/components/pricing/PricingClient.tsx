"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import BookingCalendar from "@/components/BookingCalendar";

// PricingClient — INTERNAL Optimus sales tool (deleted pre-launch). Three FIXED tiers,
// identical on every Optimus build: Starter 1,500 / Pro 3,000 (Most Popular) / Premium
// 5,500 (anchor, no badge). Price is the price (no payment-split language), no third-party
// search products, no commerce tier (this build has none). Feature lists customized to a
// consulting authority site. Styled
// in the gunmetal+brass instrument system (design-system §5): squared cards, hairline
// borders, mono labels, brass accents, radial-gradient Section backgrounds.

interface Tier {
  id: "starter" | "pro" | "premium";
  label: string;
  name: string;
  price: number;
  blurb: string;
  recommended: boolean;
  features: string[];
}

const TIERS: Tier[] = [
  {
    id: "starter",
    label: "01 / Starter",
    name: "Starter",
    price: 1500,
    blurb: "The authority foundation. A credible, premium presence that loads fast and reads serious.",
    recommended: false,
    features: [
      "Core pages: Home, Method, Engagements, About, Contact",
      "Animated cinematic movie hero",
      "FAQ page with direct-answer schema",
      "Mobile-first responsive build",
      "ProfessionalService and Person structured data",
    ],
  },
  {
    id: "pro",
    label: "02 / Pro",
    name: "Pro",
    price: 3000,
    blurb: "The conversion engine. Everything in Starter plus the content authority hub and the lead capture that fills the pipeline.",
    recommended: true,
    features: [
      "Everything in Starter",
      "Professional Blog (the AEO authority engine)",
      "Lead-Capture Quiz (operational diagnostic)",
      "Automated Booking Calendar, fully branded",
      "Testimonials Showcase",
      "Photo Gallery",
    ],
  },
  {
    id: "premium",
    label: "03 / Premium",
    name: "Premium",
    price: 5500,
    blurb: "The full authority system. Everything in Pro plus the depth that owns the category in AI search and converts the referral network.",
    recommended: false,
    features: [
      "Everything in Pro",
      "Extended content and AEO depth (full article slate)",
      "Niche audience landing pages",
      "Gated lead tool (CMMC readiness self-scorer)",
      "Entity identity graph for AI search visibility",
      "Priority build and revision turnaround",
    ],
  },
];

// Comparison chart — rows grouped by category, ✓ / — per tier (no icon library).
interface CompareRow {
  feature: string;
  starter: boolean;
  pro: boolean;
  premium: boolean;
}
interface CompareGroup {
  category: string;
  rows: CompareRow[];
}

const T = true;
const F = false;

const COMPARISON: CompareGroup[] = [
  {
    category: "Foundation",
    rows: [
      { feature: "Core pages", starter: T, pro: T, premium: T },
      { feature: "Animated movie hero", starter: T, pro: T, premium: T },
      { feature: "Mobile-first responsive build", starter: T, pro: T, premium: T },
      { feature: "FAQ page", starter: T, pro: T, premium: T },
    ],
  },
  {
    category: "Conversion",
    rows: [
      { feature: "Automated Booking Calendar", starter: F, pro: T, premium: T },
      { feature: "Lead-Capture Quiz", starter: F, pro: T, premium: T },
      { feature: "Testimonials Showcase", starter: F, pro: T, premium: T },
      { feature: "Gated lead tool", starter: F, pro: F, premium: T },
    ],
  },
  {
    category: "Content & SEO",
    rows: [
      { feature: "Professional Blog", starter: F, pro: T, premium: T },
      { feature: "Photo Gallery", starter: F, pro: T, premium: T },
      { feature: "Extended content and AEO depth", starter: F, pro: F, premium: T },
      { feature: "Niche audience landing pages", starter: F, pro: F, premium: T },
    ],
  },
  {
    category: "Authority",
    rows: [
      { feature: "ProfessionalService and Person schema", starter: T, pro: T, premium: T },
      { feature: "Direct-answer FAQ schema", starter: T, pro: T, premium: T },
      { feature: "Entity identity graph for AI search", starter: F, pro: F, premium: T },
    ],
  },
  {
    category: "Support",
    rows: [
      { feature: "Standard build turnaround", starter: T, pro: T, premium: T },
      { feature: "Post-launch revision round", starter: F, pro: T, premium: T },
      { feature: "Priority build and revision turnaround", starter: F, pro: F, premium: T },
    ],
  },
];

const PRICE_BY_ID: Record<Tier["id"], number> = {
  starter: 1500,
  pro: 3000,
  premium: 5500,
};

const NAME_BY_ID: Record<Tier["id"], string> = {
  starter: "Starter",
  pro: "Pro",
  premium: "Premium",
};

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// Shared mono label style (the control-panel signature).
const monoLabel = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  color: "var(--accent)",
};

function Check() {
  return (
    <span aria-label="included" style={{ color: "var(--status-cleared)" }}>
      ✓
    </span>
  );
}

function Dash() {
  return (
    <span aria-label="not included" style={{ color: "var(--text-muted)" }}>
      —
    </span>
  );
}

export default function PricingClient() {
  const [openTier, setOpenTier] = useState<Tier["id"] | null>(null);

  // ROI calculator state.
  const [value, setValue] = useState<number>(45000);
  const [count, setCount] = useState<number>(2);
  const [pkg, setPkg] = useState<Tier["id"]>("pro");

  const roi = useMemo(() => {
    const price = PRICE_BY_ID[pkg];
    const monthly = value * count;
    const annual = monthly * 12;
    const breakEven = monthly > 0 ? Math.ceil((price / monthly) * 10) / 10 : 0;
    const twelveMonthRoi = price > 0 ? ((annual - price) / price) * 100 : 0;
    return { price, monthly, annual, breakEven, twelveMonthRoi };
  }, [value, count, pkg]);

  return (
    <>
      {/* ============ Section A — three tier cards (LIGHT) ============ */}
      <Section tone="light" motion="orbs">
        <div className="max-w-3xl">
          <Eyebrow>Packages</Eyebrow>
          <h2 className="mt-4" style={{ fontSize: "var(--text-h2)" }}>
            Three fixed packages. No surprises.
          </h2>
          <p
            className="mt-5 max-w-2xl"
            style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
          >
            The price is the price. Every package is a premium, conversion-engineered build on
            the same foundation. Pro is where most authority brands land.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex"
            >
              <div
                className="card-surface card-hover flex w-full flex-col rounded-md border p-6 md:p-8"
                style={{
                  borderColor: tier.recommended ? "var(--accent)" : "var(--border-subtle)",
                }}
              >
                {tier.recommended ? (
                  <span
                    className="absolute -top-3 left-6 rounded px-3 py-1"
                    style={{
                      ...monoLabel,
                      color: "var(--primary)",
                      background: "var(--accent)",
                    }}
                  >
                    Most Popular
                  </span>
                ) : null}

                <p style={monoLabel}>{tier.label}</p>

                <div className="mt-4 flex items-baseline gap-2">
                  <span
                    className="font-semibold"
                    style={{ fontSize: "var(--text-h2)", color: "var(--text-primary)" }}
                  >
                    {usd(tier.price)}
                  </span>
                </div>
                <p
                  className="mt-1"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}
                >
                  one-time build
                </p>

                <p
                  className="mt-5"
                  style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6 }}
                >
                  {tier.blurb}
                </p>

                <ul className="mt-6 flex flex-col gap-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-3" style={{ fontSize: "15px" }}>
                      <span style={{ color: "var(--status-cleared)" }} aria-hidden="true">
                        ✓
                      </span>
                      <span style={{ color: "var(--text-primary)" }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenTier((prev) => (prev === tier.id ? null : tier.id))
                    }
                    className={`w-full rounded border px-6 py-3.5 text-[15px] font-medium transition-colors ${
                      tier.recommended ? "btn-primary" : "btn-secondary"
                    }`}
                  >
                    {openTier === tier.id ? "Close calendar" : "Request a Strategic Conversation"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inline booking disclosure — opens the branded calendar under the cards. */}
        {openTier ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.4 }}
            className="mt-10 overflow-hidden"
          >
            <div className="mx-auto max-w-2xl">
              <p className="mb-4 text-center" style={monoLabel}>
                {NAME_BY_ID[openTier]} package · {usd(PRICE_BY_ID[openTier])}
              </p>
              <BookingCalendar />
            </div>
          </motion.div>
        ) : null}
      </Section>

      {/* ============ Section B — ROI calculator (DARK) ============ */}
      <Section tone="dark" motion="drift">
        <div className="max-w-3xl">
          <Eyebrow>Return on the build</Eyebrow>
          <h2 className="mt-4" style={{ fontSize: "var(--text-h2)" }}>
            One engagement pays for the site many times over.
          </h2>
          <p
            className="mt-5 max-w-2xl"
            style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
          >
            Set a realistic engagement value and how many you close in a month. The build cost
            is one line against the revenue a working pipeline returns.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Controls */}
          <div
            className="card-surface rounded-md border p-6 md:p-8"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            {/* Engagement value slider */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="roi-value" style={monoLabel}>
                  Avg engagement value
                </label>
                <span
                  style={{ fontFamily: "var(--font-mono)", fontSize: "15px", color: "var(--accent)" }}
                >
                  {usd(value)}
                </span>
              </div>
              <input
                id="roi-value"
                type="range"
                min={15000}
                max={135000}
                step={5000}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="mt-4 w-full cursor-pointer"
                style={{ accentColor: "var(--accent)" }}
              />
            </div>

            {/* Count slider */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <label htmlFor="roi-count" style={monoLabel}>
                  Engagements per month
                </label>
                <span
                  style={{ fontFamily: "var(--font-mono)", fontSize: "15px", color: "var(--accent)" }}
                >
                  {count}
                </span>
              </div>
              <input
                id="roi-count"
                type="range"
                min={1}
                max={10}
                step={1}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="mt-4 w-full cursor-pointer"
                style={{ accentColor: "var(--accent)" }}
              />
            </div>

            {/* Package selector */}
            <div className="mt-8">
              <p style={monoLabel}>Package</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {(["starter", "pro", "premium"] as const).map((id) => {
                  const active = pkg === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setPkg(id)}
                      className="rounded border px-3 py-2.5 text-[13px] font-medium transition-colors"
                      style={{
                        borderColor: active ? "var(--accent)" : "var(--border-subtle)",
                        color: active ? "var(--accent)" : "var(--text-secondary)",
                        background: active ? "rgba(184,134,75,0.08)" : "transparent",
                      }}
                    >
                      {NAME_BY_ID[id]}
                    </button>
                  );
                })}
              </div>
              <p
                className="mt-3"
                style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}
              >
                Build cost {usd(roi.price)}
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 gap-4 self-start">
            {[
              { label: "Monthly revenue", value: usd(roi.monthly) },
              { label: "Annual revenue", value: usd(roi.annual) },
              {
                label: "Break-even",
                value: roi.breakEven <= 1 ? "Under 1 month" : `${roi.breakEven} months`,
              },
              {
                label: "12-month ROI",
                value: `${Math.round(roi.twelveMonthRoi).toLocaleString("en-US")}%`,
              },
            ].map((r) => (
              <motion.div
                key={r.label}
                animate={{ opacity: [0.6, 1] }}
                transition={{ duration: 0.3 }}
                className="card-surface rounded-md border p-6"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <p style={monoLabel}>{r.label}</p>
                <p
                  className="mt-3 font-semibold tabular-nums"
                  style={{ fontSize: "var(--text-h3)", color: "var(--text-primary)" }}
                >
                  {r.value}
                </p>
              </motion.div>
            ))}
            <p
              className="col-span-2 mt-1"
              style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}
            >
              Illustrative model. Break-even is the build cost divided by one month of pipeline
              revenue at the inputs above.
            </p>
          </div>
        </div>
      </Section>

      {/* ============ Section C — comparison chart (LIGHT, last band before dark footer) ============ */}
      <Section tone="light" motion="grain">
        <div className="max-w-3xl">
          <Eyebrow>Full comparison</Eyebrow>
          <h2 className="mt-4" style={{ fontSize: "var(--text-h2)" }}>
            Every feature, every package.
          </h2>
        </div>

        <div
          className="card-surface mt-10 overflow-x-auto rounded-md border"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <table className="w-full border-collapse text-left" style={{ minWidth: 560 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <th className="px-5 py-4" style={monoLabel}>
                  Feature
                </th>
                {(["starter", "pro", "premium"] as const).map((id) => (
                  <th
                    key={id}
                    className="px-4 py-4 text-center"
                    style={{
                      ...monoLabel,
                      color: id === "pro" ? "var(--accent)" : "var(--text-secondary)",
                    }}
                  >
                    {NAME_BY_ID[id]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((group) => (
                <FragmentGroup key={group.category} group={group} />
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}

// Renders a category sub-header row plus its feature rows.
function FragmentGroup({ group }: { group: CompareGroup }) {
  return (
    <>
      <tr style={{ background: "var(--bg-elevated)" }}>
        <td
          colSpan={4}
          className="px-5 py-2.5"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {group.category}
        </td>
      </tr>
      {group.rows.map((row) => (
        <tr key={row.feature} style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <td
            className="px-5 py-3.5 text-[14px]"
            style={{ color: "var(--text-primary)" }}
          >
            {row.feature}
          </td>
          <td className="px-4 py-3.5 text-center">{row.starter ? <Check /> : <Dash />}</td>
          <td className="px-4 py-3.5 text-center">{row.pro ? <Check /> : <Dash />}</td>
          <td className="px-4 py-3.5 text-center">{row.premium ? <Check /> : <Dash />}</td>
        </tr>
      ))}
    </>
  );
}
