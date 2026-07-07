"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { carModels, cityOptions, testDriveImage } from "@/lib/data";
import { Calendar, Check, ChevronDown } from "./icons";
import Reveal from "./Reveal";

const fieldBase =
  "w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

function SelectField({
  label,
  options,
  placeholder,
}: {
  label: string;
  options: string[];
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted">{label}</span>
      <div className="relative">
        <select
          defaultValue=""
          required
          className={`${fieldBase} appearance-none pr-10`}
        >
          <option value="" disabled className="text-faint">
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
      </div>
    </label>
  );
}

export default function TestDrive() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="test-drive" className="scroll-mt-24 bg-white py-14 lg:py-20 overflow-hidden">
      <div className="container-px mx-auto max-w-[1400px]">
        <div className="overflow-hidden rounded-lg border border-border shadow-[0_4px_32px_0_rgba(0,44,95,0.08)] lg:grid lg:grid-cols-[0.9fr_1.1fr]">
          {/* Visual side */}
          <Reveal variant="slide-right" className="relative min-h-[280px] overflow-hidden lg:min-h-full">
            <Image
              src={testDriveImage}
              alt="Hyundai Creta interior and dashboard"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent lg:bg-gradient-to-r lg:from-black/70 lg:via-black/30 lg:to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Book a Test Drive
              </p>
              <h2 className="mt-2 max-w-sm font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                Take Your Favourite Hyundai for a Spin
              </h2>
              <p className="mt-3 max-w-sm text-sm text-white/70">
                Pick a date, time and location, and we&apos;ll have the car ready,
                at our showroom or your home.
              </p>
            </div>
          </Reveal>

          {/* Form side */}
          <Reveal delay={200} variant="slide-left" className="bg-bg-2 p-8 sm:p-10 lg:p-12">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand">
                  <Check className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-text">
                  Booking received!
                </h3>
                <p className="mt-2 max-w-sm text-muted">
                  Thank you. A Modi Hyundai representative will call you shortly to confirm your test drive.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:bg-bg-3"
                >
                  Book another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SelectField
                  label="Select Car Model"
                  placeholder="Select Car Model"
                  options={carModels}
                />
                <SelectField
                  label="Select Location"
                  placeholder="Select Location"
                  options={cityOptions}
                />

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Your Name</span>
                  <input type="text" required placeholder="Your name" className={fieldBase} />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="Mobile number"
                    className={fieldBase}
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Date</span>
                  <div className="relative">
                    <input type="date" required className={`${fieldBase} pr-10`} />
                    <Calendar className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  </div>
                </label>

                <SelectField
                  label="Preferred Time"
                  placeholder="Select time"
                  options={["Morning (9–12)", "Afternoon (12–4)", "Evening (4–8)"]}
                />

                <button
                  type="submit"
                  className="col-span-full mt-2 rounded bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light"
                >
                  Book My Test Drive
                </button>
                <p className="col-span-full text-center text-xs text-faint">
                  By submitting, you agree to be contacted by Modi Hyundai about
                  your test drive request. See our{" "}
                  <a href="#" className="font-medium text-brand hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
