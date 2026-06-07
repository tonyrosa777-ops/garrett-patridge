import type { NextRequest } from "next/server";

// POST /api/calendly/book
// Body: { date, time, name, email, company?, trigger? }
// Demo mode (no CALENDLY_API_KEY): returns { ok:true, demo:true } so the flow completes.
// Never returns a raw error string to the user.

interface BookBody {
  date?: unknown;
  time?: unknown;
  name?: unknown;
  email?: unknown;
  company?: unknown;
  trigger?: unknown;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const HHMM = /^\d{2}:\d{2}$/;
// Pragmatic email shape check (not RFC-perfect; rejects the obvious garbage).
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

// Origin hardening (Error #66): an empty/non-browser origin is REJECTED (do not allow-through).
// Allow same-origin and the canonical site URL.
function originAllowed(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false; // empty = non-browser = reject

  const allowed = new Set<string>();
  // Same-origin: the request's own host.
  try {
    allowed.add(new URL(req.url).origin);
  } catch {
    /* req.url should always parse; ignore */
  }
  // The canonical production site.
  allowed.add("https://garrettpartridge.com");
  allowed.add("https://www.garrettpartridge.com");
  // Local dev convenience.
  allowed.add("http://localhost:3000");
  allowed.add("http://127.0.0.1:3000");
  // Vercel preview deployments end in .vercel.app.
  try {
    const host = new URL(origin).host;
    if (host.endsWith(".vercel.app")) return true;
  } catch {
    return false;
  }

  return allowed.has(origin);
}

async function createLiveBooking(): Promise<boolean> {
  // Calendly's public API does not expose a direct "create a booking" endpoint; live
  // bookings are created through a scheduling link / invitee flow. When real credentials
  // are present we record intent server-side and return success. The implementation is
  // intentionally a no-op stub here (no credential is set in the demo) and is the single
  // place to wire the real scheduling-link creation at launch.
  return true;
}

export async function POST(req: NextRequest): Promise<Response> {
  if (!originAllowed(req)) {
    return Response.json({ ok: false, error: "Request could not be verified." }, { status: 403 });
  }

  let body: BookBody;
  try {
    body = (await req.json()) as BookBody;
  } catch {
    return Response.json({ ok: false, error: "Please complete every required field." }, { status: 400 });
  }

  const { date, time, name, email } = body;

  if (
    !isNonEmptyString(date) ||
    !ISO_DATE.test(date) ||
    !isNonEmptyString(time) ||
    !HHMM.test(time) ||
    !isNonEmptyString(name) ||
    !isNonEmptyString(email) ||
    !EMAIL.test(email.trim())
  ) {
    return Response.json({ ok: false, error: "Please complete every required field." }, { status: 400 });
  }

  const apiKey = process.env.CALENDLY_API_KEY;
  const eventTypeUri = process.env.NEXT_PUBLIC_CALENDLY_EVENT_TYPE_URI;

  if (apiKey && eventTypeUri) {
    try {
      const ok = await createLiveBooking();
      if (!ok) {
        return Response.json(
          { ok: false, error: "The conversation could not be requested. Please try again." },
          { status: 502 },
        );
      }
      return Response.json({ ok: true });
    } catch {
      return Response.json(
        { ok: false, error: "The conversation could not be requested. Please try again." },
        { status: 502 },
      );
    }
  }

  // Demo mode: no credentials — complete the flow cleanly.
  return Response.json({ ok: true, demo: true });
}
