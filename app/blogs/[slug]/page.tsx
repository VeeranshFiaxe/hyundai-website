import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import BlogCard from "@/components/BlogCard";
import { ArrowRight, ArrowLeft } from "@/components/icons";
import { blogs, company, SITE_URL } from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

function getPost(slug: string) {
  return blogs.find((b) => b.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blogs/${post.slug}`,
      images: [post.image],
      publishedTime: new Date(post.date).toISOString(),
      authors: [company.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Related posts: prefer the same category, fill with others, never self.
  const related = blogs
    .filter((b) => b.slug !== post.slug)
    .sort((a, b) => {
      const aSame = a.category === post.category ? -1 : 0;
      const bSame = b.category === post.category ? -1 : 0;
      return aSame - bSame;
    })
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blogs/${post.slug}#article`,
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: new Date(post.date).toISOString(),
        dateModified: new Date(post.date).toISOString(),
        articleSection: post.category,
        inLanguage: "en-IN",
        author: { "@type": "Organization", name: company.name, url: SITE_URL },
        publisher: { "@id": DEALER_ID },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE_URL}/blogs/${post.slug}`,
        },
        articleBody: post.content
          .flatMap((s) => [s.heading, ...s.body])
          .filter(Boolean)
          .join("\n"),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blogs` },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `${SITE_URL}/blogs/${post.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
      />
      <main style={{ marginTop: "96px" }}>
        {/* Hero */}
        <section className="bg-bg-2 py-10 lg:py-14">
          <div className="container-px mx-auto max-w-3xl">
            <Reveal>
              <nav className="flex items-center gap-1.5 text-xs text-muted" aria-label="Breadcrumb">
                <Link href="/" className="transition-colors hover:text-brand">Home</Link>
                <span aria-hidden="true" className="text-faint">/</span>
                <Link href="/blogs" className="transition-colors hover:text-brand">Blog</Link>
              </nav>
              <div className="mt-4 flex items-center gap-2 text-xs">
                <span className="rounded-full bg-brand/10 px-3 py-1 font-semibold text-brand">
                  {post.category}
                </span>
                <span className="text-muted">{post.date}</span>
                <span aria-hidden="true" className="text-faint">·</span>
                <span className="text-muted">{post.readingTime}</span>
              </div>
              <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-text sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                {post.excerpt}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Hero image */}
        <section className="bg-white">
          <div className="container-px mx-auto max-w-4xl">
            <Reveal className="relative -mt-6 aspect-[16/9] overflow-hidden rounded-xl border border-border bg-bg-2 shadow-[0_4px_24px_rgba(0,44,95,0.08)]">
              <Image
                src={post.image}
                alt={post.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 768px"
                className="object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* Article body */}
        <section className="bg-white py-10 lg:py-14">
          <div className="container-px mx-auto max-w-3xl">
            <div className="space-y-8">
              {post.content.map((section, i) => (
                <Reveal key={i} variant="fade-up">
                  <div className="space-y-3">
                    {section.heading && (
                      <h2 className="font-display text-xl font-bold text-text sm:text-2xl">
                        {section.heading}
                      </h2>
                    )}
                    {section.body.map((para, j) => (
                      <p key={j} className="text-sm leading-relaxed text-muted sm:text-base">
                        {para}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Back to blog */}
            <div className="mt-10 border-t border-border pt-6">
              <Link
                href="/blogs"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Back to all blogs
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-bg-2 py-12 lg:py-16">
          <Reveal className="container-px mx-auto flex max-w-[1400px] flex-col items-center gap-4 text-center">
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              Ready to take the next step?
            </h2>
            <p className="max-w-md text-sm text-muted">
              Book a test drive or talk to our team about finance, exchange and
              service at a Modi Hyundai showroom near you.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/book-a-test-drive"
                className="group inline-flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light"
              >
                Book a Test Drive
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/cars"
                className="inline-flex items-center gap-2 rounded border border-brand px-6 py-3 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-white"
              >
                Browse Cars
              </Link>
            </div>
          </Reveal>
        </section>

        {/* Related posts */}
        <section className="bg-white py-14 lg:py-20">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Keep reading
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                Related articles
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relPost, i) => (
                <Reveal key={relPost.slug} delay={i * 90} variant="fade-up">
                  <BlogCard post={relPost} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
