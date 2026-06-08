// ============================================================
// site.ts — single source of all copy (CLAUDE.md: zero hard-coded strings in components)
// Expanded at Stage 1D by content-writer. Voice: design-system.md §7
// (executive + engineer, quiet certainty, em-dash-free, affirmative first-person).
// NO em dashes (—) in any string value. Trust-layer copy marked [DEMO COPY] per the
// premortem trust-layer integrity gate (Section 12 Patch #1): demo runs on DEMO COPY,
// public launch is hard-gated on real-or-empty.
// ============================================================

// ---------- siteConfig ----------

export const siteConfig = {
  name: "Garrett Partridge",
  url: "https://garrettpartridge.com",
  // Canonical positioning string (CLAUDE.md Canonical Positioning Rule) — keep byte-identical across surfaces
  positioning: "Fractional COO | Operations Architect | Defense Industrial Base",
  titleDefault: "Garrett Partridge | Fractional COO for Defense Manufacturers",
  description:
    "Operations architect and fractional COO for New England defense industrial base manufacturers. Standard Work 2.0, CMMC and ITAR readiness, and IT/OT alignment that turns backlog into cash.",

  // Hero (Architecture B movie header). H1 = tagline (design-system §6). Approved copy.
  hero: {
    eyebrow: "Fractional COO · Defense Industrial Base · New England",
    // H1 — the tagline, gets .hero-shimmer-brass
    tagline: "Predictable operations for high consequence manufacturing.",
    subhead:
      "When the backlog is outrunning cash and the CMMC clock is running, I install the operating system that holds. Across the IT and OT divide, before the auditor ever walks in.",
    ctaPrimary: { label: "Request a Strategic Conversation", href: "/booking" },
    ctaSecondary: { label: "Run the operational diagnostic", href: "/diagnostic" },
    microcopy: "A maximum of four concurrent engagements. Response within 48 hours.",
  },

  // Primary nav (no shop). "⬥ Pricing" is the internal sales-tool marker, deleted pre-launch.
  nav: [
    { label: "Method", href: "/method" },
    { label: "Engagements", href: "/engagements" },
    { label: "Who I Serve", href: "/#who-i-serve" },
    { label: "Insights", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "⬥ Pricing", href: "/pricing", internal: true },
  ],
  navCta: { label: "Request a Strategic Conversation", href: "/booking" },

  contactEmail: "garrett@garrettpartridge.com", // confirm at launch
  location: "Brookline, NH",
  serviceArea: "Greater Boston & Southern New Hampshire",

  social: {
    // sameAs entity graph (Pattern #100) — fill with the real live LinkedIn URL (Tuesday ask)
    linkedin: "", // [LAUNCH-BLOCKER: real LinkedIn URL]
  },
} as const;

export type SiteConfig = typeof siteConfig;

// ---------- problem (Hidden Factory / backlog-to-cash / CMMC clock as instrument readout) ----------

export interface ProblemRow {
  status: "blocked" | "warn" | "cleared";
  label: string;
  detail: string;
}

export interface ProblemSection {
  eyebrow: string;
  title: string;
  intro: string;
  rows: ProblemRow[];
}

// Loss-framed fault list (design-system §12.6, market-intel §3 Fears). Each row is an
// instrument-readout fault, mirroring the buyer's 3 a.m. fears as a control-panel.
export const problem: ProblemSection = {
  eyebrow: "Fault readout",
  title: "The faults you already feel, on one panel.",
  intro:
    "Revenue is up and the floor is busy. The trouble is everything the ERP cannot see. Here is what most defense shops are running with right now, scored the way a buyer scores a part.",
  rows: [
    {
      status: "blocked",
      label: "CMMC Phase 2 gate",
      detail:
        "Mandatory C3PAO Level 2 certification in DoD contracts begins November 10, 2026, per the DoD 32 CFR final rule. Per CyberSheath's 2025 State of the DIB report, only 1 percent of contractors feel fully prepared. A failed gate loses the prime.",
    },
    {
      status: "blocked",
      label: "Backlog outrunning cash",
      detail:
        "The order book grows while working capital tightens. AlixPartners found the aerospace and defense cash conversion cycle lengthened from 138 to 159 days between 2018 and 2022. The growth story hides a cash crisis.",
    },
    {
      status: "warn",
      label: "The Hidden Factory",
      detail:
        "Undocumented rework, tribal knowledge, and off-the-books problem solving. Armand Feigenbaum estimated this loss can reach 40 percent of total company effort. Your ERP cannot see any of it.",
    },
    {
      status: "warn",
      label: "SPRS score exposure",
      detail:
        "A wrong self-assessment score in the Supplier Performance Risk System is a false-affirmation risk. The DOJ Civil Cyber-Fraud Initiative pursues exactly this under the False Claims Act.",
    },
    {
      status: "warn",
      label: "IT and OT running as separate liabilities",
      detail:
        "MES, ERP, and SCADA sit on three networks with three owners. Each is a CMMC liability on its own. Together they are the digital thread an auditor follows, or the one that fails.",
    },
    {
      status: "blocked",
      label: "No full-time COO, founder at the limit",
      detail:
        "A full-time COO runs north of 300,000 dollars in total compensation. The founder is signing payroll, sitting the audit, and answering the prime's questionnaire at the same time.",
    },
  ],
};

// ---------- method (Standard Work 2.0 four pillars) ----------

export interface MethodPillar {
  emoji: string;
  name: string;
  plainName: string;
  description: string;
}

export interface MethodSection {
  eyebrow: string;
  title: string;
  intro: string;
  pillars: MethodPillar[];
}

export const method: MethodSection = {
  eyebrow: "The method",
  title: "Standard Work 2.0, the operating system.",
  intro:
    "Standard Work 2.0 takes the discipline of lean standard work off the production floor and applies it to the whole company, back office and shop floor alike. It runs on four pillars. Each one ties an operational mechanism to a number the owner already watches.",
  pillars: [
    {
      emoji: "🔗",
      name: "IT / OT Convergence",
      plainName: "One digital thread, not three networks",
      description:
        "I translate the tolerances on the floor into digital workflows and financial dashboards, so MES, ERP, and SCADA stop being three separate compliance liabilities and start being one auditable system. The auditor follows one thread, and it holds.",
    },
    {
      emoji: "📉",
      name: "Margin Engineering",
      plainName: "Find the Hidden Factory, convert it to cash",
      description:
        "Kaizen events aimed straight at the P&L. We map the value stream, find the rework and waste the ERP never recorded, and convert that recovered capacity into cash conversion days. The 20 to 40 percent loss Feigenbaum named becomes margin you can bank.",
    },
    {
      emoji: "🧭",
      name: "Human-in-the-Loop",
      plainName: "AI handles the drudgery, people own the judgment",
      description:
        "AI subroutines take the cognitive grunt work so technicians move up into site leadership. In a regulated environment, verified human judgment stays in the loop on every decision that touches data integrity. Automation augments the operator, it never replaces the operator.",
    },
    {
      emoji: "🛡️",
      name: "Sovereign Tier",
      plainName: "Compliance hardwired into the daily workflow",
      description:
        "I build CMMC, ITAR, and AS9100 into the work itself, so the auditor finds them already running instead of bolted on as a binder of PDFs. The digital thread is secure by design, and the controls are evidence the day the C3PAO walks in.",
    },
  ],
};

