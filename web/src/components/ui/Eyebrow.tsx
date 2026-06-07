import type { ElementType, ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  /** Override the rendered element (default <p>). */
  as?: ElementType;
  className?: string;
}

/**
 * Mono brass uppercase control-panel label (design-system §3 eyebrow).
 * Renders the .eyebrow class declared in globals.css. Server Component.
 */
export default function Eyebrow({ children, as: Tag = "p", className = "" }: EyebrowProps) {
  return <Tag className={`eyebrow ${className}`}>{children}</Tag>;
}
