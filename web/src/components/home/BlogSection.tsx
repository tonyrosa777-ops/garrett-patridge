import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import CtaLink from "@/components/ui/Button";
import FadeUp from "@/components/animations/FadeUp";
import { blog } from "@/data/site";

// Band 7 — Authority / blog preview. Tone dark, motion grain, layout = editorial / magazine.
// One featured (first flagship) larger + 2 secondary. The AEO engine surfaced on the homepage
// (design-system §4 #7). Placeholder image box — real imagery is a later stage.
const posts = blog.posts;
const featured = posts.find((p) => p.isFlagship) ?? posts[0];
const secondary = posts.filter((p) => p.slug !== featured.slug).slice(0, 2);

export default function BlogSection() {
  return (
    <Section tone="dark" motion="grain" id="insights">
      <FadeUp className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <Eyebrow>Insights</Eyebrow>
          <h2
            className="mt-4 font-display font-bold"
            style={{ fontSize: "var(--text-h2)", color: "var(--text-primary)" }}
          >
            The defense-manufacturing operations record.
          </h2>
        </div>
        <CtaLink href="/blog" variant="ghost">
          All insights →
        </CtaLink>
      </FadeUp>

      <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Featured (larger) */}
        <FadeUp>
          <Link
            href={`/blog/${featured.slug}`}
            className="group block h-full rounded-md border p-6 transition-colors md:p-8"
            style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
          >
            <div
              className="relative mb-6 aspect-[3/2] w-full overflow-hidden rounded border"
              style={{ background: "var(--bg-elevated)", borderColor: "var(--border-subtle)" }}
            >
              <Image
                src={`/images/blog/${featured.slug}-card.png`}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <p
              className="font-mono text-[11px] uppercase tracking-[0.16em]"
              style={{ color: "var(--accent)" }}
            >
              {featured.category}
            </p>
            <h3
              className="mt-3 font-display font-semibold"
              style={{ fontSize: "var(--text-h3)", color: "var(--text-primary)" }}
            >
              {featured.title}
            </h3>
            <p className="mt-3 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {featured.excerpt}
            </p>
            <p
              className="font-mono mt-5 text-[13px]"
              style={{ color: "var(--text-primary)" }}
            >
              Read <span aria-hidden="true">→</span>
            </p>
          </Link>
        </FadeUp>

        {/* Two secondary — large full-height image left, vertically-centered content
            right, so the card fills its space (no empty void). Stacks on mobile. */}
        <div className="flex flex-col gap-8 lg:gap-10">
          {secondary.map((post, i) => (
            <FadeUp key={post.slug} delay={(i + 1) * 0.08} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid h-full grid-cols-1 overflow-hidden rounded-md border transition-colors sm:grid-cols-[5fr_7fr]"
                style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
              >
                {/* Image: full-width top on mobile, full-height left column on sm+ */}
                <div
                  className="relative aspect-[16/10] w-full sm:aspect-auto sm:h-full sm:min-h-[230px]"
                  style={{ background: "var(--bg-elevated)" }}
                >
                  <Image
                    src={`/images/blog/${post.slug}-card.png`}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                {/* Content: vertically centered → no empty gap at any card height */}
                <div className="flex min-w-0 flex-col justify-center gap-3 p-6 md:p-7">
                  <p
                    className="font-mono text-[11px] uppercase tracking-[0.16em]"
                    style={{ color: "var(--accent)" }}
                  >
                    {post.category}
                  </p>
                  <h3
                    className="font-display font-semibold leading-snug"
                    style={{ fontSize: "1.3rem", color: "var(--text-primary)" }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {post.excerpt}
                  </p>
                  <p
                    className="font-mono mt-1 text-[13px]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Read <span aria-hidden="true">→</span>
                  </p>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </Section>
  );
}