// ---------- proof (proof-of-operating-role stats + authority line) ----------

export interface ProofStat {
  emoji: string;
  value: string;
  label: string;
  note: string;
}

export interface ProofSection {
  eyebrow: string;
  title: string;
  stats: ProofStat[];
  authorityLine: string;
}

// Honest-reduction stats per premortem Patch #1. No invented numbers on Garrett's real
// name. Numbers that are not yet cleared use honest reduction or sourced market figures.
export const proof: ProofSection = {
  eyebrow: "Proof of operating role",
  title: "An operator, not an advisor.",
  stats: [
    {
      emoji: "💵",
      value: "P&L owned",
      label: "CEO and division GM history",
      note: "Signed payroll and owned the P&L as a manufacturer's CEO and as GM of a foreign subsidiary's North America operations.", // [DEMO COPY — pending client review]
    },
    {
      emoji: "🪑",
      value: "Audit chair",
      label: "AS9100 audit experience",
      note: "Sat in the AS9100 audit chair, not a slide reviewing it.", // [DEMO COPY — pending client review]
    },
    {
      emoji: "🔄",
      value: "MRP cutover",
      label: "Systems run, not specified",
      note: "Ran an MRP cutover on a live floor without losing a shipment.", // [DEMO COPY — pending client review]
    },
    {
      emoji: "⏱️",
      value: "30 days",
      label: "Operational triage to written plan",
      note: "A defensible written plan in roughly five weeks at twenty hours a week, not a deck.",
    },
    {
      emoji: "🏭",
      value: "US site stand-up",
      label: "Foreign-parent onshoring, active",
      note: "Standing up US defense manufacturing operations for a Canadian-parent subsidiary.", // [DEMO COPY — pending client review]
    },
    {
      emoji: "📐",
      value: "4 engagements",
      label: "Maximum concurrent, by design",
      note: "Capacity is the constraint and the proof. Engagements under NDA.",
    },
  ],
  authorityLine:
    "I am an engineer who has operated. I speak P&L and shop floor in the same sentence, because I have stood on the floor at 6 a.m. and answered for the number at the board the same week.",
};

// ---------- engagements (3, NO pricing) ----------

export interface Engagement {
  slug: string;
  emoji: string;
  name: string;
  tagline: string;
  forWho: string;
  whatYouGet: string[];
  how: string;
  cta: { label: "Request a Strategic Conversation"; href: "/booking" };
}

export const engagements: Engagement[] = [
  {
    slug: "operational-triage",
    emoji: "🔍",
    name: "30-Day Operational Triage",
    tagline: "The full diagnostic. A defensible written plan in thirty days.",
    forWho:
      "The owner who knows something is eating capacity but cannot name it, and needs a plan they can act on, not another opinion.",
    whatYouGet: [
      "Value stream maps and swim-lane process maps of how work actually moves, top of funnel to cash",
      "Gemba walks and targeted Kaizen events on the floor, not from a conference room",
      "Leading and lagging metric analysis across the four pillars: People and Culture, Process, Products and Services, Cash",
      "Embedded team training on data governance, pull systems, 5S, and the right use of AI",
      "A final recommendations report that names the constraint and the sequence to remove it",
    ],
    how: "Roughly five weeks at twenty hours a week, on-site for the floor work and remote for the analysis. Fixed scope, fixed deliverable.",
    cta: { label: "Request a Strategic Conversation", href: "/booking" },
  },
  {
    slug: "fractional-coo",
    emoji: "⚙️",
    name: "Fractional COO",
    tagline: "Embedded operational leadership without a full-time hire.",
    forWho:
      "The founder who is drowning in operations and cannot justify a 300,000 dollar COO, but cannot keep running the floor and the board at once.",
    whatYouGet: [
      "Ongoing operational leadership at two to three days a week, embedded with your direct reports",
      "The full Standard Work 2.0 install across the IT and OT divide",
      "Real-time SQDIP reporting and audit routines that hold the gains after I step back",
      "Executive mentorship that upskills your internal technicians into site leaders",
      "A bridge to the prime relationship, with the credibility that comes from an operator who has been upstream",
    ],
    how: "An ongoing retainer engagement. Near full-time presence in the first 90 days, then a steady fractional cadence as the system holds on its own.",
    cta: { label: "Request a Strategic Conversation", href: "/booking" },
  },
  {
    slug: "strategic-consultancy",
    emoji: "🧱",
    name: "Strategic Consultancy",
    tagline: "Standard Work 2.0 installed against a specific high-stakes problem.",
    forWho:
      "PE operating partners and leadership teams facing one defined event: forensic diligence on an acquisition, a 90-day P&L triage, or compliance hardening before a prime gate.",
    whatYouGet: [
      "Forensic operational due diligence that surfaces the risk a financial model misses",
      "A 90-day P&L triage that eliminates production variance and frees trapped working capital",
      "Compliance hardening for CMMC 2.0, ITAR, and AS9100, built into workflow rather than policy",
      "The 90-Day Strategy Formulation Framework: Phase 1 Diagnostic, Phase 2 Stabilization, Phase 3 Commercial Scale",
      "A future-state operating model the team can run after the engagement closes",
    ],
    how: "Scoped to the event. From a focused, paid, time-boxed working session up to a 30-day stint, structured firm-fixed-price against a defined deliverable.",
    cta: { label: "Request a Strategic Conversation", href: "/booking" },
  },
];

// ---------- diagnosticTeaser (single pulled statement, distinct intent from hero/booking) ----------

export interface DiagnosticTeaser {
  eyebrow: string;
  statement: string;
  cta: { label: string; href: "/diagnostic" };
}

export const diagnosticTeaser: DiagnosticTeaser = {
  eyebrow: "Self-diagnostic",
  statement:
    "Six questions name the fault you are actually fighting. The result restates your own situation back to you and points to the right starting line. No email, no follow-up sequence.",
  cta: { label: "Run the operational diagnostic", href: "/diagnostic" },
};

// ---------- capacity (two-tier ladder, no countdown) ----------

export interface CapacityRung {
  label: string;
  detail: string;
  cta: { label: string; href: "/booking" };
}

export interface CapacitySection {
  eyebrow: string;
  title: string;
  body: string[];
  fullEngagement: CapacityRung;
  consult: CapacityRung;
}

