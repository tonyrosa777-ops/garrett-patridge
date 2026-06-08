import type { NextRequest } from "next/server";

// GET /api/calendly/slots?date=YYYY-MM-DD
// Returns normalized { slots: string[] } of "HH:MM" 24h business-hour times.
// Route handlers are NOT cached by default in Next 16 (NEXT16-NOTES §2) — keep dynamic.
// Demo mode (no CALENDLY_API_KEY): deterministic seeded availability so the demo is stable.

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// The candidate weekday business-hour slots. A deterministic hash of the date selects
// a stable 3-5 slot subset, so the same date always returns the same availability.
const CANDIDATE_SLOTS: readonly string[] = ["09:00", "10:30", "13:00", "14:30", "16:00"];

// Deterministic, non-cryptographic string hash (FNV-1a style).
function hashDate(date: string): number {
  let h = 2166136261;
  for (let i = 0; i < date.length; i++) {
    h ^= date.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// True if the YYYY-MM-DD string falls on Sat/Sun. Parsed as UTC to stay deterministic
// across server timezones (defense execs book weekdays; weekends return no slots).
function isWeekend(date: string): boolean {
  const d = new Date(`${date}T00:00:00Z`);
  const day = d.getUTCDay(); // 0 = Sun, 6 = Sat
  return day === 0 || day === 6;
}

function seededSlots(date: string): string[] {
  if (isWeekend(date)) return [];
  const h = hashDate(date);
  // 3, 4, or 5 slots depending on the hash.
  const count = 3 + (h % 3);
  // Rotate the candidate list by the hash so different dates surface different subsets,
  // then take `count` and re-sort chronologically.
  const offset = h % CANDIDATE_SLOTS.length;
  const rotated = [...CANDIDATE_SLOTS.slice(offset), ...CANDIDATE_SLOTS.slice(0, offset)];
  return rotated.slice(0, count).sort();
}

interface CalendlySpot {
  status?: string;
  start_time?: string;
}

interface CalendlyAvailabilityResponse {
  collection?: CalendlySpot[];
}

async function liveSlots(date: string, apiKey: string, eventTypeUri: string): Promise<string[]> {
  // Calendly availability is queried over a [start_time, end_time) window. We ask for the
  // single requested day (UTC bounds) and normalize the returned start_time list to HH:MM.
  const startTime = `${date}T00:00:00.000000Z`;
  const endDate = new Date(`${date}T00:00:00Z`);
  endDate.setUTCDate(endDate.getUTCDate() + 1);
  const endTime = `${endDate.toISOString().slice(0, 10)}T00:00:00.000000Z`;

  const url = new URL("https://api.calendly.com/event_type_available_times");
  url.searchParams.set("event_type", eventTypeUri);
  url.searchParams.set("start_time", startTime);
  url.searchParams.set("end_time", endTime);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    // Fall back to seeded availability rather than surfacing a raw API error to the UI.
    return seededSlots(date);
  }

  const data = (await res.json()) as CalendlyAvailabilityResponse;
  const collection = Array.isArray(data.collection) ? data.collection : [];
  const times = collection
    .filter((s) => s.status === undefined || s.status === "available")
    .map((s) => {
      if (!s.start_time) return null;
      // start_time is an ISO string. Format in the BUSINESS timezone (America/New_York),
      // not the runtime-local zone (UTC on Vercel serverless) — otherwise a 9:00 ET slot
      // returns as "14:00" and disagrees with the seeded business-hour wall-clock times
      // (BUG-4, optimus-review Stage 1J).
      const hm = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(s.start_time));
      return hm === "24:00" ? "00:00" : hm;
    })
    .filter((t): t is string => t !== null);

  return Array.from(new Set(times)).sort();
}

export async function GET(req: NextRequest): Promise<Response> {
  const date = new URL(req.url).searchParams.get("date");

  if (!date || !ISO_DATE.test(date)) {
    return Response.json({ slots: [] as string[] }, { status: 400 });
  }

  const apiKey = process.env.CALENDLY_API_KEY;
  const eventTypeUri = process.env.NEXT_PUBLIC_CALENDLY_EVENT_TYPE_URI;

  if (apiKey && eventTypeUri) {
    const slots = await liveSlots(date, apiKey, eventTypeUri);
    return Response.json({ slots });
  }

  // Demo mode: deterministic seeded availability, no credentials required.
  return Response.json({ slots: seededSlots(date) });
}
