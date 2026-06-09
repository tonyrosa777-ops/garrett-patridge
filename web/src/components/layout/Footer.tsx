import Link from "next/link";
import Container from "@/components/ui/Container";
import { siteConfig, footer } from "@/data/site";

/**
 * The fixed DARK navy-gunmetal bookend (design-system §4).
 * Base --primary, a top 1px --border-subtle hairline, generous padding.
 * Renders the closing statement, tagline, link columns, an optional LinkedIn
 * link (guarded so the empty string launch-blocker does not render a dead link),
 * the privacy note, and the legal fine print. No white anywhere.
 * Server Component.
 */
export default function Footer() {
  const { closingStatement, tagline, columns, legal, privacyNote } = footer;
  const linkedin = siteConfig.social.linkedin;

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "var(--primary)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      {/* Premium close — a quiet brass glow rising from the base + drifting ash embers
          behind the footer chrome (also keeps the footer from reading as a flat fill).
          CSS-only; ash freezes under prefers-reduced-motion (globals). */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(85% 120% at 50% 118%, rgba(184,134,75,0.13) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="amb-ash pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      <Container className="relative z-10 py-16 md:py-20 lg:py-24">
        {/* Closing statement — signature-style, larger */}
        <p
          className="font-display max-w-3xl font-semibold"
          style={{
            fontSize: "var(--text-h3)",
            color: "var(--text-primary)",
            lineHeight: 1.3,
          }}
        >
          {closingStatement}
        </p>

        {/* Tagline — mono eyebrow register */}
        <p
          className="font-mono mt-6 uppercase"
          style={{
            fontSize: "var(--text-eyebrow)",
            letterSpacing: "0.16em",
            color: "var(--text-secondary)",
          }}
        >
          {tagline}
        </p>

        <hr className="hairline my-12" />

        {/* Link columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3
                className="font-mono mb-4 uppercase"
                style={{
                  fontSize: "var(--text-eyebrow)",
                  letterSpacing: "0.14em",
                  color: "var(--accent)",
                }}
              >
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((linkItem) => (
                  <li key={linkItem.href}>
                    <Link
                      href={linkItem.href}
                      className="btn-ghost text-[15px]"
                    >
                      {linkItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* LinkedIn — guarded against the empty-string launch-blocker */}
        {linkedin && (
          <div className="mt-10">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-[15px]"
            >
              LinkedIn
            </a>
          </div>
        )}

        <hr className="hairline my-12" />

        {/* Privacy note */}
        <p
          className="max-w-3xl"
          style={{ fontSize: "var(--text-fine)", color: "var(--text-muted)" }}
        >
          {privacyNote}
        </p>

        {/* Legal fine print */}
        <p
          className="mt-6"
          style={{ fontSize: "var(--text-fine)", color: "var(--text-muted)" }}
        >
          {legal}
        </p>
      </Container>
    </footer>
  );
}