export const capacity: CapacitySection = {
  eyebrow: "Capacity",
  title: "I run a maximum of four concurrent engagements.",
  body: [
    "Strategic conversations for a full engagement are scheduled when an existing engagement reaches Phase 3. That is the real constraint, not a marketing line.",
    "If your situation is time-critical, a prime supplier letter, a CMMC audit window, an LOI in diligence, name the trigger when you request the conversation. I respond within 48 hours with a realistic timing window.",
  ],
  fullEngagement: {
    label: "Full engagement waitlist",
    detail:
      "Fractional COO and 30-Day Triage slots open as engagements reach Phase 3. Request the conversation and name your trigger. I respond within 48 hours.",
    cta: { label: "Request a Strategic Conversation", href: "/booking" },
  },
  consult: {
    label: "Time-critical? Start with a paid consult, available this week",
    detail:
      "A paid, time-boxed working session on one defined problem, available without waiting for a full slot to open. If a prime letter, a CMMC window, or an LOI is on a clock you do not control, this is the fastest way to put the constraint in front of an operator this week.",
    cta: { label: "Book a Paid Strategic Consult", href: "/booking" },
  },
};

// ---------- about ----------

export interface AboutBelief {
  emoji: string;
  statement: string;
}

export interface AboutSection {
  eyebrow: string;
  title: string;
  origin: string[];
  beliefs: AboutBelief[];
  whoWeServe: string[];
  whyUs: string[];
  credentials: string[];
  namedPrimes: string;
}

export const about: AboutSection = {
  eyebrow: "Proof of operating role",
  title: "The operator a founder calls when the prime letter lands.",
  // [DEMO COPY — pending client review] — written in the owner's voice from known facts.
  origin: [
    "I trained as an engineer and ended up running the company. Advanced manufacturing, specialty sensors, PID controllers, automation, and then the parts of the business engineers usually avoid: the P&L, the payroll, the audit chair, the board.",
    "I have been the CEO of a manufacturer and the general manager of a foreign subsidiary's North America operations. I have run an MRP cutover on a live floor and signed the front of a paycheck. That is the difference between an operator and an advisor, and this audience can tell which one is standing in front of them.",
    "I started taking engagements because I kept meeting founders with excellent parts and bottlenecked operations, surrounded by AI consultants who had never owned a number. I built Standard Work 2.0 to give those founders the operating system I wish I had been handed.",
  ],
  beliefs: [
    {
      emoji: "🧱",
      statement:
        "Foundation before transformation. Clean, secure data and documented process come before any new technology.",
    },
    {
      emoji: "🧭",
      statement:
        "Problem first, technology second. I map the value stream, find the constraint, then build the system that removes it.",
    },
    {
      emoji: "🤝",
      statement:
        "Human-in-the-loop integrity. In a regulated environment, automation augments verified human judgment and never replaces it.",
    },
    {
      emoji: "📐",
      statement:
        "Scarcity is honest. Four engagements is the real limit of doing this work at depth, so four is the number.",
    },
  ],
  whoWeServe: [
    "You own or run a 5 to 75 million dollar contract manufacturer serving defense primes, build-to-print or build-to-spec.",
    "You are engineering-led, technically excellent, and operationally bottlenecked, with a backlog that will not convert to cash.",
    "You are a PE operating partner who needs forensic operational diligence before the LOI hardens.",
    "You are a foreign manufacturer standing up US operations to qualify for defense business, with a gate closing on a schedule you do not control.",
  ],
  whyUs: [
    "Real floor-level engineering depth combined with CEO and GM P&L experience, not a slide deck and a certification.",
    "Defense industrial base specialization: ITAR, CMMC 2.0, AS9100, CUI handling, and a secure digital thread.",
    "Compliance hardwired into the daily workflow, so the auditor finds it running rather than bolted on.",
    "A scarce single operator who runs four engagements at a time, not a roster you get matched into.",
  ],
  credentials: [
    "Engineer by training, with CEO and division-GM operating history.", // [DEMO COPY — pending client review]
    "Toyota Production System and lean practice: Kaizen, Gemba, 5S, pull systems, kanban, SQDIP, value stream mapping.",
    "Working command of ITAR, DFARS, CMMC 2.0, AS9100, ISO, and CUI handling across IT and OT.",
    "Standard Work 2.0 is a proprietary framework. [MISSING: USPTO trademark serial number, display in footer once filed]",
    "[MISSING: formal certifications, PE, Lean Six Sigma belt, CMMC-RP, engineering degree discipline, pending Tuesday ask]",
  ],
  // [DEMO COPY — pending client review]
  namedPrimes:
    "Engagements with suppliers across the New England defense base are held under NDA. Named prime relationships are added here as each client clears them for publication.",
};

// ---------- faq (instrument-readout, direct-answer first sentence for AEO) ----------

export interface FaqItem {
  q: string;
  a: string;
}

export const faq: FaqItem[] = [
  {
    q: "What is a fractional COO, and how is it different from a consultant?",
    a: "A fractional COO is an embedded operating leader who runs your operations part-time, not an advisor who hands you a report and leaves. I sit with your direct reports, own outcomes against your numbers, and stay until the system holds on its own. A consultant recommends. An operator runs.",
  },
  {
    q: "When does CMMC Phase 2 actually start?",
    a: "Mandatory C3PAO Level 2 certification in DoD contracts begins November 10, 2026, per the DoD 32 CFR final rule. Phase 1 enforcement started November 10, 2025. Primes including Boeing and Northrop Grumman have already issued supplier letters demanding Level 2 readiness ahead of the deadline.",
  },
  {
    q: "How much does CMMC Level 2 cost a small manufacturer?",
    a: "Most small defense manufacturers spend roughly 100,000 to 200,000 dollars to reach Level 2, per CMMC.com. The DoD published assessment estimates put a Level 2 self-assessment at 37,000 to 49,000 dollars and a Level 2 C3PAO assessment at 105,000 to 118,000 dollars, before remediation. I build the controls into your workflow so that spend buys a working system, not a binder.",
  },
  {
    q: "What is the Hidden Factory?",
    a: "The Hidden Factory is the undocumented rework, tribal knowledge, and off-the-books problem solving your ERP never records. Quality pioneer Armand Feigenbaum estimated this loss can reach 40 percent of total company effort. The 30-Day Operational Triage exists to find it and convert it back into capacity and cash.",
  },
  {
    q: "Why will you not publish your pricing?",
    a: "Every engagement is scoped to the specific constraint, so a rate card would price the wrong thing. The 30-Day Triage is fixed-price against a defined deliverable, the fractional COO work is a retainer, and a strategic consult is a paid time-boxed session. We agree the scope and the number in the strategic conversation, before any work begins.",
  },
  {
    q: "Do you understand ITAR and CMMC, or do you subcontract the compliance?",
    a: "I work in ITAR, DFARS, CMMC 2.0, AS9100, and CUI handling directly, as part of the operating system rather than as a separate workstream. Where a CMMC IT partner is the right tool for a specific control, I bring one in and run them as one input into the system I architect. The operations layer stays mine.",
  },
  {
    q: "How fast can you start?",
    a: "A paid strategic consult is available now, without waiting for a full slot. Full engagements open as an existing engagement reaches Phase 3, because I run a maximum of four at a time. If your trigger is time-critical, name it when you request the conversation and I respond within 48 hours with a realistic window.",
  },
  {
    q: "We have an engineering team. Why would we not just do this ourselves?",
    a: "Most engineering-led shops can do the work but cannot see the constraint, because the people closest to it are inside it. I bring an outside operator's read of your value stream plus the defense-compliance fluency most internal teams have not had to build yet. The 30-Day Triage is designed precisely for a team that is capable but operationally bottlenecked.",
  },
  {
    q: "What is an SPRS score, and why does it matter?",
    a: "The Supplier Performance Risk System holds your self-assessed NIST SP 800-171 score, which primes and the DoD can see. A wrong or stale score is a false-affirmation risk, and the DOJ Civil Cyber-Fraud Initiative pursues exactly that under the False Claims Act. Getting the score right, and being able to defend it, is part of the Sovereign Tier pillar.",
  },
  {
    q: "We are a foreign manufacturer standing up US operations. Can you help?",
    a: "Yes, this is an active engagement type. I am currently standing up US defense manufacturing operations for a Canadian-parent subsidiary. The work covers the operating model, the IT and OT build, and the FOCI and compliance posture you need to qualify for US defense business inside the gate you are racing.",
  },
  {
    q: "What does backlog-to-cash actually mean for my shop?",
    a: "It means your order book is growing while your working capital tightens, because long-lead inventory and rework trap cash between the sale and the deposit. AlixPartners found the aerospace and defense cash conversion cycle lengthened by 21 days between 2018 and 2022. Margin Engineering targets that cycle directly, recovering cash conversion days you can redeploy.",
  },
  {
    q: "Do you work remotely or on-site?",
    a: "Both, and the mix depends on the work. Floor work, Gemba walks, Kaizen events, and the first 90 days of a fractional engagement need me on-site across New England. The analysis, the reporting, and the steady-state cadence run remote. I am based in Brookline, NH, and serve Greater Boston and Southern New Hampshire on-site.",
  },
  {
    q: "Is Standard Work 2.0 a framework or a slogan?",
    a: "It is a method with four named pillars and a defined delivery sequence. IT/OT Convergence, Margin Engineering, Human-in-the-Loop, and Sovereign Tier are each a set of operations, delivered through the 90-Day Strategy Formulation Framework of Diagnostic, Stabilization, and Commercial Scale. The named hooks are there so the work is memorable, not so it sounds impressive.",
  },
];

