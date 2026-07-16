"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { Calendar, Car, Check, Clipboard, Rupee, Truck } from "./icons";

const journeyIcons = [Clipboard, Calendar, Check, Rupee, Truck, Car];

const PROMISE_VIDEO_URL =
  "https://clicktobuy.hyundai.co.in/hyundaipromise/assets/images/HYUNDAI%20AIRPORT%2035SEC_1.mp4";

const journey = [
  {
    title: "Get Estimation",
    text: "Provide your vehicle details to receive an instant price estimate.",
  },
  {
    title: "Evaluation Booked",
    text: "Schedule a free inspection with a Hyundai Promise dealer.",
  },
  {
    title: "Evaluation Completed",
    text: "Your vehicle is physically inspected and evaluated by Hyundai experts.",
  },
  {
    title: "Price Acceptance",
    text: "Review and accept the dealer's final offer.",
  },
  {
    title: "Pickup & Payment",
    text: "The dealer schedules vehicle pickup and completes the payment process.",
  },
  {
    title: "Exchange Option",
    text: "Choose to exchange your current vehicle for a brand-new Hyundai if desired.",
  },
];

export default function PromiseExperience() {
  const [curveDrawn, setCurveDrawn] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurveDrawn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ---- Video section ---- */}
      <section className="bg-white py-14 lg:py-18">
        <div className="container-px mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow="Watch It In Action"
            title="Selling your pre-owned car, made easy"
            subtitle="See how Hyundai Promise takes the hassle out of selling your car — from online estimation to instant payment."
          />

          <Reveal
            variant="scale-up"
            className="mt-10 overflow-hidden rounded-2xl border border-border bg-black shadow-[0_8px_36px_0_rgba(0,44,95,0.12)]"
          >
            <video
              controls
              preload="metadata"
              playsInline
              className="aspect-video w-full bg-black"
              poster={undefined}
            >
              <source src={PROMISE_VIDEO_URL} type="video/mp4" />
            </video>
          </Reveal>
        </div>
      </section>

      {/* ---- Redesigned Customer Journey ---- */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-brand-deep py-16 text-white lg:py-24"
      >
        {/* Subtle radial accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_30%_40%_at_50%_50%,rgba(0,87,184,0.10)_0%,transparent_100%)]"
        />

        <div className="container-px relative mx-auto max-w-[1400px]">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Customer Journey
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              The six-step path to selling your car
            </h2>
            <p className="mt-3 text-sm text-white/70 sm:text-base">
              From an online estimate to payment in your account — a clear,
              transparent journey at every step.
            </p>
          </Reveal>

          {/* ========== DESKTOP: flowing S-curve timeline ========== */}
          <div
            className="relative mt-24 hidden lg:block"
            style={{ height: "380px" }}
          >
            {/* SVG S-curve */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 1200 380"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="cGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(0,87,184,0.35)" />
                  <stop offset="50%" stopColor="rgba(0,87,184,0.65)" />
                  <stop offset="100%" stopColor="rgba(0,87,184,0.35)" />
                </linearGradient>
              </defs>
              <path
                d="
                  M 0,250
                  C 64,250 64,250 96,250
                  C 168,250 216,110 297.6,110
                  C 379,110 427,250 499.2,250
                  C 571,250 619,110 700.8,110
                  C 782,110 830,250 902.4,250
                  C 984,250 1032,110 1104,110
                  C 1136,110 1170,110 1200,110
                "
                fill="none"
                stroke="url(#cGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="2400"
                strokeDashoffset={curveDrawn ? "0" : "2400"}
                style={{
                  transition:
                    "stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </svg>

            {/* Step cards + icon nodes */}
            {journey.map((step, i) => {
              const Icon = journeyIcons[i];
              const isBelow = i % 2 === 0;
              const nodeY = isBelow ? 250 : 110;
              const leftPct = 8 + i * 16.8;
              const cardDelay = curveDrawn ? 2000 + i * 180 : 99999;

              return (
                <div
                  key={step.title}
                  className="absolute"
                  style={{
                    left: `${leftPct}%`,
                    top: 0,
                    width: "1px",
                  }}
                >
                  {/* Icon node on curve */}
                  <div
                    className="absolute z-10 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/15 bg-[rgba(0,44,95,0.55)] shadow-[0_6px_28px_rgba(0,0,0,0.35)] backdrop-blur-sm"
                    style={{ left: 0, top: `${nodeY}px` }}
                  >
                    <Reveal delay={curveDrawn ? 1600 + i * 180 : 99999} variant="scale-up">
                      <Icon className="h-6 w-6 text-white" />
                    </Reveal>
                  </div>

                  {/* Content card */}
                  <div
                    className={`absolute w-[210px] -translate-x-1/2 ${isBelow ? "top-[288px]" : "top-[-55px] h-[90px] flex items-end"}`}
                    style={{ left: 0 }}
                  >
                    <Reveal delay={cardDelay} variant="fade-up">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-4xl font-bold leading-none text-[#60a5fa]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-sm font-bold leading-snug text-white sm:text-base">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">
                        {step.text}
                      </p>
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========== MOBILE: vertical curved timeline ========== */}
          <div className="relative mt-14 lg:hidden">
            {/* Wavy vertical line */}
            <div
              className="pointer-events-none absolute bottom-6 left-6 top-6 w-0.5"
              aria-hidden="true"
            >
              <svg
                className="h-full w-full"
                viewBox="0 0 4 1300"
                preserveAspectRatio="none"
              >
                <path
                  d="
                    M 2,0
                    C -8,100 12,130 2,180
                    C -8,230 12,260 2,310
                    C -8,360 12,390 2,440
                    C -8,490 12,520 2,570
                    C -8,620 12,650 2,700
                    C -8,750 12,780 2,830
                    C -8,880 12,910 2,960
                    C -8,1010 12,1040 2,1090
                    C -8,1140 12,1170 2,1220
                    C -8,1270 12,1300 2,1300
                  "
                  fill="none"
                  stroke="rgba(0,87,184,0.45)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="2000"
                  strokeDashoffset={curveDrawn ? "0" : "2000"}
                  style={{
                    transition:
                      "stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              </svg>
            </div>

            <div className="space-y-14 pl-16">
              {journey.map((step, i) => {
                const Icon = journeyIcons[i];
                return (
                  <div key={step.title} className="relative">
                    {/* Icon node on the wavy line */}
                    <div className="absolute -left-[62px] top-1 z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-white/15 bg-[rgba(0,44,95,0.55)] shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm">
                      <Reveal
                        delay={curveDrawn ? 1600 + i * 180 : 99999}
                        variant="scale-up"
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </Reveal>
                    </div>

                    <Reveal
                      delay={curveDrawn ? 2000 + i * 200 : 99999}
                      variant="fade-up"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-3xl font-bold leading-none text-[#60a5fa]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-base font-bold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">
                        {step.text}
                      </p>
                    </Reveal>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
