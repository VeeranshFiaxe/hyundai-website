"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { cars, heroSlides } from "@/lib/data";
import { ArrowRight, ChevronLeft, ChevronRight } from "./icons";

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

  const active = heroSlides[index];
  const activeCar = cars.find((c) =>
    active.model.toUpperCase().includes(c.name),
  );

  return (
    <section
      id="home"
      className="relative scroll-mt-24 overflow-hidden bg-brand-deep"
      style={{ marginTop: "96px" }} /* offset for 2-row nav */
    >
      {/* Cinematic banner, matching hyundai.com's own hero treatment:
          the official campaign photography already carries the headline,
          so we don't overlay a duplicate one on top of it. */}
      <div className="relative h-[420px] w-full sm:h-[480px] lg:h-[540px] xl:h-[580px]">
        {heroSlides.map((slide, i) => (
          <Image
            key={slide.model}
            src={slide.image}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover transition-opacity duration-[900ms] ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}

        {/* Bottom scrim so the dealer's own price/CTA row stays legible
            over any part of the photo, without covering the manufacturer's
            headline near the top of the frame. */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        {/* SEO H1: tucked into the bottom-right corner, out of the way of
            the campaign headline, the price/CTA row, and the floating
            action rail. */}
        <h1 className="absolute bottom-4 right-4 z-10 max-w-[150px] rounded bg-black/30 px-2 py-1 text-right text-[9px] font-medium uppercase tracking-wide text-white/80 backdrop-blur-sm sm:bottom-6 sm:right-6">
          New Hyundai Cars, Test Drives &amp; Service Across Mumbai Region
        </h1>

        {/* Dealer price + CTA row, bottom-left */}
        <div className="container-px absolute inset-x-0 bottom-14 z-10 mx-auto max-w-[1400px] sm:bottom-16">
          <div key={index} style={{ animation: "fade-up .5s both" }}>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-sm text-white/70">
                Hyundai {active.model.replace("Hyundai ", "")} from
              </span>
              <span className="font-display text-2xl font-bold text-white">
                ₹{active.price} Lakh
              </span>
              <span className="text-xs text-white/50">(ex-showroom)</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/book-a-test-drive"
                className="group inline-flex items-center gap-2 rounded bg-white px-6 py-3 text-sm font-semibold text-brand transition-all hover:bg-white/90"
              >
                Book a Test Drive
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={activeCar ? `/cars/${activeCar.slug}` : "/cars"}
                className="inline-flex items-center gap-2 rounded border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                Explore the {active.model.replace("Hyundai ", "")}
              </Link>
            </div>
          </div>
        </div>

        {/* Slide arrows */}
        <button
          aria-label="Previous"
          onClick={() => go(-1)}
          className="absolute left-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition-colors hover:bg-black/40"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next"
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition-colors hover:bg-black/40"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={s.model}
              aria-label={`Show ${s.model}`}
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
