"use client";

import Image from "next/image";
import { useRef } from "react";
import { cars } from "@/lib/data";
import { ArrowRight, ChevronLeft, ChevronRight } from "./icons";
import Reveal from "./Reveal";

export default function FeaturedVehicles() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 260; // Card width + gap
      scrollRef.current.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="cars" className="scroll-mt-24 bg-bg-2 py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              Explore the Hyundai Range
            </h2>
            <a
              href="#cars"
              className="group/link mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
            >
              View All Cars
              <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
            </a>
          </div>
          <div className="flex gap-2">
            <button
              aria-label="Previous car"
              onClick={() => scroll("left")}
              className="grid h-10 w-10 place-items-center rounded border border-border bg-white text-text transition-colors hover:bg-bg-3 hover:text-brand"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next car"
              onClick={() => scroll("right")}
              className="grid h-10 w-10 place-items-center rounded border border-border bg-white text-text transition-colors hover:bg-bg-3 hover:text-brand"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Reveal>

        {/* Scrollable car row */}
        <div 
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {cars.map((car, i) => (
            <Reveal
              key={car.name}
              delay={i * 70}
              variant="slide-left"
              className="w-[220px] shrink-0 snap-start sm:w-[240px]"
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-[0_2px_12px_0_rgba(0,44,95,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_0_rgba(0,44,95,0.14)]">
                {/* Car image — light studio plate */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#eef1f6] to-[#c9d1dc]">
                  <Image
                    src={car.image}
                    alt={car.alt}
                    fill
                    sizes="240px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
                    {car.type}
                  </p>
                  <h3 className="mt-0.5 font-display text-base font-bold text-text">
                    Hyundai {car.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    Starts from{" "}
                    <span className="font-semibold text-brand">
                      ₹{car.price} Lakh
                    </span>{" "}
                    <span className="text-faint">(ex-showroom)</span>
                  </p>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">
                    {car.blurb}
                  </p>
                  <a
                    href="#test-drive"
                    className="group/link mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
                  >
                    {car.cta}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
