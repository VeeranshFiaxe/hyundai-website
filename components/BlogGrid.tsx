"use client";

import { useState } from "react";
import { blogs } from "@/lib/data";
import Reveal from "./Reveal";
import BlogCard from "./BlogCard";

/* Filterable blog grid. Categories are derived from the data so new
   categories appear automatically. Mirrors the CarsGrid filter pattern. */
export default function BlogGrid() {
  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];
  const [category, setCategory] = useState<string>("All");

  const filtered =
    category === "All" ? blogs : blogs.filter((b) => b.category === category);

  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="container-px mx-auto max-w-[1400px]">
        <Reveal className="flex flex-wrap gap-1 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 rounded border-b-2 px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                category === cat
                  ? "border-brand text-brand"
                  : "border-transparent text-muted hover:text-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 90} variant="fade-up">
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
