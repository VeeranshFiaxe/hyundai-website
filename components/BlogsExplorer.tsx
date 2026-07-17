"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogs, type Blog, blogHeroImage } from "@/lib/data";
import { ArrowRight, Search } from "./icons";

/* NOTE: counts below are illustrative marketing copy for the hero band.
   Replace with real, attributable figures before launch. */
const heroStats = [
  { value: "8+", label: "Articles published" },
  { value: "5", label: "Topics covered" },
  { value: "Monthly", label: "New stories added" },
];

const PAGE_SIZE = 6;

function fuzzyMatch(query: string, target: string): boolean {
  const q = query.toLowerCase();
  const t = target.toLowerCase();

  if (t.includes(q)) return true;

  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (q[qi] === t[ti]) qi++;
  }
  if (qi === q.length) return true;

  const words = t.split(/\s+/);
  if (words.some((w) => w.startsWith(q))) return true;

  const qWords = q.split(/\s+/);
  if (qWords.length > 1 && qWords.every((qw) => words.some((w) => w.startsWith(qw)))) return true;

  return false;
}

/* Local card style for the blogs explorer. Kept separate from the shared
   BlogCard so the home page and article "Related posts" keep their look. */
function ExplorerCard({ post }: { post: Blog }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white transition-all duration-200 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_12px_28px_rgba(0,44,95,0.09)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-2">
        <Image
          src={post.image}
          alt={post.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit items-center rounded-md bg-brand/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand">
          {post.category}
        </span>
        <h3 className="mt-3 flex-1 text-base font-bold leading-snug text-text transition-colors group-hover:text-brand">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-2.5 text-xs text-faint">
          <span>{post.readingTime}</span>
          <span aria-hidden="true" className="h-0.5 w-0.5 rounded-full bg-border-strong" />
          <span>{post.date}</span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogsExplorer() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(blogs.map((b) => b.category)))],
    [],
  );

  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [subscribed, setSubscribed] = useState(false);
  const articlesRef = useRef<HTMLElement>(null);

  // Featured = most recent post (data is ordered newest-first).
  const featured = blogs[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogs.filter((b) => {
      const matchesCat = category === "All" || b.category === category;
      const matchesQuery =
        !q ||
        fuzzyMatch(q, b.title) ||
        fuzzyMatch(q, b.excerpt) ||
        fuzzyMatch(q, b.category);
      return matchesCat && matchesQuery;
    });
  }, [category, query]);

  // Reset "load more" when the filter/search changes.
  const applyCategory = (cat: string) => {
    setCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  const applySearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVisibleCount(PAGE_SIZE);
    articlesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const shown = filtered.slice(0, visibleCount);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden bg-brand-deep py-16 text-white lg:py-20">
        <Image
          src={blogHeroImage}
          alt="Hyundai blog journal"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark overlay keeps the white hero copy legible across the image.
            Left-to-right for text contrast + bottom fade for depth. */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Decorative gradient + grid texture, scoped to the hero only. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(600px 300px at 85% -10%, rgba(59,111,240,0.35), transparent 60%), repeating-linear-gradient(100deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 90px)",
          }}
        />
        <div className="container-px relative mx-auto max-w-[1180px]">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8fb0ff]">
            Modi Hyundai Journal
          </span>
          <h1 className="mt-2.5 max-w-2xl font-display text-3xl font-semibold leading-[1.18] tracking-tight sm:text-4xl lg:text-[2.5rem]">
            Everything you need to know before, during and after the drive.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
            Buying guides, maintenance tips and dealership news from
            Mumbai&apos;s trusted Hyundai team.
          </p>

          {/* Search */}
          <form
            onSubmit={applySearch}
            role="search"
            className="mt-8 flex max-w-md gap-2.5"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, e.g. 'Creta maintenance'"
                aria-label="Search articles"
                className="w-full rounded-md border border-white/20 bg-white/5 py-3 pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-brand-light focus:ring-2 focus:ring-brand-light/20"
              />
            </div>
            <button
              type="submit"
              className="shrink-0 rounded-md bg-brand-light px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3b6ff0]"
            >
              Search
            </button>
          </form>

          {/* Stats */}
          <div className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/15 pt-7">
            {heroStats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-xl font-semibold sm:text-2xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FILTER TABS ---------------- */}
      <div className="bg-white pt-9">
        <div className="container-px mx-auto max-w-[1180px]">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => applyCategory(cat)}
                className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                  category === cat
                    ? "border-brand bg-brand text-white"
                    : "border-border text-muted hover:border-brand-light hover:text-brand"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- FEATURED ---------------- */}
      {featured && category === "All" && !query && (
        <section className="bg-white pt-10">
          <div className="container-px mx-auto max-w-[1180px]">
            <div className="grid overflow-hidden rounded-xl border border-border shadow-[0_1px_2px_rgba(0,44,95,0.04)] lg:grid-cols-[1.05fr_1fr]">
              <div className="relative min-h-[280px] lg:min-h-[340px]">
                <Image
                  src={featured.image}
                  alt={featured.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-brand shadow-sm">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-11">
                <span className="inline-flex w-fit items-center rounded-md bg-brand/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand">
                  {featured.category}
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold leading-snug text-text">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {featured.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-faint">
                  <span>{featured.category}</span>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-strong" />
                  <span>{featured.readingTime}</span>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-strong" />
                  <span>{featured.date}</span>
                </div>
                <Link
                  href={`/blogs/${featured.slug}`}
                  className="group mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-light transition-colors hover:text-brand"
                >
                  Read the full guide
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- GRID ---------------- */}
      <section ref={articlesRef} className="bg-white pb-4 pt-14">
        <div className="container-px mx-auto max-w-[1180px]">
          <div className="mb-7 flex items-baseline justify-between">
            <h3 className="font-display text-xl font-semibold text-text">
              Latest articles
            </h3>
            <span className="text-sm text-muted">
              Showing {shown.length} of {filtered.length}
            </span>
          </div>

          {shown.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-bg-2 py-20 text-center">
              <p className="text-sm font-semibold text-text">No articles found</p>
              <p className="mt-1 text-sm text-muted">
                Try a different search term or category.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  applyCategory("All");
                }}
                className="mt-4 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((post) => (
                <ExplorerCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {visibleCount < filtered.length && (
            <div className="mt-11 flex justify-center">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="inline-flex items-center gap-2 rounded-md border border-brand bg-transparent px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
              >
                Load more articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- NEWSLETTER ---------------- */}
      <section className="bg-white">
        <div className="container-px mx-auto max-w-[1180px] pb-20 pt-16">
          <div className="relative overflow-hidden rounded-xl bg-brand-deep px-6 py-12 text-white sm:px-10 sm:py-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(500px 260px at 12% 20%, rgba(59,111,240,0.3), transparent 60%)",
              }}
            />
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-2xl font-semibold">
                  Never miss an update
                </h3>
                <p className="mt-2 max-w-sm text-sm text-white/70">
                  New guides, maintenance reminders and offer alerts, straight
                  to your inbox.
                </p>
              </div>
              <div className="w-full sm:w-auto">
                {subscribed ? (
                  <div className="rounded-md border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
                    Thanks, you&apos;re subscribed! 🎉
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2.5">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      aria-label="Email address"
                      className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 sm:w-60"
                    />
                    <button
                      type="submit"
                      className="shrink-0 whitespace-nowrap rounded-md bg-brand-light px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3b6ff0]"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
                <p className="mt-2.5 text-xs text-white/50">
                  One email a month. No spam, ever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER CTA ---------------- */}
      <section className="bg-brand py-12 lg:py-16">
        <div className="container-px mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              Have a question about your next Hyundai?
            </h2>
            <p className="mt-2 max-w-lg text-sm text-white/70">
              Our team can help you compare models, plan your finance or book a
              test drive at a showroom near you.
            </p>
          </div>
          <Link
            href="/book-a-test-drive"
            className="group inline-flex shrink-0 items-center gap-2 rounded bg-white px-6 py-3 text-sm font-semibold text-brand transition-all hover:bg-white/90"
          >
            Book a Test Drive
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
