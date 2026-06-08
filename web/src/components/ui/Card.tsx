import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Hairline card (design-system §5): --bg-card fill, 1px --border-subtle border,
 * rounded-md, p-6 md:p-8, NO shadow. Hover brightens the border toward --accent
 * via the CSS-only .card-hover class (globals.css) so it stays a Server Component.
 */
export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`card-surface card-hover rounded-md border p-6 md:p-8 ${className}`}
      style={{ borderColor: "var(--border-subtle)" }}
    >
      {children}
    </div>
  );
}
