import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface CtaLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

/**
 * Brand CTA, generalized from Hero.tsx. Server Component — all hover states are
 * pure CSS (.btn-primary / .btn-secondary / .btn-ghost in globals.css), no JS.
 * Squared corners (rounded), NO drop shadow / glow (design-system §5).
 *
 * - primary:   1px brass border + brass text, transparent fill → hover fills solid brass, text → --primary.
 * - secondary: 1px --border-subtle border + --text-primary → hover border brightens to --text-secondary.
 * - ghost:     text + brass underline on hover.
 */
export default function CtaLink({ href, children, variant = "primary", className = "" }: CtaLinkProps) {
  const variantClass =
    variant === "primary"
      ? "btn-primary rounded border px-6 py-3.5 text-[15px] font-medium"
      : variant === "secondary"
        ? "btn-secondary rounded border px-6 py-3.5 text-[15px] font-medium"
        : "btn-ghost text-[15px] font-medium";

  return (
    <Link href={href} className={`inline-block transition-colors ${variantClass} ${className}`}>
      {children}
    </Link>
  );
}
