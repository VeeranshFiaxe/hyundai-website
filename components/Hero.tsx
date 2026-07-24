"use client";

import { getImageProps } from "next/image";
import { useCallback, useEffect, useState } from "react";
import { heroSlides } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "./icons";

const AUTOPLAY = 6500;

// Matches hyundai.com/in/en's own hero <picture> breakpoints exactly.
const MOBILE_QUERY = "(max-width: 767px)";
const TABLET_QUERY = "(min-width: 768px) and (max-width: 1023px)";

function SlideImage({
  slide,
  active,
  priority,
}: {
  slide: (typeof heroSlides)[number];
  active: boolean;
  priority: boolean;
}) {
  const common = { alt: slide.alt, sizes: "100vw", priority };

  const { props: mobileImg } = getImageProps({
    ...common,
    src: slide.imageMobile,
    width: 580,
    height: 780,
    quality: 80,
  });
  const tabletImg = slide.imageTablet
    ? getImageProps({
        ...common,
        src: slide.imageTablet,
        width: 718,
        height: 384,
        quality: 80,
      }).props
    : null;
  // Desktop is the <picture>'s base <img> — same convention hyundai.com uses
  // (its own markup falls back to the "-pc"/"-des" image outside the two
  // <source> breakpoints below).
  const { props: desktopImg } = getImageProps({
    ...common,
    src: slide.image,
    width: 1860,
    height: 540,
    quality: 80,
  });

  return (
    <picture
      className="absolute inset-0 block h-full w-full transition-opacity duration-[900ms] ease-out"
      style={{ opacity: active ? 1 : 0 }}
    >
      {tabletImg && <source media={TABLET_QUERY} srcSet={tabletImg.srcSet} />}
      <source media={MOBILE_QUERY} srcSet={mobileImg.srcSet} />
      {/* Plain <img>, not next/image's <Image>: art-directed <picture> requires
          the raw element per Next.js's documented Art Direction pattern. */}
      <img {...desktopImg} alt={slide.alt} className="h-full w-full object-cover" />
    </picture>
  );
}

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
          navigation controls overlaid.

          hyundai.com itself serves a different, purpose-cropped image per
          breakpoint (mobile <=767px, tablet 768-1023px, desktop >=1024px) via
          a <picture> element — see lib/image-manifest.ts. We mirror that
          exactly instead of stretching one wide desktop banner to fit every
          screen.

          Every crop has a safe zone: empty margin around the headline/car
          that object-cover can eat into before it starts clipping text.
          Measured against the actual assets (not guessed): mobile crops
          (580:780) need zero crop to show clean on a phone; tablet crops
          (718:384) have very little slack (the tightest, Venue N Line,
          has ~2.5% before its badge/headline); desktop crops (1860:540)
          have more (~18% on the tightest headline, ~30% on the roomiest).
          --hero-min-aspect encodes "the narrowest this box may get" per
          tier, i.e. the most object-cover is allowed to crop from the
          sides before risking that tightest asset's text. The height
          picks the smaller of (a) fill the viewport below the nav, or
          (b) the width scaled down to that safe minimum aspect — so on
          any screen wide/short enough to stay within the safe crop, the
          hero genuinely fills the screen (like hyundai.com's own full
          -bleed desktop hero); on a screen too narrow/tall for that
          (most phones, portrait tablets), it backs off to a shorter,
          uncropped-or-safely-cropped box instead of slicing into text. */}
      <div
        className="relative w-full [--hero-min-aspect:0.7436] h-[min(calc(100dvh_-_60px),calc(100vw_/_var(--hero-min-aspect)))] md:[--hero-min-aspect:1.78] lg:[--hero-min-aspect:2.2]"
      >
        {heroSlides.map((slide, i) => (
          <SlideImage
            key={slide.model + i}
            slide={slide}
            active={i === index}
            priority={i === 0}
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
