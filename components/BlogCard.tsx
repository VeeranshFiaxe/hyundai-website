import Image from "next/image";
import Link from "next/link";
import type { Blog } from "@/lib/data";
import { ArrowRight } from "./icons";

type Props = {
  post: Blog;
  /** Render wrapper as an article (default) or a div, to keep nesting valid. */
  as?: "article" | "div";
};

/* Shared blog card used by the /blogs grid, the home-page teaser and the
   article page's related-posts row so the visual treatment stays identical
   everywhere. Renders as a Next.js <Link> to the post page. */
export default function BlogCard({ post, as = "article" }: Props) {
  const Tag = as;
  return (
    <Tag className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-[0_2px_12px_0_rgba(0,44,95,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(0,44,95,0.12)]">
      <Link href={`/blogs/${post.slug}`} className="flex h-full flex-col">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.image}
            alt={post.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="font-semibold text-brand">{post.category}</span>
            <span aria-hidden="true" className="text-faint">·</span>
            <span>{post.date}</span>
          </div>
          <h3 className="mt-2 flex-1 text-sm font-bold leading-snug text-text transition-colors group-hover:text-brand sm:text-base">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted sm:text-sm">
              {post.excerpt}
            </p>
          )}
          <span className="group/link mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand transition-colors group-hover:text-brand-light">
            Read more
            <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </Tag>
  );
}
