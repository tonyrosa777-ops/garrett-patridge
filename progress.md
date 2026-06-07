# progress.md — Garrett Partridge Website Build

**Project:** garrettpartridge.com — new website build
**Client:** Garrett Partridge | Brookline, NH (serving Greater Boston & Southern NH)
**Business Type:** Fractional COO / operations architect for the New England defense industrial base
**Launch Target:** June 9, 2026 DEMO (3:00 PM) | production launch TBD
**Last Updated:** 2026-06-07 (Session 2)
**Current Phase:** Phase 1 — Stage 1E ALL PAGES DONE (35 routes, `next build` clean); next = Stage 1F SEO/AEO (sitemap, robots, StructuredData, JSON-LD)

---

## Phase Overview

| Phase | Name | Status |
|-------|------|--------|
| 0 | Project Initialization | ✅ Done |
| 1 | Research + Design System (Stage 1A scan, 1B design-synthesizer) | ✅ Done |
| 2 | Scaffold (Stage 1C) | ✅ Done (bdb74f4) |
| 3 | Content + Animation / Hero (Stage 1D) | ✅ Done (hero + site.ts + quiz.ts) |
| 4 | All Pages — core + blog + booking (Stage 1E) | ✅ Done (35 routes build clean) |
| 5 | SEO + AEO + GEO (Stage 1F) | 🔄 Next |
| 6 | Assets — hero + blog images (Stage 1G) | ⬜ Not Started |
| 7 | Prospect-Journey Conversion Audit (Stage 1G.5) | ⬜ Not Started |
| 8 | Pre-Launch Audit — file-level (Stage 1H) | ⬜ Not Started |
| 9 | Multi-Breakpoint Browser Audit (Stage 1I) | ⬜ Not Started |
| 10 | /optimus-review code-review gate (Stage 1J) | ⬜ Not Started |
| 11 | Launch + Client Revision + Close (Phase 2) | ⬜ Not Started |

> **NOTE — no Shop phase.** The standard "shop scaffold + decision gate" stage is removed
> for this project per Anthony's 2026-06-07 directive (see Build-Scope Decisions below).

---

## Build-Scope Decisions (durable — read before every session)

- **NO SHOP (Anthony, 2026-06-07).** A branded-merch shop does not fit a fractional-COO
  authority brand. Skip the scaffold entirely — do NOT create `cart.tsx`, `CartDrawer.tsx`,
  `printful*`, `stripe*`, `/shop`, or any shop API route. No nav link, no sitemap entry, no
  homepage shop teaser. This overrides the Always-Built Features "shop is always scaffolded"
  rule for this build only. **WHY:** product fit — Garrett sells $35k–$135k operational
  engagements, not merch; capacity is better spent on content authority.
- **EXPANDED BLOG = primary distribution engine (Anthony, 2026-06-07).** Build the full
  market-intelligence.md §6 nine-article AEO slate (not just the 3 demo articles) PLUS extra
  articles to deepen SEO/AEO/GEO coverage. The capacity freed by skipping the shop is
  reinvested here. **WHY:** market-intel §1 verdict — this is an AEO-first education hub, not a
  lead-gen site; Garrett's own buyers (and Garrett himself) hire by finding the cited answer.
- **Positioning override to resolve at Stage 1B:** research mandates "no public pricing, no
  'book a free call,' waitlist/scarcity framing." The booking CTA stays (custom BookingCalendar)
  but is reframed *"Request a Strategic Conversation"* with the real 4-engagement capacity
  constraint as the mechanism. design-synthesizer must thread this deliberately.
- **Palette override:** dark instrument-grade (gunmetal `#0E1116` + restrained machined brass
  `#B8864B`), per market-intel §5 — fully psychology-justified there. NOT the warm-gold default.
  Garrett floated "red as an executive cue" — per memory `dark-page-headers-not-red`, red may
  appear ONLY as a muted oxblood status accent (`#B0524A`), never a saturated red panel.
- **Spelling:** surname is **Partridge** (per domain/email), NOT "Patridge" (the folder typo).

---

## Session Log

> **Checkpoint schema (anchored — context-engineering).** Each session entry uses fixed slots so
> a checkpoint survives a context reset. Summarize only what is NEW this session and APPEND a new
> entry — never rewrite prior entries.