// ---------- testimonials (36, [DEMO COPY], B2B role-cited, zero em dashes) ----------

export interface Testimonial {
  quote: string;
  role: string;
  context: string;
  engagementType: string;
}

// [DEMO COPY — pending client review] — all 36 below.
// Premortem Patch #1: these render only for the demo. Public launch is hard-gated on
// >= 3 real, attributable testimonials replacing these. No invented personal or company names.
export const testimonials: Testimonial[] = [
  {
    quote:
      "He walked our floor at 6 a.m. before he said a word about strategy. By the end of the month we had a value stream map that finally explained where the cash was going. We had been blaming the wrong department for two years.",
    role: "Owner",
    context: "40-person AS9100 machine shop, southern NH",
    engagementType: "30-Day Operational Triage",
  },
  {
    quote:
      "Our prime sent the CMMC letter and I froze. Garrett did not sell me software. He mapped what we actually had and built the controls into the way we already work. The auditor found them running.",
    role: "President",
    context: "precision machining supplier to a Tier 1 prime, MA",
    engagementType: "Fractional COO",
  },
  {
    quote:
      "I expected another consultant with a deck. I got an operator who had clearly signed payroll before. He spoke P&L and shop floor in the same sentence, and my engineers stopped rolling their eyes by day two.",
    role: "CEO",
    context: "build-to-print contract manufacturer, $18M revenue",
    engagementType: "Fractional COO",
  },
  {
    quote:
      "The backlog was growing and the bank account was not. He found 14 days of cash conversion cycle trapped in rework we never tracked. One quarter later it was free.",
    role: "Founder",
    context: "aerospace components shop, central NH",
    engagementType: "Strategic Consultancy",
  },
  {
    quote:
      "We were standing up a US site to chase defense work and the gate was closing fast. Garrett ran the build like he had done it before, because he had. We qualified inside the window.",
    role: "VP of Operations",
    context: "US subsidiary of a Canadian manufacturer",
    engagementType: "Full-Time Leadership",
  },
  {
    quote:
      "As an operating partner I needed forensic diligence in three weeks, not a polite assessment. He surfaced the ops risk the financial model had missed entirely. It changed our number.",
    role: "Operating Partner",
    context: "lower-middle-market PE firm",
    engagementType: "Strategic Consultancy",
  },
  {
    quote:
      "He named the Hidden Factory in our shop on the first walk. I had felt it for years and never had a word for it. Putting a number on it is what got my partners to act.",
    role: "Co-owner",
    context: "specialty fabrication shop, MA 128 corridor",
    engagementType: "30-Day Operational Triage",
  },
  {
    quote:
      "Our MES, ERP, and SCADA were three islands and three audit headaches. He turned them into one digital thread. The CMMC prep stopped being a fire drill.",
    role: "Director of IT",
    context: "defense electronics manufacturer, southern NH",
    engagementType: "Fractional COO",
  },
  {
    quote:
      "The report was not a binder I would shelve. It named the constraint and the order to fix it. We are still working that sequence and it still holds.",
    role: "General Manager",
    context: "machined components supplier, $30M revenue",
    engagementType: "30-Day Operational Triage",
  },
  {
    quote:
      "What sold me was that he refused to oversell. He told me what a consult could do and what it could not. After being burned by growth consultants, that was the whole reason I hired him.",
    role: "Owner",
    context: "family-owned precision shop, two generations",
    engagementType: "Strategic Consultancy",
  },
  {
    quote:
      "He trained my best technicians into people who run the floor when he is not there. That is the part no software vendor ever offered us.",
    role: "President",
    context: "build-to-spec manufacturer, central MA",
    engagementType: "Fractional COO",
  },
  {
    quote:
      "We had a DFARS questionnaire we could not answer and an RFP on the clock. He walked us through which clauses actually hit our floor and which were noise. We answered it and won the work.",
    role: "Founder",
    context: "subcontractor to a defense prime, RI",
    engagementType: "Strategic Consultancy",
  },
  {
    quote:
      "Two days a week, and somehow operations got calmer than when I was doing it full time myself. He built routines that hold the gains instead of leaning on heroics.",
    role: "CEO",
    context: "$22M aerospace machine shop, NH",
    engagementType: "Fractional COO",
  },
  {
    quote:
      "The 6 I Diagnostic put words to inefficiencies I had been staring at for a decade. I signed the proposal in the room because I recognized my own shop in it.",
    role: "Owner",
    context: "contract manufacturer, southern NH",
    engagementType: "30-Day Operational Triage",
  },
  {
    quote:
      "He is the opposite of the AI hype crowd. He mapped the stream first and then told me most of what I wanted to automate did not need to exist at all.",
    role: "Founder",
    context: "sensor assembly manufacturer, MA",
    engagementType: "Strategic Consultancy",
  },
  {
    quote:
      "Our cash was trapped in long-lead inventory and nobody upstairs could see it. He made it visible on one dashboard and gave the CFO something to manage instead of fear.",
    role: "CFO",
    context: "$45M defense supplier, New England",
    engagementType: "Fractional COO",
  },
  {
    quote:
      "Post-acquisition we needed the operations to actually integrate, not just appear on a slide. He ran the stabilization phase and the two floors finally worked as one.",
    role: "Operating Partner",
    context: "PE-backed manufacturing platform",
    engagementType: "Full-Time Leadership",
  },
  {
    quote:
      "He understood ITAR without making it a separate project that stalled everything else. It was just part of how the work got built. That is rarer than it sounds.",
    role: "Compliance Lead",
    context: "ITAR-registered manufacturer, MA",
    engagementType: "Fractional COO",
  },
  {
    quote:
      "I was one audit away from losing the prime and I knew it. He treated that as the real deadline it was and built backward from it. We passed.",
    role: "Owner",
    context: "single-source supplier to a major prime, NH",
    engagementType: "Strategic Consultancy",
  },
  {
    quote:
      "The Gemba walks changed how my supervisors think. They stopped reporting status and started seeing waste. That outlasted the engagement by a year.",
    role: "Plant Manager",
    context: "metal fabrication shop, central NH",
    engagementType: "30-Day Operational Triage",
  },
  {
    quote:
      "He gave me a realistic timing window in 48 hours and then kept his word on every date after that. For an engineer, dependability is the whole pitch.",
    role: "President",
    context: "precision components manufacturer, MA",
    engagementType: "Fractional COO",
  },
  {
    quote:
      "We thought we needed a digital twin. He showed us we needed clean data and a documented process first. He saved us from buying the wrong thing.",
    role: "VP of Engineering",
    context: "advanced manufacturing firm, southern NH",
    engagementType: "Strategic Consultancy",
  },
  {
    quote:
      "The working capital he freed went straight into a second cell we had been putting off for three years. That is the kind of result you can actually feel.",
    role: "Owner",
    context: "$28M machining business, New England",
    engagementType: "Fractional COO",
  },
  {
    quote:
      "He sat the AS9100 audit with us instead of handing us a checklist. Having someone in the chair who had been there before took the panic out of the room.",
    role: "Quality Manager",
    context: "AS9100 certified supplier, MA",
    engagementType: "Fractional COO",
  },
  {
    quote:
      "Our book-to-bill was a mess and the customer was losing patience. He fixed the flow before he touched the forecast, and the late shipments stopped.",
    role: "General Manager",
    context: "build-to-print shop, RI",
    engagementType: "30-Day Operational Triage",
  },
  {
    quote:
      "He is local in a way the national platforms are not. He knew the New England supplier base and the prime relationships before I explained them.",
    role: "Founder",
    context: "defense subcontractor, Greater Boston",
    engagementType: "Strategic Consultancy",
  },
  {
    quote:
      "The triage report paid for itself in the first recommendation. We had been quoting jobs that lost money and could not see it. Now we can.",
    role: "Owner",
    context: "job shop, southern NH",
    engagementType: "30-Day Operational Triage",
  },
  {
    quote:
      "He upskilled a technician into a site leader and that person now runs the second shift. The capability stayed in the building after he left.",
    role: "CEO",
    context: "electronics manufacturer, central MA",
    engagementType: "Fractional COO",
  },
  {
    quote:
      "When the LOI came in we had 21 days to defend our operations. His forensic read was sober and specific. The buyer trusted it, and so did we.",
    role: "CFO",
    context: "manufacturing target in diligence",
    engagementType: "Strategic Consultancy",
  },
  {
    quote:
      "He never once used a buzzword I had to look up. Every term came with a plain explanation. For a floor full of engineers, that earned instant respect.",
    role: "Director of Operations",
    context: "precision manufacturer, NH",
    engagementType: "Fractional COO",
  },
  {
    quote:
      "We were drowning in compliance PDFs that nobody followed. He turned the policies into the actual workflow. The binder became the work.",
    role: "President",
    context: "CUI-handling supplier, MA",
    engagementType: "Fractional COO",
  },
  {
    quote:
      "The SQDIP board he set up is the first thing I look at every morning. It tells me the truth before the email does.",
    role: "Owner",
    context: "$15M contract manufacturer, southern NH",
    engagementType: "Fractional COO",
  },
  {
    quote:
      "He scoped the consult tightly and delivered exactly that, no scope creep, no upsell. When I needed more later, I came back. That is how you earn a second engagement.",
    role: "Founder",
    context: "specialty components shop, New England",
    engagementType: "Strategic Consultancy",
  },
  {
    quote:
      "Our IT and OT teams had never been in the same room. He got them building one secure thread together. The CMMC assessor noticed the difference.",
    role: "Director of IT",
    context: "defense manufacturer, central NH",
    engagementType: "Fractional COO",
  },
  {
    quote:
      "He treated my limited cash as a real constraint, not a problem to ignore. He sequenced the work so the early wins funded the later ones.",
    role: "Owner",
    context: "cash-constrained machine shop, MA",
    engagementType: "30-Day Operational Triage",
  },
  {
    quote:
      "What I remember is the calm. No urgency theater, no spots filling fast. Just a clear read of my operation and a plan I believed. That calm is worth a lot when you are scared.",
    role: "President",
    context: "family-owned defense supplier, NH",
    engagementType: "Strategic Consultancy",
  },
];

