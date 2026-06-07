# CLAUDE.md — Garrett Partridge Project Rules
#
# VARIABLES (filled by /prime 2026-06-07 — agents read these values here):
#   BUSINESS_NAME     = Garrett Partridge
#   DOMAIN            = garrettpartridge.com
#   BUSINESS_TYPE     = fractional COO and operations architect for defense-industrial-base manufacturers
#   LOCATION          = Brookline, NH (serving Greater Boston & Southern NH)
#   LAUNCH_TARGET     = June 9, 2026 demo (production launch TBD)
#   PRIMARY_AUDIENCE  = owner/founder/GM of small-to-mid-size New England defense industrial base manufacturers
#   CORE_OFFER        = fractional COO engagements, 30-day operational triage, and strategic consultancy installing Standard Work 2.0™
#   KEY_GOAL          = establish Garrett as New England's defense-manufacturing operations authority and convert trust into waitlisted strategic conversations
#   BOOKING_ENGINE    = Calendly
#   SCHEMA_TYPE       = ProfessionalService (+ Person node)
#
# PROJECT-SPECIFIC BUILD-SCOPE OVERRIDES (Anthony, 2026-06-07):
#   • NO SHOP — not scaffolded, not built, not in nav/sitemap. A branded-merch shop does
#     not fit a fractional-COO authority brand. This overrides the Always-Built "shop scaffold
#     + decision gate" rule for this project. Do not create cart/CartDrawer/printful/stripe files.
#   • EXPANDED BLOG — the blog is this site's primary distribution engine. Build the full
#     market-intelligence.md §6 9-article AEO slate (not just the 3 demo articles) PLUS extra
#     articles to deepen SEO/AEO/GEO authority coverage. The capacity saved by skipping the
#     shop is reinvested into blog depth.

## Plan Mode Rule
Before writing ANY code — before touching a single file — enter Plan Mode.
Use EnterPlanMode and present a full build plan: what will be built, what files will
be created or modified, what design tokens will be used, what data will flow where.
Get alignment on the plan before the first keystroke. This is non-negotiable.

A wrong plan costs 5 minutes. A wrong build costs 5 hours.

## Plan Premortem Gate Rule
The Plan Mode Rule prices the wrong plan; this rule catches it. **Never approve a build plan by asking yourself (or an agent) "is this plan good?"** — LLMs are RLHF-trained to be agreeable, so that question returns *validation, not analysis* (documented sycophancy). Instead, run a **premortem** on the approved design-system.md + positioning + copy direction before the build sweep: stipulate that the finished site has *already failed* at launch+90 (client unhappy / no leads / audience bounced) and reason backward to why — grouped by Conversion, Audience-fit, Credibility & taste, Positioning, and Technical. The conditional→past-tense framing flips the model from cheerleader to critic and (per prospective-hindsight research) surfaces ~30% more real failure modes.

This runs at the **design-system.md human checkpoint** (project-prime Stage 1B / build-checklist step 10), immediately after the Absolute-Rule Cross-Check — the two are complementary: the cross-check catches *rule* violations, the premortem catches *strategic* failure a rule-legal plan can still have. Every high-likelihood × high-cost failure mode it surfaces gets **patched into the plan now** (Fix-on-Sight Rule — logging it as "watch for this during build" is theater). Prefer a fresh critic agent over orchestrator self-review (less anchored to the plan). If the output feels affirming, the model slipped back to validation — re-run with a harder failure framing. Scale intensity to stakes: full premortem on the plan; a one-line version ("assume this failed — why?") on any consequential mid-build decision where you catch yourself asking an agent "does this look good?"

