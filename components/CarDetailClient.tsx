"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/lib/data";
import { formatINR } from "@/lib/data";
import { Check, ArrowRight } from "./icons";
import Reveal from "./Reveal";

export default function CarDetailClient({ car }: { car: Car }) {
  const [colorIndex, setColorIndex] = useState(0);
  const color = car.colors[colorIndex];
  const displayName =
    "Hyundai " + car.name.charAt(0) + car.name.slice(1).toLowerCase();

  const transmissions = car.transmission.split(",").map((t) => t.trim());
  const engines = car.engine.split(",").map((t) => t.trim());

  return (
    <section className="bg-white py-10 lg:py-16">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image + colour picker */}
          <Reveal variant="slide-right">
            <div className="relative flex h-[280px] items-center justify-center rounded-lg bg-bg-2 sm:h-[360px] lg:h-[420px]">
              <Image
                key={color.image}
                src={color.image}
                alt={`${car.alt} in ${color.name}`}
                width={900}
                height={340}
                priority
                className="h-auto w-[85%] object-contain drop-shadow-xl"
              />
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Colour: <span className="text-text">{color.name}</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {car.colors.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    aria-label={c.name}
                    aria-pressed={i === colorIndex}
                    onClick={() => setColorIndex(i)}
                    className={`h-9 w-9 shrink-0 rounded-full border-2 transition-all ${
                      i === colorIndex
                        ? "border-brand ring-2 ring-brand/20"
                        : "border-border hover:border-muted"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={150} variant="slide-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">
              {car.type}
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold text-text sm:text-4xl">
              {displayName}
            </h1>
            <p className="mt-3 text-sm text-muted sm:text-base">{car.blurb}</p>

            <div className="mt-6 flex items-baseline gap-2 border-t border-border pt-6">
              <span className="font-display text-3xl font-bold text-brand">
                {formatINR(car.priceINR)}
              </span>
              <span className="text-xs text-faint">*Ex Showroom Price</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium text-muted">Seating</p>
                <p className="mt-0.5 text-sm text-text">{car.seating}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted">Fuel</p>
                <p className="mt-0.5 text-sm text-text">{car.fuel}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted">Mileage / Range</p>
                <p className="mt-0.5 text-sm text-text">{car.mileage}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted">Boot Space</p>
                <p className="mt-0.5 text-sm text-text">{car.bootSpace}</p>
              </div>
              <div className="col-span-2 sm:col-span-3">
                <p className="text-xs font-medium text-muted">Engine Options</p>
                <ul className="mt-1 flex flex-wrap gap-1.5">
                  {engines.map((e) => (
                    <li
                      key={e}
                      className="rounded border border-border bg-bg-2 px-2.5 py-1 text-xs text-text"
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-3">
                <p className="text-xs font-medium text-muted">Transmission Options</p>
                <ul className="mt-1 flex flex-wrap gap-1.5">
                  {transmissions.map((t) => (
                    <li
                      key={t}
                      className="rounded border border-border bg-bg-2 px-2.5 py-1 text-xs text-text"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Highlights
              </p>
              <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {car.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-text">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book-a-test-drive"
                className="group inline-flex items-center gap-2 rounded bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light"
              >
                Book a Test Drive
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/cars"
                className="inline-flex items-center gap-2 rounded border border-brand px-6 py-3.5 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-white"
              >
                Compare Other Models
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