// Homepage featured testimonials (indices into testimonials)
export const featuredTestimonials: number[] = [1, 3, 17, 34];

// ---------- niches (3 niche landings, loss-frame openers per §12.6) ----------

export interface Niche {
  slug: string;
  eyebrow: string;
  lossOpener: string;
  title: string;
  body: string[];
  mechanism: string[];
  forWho: string;
  cta: { label: string; href: "/booking" };
}

export const niches: Niche[] = [
  {
    slug: "dib-contract-manufacturer",
    eyebrow: "NH / MA defense contract manufacturer",
    lossOpener:
      "If your Level 2 certification is not in place when CMMC Phase 2 begins on November 10, 2026, the prime moves the work to a shop that is ready. Your SPRS score is visible to them today, and a wrong one is a false-affirmation risk the DOJ already pursues.",
    title: "Keep the prime. Hardwire the compliance before the gate.",
    body: [
      "Per the DoD 32 CFR final rule, mandatory C3PAO Level 2 certification in DoD contracts begins November 10, 2026. Per CyberSheath's 2025 State of the DIB report, only 1 percent of contractors feel fully prepared, and primes including Boeing and Northrop Grumman have already issued supplier letters.",
      "The shops that lose work in 2026 will not lose it on price. They will lose it on a failed gate, an unanswered DFARS questionnaire, or an SPRS score they cannot defend.",
    ],
    mechanism: [
      "Map the IT and OT systems that hold your CUI into one auditable digital thread, not three separate liabilities",
      "Build the NIST SP 800-171 controls into the daily workflow so the assessor finds them running",
      "Get the SPRS score right and documented so it survives scrutiny under the False Claims Act",
      "Sequence the readiness work against your prime's actual deadline, not a generic checklist",
    ],
    forWho:
      "Owners and GMs of NH and MA contract manufacturers, build-to-print or build-to-spec, who serve a prime and just felt the clock get real.",
    cta: { label: "Request a Strategic Conversation", href: "/booking" },
  },
  {
    slug: "onshoring",
    eyebrow: "Foreign manufacturer onshoring",
    lossOpener:
      "Your 90-day window to qualify for US defense business is already running, and a foreign parent on the ownership documents raises FOCI questions that disqualify you from the contract before the technical review ever begins.",
    title: "Stand up US operations inside the gate that is already closing.",
    body: [
      "A foreign parent deciding to stand up US subsidiary operations usually has one prime gate ahead and not enough runway behind it. The closest public answers, PwC's reshoring whitepaper and Congressional Research Service R47751, are generic or legal, not an operating playbook.",
      "Miss the gate and the contract eligibility goes with it, often for a full procurement cycle. The cost of being late is measured in lost programs, not lost weeks.",
    ],
    mechanism: [
      "Stand up the US operating model: the floor, the org, the reporting, the SQDIP cadence",
      "Build the IT and OT environment to a CMMC and ITAR posture from day one, not retrofitted later",
      "Structure the operation against the FOCI questions a foreign-parented subsidiary has to answer",
      "Run the build like an operator who has done it, currently standing up a US site for a Canadian-parent manufacturer",
    ],
    forWho:
      "Foreign manufacturers, often Canadian, UK, or Israeli parented, racing a gate to qualify a US subsidiary for defense work.",
    cta: { label: "Request a Strategic Conversation", href: "/booking" },
  },
  {
    slug: "pe-operating-partner",
    eyebrow: "PE operating partner / diligence",
    lossOpener:
      "The operational risk a financial model cannot see is the risk that torpedoes the LOI or resets the valuation after close. By the time it surfaces in the first quarter of ownership, you have already paid for it.",
    title: "Find the operational risk before the LOI hardens.",
    body: [
      "Manufacturing diligence on a 21-day clock rewards an operator who can read a floor, not just a data room. The gap between the model and the shop is where value leaks after the deal closes.",
      "A polite assessment confirms what the seller told you. A forensic read tells you what the seller did not know to mention.",
      "Diligence and strategic engagements run nationally. On-site floor work and embedded operating roles are concentrated across New England, where the defense industrial base I know best is dense.",
    ],
    mechanism: [
      "Forensic operational due diligence that surfaces the Hidden Factory, the working-capital trap, and the compliance gaps",
      "A defensible read of whether the target can actually deliver its backlog at the margin in the model",
      "A 90-day post-close stabilization plan ready before you sign, so integration starts on day one",
      "Compliance exposure scored under CMMC, ITAR, and AS9100 so it never becomes a post-close surprise",
    ],
    forWho:
      "PE operating partners and deal teams running manufacturing diligence on a tight clock, who need an operator's read before the number is final.",
    cta: { label: "Request a Strategic Conversation", href: "/booking" },
  },
];

