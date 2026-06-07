// ============================================================
// quiz.ts — the operational self-diagnostic (NOT a marketing quiz).
// Full-page archetype experience, NO email gate. Types the visitor into one of four
// archetypes and lands on the inline BookingCalendar.
// Voice: design-system.md §7 (executive + engineer, quiet certainty, em-dash-free).
// Psychology: §12.4 (IKEA effect + effort justification + cognitive consistency) — the
// option `detail` sub-lines do the "we know you" mirroring; the result restates the
// visitor's own answers back before the booking CTA. NO em dashes (—) anywhere.
// ============================================================

export type QuizType = "hiddenFactory" | "cmmcClock" | "backlogToCash" | "onshoring";

export interface QuizOption {
  emoji: string;
  label: string;
  detail: string; // mirrors the visitor's situation back to them
  type: QuizType;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

// 6 questions. Question voice mirrors the buyer; UI handles auto-advance.
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "trigger",
    question: "What put this on your desk this month?",
    options: [
      {
        emoji: "📨",
        label: "A prime sent a CMMC or DFARS supplier letter",
        detail: "The clock just became real, and the questionnaire is sitting unanswered.",
        type: "cmmcClock",
      },
      {
        emoji: "📈",
        label: "The backlog is growing but the cash is not",
        detail: "Revenue is up, the floor is busy, and the bank balance will not move.",
        type: "backlogToCash",
      },
      {
        emoji: "🕳️",
        label: "Something is eating capacity and I cannot name it",
        detail: "The ERP says one thing and the floor tells a different story.",
        type: "hiddenFactory",
      },
      {
        emoji: "🌐",
        label: "We are standing up US operations to win defense work",
        detail: "A foreign parent, a closing gate, and not enough runway behind it.",
        type: "onshoring",
      },
    ],
  },
  {
    id: "deadline",
    question: "Which deadline are you actually racing?",
    options: [
      {
        emoji: "🗓️",
        label: "The November 2026 CMMC Phase 2 gate",
        detail: "Mandatory C3PAO Level 2 certification, and you are not yet ready for it.",
        type: "cmmcClock",
      },
      {
        emoji: "💸",
        label: "A cash crunch despite a full order book",
        detail: "Working capital is trapped somewhere between the order and the deposit.",
        type: "backlogToCash",
      },
      {
        emoji: "📋",
        label: "A customer losing patience with late shipments",
        detail: "Promises keep slipping and you cannot see where the time goes.",
        type: "hiddenFactory",
      },
      {
        emoji: "⏳",
        label: "A 90-day window to qualify a US subsidiary",
        detail: "Miss the gate and the contract eligibility goes with it for a full cycle.",
        type: "onshoring",
      },
    ],
  },
  {
    id: "visibility",
    question: "When you look at your operation, what cannot you see clearly?",
    options: [
      {
        emoji: "🔍",
        label: "Where the rework and waste actually live",
        detail: "Undocumented fixes and tribal knowledge that never reach a report.",
        type: "hiddenFactory",
      },
      {
        emoji: "🔐",
        label: "Whether our SPRS score would survive an audit",
        detail: "The self-assessment is posted, but you are not sure it is defensible.",
        type: "cmmcClock",
      },
      {
        emoji: "📊",
        label: "How much cash is locked in inventory and WIP",
        detail: "Long-lead parts and work in progress are absorbing the cash quietly.",
        type: "backlogToCash",
      },
      {
        emoji: "🏗️",
        label: "What a compliant US floor even needs to look like",
        detail: "You are building from a blank site against a gate you do not control.",
        type: "onshoring",
      },
    ],
  },
  {
    id: "systems",
    question: "How do your IT and OT systems sit together today?",
    options: [
      {
        emoji: "🧩",
        label: "MES, ERP, and SCADA are three separate islands",
        detail: "Three networks, three owners, and three CMMC liabilities to defend.",
        type: "cmmcClock",
      },
      {
        emoji: "📁",
        label: "We track jobs in spreadsheets and people's heads",
        detail: "The real schedule lives with whoever has been here the longest.",
        type: "hiddenFactory",
      },
      {
        emoji: "🧮",
        label: "The ERP cannot tell me my true cash conversion cycle",
        detail: "You can pull a number, but you do not trust what it is leaving out.",
        type: "backlogToCash",
      },
      {
        emoji: "🆕",
        label: "We are choosing the stack from scratch right now",
        detail: "Everything is greenfield, which is the rare chance to build it right.",
        type: "onshoring",
      },
    ],
  },
  {
    id: "stakes",
    question: "If nothing changes, what is most at risk this year?",
    options: [
      {
        emoji: "🏅",
        label: "Losing the prime to a failed compliance gate",
        detail: "The work moves to a shop that certified on time, not on price.",
        type: "cmmcClock",
      },
      {
        emoji: "💰",
        label: "Running out of cash while the order book grows",
        detail: "Growth that you cannot fund is its own kind of failure.",
        type: "backlogToCash",
      },
      {
        emoji: "📉",
        label: "Margin quietly bleeding out on every job",
        detail: "You are quoting work that loses money and cannot yet prove it.",
        type: "hiddenFactory",
      },
      {
        emoji: "🚪",
        label: "Missing the gate to enter the US defense market",
        detail: "The program eligibility closes and reopens on someone else's schedule.",
        type: "onshoring",
      },
    ],
  },
  {
    id: "help",
    question: "What kind of help would you actually trust?",
    options: [
      {
        emoji: "🛡️",
        label: "Compliance built into how we already work",
        detail: "Not a binder of PDFs, but controls the auditor finds already running.",
        type: "cmmcClock",
      },
      {
        emoji: "🧭",
        label: "An operator who maps the constraint before selling a fix",
        detail: "Problem first, with someone who has owned a P&L, not a slide deck.",
        type: "hiddenFactory",
      },
      {
        emoji: "🔄",
        label: "Cash conversion days recovered I can redeploy",
        detail: "A result you can feel in the bank, not a strategy you file away.",
        type: "backlogToCash",
      },
      {
        emoji: "🏭",
        label: "Someone who has actually stood up a US site before",
        detail: "An operator who has run this build, not advised on it from a distance.",
        type: "onshoring",
      },
    ],
  },
];

