import type { ReactNode } from "react";

interface InstrumentTableProps {
  /** Optional mono header row label rendered above the rows. */
  caption?: string;
  /** StatusRow children (or any hairline-separated rows). */
  children: ReactNode;
  className?: string;
}

/**
 * Signature instrument-readout container (design-system §5). Mono, narrow rows,
 * 1px --border-subtle hairlines between rows (each row owns its own top border;
 * see StatusRow). Sits on --bg-card with a hairline frame, no shadow.
 * Server Component. Pair with <StatusRow> for the homepage Problem fault list
 * and compliance matrices.
 */
export default function InstrumentTable({ caption, children, className = "" }: InstrumentTableProps) {
  return (
    <div
      className={`overflow-hidden rounded-md border ${className}`}
      style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
    >
      {caption ? (
        <div
          className="font-mono border-b px-5 py-3 text-[11px] uppercase tracking-[0.16em]"
          style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}
        >
          {caption}
        </div>
      ) : null}
      <div className="px-5 py-1">{children}</div>
    </div>
  );
}