// ---------- gatedTool (forwardable lead tool, Premortem Patch #2) ----------

export interface GatedTool {
  name: string;
  slug: string;
  eyebrow: string;
  headline: string;
  body: string;
  fields: string[];
  submitLabel: string;
}

export const gatedTool: GatedTool = {
  name: "CMMC Readiness Self-Scorer",
  // slug doubles as the route path (consumed as `/${gatedTool.slug}`); the tool lives at /tools/cmmc-readiness
  slug: "tools/cmmc-readiness",
  eyebrow: "Free tool",
  headline: "Score your CMMC Level 2 readiness in ten questions.",
  body: "The same DFARS-flowdown logic that converts a stuck founder into a buyer, built into a scorer you can run in five minutes and forward to your CFO. It maps your answers against the NIST SP 800-171 control families and returns a readiness band with the gaps named in plain language. No sales call attached.",
  fields: [
    "Do you hold or process Controlled Unclassified Information (CUI)?",
    "Has a prime sent you a CMMC or DFARS 252.204-7021 supplier letter?",
    "Is your current SPRS self-assessment score posted and dated within the last year?",
    "Do you have a written System Security Plan (SSP) covering NIST SP 800-171?",
    "Are your MES, ERP, and SCADA environments mapped and access-controlled?",
    "Do you have a Plan of Action and Milestones (POA&M) for open controls?",
    "Is multi-factor authentication enforced on every system touching CUI?",
    "Do you log and review security events across IT and OT?",
    "Have you scoped a CUI enclave or boundary, or is CUI spread across the network?",
    "Do you have a target date for C3PAO Level 2 assessment?",
  ],
  submitLabel: "Score my readiness",
};

// ---------- blog (METADATA ONLY — expanded AEO slate from market-intel §6) ----------

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  directAnswer: string;
  date: string; // absolute ISO date
  readingTime: string;
  author: string;
  isFlagship: boolean;
}

