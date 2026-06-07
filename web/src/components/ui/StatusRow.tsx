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
      className="font-mono grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-1 border-t py-3 first:border-t-0 md:grid-cols-[140px_1fr]"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      {/* Status indicator: dot + pill label */}
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ background: color }}
          aria-hidden="true"
        />
        <span
          className="text-[11px] uppercase tracking-[0.14em]"
          style={{ color }}
        >
          {STATUS_TEXT[status]}
        </span>
      </div>

      <div className="col-span-2 md:col-span-1">
        <p className="text-[15px]" style={{ color: "var(--text-primary)" }}>
          {label}
        </p>
        <p
          className="mt-0.5 text-[13px] leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {detail}
        </p>
      </div>
    </div>
  );
}
