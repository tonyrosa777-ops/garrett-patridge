# progress.md — Garrett Partridge Website Build

**Project:** garrettpartridge.com — new website build
**Client:** Garrett Partridge | Brookline, NH (serving Greater Boston & Southern NH)
**Business Type:** Fractional COO / operations architect for the New England defense industrial base
**Launch Target:** June 9, 2026 DEMO (3:00 PM) | production launch TBD
**Last Updated:** 2026-06-07
**Current Phase:** Phase 0 — Initialization (Task 0D / debrief)

---

## Phase Overview

| Phase | Name | Status |
|-------|------|--------|
| 0 | Project Initialization | 🔄 In Progress |
| 1 | Research + Design System (Stage 1A scan, 1B design-synthesizer) | ⬜ Not Started |
| 2 | Scaffold (Stage 1C) | ⬜ Not Started |
| 3 | Content + Animation / Hero (Stage 1D) | ⬜ Not Started |
| 4 | All Pages — core + blog + booking (Stage 1E) | ⬜ Not Started |
| 5 | SEO + AEO + GEO (Stage 1F) | ⬜ Not Started |
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
