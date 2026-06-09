import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import FadeUp from "@/components/animations/FadeUp";
import { blog, seo } from "@/data/site";

// /blog (index) — the AEO authority hub. Metadata-only stage: card metadata renders now,
// full bodies are a later wave. All copy from site.ts. Internal nav via <Link>.
// Rhythm map (footer is dark navy, so the last content band must be LIGHT):
// [Nav]            — light — fixed bookend (chrome)
// PageHeader       — dark  — authority intro            → grain
// Featured + grid  — light — content index (the slate)  → drift   (featured editorial + 3-col grid)
// [Footer]         — dark  — fixed bookend (navy)
// Tones: L D L D — strict alternation, ends LIGHT before the dark footer (2 content bands).

const entry = seo["/blog"];

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
  openGraph: { title: entry.title, description: entry.description },
};

// Mono control-panel meta line: date + reading time.
function PostMeta({ date, readingTime }: { date: string; readingTime: string }) {
  const formatted = new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <p
      className="font-mono"
      style={{ color: "var(--text-muted)", fontSize: "var(--text-eyebrow)" }}
    >
      {formatted} · {readingTime}
    </p>
  );
}

// Card image — the generated Higgsfield 3:2 still inside the same hairline-framed box.
// object-cover so the machined-instrument crop reads at any column width; the
// brass-tinted radial overlay stays as a quiet seam over the image.
function CardImage({
  slug,
  alt,
  ratio,
}: {
  slug: string;
  alt: string;
  ratio: string;
}) {
  return (
    <div
      className={`relative ${ratio} w-full overflow-hidden rounded border`}
      style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
    >
      <Image
        src={`/images/blog/${slug}-card.png`}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
      {/* Quiet brass hairline glow over the image so the frame reads as intentional. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 80% 0%, rgba(176,141,87,0.10) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export default function BlogIndexPage() {
  const posts = blog.posts;
  const featured = posts.find((p) => p.isFlagship) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <PageHeader
        tone="dark"
        motion="grain"
        eyebrow="Insights"
        title="Source-cited answers for the defense industrial base."
        intro="The operating questions a founder is actually fighting, answered the way an operator answers them. CMMC and DFARS, the Hidden Factory, onshoring and FOCI, AS9100 integration, and backlog-to-cash. Cited, specific, and built to be the reference the prime trusts."
      />

      {/* FEATURED + GRID — light / drift — the content slate. */}
      <Section tone="light" motion="drift">
        {/* Featured flagship — editorial / magazine layout, larger than the grid. */}
        <FadeUp>
          <Eyebrow>Featured briefing</Eyebrow>
          <Link
            href={`/blog/${featured.slug}`}
            className="card-surface card-hover mt-5 grid gap-8 rounded-md border p-6 md:p-8 lg:grid-cols-12 lg:gap-12"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            {/* Image fills its column on lg (lg:h-full + aspect-auto) so it matches the
                text column height — balanced 2-col, no dead space below the image (Rule G).
                On mobile it keeps the 3:2 ratio. */}
            <div className="lg:col-span-6 lg:h-full">
              <CardImage
                slug={featured.slug}
                alt={featured.title}
                ratio="aspect-[3/2] lg:aspect-auto lg:h-full lg:min-h-[300px]"
              />
            </div>
            <div className="flex flex-col justify-center lg:col-span-6">
              <p
                className="font-mono"
                style={{ color: "var(--accent)", fontSize: "var(--text-eyebrow)" }}
              >
                {featured.category}
              </p>
              {/* h3 size + 3-line clamp: keeps the card compact enough to sit fully below
                  the fixed nav (long SEO titles were ~5 lines at h2 → the card scrolled
                  half under the navbar). The full title still fits in 3 lines here. */}
              <h2
                className="mt-3 line-clamp-3"
                style={{ fontSize: "var(--text-h3)", lineHeight: 1.2 }}
              >
                {featured.title}
              </h2>
              <p
                className="mt-4"
                style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)" }}
              >
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between gap-4">
                <PostMeta date={featured.date} readingTime={featured.readingTime} />
                <span
                  className="font-mono"
                  style={{ color: "var(--accent)", fontSize: "var(--text-eyebrow)" }}
                >
                  Read →
                </span>
              </div>
            </div>
          </Link>
        </FadeUp>

        {/* The rest — equal-width cards, flex-wrap + justify-center so any trailing
            partial row CENTERS (balanced whitespace, never a lopsided right-void).
            11 cards → 3+3+3+2 with the final pair centered (Error #63/#71 fix: an
            orphan row left-aligned reads as a mistake; centered reads intentional).
            Basis math matches the gap so full rows are flush; box-sizing:border-box
            (globals) keeps 3-up exact. */}
        <div className="mt-16">
          <Eyebrow>The full slate</Eyebrow>
          <Stagger className="mt-6 flex flex-wrap justify-center gap-6">
            {rest.map((post) => (
              <StaggerItem
                key={post.slug}
                className="h-full basis-full sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <Card className="flex h-full flex-col">
                    <CardImage slug={post.slug} alt={post.title} ratio="aspect-[3/2]" />
                    <p
                      className="mt-5 font-mono"
                      style={{ color: "var(--accent)", fontSize: "var(--text-eyebrow)" }}
                    >
                      {post.category}
                    </p>
                    <h3
                      className="mt-2"
                      style={{ fontSize: "var(--text-h3)", lineHeight: 1.2 }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="mt-3 grow"
                      style={{ color: "var(--text-secondary)", fontSize: "var(--text-fine)" }}
                    >
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <PostMeta date={post.date} readingTime={post.readingTime} />
                      <span
                        className="font-mono shrink-0"
                        style={{ color: "var(--accent)", fontSize: "var(--text-eyebrow)" }}
                      >
                        Read →
                      </span>
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>
    </>
  );
}
