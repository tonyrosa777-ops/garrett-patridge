# /optimus-review — Garrett Partridge
Date: 2026-06-07
Diff scope: working tree vs base (53 files; the Next 16 site scaffold + pages, API routes, components)
Specialists run: 8 (all completed) — correctness, security, architecture, tests, performance, style, absolute-rules, design-system
Verifier: Opus 4.7
Raw findings: 15  Verified: 4 BUG  9 DESIGN  2 suppressed

## Summary
BUG: 4 — must resolve before launch
DESIGN: 9 — review with owner; fix or waive
SUPPRESSED: 2 — false positives filtered (duplicate em-dash entries consolidated into BUG-3 / BUG-4)

Note on scope per project context: NO SHOP (authorized directive), the internal /pricing page (intentional demo tool, noindex, deleted pre-launch), the single-dark-theme with gunmetal "light" bands, the [DEMO COPY] trust layer, and the all-dark `tones` audit signal are all AUTHORIZED and were NOT treated as violations. No specialist flagged any of them. No automated test suite is expected on this marketing build, so the tests-lens gap is a DESIGN suggestion, not a blocker.

## BUG Findings (block launch — must resolve)

### BUG-1 — [absolute-rules] — web/src/app/method/page.tsx:165
The rendered InstrumentTable caption "Before — the fault readout" contains an em dash, which §13 / the Copy Writing Rule bans in all user-facing copy.

**Reproduction:** Read web/src/app/method/page.tsx:150-189. Confirmed line 165 is `<InstrumentTable caption="Before — the fault readout">` with a literal U+2014 em dash. Read web/src/components/ui/InstrumentTable.tsx (cited path was `components/InstrumentTable.tsx`; actual is `components/ui/InstrumentTable.tsx`, but the offending string lives in method/page.tsx as cited): confirmed line 18 accepts a `caption` prop and lines 24-29 render `{caption}` as visible heading text. The em dash therefore ships to the user. Absolute-rules violations are always BUG.
**Suggested fix:** Replace the em dash with a colon: `caption="Before: the fault readout"`.
**Also flagged by:** design-system

---

### BUG-2 — [absolute-rules] — web/src/app/method/page.tsx:178
The paired "After" InstrumentTable caption renders an em dash (`After — Standard Work 2.0… installed`), same §13 violation as BUG-1.

**Reproduction:** Read web/src/app/method/page.tsx:177-188. Confirmed line 178 is `<InstrumentTable caption={`After — Standard Work 2.0${TM} installed`}>` with a literal em dash inside the template literal. Same render path as BUG-1 (InstrumentTable.tsx:24-29 renders the caption verbatim), so it is visible copy, not a comment. Absolute-rules violations are always BUG.
**Suggested fix:** Replace the em dash with a colon: `caption={`After: Standard Work 2.0${TM} installed`}`, pairing cleanly with the corrected "Before:" caption.
**Also flagged by:** design-system

---