### Session 1 — 2026-06-07
**Intent:** Run /new-client + /prime to take the project from filled research → scaffolded, ready-to-build foundation.
**Completed:**
- Phase 0 (/new-client) verified: all 6 toolkit files present; `initial-business-data.md` (8/8 sections) and `market-intelligence.md` (9/9 sections) confirmed fully filled from the brochure + May 25 discovery call. Phases 1–3 of /new-client already complete.
- Phase 4: filled all 10 variables, saved `.claude/commands/prime.md` (UTF-8 clean, 0 leftover tokens). `/prime` skill registered for this project.
- Task 0A: filled CLAUDE.md's 10 variables + recorded the no-shop / expanded-blog override in its header.
- Task 0B: this file created.
**Files touched:** `.claude/commands/prime.md` (full filled orchestrator), `CLAUDE.md` (header variables + build-scope override block), `progress.md` (created).
**Decisions Made:**
- No shop / expanded blog (see Build-Scope Decisions — Anthony directive mid-session).
- Dark instrument-grade palette + AEO-first positioning carried as Stage 1B inputs.
**Discovered:** Original `project-prime.md` is UTF-8 with 103 `→` arrows; a default PowerShell `Get-Content` read corrupts them — must read/write via `[System.IO.File]` UTF-8, no BOM. Recorded so future variable-fills don't re-introduce mojibake.
**Current State:** CLAUDE.md filled, prime.md saved, progress.md created. No scaffold yet. No git repo yet.
**Next Session Starts At:** Task 0D debrief → Phase 1 Stage 1A repo scan → Stage 1B design-synthesizer (hits the design-system.md human checkpoint).
**Blockers:** None blocking the demo build. Tuesday-ask list (case-study number, certs, headshot, scheduling platform, entity name, LinkedIn URL, DNS) all covered by the [DEMO COPY] standard.

---

### Session 1 — continued (Phase 1 Stage 1A + 1B)
**Stage 1A — repo scan (Explore agent):** Complete. Closest pattern stack = **Placed-Right-Fence** (web/src) — ForgeCanvas hero engine, breathing-orb dark backgrounds, WordReveal stagger, Sanity blog index/post, SiteHeader nav-with-dropdown (drop the cart icon). Gray-Method-Training = quiz flow (`app/quiz/QuizClient.tsx`). Reuse-as-is structures; adapt colors to #0E1116/#B8864B. Findings routed to animation-specialist + frontend build.
**Stage 1B — design-synthesizer (general-purpose agent):** Complete. `design-system.md` written — all 12 sections, 9+ palette tokens valued, Section 11 matrix complete (Shop=No, Blog=expanded primary engine, Diagnostic quiz, custom BookingCalendar, 3 niche landings, Pricing=internal/deleted-pre-launch), Section 12 = 8 subsections + 14-row cited mechanism map + 10-point auditor checklist.
**Decisions Made (Stage 1B):**
- **Hero = Architecture B (movie header)** — full-bleed cinematic loop of a real machine-shop/CNC floor (Higgsfield), NOT drones/missiles. Architecture A (machined-brass particle stack) is the documented fallback if B can't clear the motion-readability gate. NOTE: repo-scan agent leaned Architecture A (adapt ForgeCanvas); design-synthesizer chose B per the Hero Architecture Rule default (real photographable subject). **Carry both into Stage 1D; B requires the pre-generation credit gate (≥3 stills + camera move + human approval).**
- Single dark theme; "light" bands = gunmetal `--bg-elevated #161B22` (cool-slate, never white/bone). Red only as `--status-blocked #B0524A` oxblood status token.
- 3 "service-area" pages reframed as audience-segment niche landings (DIB manufacturer / foreign onshoring / PE diligence), each loss-framed.
**Current State:** design-system.md done; awaiting the two Stage 1B gates (Absolute-Rule Cross-Check + Premortem Plan Gate) then the human approval checkpoint. No scaffold yet.
**Next Session Starts At:** Run Absolute-Rule Cross-Check + Premortem Plan Gate → present to Anthony for design approval → Stage 1C scaffold.
**Open flag for human:** confirm Garrett is on board with the full dark gunmetal+brass pivot away from his inherited navy-on-white one-pager (design-synthesizer logged this [CONFLICT], resolved toward research; client said "now would be the time" to evolve).

---

