# design-system.md — Garrett Partridge

**The brand constitution.** Every build agent reads this before making any decision. Animation-specialist reads Section 8; content-writer reads Section 7; SEO agent reads Section 1; the auditor runs Section 12's checklist. No deviation from these values without written approval + a matching edit to this file.

**Aesthetic direction:** Industrial / utilitarian × Editorial — a *machined-instrument* hybrid inside the luxury-modern-2026-conversion family. The visual grade is premium; the register is precision, not luxury. Sources: market-intelligence.md §5 ("instrument-grade, machined, not luxurious"); initial-business-data.md §4 (executive + engineer).

**Theme: DARK (instrument-grade, near-black machined steel). No light theme.** Dark is the primary brand signal for this audience, not a preference. Source: market-intelligence.md §5 evidence 1–4 (defense-tech leaders use dark UI as a brand signal; 81.9% mobile / 82.7% desktop dark-mode preference per Almax 2024; the navy-drowning competitive set means *any* dark execution separates Garrett before a word is read).

---

## Section 1 — Brand Identity Statement

Garrett Partridge is the operations architect a New England defense-industrial-base manufacturer calls when the backlog is growing faster than cash, the CMMC clock is running, and the founder is one audit away from losing the prime. He is an engineer who has *operated* — signed payroll, owned a P&L, sat in the AS9100 audit chair, run an MRP cutover — not a slide-deck consultant. He is the opposite of the "million AI consultants" and fractional CIOs his buyers distrust on sight: problem-first, anti-hype, compliance hardwired into the workflow instead of bolted on as policy PDFs (initial-business-data.md §2, §4; market-intelligence.md §3 Objections, §8). He is **not** a luxury advisory boutique, **not** a cybersecurity startup, **not** a generalist turnaround firm, and **not** a lead-gen funnel — he is a scarce, embedded operator running a maximum of four engagements at a time (market-intelligence.md §8). Within five seconds, the site must make an engineer-led, time-starved, consultant-skeptical owner feel: *this person has stood on my floor at 6 a.m., he speaks P&L and shop floor in the same sentence, and he is not trying to sell me anything I don't already need.* The feeling is **quiet certainty** — the calm of an instrument that is simply correct (market-intelligence.md §3 Desires; §8 "refuses to compete on energy or charisma").

---

## Section 2 — Color Palette

**Theme decision: DARK, single-theme.** Every section background is dark or a *dark-tinted cool-slate* "light" band — never white, never near-white (CLAUDE.md Homepage Section Architecture Rule). Light bands here mean a *raised gunmetal* tint, clearly lighter than the page base but still a machined-steel surface, never a bone/paper tint (a warm bone tint would pull toward the luxury-law-firm trap the research explicitly rejects — market-intelligence.md §5 "What to avoid"). The cool slate tint is the correct "light" base for a gunmetal+brass instrument brand.

**Psychology justification for the palette (binding — memory: "every palette must be psychology-justified"):** Darker, more saturated, lower-"value" tones elicit measurably higher trust and premium/authority perception from executive observers (Color Institute™ 2021 suit-color trust experiment; Kuva Media "darker, richer colors suggest premium positioning and serious expertise" — both via market-intelligence.md §5 evidence 2). Navy is the *most overused* color in defense consulting and reads "law-firm safe," so it is rejected in favor of going darker + adding *metallic specificity* — brass, not gold (gold = wealth-manager luxury; brass = machined precision, the single torque indicator under raking light — market-intelligence.md §5 "Brand mood phrase" + evidence 3). The status accents map directly to the compliance-readiness mental model the buyer already lives in (cleared / action-needed / non-compliant), which is the audience's native instrument-panel language (market-intelligence.md §5 "Data tables styled as instrument readouts").

### Required CSS custom-property tokens (website-build-template.md naming → values)

| Token (template name) | Hex / value | Usage rule | Source |
|---|---|---|---|
| `--primary` | `#0E1116` | Page base — near-black machined steel. The dominant brand surface and the `bg-[var(--primary)]` dark-section base. | market-intel §5 `--surface-base` |
| `--primary-muted` | `rgba(14,17,22,0.6)` | Overlay/scrim base over media for text contrast. | derived from `--primary` |
| `--accent` | `#B8864B` | **Primary brand accent — restrained machined brass.** CTAs (border + text), section-divider hairlines, highlighted data-table values, particle color, shimmer sweep. Never a flood fill of a whole section. | market-intel §5 `--accent-brass` |
| `--bg-base` | `#0E1116` | Aliased to page base (dark theme). Dark sections. | market-intel §5 |
| `--bg-elevated` | `#161B22` | **The "light" (raised) section tint — gunmetal, cool-slate.** Used for alternating bands. Clearly lighter than `--primary`, never white. | market-intel §5 `--surface-raised` |
| `--bg-card` | `#1F262E` | Cards, panels, hover/active surfaces. | market-intel §5 `--surface-overlay` |
| `--text-primary` | `#E6E8EB` | Body + headings — brushed aluminum. All hero text. WCAG: 13.9:1 on `--primary` (AAA). | market-intel §5 `--text-primary` |
| `--text-secondary` | `#A6ADB6` | Captions, metadata, sub-labels. 6.6:1 on `--primary` (AA). | market-intel §5 `--text-secondary` |
| `--text-muted` | `#6E7681` | Fine print, disabled, footnotes. 3.4:1 — large/non-essential text only. | market-intel §5 `--text-muted` |

### Extended brand tokens (declare in globals.css alongside the 9 above)

