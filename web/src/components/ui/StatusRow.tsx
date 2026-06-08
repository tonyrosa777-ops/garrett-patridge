type Status = "cleared" | "warn" | "blocked";

interface StatusRowProps {
  status: Status;
  label: string;
  detail: string;
}

const STATUS_TOKEN: Record<Status, string> = {
  cleared: "var(--status-cleared)",
  warn: "var(--status-warn)",
  blocked: "var(--status-blocked)",
};

const STATUS_TEXT: Record<Status, string> = {
  cleared: "CLEARED",
  warn: "ACTION NEEDED",
  blocked: "NON-COMPLIANT",
};

/**
 * One instrument-readout row (design-system §5). Mono, narrow, with a status
 * indicator dot + pill in the matching status token color, a mono label, and a
 * detail line. Designed to sit inside <InstrumentTable> (hairline-separated rows).
 * Server Component.
 */
export default function StatusRow({ status, label, detail }: StatusRowProps) {
  const color = STATUS_TOKEN[status];

  return (
    <div
      className="grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-2 border-t py-5 first:border-t-0 md:grid-cols-[150px_1fr]"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      {/* Status indicator: dot + pill label (mono = the instrument signature) */}
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2 w-2 shrink-0 rounded-full"
          style={{ background: color }}
          aria-hidden="true"
        />
        <span
          className="font-mono text-[11px] uppercase tracking-[0.14em]"
          style={{ color }}
        >
          {STATUS_TEXT[status]}
        </span>
      </div>

      {/* Label + detail in the body font (Inter) — readable prose, not small mono. */}
      <div className="col-span-2 md:col-span-1">
        <p
          className="text-[15px] font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {label}
        </p>
        <p
          className="mt-1.5 text-[14px]"
          style={{ color: "var(--text-secondary)", lineHeight: 1.65 }}
        >
          {detail}
        </p>
      </div>
    </div>
  );
}
