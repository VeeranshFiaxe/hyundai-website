"use client";

import { useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import { cars, cityOptions, company, locations } from "@/lib/data";
import { ArrowRight, Car, Check, ChevronDown, Phone, Shield, Users } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const fieldBase =
  "w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

const promiseLocation =
  locations.find((location) => location.name === "Hyundai H Promise Thane") ??
  locations[0];

const buyReasons = [
  "Certified pre-owned Hyundai cars from a trusted dealer network",
  "Finance, exchange and paperwork support under one roof",
  "A Modi Hyundai advisor calls back to match you with the right car",
];

const sellReasons = [
  "Quick used-car evaluation from the Hyundai Promise team",
  "Guidance on paperwork, transfer and the next best step",
  "A dealership representative connects with you after submission",
];

const steps = [
  {
    title: "Choose your requirement",
    text: "Start with whether you want to buy or sell a pre-owned car.",
  },
  {
    title: "Fill in your details",
    text: "Share a few basics so the Modi Hyundai team can prepare before calling.",
  },
  {
    title: "Get a callback",
    text: "A representative will reach out to understand your exact need and assist further.",
  },
];

type Mode = "buy" | "sell";

const buyInitialState = {
  name: "",
  mobile: "",
  email: "",
  city: "",
  model: "",
  budget: "",
  notes: "",
};

const sellInitialState = {
  name: "",
  mobile: "",
  email: "",
  brand: "Hyundai",
  model: "",
  year: "",
  kms: "",
  city: "",
  notes: "",
};

export default function HyundaiPromise() {
  const [mode, setMode] = useState<Mode>("buy");
  const [buyForm, setBuyForm] = useState(buyInitialState);
  const [sellForm, setSellForm] = useState(sellInitialState);
  const [submittedMode, setSubmittedMode] = useState<Mode | null>(null);

  const buyModels = useMemo(
    () => cars.filter((car) => !["Electric", "Taxi"].includes(car.category)).slice(0, 10),
    [],
  );

  const activeReasons = mode === "buy" ? buyReasons : sellReasons;

  const handleBuySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedMode("buy");
  };

  const handleSellSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedMode("sell");
  };

  const resetSubmission = () => {
    setSubmittedMode(null);
  };

  return (
    <>
      <section className="bg-white py-14 lg:py-18">
        <div className="container-px mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow="Hyundai Promise"
            title="Buy or sell your pre-owned car with Modi Hyundai"
            subtitle="Choose the path that fits you best. Share your details and our team will call you back to understand exactly what you need."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal
              variant="slide-right"
              className="overflow-hidden rounded-[1.25rem] border border-border bg-bg-2"
            >
              <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="relative min-h-[320px]">
                  <Image
                    src={promiseLocation.image}
                    alt="Modi Hyundai Promise showroom"
                    fill
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur">
                      Hyundai Promise
                    </span>
                    <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
                      A simple pre-owned car journey, handled personally
                    </h2>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
                      Whether you are looking to buy your next pre-owned Hyundai or
                      sell your current car, our Promise team helps you take the
                      next step with clarity and confidence.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                      Why Customers Use It
                    </p>
                    <div className="mt-5 space-y-4">
                      {activeReasons.map((reason, index) => (
                        <div key={reason} className="flex items-start gap-3">
                          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                            {index === 0 ? (
                              <Shield className="h-4 w-4" />
                            ) : index === 1 ? (
                              <Car className="h-4 w-4" />
                            ) : (
                              <Users className="h-4 w-4" />
                            )}
                          </span>
                          <p className="text-sm leading-relaxed text-muted">{reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_4px_24px_0_rgba(0,44,95,0.06)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                      Promise Desk
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold text-text">
                      {promiseLocation.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {promiseLocation.address}
                    </p>
                    <a
                      href={`tel:${company.phoneE164}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
                    >
                      <Phone className="h-4 w-4" />
                      {company.phone}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal
              variant="slide-left"
              delay={120}
              className="rounded-[1.25rem] border border-border bg-white p-6 shadow-[0_8px_36px_0_rgba(0,44,95,0.08)] sm:p-8"
            >
              <div className="inline-flex rounded-full border border-border bg-bg-2 p-1">
                <button
                  type="button"
                  onClick={() => setMode("buy")}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    mode === "buy"
                      ? "bg-brand text-white"
                      : "text-muted hover:text-brand"
                  }`}
                >
                  Buy a Pre-Owned Car
                </button>
                <button
                  type="button"
                  onClick={() => setMode("sell")}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    mode === "sell"
                      ? "bg-brand text-white"
                      : "text-muted hover:text-brand"
                  }`}
                >
                  Sell a Pre-Owned Car
                </button>
              </div>

              <div className="mt-6">
                <h3 className="font-display text-2xl font-bold text-text">
                  {mode === "buy"
                    ? "Tell us what kind of car you want"
                    : "Tell us about the car you want to sell"}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {mode === "buy"
                    ? "Share your preferred location, car and budget. We will help you explore suitable Promise inventory."
                    : "Share a few details about your current car. Our team will connect with you for the next step."}
                </p>
              </div>

              {mode === "buy" ? (
                <form onSubmit={handleBuySubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Full Name</span>
                    <input
                      type="text"
                      required
                      value={buyForm.name}
                      onChange={(event) =>
                        setBuyForm((current) => ({ ...current, name: event.target.value }))
                      }
                      placeholder="Your name"
                      className={fieldBase}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      value={buyForm.mobile}
                      onChange={(event) =>
                        setBuyForm((current) => ({ ...current, mobile: event.target.value }))
                      }
                      placeholder="10-digit mobile number"
                      className={fieldBase}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Email Address</span>
                    <input
                      type="email"
                      required
                      value={buyForm.email}
                      onChange={(event) =>
                        setBuyForm((current) => ({ ...current, email: event.target.value }))
                      }
                      placeholder="you@example.com"
                      className={fieldBase}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Location</span>
                    <div className="relative">
                      <select
                        required
                        value={buyForm.city}
                        onChange={(event) =>
                          setBuyForm((current) => ({ ...current, city: event.target.value }))
                        }
                        className={`${fieldBase} appearance-none pr-10`}
                      >
                        <option value="" disabled>
                          Select location
                        </option>
                        {cityOptions.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                    </div>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Interested Model</span>
                    <div className="relative">
                      <select
                        required
                        value={buyForm.model}
                        onChange={(event) =>
                          setBuyForm((current) => ({ ...current, model: event.target.value }))
                        }
                        className={`${fieldBase} appearance-none pr-10`}
                      >
                        <option value="" disabled>
                          Select model
                        </option>
                        {buyModels.map((car) => (
                          <option key={car.slug} value={car.name}>
                            Hyundai {car.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                    </div>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Budget Range</span>
                    <input
                      type="text"
                      required
                      value={buyForm.budget}
                      onChange={(event) =>
                        setBuyForm((current) => ({ ...current, budget: event.target.value }))
                      }
                      placeholder="Eg. Rs. 8-10 lakh"
                      className={fieldBase}
                    />
                  </label>
                  <label className="col-span-full block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">
                      What are you looking for? <span className="font-normal text-faint">(optional)</span>
                    </span>
                    <textarea
                      rows={4}
                      value={buyForm.notes}
                      onChange={(event) =>
                        setBuyForm((current) => ({ ...current, notes: event.target.value }))
                      }
                      placeholder="Preferred fuel type, transmission, family size, exchange plans, or anything else we should know"
                      className={`${fieldBase} resize-none`}
                    />
                  </label>
                  <button
                    type="submit"
                    className="col-span-full mt-2 inline-flex items-center justify-center gap-2 rounded bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light"
                  >
                    Request a Callback
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSellSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Full Name</span>
                    <input
                      type="text"
                      required
                      value={sellForm.name}
                      onChange={(event) =>
                        setSellForm((current) => ({ ...current, name: event.target.value }))
                      }
                      placeholder="Your name"
                      className={fieldBase}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      value={sellForm.mobile}
                      onChange={(event) =>
                        setSellForm((current) => ({ ...current, mobile: event.target.value }))
                      }
                      placeholder="10-digit mobile number"
                      className={fieldBase}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Email Address</span>
                    <input
                      type="email"
                      required
                      value={sellForm.email}
                      onChange={(event) =>
                        setSellForm((current) => ({ ...current, email: event.target.value }))
                      }
                      placeholder="you@example.com"
                      className={fieldBase}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Location</span>
                    <div className="relative">
                      <select
                        required
                        value={sellForm.city}
                        onChange={(event) =>
                          setSellForm((current) => ({ ...current, city: event.target.value }))
                        }
                        className={`${fieldBase} appearance-none pr-10`}
                      >
                        <option value="" disabled>
                          Select location
                        </option>
                        {cityOptions.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                    </div>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Car Brand</span>
                    <input
                      type="text"
                      required
                      value={sellForm.brand}
                      onChange={(event) =>
                        setSellForm((current) => ({ ...current, brand: event.target.value }))
                      }
                      placeholder="Eg. Hyundai"
                      className={fieldBase}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Car Model</span>
                    <input
                      type="text"
                      required
                      value={sellForm.model}
                      onChange={(event) =>
                        setSellForm((current) => ({ ...current, model: event.target.value }))
                      }
                      placeholder="Eg. Creta"
                      className={fieldBase}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Year of Purchase</span>
                    <input
                      type="number"
                      required
                      min="2000"
                      max="2099"
                      value={sellForm.year}
                      onChange={(event) =>
                        setSellForm((current) => ({ ...current, year: event.target.value }))
                      }
                      placeholder="Eg. 2021"
                      className={fieldBase}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Kilometers Driven</span>
                    <input
                      type="text"
                      required
                      value={sellForm.kms}
                      onChange={(event) =>
                        setSellForm((current) => ({ ...current, kms: event.target.value }))
                      }
                      placeholder="Eg. 35,000 km"
                      className={fieldBase}
                    />
                  </label>
                  <label className="col-span-full block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">
                      Additional Details <span className="font-normal text-faint">(optional)</span>
                    </span>
                    <textarea
                      rows={4}
                      value={sellForm.notes}
                      onChange={(event) =>
                        setSellForm((current) => ({ ...current, notes: event.target.value }))
                      }
                      placeholder="Mention variant, ownership, expected price, condition, or anything else that would help"
                      className={`${fieldBase} resize-none`}
                    />
                  </label>
                  <button
                    type="submit"
                    className="col-span-full mt-2 inline-flex items-center justify-center gap-2 rounded bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light"
                  >
                    Submit Car Details
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-bg-2 py-14 lg:py-18">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              How It Works
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
              A quick path from enquiry to conversation
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal
                key={step.title}
                delay={index * 100}
                variant="scale-up"
                className="rounded-2xl border border-border bg-white p-6 shadow-[0_4px_24px_0_rgba(0,44,95,0.05)]"
              >
                <span className="inline-grid h-10 w-10 place-items-center rounded-full bg-brand text-sm font-bold text-white">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {submittedMode && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={resetSubmission}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-[1.25rem] bg-white p-8 text-center shadow-2xl sm:p-10"
          >
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand">
              <Check className="h-8 w-8" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold text-text">
              Request received
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {submittedMode === "buy"
                ? `Thank you, ${buyForm.name}. A Modi Hyundai Promise advisor will call you on ${buyForm.mobile} to help you buy a pre-owned car.`
                : `Thank you, ${sellForm.name}. A Modi Hyundai Promise advisor will call you on ${sellForm.mobile} to discuss your car and the next steps.`}
            </p>
            <button
              type="button"
              onClick={resetSubmission}
              className="mt-6 rounded border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:bg-bg-3"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