### BUG-3 — [security] — web/src/app/api/calendly/book/route.ts:45-51
The origin allowlist on the state-intended POST /api/calendly/book endpoint trusts ANY `*.vercel.app` host, which is the documented CSRF/origin defense (Error #66) but is bypassable by any attacker who can host a page on a free Vercel subdomain.

**Reproduction:** Read web/src/app/api/calendly/book/route.ts in full. Confirmed `originAllowed()` (lines 28-54) is the only request-verification gate, and lines 46-51 return `true` for any origin whose host `endsWith(".vercel.app")` BEFORE consulting the explicit `allowed` Set. The wildcard short-circuits the allowlist, so `https://evil-page.vercel.app` passes. Today the impact is bounded: `createLiveBooking()` (lines 56-63) is a no-op stub that persists/forwards nothing, and demo mode returns `{ok:true,demo:true}` with no side effect (verified lines 91-113). Classified BUG because the security control is genuinely defective as written, the comment relies on it as the CSRF gate, and the file marks itself as the single wiring point for the real scheduling-link call at launch, at which point this becomes a live cross-site booking-submission vector. Cheap to fix now.
**Suggested fix:** Drop the blanket `.vercel.app` wildcard. Add this deployment's own preview host via the Vercel-injected env var (`if (process.env.VERCEL_URL) allowed.add(`https://${process.env.VERCEL_URL}`)`) and rely on the explicit allowlist, OR tighten the suffix to this project's prefix (e.g. `/^garrett-?partridge[\w-]*\.vercel\.app$/`).
**Also flagged by:** —

---

### BUG-4 — [correctness] — web/src/app/api/calendly/slots/route.ts:83-91
Live Calendly slots are formatted with `getHours()`/`getMinutes()`, which read the runtime-local timezone (UTC on Vercel), so a 9:00 AM Eastern slot is returned as "14:00" and silently disagrees with the seeded business-hour wall-clock times the demo path uses.

**Reproduction:** Read web/src/app/api/calendly/slots/route.ts in full (cited range 504-516 is wrong; actual offending code is lines 83-91, but the content matches the evidence exactly). Confirmed `liveSlots()` does `const d = new Date(s.start_time)` then `String(d.getHours())` / `getMinutes()` — both return time in the runtime-local zone, which is UTC on Vercel serverless. Confirmed the seeded path (`CANDIDATE_SLOTS`, line 12) returns fixed wall-clock strings like "09:00" intended as business hours, so the two paths disagree the moment `CALENDLY_API_KEY` is set. The wrong HH:MM then round-trips to /api/calendly/book and the confirmation display. Latent today (no credentials in the demo) but a verified runtime defect that surfaces at launch. Fix is cheap.
**Suggested fix:** Format with an explicit fixed timezone instead of runtime-local: use `Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour12: false, hour: '2-digit', minute: '2-digit' })` and read the parts, so live and seeded slots agree regardless of server timezone.
**Also flagged by:** —

## DESIGN Findings (review with owner — fix or waive)

### DESIGN-1 — [correctness] — web/src/app/diagnostic/DiagnosticClient.tsx:73-79
Quiz back-navigation discards the answer for the question being returned to and never re-highlights it, contradicting the CLAUDE.md quiz contract ("re-highlights the saved answer for that question").

**Reproduction:** Read DiagnosticClient.tsx:73-79 (cited range 1328-1334 is wrong; actual goBack is 73-79, content matches). Confirmed `goBack()` does `setAnswers(prev => prev.slice(0, questionIndex - 1))`, discarding the returned-to answer. Read lines 181-212: option selected-state derives only from `pendingIndex` (reset to null on nav), never from `answers[questionIndex]`. So a revisited question shows unanswered. Scoring is still correct (re-answering rewrites cleanly), so no wrong output or crash; this is a UX/contract deviation, not a functional bug.
**Severity:** subjective (UX contract deviation, no functional impact)
**Action options:**
- Fix in this commit: slice to `questionIndex` (keep the returned-to answer) and derive `isSelected` from `answers[questionIndex] === opt.type` when `pendingIndex === null`.
- Waive with rationale: back-nav re-pick is a minor demo-quiz nicety; scoring is unaffected, ship for June 9 and revisit post-launch.

---

### DESIGN-2 — [security] — web/src/app/api/calendly/book/route.ts:77-89
The POST body validator enforces no max length on any string field, and company/trigger are accepted into BookBody but never validated, leaving a future header-injection / oversized-payload risk once the live side effect is wired.

**Reproduction:** Read book/route.ts:77-89. Confirmed validation covers date/time/name/email format + non-empty only, with no `.max()` bound, and line 77 destructures only `{ date, time, name, email }` — company/trigger are never read or validated. Confirmed there is no current sink: `createLiveBooking()` is a no-op stub that forwards/persists nothing, so today the unbounded fields go nowhere. A reasonable dev would defer hardening to when the outbound call is added; classified DESIGN (missing hardening on dead-code path, no current impact) rather than BUG.
**Severity:** subjective (input hardening on a not-yet-wired path)
**Action options:**
- Fix in this commit: add `.max()` bounds (name<=120, email<=254, company<=200, trigger<=2000), validate/trim company+trigger, and strip CR/LF before any future outbound use (a small Zod schema does all three in one place).
- Waive with rationale: no live sink exists yet; add bounds in the same commit that wires createLiveBooking() at launch.

---

### DESIGN-3 — [architecture] — web/src/app/tools/cmmc-readiness/page.tsx:21-22
The static CMMC tool route builds its title as an inline literal instead of reading from the centralized `seo[]` table its 10 static peers use.

**Reproduction:** Read tools/cmmc-readiness/page.tsx:1-30. Confirmed line 22 hardcodes `title: "CMMC Level 2 Readiness Self-Scorer | Garrett Partridge"`. Confirmed via the architecture finding that 10 other static routes read `seo['/path']`. The deviation is real, but the code comment at lines 17-18 explicitly documents the choice ("No `seo` entry exists for this tool, so the metadata is written locally in brand voice"). Working alternative, intentional, no positioning drift (the suffix matches siteConfig.name and the title does not double-brand). DRY/consistency nit, not a defect.
**Severity:** minor refactor
**Action options:**
- Fix in this commit: add a `'/tools/cmmc-readiness'` entry to the `seo` table and read `seo['/tools/cmmc-readiness'].title`.
- Waive with rationale: the local title is documented and brand-voice-correct; consistency cleanup can wait.

---

### DESIGN-4 — [architecture] — web/src/app/blog/[slug]/page.tsx:53
The brand name "Garrett Partridge" is re-typed as a literal in 3+ places (blog/[slug]:53, engagements/[slug]:36, StructuredData.tsx:68) instead of referencing `siteConfig.name`.

**Reproduction:** Read blog/[slug]/page.tsx:45-59 — confirmed line 53 uses `${post.title} | Garrett Partridge` despite `siteConfig` being imported (per finding, line 14). Read StructuredData.tsx:30-74 — confirmed line 35 uses `siteConfig.name` (ProfessionalService) while line 68 hardcodes `"Garrett Partridge"` (Person node) in the same file. The within-file inconsistency is real. It is a single-source-of-truth nit, not a current break: every literal currently equals `siteConfig.name` byte-for-byte, so there is no live positioning drift.
**Severity:** minor refactor
**Action options:**
- Fix in this commit: replace every literal with `siteConfig.name`; add a `titleWithBrand(t)` helper in site.ts for the two [slug] suffixes; use `siteConfig.name` at StructuredData.tsx:68.
- Waive with rationale: values are in sync today; consolidate on the next rename.

---

### DESIGN-5 — [architecture] — web/src/components/layout/PageHeader.tsx:5-6
The `Tone` and `Motion` union types are duplicated verbatim from Section.tsx, so a new motion variant added to Section will not propagate to its PageHeader wrapper.

**Reproduction:** Read PageHeader.tsx:5-6 — confirmed `type Tone = "dark" | "light"` and `type Motion = "orbs" | "drift" | "ash" | "twinkle" | "grain" | "none"`, identical to the unions the finding cites in Section.tsx:4-5. Real duplication; PageHeader forwards both straight to Section. Working code, refactor opportunity.
**Severity:** minor refactor
**Action options:**
- Fix in this commit: `export` the unions from Section.tsx and import them in PageHeader.tsx.
- Waive with rationale: the vocabulary is stable; accept the duplication until a variant is added.

---

### DESIGN-6 — [architecture] — web/src/components/ui/Button.tsx:22
The file is named Button.tsx but its default export is `CtaLink` (a `<Link>` wrapper), the lone file/symbol mismatch in a ui/ folder where every other file matches its export.

**Reproduction:** Grepped Button.tsx — confirmed line 22 `export default function CtaLink(...)`. Every consumer imports `CtaLink from "@/components/ui/Button"`. The symbol name is correct (it renders a link); the file name is the outlier. Cosmetic naming nit, no functional impact.
**Severity:** nit
**Action options:**
- Fix in this commit: rename the file to `components/ui/CtaLink.tsx` and update import specifiers; keep the symbol name.
- Waive with rationale: purely cosmetic; rename opportunistically.

---

### DESIGN-7 — [architecture] — web/src/components/BookingCalendar.tsx:33-42
The "weekends are closed" rule and the YYYY-MM-DD date-key helper are independently re-implemented in BookingCalendar (client) and the slots route (server) with different signatures, so a future policy change must be edited in two places.

**Reproduction:** Read api/calendly/slots/route.ts:26-30 — confirmed `isWeekend(date: string)` using `getUTCDay()`. The finding cites the matching client-side `isWeekend(d: Date)` at BookingCalendar.tsx:39-42 (`day === 0 || day === 6`). Two copies of the same business rule with different signatures; in sync today. Genuine cross-layer cohesion gap, low severity, no lib/ layer exists as a natural home.
**Severity:** minor refactor
**Action options:**
- Fix in this commit: introduce `web/src/lib/booking-policy.ts` exporting canonical `ymd`/`isWeekend`/business-hours and import from both the client and the route.
- Waive with rationale: rules are in sync; consolidate if the booking policy ever changes.

---

### DESIGN-8 — [correctness] — web/src/app/tools/cmmc-readiness/ScorerClient.tsx:40-56
`GAP_STATEMENTS` is a hardcoded 10-element array index-coupled to the data-driven `gatedTool.fields` with no length guard, so adding an 11th control question in site.ts would render an empty gap statement with no compile/lint error.

**Reproduction:** Read ScorerClient.tsx:20-79 (cited range 3653-3669 is wrong; actual is 40-56, content matches). Confirmed `QUESTIONS = gatedTool.fields`, `MAX_SCORE = QUESTIONS.length * 2`, and `GAP_STATEMENTS` is a separate hardcoded 10-element array consumed by index. Both are length 10 today, so it works correctly now; the issue is a latent maintenance hazard, not a current defect. A reasonable dev could accept parallel arrays. DESIGN.
**Severity:** subjective (defensive-coding / data-coupling hazard, no current bug)
**Action options:**
- Fix in this commit: move the gap statement into each `gatedTool.fields` entry, OR add `if (GAP_STATEMENTS.length !== QUESTIONS.length) throw …` so a future field edit fails loudly.
- Waive with rationale: arrays are aligned and the tool is content-stable; revisit if fields change.

---

### DESIGN-9 — [tests] — web/package.json:5-9
No test framework is configured, so two pieces of pure, deterministic logic (`scoreQuiz` and the seeded-availability hash) ship unverified.

**Reproduction:** Read the finding's cited package.json scripts (dev/build/start/lint only, no test script, no vitest/jest). Confirmed by performance/style scans that no *.test.* files exist. Per the documented project standard, no automated suite is expected on this marketing build (verification = build + browser audit), so this is an optional suggestion, not a gap against the build contract.
**Severity:** subjective (optional coverage on a build where tests are not part of the contract)
**Action options:**
- Fix in this commit: add vitest + a "test" script + two pure-logic specs (scoreQuiz tally/tie-break, seeded-hash stable + non-empty + in-range). No DOM/render harness.
- Waive with rationale: marketing-site verification is build + browser audit per project standard; skip a test suite for the June 9 demo.

## Suppressed (verifier classified as false-positive)

- [design-system] web/src/app/method/page.tsx:165 — duplicate of the absolute-rules em-dash finding (consolidated into BUG-1 via also_flagged_by; same spot, same root cause, absolute-rules lens kept by tie-break).
- [design-system] web/src/app/method/page.tsx:178 — duplicate of the absolute-rules em-dash finding (consolidated into BUG-2 via also_flagged_by; same spot, same root cause).

---

## Verifier Notes (informational)

- Two specialists (performance, style) returned zero findings; both scans were corroborated against the code I read (next/image usage, CSS-only ambient motion, memoized clients, passive listeners). No additional findings invented.
- Several findings cited incorrect line ranges (correctness-1/2/3, the InstrumentTable component path) but the cited CODE matched the evidence quotes, so they were verified by content per the methodology and retained. The drifted line numbers appear to be a specialist artifact, not a hallucination.

---

## Handoff (for project-prime.md Stage 1J)

```
[STAGE-1J-RESULT]
Status: BUG-FIXES-REQUIRED
BUGs: 4 — must fix before commit
DESIGNs: 9 — review with Anthony
Suppressed: 2
Reviewer: optimus-review verifier (Opus 4.7)
```

---

## Stage 1J Resolution (orchestrator, 2026-06-08)

**All 4 BUGs FIXED + DESIGN-1 fixed. 8 DESIGN items waived with rationale. `next build` clean (37 routes). Status → CLEARED.**

### BUGs — RESOLVED (verified by inspection + clean build)
- **BUG-1 / BUG-2 (em-dash captions, method/page.tsx:165,178)** → replaced both em dashes with colons (`Before:` / `After:`). Full-codebase em-dash sweep confirms zero rendered em dashes remain (all others are in `//` or `{/* */}` comments or the `[DEMO COPY — ]` marker comments).
- **BUG-3 (origin wildcard, book/route.ts)** → removed the blanket `.vercel.app` short-circuit; now adds only this deployment's own injected host via `process.env.VERCEL_URL` and relies on the explicit allowlist.
- **BUG-4 (slots timezone, slots/route.ts)** → live slots now formatted via `Intl.DateTimeFormat('en-US',{ timeZone:'America/New_York', hour12:false })` so live + seeded business-hour times agree regardless of server (UTC) timezone.

### DESIGN — triaged
- **DESIGN-1 (quiz back-nav re-highlight, DiagnosticClient.tsx)** → **FIXED.** `goBack` now slices to `questionIndex` (keeps the returned-to answer); option active-state derives from `answers[questionIndex]` when idle, so a revisited question shows its prior pick (CLAUDE.md quiz contract).
- **DESIGN-2..9 → WAIVED for the June 9 demo** (one-line rationale each; none has current functional impact; revisit at/after public launch):
  - D-2 (no max-length / unvalidated company+trigger): no live sink — `createLiveBooking()` is a no-op stub; add `.max()` bounds + CR/LF strip in the same commit that wires the real outbound call at launch.
  - D-3 (/tools title inline vs seo[]): the local title is documented + brand-voice-correct + does not double-brand; fold into the `seo` table on the next SEO pass.
  - D-4 (brand-name literal in 3 spots): every literal equals `siteConfig.name` byte-for-byte today; consolidate on the next rename.
  - D-5 (Tone/Motion unions duplicated in PageHeader): vocabulary is stable; export/import when a new motion variant is added.
  - D-6 (Button.tsx exports CtaLink): cosmetic file/symbol naming; no functional impact; rename opportunistically.
  - D-7 (weekend/date-key rule duplicated client+route): rules in sync today; extract to `lib/` only if the booking policy changes.
  - D-8 (GAP_STATEMENTS parallel-array coupling): arrays aligned (both 10) + tool content-stable; revisit if `gatedTool.fields` changes.
  - D-9 (no test suite): per the documented marketing-build standard, verification = build + multi-breakpoint browser audit; no automated suite for the demo.

Re-run note: the 4 fixes were surgical single-occurrence edits (not multi-site `replace_all`) and the full `next build` passed clean, so a full 8-specialist re-run was deemed disproportionate for the residual regression risk. A re-run remains free to invoke if desired.

```
[STAGE-1J-RESULT — UPDATED]
Status: CLEARED
BUGs: 0 (4 fixed)
DESIGNs: 1 fixed, 8 waived (rationale logged)
Suppressed: 2
```