### Session 1 — continued (Stage 1B gates + hero lock)
**Absolute-Rule Cross-Check:** PASS (all 19 rules; ran the full index `00 — Empire Index/absolute-rules-index.md`). One authorized override logged: §8 Always-Built shop = removed per Anthony directive (not a drift violation — owner decision; blog expanded to compensate). Timestamp 2026-06-07.
**Premortem Plan Gate:** PASS — fresh critic surfaced 5 failure modes; 5 patches applied to design-system.md ("Premortem Plan-Gate Patches" block before §12). Summary:
- R1 FATAL: fabricated trust signals read as fake to this inspecting buyer → trust layer is now `[LAUNCH-BLOCKER]` REAL-or-EMPTY for the PUBLIC site (demo may use [DEMO COPY]).
- R2 FATAL: empty AEO hub has no fast conversion path → lead with the FOCI/onshoring white-space article + a forwardable gated tool (DFARS checklist / CMMC self-scorer).
- R3: waitlist repels urgent buyers → add paid 2-hr Strategic Consult ($1.5–2.5k) as always-available lower CTA rung.
- R5: dark pivot needs buy-in → demo-day side-by-side navy-vs-gunmetal board + defensibility script first.
**Hero decision — LOCKED Architecture B (Anthony directive 2026-06-07):** 3-clip stitched movie header (Pattern #87 / 603-collectibles reference / optimus-higgsfield-hero-video skill). Resolves the A-vs-B fork toward B. Clips: (1) night precision machine shop, CNC mills receding right, dark-left negative space; (2) CNC cutting metal, brass chips + coolant mist; (3) macro machined brass aerospace part on dark fixture. Subject pushed RIGHT, dark LEFT third + CSS left-edge gradient (black 0%→transparent 45%) for guaranteed H1/CTA legibility. Motion: slow steady push-in + ambient (haze / chips+mist / shimmer), already mid-push at cut-in; brass-hairline L→R wipe + 800ms crossfade between clips; loop 3→1 through black. Motion-readability risk (Goddu frozen-photo failure) mitigated by the explicit continuous-push-in spec.
**Current State:** design-system.md patched + hero locked. Awaiting human design approval (surfaced to Anthony with the 2 fatal premortem findings). Hero pipeline starting: generate 3 candidate stills (free, Higgsfield Flux/Nano Banana) for the pre-gen approval gate BEFORE any video credit spend.
**Next Session Starts At:** present 3 hero stills for approval → on approval, animate via Seedance/Cinema Studio (credit gate) → stitch → encode → meanwhile Stage 1C scaffold.
**Blockers:** Human design approval + hero-stills approval are the active gates.

---

### Session 1 — continued (HERO MOVIE HEADER built — Architecture B, Mode B 3-clip)
**Completed:** Full hero movie-header pipeline executed end-to-end via Higgsfield MCP.
- **Stills (3):** `flux_2`, 16:9, 1280×720, 0 cr (unlimited). Visual-reviewed PASS — all composition right-weighted, dark left third for H1/CTA. Saved `.hero-stills/frame{1,2,3}-*.png`. Job IDs 2ef855db / 70ec4dcb / 13a3d998.
- **Video (3 clips):** `seedance_2_0` image-to-video, 8s, 720p std, start_image = each still. **36 cr/clip × 3 = 108 cr** (balance 435 → ~327). Anthony approved the >50cr gate. Jobs 8e82ea25 / 55ee616f / 1c5ed204. Frame-reviewed (0s/4s/7s) PASS — strong readable push-in on all 3 (no Goddu frozen-photo failure), composition holds, no warping/people/garbled-text. "HAAS" + caliper scale are real-world legible, not AI gibberish.
- **Stitch+encode (ffmpeg 8.1):** trimmed each 8s→first 4s (Anthony's tighter-loop call — free, no re-gen), smooth L→R wipe + 0.8s crossfade between clips, fade-through-black at the 3→1 loop seam. Master loop **10.4s**. Web encodes in `.hero-stills/video/out/`: `hero-loop.mp4` (1.1MB, H.264 crf28 faststart), `hero-loop.webm` (2.0MB VP9 — heavier than mp4 due to chip/grain detail, TUNE crf down later), `hero-poster.webp` (69KB). Transition frames verified clean.
**Decisions Made:**
- Loop length controlled at STITCH (trim 8s→4s), not generation — free way to retune hero loop length without re-spending video credits. (Reusable; capture at /retro.)
- Seedance i2v 720p std = 36cr/clip (heavier than the pattern's Cinema Studio ~25-45 single-clip estimate); Mode B 3-clip ≈ 108cr.
**Current State:** Hero asset COMPLETE, sitting in `.hero-stills/video/out/`. To be moved to `/public/videos/` + `/public/images/` at scaffold (Stage 1C) and wired into Hero.tsx per Pattern #80 template (full-bleed `<video>` + left-edge gradient + Framer stagger H1/CTAs). No git repo / no scaffold yet.
**Next Session Starts At:** Confirm design direction + the 2 fatal-premortem decisions with Anthony → Stage 1C scaffold (create-next-app + design tokens + move hero assets in) → Stage 1D wire Hero.tsx + content-writer/animation-specialist sweep.
**Credits:** Higgsfield Plus, 435 → ~327 (108 spent on hero video; stills free).
**Blockers:** Design-direction green-light (incl. trust-layer real-or-empty decision + dark-pivot buy-in) before the full page sweep.

---

### Session 1 — continued (Stage 1C SCAFFOLD — committed bdb74f4)
**Intent:** Anthony approved hero + direction ("build it"). Scaffold the app and verify it runs.
**Completed:**
- `create-next-app` → **Next.js 16.2.7 + React 19.2.4 + Tailwind v4** in `web/`. Deps: framer-motion, react-intersection-observer, react-hook-form, zod, react-markdown, remark-gfm (NO @fal-ai/client — retired; NO Sanity — file-based blog chosen for demo reliability + deadline; NO shop deps).
- **Git restructured to project ROOT** (removed web/.git) so toolkit docs + app + hero assets are ONE repo. Identity set (Anthony Rosa / anthonyrosa14@icloud.com). Root `.gitignore` (node_modules, .next, .env*.local, .hero-stills/, web/audits/).
- Hero assets moved into `web/public/videos/` (hero-loop.mp4 1.1MB + .webm) + `web/public/images/` (hero-poster.webp + 3 source stills).
- `web/NEXT16-NOTES.md` written — binding agent brief on Next 16 breaking changes (async `params`/`searchParams`, `PageProps<'/route'>`/`RouteContext<'/route'>` global helpers, route handlers uncached-by-default, async `headers()`/`cookies()`, `"use client"` for framer/hooks, Tailwind v4 @theme). **Every page/route agent MUST read this first.**
- `globals.css`: full gunmetal+brass token set (§2), spacing + clamp type scale (§3/§4), `.hero-shimmer-brass`, `.eyebrow`, hairline, breathing-orb keyframes, reduced-motion degradation.
- `layout.tsx`: IBM Plex Sans/Mono/Serif + Inter via next/font, metadataBase + OG from site.ts.
- `Hero.tsx`: **Architecture B full-bleed movie header wired + LIVE** — video (webm+mp4) + reduced-motion poster `<img>` + dual-axis dark-left gradient + framer stagger (eyebrow → H1 brass-shimmer → subhead → 2 CTAs → microcopy). Reads from siteConfig.
- `site.ts`: SKELETON (siteConfig: name/url/positioning/hero/nav/CTAs, [DEMO COPY]). content-writer expands.
- `page.tsx`: renders Hero + a "build in progress" band. **`npm run build` PASSES clean** (TS clean, static gen OK).
**Files touched:** web/ (full scaffold), web/src/app/{globals.css,layout.tsx,page.tsx}, web/src/components/Hero.tsx, web/src/data/site.ts, web/NEXT16-NOTES.md, web/.env.local (gitignored), .gitignore, web/public/{videos,images}.
**Decisions Made:**
- **Blog = file-based, not Sanity**, for this build (deadline + demo reliability + no external project dependency; can migrate to Sanity post-sale if Garrett wants self-editing). Logged as a deviation from the template's Sanity default — defensible per no-web-boilerplate + senior-engineer call.
- **Next 16 is past training data** → captured gotchas in NEXT16-NOTES.md so agents don't ship Next-14-shaped code.
- One repo at project root (not web/) so plan + implementation commit together (Plan Preservation Rule).
**Current State:** Scaffold LIVE + committed + build-verified. Hero wired and renders. No remote yet (no GitHub repo) → couldn't push; add remote at infra/launch and push (memory: always-push, deferred only by missing remote).
**Next Session Starts At (Stage 1D/1E sweep — delegate per Subagent Delegation Rule, each agent reads NEXT16-NOTES.md):**
  1. content-writer → expand `site.ts` (services/engagement models, 36-slot testimonials REAL-or-EMPTY per premortem, FAQ, quiz/diagnostic data, niche-landing copy, blog article bodies for the expanded AEO slate led by FOCI/onshoring + gated tool).
  2. Then Stage 1E pages in parallel waves: Nav+Footer → homepage sections (rhythm map §4) → about/method/engagements/contact/faq/testimonials → 3 niche landings → /diagnostic quiz → custom BookingCalendar (+ /api/calendly/* route handlers, demo-seeded) → /pricing (internal) → expanded /blog (file-based) — each wired to nav + sitemap in-commit.
  3. Stage 1F SEO/AEO (+ StructuredData Person+Organization sameAs). 1G blog images (Higgsfield Flux 2, ≤4/batch). 1G.5 prospect-journey audit. 1H pre-launch. 1I browser audit. 1J optimus-review.
**Blockers:** None blocking. Tuesday-ask list unchanged.

---

### Session 2 — 2026-06-07 (Stage 1D content foundation)
**Intent:** Resume build via /prime; write the content data layer (gating dependency for all Stage 1E pages).
**Completed:**
- Spawned `content-writer` (general-purpose) with a project-specific override brief (no shop, engagements-not-services, NO email-gate diagnostic, two-tier capacity ladder, 3 loss-framed niche landings, trust-layer DEMO-COPY-but-real-or-empty-ready, blog metadata-only for the expanded AEO slate).
- `web/src/data/site.ts` expanded: siteConfig, problem (instrument-readout fault rows), method (Standard Work 2.0 4 pillars), proof (honest-reduction stats), engagements (3, no price), diagnosticTeaser, capacity (full-engagement waitlist + paid 2-hr consult lower rung, no countdown), about (full structured story), faq (13 Q&A, AEO direct-answer), testimonials (36, DEMO COPY, B2B role-cited), featuredTestimonials [1,3,17,34], niches (3, loss-frame openers), gatedTool (CMMC Readiness Self-Scorer), blog (12 posts metadata, 3 flagship = onshoring/AS9100+CMMC/backlog-to-cash), footer, seo (14 routes).
- `web/src/data/quiz.ts` new: QuizType (4 archetypes), QUIZ_QUESTIONS (6), QUIZ_RESULTS (recognition + answer-restating body), `scoreQuiz` (pure, deterministic). No leadCapture/email gate.
**Files touched:** `web/src/data/site.ts` (all exports), `web/src/data/quiz.ts` (new), `progress.md`.
**Decisions Made:**
- Orchestrator-defined the exact site.ts/quiz.ts export contract in the spawn brief so Stage 1E component agents have a stable interface to read.
- Blog = metadata-only in site.ts; full article bodies are a later dedicated wave (token-bounded, ≤ a few articles per agent).
**Discovered / fixed in verification:** content-writer leaked the `[DEMO COPY — pending client review]` marker (em dash) INTO 6 rendered string values (proof.stats notes, about credentials, namedPrimes). Fixed: moved each marker to a trailing/preceding comment, stripping the em dash from rendered copy. Also caught 37 testimonials (one over the mandated 36 → orphan-row bug per Error #31/#63); removed the last one (featured indices [1,3,17,34] unaffected). Re-verified: 0 em dashes in any string literal, exactly 36 testimonials, `tsc --noEmit` clean.
**Current State:** Content data layer complete + typechecks clean. Hero already wired. Page components not built yet.
**Next Session Starts At:** Stage 1E foundation wave — shared layout primitives (Section/Container with radial-gradient + ambient-motion backgrounds, animation wrappers, Card, instrument-readout DataTable), SiteHeader nav (with ⬥ Pricing marker + Request-a-Strategic-Conversation CTA), global Footer, and the custom BookingCalendar (+ /api/calendly/* demo-seeded). THEN parallel page agents consuming that contract.
**Blockers:** None blocking the demo. Tuesday-ask hard-facts flagged in site.ts: real LinkedIn URL, registered entity name, USPTO serial, formal certifications, real case-study numbers/named primes (all [LAUNCH-BLOCKER] or [MISSING] for public launch; demo runs on DEMO COPY).

---

### Session 2 — continued (Stage 1E — full page sweep, all 35 routes build clean)
**Intent:** Build the entire Stage 1E page layer on top of the content data layer.
**Completed (4 delegated waves, each verified + atomically committed):**
- **Foundation (9449d12):** `components/animations/` (FadeUp/SlideIn/Stagger, triggerOnce per Error #24) + `components/ui/` (Container, **Section** = the radial-only/never-flat/never-white background + 6 ambient-motion enforcement point, Eyebrow, Button/CtaLink, Card, StatusRow, InstrumentTable) + globals.css ambient classes (amb-orbs/drift/ash/twinkle/grain/static + reduced-motion freeze).
- **Chrome + booking (446c1a5):** SiteHeader (fixed transparent-over-hero, scroll underline, opaque mobile drawer w/ all nav items incl. ⬥ Pricing + CTA + inner X — Error #38), Footer (dark bookend, conditional LinkedIn), **PageHeader** (interior-page nav clearance baked in — Error #40 forget-proof, used by every interior page), **BookingCalendar** (custom branded, self-sufficient surface Error #54, demo-seeded deterministic slots) + `/api/calendly/slots` + `/api/calendly/book` (Next16 handlers, origin-hardened Error #66). Wired into layout.tsx (no global main offset — hero stays full-bleed).
- **Pages wave 3a (b2a30cf):** homepage 8-band rhythm (D/L alternation ending light before dark footer; problem instrument-panel → method bento → proof stats → staggered engagements → diagnostic nudge → editorial blog preview → capacity + inline BookingCalendar), /about (proof-of-operating-role trust core, no headshot), /method (Standard Work 2.0 4 pillars + fault→cleared InstrumentTable), /engagements + 3 SSG detail routes (no pricing), /booking.
- **Pages wave 3b (ff7f515):** /diagnostic (full-page archetype self-diagnostic, auto-advance, NO email gate, result restates answers + inline BookingCalendar via scoreQuiz), /testimonials (36 DEMO-COPY, 3×3 grid 9/page×4, engagement-type filter), /faq (accessible accordion, AEO direct-answer-first), /contact (routes to booking, no maps, conditional LinkedIn).
- **Pages wave 3c (cd5b7cd):** /niches/[slug]×3 (loss-framed openers), /blog index + /blog/[slug]×12 (editorial AEO hub, direct-answer-first, **bodies deferred** — no fabricated bodies), /pricing (internal sales tool, fixed tiers $1.5k/$3k/$5.5k, ROI calc, comparison, noindex, no Google/deposit/shop), /tools/cmmc-readiness (forwardable self-scorer, no email gate, banded result).
**Files touched:** `web/src/components/{animations,ui,layout,home,pricing}/*`, `web/src/components/{Hero(existing),BookingCalendar}.tsx`, `web/src/app/{layout,page,globals.css}` + every route under `web/src/app/{about,method,engagements,booking,diagnostic,testimonials,faq,contact,niches,blog,pricing,tools,api/calendly}/`, `web/src/data/site.ts` (dead-route fix).
**Decisions Made:**
- Foundation built as ONE coherent agent (shared design vocabulary = consistency anchor) BEFORE parallelizing pages — dependency exception to the parallel rule.
- Nav clearance via a `PageHeader` component (Error #40 forget-proof) rather than a global `<main>` offset, so the full-bleed movie hero isn't banded.
- Blog article BODIES deferred to a dedicated later wave (token-bounded); post template renders the AEO direct-answer + a clearly-marked "briefing in preparation" callout, NOT fabricated bodies.
**Discovered / fixed:** dead-link bug — `gatedTool.slug` ("cmmc-readiness-scorer") + footer href pointed at a non-existent route; the real scorer is `/tools/cmmc-readiness`. Fixed slug + footer href (Page Wiring Rule). Caught + fixed 6 string-value em-dash leaks + a 37th testimonial in Stage 1D.
**Observations to carry into the Prospect-Journey audit (1G.5):** (a) testimonials contain a 4th engagementType "Full-Time Leadership" (indices 4,16) that isn't one of the 3 named engagements — defensible (Garrett's history) but the /testimonials filter shows a 4th chip; review. (b) Nav intentionally excludes /testimonials, /faq, /contact, /niches, /tools (reachable via footer/links) — Stage 1F sitemap.ts MUST list every route per Page Wiring Rule.
**Current State:** ALL Stage 1E pages built. `npm run build` clean: 35 routes (static + SSG + 2 dynamic API). Hero movie header live. No remote yet (no GitHub repo) → still unpushed (Always-Push deferred only by missing remote; add remote at infra/launch).
**Next Session Starts At:** Stage 1F SEO/AEO — `sitemap.ts` (ALL routes, /pricing noindex), `robots.ts`, `StructuredData.tsx` (Person + ProfessionalService + Service JSON-LD with sameAs — Pattern #100, the personal-brand entity graph), Article + FAQPage JSON-LD, opengraph-image. THEN 1G blog card+header images (Higgsfield Flux 2, ≤4/batch) + blog article BODIES wave. THEN 1G.5 prospect-journey audit → 1H file audit → 1I multi-breakpoint browser audit (mandatory pre-ship, needs fresh context) → 1J /optimus-review.
**Blockers:** None blocking the demo. Tuesday-ask hard-facts unchanged.
