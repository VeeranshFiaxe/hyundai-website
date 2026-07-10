"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cars, formatINR, type CarCategory } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";
import CarModal from "./CarModal";

const categories: ("All" | CarCategory)[] = [
  "All",
  "SUV",
  "Sedan",
  "Hatchback",
  "Electric",
  "Taxi",
];

export default function FeaturedVehicles() {
  const [category, setCategory] = useState<"All" | CarCategory>("All");
  const [index, setIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(1000);
  const [prevCategory, setPrevCategory] = useState(category);

  const filtered =
    category === "All" ? cars : cars.filter((c) => c.category === category);
  const active = filtered[index] ?? filtered[0];

  if (category !== prevCategory) {
    setPrevCategory(category);
    setIndex(0);
  }

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setStageWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const len = filtered.length;
  const go = (dir: number) => setIndex((i) => (i + dir + len) % len);

  // Step distance and scale/opacity falloff are proportional to the stage's
  // own measured width, so the "coverflow" spacing stays consistent across
  // breakpoints without a hardcoded pixel value.
  const step = Math.min(stageWidth * 0.34, 360);
  // The centre card renders larger than its neighbours, so a purely linear
  // step makes the main-to-neighbour gap look tighter than the gaps further
  // out. A small constant push on every non-zero offset widens just that
  // first gap, without changing the spacing between the side cards.
  const centreGapBoost = 14;

  return (
    <section
      id="cars"
      className="scroll-mt-24 overflow-hidden bg-white py-8 lg:py-10"
    >
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Category tabs */}
        <Reveal className="flex justify-center">
          <div className="flex gap-1 overflow-x-auto sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`shrink-0 border-b-2 px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                  category === cat
                    ? "border-brand text-brand"
                    : "border-transparent text-muted hover:text-text"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Coverflow stage */}
        <div
          ref={stageRef}
          className="relative mt-2 h-[180px] select-none sm:h-[220px] lg:h-[260px]"
        >
          <button
            aria-label="Previous car"
            onClick={() => go(-1)}
            className="absolute left-0 top-1/2 z-40 grid h-10 w-10 -translate-y-1/2 place-items-center text-text transition-opacity sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {filtered.map((car, i) => {
            let offset = i - index;
            if (offset > len / 2) offset -= len;
            if (offset < -len / 2) offset += len;
            if (Math.abs(offset) > 3) return null;
            const abs = Math.abs(offset);
            const scale = offset === 0 ? 1 : Math.max(0.42, 0.72 - abs * 0.14);
            const opacity = abs > 2 ? 0 : 1 - abs * 0.32;
            const translateX =
              offset === 0
                ? 0
                : Math.sign(offset) * (abs * step + centreGapBoost);
            return (
              <div
                key={car.name}
                onClick={() => offset !== 0 && setIndex(i)}
                className="absolute left-1/2 top-1/2 flex h-full w-[70%] items-center justify-center transition-all duration-500 ease-out sm:w-[55%] lg:w-[46%]"
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex: 20 - abs,
                  cursor: offset !== 0 ? "pointer" : "default",
                  pointerEvents: abs > 2 ? "none" : "auto",
                }}
              >
                <Image
                  src={car.image}
                  alt={car.alt}
                  width={800}
                  height={295}
                  priority={offset === 0}
                  className="h-auto w-full object-contain drop-shadow-xl"
                />
              </div>
            );
          })}

          <button
            aria-label="Next car"
            onClick={() => go(1)}
            className="absolute right-0 top-1/2 z-40 grid h-10 w-10 -translate-y-1/2 place-items-center text-text transition-opacity sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Info row, keyed so it fades between models */}
        <div
          key={active.name}
          className="mx-auto mt-1 max-w-2xl text-center animate-[fade-up_.35s_ease-out_both]"
        >
          <button
            type="button"
            onClick={() => setShowDetails(true)}
            className="group mx-auto inline-flex items-center gap-1 text-xl font-bold text-brand transition-colors hover:text-brand-light sm:text-2xl"
          >
            Hyundai {active.name.charAt(0) + active.name.slice(1).toLowerCase()}
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          <div className="mt-2 grid grid-cols-1 gap-2 border-t border-border pt-2 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium text-muted">Starting at</p>
              <p className="mt-0.5 text-base font-semibold text-text">
                {formatINR(active.priceINR)}
              </p>
              <p className="text-xs text-faint">*Ex Showroom Price</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Engine</p>
              <p className="mt-0.5 text-sm text-text">{active.engine}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Transmission available</p>
              <p className="mt-0.5 text-sm text-text">{active.transmission}</p>
            </div>
          </div>
        </div>
      </div>

      {showDetails && (
        <CarModal car={active} onClose={() => setShowDetails(false)} />
      )}
    </section>
  );
}