// 9 from market-intel §6 plus 3 white-space additions. Flagship = #4 onshoring, #6 AS9100+CMMC,
// #7 backlog-to-cash (premortem Patch #2 citation bet). Dates absolute (today 2026-06-07).
export const blog: { posts: BlogPost[] } = {
  posts: [
    {
      slug: "cmmc-2-0-operational-playbook-50-person-manufacturer",
      title:
        "CMMC 2.0 for the 50-Person Defense Contract Manufacturer: A 2026 Operational Playbook",
      category: "CMMC & Compliance",
      excerpt:
        "What a 50-person defense shop actually has to do to reach CMMC Level 2 before the November 2026 gate, framed by an operator instead of an IT vendor.",
      directAnswer:
        "A 50-person defense contract manufacturer reaches CMMC Level 2 by scoping its CUI boundary, implementing the 110 NIST SP 800-171 controls into daily workflow, and booking a C3PAO assessment ahead of the November 10, 2026 mandate. Most spend 100,000 to 200,000 dollars in Year 1, per CMMC.com, and the cost falls when controls are built into operations rather than bolted on.",
      date: "2026-05-12",
      readingTime: "14 min",
      author: "Garrett Partridge",
      isFlagship: false,
    },
    {
      slug: "dfars-flowdown-smb-contract-manufacturers",
      title:
        "DFARS Flowdown for SMB Contract Manufacturers: Which Clauses Actually Hit Your Shop Floor",
      category: "CMMC & Compliance",
      excerpt:
        "A shop-floor read of DFARS flowdown: which clauses you must pass to your subcontractors, and which are noise for a small build-to-print manufacturer.",
      directAnswer:
        "DFARS 252.204-7012 (safeguarding covered defense information) and 252.204-7021 (CMMC requirement) are the flowdown clauses that hit a small contract manufacturer's floor hardest, because they obligate you to protect CUI and to flow the same requirement to your own subcontractors. The legal list is long, but only a handful change how you actually run the shop.",
      date: "2026-05-19",
      readingTime: "11 min",
      author: "Garrett Partridge",
      isFlagship: false,
    },
    {
      slug: "hidden-factory-find-it-in-30-days",
      title:
        "The Hidden Factory: How 20 to 40 Percent of Your Capacity Is Invisible to Your ERP, and How to Find It in 30 Days",
      category: "Operations",
      excerpt:
        "A 30-day diagnostic protocol for surfacing the rework, tribal knowledge, and waste your ERP never records, written as a method rather than a software pitch.",
      directAnswer:
        "The Hidden Factory is the undocumented rework, tribal knowledge, and off-the-books problem solving that consumes capacity without appearing in your ERP. Quality pioneer Armand Feigenbaum estimated this loss can reach 40 percent of total company effort. You find it in 30 days with value stream mapping, Gemba walks, and targeted Kaizen, then convert the recovered capacity into cash conversion days.",
      date: "2026-05-26",
      readingTime: "13 min",
      author: "Garrett Partridge",
      isFlagship: false,
    },
    {
      slug: "foreign-manufacturer-onshoring-90-day-playbook",
      title:
        "Foreign Manufacturer Onshoring Playbook: Standing Up US Defense Manufacturing Operations in 90 Days",
      category: "Onshoring & FOCI",
      excerpt:
        "An operating playbook for a foreign-parented manufacturer standing up a US subsidiary to qualify for defense contracts inside a 90-day gate, including FOCI posture.",
      directAnswer:
        "A foreign manufacturer stands up US defense operations in 90 days by building the operating model, the CMMC and ITAR-ready IT and OT environment, and the FOCI mitigation posture in parallel rather than in sequence. Foreign Ownership, Control, or Influence (FOCI) questions must be answered before a prime gate, and the closest public guidance, Congressional Research Service R47751, is legal rather than operational.",
      date: "2026-06-02",
      readingTime: "16 min",
      author: "Garrett Partridge",
      isFlagship: true,
    },
    {
      slug: "fractional-coo-vs-full-time-economics-20m-manufacturer",
      title: "Fractional COO vs Full-Time COO Economics for a $20M Manufacturer",
      category: "Fractional Leadership",
      excerpt:
        "The real cost comparison between a fractional and a full-time COO for a 20 million dollar defense manufacturer, with the defense-vertical specifics the generic guides miss.",
      directAnswer:
        "A full-time COO for a 20 million dollar manufacturer costs north of 300,000 dollars in total compensation, while a senior fractional COO runs 10,000 to 26,000 dollars a month depending on intensity, per published 2025 to 2026 rate data. For a defense shop, the deciding factor is usually not cost but whether the operator carries CMMC, ITAR, and AS9100 fluency a generalist lacks.",
      date: "2026-05-05",
      readingTime: "10 min",
      author: "Garrett Partridge",
      isFlagship: false,
    },
    {
      slug: "as9100-cmmc-integration-audit-once",
      title: "AS9100 + CMMC 2.0 Integration: How to Audit Once, Not Twice",
      category: "CMMC & Compliance",
      excerpt:
        "Where AS9100 and CMMC 2.0 overlap, where they do not, and how to build one evidence system that satisfies both audits instead of running them as separate fire drills.",
      directAnswer:
        "AS9100 and CMMC 2.0 overlap heavily on document control, risk management, and corrective action, so a manufacturer can build one integrated evidence system that satisfies both the AS9100 surveillance audit and the CMMC C3PAO assessment. Auditing once requires mapping NIST SP 800-171 controls onto the AS9100 process structure you already maintain, rather than standing up a parallel compliance program.",
      date: "2026-06-05",
      readingTime: "12 min",
      author: "Garrett Partridge",
      isFlagship: true,
    },
    {
      slug: "backlog-to-cash-working-capital",
      title:
        "Book-to-Bill, Backlog-to-Cash: Why Your Order Book Is Killing Your Working Capital",
      category: "Operations",
      excerpt:
        "Why a growing backlog can starve a defense manufacturer of cash, and the operational levers that recover cash conversion days at SMB scale.",
      directAnswer:
        "A growing backlog kills working capital when long-lead inventory and undocumented rework trap cash between the order and the deposit, so revenue rises while the bank balance does not. AlixPartners found the aerospace and defense cash conversion cycle lengthened from 138 to 159 days between 2018 and 2022. The fix is operational, recovering cash conversion days by removing the constraints that hold inventory and rework in place.",
      date: "2026-05-22",
      readingTime: "12 min",
      author: "Garrett Partridge",
      isFlagship: true,
    },
    {
      slug: "it-ot-convergence-defense-manufacturers",
      title:
        "IT/OT Convergence for Defense Manufacturers: Why Your MES, ERP, and SCADA Are Three Compliance Liabilities Until They Are One",
      category: "Digital Thread",
      excerpt:
        "How converging your MES, ERP, and SCADA into one secure digital thread turns three separate CMMC liabilities into a single auditable system.",
      directAnswer:
        "For a defense manufacturer, separate MES, ERP, and SCADA environments are three distinct CMMC liabilities because each holds or touches Controlled Unclassified Information under different controls and owners. Converging them into one secure digital thread, with unified access control and logging, turns three audit exposures into a single defensible system that an assessor can follow end to end.",
      date: "2026-05-29",
      readingTime: "13 min",
      author: "Garrett Partridge",
      isFlagship: false,
    },
    {
      slug: "90-day-pl-triage-operational-diagnostic",
      title:
        "The 90-Day P&L Triage: A Defense Manufacturer's Operational Diagnostic Framework",
      category: "Operations",
      excerpt:
        "A defense-specific 90-day operational diagnostic framework that takes a manufacturer from P&L audit through stabilization to a scalable future state.",
      directAnswer:
        "A 90-day P&L triage for a defense manufacturer runs in three phases: a 30 to 45 day diagnostic that audits the P&L and maps the value stream, a stabilization phase that installs new policies and audit routines, and a commercial-scale phase that builds the future state and trains the team. The defense-specific difference is hardwiring CMMC, ITAR, and AS9100 into each phase rather than treating compliance as a separate track.",
      date: "2026-04-28",
      readingTime: "14 min",
      author: "Garrett Partridge",
      isFlagship: false,
    },
    {
      slug: "sprs-score-false-claims-act-exposure",
      title:
        "Your SPRS Score and the False Claims Act: The Compliance Exposure Hiding in One Number",
      category: "CMMC & Compliance",
      excerpt:
        "Why a wrong or stale SPRS self-assessment score is a False Claims Act risk for defense subcontractors, and how to score it so it survives scrutiny.",
      directAnswer:
        "A wrong or stale Supplier Performance Risk System (SPRS) self-assessment score is a false-affirmation risk under the False Claims Act, because submitting an inflated NIST SP 800-171 score to win or keep a DoD contract can trigger the DOJ Civil Cyber-Fraud Initiative. Scoring it accurately, documenting the basis, and maintaining a POA&M for open controls is the defense.",
      date: "2026-06-06",
      readingTime: "9 min",
      author: "Garrett Partridge",
      isFlagship: false,
    },
    {
      slug: "standard-work-2-0-back-office-shop-floor",
      title:
        "Standard Work 2.0: Taking Lean Discipline Off the Floor and Into the Whole Company",
      category: "Operations",
      excerpt:
        "How the discipline of lean standard work applies beyond the production floor, to the back office, the P&L, and the compliance posture of a defense manufacturer.",
      directAnswer:
        "Standard Work 2.0 extends the lean principle of documented, repeatable standard work from the production floor to the entire company, including the back office, the financial close, and the compliance workflow. For a defense manufacturer it runs on four pillars, IT/OT Convergence, Margin Engineering, Human-in-the-Loop, and Sovereign Tier, so process discipline and regulatory readiness are built together rather than separately.",
      date: "2026-05-15",
      readingTime: "11 min",
      author: "Garrett Partridge",
      isFlagship: false,
    },
    {
      slug: "ai-in-regulated-manufacturing-human-in-the-loop",
      title:
        "AI in Regulated Manufacturing: Where Human-in-the-Loop Is Not Optional",
      category: "Digital Thread",
      excerpt:
        "Where a defense manufacturer can safely apply AI, where verified human judgment must stay in the loop, and how to avoid automating a problem you should have removed.",
      directAnswer:
        "In regulated defense manufacturing, AI safely handles cognitive drudgery like data entry, anomaly flagging, and documentation drafting, but verified human judgment must stay in the loop on any decision that touches CUI, data integrity, or compliance affirmation. The first step is mapping the value stream, because automating a broken process only makes the waste faster.",
      date: "2026-05-08",
      readingTime: "10 min",
      author: "Garrett Partridge",
      isFlagship: false,
    },
  ],
};