export interface QuizResultContent {
  eyebrow: string;
  name: string;
  body: string[];
  recommended: { name: string; href: string; reason: string };
}

// Result restates the visitor's own answers back (§12.4 cognitive consistency), names the
// archetype, asserts fit, then points to a recommended engagement/niche. The UI renders the
// inline BookingCalendar directly below this. NO em dashes.
export const QUIZ_RESULTS: Record<QuizType, QuizResultContent> = {
  hiddenFactory: {
    eyebrow: "This is your fault to fight",
    name: "The Hidden Factory",
    body: [
      "You told us something is eating capacity that you cannot name, that the floor and the ERP disagree, and that the schedule lives in people's heads. That is the Hidden Factory: the undocumented rework, tribal knowledge, and off-the-books problem solving your systems never record.",
      "Armand Feigenbaum estimated this loss can reach 40 percent of total company effort. You are capable, you are busy, and you are quoting work that may be losing money without proof. The job is not to add technology. It is to see the constraint, then remove it.",
      "A 30-day operational triage is built for exactly this. Value stream maps, Gemba walks, and targeted Kaizen surface what the ERP cannot, and a defensible written plan names the sequence to convert that waste back into cash.",
    ],
    recommended: {
      name: "30-Day Operational Triage",
      href: "/engagements",
      reason: "It finds the Hidden Factory and returns a plan, not a deck.",
    },
  },
  cmmcClock: {
    eyebrow: "This is your fault to fight",
    name: "The CMMC Clock",
    body: [
      "You told us a prime has put the compliance question on your desk, that you are racing the November 2026 gate, and that you are not certain your SPRS score would survive an audit. That is the clock most defense shops are losing right now.",
      "Mandatory C3PAO Level 2 certification in DoD contracts begins November 10, 2026, per the DoD 32 CFR final rule, and per CyberSheath's 2025 State of the DIB report only 1 percent of contractors feel fully prepared. The shops that lose work in 2026 will lose it on a failed gate, not on price.",
      "The answer is not another IT vendor. It is compliance hardwired into the daily workflow, so the assessor finds the controls already running and your SPRS score holds under scrutiny. That is the Sovereign Tier pillar of Standard Work 2.0.",
    ],
    recommended: {
      name: "Defense contract manufacturer readiness",
      href: "/niches/dib-contract-manufacturer",
      reason: "Compliance built into the work before the gate, not bolted on after.",
    },
  },
  backlogToCash: {
    eyebrow: "This is your fault to fight",
    name: "Backlog-to-Cash",
    body: [
      "You told us the order book is growing while the cash is not, that working capital is trapped somewhere you cannot quite see, and that the ERP will not give you a cash conversion number you trust. That is a working-capital crisis hiding inside a growth story.",
      "AlixPartners found the aerospace and defense cash conversion cycle lengthened from 138 to 159 days between 2018 and 2022. Long-lead inventory and undocumented rework hold your cash between the order and the deposit. Growth you cannot fund is its own failure.",
      "Margin Engineering targets that cycle directly. We map the value stream, find the rework the ERP never recorded, and convert recovered capacity into cash conversion days you can redeploy into R&D or a second cell.",
    ],
    recommended: {
      name: "30-Day Operational Triage",
      href: "/engagements",
      reason: "It frees the cash trapped in your own operation, with a number you can defend.",
    },
  },
  onshoring: {
    eyebrow: "This is your fault to fight",
    name: "The Onshoring Gate",
    body: [
      "You told us you are standing up US operations to win defense work, that you are choosing the stack from scratch, and that a 90-day gate is closing on a schedule you do not control. The runway behind you is shorter than the build in front of you.",
      "A foreign parent on the ownership documents raises FOCI questions that can disqualify you before a technical review begins, and the closest public guidance, Congressional Research Service R47751, is legal rather than operational. Miss the gate and the eligibility goes with it for a full procurement cycle.",
      "This is an active engagement type, not a theory. I am currently standing up US defense manufacturing operations for a Canadian-parent subsidiary, building the operating model, the CMMC and ITAR-ready IT and OT environment, and the FOCI posture in parallel.",
    ],
    recommended: {
      name: "Foreign manufacturer onshoring",
      href: "/niches/onshoring",
      reason: "An operator who is running this build right now, not advising on it.",
    },
  },
};

// Deterministic scorer: counts occurrences, returns the highest.
// Tie-break: the first archetype to reach the winning count (first-reached wins).
export function scoreQuiz(answers: QuizType[]): QuizType {
  const counts: Record<QuizType, number> = {
    hiddenFactory: 0,
    cmmcClock: 0,
    backlogToCash: 0,
    onshoring: 0,
  };

  let winner: QuizType = "hiddenFactory";
  let max = 0;

  for (const answer of answers) {
    counts[answer] += 1;
    if (counts[answer] > max) {
      max = counts[answer];
      winner = answer;
    }
  }

  return winner;
}
