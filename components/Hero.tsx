"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { heroSlides } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "./icons";

const AUTOPLAY = 6500;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const count = heroSlides.length;
  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY);
    return () => clearInterval(t);
  }, [count]);

  return (
    <section
      id="home"
      className="relative scroll-mt-24 overflow-hidden bg-brand-deep"
      style={{ marginTop: "60px" }} /* offset for fixed nav */
    >
      {/* Cinematic banner carousel, matching hyundai.com's own hero
          treatment: the official campaign photography already carries the
          manufacturer headline, so the image is shown clean with only the
          navigation controls overlaid. */}
      <div className="relative h-[calc(100vh-60px)] w-full">
        {heroSlides.map((slide, i) => (
          <Image
            key={slide.model + i}
            src={slide.image}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover transition-opacity duration-[900ms] ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}

        {/* Soft edge scrim so the dot indicators stay legible over any photo. */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent" />

        {/* The page's primary H1. Visually hidden but kept in the DOM so the
            homepage carries a clear SEO heading without overlaying text on
            the manufacturer's campaign photography. */}
        <h1 className="sr-only">
          New Hyundai Cars, Test Drives &amp; Authorised Service Across the
          Mumbai Region | Modi Hyundai
        </h1>

        {/* Slide arrows */}
        <button
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className="absolute left-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition-colors hover:bg-black/40"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition-colors hover:bg-black/40"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={s.model + i}
              aria-label={`Show slide ${i + 1} of ${count}`}
              onClick={() => setIndex(i)}
              className="h-1.5 overflow-hidden rounded-full bg-white/30 transition-all"
              style={{ width: i === index ? 32 : 10 }}
            >
              <span
                className="block h-full rounded-full bg-white"
                style={{
                  width: i === index ? "100%" : "0%",
                  transition: i === index ? `width ${AUTOPLAY}ms linear` : "none",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