| Token | Hex | Usage rule | Source |
|---|---|---|---|
| `--border-subtle` | `#2A323C` | 1px hairline rules — the "machined seam" dividers that engage on scroll. | market-intel §5 |
| `--accent-brass-hot` | `#D9A55A` | Brass hover state + micro-glow on CTA fill. No drop shadow, no neon. | market-intel §5 |
| `--status-cleared` | `#5C9E76` | Muted green — compliance "cleared" indicator only. Never decorative. | market-intel §5 |
| `--status-warn` | `#C9923A` | "POA&M / action needed" status only. | market-intel §5 |
| `--status-blocked` | `#B0524A` | **Muted oxblood — "non-compliant" status indicator ONLY.** This is the *only* place red appears. Never a saturated red panel, never a page header, never a section background. Honors Garrett's "red as an executive cue" intent via a status token. | market-intel §5; CLAUDE.md Build-Scope `dark-page-headers-not-red`; progress.md Palette override |

**Shimmer token:** H1 uses a brass/cool sweep (`--text-primary` → `--accent` → `--text-primary`), NOT the warm-gold sweep. This is the cool/brass variant the build-template `hero-shimmer` supports — declare `.hero-shimmer-brass` with brass mid-stops.

[CONFLICT: client's inherited one-pager used navy `#0F2A4A` + corporate blue `#1565C0` on white; research (market-intel §5 evidence 3) says navy is the single most overused, undifferentiated color in this category. Following research — dark gunmetal + brass. Garrett is explicitly NOT hard-coded on the inherited palette (initial-business-data.md §4: "now would be the time" to evolve), so this is a low-friction conflict.]

---

## Section 3 — Typography System

All four families are open-source via Google Fonts, license-clean, AEO-friendly. clamp-based scale, declared in Phase 1 globals.css. Source for every choice: market-intelligence.md §5 Typography table.

| Role | Token | Typeface | Weights | Why |
|---|---|---|---|---|
| Display / headlines | `--font-display` | **IBM Plex Sans** | 700, 600 | "Slightly mechanical skeleton with humanist touches" — technical credibility without coldness; avoids the Inter/Geist sameness of every YC SaaS site (BonFX, via market-intel §5). Reads "engineering documentation," not "growth consultant." |
| Body | `--font-body` | **Inter** | 400, 500 | Screen-optimized neutral workhorse; shares x-height + screen-optimization philosophy with Plex Sans for a clean pairing (BonFX). Performance over personality — correct for an instrument brand. |
| Mono / spec callouts / control-panel UI | `--font-mono` | **IBM Plex Mono** | 400, 500 | Signals engineering docs, P&L line items, compliance-control tables. Used for stat callouts ("110 controls"), data-table readouts, eyebrows, footnotes, and pull-quote labels. The "instrument readout" voice. |
| Editorial accent (long-form blog only) | `--font-serif` | **IBM Plex Serif** | 400 | Optional, journal/essay layout only — "institutional weight without bureaucratic stuffiness" (MaxiBestOf). Pairs natively with the Plex family. |

**Banned (pull toward luxury/legal):** Playfair, Bodoni, Cormorant, any high-contrast display serif. **Banned (generic/unbranded):** Roboto, Arial, system stack, Geist.

**Type scale (clamp-based, mobile-first; declare all in globals.css):**

| Level | clamp() | Notes |
|---|---|---|
| Display / H1 (hero) | `clamp(2.5rem, 6vw, 4.5rem)` | IBM Plex Sans 700, tight tracking, `--text-primary`, `.hero-shimmer-brass`. |
| H2 (section) | `clamp(1.875rem, 4vw, 3rem)` | Plex Sans 700. |
| H3 (card/sub) | `clamp(1.25rem, 2.5vw, 1.75rem)` | Plex Sans 600. |
| Body | `clamp(1rem, 1.05vw, 1.125rem)` | Inter 400, line-height 1.65 for long-form readability. |
| Eyebrow / label / stat | `0.8125rem` uppercase, `letter-spacing: 0.12em` | IBM Plex Mono 500 — the control-panel signature. |
| Fine print | `0.875rem` | Inter 400, `--text-muted`. |

---

## Section 4 — Spacing & Layout System

Standard build-template values unless noted. Source: website-build-template.md Design Tokens.

- **Max-width container:** `max-w-[1200px]` centered, `px-6` mobile / `px-8` desktop gutters.
- **Section vertical padding:** desktop `py-24` to `py-32`; mobile `py-16`. Long-form blog: `py-20` desktop.
- **Card padding:** `p-6` mobile / `p-8` desktop.
- **Grid:** 12-col desktop; collapses to single column at 390px (mobile-first, design 390 before desktop).
- **Gutters:** `gap-6` mobile / `gap-8` desktop.
- **Space scale:** full `--space-xs … --space-3xl` per template (4px → 64px). Add `--space-4xl: 6rem` for the generous interior-page header whitespace this brand needs (whitespace = premium restraint, market-intel §5).
- **scroll-padding-top:** 96 / 112 / 128 per template breakpoints.
- **Hairline rule:** sections separated by a 1px `--border-subtle` "machined seam" that reveals over 200ms on scroll (market-intel §5 motion). Not a heavy border.

### Layout Directions (Pattern #102 — per-section archetype seed; no two adjacent share an archetype; centered-stack/card-grid RATIONED)

Homepage rhythm (drives the `app/page.tsx` rhythm-map comment block). Archetype catalog: `knowledge/patterns/section-layout-archetype-catalog.md`. Brand axes (§8): precise, peer-level, quiet — favors asymmetric editorial splits and instrument-readout tables over centered marketing stacks.

| # | Section | Tone | Purpose | Layout archetype | Why it fits |
|---|---|---|---|---|---|
| — | Nav | dark | chrome | fixed bookend | Wordmark left, "Request a Strategic Conversation" brass-outline CTA right, "⬥ Pricing" amber internal marker. |
| 1 | Hero | dark | conversion (primary + diagnostic CTA) | Z-pattern hero (#8) | H1 = tagline + brass shimmer; subhead = the triggering-moment hook; primary CTA booking, secondary CTA the self-diagnostic. One focal point. |
| 2 | The Problem (Hidden Factory / backlog-to-cash / CMMC clock) | light (gunmetal) | empathy / loss-frame | held title + hairline rows (#5) | Each pain as an instrument-readout row with a `--status-blocked` indicator — mirrors the buyer's 3 a.m. fears as a control-panel fault list. |
| 3 | Standard Work 2.0™ (the method, 4 pillars) | dark | education | bento grid (#3) | Four pillars (IT/OT Convergence, Margin Engineering, Human-in-the-Loop, Sovereign Tier) as four unequal bento cells — reads as a system, not a slogan. |
| 4 | Proof of operating role / stats | light (gunmetal) | social proof | asymmetric split (#1) | Mono-set stat block left (recovered cash-conversion days, P&L owned) + short authority line right. Numbers in brass. |
| 5 | Engagement models (3 cards, NO pricing) | dark | education / qualification | staggered cards (#9) | 30-Day Triage / Fractional COO / Strategic Consultancy — each a card with "Request a Strategic Conversation," never a price. Staggered, not a uniform 3-up grid. |
| 6 | The Diagnostic (quiz CTA) | light (gunmetal) | conversion (mid-page nudge) | pulled statement (#7) | A single pulled control-panel statement inviting the operational self-diagnostic — different format + intent from the hero/booking CTAs (no duplicate "Ready to…?" block). |
| 7 | Authority / education hub (blog preview) | dark | content preview | editorial / magazine (#4) | Featured article + 2 secondary — the AEO engine surfaced on the homepage. This is the site's core, not an add-on. |
| 8 | Capacity / waitlist (the real 4-engagement constraint) | light (gunmetal) | conversion (final) | centered stack (#12, RATIONED) | The waitlist stated plainly as operational reality; centered stack is justified here (one of ≤2 per page). Opposite tone to footer. |
| — | Footer | dark | chrome | fixed bookend (navy-gunmetal) | Global footer fixed DARK → every page's last content band is LIGHT (gunmetal). |

Homepage tone string: `Nav(D) · Hero(D) · Problem(L) · Method(D) · Stats(L) · Engagements(D) · Diagnostic(L) · Blog(D) · Capacity(L) · Footer(D)` → strictly alternating after the nav→hero chrome seam, ends LIGHT before the DARK footer. 9 content bands + 2 bookends. Layout column distinct on every adjacency (8,5,3,1,9,7,4,12 — no repeat). Centered stack used once. No card grid as a content default.

**Interior pages:** `/about` asymmetric split (stats + no-headshot industrial still); `/blog` editorial index; each blog article = single-column long-form (serif optional) with FAQ instrument-rows; `/booking` centered stack with breathing-orb header; `/diagnostic` (quiz) full-page archetype world. Each degrades to single column at 390px.

---

## Section 5 — Component Style Rules

Derived from Section 2 palette + Section 8 axes (precise / peer-level / quiet → squared, hairline, no decoration).

- **Corner radius:** small and consistent — `rounded-md` (6px) on cards/inputs, `rounded` (4px) on buttons. **No pill buttons** (pills read consumer/SaaS; squared reads instrument). No fully-square either — a slight machined chamfer.
- **Primary button (CTA):** outlined — 1px `--accent` (brass) border, brass text, transparent fill. Hover → fills solid `--accent`, text flips to `--primary` (#0E1116). **No drop shadow, no glow** (market-intel §5). Label always booking: "Request a Strategic Conversation."
- **Secondary button:** 1px `--border-subtle` border, `--text-primary` text, transparent. Hover → border brightens to `--text-secondary`. Used for the diagnostic CTA.
- **Ghost / tertiary:** text + brass underline-on-hover. Nav links, "read the article."
- **Cards:** `--bg-card` (#1F262E) fill, 1px `--border-subtle` border, `p-8`. Hover → border → `--accent` at 0.4 alpha, 200ms. No shadow elevation — depth comes from the hairline + the radial-gradient section behind it.
- **Form inputs:** `--bg-elevated` fill, 1px `--border-subtle`, `--text-primary` text, mono labels. Focus-visible → 1px `--accent` ring (not a glow). Booking calendar fields inherit this exactly so it never reads as a third-party iframe.
- **Data tables / compliance matrices:** instrument-readout styling — `--font-mono`, narrow row height, 1px `--border-subtle` hairlines, highlighted values in `--accent` (brass), status cells use the three status tokens. This is a signature component (market-intel §5).
- **Navigation:** fixed top bar, `--primary` base with a 1px brass underline that appears on scroll. Wordmark left; links center/right in Inter; brass-outline booking CTA far right; "⬥ Pricing" in brass (internal sales-tool marker per CLAUDE.md). Mobile: drawer with dark opaque overlay, inner X close.

---

## Section 6 — Photography & Media Direction

**No personal headshot exists and none belongs in the hero** (initial-business-data.md §4; CLAUDE.md Hero Architecture Rule). Owner photo, if ever provided, goes only in About.

**Subject (binding — anti-slop, market-intel §5 "Anduril mimic trap"):** evoke **the shop floor that builds the part inside the drone — NOT the drone, missile, or weapon.** The brand mood phrase is the north star: *"machined steel, oil-blackened, single brass torque indicator under raking light — the inside of a Bridgeport at 6 a.m."*

- **Required shot types:** real machine-shop interiors at low/raking light; CNC and Bridgeport detail (chips, coolant, tooling); a swim-lane / value-stream whiteboard mid-Gemba; an instrument panel / SCADA readout; long-lead inventory on a rack; a clean, modern manufacturing floor (2026 register, never antique). Regional New England industrial exteriors where relevant.
- **Mood:** dark, machined, precise, raking-light, shallow depth of field, oil-and-aluminum palette that matches the UI tokens. Quiet, not heroic.
- **Processing:** desaturated cool with a single warm brass highlight where light catches metal. Heavy gradient/tint overlay (`--primary-muted`) on any image carrying text → 4.5:1 minimum.
- **Aspect ratios:** hero/video 16:9; blog card 3:2; article header 16:9; about/inline 4:3; gallery 1:1 or freeform.
- **Prohibited:** drones, missiles, weapons, soldiers, flags-as-decoration; stock-photo "business handshake / blazer in conference room"; glassmorphism; neon/cyberpunk; AI faces; antique props (fountain pens, banker's lamps, leather tomes — CLAUDE.md anti-slop); generic "circuit board / glowing AI brain" stock. No readable text baked into images.
- **Video (hero, Architecture B — see §8):** autoplay, loop, muted, playsinline; mp4+webm pair + poster for LCP; a real, readable camera move (steady push-in on a machine floor), never a static standstill. Heavy tint overlay for hero text contrast.

---

## Section 7 — Tone of Voice

Source: market-intelligence.md §3 (audience language, objections) + initial-business-data.md §4 (executive + engineer, anti-hype). Voice anchor: *the operations executive who has run the P&L and walked the floor — peer-level, precise, never selling.*

**1. Speak P&L and shop floor in the same sentence.**
Rule: every operational claim ties to a financial or floor-level outcome the buyer feels.
BEFORE (competitor generalist): "We drive operational excellence and unlock growth."
AFTER: "Undocumented rework is eating 20 to 40 percent of your capacity. We find it in 30 days and convert it back into cash conversion days."

**2. Anti-hype. Name the constraint, not the technology.**
Rule: lead with the problem and the mechanism; never lead with AI or a buzzword.
BEFORE (the "million AI consultants"): "Leverage AI to transform your manufacturing operations."
AFTER: "Most shops don't have an AI problem. They have a value-stream constraint that AI would only automate. We map the stream first, then decide what to build."

**3. Named concepts, plain explanation. No acronym soup.**
Rule: use the memorable named hooks (Hidden Factory, Sovereign Tier, Standard Work 2.0™) and explain each in plain language on first use; never stack unexplained defense acronyms.
BEFORE: "We deliver CMMC, ITAR, AS9100, CUI, and NIST 800-171 readiness across your IT/OT stack."
AFTER: "We hardwire the compliance you're already on the hook for — CMMC, ITAR, AS9100 — into the daily workflow, so the auditor finds it already running, not bolted on as a binder of PDFs."

**4. Quiet certainty. Refuse the energy sell.**
Rule: short declarative sentences. No exclamation points. No urgency theater.
BEFORE: "Don't miss out! Spots are filling fast — book your FREE call today!"
AFTER: "I run a maximum of four concurrent engagements. If your situation is time-critical, a prime supplier letter, a CMMC window, an LOI in diligence, request the conversation and name the trigger."

**5. Cited, source-respecting (AEO discipline).**
Rule: every regulatory or financial claim cites a primary source inline; this is both AEO fuel and engineer-trust currency.
BEFORE: "CMMC is coming and you need to be ready."
AFTER: "CMMC Phase 2 — mandatory C3PAO Level 2 certification in DoD contracts — begins November 10, 2026. Per CyberSheath's 2025 State of the DIB report, only 1 percent of contractors feel fully prepared."

**6. Em-dash discipline (universal — CLAUDE.md Content Standards).**
Rule: testimonials and prose copy use commas, periods, and ellipses, never the em dash. The em dash is a copywriter/AI tell.
BEFORE: "He recovered our cash conversion cycle — 14 days — in a single quarter."
AFTER: "He recovered 14 days of our cash conversion cycle in a single quarter. One quarter."

**7. Affirmative first-person brand voice (universal — CLAUDE.md Copy Writing Rule; Error #71).**
Rule: when Garrett ("I" / "we") is the subject describing his own approach, lead with what he DOES, not what he avoids — negation plants the anti-image on the brand. (Negation stays valid in pain-point bodies that describe *other* consultants, in comparison content, and in compliance disclaimers.)
BEFORE (brand as subject of negation): "I don't bolt on technology. I don't sell hype."
AFTER (affirmative): "Every engagement starts at the value stream. I map the constraint, then build the system that removes it."

---

## Section 8 — Brand Personality Axes

Three axes. These directly drive the animation-specialist's hero selection and the content-writer's register. Source: market-intelligence.md §3, §5, §8 + initial-business-data.md §4.

**Axis 1 — Quiet ◄━━●━━━━━━━━━━► Loud**
`Quiet` (heavy left). The buyer has been oversold by McKinsey-alumni growth consultants and rejects charisma selling (market-intel §3 Desires, §8). Drives: low-velocity restrained motion, no neon, no exclamation, ample whitespace, declarative copy.

**Axis 2 — Engineer ◄━●━━━━━━━━━━━► Marketer**
`Engineer` (far left). Precision, primary sources, instrument-readout components, mono callouts, P&L-and-floor literacy. The brand must read as documentation, not a campaign (initial-business-data.md §4; market-intel §5 typography rationale).

**Axis 3 — Machined / Industrial ◄━●━━━━━━━━━━► Luxury / Refined**
`Machined` (far left). Brass-not-gold, gunmetal-not-velvet, hairline seams, squared corners. Explicitly rejects the dark+gold+serif luxury-law-firm trap (market-intel §5 "What to avoid"). "Garrett is precision and torque, not Hermès."

**Animation implication (binding for animation-specialist):** an "intimate, quiet, machined" brand gets *extremely restrained, low-velocity* motion — ≤8 hero particles, opacity ≤0.15, no sparkles, no bold electric energy. Section motion is ambient and slow (≤0.3Hz). See §8 + market-intel §5 Motion.

---

## Section 9 — Competitor Differentiation Statement

Top competitors from market-intelligence.md §2.

**vs. NH MEP / MassMEP (NIST MEP centers).** Where the MEP centers run dated late-2010s light-theme WordPress with a non-profit "manufacturing school" feel — workshop-based, subsidized, generalist, and subcontracting CMMC out to partners — Garrett ships a dark instrument-grade authority hub that signals embedded executive leadership, not a class you attend. They look like a public resource; he looks like the operator a founder calls when the prime letter lands. (We treat NH MEP as a *legitimacy partner* to name, not a rival to attack — market-intel §7.)

**vs. Mainstay Technologies (the strong local CMMC IT shop).** Mainstay owns the CMMC RPO credential and a polished modern *light/blue* IT-managed-services brand — but they explicitly cannot run operations, P&L, AS9100, or Standard Work. Garrett's dark, machined, P&L-literate brand visually and verbally claims the operations layer Mainstay can't: the site frames Mainstay-type IT work as one input into an operating system Garrett architects, positioning them as a partner beneath his layer rather than a competitor across from it. Color does the work first — his dark gunmetal separates from their corporate blue before a word is read.

**vs. Seraph (national A&D turnaround firm) and the national fractional-COO platforms (Chief Outsiders, MetaExperts, ScaleUpExec).** These compete on scale, marketplaces, and "Get It Done NOW" SaaS-flavored growth copy, with big-firm pricing aimed at PE-backed Tier 1s — too heavy, too generic, and non-local for a $5–50M New England shop. Garrett differentiates on *named local presence + the integrated CMMC/ITAR/AS9100 + IT/OT regulatory cluster no platform displays*, and on a quiet, anti-marketplace tone: a scarce single operator, not a roster. Where they publish rate cards and "scalable up/down" availability, he publishes a four-engagement capacity constraint — scarcity as authority.

---

## Section 10 — Design Anti-Patterns (Prohibited List)

Source: market-intelligence.md §5 ("What to avoid"), §8 ("What the site should not do") + initial-business-data.md §8.

1. **No navy / corporate blue as a brand color.** It is the single most overused, undifferentiated color in defense consulting (Lockheed `#365181`, every MEP/competitor) — reads "law-firm safe." Use gunmetal + brass.
2. **No white or near-white section backgrounds, ever.** Not `#fff`, not `#fafafa`. "Light" bands = the gunmetal `--bg-elevated` cool-slate tint (CLAUDE.md). A white band reads as a default template and breaks the instrument brand.
3. **No dark + gold + serif luxury treatment.** That is wealth-manager / boutique-M&A-law. Brass (machined), not gold (wealth); Plex Sans, not Playfair.
4. **No drones, missiles, weapons, or Anduril-style aero-render heroes.** Reads as poseur from a one-person consultancy. Show the shop floor that builds the part, not the part.
5. **No neon / cyberpunk dark-mode.** Reads cybersecurity startup, not operations executive.
6. **No glassmorphism, heavy gradients-as-decoration, or drop-shadow/glow on buttons.** Reads B2C SaaS. Flat outlined CTAs, hairline seams.
7. **No saturated red anywhere except the `--status-blocked` oxblood status indicator.** No red panels, no red headers (memory `dark-page-headers-not-red`).
8. **No "Book a Free Call," "Schedule a Discovery Call," countdown timers, "5 spots left," queue counters, newsletter pop-ups, or chatbots.** The CTA is "Request a Strategic Conversation"; scarcity is the real four-engagement constraint stated plainly (market-intel §8).
9. **No public pricing** (market-intel §4 "for internal use only"; initial-business-data.md §5).
10. **No Roboto, Arial, Geist, or default system fonts** — signals generic/unbranded; the type *is* the credibility signal here.
11. **No buzzword/acronym soup without plain-language explanation; no hype-driven AI promises** (initial-business-data.md §8 — the exact pattern his buyers reject).
12. **No stock photography, no AI faces, no vendor logos he hasn't served, no Lorem-ipsum-looking testimonials** (market-intel §7).

---

## Section 11 — Sections Matrix

| Section | Include? | Notes |
|---|---|---|
| Shop (Stripe + Printful) | **No** | CLAUDE.md Build-Scope override + progress.md: branded merch does not fit a fractional-COO authority brand selling $35k–$135k engagements. Not scaffolded, no cart/CartDrawer/printful/stripe files, no nav/sitemap entry. |
| Blog (Sanity CMS / file-based) | **Yes (always) — EXPANDED, primary engine** | The site's core distribution channel. Full market-intel §6 nine-article AEO slate PLUS extra SEO/AEO/GEO articles (capacity freed by skipping the shop reinvested here). AEO-first: direct-answer leads, JSON-LD Article+FAQPage+Person, primary-source citations, quarterly date refresh. |
| Quiz / Lead capture | **Yes** | Reframed as an **operational self-diagnostic** (NOT a marketing quiz). Types the visitor into one of four archetypes (Hidden Factory / CMMC-clock / Backlog-to-Cash / Onshoring) and lands on the BookingCalendar. No email gate. Full-page archetype experience. |
| Booking widget (Calendly) | **Yes (always)** | Custom-built `BookingCalendar` (Calendly-API-backed, not an iframe), 100% branded to these tokens. CTA labeled "Request a Strategic Conversation." `/booking` page + homepage capacity section. Demo-mode seeded availability. |
| Google Maps embed | **No** | Service is on-site-at-client across New England, not a destination address; an embedded map adds no value and the buyer inspects for trackers (market-intel §7 security posture). |
| Instagram feed | **No** | N/A for this audience (initial-business-data.md §5; §7). LinkedIn is the only social channel and it is linked via `sameAs`, not embedded. |
| Service area pages | **Yes — 3 niche landing pages** | Not city pages. Audience-segment landings: (1) NH/MA Defense Contract Manufacturer, (2) Foreign Manufacturer Onshoring (Canadian-parent US subsidiary — the largest AEO white space, market-intel §6 #4), (3) PE Operating-Partner / Diligence. Each loss-framed per §12. |
| Pricing page | **Yes (internal sales tool)** | Built in nav as "⬥ Pricing" (brass marker). Optimus's standard three-tier sales tool for the demo. **Deleted in pre-launch audit** — it is never client-facing (Garrett publishes no pricing). |
| Testimonials page | **Yes** | 36 written in target-audience voice, marked `[DEMO COPY — pending client review]`; real ones slotted as Garrett approves (Tuesday ask). 9 per page, 3×3 grid, 4 pages. Zero em dashes. |
| About page | **Yes** | Proof-of-operating-role is the #1 trust signal (market-intel §7). CEO/GM/P&L history, credentials, named prime relationships, Standard Work 2.0™ trademark status, association memberships. No headshot in hero; industrial still + stats. |
| FAQ page | **Yes** | Instrument-readout Q&A; doubles as AEO FAQPage schema surface. |
| Contact page | **Yes** | Routes to the booking flow; no bare contact form as primary. Entity name + DFARS-grade privacy statement in footer (market-intel §7). |

### Custom Features (beyond base template)

| Custom Feature | Source (file + section) | Complexity |
|---|---|---|
| Operational self-diagnostic (4-archetype quiz: Hidden Factory / CMMC-clock / Backlog-to-Cash / Onshoring) | initial-business-data.md §2; market-intel §3, §8 | Medium (data layer `quiz.ts` + `QuizClient.tsx`, standard archetype pattern) |
| Compliance / P&L "instrument readout" data-table component | market-intel §5 (data tables as instrument readouts) | Low–Medium (mono table, status tokens) |
| Standard Work 2.0™ four-pillar bento (IT/OT Convergence · Margin Engineering · Human-in-the-Loop · Sovereign Tier) | initial-business-data.md §2 methodology | Low (bento grid + copy) |
| Capacity / waitlist section (real 4-engagement constraint, trigger self-qualification) | market-intel §8 | Low (copy + booking CTA, no countdown) |
| 3 niche audience landing pages (loss-framed) | market-intel §6 #4, §8; §12 below | Medium |
| Person + ProfessionalService + Service JSON-LD with `sameAs` (LinkedIn) | CLAUDE.md Entity Identity Rule; market-intel §6 AEO reqs | Low–Medium (StructuredData.tsx) |
| Brass/cool H1 shimmer variant (`.hero-shimmer-brass`) | §2; build-template hero-shimmer | Low |

---

### Premortem Plan-Gate Patches (BINDING — applied 2026-06-07 after the fresh-critic autopsy)

These five patches override anything above that conflicts. They exist because the premortem stipulated launch+90 failure and reasoned backward. Authority: CLAUDE.md Plan Premortem Gate Rule + Fix-on-Sight Rule.

1. **TRUST-LAYER INTEGRITY (fixes Rank-1 FATAL).** Trust-layer content — testimonials, case-study numbers, credentials, named primes, headshot — ships **REAL or EMPTY on the public site, never fabricated-and-presented-as-real**, because this buyer inspects and unverifiable specifics read as fabricated (the opposite of trust). Rule:
   - The **June 9 DEMO** may run on `[DEMO COPY]` (it is a pitch; Garrett knows it's placeholder).
   - **PUBLIC launch is hard-gated** `[LAUNCH-BLOCKER]` on: ≥3 attributable testimonials (real, with name/company-or-role), ≥1 real case-study number, real credentials, real named primes. Where a real specific isn't yet cleared, ship **honest reduction** ("engagements under NDA," "P&L ownership at [role]") — never an invented number on his real name. The pre-launch-auditor adds a binary check: *any `[DEMO COPY]` left in a trust-layer surface at public-launch = FAIL.*
   - Testimonials: still build the 36-slot architecture, but demo-copy slots render only until real ones replace them; do not publish 36 fabricated quotes to the live domain.

2. **FAST CONVERSION PATH (fixes Rank-2 FATAL).** The blog stays the long-game engine, but the demo + launch lead with the **white-space, weak-competition asset**, not the "Strong"-competition queries:
   - Demo flagship article = **#4 Foreign-Manufacturer Onshoring / FOCI** (market-intel §6 — "largest single AEO white space," weak competition) + the two next-weakest (#6 AS9100+CMMC integration, #7 backlog-to-cash). The three "Strong"-competition pieces (#1 CMMC playbook, #2 DFARS, #5 fractional-COO) are built but are NOT the citation bet.
   - Add a **forwardable gated lead tool** — a DFARS-flowdown checklist OR a CMMC-readiness self-scorer (the exact "DFARS flowchart" mechanic that converted Garrett himself, market-intel §3). Indexable, genuinely useful, gives the referral network something concrete to forward **on day one**, independent of AI-engine indexing latency. This is the week-one conversion path the waitlist-only funnel lacked.

3. **TWO-TIER CAPACITY LADDER (fixes Rank-3).** The waitlist alone repels time-critical buyers (they go to Mainstay/Seraph today). Split the CTA:
   - Keep "Request a Strategic Conversation" for full engagements (the waitlist, real 4-engagement constraint).
   - **Add the paid 2-hour Strategic Consult ($1,500–$2,500, market-intel §4) as the always-available lower rung** — revenue + a qualified-lead filter + a way to engage Garrett *this week* without waiting for Phase 3. Funnel becomes "wait for a full slot, or pay to jump the line with a consult," which is how a scarce senior operator builds a warm bench (his stated goal: pipeline for FUTURE capacity).

4. **DARK-PIVOT ALIGNMENT IS A DEMO-DAY STEP, not a post-launch surprise (fixes Rank-5).** Garrett's #1 fear is brand dilution; he knows a navy-on-white one-pager. Do NOT push the dark theme to a public URL on his name until he owns the decision. At the demo: lead with the §12.8 defensibility script (pre-suasion — the "why dark" research FIRST), then show a **side-by-side board (inherited navy vs. gunmetal+brass)** so he chooses with evidence in front of him. Get explicit verbal buy-in. (Closes the open progress.md flag.)

5. **HERO = ARCHITECTURE B, 3-clip stitched movie header (locked by Anthony 2026-06-07).** Resolves the A-vs-B fork toward B per direct client direction. The premortem's motion-readability concern (a slow push-in reading as a frozen photo — the Goddu failure) is **mitigated by Anthony's explicit continuous-motion spec**: each clip is a slow steady push-in + ambient motion (drifting haze / falling chips+mist / light shimmer), already mid-push at cut-in, brass-hairline left→right wipe + 800ms crossfade between clips, loop 3→1 through a slow black fade. Composition: subject pushed RIGHT, dark negative space LEFT third + a CSS left-edge gradient (black 0% → transparent 45%) guaranteeing the H1/CTA zone stays dark regardless of generation. Reference: 603-collectibles movie header + Pattern #87 (stitched multi-clip) + the `/optimus-higgsfield-hero-video` skill. Architecture A (machined-brass particle stack) remains the documented fallback ONLY if B can't clear the gate after a reasonable attempt. See Section 6 + the hero pipeline brief.

---

## Section 12 — Psychological Foundations

The behavioral-mechanism layer under Sections 1–11. Binding for content-writer (diagnostic framing, anchoring, loss-frame openers) and pre-launch-auditor (binary checks). Audience-state source: market-intelligence.md §3.

**1. Audience emotional state design.** The buyer lands in a **threat + time-pressure + skepticism** state: a prime supplier letter or a CMMC Phase-2 clock (Nov 10, 2026) creates existential threat ("we lose the prime"); backlog-to-cash and the Hidden Factory create a hidden-failure fear; and prior over-selling by consultants creates active distrust (market-intel §3). Under threat, working memory and executive function narrow (Schmader & Beilock 2012, cognitive load under threat) — so the site must *reduce* load, not add to it: direct answers first, no acronym soup, instrument-clear hierarchy. The threat is not manufactured; it is named and then met with calm competence (quiet-certainty register, §7 principle 4).

**2. Cognitive fluency as bedrock (Reber, Schwarz & Winkielman 2004).** Fluent processing produces positive evaluation and felt trust. Every Section 2–5 decision lowers load: AAA-contrast brushed-aluminum text on near-black; one accent (brass) so attention has a single signal; mono for scannable spec/stat callouts; hairline seams instead of busy dividers; squared, predictable components. The dark instrument aesthetic is itself fluency for a defense-tech-literate buyer — it matches the mental model they already hold of "serious precision tooling," so the brand processes as *correct* before it is read.

**3. Behavioral Mechanisms Map (14 rows — every row design-decision → mechanism → citation):**

| # | Design decision (Section) | Mechanism | Citation |
|---|---|---|---|
| 1 | Dark gunmetal + saturated-low palette (§2) | Darker tones raise perceived authority/trust in executive observers | Color Institute™ 2021 suit-color trust study (market-intel §5) |
| 2 | Brass-not-gold single accent (§2) | Distinctiveness + von Restorff isolation — one signal owns attention | von Restorff 1933 (isolation effect) |
| 3 | Pricing-matrix anchor tier (§11 Pricing) | Anchoring — premium tier sets the reference point | Tversky & Kahneman 1974 |
| 4 | Loss-framed niche-landing openers (§11, §12.6) | Losses loom larger than equivalent gains | Kahneman & Tversky 1979 (prospect theory) |
| 5 | Diagnostic quiz "restate your answers" result (§11) | Effort justification + cognitive consistency | Festinger 1957 |
| 6 | Self-built diagnostic result the user assembles (§11) | IKEA effect — self-constructed outcomes valued higher | Norton, Mochon & Ariely 2012 |
| 7 | Primary-source citations on every claim (§7.5) | Reason-respecting / authority compliance | Cialdini 2001 (authority); Langer 1978 ("because") |
| 8 | Four-engagement waitlist stated plainly (§11) | Scarcity raises perceived value when credible, not gamified | Cialdini 2001 (scarcity) |
| 9 | Instrument-readout data tables (§5) | Processing fluency → trust; chunked scannable info | Reber/Schwarz/Winkielman 2004; Miller 1956 (chunking) |
| 10 | Brass shimmer on H1 only (§2, §3) | Lightness/motion arousal directs first fixation to the focal claim | Mehta & Zhu 2009 (color/arousal) |
| 11 | Mono eyebrow labels above each section (§3) | Pre-suasion priming — sets the frame before the message | Cialdini 2016 (Pre-Suasion) |
| 12 | "Proof of operating role" About-first stats (§11) | Concrete, checkable specifics beat abstract claims | Reyes, Thompson & Bower 1980 (vividness/availability) |
| 13 | Named hooks (Hidden Factory, Sovereign Tier) (§7.3) | Labeling/availability — a named concept is recalled + forwarded | Tversky & Kahneman 1973 (availability) |
| 14 | Quiet, low-velocity motion + whitespace (§4, §8) | Reduced extraneous load preserves attention for the message | Sweller 1988 (cognitive load theory) |

**4. Commitment-escalation on the diagnostic.** The operational self-diagnostic compounds three mechanisms: (a) **IKEA effect** (Norton/Mochon/Ariely 2012) — the visitor *builds* their own result by answering, so the typed archetype feels earned, not pitched; (b) **effort justification** (Festinger 1957) — having invested 5–7 answers, abandoning before the result is dissonant; (c) **cognitive consistency** — the result *restates the visitor's own answers back* ("you told us your backlog is outrunning cash and a prime letter just landed"), so booking the conversation is consistent with the self-description they just authored. The auto-advancing question slides keep load low (§12.1) while the mirroring `detail` sub-copy on each option does the "we know you" work. The result lands on the inline BookingCalendar — one decision at peak self-recognition, no email gate.

**5. Anchoring on the pricing matrix (Tversky & Kahneman 1974) — internal sales tool only.** The Optimus three-tier page anchors the demo conversation: Premium ($5,500) is explicit **anchor bait** — its job is to make Pro ($3,000) feel reasonable, never to be picked; Pro carries the "Most Popular" badge as the intended choice; Starter ($1,500) is the low anchor that makes Pro feel substantive. (This page is deleted pre-launch; Garrett's *client-facing* site publishes no pricing per §10.9 — the anchoring discipline here governs the sales demo, not the public brand.)

**6. Loss-aversion framing for niche landing pages (Kahneman & Tversky 1979).** Each of the three niche landings (§11 Service-area) opens with the **loss vector before the mechanism**:
- **NH/MA Defense Contract Manufacturer:** opens on losing the prime to a failed CMMC Phase-2 gate / SPRS exposure (the largest 2026 loss), then the readiness mechanism.
- **Foreign Manufacturer Onshoring:** opens on the 90-day gate to qualify for US defense business slipping (lost contract eligibility), then the US-subsidiary stand-up mechanism.
- **PE Operating-Partner / Diligence:** opens on undiscovered ops risk torpedoing the LOI / valuation, then the 21–30 day forensic-diligence mechanism.
Binding rule: no niche landing leads with capability; each leads with what the buyer stands to lose this year.

**7. Pre-launch-auditor checklist (10 binary checks — FAIL on any):**
1. Does the homepage H1 use cognitive-fluent diction (≤2 syllables/word average, no acronym in the H1)?
2. Is every section background a radial gradient, dark or gunmetal-tint, with NO white/near-white band?
3. Is red present ONLY as the `--status-blocked` oxblood status indicator (no red panel/header)?
4. Does every regulatory/financial claim cite a primary source inline?
5. Does the diagnostic result restate the visitor's own answers before the booking CTA?
6. Is the booking CTA labeled "Request a Strategic Conversation" (never "Book a Free Call") everywhere?
7. Does each of the 3 niche landings open with a loss vector before any capability claim?
8. Is the four-engagement scarcity stated as plain capacity (no countdown, no "X spots left")?
9. Is there zero public pricing on any client-facing page (Pricing page = internal, deleted pre-launch)?
10. Does the About page lead with checkable proof-of-operating-role specifics (P&L owned, named primes), not abstract claims?

**8. Defensibility script (for client handoff — not synthesis).** "Garrett, we built the site dark and machined on purpose. Behavioral color research — the Color Institute's 2021 trust study and the B2B color-psychology work in your market brief — shows executive buyers read darker, lower-value tones as more authoritative and premium, and your entire competitive set defaults to the same overused navy, so going darker with a brass accent separates you before a single word is read. The loss-framed openers and the named-source citations aren't marketing tone; they're prospect-theory and authority-compliance mechanisms (Kahneman & Tversky 1979; Cialdini 2001) chosen because your buyer is an engineer under a compliance clock who distrusts consultants and hires the source he was already cited by. Every visual and copy choice traces to a mechanism in the brief, not to taste."

---

## ⚠️ Confidence Flags

- No ⚠️ LOW CONFIDENCE sections. market-intelligence.md §5 is a near-complete design brief with hex codes, typography, motion, and color-psychology citations already supplied; §1/§6/§8 supply positioning and conversion direction directly. Fewer than 3 sections required flags, so no escalation to re-run market-researcher.
- One documented [CONFLICT] (Section 2): inherited navy palette vs. research-mandated gunmetal+brass. Resolved toward research; low friction because the client is explicitly open to evolving the inherited look (initial-business-data.md §4).
- Open Tuesday-asks (case-study number, certs, headshot, scheduling platform, entity name, LinkedIn URL) are all covered by the `[DEMO COPY]` standard and do not block synthesis or the demo (progress.md).