// ---------- footer ----------

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export interface FooterData {
  closingStatement: string;
  tagline: string;
  columns: FooterColumn[];
  legal: string;
  privacyNote: string;
}

export const footer: FooterData = {
  closingStatement:
    "You are running the floor, the board, and the audit at the same time. I install the operating system that takes two of those off your desk.",
  tagline: "Operations architect for the New England defense industrial base.",
  columns: [
    {
      heading: "Work",
      links: [
        { label: "Method", href: "/method" },
        { label: "Engagements", href: "/engagements" },
        { label: "Operational diagnostic", href: "/diagnostic" },
        { label: "Request a Strategic Conversation", href: "/booking" },
      ],
    },
    {
      heading: "Who I serve",
      links: [
        { label: "Defense contract manufacturers", href: "/niches/dib-contract-manufacturer" },
        { label: "Foreign manufacturer onshoring", href: "/niches/onshoring" },
        { label: "PE operating partners", href: "/niches/pe-operating-partner" },
      ],
    },
    {
      heading: "Authority",
      links: [
        { label: "Insights", href: "/blog" },
        { label: "CMMC readiness scorer", href: "/tools/cmmc-readiness" },
        { label: "About", href: "/about" },
        { label: "FAQ", href: "/faq" },
      ],
    },
  ],
  // [MISSING: registered entity name for legal line, pending Tuesday ask]
  legal: "Garrett Partridge. Brookline, NH. All rights reserved.",
  privacyNote:
    "This site runs over HTTPS with no third-party trackers. Inquiries are handled to a DFARS-grade standard. No Controlled Unclassified Information should be submitted through any form on this site.",
};

// ---------- seo (per-route title + description, no double-branding) ----------

export interface SeoEntry {
  title: string;
  description: string;
}

export const seo: Record<string, SeoEntry> = {
  "/": {
    title: "Garrett Partridge | Fractional COO for Defense Manufacturers",
    description:
      "Operations architect and fractional COO for New England defense industrial base manufacturers. Standard Work 2.0, CMMC and ITAR readiness, and IT/OT alignment that turns backlog into cash.",
  },
  "/method": {
    title: "Standard Work 2.0 | The Operating System for Defense Manufacturers",
    description:
      "The four-pillar method: IT/OT Convergence, Margin Engineering, Human-in-the-Loop, and Sovereign Tier. Lean discipline and defense compliance built into one operating system.",
  },
  "/engagements": {
    title: "Engagements | 30-Day Triage, Fractional COO, Strategic Consultancy",
    description:
      "Three ways to work with an operator who has owned the P&L: a 30-day operational triage, an embedded fractional COO retainer, or a scoped strategic consultancy.",
  },
  "/about": {
    title: "About Garrett Partridge | Operator, Not Advisor",
    description:
      "An engineer who has run the P&L and sat the AS9100 audit chair. CEO and division-GM operating history serving the New England defense industrial base.",
  },
  "/faq": {
    title: "FAQ | Fractional COO, CMMC, and Defense Manufacturing Operations",
    description:
      "Direct answers on CMMC Phase 2 timing and cost, the Hidden Factory, SPRS exposure, fractional COO economics, and how engagements start.",
  },
  "/testimonials": {
    title: "Testimonials | Defense Manufacturer Operations Engagements",
    description:
      "How owners, GMs, and PE operating partners describe working with an embedded operations architect across the New England defense industrial base.",
  },
  "/booking": {
    title: "Request a Strategic Conversation | Garrett Partridge",
    description:
      "A maximum of four concurrent engagements. Name your trigger, a prime supplier letter, a CMMC window, an LOI in diligence, and receive a realistic timing window within 48 hours.",
  },
  "/diagnostic": {
    title: "Operational Self-Diagnostic | Name the Fault You Are Fighting",
    description:
      "Six questions type your operation into one of four archetypes, Hidden Factory, CMMC Clock, Backlog-to-Cash, or Onshoring, and point to the right starting line. No email required.",
  },
  "/blog": {
    title: "Insights | Defense Manufacturing Operations and Compliance",
    description:
      "Source-cited answers on CMMC 2.0, DFARS flowdown, the Hidden Factory, onshoring and FOCI, AS9100 integration, and backlog-to-cash for New England defense manufacturers.",
  },
  "/contact": {
    title: "Contact | Request a Strategic Conversation",
    description:
      "Reach an operations architect serving Greater Boston and Southern New Hampshire. The fastest path is to request a strategic conversation and name your trigger.",
  },
  "/niches/dib-contract-manufacturer": {
    title: "CMMC Readiness for NH & MA Defense Contract Manufacturers",
    description:
      "Keep the prime through the November 10, 2026 CMMC Phase 2 gate. Compliance hardwired into the workflow, a defensible SPRS score, and an auditable IT/OT digital thread.",
  },
  "/niches/onshoring": {
    title: "Foreign Manufacturer Onshoring | Stand Up US Defense Operations",
    description:
      "Qualify a US subsidiary for defense work inside the gate that is already closing. Operating model, CMMC and ITAR-ready IT/OT, and FOCI posture built in parallel.",
  },
  "/niches/pe-operating-partner": {
    title: "PE Operating Partner | Forensic Manufacturing Diligence",
    description:
      "Find the operational risk a financial model misses before the LOI hardens. Forensic ops diligence on a 21 to 30 day clock, with a 90-day stabilization plan ready at signing.",
  },
};
