"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { heroSlides } from "@/lib/data";
import { ArrowRight, ChevronLeft, ChevronRight } from "./icons";
import HeroForm from "./HeroForm";

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

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{ marginTop: "96px" }} /* offset for 2-row nav */
    >
      {/* Full-bleed image area */}
      <div className="relative h-[calc(100vh-96px)] min-h-[540px] w-full">
        {heroSlides.map((slide, i) => (
          <Image
            key={slide.model}
            src={slide.image}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center transition-all duration-[1400ms] ease-out"
            style={{
              opacity: i === index ? 1 : 0,
              transform: i === index ? "scale(1)" : "scale(1.04)",
            }}
          />
        ))}

        {/* Gradient overlay: left-side text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

        {/* Copy and Form */}
        <div className="container-px relative z-10 mx-auto flex h-full max-w-[1400px] items-center justify-between gap-10">
          {/* Text block */}
          <div className="max-w-lg">
            {/* Stable, keyword + location H1 (the page's single H1). */}
            <h1 className="mb-4 inline-block rounded bg-brand/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
              New Hyundai Cars, Test Drives &amp; Service in Mumbai &amp; Pune
            </h1>
            <div key={index}>
              <p
                className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
                style={{ animation: "fade-up .6s .12s both" }}
              >
                {active.headline}
              </p>
              <p
                className="mt-4 max-w-md text-base leading-relaxed text-white/80"
                style={{ animation: "fade-up .6s .2s both" }}
              >
                {active.sub}
              </p>
              <div
                className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1"
                style={{ animation: "fade-up .6s .28s both" }}
              >
                <span className="text-sm text-white/70">
                  Hyundai {active.model.replace("Hyundai ", "")} from
                </span>
                <span className="font-display text-2xl font-bold text-white">
                  ₹{active.price} Lakh
                </span>
                <span className="text-xs text-white/50">(ex-showroom)</span>
              </div>
              <div
                className="mt-6 flex flex-wrap items-center gap-3"
                style={{ animation: "fade-up .6s .36s both" }}
              >
                <a
                  href="#test-drive"
                  className="group inline-flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light"
                >
                  Book a Test Drive
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#cars"
                  className="inline-flex items-center gap-2 rounded border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  Explore the {active.model.replace("Hyundai ", "")}
                </a>
              </div>
            </div>
          </div>

          {/* Form block */}
          <div
            className="hidden lg:block lg:mr-8 xl:mr-16"
            style={{ animation: "fade-up .8s .6s both" }}
          >
            <HeroForm />
          </div>
        </div>

        {/* Slide arrows */}
        <button
          aria-label="Previous"
          onClick={() => go(-1)}
          className="absolute left-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur transition-colors hover:bg-black/50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next"
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur transition-colors hover:bg-black/50"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
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