Full prompt + protocol: [knowledge/patterns/premortem-plan-gate.md](knowledge/patterns/premortem-plan-gate.md) (Pattern #101). Concept: `Optimus Academy/concepts/premortem.md`.

## Plan Preservation Rule
Every plan that reaches approval and execution MUST be saved to the vault folder or project folder most relevant to what it changes, BEFORE execution begins. The auto-generated plan at `C:\Users\Anthony\.claude\plans\` is Claude Code's working memory — NOT a substitute for this vault-saved copy.

**Where to save (route by primary impact):**
- Plans touching AI capture or Optimus Academy → `C:\Projects\Second Brain\Wealth\Optimus\Optimus Academy\tools\<plan-name>.md`
- Plans touching upsell architecture or AI agents → `C:\Projects\Second Brain\Wealth\Optimus\Offerings\02 AI Agents\<plan-name>.md`
- Plans touching the agent system or CLAUDE.md globally → `C:\Projects\Second Brain\Wealth\Optimus\<plan-name>.md`
- Plans touching founder vision → `C:\Projects\Second Brain\Wealth\anthony-rosa\plans\<plan-name>.md`
- Plans touching a specific client website build → `C:\Projects\<client-folder>\.claude\plans\<plan-name>.md` (e.g., `C:\Projects\Placed-Right-Fence\.claude\plans\shop-stripe-printful-integration.md`)
- Plans touching multiple client projects or Optimus operations globally → `C:\Projects\Second Brain\Wealth\Optimus\<plan-name>.md`

**Naming convention: kebab-case, descriptive of value delivered, not process.**
- Good: `capture-pipeline-tiktok-whisper.md`
- Good: `shop-stripe-printful-wiring.md`
- Good: `hero-animation-three-layer-refactor.md`
- Bad: `go-into-plan-mode-graceful-karp.md`
- Bad: `my-opinion-on-joyful-spark.md`

**Commit policy:** the plan file is committed in the SAME git commit as the changes it describes, so plan and implementation are permanently linked in git history. A plan committed without its implementation, or implementation committed without its plan, is a process failure — flag and fix before continuing.

## Fix-on-Sight Rule (No Deferred Gaps)
When you find a gap, an open question, or a "verify/align/handle this later" item — you fix it **right then, in the same working session**, not flag it for later. "Flag at execution," "TODO," "verify later," "we can align this afterward," and "leave for now" are banned as resolutions. A flagged gap is an unfinished gap; the flag does not count as handling it. The only legitimate deferral is a true external blocker (you are waiting on the client, a credential, or a third party) — and even then you state the blocker explicitly and do everything on your side immediately.

**Why this is a hard rule:** deferred items become latent bugs that surface in production. Canonical example (Goddu Imprint, 2026-05-29): the revisions plan flagged `ownerEmail` with "Leave ownerEmail or align — flag at execution." It was never closed. Result: `ownerEmail` stayed `stevegoddu@godduprinting.com` — the legacy domain Steve is **canceling** — and the contact form routed every lead notification + reply-to there. The site would have **silently dropped every inbound lead** the moment that hosting lapsed. The fix was a one-line change that should have happened the instant the plan flagged it. The flag created false confidence that it was handled.

**In practice:**
- Writing a plan: resolve gray areas before approval (decide the value, the crop, the routing), don't write "TBD / verify at execution" into a step a later agent inherits.
- During execution: the moment you notice a stale value, a missing wire-up, a half-applied sweep, an unrenamed asset, or a "should probably also…" — do it now, before moving on.
- At review: "I flagged X for later" is not an acceptable status. Either X is done, or X has a named external blocker. There is no third state.
- This rule reinforces [[knowledge/errors/object-cover-crops-product-images]] (decide-at-ingest) and the Placeholder CTA Rule (no "coming soon" sign-offs). Same principle, applied universally: **find it, fix it, now.**

## Operating Mindset Rule (Two Hats)
Wear the right hat for the job, explicitly:

**When BUILDING — act as the senior engineer who owns this project.** Not an order-taker executing literal instructions. Own the architecture and the outcome: flag tradeoffs before they bite, recommend the better path with justification, refuse mediocre solutions even if they technically satisfy the request, and make defensible decisions you can trace to research or first principles. If an instruction would produce a worse result (e.g. a layout that crops the product, a deferral that becomes a latent bug, a value that contradicts the data), say so and propose the right thing — don't quietly implement the worse version. Senior means you're accountable for whether it's actually good, not just whether it was done.

**When AUDITING (Playwright / visual QA) — act as the prospect deciding whether to become a customer.** Stop being the dev confirming "an `<img>` loaded / the page renders / 0 console errors." Look at every screen and ask the buyer's questions: *Does this look credible and premium? Can I actually see the product I'd be buying — the whole thing, not a cropped sliver? Is the value clear in 5 seconds? Would I trust this person with my branch-opening deadline? Does anything here make me bounce?* The cropped-product miss (Error #72) passed a dev check and failed the prospect check — *"no one would buy that."* The audit gate is the prospect's verdict, not the build's green checkmarks. If you wouldn't convert as the prospect, it's not done. This hat has two required structured expressions, both pre-ship gates below: the **Prospect-Journey Conversion Audit** (a multi-persona funnel simulation — judges the journey across audiences) and the **Multi-Breakpoint Browser Audit** (judges each screen at every viewport).

These two hats are not optional framings — they are the required stance for build work and audit work respectively, on every project.

## Founder Vision
Anthony Rosa is the founder of Optimus Business Solutions. Before
making any architectural decision on AI systems or upsells, read:
`C:\Projects\Second Brain\north-star.md`

**Mission > stack loyalty.** Optimus's mission is to bring the world's
newest technology to small businesses at affordable prices, so big
corporate isn't the only segment benefiting from the AI boom. Stack
choices are subordinate to mission fit. The current default stack
(below) is what serves the mission today; it is NOT a locked future
commitment. When a newer technology delivers more client value at
SMB-affordable pricing, the stack evolves. Equally, the stack does
NOT swap on hype — changes are gated on documented value-to-clients
brainstorm + enriched external research + spike-test results +
(where relevant) drink-own-champagne validation for ≥30 days +
written decision rationale tied to mission fit. Stay flexible.
Change only after analysis. See
`C:\Users\Anthony\.claude\projects\c--Projects-Optimus-Assets\memory\feedback_mission-trumps-stack-loyalty.md`
for the full evaluation discipline. Live stack-evolution evaluations
live in `Optimus Academy/apply-to-optimus/`.

**Current default Optimus stack — applied today for every upsell:**
- FastAPI
- anthropic SDK (Claude API direct)
- Pydantic v2
- supabase-py
- Twilio (SMS + voice telephony)
- Personaplex (voice model — full-duplex speech-to-speech)

Backend services in Python. Client widgets in TypeScript/React (only
the Chat Assistant has a client widget). Voice agent uses Personaplex
on a Twilio Media Streams bridge with FastAPI handling tool calls
(Calendly, CRM, SMS, escalation, post-call summary).

Every agent uses the four primitives in
[`Offerings/02 AI Agents/shared-knowledge/agent-infrastructure.md`](Offerings/02%20AI%20Agents/shared-knowledge/agent-infrastructure.md):
- **Memory store** (Pydantic-typed, Supabase + pgvector)
- **Tool registry** (typed, permissioned, rate-limited)
- **Observability layer** (Langfuse default; Supabase fallback)
- **Approval/sandboxing** (graduate from human-in-the-loop to autonomy)

The four-tier upsell ladder:
- **Tier 1 — Chat Assistant** — $1,500 / $597
- **Tier 2 — Voice Receptionist** — $2,500 / $797
- **Tier 3 — Marketing Team** — $3,500 / $1,497 (template every Tier-4 inherits)
- **Tier 4 — Autonomous AI Employee** — $7,500–15,000 / $2,500–5,000+
  (custom-trained per client on open-source harness, private per-client
  GPU deployment — see [`Offerings/02 AI Agents/04 Autonomous Employee/python-architecture.md`](Offerings/02%20AI%20Agents/04%20Autonomous%20Employee/python-architecture.md)
  for deployment options)

Marketing Team is NOT replaced by Tier-4. It stays as the accessible
top tier AND the prerequisite template every Tier-4 build inherits.

Every shipped system gets a public GitHub repo with `README`,
`/docs/architecture.png`, `/docs/agent-shape.md` (memory schema, tool
surface, observability hooks — even non-agent systems document N/A),
FastAPI auto-docs, and `/docs/retro.md`. The DJ Custom Clothing logo
pipeline is the engineering-hygiene reference; Marketing Team will be
the agent-architecture reference. See: [`anthony-rosa/portfolio-standards.md`](anthony-rosa/portfolio-standards.md).

Long-term destination: Tier-4 Autonomous AI Employees as Optimus's
flagship product, hosted on private per-client GPU compute.
**Drink-Own-Champagne milestone: 2027-Q3** — Optimus's own marketing
pipeline + inbound qualification + scheduling runs autonomously
without daily attention. See "The End Goal" in
[`anthony-rosa/north-star.md`](anthony-rosa/north-star.md) for the full
deployment thesis.

## Vault Organization (Multi-Offering)
The Second Brain vault is organized into 5 top-level hubs plus the existing
website-development workflow files at root. Anyone (human or agent) entering the
vault should know where things live.

**For end-to-end vault operating procedures, read [`optimus-system-guide.md`](optimus-system-guide.md).** That file is the canonical operating manual — it covers all 5 hubs, the killer chain (source → daily capture → concept synthesis → bridge to applicable hub → improvement in that hub), the 5 main workflows, the autonomy roadmap, and the maintenance protocol. Update the system guide BEFORE making structural changes to the vault. This CLAUDE.md file documents rules; the system guide documents how-to.

**Two-domain model.** The vault expresses two peer domains that intentionally overlap:
- **Optimus** = the LLC, productized services, and the SMB-client surface. Mission-bounded.
- **Anthony Rosa** = the personal layer holding career, investments, automated personal
  revenue projects (trading bot, AI influencer personal angle, TikTok Shop), and skill
  goals. Peer hub, NOT subordinate to Optimus.

The overlap is the asset — a skill (e.g., AI influencer pipeline) frequently ships value
into both domains (Anthony's personal TikTok Shop revenue AND Optimus's client content
deliverable). Cross-domain relationships are mediated by **bridge notes via shared
concept files**: each domain owns its own bridge file in its own `apply-to-<domain>/`
zone, both bridges linking to the same shared concept. The `gtm-engineering.md`
multi-H2 precedent applies WITHIN a single zone only — **cross-zone applications get
TWO single-zone bridge files**, never one multi-H2 file. Canonical example:
`apply-to-optimus/ai-influencer-client-offering.md` +
`apply-to-anthony-rosa/ai-influencer-personal-revenue.md` sharing one concept.

**The 5 hubs:**
- **`00 — Empire Index/`** — vault navigation. Start here. Contains the master README,
  MOCs (Maps of Content), the canonical tag schema, and the glossary.
- **`Offerings/`** — what Optimus sells. Per-offering hubs.
  - `01 Website Development/` — productized core. Templates and lessons live at vault root + `knowledge/`; this hub is the index.
  - `02 AI Agents/` — umbrella for 3 in-development agent products: `01 Chat Assistant/`, `02 Voice Receptionist/`, `03 Marketing Team/`. Cross-product patterns live in `shared-knowledge/`.
- **`Optimus Inc/`** — the company itself (drinking own champagne). Optimus's own
  marketing site, deployed agent instances, market intelligence, social pipeline, brand.
  Distinct from Offerings: Offerings = template/IP, Optimus Inc = Optimus's own deployment.
- **`anthony-rosa/`** — personal layer — career, investments, automated personal revenue
  projects, skill goals. Overlaps with Optimus via bridge notes. Holds `north-star.md`,
  `plans/`, `investments/` (crypto thesis, AKT tracker, BTC log), `projects/` (akash
  research, AI influencer personal angle, trading bot), and `skills/` (career
  progression goals/roadmaps). `anthony-rosa/skills/` holds Anthony's personal career
  skill development (Python, LangChain, FastAPI, Personaplex, etc.) — distinct from
  Claude Code skills at `.claude/skills/` and from Optimus build skill instructions
  used by Claude tools.
- **`Optimus Academy/`** — daily personal learning hub. ~90 min/day capture across
  Anthropic courses, NVIDIA classes, YouTube on Claude/agentic concepts, sales training,
  copywriting, marketing psychology, finance, design, productivity tools, tool tracking
  (NemoClaw, OpenClaw, etc.). The `apply-to-optimus/` and `apply-to-anthony-rosa/`
  subfolders are the bridges that connect learning to operational improvements across
  the vault.
  - **Input pathways:** `/learn` accepts TikTok/IG/Reels/Shorts/X-video URLs (auto-downloads
    via `yt-dlp` + transcribes via LOCAL `openai-whisper` — no API key, no per-call cost,
    audio never leaves the machine), YouTube long-form URLs, article URLs, and pasted text.
    The transcribe helper at `Optimus Academy/tools/transcribe-url.py` MUST be invoked via
    `py -3.11` (Python 3.14 is broken on this machine; bare `python` will fail).
    No `OPENAI_API_KEY` required.
  - **Topic scope is broad, not AI-only.** `/learn` captures any source whose value applies
    somewhere — sales training, copywriting craft, marketing psychology, finance,
    productivity tools, design, hiring, ops. Bridges route to one of SIX zones per the
    bridge-target taxonomy in `Optimus Academy/apply-to-optimus/README.md`:
    `Offerings/`, `knowledge/patterns/`, `knowledge/craft/<area>/` (lazy-create),
    `Optimus Inc/<area>/` (verify per-area), `Optimus Academy/tools-tracking/`,
    `apply-to-anthony-rosa/` (personal hub: investments/, projects/, skills/).
  - **Multi-purpose principle:** every bridge declares one or more `value-vector`
    tags from `{productivity, overhead, revenue}` with concrete reasoning. Bridges that
    cannot map to any vector are NOT created — concept note only.
  - **Enrichment + dedup:** shallow sources auto-trigger Step 1.5 web enrichment
    (WebSearch + WebFetch), credited to a separate `enriched-from:` field on the concept
    so daily-file source attribution stays clean. Append-time dedup blocks only
    identical/near-verbatim repetition; variations are NEW info and always pass.
  - **Weekly review surface:** `Optimus Academy/weekly-review.md` — Dataview-powered file
    grouping bridges by value vector (revenue → productivity → overhead) plus aging /
    abandonment candidates. Re-runs on file open.

**The workflow that fills Optimus Academy:** `/learn` (defined in `learn-prompt.md` at
vault root). Paste a transcript / TikTok URL / YouTube URL / course notes → Claude generates
traces (daily entry + atomic concept note(s) + zero-or-more bridge notes) with
scan-and-decide deduplication so `concepts/` doesn't fragment.

**Website-dev workflow is unchanged.** All existing root files (`CLAUDE.md`,
`project-prime.md`, `website-build-template.md`, `build-checklist.md`, `intake-prompt.md`,
`market-research-prompt.md`, `end-to-end-workflow.md`, `frontend-design.md`, `retro.md`,
`initial-business-data.md`, `market-intelligence.md`, `animation-inspiration.md`,
`animated-logo-inspiration.md`, `Revamp logo light.png`) and the entire `knowledge/`
folder (108 files of errors, patterns, retrospectives, sales, onboarding) stay where
they are. Every existing wikilink and every agent's Required Reading section keeps
working without edits. The reorg is additive, not migrational.

**Tag schema** lives at `00 — Empire Index/tag-schema.md` — every NEW note (after
2026-04-26) uses tags from that schema. Existing files stay untagged and findable
by their existing wikilinks. **8 tag families:** `#offering/*`, `#layer/*`,
`#learning/*`, `#applies-to/*`, `#value-vector/*`, `#stage/*`, `#status/*`,
`#owner/*` (where `#owner/optimus` and `#owner/anthony-rosa` mark domain ownership;
notes spanning both domains carry both tags). Count reconciled this change —
`#value-vector/*` was previously in the schema but uncounted in CLAUDE.md.

**Where to put new content (quick reference):**
- New website-dev lesson learned during a build → `knowledge/errors/` or `knowledge/patterns/` (unchanged from before)
- New website-dev client retrospective → `knowledge/retrospectives/` (unchanged)
- New AI agent pattern shared across chat+voice+marketing → `Offerings/02 AI Agents/shared-knowledge/lessons/`
- New AI agent pattern specific to one product → `Offerings/02 AI Agents/0X <product>/lessons/`
- Daily learning capture → `/learn` (writes to `Optimus Academy/`)
- Competitor or market signal about Optimus's own market → `Optimus Inc/market-intelligence/`
- Anything about a specific client project → that client's own repo (e.g. `c:\Projects\<client-slug>\`), NOT this vault — only the post-project retrospective lands here in `knowledge/retrospectives/`

## Subagent Delegation Rule
Any build phase with 3 or more discrete tasks MUST be broken into individual tasks
and delegated to subagents. One subagent per task. Run independent tasks in parallel.

Never execute a multi-task phase as a single monolithic session. This produces slower,
lower-quality output and exhausts context. The correct pattern:
1. Write a task list for the phase
2. Identify which tasks are independent (can run in parallel)
3. Spawn subagents for each task with complete context (file paths, design tokens, exact spec)
4. Collect outputs, verify, integrate

If a task is trivial (under 5 minutes, 1 file), do it inline. If it's substantive, delegate.

**Concurrency checkpoint (enforcement):**
When the rule fires (3+ discrete tasks, independent), the orchestrator's
IMMEDIATE NEXT MESSAGE must contain all N Agent tool calls in a single
function_calls block. Spawning agents one-per-message after the rule fires is a
process failure — log it in build-log.md and re-spawn correctly.

Exception: when an agent's input depends on a prior agent's output file, the
two run sequentially. The dependency must be cited in the spawn brief
("[design-synthesizer] depends on [market-researcher] output at
market-intelligence.md").

Default assumption: all 7 Phase 1 agents in project-prime.md are independent
EXCEPT design-synthesizer ← market-researcher and content-writer ← design-synthesizer.
The remaining four (animation-specialist, seo-aeo-specialist, plus any
client-specific writes) run in parallel.

## Skill Creation Rule
When you solve a problem in a new way that works — a component pattern, an integration
flow, an animation approach, a build sequence — immediately:
1. Document the exact steps you took (not a summary — the actual implementation)
2. Create a skill file for it using /skill-creator
3. Reference the skill in future builds instead of reinventing

The goal: every non-trivial build decision becomes a reusable skill. Build once, reuse forever.
If a pattern is already in build-log.md, also create a skill so it can be invoked directly.

## Core Law: Research-Backed Decisions Only
Every design decision, copy choice, UX pattern, or technical recommendation
MUST be traceable to market-intelligence.md or initial-business-data.md.
If you cannot cite the research that backs a decision, do not make the
decision — surface it for review.

## Originality Rule

**No exact-duplicate visuals across Optimus builds.** Two builds can share warm gold + deep charcoal palettes, share editorial register, share particle-system hero architecture or movie-hero architecture. What they can't share: the same canvas animation choreography, the same hero composition pixel-for-pixel, the same brand-mark reveal pattern. Inspiration + similar register: fine. Identical visual: build failure.

**Every design decision must be data-backed.** Palette derivation, hero metaphor choice, type scale, motion vocabulary, section rhythm — each cites either:
- Behavioral research from Pattern #61 Section 12 Psychological Foundations (Kahneman, Tversky, Ariely, Schmader & Beilock, Cialdini, et al.)
- Audience persona psychology from market-intelligence.md §2
- Differentiation thesis from market-intelligence.md §8 (escape competitor visual zones)
- Client-specific positioning from initial-business-data.md

Aesthetic-only choices ("I like this color," "this looks luxe") are not sufficient. If a design choice can't be defended with citation, it gets revised before approval.

**Code architecture stays reusable.** Shop scaffold, blog architecture, booking calendar, quiz funnel, layout grid, API security defense-in-depth (Pattern #76), sections matrix, the 3-layer hero shape, the movie-hero pipeline — proven Optimus patterns get reused without modification. Architecture is reusable; the visual content that fills it must be original-or-justified per client.

**Operational test at Stage 1B human checkpoint:** orchestrator asks two questions:
1. "Is this visual a direct lift from another Optimus build, or does it have at least one originality vector?" — originality vector = unique composition, unique brand metaphor, unique color combination justified by research, unique motion concept, unique typography pairing.
2. "Is every palette and major design-decision row in design-system.md Section 12 cited with research?"

If both YES → approve. If either NO → kick back to design-synthesizer with the missing citation called out.

## Optimus Positioning Rule
Every Optimus site ships as a **premium, modern, 2026-era build with UI/UX engineered for conversion**. This positioning is non-negotiable regardless of client industry, tier, spend, or market segment. Trade businesses get the same luxury-grade foundation as luxury hospitality; $1,500 Starter tier gets the same visual floor as $5,500 Premium. We do not ship cheaper-looking sites — we ship fewer features.

**What this means in practice (UI/UX layer, set during design-synthesizer + scaffold):**
- Typography: modern variable fonts with serious type scale (clamp-based, declared in Phase 1 globals.css). No Arial, no Roboto, no default system stack.
- Animation: real motion — a cinematic hero (movie header by default where the business has a photographable subject; 3-layer particle stack for abstract/service brands — see Hero Architecture Rule), ambient effects on every interior page, Framer Motion scroll-triggered reveals. Never placeholder transitions.
- Visual density: generous whitespace, radial-gradient-overlayed dark sections (never flat), subtle-gradient-overlayed light sections.
- Interactions: micro-animation on hover, focus-visible states, skeleton loaders on async content.
- Color: brand-primary + brand-accent + restrained neutrals. No stock-corporate blue, no Bootstrap navy, no purple-gradient-on-white.
- Emoji: YES — as semantic UI icons on service cards, pain points, process steps, stats, quiz options. Modern premium brands (Linear, Stripe, Vercel, Raycast, Superhuman) use emoji freely. The tension is not "emoji vs luxury" — the tension is "emoji vs stock-corporate," and we are never stock-corporate.

**What varies by client (not scoped by this rule):**
- Copy voice and tone of voice (see content-writer.md Voice Anchor + design-system.md Section 7)
- Feature mix (see Always-Built Features Rule + design-system.md Section 11)
- Specific brand tokens — color values, fonts, personality axes (design-synthesizer output)
- Photography direction (design-system.md Section 6)

**frontend-design.md scope under this rule:** frontend-design.md offers a menu of aesthetic directions (brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art-deco/geometric, soft/pastel, industrial/utilitarian). For Optimus builds, the selection is constrained to the luxury-modern-2026-conversion family — typically "luxury/refined" or "editorial/magazine" or a hybrid. Never "brutalist/raw," "retro-futuristic," or "playful/toy-like" as a dominant direction, regardless of brand fit. The brand's voice can be casual; the visual presentation is always premium-modern.

See [knowledge/patterns/optimus-luxury-modern-positioning.md](knowledge/patterns/optimus-luxury-modern-positioning.md) for the rationale and the full pattern-doc version.

## Mandatory Pre-Read Protocol
At the start of EVERY session, read in order:
1. CLAUDE.md (this file)
2. progress.md
3. C:\Projects\Second Brain\Wealth\Optimus\knowledge\build-log.md  ← Cross-project errors + patterns. Check before starting any phase.
4. initial-business-data.md
5. market-intelligence.md
6. design-system.md
7. frontend-design.md
8. website-build-template.md

Never skip this sequence. Never rely on context from a previous session.
Treat each session as if it is your first.

EXCEPTION FOR SUBAGENTS: This protocol applies to the main orchestrator session only.
Subagents spawned via the Agent tool must NOT follow the full 8-file pre-read sequence —
they load only the files listed in their agent file's Required Reading section.
Loading all 8 files in every subagent wastes context before any work begins.

## Pre-Task Memory Search Protocol
Before spawning ANY agent or starting ANY substantive task, the orchestrator MUST:

1. Read `C:\Users\Anthony\.claude\projects\c--Projects-Optimus-Assets\memory\MEMORY.md`
   and identify any feedback/project memory entries relevant to the upcoming task.
   Quote the relevant entry titles in the spawn brief or task plan.
2. Grep `C:\Projects\Second Brain\Wealth\Optimus\knowledge\build-log.md` for keywords from the
   task (component name, integration name, error type). If a row matches, read
   the linked file in `knowledge/errors/` or `knowledge/patterns/` BEFORE spawning.
3. If the task touches a known integration (Calendly, Stripe, Printful, Higgsfield,
   Sanity, Resend), explicitly cite the matching pattern from build-log.md in
   the spawn brief.

If no relevant memory exists, state "No prior memory matches" in the spawn brief.
This is not optional — the silence confirms the search happened.

Skipping this step has caused repeat-error incidents on prior builds (see
build-log.md Errors #13, #23, plus several patterns rebuilt from scratch).

## Agent System Rules
These rules apply whenever the Subagent Delegation Rule triggers agent spawning.

**Orchestrator is the ledger; agents are the executors.** The orchestrator
reads files, tracks state, plans phases, spawns agents, verifies outputs, and
updates progress.md. Agents read their Required Reading, execute one task,
write one output file, and return a handoff. Agents NEVER spawn other agents,
NEVER update progress.md (the orchestrator does that on their behalf), and
NEVER read state outside their Required Reading list. One level of hierarchy
only — non-negotiable.

Corollary: if an orchestrator finds itself writing component code, it has
crossed into executor territory and should spawn an agent instead. If an agent
finds itself spawning subagents or updating cross-project state, it has crossed
into orchestrator territory and should return a handoff to the orchestrator.

**Agents read files, not summaries.** Every agent gets context by reading known output
files directly (market-intelligence.md, design-system.md, /data/site.ts). The orchestrator
does NOT pass summaries or briefings — it passes file paths. The agent reads the file.

**Agents own their output files exclusively.** No two parallel agents may write to the
same file. Each agent owns exactly one output file or directory. If two tasks share an
output file, they run sequentially — not in parallel.

**Agents emit checkpoints; the orchestrator writes them.** After completing each
discrete unit of work, the agent returns a checkpoint string in its handoff
(task completed, output file path, last sub-step, any blockers). The orchestrator
appends that checkpoint to progress.md. If an agent fails mid-task, the orchestrator
re-invokes it with "continue from [last checkpoint]" rather than starting over.
Agents do not write to progress.md directly — that violates the ledger boundary.

**Agent status lifecycle:** Every agent file has a status field: DRAFT → TESTED → VALIDATED.
Only VALIDATED agents run without human review of the output. DRAFT agents always get
output reviewed before proceeding.

**Orchestrators validate outputs.** Before unblocking the next task, the orchestrator
checks that the agent's output file exists, is non-empty, and passes the agent's
Validation criteria. Failing agents get re-run with a correction note — not silently passed.

**Variable injection via CLAUDE.md.** Agents read the project's CLAUDE.md directly to
get filled variables (Garrett Partridge, garrettpartridge.com, etc. — already substituted by /prime).
Orchestrators do NOT perform string substitution on agent file contents.

**NEVER stop after agent spawn.** When the orchestrator spawns agents, the
immediate next action is verification (read output files) and either integration
or next-phase progression. The orchestrator does NOT stop, summarize, and ask
"shall I proceed?" between agent completion and the post-task ritual. The
ritual itself IS the proceed signal.

Stop only at: phase completion (all phase agents done + integrated), explicit
user blocker (clarification needed before next decision), or runtime error
(agent failed, output missing, validation failed). "I'll wait for your input"
is not a valid stop reason mid-phase.

**Model routing via effort field.** Every agent file's `effort:` frontmatter maps
to a specific Claude model — see `agent-routing.md` at vault root. The orchestrator
consults the routing table at spawn time; model selection is never ad-hoc.

## Skill File Name Aliases
Some design skills reference files by generic names that differ from this
project's actual filenames. Resolve them:

| Skill references this name | Read this project file instead          |
|----------------------------|-----------------------------------------|
| FRONTEND_GUIDELINES.md     | frontend-design.md                      |
| APP_FLOW.md                | progress.md (site architecture section) |
| PRD.md                     | progress.md (phase overview + task list) |
| LESSONS.md                 | C:\Projects\Second Brain\Wealth\Optimus\knowledge\build-log.md |
| TECH_STACK.md              | website-build-template.md (Stack section) |
| progress.txt               | progress.md                             |

Never create duplicate files to satisfy a skill's expected filename.
Always resolve to the correct project file using this table.

## Reference File Hierarchy Rule
Three reference files define the build contract. Before any decision in their domain, re-read the relevant file:

- **design-system.md** — brand constitution (colors, typography, tone, personality axes). No deviation from its values without explicit written approval + a matching update to the file.
- **frontend-design.md** — UI/UX rules (layout, component architecture, visual decisions). Cite the section that authorizes your decision before implementing.
- **website-build-template.md** — the tech/build foundation (stack, directory structure, animation patterns, API routes). Scaffold from it first; then layer client-specific features on top, flagged in progress.md.

Precedence when they conflict: design-system.md > frontend-design.md > website-build-template.md. The brand constitution wins over UI rules; UI rules win over build-template defaults. If a component needs a value outside design-system.md, flag it — do not improvise.

## CSS Scaffold Completeness Rule
Phase 1 globals.css must be complete before any component is built. Required: full `--space-*` scale, all display-type sizes as clamp(), scroll-padding-top values — exact values in [website-build-template.md](website-build-template.md) §Design Tokens.

After scaffold, grep `src/` for any `var(--` reference and verify every referenced CSS variable is declared. An undefined custom property silently resolves to the empty string — layout collapses to 0px with zero build warnings and zero lint errors. This check is mandatory before Phase 1 proceeds.

## Market Intelligence Rule
market-intelligence.md contains competitive research, audience psychology,
pricing benchmarks, and feature gap analysis. Every new feature, page, or
content block must be cross-referenced against this report.
Ask: "Does this serve the target audience? Is this validated by research?
Does this close a gap competitors have left open?"

## Progress Tracking Rule
After completing ANY subtask — not at session end, AFTER EACH ONE — update progress.md with: what was completed, **the reasoning behind it (the WHY and the decision, not just the action)**, what was discovered or decided, what the next step is, and any blockers. Do not batch updates. Context can exhaust mid-build; a deferred update means that work is undocumented.

**Applies to EVERY session, not just the initial build.** Client revision rounds, enhancements, bug fixes, asset work, and post-launch changes all log to progress.md the same way. The ledger does not stop when the build "closes" — that is exactly when it tends to get abandoned.

**TodoWrite and git commit messages are NOT substitutes for progress.md.** The TodoWrite list is ephemeral (it evaporates at session end); commit messages are scattered across history and capture the *what* far more than the *why*. progress.md is the one durable, narrative ledger that holds the reasoning. If you ever find yourself relying on the todo list or the commit log to remember what you did and why, that is the signal progress.md is being skipped — write to it now.

**Keep the header + phase/status table current.** Update "Last Updated," "Current Phase," the status table, and the sale/plan line as state changes. A progress.md whose header contradicts reality (e.g. "Phase 0 — Not Started" while the site is built and live) reads as abandoned, which compounds the staleness and invites everyone to ignore it.

This rule is operationalized by the Post-Task Capture Ritual (its checkpoint step appends to progress.md). The Goddu Imprint failure that prompted this hardening: progress.md was logged richly through the initial build (Stages 1A-1J) then frozen — every revision and image-integration session afterward tracked only in todos + commits, leaving the ledger stuck at "Phase 0" while the site shipped and went through multiple client revision rounds. See [[knowledge/errors/progress-md-frozen-after-initial-build]].

## Knowledge Base Rule
Cross-project knowledge lives at `C:\Projects\Second Brain\Wealth\Optimus\knowledge\build-log.md` — every error solved and pattern discovered, indexed. Read it before starting any phase; if a similar problem was solved before, the solution is there.

**When to update:**
- Any error resolved → add a row to the Error Encyclopedia table in build-log.md immediately AND create a detailed entry in `knowledge/errors/`. Do not continue until the entry is written.
- Any phase completes with a non-obvious finding → add a row to the Build Patterns table.
- Project close → add a row to the Project Retrospectives table (see `/retro`).

**What belongs where:**
- CLAUDE.md + website-build-template.md = universal rules that apply to EVERY build. If a rule does not apply universally, it does not belong here.
- `knowledge/` = optional integrations (Sanity CMS, GHL, Instagram/Behold.so, bilingual support, credential-specific fields) and client-specific patterns. Agents consult knowledge/ only when initial-business-data.md indicates relevance.

Before adding any rule to CLAUDE.md or website-build-template.md, ask: "Does this apply to EVERY build regardless of client, industry, or tier?" If no → knowledge/ as a reference pattern. If yes → it is a workflow rule and belongs here.

## Post-Task Capture Ritual
After ANY agent completes a substantive task, the orchestrator runs this 5-step
ritual before moving to the next task:

1. **Verify output.** Confirm the agent's output file exists, is non-empty, and
   passes the agent's Validation criteria. Failing → re-spawn with correction.
2. **Checkpoint.** Append a one-line entry to progress.md: agent name, output
   file, status, timestamp. (Per the LEDGER rule, the orchestrator writes this —
   not the agent.)
3. **Capture surprises.** If the agent solved a non-obvious problem, used a
   novel pattern, or hit a new error: write the entry NOW (not later) to
   `knowledge/errors/<slug>.md` or `knowledge/patterns/<slug>.md` AND add the
   index row to `knowledge/build-log.md`. Slug is deterministic (kebab-case
   from problem title).
4. **Skill check.** If the pattern is reusable across projects, run /skill-creator
   inline. Three reusable patterns + no skill = process failure.
5. **Memory update (if persistent).** If the surprise reveals a new user
   preference or recurring constraint, append a feedback memory file to
   `C:\Users\Anthony\.claude\projects\c--Projects-Optimus-Assets\memory\` and
   add the row to MEMORY.md.

Skip steps 3-5 only when there was nothing surprising. State "no surprises
captured" explicitly so the silence confirms the ritual ran.

## Image Generation Rule (Higgsfield)
Higgsfield image generation is NEVER optional and NEVER deferred. Every blog article ships
with both a card image and a header image. Every trade business ships with a gallery of
12-16 images. These are generated during the sweep, not "later."

**Tool:** `mcp__higgsfield__generate_image` with `model: flux_2` (FLUX.2 Pro) as the default
for blog cards, article headers, and trade gallery images. Use `model: nano_banana_pro`
for stills that contain text or need higher composition quality (signage mockups, social
tiles with logo + headline). Both models are 0 credits — **unlimited on Plus tier (365-day
auto-renewing)**. No FAL_KEY env var needed. No fal.ai script. No balance check or
confirmation gate for image generation — only the cost-approval gate Step 0 (active-skill
confirmation per `knowledge/patterns/higgsfield-cost-approval-gate.md`) applies.

**fal.ai retired 2026-05-17** — Higgsfield Plus tier ships 6 permanent unlimited image
models, removing fal.ai's cost-per-image advantage. Do not add FAL_KEY references to any
client project's `.env.local` or Vercel env vars. Do not run any fal.ai script.

**Prompt quality gate — non-negotiable:**
Before running ANY image generation batch, write ALL prompts first and review them as a set.
Every prompt must be:
- Truly distinct from every other prompt in the batch (no two prompts that would produce
  visually similar images)
- Specific to the article topic or gallery subject (not generic stock-photo descriptions)
- Grounded in design-system.md Section 6 (Photography & Media Direction)
- Creative and visually compelling — describe lighting, composition, mood, specific details

Wrong: "A person getting a haircut in a salon" × 10 with minor variations.
Right: Each prompt tells a different visual story — different angle, different moment,
different emotional beat, different subject within the business's domain.

If a prompt batch has two prompts that would produce near-identical results, rewrite
before generating. Image gen is unlimited on Plus tier — retakes are free — but writing
better prompts the first time is still faster than visual-reviewing and regenerating.

**Subject-first & never-antique (anti-slop) — non-negotiable.**
Every image must depict the *specific, modern, real-world subject* of the piece it
illustrates — the actual place, work, person-context, or moment the article/section/gallery
slot is about — in a 2026 register. This is the rule that separates a real editorial photo
from interchangeable AI slop.

- **The interchangeability test (apply to every prompt before generating).** If this exact
  image could sit on any *other* article, any other section, or a competitor's site without
  looking wrong, it is too generic — rewrite it to the piece's specific subject. A blog card
  about sober-living cash-vs-accrual should show a sober-living home; one about a contractor's
  CPA cost should show a framed New England job site. If the same "object on a desk" would
  work for all of them, none of them are on-subject.
- **Scene over prop.** Depict the real place / work / context, not a decorative object
  arrangement. "A pen on a leather pad" is a prop still-life; "a maker's woodworking studio
  with a half-finished piece on the bench" is the subject. Lead the prompt with the scene,
  not the centerpiece object.
- **Never antique — ALL stills, not just the hero.** Banned across blog cards, headers,
  galleries, service-card stand-ins, and about-page stills: fountain pens, brass banker's
  lamps, leather-bound tomes / portfolios, Windsor chairs, mechanical adding machines, wax
  seals, quills, candle / oil-lamp lighting, green-felt writing pads, anything that reads
  pre-1950. Use modern desks, laptops, real interiors, real exteriors, real job sites, and
  region-relevant American imagery. This generalizes the hero-video "never antique" rule
  (`feedback_hero-video-stills-approval-gate.md` — the user called such imagery "photos from
  the 1800's") to every still on the site.
- **Detailed ≠ on-brand — the trap that caused this rule.** A richly described antique prop
  ("a vintage brass-cased mechanical pencil on a worn leather pad, slanted window light,
  shallow DOF") passes a naive "distinct + creative + specific lighting" check and still ships
  as slop. The Ead Financial first pass logged "All 20 PASS visual review" and every image was
  off-subject 1800s prop still-life — re-done from scratch. Vivid wording is not the bar;
  *on-subject + modern* is the bar. When in doubt, ground every prompt in design-system.md
  Section 6 and name the business's actual subject.

**Never request readable text in image prompts.** AI image models cannot render legible
text — they produce garbled characters (e.g., "REJUPED" instead of "REJECTED"). Rewrite
any prompt that describes text on a sign, logo, label, or screen to describe the scene
visually without requiring readable text. Same rule applies across Flux 2, Nano Banana
Pro, Soul, Cinema Studio — every diffusion model.

**Visual review before commit — non-negotiable.** After generating, visually inspect every
image before committing. Common artifacts that require regeneration with a revised prompt:
- Garbled or nonsense text baked into the image
- Deformed subjects (extra limbs, merged objects, distorted faces)
- Duplicate elements that shouldn't repeat
- Composition that doesn't match the prompt intent
If any image fails visual review, revise the prompt and regenerate immediately (no credit
cost on unlimited models). Do not commit artifacts.

**Enforcement:** If the sweep completes without blog card images + header images for
every article, that is a build failure. The pre-launch auditor checks for these files.

**Video generation discipline (separate gate):** for any `mcp__higgsfield__generate_video`
call (Architecture B hero, ad creative, Soul-character video), the cost-approval gate
applies fully — balance check, simulation step, and high-cost confirmation per
`knowledge/patterns/higgsfield-cost-approval-gate.md`. Video models cost credits;
images on the 6 unlimited models do not.

## Higgsfield Credit-Spend Gate Rule

**No `mcp__higgsfield__generate_image` or `mcp__higgsfield__generate_video` call may fire until the orchestrator has either invoked the matching `/optimus-higgsfield-*` skill OR explicitly cited the relevant skill / pattern doc in a message.**

The Higgsfield skill suite encodes the corrected approach learned from Goddu Imprint v1+v2 failures. Bypassing it means re-learning lessons that have already been paid for in burnt credits.

**The four Higgsfield skills (registered at `~/.claude/skills/`):**
- `/optimus-higgsfield-route` — routing meta-skill, takes intent ("hero" / "ad" / "spokesperson" / "blog-image" / "audit"), returns correct skill + pattern docs + cost estimate + failure modes. Use when unsure.
- `/optimus-higgsfield-hero-video` — Architecture B website hero generation.
- `/optimus-higgsfield-ad-creative` — Marketing Studio ad creative (Tier 3 Marketing Team upsell).
- `/optimus-higgsfield-soul-character` — Soul ID training + character management (AI Spokesperson / AI Influencer pipelines).

**The four supporting pattern docs (`knowledge/patterns/`):**
- `higgsfield-mcsla-prompt-mastery.md` (Pattern #81) — MCSLA structure + 10 named prompt patterns + 12 brand registers + Soul ID Identity-vs-Motion separation rule
- `higgsfield-camera-vocabulary.md` (Pattern #82) — 70+ camera preset catalog + reliability hierarchy + per-use-case matrix
- `higgsfield-model-selection-matrix.md` (Pattern #83) — model decision tree + cost matrix (Cinema Studio V2 permanent video default; 6 permanent unlimited image models on Plus tier)
- `higgsfield-cost-approval-gate.md` (Pattern #85) — Step 0/1/2 pre-spend gate + zero-credit SIMULATION step + 3-5-attempt escalation (binding on every Higgsfield generate call)
- `ai-video-slop-avoidance-checklist.md` (Pattern #84) — 15-point platform-agnostic anti-pattern checklist

**Defense-in-depth enforcement:**

1. This CLAUDE.md rule (discipline) — read by orchestrators at session start per Mandatory Pre-Read Protocol.
2. `/optimus-higgsfield-route` meta-skill (optional aid) — invoke when unsure which skill is right.
3. PreToolUse hook in `~/.claude/settings.json` (soft gate, updated 2026-05-17) — fires `higgsfield-credit-gate.sh` before any `mcp__higgsfield__generate_image` or `mcp__higgsfield__generate_video` call. Injects the 3-point checklist below Claude must address before proceeding. Non-blocking (exits 0) but forces explicit acknowledgment.

**The three-point gate the hook surfaces** (Step 0 active-skill read, all calls · the zero-credit SIMULATION step before any `generate_video` · Step 1 balance ≥100 cr + Step 2 high-cost confirmation for single calls or batch totals >50 cr, Cinema Studio V2 at 25-45 cr exempt) is specified in full — exact checks, escalation, and unlimited-image-model exemptions — in Pattern #85, [higgsfield-cost-approval-gate.md](knowledge/patterns/higgsfield-cost-approval-gate.md). The hook is the soft enforcement of that gate.

**Skip-gate exemptions:** personal experiments outside client deliverables (Anthony's personal Soul Character training, exploration of new Higgsfield features). Even then, recommend reading the pattern docs first — the lessons are paid-for and free to consult.

**Provider abstraction note:** Higgsfield has documented business continuity risk (X account suspended early 2026, refund/billing complaints per community reporting). fal.ai retired 2026-05-17 — Plus tier ships 6 permanent unlimited image models, removing fal.ai's cost advantage. The pattern docs maintain documented fallback paths: any text-to-image generator with same prompt for stills, Kling AI (web UI) for video animation as last-resort manual flow per `knowledge/patterns/kling-video-hero.md`. Don't lock client deliverables to Higgsfield-only features when alternatives exist. Tier 3 Marketing Team AI Spokesperson (Soul ID) is the one Higgsfield-unique feature with no direct fallback — plan client contract milestones accordingly.

## Copy Writing Rule
**Voice: human phone review, not press quote.**
- Testimonials must read like a real human typed them on a phone. Never use the em dash (—). Humans use commas, periods, and ellipses. Em dashes are a copywriter/AI tell.
- Short sentences. Specific nouns. No corporate hedging.

**Affirmative first-person brand voice — non-negotiable.**
When the brand (the founder, the agent, "we") is the grammatical subject of a sentence describing the brand's own approach, lead with what the brand DOES, not what it AVOIDS. Never write *"I don't X"* / *"We don't X"* / *"No X, no Y"* in brand-voice copy — the negation plants the anti-image directly on the brand (same mechanism as *"don't think of an elephant"*). The reader registers the noun before the negation and walks away with X associated with the brand.

- WRONG (brand is subject of negation): *"I don't blast listings and wait."* / *"No lowball, no upsell pressure."* / *"No pressure, no surprises on closing day."*
- RIGHT (brand-voice affirmative): *"Every search starts with a real conversation."* / *"A price that holds at every step from listing to close."* / *"Steady communication from listing day to the closing table."*

Negation IS correct in three other contexts and must not be stripped from them: (1) pain-point bodies that attribute bad behavior to OTHER agents (visitor's fear externalized), (2) comparison content where naming the alternative IS the point (commission page, iBuyer-vs-agent), (3) compliance disclaimers required by law ("not financial advice," "not set by law"). The rule fails only when the brand is the grammatical subject. Full pattern: `C:\Projects\Second Brain\Wealth\Optimus\knowledge\patterns\affirmative-first-person-brand-voice.md`. Triggering error: Karyn Emerson Real Estate, May 2026 — three negation-led brand-voice sentences shipped to a live regulated agent's site; client herself caught the hero subhead.

**Client revision suggestions on copywriting mechanics are stated intent, not final copy.**
When a client proposes a rewording to fix negation framing, em-dash discipline, active-vs-passive voice, or any other mechanical issue, treat the suggestion as their *intent.* Rewrite to professional copywriter standard, then ship. Pasting the client's suggested phrasing verbatim is a failure mode — the client knows their business, not the mechanics. The same standard already governs the em-dash rule applies here: when Karyn writes *"I don't blast listings and wait"* in her revisions doc, the intent is "drop the self-doubt"; the copywriter's job is to produce affirmative copy that achieves that intent, not to paste the negation verbatim.

**Strip AI writing tells (de-slop) — in addition to the em-dash + negation rules above.**
Cut the AI fingerprints catalogued in [knowledge/craft/copywriting/ai-writing-tells-lexicon.md](knowledge/craft/copywriting/ai-writing-tells-lexicon.md): throat-clearing openers ("Here's the thing", "The truth is", "It turns out"), business jargon (navigate, deep dive, lean into, circle back, game-changer, moving forward, landscape), filler/temporal openers ("In today's landscape", "When it comes to", "At the end of the day", "It's worth noting"), false agency (inanimate nouns performing human verbs — "the data tells us", "the results speak for themselves" → name the human/crew/"you"; this is a SEPARATE check from the brand-as-subject negation rule above), adverb hedges (really, just, simply, actually, genuinely — flag, don't blanket-purge), and meta-commentary ("Let me walk you through", "As we'll see"). The fix is always: cut it, or replace it with the specific concrete thing. **Do NOT over-correct for conversion copy** — the donor source (stop-slop) is essay-tuned and its absolutes would damage marketing copy: KEEP tri-colon lists ("faster, cleaner, local"), Wh- openers ("Why choose us"), testimonials/taglines as pull-quotes, and FAQ/hero question→answer patterns. optimus-review greps the fixed-string tells as a pre-ship gate.

**File discipline:**
- All copy lives in `/data/site.ts` — zero hard-coded strings in components.
- Blog article CTAs close with an action, never a soft suggestion.

**Act as business owner when data is thin.**
If initial-business-data.md lacks information needed for any section (about story, founder background, service detail, company history), YOU MUST write it yourself in the voice of the business owner: compelling, specific, plausible, grounded in what you do know about their industry and market. Mark every invented section with `// [DEMO COPY — pending client review]`.

Do NOT leave sections blank. Do NOT write `[MISSING:]`. Do NOT ask the business owner. The demo must look complete and impressive — a half-empty site loses the sale. Corrections and personalizations happen after payment, not before the pitch.

This is cardinal: we never hassle the business owner for details we can reasonably write ourselves.

## Code Standards
- Next.js (App Router) + Tailwind CSS 4 + PostCSS — see website-build-template.md Stack section
- Animations: Framer Motion + react-intersection-observer — all scroll-triggered
- Design tokens defined as CSS custom properties in globals.css — not in tailwind.config
- TypeScript — strict mode on
- Mobile-first breakpoints: always design for 390px width before desktop
- Atomic git commits after every subtask — format: type(scope): description
- All copy lives in /data/site.ts — zero hard-coded strings in components
- Performance budget: Lighthouse score ≥ 90 on all pages
- Icons: use high-quality emoji, not SVG icon libraries. No Lucide, no Heroicons, no react-icons.
  Emoji renders natively, loads at zero cost, and looks clean at display size.
  Reference style: tonyrosa777-ops/placed-right-fence service page.

  Emoji is required in every one of these locations — never a plain text label alone:
  - Quiz answer options: every option has a leading emoji before the label text
  - Service cards: each service has an emoji (sourced from site.ts services[].emoji)
  - Pain point cards: each pain point has an emoji (site.ts painPoints[].emoji)
  - How It Works / Process steps: each step has an emoji (site.ts processSteps[].emoji)
  - Stats bar: each stat has a leading emoji (site.ts stats[].emoji)
  - About section belief/value bullets: each belief has an emoji
  - Pricing page feature lists: ✅ for included, ✗ for not included (never plain text)
  - Trust checklist bullets on service area pages: ✅ or context-specific emoji per bullet
  - FAQ: optional — emoji per question category group, not per question

  Choosing the right emoji: match the semantic meaning, not decoration.
  A plumbing service gets 🔧. A lawn care service gets 🌿. Speed stat gets ⚡.
  Wrong: generic ✨ on everything. Right: specific, meaningful, instantly readable.

## Git Identity Rule
Before the first commit on any new project, verify git identity is set:
  git config user.name
  git config user.email
If either is empty or wrong, set per-repo identity:
  git config user.name "Anthony Rosa"
  git config user.email "anthonyrosa14@icloud.com"
Vercel deploy will fail if the committer email does not match the GitHub account.
This has caused blocked deploys on two prior builds (Errors #13, #23).

## Hero Architecture Rule

**No owner/founder biographical headshots in the hero.** Owner photos — Steve, Andrea, whoever — belong exclusively in the About section. A two-column "editorial portrait of the owner on the right" hero is a build failure regardless of how well-shot the portrait is. The hero is where the brand's first impression lives, not where the owner introduces themselves.

**Two and only two valid hero architectures, with a default bias.** **Architecture B (movie header) is the default for any build with a photographable product, space, or job-site** — the cinematic register shows the real work and lands the Originality vector through composition rather than a from-scratch canvas concept. **Architecture A (3-layer particle system) is the default for abstract / service brands with no shootable subject** (pure consulting, coaching with abstract deliverables, a strong existing logo that deserves its own reveal) **and is the always-ready fallback** when a movie hero can't clear the motion-readability gate (Goddu v1/v2: "you can hardly tell it was a video"). design-synthesizer confirms the choice at Stage 1B, justified against the brand axes + audience psychology in design-system.md Section 8 and Section 12 — but it starts from this default, it does not coin-flip.

### Architecture A — 3-layer particle system (default for abstract/service brands; universal fallback)

- **Layer 1 — HeroParticles.tsx (canvas particle system).** Animation-specialist selects an *original-to-this-build* particle metaphor tied to the client's niche. NOT a re-skin of a prior build's particles. Renders at z-0.
- **Layer 2 — [BrandName]Canvas.tsx (custom canvas).** Original brand-mark visual concept per build. NOT a re-implementation of Pattern #28 5-phase (Helen Grondin), Pattern #31 LogoParticles (Gray Method), Pattern #36 chaos→converge→explosion (JCM Graphics), or any other prior canvas concept. Inspiration: OK. Re-implementation: build failure. Lives in the right panel of the two-column hero split. Container: `position: relative`, explicit height `clamp(340px, 50vw, 540px)`. Canvas fills container with `position: absolute; inset: 0`.
- **Layer 3 — Framer Motion stagger text.** H1 first, subheadline at 0.15s, CTAs at 0.3s. z-10.

**Selection process for Architecture A (non-negotiable — prevents iteration waste):**
1. Read design-system.md Section 8 + the business type.
2. Brainstorm 10 conceptually distinct visual metaphors tied to this specific business niche. (10 particle-system color variations is ONE concept, not 10. Different metaphors only.)
3. Spawn a harsh critic agent to score all 10 on: niche relevance, visual impact, technical feasibility, **originality vs. prior Optimus builds (Originality Rule)**, uniqueness. Critic picks ONE winner with written rationale.
4. Build ONLY the winner. No pivots mid-implementation. If the winner produces TypeScript errors, runtime errors, or mobile-overflow issues requiring >2 fix commits, HALT and report `[FALLBACK-REQUIRED: <reason>]` — do not autonomously switch.

**Reference implementations** (study approach + responsive math; do NOT clone the visual):
- tonyrosa777-ops/Sylvia-Rich-Hungary-Consul-NE (gold dust + coat of arms)
- tonyrosa777-ops/where-2-junk (junk/debris particles)
- tonyrosa777-ops/Placed-Right-Fence (forge ember extrusion)

### Architecture B — Movie header (MP4 cinematic backdrop) — DEFAULT where the business has a photographable subject

- **Layer 1 — Full-bleed `<video autoplay loop muted playsinline>`.** Cinematic asset that conveys what the business *does* or *where they operate*. Original composition + subject + lighting per build (no two builds share the same shot). Pipeline:
  - **Default tool (post-2026-05-17 pilot): Higgsfield AI via official MCP** at `https://mcp.higgsfield.ai/mcp`. Single platform, generates still (Soul/Flux) + animates to video (Cinema Studio / Kling / Veo 3) in one programmatic flow. Cinema Studio preset for an editorial register with a real, readable camera move (steady push-in or pull-back) — never a static standstill (see the pre-generation gate below).
  - **Fallback** (if Higgsfield MCP unavailable or pilot regresses): fal.ai (`flux-pro/v1.1`) for still + Kling AI (web UI) for image→video animation. Manual two-tool pipeline.
  - Heavy gradient/tint overlay for text contrast. Encode mp4 + webm pair for cross-browser. Include poster image for LCP.
- **Layer 2 — Brand mark watermark (optional).** Subtle wordmark or logo treatment, not a full canvas animation.
- **Layer 3 — Framer Motion stagger text.** Same H1 + subhead + CTAs pattern as Architecture A.

**Selection process for Architecture B:**
1. Read design-system.md Section 8 + Section 12 (Psychological Foundations).
2. Brainstorm 5 conceptually distinct compositions of cinematic shots that convey the business's product, environment, or moment-of-use. Subject + lighting + camera angle + mood — all original per build.
3. Spawn the harsh critic agent: score on niche relevance, visual impact, **originality vs. prior Optimus builds (Originality Rule)**, brand-axes fit, looping ergonomics.
4. Build the winner via Higgsfield (or fallback). 10-second seamless loop, 1080p, audio stripped.

**Architecture B pre-generation gate (MANDATORY — it is the default now AND it spends credits).** No video credit is spent until the human approves a movie-hero plan. Assemble and present:
1. **≥3 inspiration images.** Either the human provides ≥3 reference/scene images, OR the agent generates ≥3 candidate stills on a 0-credit image model (Flux 2 / Nano Banana Pro — free, unlimited on Plus) for the human to choose from. Never animate a single unreviewed still.
2. **A camera move per shot — steady zoom-in (push) or zoom-out (pull)** (or a documented dolly/crane). **A static standstill clip is BANNED:** a near-still "video" reads as a frozen photo and wastes credits (the Goddu v1 failure). Motion must read in the first 1-2 seconds.
3. **Transition ideas** for any multi-shot movie (crossfade, warp/tunnel, match-cut) — decided up front, not improvised at stitch time.
4. **Human approval** of the assembled plan (the ≥3 images + per-shot camera move + transitions + a credit estimate). HALT here. The ONLY manual touchpoint is providing the 3 images OR approving the AI's 3 images + camera/transition ideas; everything after approval — still finalize, simulation, video gen, stitch, encode, Hero.tsx wire-in — runs step-by-step automatically. Full workflow: the `/optimus-higgsfield-hero-video` skill + [knowledge/patterns/higgsfield-movie-hero-pipeline.md](knowledge/patterns/higgsfield-movie-hero-pipeline.md) (Pattern #80).

### Shared rules across both architectures

**H1 = siteConfig.tagline always, with shimmer.** The tagline IS the H1 — emotional hook copy goes in the subheadline, never the H1. The H1 always receives `.hero-shimmer` (amber/gold for warm brands) or `.hero-shimmer-sage` (sage/white for cool/green/neutral brands).

**Hero text must always be readable.** Hero headings + body always use `color: var(--text-primary)` (#f5f5f5 on dark builds). If background is dark and text is dark, it's a build failure — can you read every word without highlighting? On Architecture B (movie-hero), gradient overlay must achieve 4.5:1 contrast minimum against text.

**Primary CTA is always booking.** Drives directly to the booking calendar ("Book Your Free Estimate," "Schedule Service," "Book Now"). NEVER "Call Now" — phone CTA belongs in the nav bar, not the hero. Never "Learn More" or "See Our Work."

**Secondary CTA is always the quiz.** Links to `/quiz` with label from `hero.ctaSecondary`. Never a webinar, info session, events page, or external link.

Both CTAs funnel to booking. Primary → calendar directly. Quiz → qualifies → surfaces calendar on result screen. Two paths, same destination.

## Always-Built Features Rule
Every project ships with ALL of the following, no exceptions, no client-by-client decisions:

**Pricing Page (sales tool — deleted before launch)**
Built in Phase 1. If the sweep completes without a /pricing page, that is a build failure.
In the nav bar throughout the entire build and demo process.
Deleted as part of the pre-launch audit — it is an Optimus sales tool, not a client deliverable.
The pre-launch-auditor agent flags /pricing still existing as a hard FAIL.

Nav display: the "Pricing" link renders in amber with a ⬥ marker (e.g. `⬥ Pricing`) so it is
instantly visually distinct from client-facing nav items. This signals to anyone viewing the demo
that it is an internal tool, not a page the client owns.

Fixed Optimus pricing structure — same on every build, never customized per client:
- Starter: $1,500 — core pages + canvas+SVG animated hero + FAQ page
- Pro: $3,000 — Starter + blog architecture, quiz lead capture, booking calendar,
  gallery page, testimonials page (MOST POPULAR — this is the sell)
- Premium: $5,500 — Pro + shop (anchors Pro as reasonable, never gets a badge)

Pro gets the "Most Popular" badge. Starter and Premium are anchors.
Premium never gets a badge — its job is to make $3,000 feel reasonable.

**Client-facing feature names (use these exact labels — this is a sales page):**
- "Automated Booking Calendar" — NOT "inline booking calendar" or "custom calendar"
- "Lead-Capture Quiz" — NOT "interactive quiz" or "quiz funnel"
- "Professional Blog" — NOT "blog architecture" or "Sanity blog"
- "Branded Merch Shop" — NOT "shop scaffold" or "Printful integration"
- "Testimonials Showcase" — NOT "testimonials page"
- "Photo Gallery" — NOT "gallery page"
Technical names describe what we build. Client-facing names describe what they get.

**Never include on pricing page:**
- "Deposit," "upfront," or any payment-split language. The price is the price.
  Anthony offers deposit splits verbally as a backup close — it is never on the page.
- Any Google service on any tier — not "Google Business Profile optimization," not
  "Google Ads setup," not "Google Analytics," not any Google product. Optimus does
  not offer Google services. If the word "Google" appears on the pricing page, it is
  a build failure.

The pricing page always contains:
1. Three tier cards (Starter / Pro / Premium) with feature lists — price only, no deposit math
2. ROI Calculator — two sliders (average job/project value + clients per month) + package selector
   → outputs: monthly revenue, break-even timeline, 12-month ROI per tier
3. Full comparison chart — feature rows grouped by category, checkmarks per tier
   Categories: Foundation / Conversion / Content & SEO / Commerce / Support
4. CTA on each tier that opens the booking calendar inline (never a link away)

**Interactive Quiz**
A scored lead funnel with typed output — not a contact form with extra steps. The quiz
computes a result archetype, shows that personalized result on screen instantly, and calls
the user to book a one-on-one with the human right there — the inline BookingCalendar sits
directly below the result. The booking step is the capture: the quiz itself collects no name
or email and sends no results email. (Full rationale in "There is no email gate phase" below.)

**The quiz is a full-page archetype experience (the standard).** A dedicated `/quiz` route that is its own full-screen world — immersive ambient background (a hero-grade particle stack over a low-opacity brand image on a dark/tinted-non-white base, never flat white), stripped chrome (wordmark + one back link, NO full nav), a centered intro + progress bar, and 5-7 auto-advancing question slides. The result screen mirrors the visitor back to themselves so it reads as recognition, not a sales line: a recognition eyebrow ("Perfect for you"), a NAMED archetype headline, and a body that names their situation/problem back and asserts fit — then the inline BookingCalendar to book the pro. The "we know you / we know your problem / we're the right people" is built through MIRRORING (question voice + each option's `detail` sub-copy + the named archetype), never stated outright. Architecture source: Enchanted Madison `/find-your-escape`. Full standard: [knowledge/patterns/full-page-archetype-quiz.md](knowledge/patterns/full-page-archetype-quiz.md).

**Architecture — two layers, fully decoupled:**

Data layer (`src/data/quiz.ts` — all quiz logic, zero UI dependency):
- `QuizType` — 4 result archetypes named for THIS brand's actual audience segments. Read `initial-business-data.md` and `market-intelligence.md` before writing these. Never copy archetypes from a prior build.
- `QUIZ_QUESTIONS` — 5-7 questions, each with 3-4 answers; every answer is `{ label, detail, type }` where `detail` is a sub-line that mirrors the visitor's situation back to them (most of the "we get you" is built here)
- `QUIZ_RESULTS` — keyed by `QuizType`: a recognition `eyebrow` ("Perfect for you"), the archetype `name`/headline, `body[]` paragraphs that name the visitor's problem back + assert fit, and recommendedProgram { name, href, reason }
- `scoreQuiz(answers: QuizType[]): QuizType` — counts type occurrences, returns the highest; deterministic, pure, testable

UI layer (`src/app/quiz/QuizClient.tsx` — 3 phases via single `phase` state):
1. **intro** — hook headline + "Start the quiz" CTA
2. **question** — 8 questions rendered one at a time via `questionIndex` (0–7)
   - Each answer click → sets `pendingAnswer` for 400ms: selected answer glows brand primary, others dim to 30% opacity → auto-advances
   - On Q8 (last question): same 400ms timeout → `scoreQuiz(newAnswers)` → sets `resultType` → advances directly to results. No interstitial.
   - Back navigation → slices `answers` array to discard future answers, re-highlights the saved answer for that question
   - `direction` (1 or -1) → AnimatePresence x-offset: forward slides right-to-left, back slides left-to-right
3. **results** — the recognition payoff: recognition eyebrow → NAMED archetype headline → body that mirrors their problem back + asserts fit → recommended program card, then `<BookingCalendar />` inline directly below — never a link to /booking. It must read as "we know you," achieved through question voice + option `detail` copy + the named archetype, never by saying it. The user typed themselves, saw themselves in the result, and the calendar is right there. One decision, one click. (No `contact`/email phase — the last question auto-advances straight here.)

There is no email gate phase. No name/email is collected by the quiz. Calendly's booking
form collects name and email as part of its own flow — nothing is lost. The friction wall
of an email gate at peak motivation is the worst possible place to ask for anything.

No `/api/quiz` email route. The client is notified of bookings through Calendly's own
booking confirmation notifications — not through a separate quiz API call.

Quiz CTA placement — two mandatory locations:
1. Site header: "Take the Quiz" button always visible in nav, always routes to /quiz
2. Homepage CTA block: full section that launches the quiz (links to /quiz page — not inline)
Never omit the header CTA. It is the highest-visibility quiz entry point.

Question count: 5-7 is the standard. Enough signal to type the user cleanly AND to make the
archetype result feel personally earned (EM's 4 is too thin to earn a credible "we know you";
8 over-taxes and compounds drop-off). Use the minimum within 5-7 that types cleanly. The
auto-advance glow buys back some engagement time, but drop-off still compounds with every
extra question.

Reference implementations: Enchanted Madison `/find-your-escape` (full-page architecture +
archetype-results psychology — drop its email-gate `contact` step) + tonyrosa777-ops/gray-method-training
(no-gate scored funnel). Full standard: [knowledge/patterns/full-page-archetype-quiz.md](knowledge/patterns/full-page-archetype-quiz.md).

**Inline Booking Calendar**
Custom-built calendar UI — a date picker that looks completely native to the site.
Uses the site's brand colors, typography, and design tokens. Not a Calendly iframe.
Under the hood, it calls the Calendly API to fetch available slots and submit bookings.

Architecture:
- `/api/calendly/slots` — GET, calls Calendly API for available times on a given date
- `/api/calendly/book` — POST, submits a booking via Calendly API
- `CALENDLY_API_KEY` — server-side env var (never NEXT_PUBLIC — key must stay server-only)
- `NEXT_PUBLIC_CALENDLY_EVENT_TYPE_URI` — the Calendly event type URI (public, safe to expose)
- Custom `<BookingCalendar />` component: month grid → date selection → time slot picker → confirm form

The component is 100% branded: brand-color selected states, brand font, brand button style.
A user looking at it should not be able to tell it uses Calendly under the hood.

Lives on a dedicated /booking page AND as a homepage teaser section.
NEVER implemented as an href link or Calendly iframe redirect.

Demo mode: if `CALENDLY_API_KEY` is not set, render seeded fake availability (deterministic
hash of date → available times) so the calendar is fully interactive during demo.
A blank or broken calendar kills the demo. A working calendar closes the sale.

**Testimonials Page**
Always built as a core page at /testimonials. Always ships with 36 testimonials.
Never conditional. Never "use what the client has." Write all 36.

Testimonial writing rules (non-negotiable):
- Written in the voice of the target audience from initial-business-data.md/design-system.md
- 36 total. Written by the content-writer agent from scratch, grounded in audience psychology.
- Any real testimonials the client provides are included and count toward the 36.
  Remaining slots are written to match the same voice and specificity.
- Paginated 9 per page on the /testimonials page (4 pages total = 4 × 9 = 36)
- Grid is always 3 columns × 3 rows — this makes every page a complete, consistent square.
  NEVER use 8 per page: 8 in a 3-col grid = 2 full rows + 2 orphans = broken layout on all 4 pages.
  9 per page is the only number that fills 3 columns perfectly. This is non-negotiable.
- ZERO em dashes (—) in any testimonial. Use commas, periods, ellipses only.
- Human tone: short sentences, specific details, sounds like a phone review, not a press quote.
- Vary by: service type, outcome, persona, and length (2 sentences to 4 sentences)

Homepage testimonials section: shows 3-4 featured quotes + "See All Testimonials" → /testimonials.
Page layout: featured quote full-width → paginated grid (9 per page, 3-col × 3-row) → filter by service → booking CTA.

**Blog**
9-10 articles minimum. SEO and AEO foundation. Always built. See Phase 7 in build-checklist.md.

**Shop**
Always scaffolded on every project. The scaffold is built whether or not the client bought Premium.
The decision gate runs AFTER scaffold — not before.

Reference implementation: C:\Projects\andrea-abella-marie\src\

Required files (scaffold on every build):
- src/lib/cart.tsx — CartProvider + useCart (localStorage-persisted cart state)
- src/components/CartDrawer.tsx — slide-in drawer, quantity controls, subtotal, checkout CTA
- src/lib/printful-seeded-products.json — 10-15 seeded products (name, price, category, preview image)
- src/lib/printful.ts — Printful API client (reads PRINTFUL_API_KEY from env)
- src/app/api/printful/products/route.ts
- src/app/api/printful/variants/[id]/route.ts
- src/app/api/stripe/checkout/route.ts
- src/app/api/stripe/webhook/route.ts
- src/components/ShopContent.tsx — product grid, category filter, variant picker, seeded fallback
- src/app/shop/page.tsx
CartProvider and CartDrawer wired in layout.tsx.

Seeded fallback rule (non-negotiable): ShopContent fetches /api/printful/products and falls back
to printful-seeded-products.json on any error. The shop must render a real-looking product grid
during demo with zero Printful credentials. An empty grid kills the demo.

Decision gate (after scaffold):
- Client bought Premium → wire PRINTFUL_API_KEY + STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET
- Client did not buy Premium → delete all shop files from the list above, remove from nav + sitemap

These are built in every Phase 1 agent sweep. They are never optional, never deferred,
never listed as "if applicable." If a phase sign-off doesn't include all of them: it is not done.

## Homepage Section Architecture Rule
Four requirements govern homepage section architecture: animation depth by page type, purpose-level deduplication, dark/light tone alternation, and layout-archetype variety.

### Animation depth
The full hero treatment — Architecture A's 3-layer stack (HeroParticles + BrandCanvas + stagger text) OR Architecture B's full-bleed movie header — is **homepage hero only**. Every other page gets ambient effects only — never the full hero assembly.

Per-page minimums (never static flat):
- `/services` + individual service pages: rising ash particles or subtle twinkle canvas behind the page header.
- `/testimonials`: shimmer text on featured quote header + subtle twinkle/ash particles. Booking CTA teaser = breathing orb or gradient animation.
- `/blog` index: shimmer overlay or animated gradient on featured post hero header.
- `/about`: SlideIn on stats + photo. FadeUp on section headers.
- `/contact` and `/booking`: breathing orb behind CTA header.
- `/quiz`: slide left/right transition between each step.

Ambient effects defined:
- Rising ash: ~20-30 particles drifting up and fading (not the 145-particle hero system).
- Subtle twinkles: occasional 4-point glimmer flashes, low density.
- Shimmer text: `.hero-shimmer` or `.hero-shimmer-sage` on the page H1 — always.
- Breathing orb: 1-2 radial gradient blobs, CSS-only, 12s cycle.

Before marking any page complete: scroll through at full speed. If it feels flat compared to the homepage, add ambient effects. A site with one animated page and seven static pages is not a luxury product — it loses the sale the moment the client clicks past the hero.

### Purpose-level deduplication
Adjacent sections must each serve a distinct PURPOSE and deliver a distinct MESSAGE. Two sections that both say "ready to [action]?" or both push the same CTA or both frame the same emotional beat are duplicates — even with different background colors. This is a content architecture failure, not a styling issue.

Before building: for each pair of adjacent sections ask "If a visitor scrolled past these back-to-back, would they feel they just read the same thing twice?" If yes → merge one into the other, replace with a different section type (social proof, stats, process steps, FAQ preview), or reposition with 2+ unrelated sections between.

Always-duplicate patterns that must never be adjacent:
- Two CTA sections ("Ready to X?" / "Ready to Y?" / "Let's get started" / "Book now").
- Two testimonial-style sections.
- Two sections both leading with a question headline and ending with the same button.
- A "contact us" section directly above or below a "book now" section.

One CTA block at the bottom of the homepage is sufficient. Mid-page conversion nudge → use the quiz CTA (different format, different intent), not another "Ready to...?" block.

### Layout-archetype variety (the layout axis)
Tone alternation and purpose dedup are not enough: a page where every section is a centered stack or a uniform card grid reads as a template even when the tones alternate perfectly. So a THIRD content axis governs the homepage (and every multi-section page): **every section is assigned a distinct layout archetype, and no two adjacent sections share one.**

Run the **Layout Architect** (Pattern #102, [knowledge/patterns/section-layout-archetype-catalog.md](knowledge/patterns/section-layout-archetype-catalog.md)): for each section, generate 3 candidate archetypes from the catalog grounded in the section's purpose + brand personality axes (design-system.md §8) + available imagery, then pick one — described by its **hierarchy / spacing / flow / balance** — enforcing that it differs from the archetype directly above AND below it, keeps ONE clear focal point, degrades to a clean single column at 390px, and is not a pixel-lift of a prior build (Originality Rule). The **centered stack and the uniform card grid are RATIONED** (centered stack ≤2 per page for CTAs / trust strips; a peer-equal card grid only where items are genuinely equal — e.g. the /testimonials 3×3 page — and even then vary the page-level frame).

This is the generative tool that [knowledge/patterns/editorial-composition-true-alternation-decisive-imagery.md](knowledge/patterns/editorial-composition-true-alternation-decisive-imagery.md) (Pattern #96, "cards are the lazy answer") was missing — #96 is the post-hoc taste verdict; the Layout Architect is the up-front process that prevents the failure. design-synthesizer §4 seeds the per-section archetype; the rhythm-map comment block records it in the Layout column.

### Dark/light alternation
Homepage alternates background tones. Zero adjacent sections may share the same background tone — every transition shifts tone.

Before building: write the full section order as a comment block at the top of `app/page.tsx` with FOUR columns — section name, dark/light, purpose (empathy, social proof, education, conversion, commerce, content preview, etc.), and layout archetype (from Pattern #102). No two adjacent sections may share the same purpose OR the same layout archetype — this catches duplicate CTA sections that color alternation misses, and the all-centered-stack / all-card-grid sameness that tone alternation misses. **The rhythm map MUST include the two fixed bookends — the nav at the top and the global footer at the bottom — because they are present on every page and the seam between the last content band and the footer is part of the alternation.**

Example rhythm map (note the bookends):
```
// [Nav]          — light — fixed bookend (chrome)            → chrome
// Hero           — dark  — conversion (primary + quiz CTA)   → Z-pattern hero (#8)
// Pain Points    — light — empathy                           → held title + hairline rows (#5)
// Services       — dark  — education                         → bento grid (#3)
// Stats          — light — social proof                      → asymmetric split (#1)
// Testimonials   — dark  — social proof (not adjacent Stats) → staggered cards (#9)
// Quiz CTA       — light — conversion (mid-page nudge)       → pulled statement (#7)
// Blog Preview   — dark  — content preview                   → editorial / magazine (#4)
// Shop Teaser    — light — commerce                          → full-bleed media + offset (#2)
// Booking        — light — conversion (final, opposite ftr)  → centered stack (#12, rationed)
// [Footer]       — dark  — fixed bookend (navy)              → chrome
// Layout column: no two adjacent sections share an archetype (8,5,3,1,9,7,4,2,12 — all distinct). Pattern #102.
```

**Fixed bookends — design every page's rhythm BACKWARD from the footer.** The nav (top) and footer (bottom) appear on every page, so per-page alternation must be designed around them, not page-by-page in isolation. Pick the footer tone ONCE, globally (Optimus default: a navy `.section-dark-static` footer — the premium anchor), then require: **every page's LAST content band is the OPPOSITE tone of the footer** (e.g. navy footer ⇒ every page ends light), and no two adjacent bands — counting nav and footer — share a tone. **Flipping one band's tone to fix a seam CASCADES** (it collides with the neighbor), so a same-tone seam is fixed by section-COUNT PARITY, not a one-line recolor: full tone inversion (even-count page ⇒ dark header … light close), a count change, or merging two same-tone tail bands into one section (e.g. an odd-section niche merges its FAQ + closing CTA into one light band; a blog post with FAQs merges Related + CTA into one light band after the dark FAQ). This is the discipline behind a client's "make sure there's a proper amount of sections so it alternates with the footer." See [knowledge/patterns/footer-anchored-site-wide-alternation.md](knowledge/patterns/footer-anchored-site-wide-alternation.md) (Pattern #98) + [knowledge/errors/global-footer-tone-not-counted-in-page-alternation.md](knowledge/errors/global-footer-tone-not-counted-in-page-alternation.md) (Error #79).

**No flat solid backgrounds. Ever. Radial gradients only. No white, ever.** Three hard standards on every section background, on every page:

1. **Radial gradients only.** Every section base is a multi-stop **radial** gradient. No flat/solid fills, no linear gradients, no conic, no mesh. Radial reads as light/glow/depth; the others read as flat or as a generic "AI gradient."
2. **No white (or near-white) backgrounds — no matter what.** Never `#fff`, `#fafafa`, or any near-white base on any section, any page. "Light" sections use a **tinted non-white** base (warm bone/taupe or cool slate tint, still clearly lighter than the dark sections) so dark/light alternation holds without a single stark-white band. A white section on a luxury-positioned site reads as a default template. This is a design-system constraint: the light base tokens (`--bg-base` / `--bg-elevated`) must be DEFINED as a tinted non-white in design-system.md §2 + globals.css.
3. **Every section carries its OWN ambient motion** — each section gets a section-specific effect (rising ash, electric bolts, drifting embers, breathing radial orbs, twinkles, grain shimmer), DISTINCT from the sections directly above and below it, within the 3-active-layer performance budget. Not the same orb repeated down the whole page. A flat, still, or white section reads as unfinished.

Two background tones (both **radial gradient + their own motion**, never flat, never white):

- **Dark:** `background: var(--primary)` (deep navy/charcoal) as the base. Overlay a multi-stop **radial** gradient (brand accent or warm neutral, 0.05-0.12 alpha) with subtle drift via CSS `@keyframes` on `background-position` or a transformed gradient layer. Cards: `rgba(255,255,255,0.04)` bg, `rgba(255,255,255,0.08)` border. Text: `var(--text-primary)`.

- **Light (tinted, never white):** base is a **non-white tinted** token (`--bg-base` / `--bg-elevated` resolving to a warm bone/taupe or cool slate tint — NEVER `#fff` or near-white). Overlay a multi-stop **radial** gradient (brand accent or muted neutral, 0.04-0.08 alpha) with the same motion treatment. Reads clearly lighter than the dark sections so alternation holds, but no band is ever stark white.

**Motion vocabulary — every section picks its OWN, distinct from its neighbors; do not stack more than one background-motion layer per section:**
- **Breathing radial orbs** — 1-2 radial blobs, CSS-only, 12s cycle (scale + opacity).
- **Radial drift** — the radial gradient's center animates slowly across `background-position`, 20-30s cycle. (Replaces the retired mesh/conic sweeps — banned under radial-only.)
- **Grain shimmer** — radial gradient + animated fine-grain noise overlay, 8s loop.
- **Rising ash / drifting embers** — ~20-30 particles drifting up and fading (canvas or CSS), warm brands.
- **Electric bolts / energy arcs** — short canvas spark/arc flashes, low density, for energetic or tech brands.
- **Twinkles** — occasional 4-point glimmer flashes, low density.

Adjacent sections must use DIFFERENT effects. **Mesh and conic gradients are banned** (radial-only standard above); the old "mesh drift" and "aurora sweep" background options are retired.

**Static-gradient exceptions (still a gradient, no motion):**
- Long-form text sections: blog article bodies, legal/privacy/terms, FAQ answer blocks.
- Pricing comparison tables — focus belongs on the rows, not the background.
- Form-dense sections: signup, contact, booking details.
Never flat even here. Only motion turns off, not the gradient.

**Performance budget — non-negotiable:**
- Maximum 3 active motion layers visible in any viewport simultaneously. The hero counts as 1 (its particle canvas or movie video + ambient orb). Count every `@keyframes` background layer toward the limit.
- CSS-only implementation for section backgrounds. Never JavaScript-driven. Canvas is reserved for hero + intentional interior-page ambient effects per the Animation depth subsection above.
- GPU-cheap properties only: `transform`, `opacity`, `background-position`. Avoid `filter`, `backdrop-filter`, `blur` on animated layers.
- Test at 390px mobile — if FPS drops below 50 on a mid-range device, reduce motion layer count before shipping.

**Accessibility — non-negotiable:**
- All motion MUST respect `@media (prefers-reduced-motion: reduce)` by degrading to the STATIC form of the same gradient. Never degrade to a flat color.
- Motion must not exceed 0.3Hz at peak (one visible cycle per 3+ seconds minimum). Faster reads as "loading spinner," not "ambient luxury."

**Dark/light alternation still applies.** Gradient + motion does not replace the purpose-level dedup and dark/light tone alternation rules — both still enforced. No two adjacent sections share the same tone; no two adjacent sections share the same purpose.

See [knowledge/patterns/luxury-gradient-backgrounds.md](knowledge/patterns/luxury-gradient-backgrounds.md) for the full implementation recipes (breathing orb / mesh drift / aurora sweep / grain shimmer), CSS snippets, and common mistakes to avoid.

Plan the rhythm first. Fixing alternation after the fact costs 3-5 refactor commits. If a section is added or reordered later, update the rhythm map and verify no adjacency clash.

Reference pattern: `knowledge/patterns/homepage-dark-light-section-rhythm.md`. Gallery/photo sections should almost always be the light (tinted, non-white) tone — dark backgrounds compete with images, and a soft tinted base sits behind images better than stark white (which is banned anyway).

## Conversion Flow Rule
Never embed third-party redirects that take users off the garrettpartridge.com domain.
All conversion flows (booking, scheduling, purchase, inquiry) must be embedded
inline or iframed with seamless visual integration. Approved conversion tool:
Calendly. Every extra click costs conversions. Every domain redirect
costs trust.

## SEO Rule
Every page must include: semantic HTML5 structure, unique title tag, meta
description, Open Graph tags, ProfessionalService schema markup, crawlable text
(zero content locked in images or iframes), and proper heading hierarchy
(one H1 per page).

Site-level, every build also ships `sitemap.ts`, `robots.ts`, and `/llms.txt`
(generated from `site.ts`, served `noindex`). `llms.txt` is AI/agent-readability
**hygiene** — a Business-to-Agent convenience map for IDE/agent tools — NOT a ranking
or AI-citation signal (major answer engines don't fetch it; Google compares it to the
discredited `keywords` meta tag). Ship it as a cheap default; never sell it to a client
as a search-visibility win. Mechanics: seo-aeo-specialist.md Step 6.5; rationale:
`Optimus Academy/concepts/llms-txt.md`.

## Canonical Positioning & Entity Identity Rule
Two related standards govern how a build expresses the client's identity. Both are SEO/AEO **findability** requirements, not cosmetics — for a personal brand, findability is an entity/identity problem *before* it is a ranking problem.

**One canonical positioning string, appearing once per surface.** Lock a single name + positioning headline at intake (e.g. `Veteran Resilience Coach | Nervous System Regulation Specialist | Speaker`). That exact string is the source of truth and must read byte-for-byte identical everywhere it appears: site `<title>` / metadata, hero, footer subtitle, About bio lead, AND the client's live LinkedIn / Instagram / Facebook / YouTube / X / TikTok headlines (the client owns the social side — hand them the exact string to paste). Inconsistent positioning across surfaces is the #1 reason a personal-brand client is invisible for their own name.

**No double-branding.** The brand name appears ONCE per title. Do NOT add a Next.js `title.template` (`"%s | Brand"`) when pages already embed the brand in their own titles — it double-brands (`Services | Brand — … | Brand`). One canonical string, one brand mention per surface. Same single-source principle as the per-page title rule (Pattern #93).

**Entity identity is a default deliverable, not a launch retrofit.** Every build ships a site-wide `Organization` (or `ProfessionalService`) JSON-LD node whose `sameAs` array links the client's live social profiles. Personal-brand / solo-operator builds (coach, consultant, agent, attorney, therapist, speaker, creator — anyone where the *person* IS the business) additionally ship a linked `Person` node (`Person.worksFor` ↔ `Organization.founder` cross-referenced by `@id`), so Google's Knowledge Graph and LLM entity resolution merge the scattered web presence into one citable identity. The `sameAs` URLs must be byte-exact to the live profiles. This is scaffolded upfront in Phase 1 (`src/components/StructuredData.tsx`), never bolted on at launch.

Full pattern: [knowledge/patterns/cross-platform-entity-consistency-sameas.md](knowledge/patterns/cross-platform-entity-consistency-sameas.md) (Pattern #100). The launch-readiness audit (Pattern #91, Agent 3) verifies cross-platform consistency + the rendered `sameAs` graph before public traffic. Triggering build: Andrea Abella Marie (June 2026) — shipped with none of this, retrofitted post-launch.

## Page Wiring Rule
Any new route or page must be added to navigation and sitemap.ts in the same commit. Never create a page without connecting it.

## Placeholder CTA Rule
"Coming soon" or static CTA boxes are not acceptable phase sign-offs. Every primary
conversion flow must have a demo-mode interactive component before the phase is marked
complete — embedded calendar, mock booking widget, or form with success state.
Flag any static placeholder as a blocker and propose the interactive component before closing.

## Generated Assets Rule
Any script that outputs files into /public must commit those files as part of the
same task commit. Generated images, videos, and data files are never a separate
follow-up step. Generated assets are part of the task that created them.

## Prospect-Journey Conversion Audit Rule (Pre-Ship — Mandatory)
Every build runs a structured **prospect-journey conversion audit** before the multi-breakpoint browser audit. A read-only agent role-plays 3-5 research-derived prospects landing on the site cold and narrates each one's full journey: entry mindset, the exact route they take (which sections they read, which links they click), their candid first-person thoughts and friction at every step, where they feel "this is for me" vs "this isn't for me," and a blunt convert-or-bounce verdict plus the single biggest fix.

This is the FUNNEL-level complement to the Visual QA browser audit below. The browser audit asks "does THIS screen convert?"; this asks "does each real AUDIENCE find a path through the site and convert, or leak?" Both wear the prospect hat (Operating Mindset Rule — Two Hats). Run THIS first, once the IA and real copy exist, so its structural fixes (new audience pages, re-routing, de-repelling copy, a persona selector) get verified by the browser audit afterward.

Non-negotiables:
- **Personas are derived from research, never imagined.** Read market-intelligence.md + initial-business-data.md + any client transcripts. Include every primary target segment AND at least one under-served or edge audience the site might be ignoring — that edge persona is where the biggest revenue leak usually hides. (On Ead Financial it was the solo/S-corp filer the FAQ literally told to use FreeTaxUSA — the exact audience the owner wanted, actively repelled.)
- **Simulate against the ACTUAL rendered copy** (read site.ts/components, or walk the live site with Playwright), not assumptions. Garbage personas or invented copy = a useless audit.
- **A build is not conversion-complete** until every research-derived persona has a clear "this is for me" path to the primary conversion, and no audience the business WANTS bounces on repelling copy or a dead-end route. The output is a ranked conversion/IA fix list with the single highest-leverage change named.

What it catches that a screen-by-screen render check cannot: audience self-identification ("is this even for me?"), cross-page mis-routing, repelling copy, dead-end funnels, and the whole segment the site silently ignores. On Ead it found the niches convert (~80-85%) while general-SMB (~40%) and solo/S-corp (~15%) leaked, and it drove the entire hub-and-spoke restructure.

Full trigger-prompt template + the worked example (4 personas, the verdicts, the restructure it drove):
  C:\Projects\Second Brain\Wealth\Optimus\knowledge\patterns\prospect-journey-conversion-audit.md

Workflow integration:
  - build-checklist.md Phase 1 step 13.5 — runs after the asset sweep, before the step-14 browser audit.
  - The senior-engineer stance for this audit is the AUDITING hat of the Operating Mindset Rule (Two Hats).
  - Re-run whenever positioning or IA changes (a new audience, a "should we broaden?" decision).

## Visual QA Rule (Pre-Ship Browser Audit — Mandatory)
No Optimus build ships — no project is marked complete, no PR is merged to
production, no demo URL is sent to the client — until a live multi-breakpoint
browser audit has been run with Playwright against the dev server. This is the
final gate. It is not optional and it is not delegable.

**Run this audit wearing the prospect's hat (Operating Mindset Rule), not the dev's.** Every screenshot gets the buyer's judgment, not a render check: can I see the whole product (not a cropped sliver)? does it look premium and credible? is the value clear fast? would I convert? "0 console errors and the image loaded" is necessary but NOT sufficient — the gate is the prospect's verdict. If you wouldn't buy from this screen, it fails the audit regardless of green checkmarks (see Error #72).

Capture is the vault-central disk script `Wealth/Optimus/tools/audit-capture.mjs` —
the Playwright MCP is retired from the audit path (Error #82). The script drives the
viewports below and writes screenshots + console/tone/overflow facts to the client's
gitignored `/audits/`; the analysis phase reads the disk facts as TEXT and loads a
single screenshot into vision only when a section is flagged. Full protocol in the
pattern doc below. The four viewports + nav drawer:
  1. Desktop 1440×900 — static + scrolled (navbar state change)
  2. Mobile 390×844 — iPhone 14/15, most common real-user viewport (first)
  3. Mobile 375×812 — iPhone SE, narrowest — catches wraps first
  4. Mobile 428×926 — iPhone Pro Max, widest single-column
  5. Mobile 390 with nav drawer open — verifies overlay, branding, CTA

Full workflow, gotchas, and exit criteria live in:
  C:\Projects\Second Brain\Wealth\Optimus\knowledge\patterns\end-of-build-multi-breakpoint-browser-audit.md

Workflow integration (all five enforcement points):
  - build-checklist.md Phase 1 step 14 — human-facing schedule, before Phase 2 Launch
  - project-prime.md Stage 1I — orchestrator execution layer, runs after Stage 1H
    (pre-launch-auditor file-level audit)
  - website-build-template.md Checklist: Before Launch → Visual QA — template reference
  - .claude/agents/launch/pre-launch-auditor.md — file-level agent emits a
    [BLOCKED-ON: Section 11 Multi-Breakpoint Browser Audit] handoff template in its
    output report, instructing the orchestrator to run the Playwright audit before
    advancing to Stage 1J /optimus-review

The pre-launch-auditor agent defers ALL visible-state checks to this audit —
file-reading agents cannot verify layout, overflow, hydration, or console noise.

The audit is ALSO re-run after every client revision batch in Phase 2 (Task 2B
in project-prime.md, step 19 in build-checklist.md) — no revision ships back to
the client without re-passing the audit.

Mandatory exit criteria before marking the audit complete:
  - 0 console errors and 0 console warnings at every viewport
  - No H1 orphan lines at any mobile width
  - No horizontal scroll at 375
  - Hero fits above the fold (eyebrow + H1 + tagline + primary CTA) at every mobile width
  - Mobile nav drawer opens, overlay is dark and opaque, closes cleanly via its inner X
  - **No flat, no white, radial-only section backgrounds at any viewport.** Scroll the full page at 1440 and 390. Every section must show a multi-stop **radial** gradient (NOT linear/conic/mesh) AND its own ambient motion effect, and NO section may have a white or near-white base. A flat fill, a white/near-white band, a non-radial gradient, or a still section = FAIL per the Homepage Section Architecture Rule → Background depth & motion subsection. (Text-heavy exception sections still require the radial gradient + non-white tinted base; only motion is waived.)
  - **Footer-anchored alternation — rendered tone string per route (not class names).** For EVERY route (not just the homepage), the rendered background of each top-level band must strictly alternate and end opposite the fixed footer. The capture script emits this as `tones-{viewport}.txt` — the luminance→`D`/`L` algorithm lives ONLY in `audit-capture.mjs` now (removed from this file to avoid two drifting copies of one algorithm; Error #77). PASS = a strictly-alternating string with NO `DD`/`LL` run and the final band (footer) the opposite tone of the band above it (e.g. home `DLDLDLDLDLD`, even niche `LDLDLDLD`, odd niche `LDLDLD`). A `DD`/`LL` run = FAIL per the Homepage Section Architecture Rule → Fixed bookends subsection — fix by section-count parity (full inversion / count change / tail-merge), never a one-line recolor. Verify on the PRODUCTION URL after deploy, not just localhost. (Pattern #98 / Error #79.)
  - **`prefers-reduced-motion` graceful degradation check.** The capture script emits `{viewport}-rm.png` (a reduced-motion pass at desktop + 390 via a `reducedMotion: 'reduce'` context). Every section must still render as a GRADIENT (not flat) with motion stopped. If any section collapses to flat color under reduce-motion, that's a FAIL.
  - **Half-Eye blur-squint pass** at every hero breakpoint — defocus (or blur) the screenshot until text is unreadable; the eye must still land on H1 → primary CTA → proof in that order. If any secondary element wins the squint, the hierarchy is inverted = FAIL. (Full method: `knowledge/patterns/end-of-build-multi-breakpoint-browser-audit.md`.)
  - Any fix applied mid-audit triggers a re-run of `audit-capture.mjs` + full re-verify of all four viewports
  - Dev server explicitly stopped with TaskStop — the capture script closes its own browser, but the Next.js dev-server background task keeps running; only TaskStop stops it

Skipping any of these = audit incomplete = build not ready to ship. No exceptions.
TypeScript says the code compiles. Tests say the logic works. Only a browser at
the right viewport width tells you the product looks right.

## Communication Rule
Be opinionated. Flag tradeoffs. Cite research. When there is a clearly better
architectural choice, recommend it with justification. When something will break
at scale, say so. Do not pad responses. Do not assume obvious tasks are complete
without verifying.

## Claude Code Operating Hygiene Rule
Three operating disciplines, adopted from the everything-claude-code (ECC) study (2026-06-04) — see `Optimus Academy/tools-tracking/claude-code-community-repos.md`:

- **Reserve the last ~20% of the context window for large/multi-page work.** On a full website build (many pages + late-stage QA + audits), don't burn the whole budget on early phases — the Visual-QA pass, the premortem, and the conversion audit at the end need headroom. If context is running low mid-build, checkpoint to progress.md and start fresh rather than degrading.
- **Security review before any commit; on an exposed secret, STOP → rotate → fix.** Never inline API keys/tokens on a command line or commit them; client secrets live only in gitignored `.env` files / Vercel env vars. This is now **hook-enforced**: `~/.claude/hooks/optimus-bash-guard.js` (PreToolUse Bash) hard-blocks `git --no-verify` / `commit -n` / `core.hooksPath=` bypasses and real-format secrets (AWS/GitHub/OpenAI/Anthropic/Google/Slack/PEM/JWT) in shell commands. If a leak already happened, rotating the key comes before any other fix.
- **Skills are the canonical capability surface; slash commands are thin shims.** When a reusable workflow emerges, encode it as a skill (per the Skill Creation Rule), not a sprawling command file. Commands dispatch to skills; the skill holds the contract. (Validates the current `/learn`, `/new-client`, `/retro`, `optimus-higgsfield-*` direction.)
- **Structured checkpoints (context-engineering).** progress.md entries and any context-handoff digest use fixed slots — `Intent / Files touched (full paths + symbols) / Decisions / Current state / Next steps` — and summarize only newly-truncated content (anchored, never wholesale-regenerate), so a checkpoint survives a context reset without drift. See `Optimus Academy/concepts/context-engineering.md`.
- **Stable-prefix / KV-cache authoring.** Keep the stable content of this layered CLAUDE.md first and byte-stable; never interpolate a timestamp or per-session value into the stable prefix — it invalidates the prompt cache for everything after it (cost + latency).
- **Surface classification.** Treat edit surfaces explicitly: LOCKED (brand tokens, pricing, merge-to-main), HUMAN-ONLY (agent-file edits — per the Agent System Rules), APPEND-ONLY (knowledge/build-log, retrospectives, progress.md), EDITABLE (component drafts, copy in site.ts). When unsure which, treat as human-only.
