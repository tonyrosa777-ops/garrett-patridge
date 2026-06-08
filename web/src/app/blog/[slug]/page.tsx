import { readFileSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import CtaLink from "@/components/ui/Button";
import FadeUp from "@/components/animations/FadeUp";
import { blog, gatedTool, siteConfig } from "@/data/site";

// Load the article body Markdown from src/content/blog/<slug>.md at build time (SSG).
// Returns "" if the briefing has not been written yet (falls back to the editorial note).
function loadArticleBody(slug: string): string {
  try {
    return readFileSync(
      path.join(process.cwd(), "src", "content", "blog", `${slug}.md`),
      "utf8",
    ).trim();
  } catch {
    return "";
  }
}

// /blog/[slug] (post template). Next 16 — params is a Promise, MUST await.
// METADATA-ONLY STAGE: the AEO directAnswer leads as citation bait, then the excerpt,
// then a clearly-marked editorial note that the full briefing is in preparation. No
// invented body, no lorem. Static-generated for all 12 slugs via generateStaticParams.
// Rhythm map (footer is dark navy, so the last content band must be LIGHT):
// [Nav]         — light — fixed bookend (chrome)
// PageHeader    — dark  — the AEO direct answer (citation bait)  → orbs
// Article body  — light — long-form + related + tool + CTA       → none (static gradient)
// [Footer]      — dark  — fixed bookend (navy)
// Tones: L D L D — strict alternation, ends LIGHT before the dark footer (2 content bands).

export function generateStaticParams() {
  return blog.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blog.posts.find((p) => p.slug === slug);
  if (!post) return {};

  const title = `${post.title} | Garrett Partridge`;
  const description = post.excerpt;
  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blog.posts.find((p) => p.slug === slug);
  if (!post) notFound();

  // 2-3 related posts: prefer same category, then fill from the rest. Never include self.
  const others = blog.posts.filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const related = [...sameCategory, ...others.filter((p) => p.category !== post.category)].slice(
    0,
    3,
  );

  const formattedDate = new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const postUrl = `${siteConfig.url}/blog/${post.slug}`;
  const body = loadArticleBody(post.slug);

  // Article + BreadcrumbList JSON-LD. author/publisher reference the site-wide
  // entity-graph @ids (Pattern #100) so the post is attributed to Garrett (Person)
  // and published by the practice (ProfessionalService). No fabricated fields.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        articleSection: post.category,
        inLanguage: "en-US",
        author: {
          "@type": "Person",
          "@id": `${siteConfig.url}/#garrett`,
          name: "Garrett Partridge",
        },
        publisher: { "@id": `${siteConfig.url}/#business` },
        mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
        url: postUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Insights", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        tone="dark"
        motion="orbs"
        eyebrow={post.category}
        title={post.title}
        intro={post.directAnswer}
      >
        {/* Author + date + reading time — mono control-panel meta under the title. */}
        <p
          className="mt-8 font-mono"
          style={{ color: "var(--text-muted)", fontSize: "var(--text-eyebrow)" }}
        >
          {post.author} · {formattedDate} · {post.readingTime}
        </p>
      </PageHeader>

      {/* ARTICLE BODY — light / none — long-form single column, serif. Static gradient ok.
          Related + tool nudge + CTA all merged into this one light band so the page ends
          LIGHT before the dark footer (footer-anchored parity). */}
      <Section tone="light" motion="none">
        <div className="mx-auto max-w-[68ch]">
          {body ? (
            <>
              {/* Full article body — Markdown from src/content/blog/<slug>.md, styled via .article-body. */}
              <article className="article-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
              </article>

              {/* Closing booking CTA after the article. */}
              <div
                className="mt-12 rounded-md border p-6 md:p-8"
                style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
              >
                <Eyebrow>Put this in front of an operator</Eyebrow>
                <p
                  className="mt-4"
                  style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)", lineHeight: 1.65 }}
                >
                  If this is the question on your floor right now, a strategic conversation is
                  the fastest way to pressure-test it against your actual operation.
                </p>
                <div className="mt-6">
                  <CtaLink href="/booking" variant="primary">
                    Request a Strategic Conversation
                  </CtaLink>
                </div>
              </div>
            </>
          ) : (
            // Fallback — only if a briefing has not been written yet. NOT a fake body.
            <div
              className="rounded-md border p-6 md:p-8"
              style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
            >
              <Eyebrow>Briefing in preparation</Eyebrow>
              <p
                className="mt-4"
                style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)", lineHeight: 1.65 }}
              >
                {post.excerpt} The direct answer above carries the core of it today. To put this
                question in front of an operator now, request a strategic conversation.
              </p>
              <div className="mt-6">
                <CtaLink href="/booking" variant="primary">
                  Request a Strategic Conversation
                </CtaLink>
              </div>
            </div>
          )}

          {/* Gated tool nudge. */}
          <div
            className="mt-10 rounded-md border p-6 md:p-8"
            style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
          >
            <p
              className="font-mono"
              style={{ color: "var(--accent)", fontSize: "var(--text-eyebrow)" }}
            >
              {gatedTool.eyebrow}
            </p>
            <h2 className="mt-3" style={{ fontSize: "var(--text-h3)" }}>
              {gatedTool.headline}
            </h2>
            <p
              className="mt-3"
              style={{ color: "var(--text-secondary)", fontSize: "var(--text-fine)", lineHeight: 1.6 }}
            >
              {gatedTool.body}
            </p>
            <div className="mt-5">
              <CtaLink href={`/${gatedTool.slug}`} variant="ghost">
                {gatedTool.submitLabel} →
              </CtaLink>
            </div>
          </div>

          {/* Related — mini-list of 2-3 other posts. */}
          {related.length > 0 ? (
            <FadeUp className="mt-14 border-t pt-10" >
              <Eyebrow>Related insights</Eyebrow>
              <ul className="mt-5 flex flex-col">
                {related.map((rel) => (
                  <li key={rel.slug}>
                    <Link
                      href={`/blog/${rel.slug}`}
                      className="card-hover group flex flex-col gap-1 border-b py-5"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      <span
                        className="font-mono"
                        style={{ color: "var(--text-muted)", fontSize: "var(--text-eyebrow)" }}
                      >
                        {rel.category}
                      </span>
                      <span
                        style={{ color: "var(--text-primary)", fontSize: "var(--text-body)", fontWeight: 500 }}
                      >
                        {rel.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CtaLink href="/blog" variant="ghost">
                  ← All insights
                </CtaLink>
              </div>
            </FadeUp>
          ) : null}
        </div>
      </Section>
    </>
  );
}
