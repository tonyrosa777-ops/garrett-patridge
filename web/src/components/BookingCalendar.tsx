"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";

// Custom, fully branded scheduler. Calendly-API-backed under the hood (slots/book routes),
// but 100% native to the design tokens so it never reads as a third-party iframe.
// Self-sufficient solid surface (Error #54): renders on its own --bg-card panel so it looks
// correct dropped on BOTH dark and light sections. Works fully in demo mode (no API key):
// the /api/calendly/* routes return deterministic seeded availability + demo success.

interface BookingCalendarProps {
  heading?: string;
  intro?: string;
  eventTypeLabel?: string;
}

type Step = "date" | "time" | "form" | "done";

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

// Local-date helpers (avoid UTC drift on the calendar grid).
function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfDay(d: Date): Date {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function isWeekend(d: Date): boolean {
  const day = d.getDay();
  return day === 0 || day === 6;
}

// Render a 12h label from a "HH:MM" 24h slot for human reading; keep mono.
function displayTime(slot: string): string {
  const [hStr, mStr] = slot.split(":");
  const h = Number(hStr);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${mStr} ${period}`;
}

function longDate(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookingCalendar({
  heading = "Request a Strategic Conversation",
  intro = "A maximum of four concurrent engagements. Name your trigger and receive a realistic timing window within 48 hours.",
  eventTypeLabel = "Strategic conversation, 30 minutes",
}: BookingCalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const fieldId = useId();

  const [viewYear, setViewYear] = useState<number>(today.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(today.getMonth());

  const [step, setStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [trigger, setTrigger] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // The earliest month the user can view (no navigating into the past).
  const atEarliestMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();
  // Allow browsing the current month + next month only (slots are weekday business hours).
  const maxMonthDate = useMemo(() => {
    const d = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return d;
  }, [today]);
  const atLatestMonth = viewYear === maxMonthDate.getFullYear() && viewMonth === maxMonthDate.getMonth();

  // Build the calendar grid: leading blanks + each day of the month.
  const grid = useMemo(() => {
    const firstOfMonth = new Date(viewYear, viewMonth, 1);
    const leading = firstOfMonth.getDay(); // 0..6
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < leading; i++) cells.push(null);
    for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(viewYear, viewMonth, day));
    return cells;
  }, [viewYear, viewMonth]);

  const fetchSlots = useCallback(async (dateStr: string) => {
    setSlotsLoading(true);
    setSlotsError(null);
    setSlots([]);
    try {
      const res = await fetch(`/api/calendly/slots?date=${encodeURIComponent(dateStr)}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      const data = (await res.json()) as { slots?: string[] };
      const list = Array.isArray(data.slots) ? data.slots : [];
      setSlots(list);
      if (list.length === 0) {
        setSlotsError("No openings on this date. Please choose another.");
      }
    } catch {
      setSlotsError("Availability could not load. Please choose another date.");
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  function prevMonth() {
    if (atEarliestMonth) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (atLatestMonth) return;
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function selectDate(d: Date) {
    const dateStr = ymd(d);
    setSelectedDate(dateStr);
    setSelectedSlot(null);
    setStep("time");
    void fetchSlots(dateStr);
  }

  function selectSlot(slot: string) {
    setSelectedSlot(slot);
    setStep("form");
  }

  function backToDate() {
    setStep("date");
    setSelectedSlot(null);
  }

  function backToTime() {
    setStep("time");
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setSubmitError(null);

    if (!name.trim() || !email.trim() || !EMAIL.test(email.trim())) {
      setFormError("Please add your name and a valid work email.");
      return;
    }
    if (!selectedDate || !selectedSlot) {
      setFormError("Please select a date and time first.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/calendly/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedSlot,
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          trigger: trigger.trim() || undefined,
        }),
      });
      const data = (await res.json()) as { ok?: boolean };
      if (res.ok && data.ok) {
        setStep("done");
      } else {
        setSubmitError("The conversation could not be requested. Please try again.");
      }
    } catch {
      setSubmitError("The conversation could not be requested. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Reset slot error when navigating away from the time step.
  useEffect(() => {
    if (step !== "time") setSlotsError(null);
  }, [step]);

  // ---- shared inline token styles ----
  const panelStyle: React.CSSProperties = {
    background: "var(--bg-card)",
    border: "1px solid var(--border-subtle)",
    color: "var(--text-primary)",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--text-muted)",
  };
  const inputStyle: React.CSSProperties = {
    background: "var(--bg-elevated)",
    border: "1px solid var(--border-subtle)",
    color: "var(--text-primary)",
  };

  return (
    <div className="bookingcal rounded-md p-6 md:p-8" style={panelStyle}>
      <style>{`
        .bookingcal input:focus-visible,
        .bookingcal textarea:focus-visible {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent);
        }
        .bookingcal .daycell:focus-visible,
        .bookingcal .slotchip:focus-visible,
        .bookingcal .navchev:focus-visible {
          outline: none;
          box-shadow: 0 0 0 1px var(--accent);
        }
        @media (prefers-reduced-motion: reduce) {
          .bookingcal * { transition: none !important; }
        }
      `}</style>

      {/* Header */}
      <header className="mb-6">
        <h3 style={{ fontSize: "var(--text-h3, 1.5rem)", color: "var(--text-primary)" }}>{heading}</h3>
        <p className="mt-2 text-[15px]" style={{ color: "var(--text-secondary)" }}>
          {intro}
        </p>
        <p className="mt-2" style={labelStyle}>
          {eventTypeLabel}
        </p>
      </header>

      {/* STEP 1 — date */}
      {step === "date" && (
        <section aria-label="Choose a date">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={prevMonth}
              disabled={atEarliestMonth}
              aria-label="Previous month"
              className="navchev rounded px-3 py-2 text-[15px] transition-colors disabled:opacity-30"
              style={{ border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
            >
              ‹
            </button>
            <span
              className="text-center"
              style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.04em", color: "var(--text-primary)" }}
            >
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              disabled={atLatestMonth}
              aria-label="Next month"
              className="navchev rounded px-3 py-2 text-[15px] transition-colors disabled:opacity-30"
              style={{ border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {WEEKDAY_LABELS.map((w) => (
              <div
                key={w}
                aria-hidden="true"
                className="pb-2 text-center"
                style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}
              >
                {w}
              </div>
            ))}

            {grid.map((d, i) => {
              if (!d) return <div key={`blank-${i}`} aria-hidden="true" />;
              const dateStr = ymd(d);
              const isPast = startOfDay(d) < today;
              const weekend = isWeekend(d);
              const disabled = isPast || weekend;
              const isSelected = selectedDate === dateStr;
              return (
                <button
                  key={dateStr}
                  type="button"
                  disabled={disabled}
                  aria-label={
                    disabled
                      ? `${longDate(dateStr)}, unavailable`
                      : `Select ${longDate(dateStr)}`
                  }
                  aria-pressed={isSelected}
                  onClick={() => selectDate(d)}
                  className="daycell aspect-square rounded text-[14px] transition-colors disabled:cursor-not-allowed"
                  style={{
                    border: "1px solid var(--border-subtle)",
                    background: isSelected ? "var(--accent)" : "transparent",
                    color: isSelected
                      ? "var(--primary)"
                      : disabled
                        ? "var(--text-muted)"
                        : "var(--text-primary)",
                    opacity: disabled ? 0.35 : 1,
                  }}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          <p className="mt-4" style={labelStyle}>
            Weekdays only. Weekends and past dates are closed.
          </p>
        </section>
      )}

      {/* STEP 2 — time */}
      {step === "time" && selectedDate && (
        <section aria-label="Choose a time">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
              {longDate(selectedDate)}
            </p>
            <button
              type="button"
              onClick={backToDate}
              className="navchev rounded px-3 py-2 text-[13px] transition-colors"
              style={{ border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
            >
              Change date
            </button>
          </div>

          {slotsLoading && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" aria-hidden="true">
              {[0, 1, 2, 3].map((k) => (
                <div
                  key={k}
                  className="h-11 rounded"
                  style={{ background: "var(--bg-elevated)", opacity: 0.6 }}
                />
              ))}
            </div>
          )}

          {!slotsLoading && slots.length > 0 && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="group" aria-label="Available times">
              {slots.map((slot) => {
                const isSel = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    aria-pressed={isSel}
                    onClick={() => selectSlot(slot)}
                    className="slotchip rounded px-3 py-3 transition-colors"
                    style={{
                      border: "1px solid var(--border-subtle)",
                      background: isSel ? "var(--accent)" : "transparent",
                      color: isSel ? "var(--primary)" : "var(--text-primary)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "14px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {displayTime(slot)}
                  </button>
                );
              })}
            </div>
          )}

          {!slotsLoading && slotsError && (
            <p className="mt-1 text-[14px]" role="status" style={{ color: "var(--status-warn)" }}>
              {slotsError}
            </p>
          )}
        </section>
      )}

      {/* STEP 3 — confirm form */}
      {step === "form" && selectedDate && selectedSlot && (
        <section aria-label="Confirm your request">
          <div
            className="mb-6 rounded p-4"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
          >
            <p style={labelStyle}>Selected</p>
            <p className="mt-1" style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
              {longDate(selectedDate)} · {displayTime(selectedSlot)}
            </p>
            <button
              type="button"
              onClick={backToTime}
              className="navchev mt-3 rounded px-3 py-1.5 text-[13px] transition-colors"
              style={{ border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
            >
              Change time
            </button>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
            <div className="flex flex-col gap-2">
              <label htmlFor={`${fieldId}-name`} style={labelStyle}>
                Name
              </label>
              <input
                id={`${fieldId}-name`}
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded px-3 py-3 text-[15px]"
                style={inputStyle}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={`${fieldId}-email`} style={labelStyle}>
                Work email
              </label>
              <input
                id={`${fieldId}-email`}
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded px-3 py-3 text-[15px]"
                style={inputStyle}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={`${fieldId}-company`} style={labelStyle}>
                Company
              </label>
              <input
                id={`${fieldId}-company`}
                type="text"
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="rounded px-3 py-3 text-[15px]"
                style={inputStyle}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={`${fieldId}-trigger`} style={labelStyle}>
                What is the trigger? (optional)
              </label>
              <textarea
                id={`${fieldId}-trigger`}
                rows={3}
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                placeholder="A prime supplier letter, a CMMC audit window, an LOI in diligence."
                className="resize-y rounded px-3 py-3 text-[15px]"
                style={inputStyle}
              />
              <p style={{ ...labelStyle, textTransform: "none", letterSpacing: "0.02em" }}>
                Do not include Controlled Unclassified Information.
              </p>
            </div>

            {formError && (
              <p className="text-[14px]" role="alert" style={{ color: "var(--status-blocked)" }}>
                {formError}
              </p>
            )}
            {submitError && (
              <p className="text-[14px]" role="alert" style={{ color: "var(--status-blocked)" }}>
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="rounded border px-6 py-3.5 text-[15px] font-medium transition-colors disabled:opacity-60"
              style={{ borderColor: "var(--accent)", color: "var(--accent)", background: "transparent" }}
            >
              {submitting ? "Requesting…" : "Request a Strategic Conversation"}
            </button>
          </form>
        </section>
      )}

      {/* STEP 4 — confirmation */}
      {step === "done" && selectedDate && selectedSlot && (
        <section aria-label="Request confirmed" role="status">
          <div
            className="rounded p-6"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
          >
            <p style={{ ...labelStyle, color: "var(--status-cleared)" }}>Requested</p>
            <h4 className="mt-2" style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>
              Your strategic conversation is requested.
            </h4>
            <p className="mt-3 text-[15px]" style={{ color: "var(--text-secondary)" }}>
              Garrett responds within 48 hours with a realistic timing window.
            </p>
            <p className="mt-4" style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-muted)" }}>
              {longDate(selectedDate)} · {displayTime(selectedSlot)}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
