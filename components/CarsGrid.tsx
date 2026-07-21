"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cars, formatINR, type CarCategory } from "@/lib/data";
import { ArrowRight } from "./icons";
import Reveal from "./Reveal";

const categories: ("All" | CarCategory)[] = [
  "All",
  "SUV",
  "Sedan",
  "Hatchback",
  "Electric",
  "Taxi",
];

export default function CarsGrid() {
  const [category, setCategory] = useState<"All" | CarCategory>("All");
  const shuffleVersion = useRef(0);

  const displayed = useMemo(() => {
    const shouldShuffle = category === "All" || category === "SUV";
    const source = shouldShuffle ? [...cars] : cars;
    if (shouldShuffle) {
      shuffleVersion.current += 1;
      for (let i = source.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [source[i], source[j]] = [source[j], source[i]];
      }
    }
    return {
      cars: category === "All" ? source : source.filter((c) => c.category === category),
      version: shuffleVersion.current,
    };
  }, [category]);

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
          {displayed.cars.map((car, i) => {
            const displayName =
              "Hyundai " + car.name.charAt(0) + car.name.slice(1).toLowerCase();
            return (
              <Reveal key={`v${displayed.version}-${car.slug}`} delay={(i % 3) * 90} variant="fade-up">
                <Link
                  href={`/cars/${car.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-[0_2px_12px_0_rgba(0,44,95,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(0,44,95,0.12)]"
                >
                  <div className="relative flex h-44 items-center justify-center bg-bg-2 p-6">
                    <Image
                      src={car.image}
                      alt={car.alt}
                      width={400}
                      height={150}
                      className="h-auto w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                      {car.type}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-bold text-text">
                      {displayName}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      Starts from{" "}
                      <span className="font-semibold text-text">
                        {formatINR(car.priceINR)}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-faint">{car.fuel}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors group-hover:text-brand-light">
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
