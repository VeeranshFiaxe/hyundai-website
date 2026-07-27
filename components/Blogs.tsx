import Link from "next/link";
import { blogs } from "@/lib/data";
import { ArrowRight } from "./icons";
import Reveal from "./Reveal";
import BlogCard from "./BlogCard";

/* Home-page blog teaser. Shows the 4 most recent posts and links to the
   dedicated /blogs listing (and each post). The full list lives on /blogs. */
export default function Blogs() {
  const latest = blogs.slice(0, 4);

  return (
    <section id="blogs" className="scroll-mt-24 bg-bg-2 py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
            Latest from our Blog
          </h2>
          <Link
            href="/blogs"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
          >
            View All Blogs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        {/* Horizontal scroll on mobile (keeps vertical space in check, matches
            the reviews carousel); 4-column equal grid from sm up. */}
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {latest.map((post, i) => (
            <Reveal
              key={post.slug}
              delay={i * 70}
              className="w-[78vw] shrink-0 snap-start sm:w-auto sm:shrink"
            >
              {/* Render as div: the article semantics live inside BlogCard. */}
              <BlogCard post={post} as="div" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
