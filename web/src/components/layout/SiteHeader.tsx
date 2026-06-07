"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CtaLink from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

/**
 * Fixed top navigation (design-system §5).
 * - Transparent over the hero; on scroll past ~24px gains a --primary-with-opacity
 *   background + a 1px brass bottom underline. Quiet transition (design-system §8).
 * - Desktop: wordmark left, nav links center/right, brass-outline booking CTA far right.
 *   The internal "⬥ Pricing" marker renders in brass to stay visually distinct.
 * - Mobile: hamburger → DARK, fully-opaque drawer containing ALL nav items
 *   (including ⬥ Pricing) plus the booking CTA, with an inner X close (Error #38).
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const { name, nav, navCta } = siteConfig;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 h-20 transition-colors duration-300 md:h-24"
      style={{
        background: scrolled ? "rgba(14, 17, 22, 0.88)" : "transparent",
        borderBottom: scrolled
          ? "1px solid var(--accent)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6 md:px-10">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight md:text-xl"
          style={{ color: "var(--text-primary)" }}
        >
          {name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((linkItem) => {
            const internal = "internal" in linkItem && linkItem.internal === true;
            return (
              <Link
                key={linkItem.href}
                href={linkItem.href}
                className="btn-ghost text-[15px]"
                style={internal ? { color: "var(--accent)" } : undefined}
              >
                {linkItem.label}
              </Link>
            );
          })}
          <CtaLink href={navCta.href} variant="primary">
            {navCta.label}
          </CtaLink>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label="Open navigation menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span className="relative block h-4 w-6">
            <span
              className="absolute left-0 top-0 h-0.5 w-full"
              style={{ background: "var(--text-primary)" }}
            />
            <span
              className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2"
              style={{ background: "var(--text-primary)" }}
            />
            <span
              className="absolute bottom-0 left-0 h-0.5 w-full"
              style={{ background: "var(--text-primary)" }}
            />
          </span>
        </button>
      </div>

      {/* Mobile drawer — DARK, fully opaque overlay (Enchanted Madison transparent-overlay bug). */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col md:hidden"
          style={{ background: "var(--primary)" }}
        >
          <div className="flex h-20 items-center justify-between px-6">
            <Link
              href="/"
              className="font-display text-lg font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
              onClick={() => setOpen(false)}
            >
              {name}
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
            >
              <span className="relative block h-5 w-5">
                <span
                  className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rotate-45"
                  style={{ background: "var(--text-primary)" }}
                />
                <span
                  className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 -rotate-45"
                  style={{ background: "var(--text-primary)" }}
                />
              </span>
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-2 px-6 pt-6">
            {nav.map((linkItem) => {
              const internal = "internal" in linkItem && linkItem.internal === true;
              return (
                <Link
                  key={linkItem.href}
                  href={linkItem.href}
                  onClick={() => setOpen(false)}
                  className="py-3 font-display text-2xl font-semibold"
                  style={{ color: internal ? "var(--accent)" : "var(--text-primary)" }}
                >
                  {linkItem.label}
                </Link>
              );
            })}
            <div className="mt-6">
              <CtaLink href={navCta.href} variant="primary" className="block w-full text-center">
                {navCta.label}
              </CtaLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
