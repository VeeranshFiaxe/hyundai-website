"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { cars, cityOptions, company, locations } from "@/lib/data";
import { isEmpty, isValidEmail, isValidName, isValidYear, type FormErrors } from "@/lib/validation";
import { ArrowRight, Car, Check, ChevronDown, Phone, Shield, Users } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { OtpGate } from "./OtpGate";
import { submitLead } from "@/lib/submitLead";
import { submitSupabaseLead } from "@/lib/submitSupabaseLead";

const fieldBase =
  "w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

const errorBase =
  "w-full rounded border border-red-400 bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-red-500 focus:ring-2 focus:ring-red-400/20";

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
  const [buyErrors, setBuyErrors] = useState<FormErrors>({});
  const [sellErrors, setSellErrors] = useState<FormErrors>({});
  const [buyAttempted, setBuyAttempted] = useState(false);
  const [sellAttempted, setSellAttempted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const verifiedPhoneRef = useRef("");

  const buyModels = useMemo(
    () => cars.filter((car) => !["Electric", "Taxi"].includes(car.category)).slice(0, 10),
    [],
  );

  const activeReasons = mode === "buy" ? buyReasons : sellReasons;

  const validateBuy = (): FormErrors => {
    const e: FormErrors = {};
    if (isEmpty(buyForm.name) || !isValidName(buyForm.name)) e.name = "Enter your full name (at least 2 characters).";
    if (!isValidEmail(buyForm.email)) e.email = "Enter a valid email with @ and a domain (e.g. you@example.com).";
    if (isEmpty(buyForm.city)) e.city = "Please select your preferred location.";
    if (isEmpty(buyForm.model)) e.model = "Please select a car model.";
    if (isEmpty(buyForm.budget)) e.budget = "Please enter your budget range.";
    return e;
  };

  const validateSell = (): FormErrors => {
    const e: FormErrors = {};
    if (isEmpty(sellForm.name) || !isValidName(sellForm.name)) e.name = "Enter your full name (at least 2 characters).";
    if (!isValidEmail(sellForm.email)) e.email = "Enter a valid email with @ and a domain (e.g. you@example.com).";
    if (isEmpty(sellForm.city)) e.city = "Please select your location.";
    if (isEmpty(sellForm.brand)) e.brand = "Please enter the car brand.";
    if (isEmpty(sellForm.model)) e.model = "Please enter the car model.";
    if (!isValidYear(sellForm.year)) e.year = "Enter a valid year (2000-2099).";
    if (isEmpty(sellForm.kms)) e.kms = "Please enter kilometers driven.";
    return e;
  };

  const fieldError = (errors: FormErrors, key: string) =>
    errors[key] ? errorBase : fieldBase;

  const handleBuySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBuyAttempted(true);
    setSubmitError(false);
    if (!consent) {
      setConsentError(true);
      return;
    }
    setBuyForm((current) => ({ ...current, mobile: verifiedPhoneRef.current }));
    const errs = validateBuy();
    setBuyErrors(errs);
    setConsentError(false);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      await submitLead("hyundai_promise_buy", {
        type: "Buy",
        full_name: buyForm.name.trim(),
        mobile_number: `\`${verifiedPhoneRef.current}`,
        email: buyForm.email.trim(),
        location: buyForm.city,
        car_model: buyForm.model,
        budget_range: buyForm.budget.trim(),
        additional_details: buyForm.notes.trim(),
      });
      submitSupabaseLead("hyundai-promise", {
        type: "Buy",
        full_name: buyForm.name.trim(),
        mobile_number: verifiedPhoneRef.current,
        email: buyForm.email.trim(),
        location: buyForm.city,
        car_model: buyForm.model,
        budget_range: buyForm.budget.trim(),
        additional_details: buyForm.notes.trim(),
      }).catch((err) => console.error("[HyundaiPromise] Supabase lead insert failed", err));
      setSubmittedMode("buy");
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSellSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSellAttempted(true);
    setSubmitError(false);
    if (!consent) {
      setConsentError(true);
      return;
    }
    setSellForm((current) => ({ ...current, mobile: verifiedPhoneRef.current }));
    const errs = validateSell();
    setSellErrors(errs);
    setConsentError(false);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      await submitLead("hyundai_promise_sell", {
        type: "Sell",
        full_name: sellForm.name.trim(),
        mobile_number: `\`${verifiedPhoneRef.current}`,
        email: sellForm.email.trim(),
        location: sellForm.city,
        car_brand: sellForm.brand.trim(),
        car_model: sellForm.model.trim(),
        year_of_purchase: sellForm.year.trim(),
        kilometers_driven: sellForm.kms.trim(),
        additional_details: sellForm.notes.trim(),
      });
      submitSupabaseLead("hyundai-promise", {
        type: "Sell",
        full_name: sellForm.name.trim(),
        mobile_number: verifiedPhoneRef.current,
        email: sellForm.email.trim(),
        location: sellForm.city,
        car_brand: sellForm.brand.trim(),
        car_model: sellForm.model.trim(),
        year_of_purchase: sellForm.year.trim(),
        kilometers_driven: sellForm.kms.trim(),
        additional_details: sellForm.notes.trim(),
      }).catch((err) => console.error("[HyundaiPromise] Supabase lead insert failed", err));
      setSubmittedMode("sell");
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
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
                <div className="relative flex min-h-[320px] h-full flex-col justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-slate-900 p-8 sm:p-12">
                  {/* Decorative glowing orbs for a modern premium feel */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white opacity-5 blur-[80px]" />
                  <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-400 opacity-10 blur-[100px]" />
                  
                  <div className="relative z-10 flex max-w-md flex-col">
                    <div className="mb-6 flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                        Hyundai Promise
                      </span>
                    </div>
                    <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                      A simple pre-owned car journey, <span className="text-blue-300 text-opacity-90">handled personally.</span>
                    </h2>
                    <p className="mt-5 text-sm leading-relaxed text-white/70 sm:text-base">
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

              <OtpGate
                title="Verify Your Phone"
                subtitle="Enter your phone number to unlock the form."
                variant="bare"
                formSource="hyundai_promise"
              >
                {(verifiedPhone, requestChangePhone) => {
                  verifiedPhoneRef.current = verifiedPhone;
                  return (
                    <>
                      {mode === "buy" ? (
                        <form onSubmit={handleBuySubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" noValidate>
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-muted">Full Name</span>
                            <input
                              type="text"
                              value={buyForm.name}
                              onChange={(event) =>
                                setBuyForm((current) => ({ ...current, name: event.target.value }))
                              }
                              placeholder="e.g. John Doe"
                              className={fieldError(buyErrors, "name")}
                            />
                            {buyAttempted && buyErrors.name && (
                              <p className="mt-1 text-xs font-medium text-red-600">{buyErrors.name}</p>
                            )}
                          </label>
                          <div className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
                            <div
                              className="flex cursor-pointer items-center justify-between rounded-xl border border-[#d1fae5] bg-[#ecfdf5] px-4 py-3"
                              onClick={requestChangePhone}
                              title="Click to change verified phone number"
                            >
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-[#059669]" />
                                <span className="text-sm font-semibold text-[#059669]">{verifiedPhone}</span>
                              </div>
                              <span className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-[#059669] shadow-sm">
                                <Check className="h-3 w-3" /> Verified
                              </span>
                            </div>
                          </div>
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-muted">Email Address</span>
                            <input
                              type="email"
                              value={buyForm.email}
                              onChange={(event) =>
                                setBuyForm((current) => ({ ...current, email: event.target.value }))
                              }
                              placeholder="you@example.com"
                              className={fieldError(buyErrors, "email")}
                            />
                            {buyAttempted && buyErrors.email && (
                              <p className="mt-1 text-xs font-medium text-red-600">{buyErrors.email}</p>
                            )}
                          </label>
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Location</span>
                            <div className="relative">
                              <select
                                value={buyForm.city}
                                onChange={(event) =>
                                  setBuyForm((current) => ({ ...current, city: event.target.value }))
                                }
                                className={`${fieldError(buyErrors, "city")} appearance-none pr-10`}
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
                            {buyAttempted && buyErrors.city && (
                              <p className="mt-1 text-xs font-medium text-red-600">{buyErrors.city}</p>
                            )}
                          </label>
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-muted">Interested Model</span>
                            <div className="relative">
                              <select
                                value={buyForm.model}
                                onChange={(event) =>
                                  setBuyForm((current) => ({ ...current, model: event.target.value }))
                                }
                                className={`${fieldError(buyErrors, "model")} appearance-none pr-10`}
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
                            {buyAttempted && buyErrors.model && (
                              <p className="mt-1 text-xs font-medium text-red-600">{buyErrors.model}</p>
                            )}
                          </label>
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-muted">Budget Range</span>
                            <input
                              type="text"
                              value={buyForm.budget}
                              onChange={(event) =>
                                setBuyForm((current) => ({ ...current, budget: event.target.value }))
                              }
                              placeholder="e.g. Rs. 8-10 lakh"
                              className={fieldError(buyErrors, "budget")}
                            />
                            {buyAttempted && buyErrors.budget && (
                              <p className="mt-1 text-xs font-medium text-red-600">{buyErrors.budget}</p>
                            )}
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
                          <label className="col-span-full flex items-start gap-2.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={consent}
                              onChange={(e) => {
                                setConsent(e.target.checked);
                                if (e.target.checked) setConsentError(false);
                              }}
                              className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-brand"
                            />
                            <span className="text-xs leading-relaxed text-muted">
                              I agree to Modi Hyundai&apos;s{" "}
                              <Link href="/terms" className="font-semibold text-text underline hover:text-brand">T&C</Link> and{" "}
                              <Link href="/privacy" className="font-semibold text-text underline hover:text-brand">Privacy Policy</Link>.
                              This consent overrides any DNC/NDNC registrations.
                            </span>
                          </label>
                          {consentError && (
                            <p className="col-span-full text-sm font-medium text-red-500">
                              Please check the box to agree to the T&C and Privacy Policy before proceeding.
                            </p>
                          )}
                          {submitError && (
                            <p className="col-span-full text-sm font-medium text-red-500">
                              Something went wrong. Please try again.
                            </p>
                          )}
                          <button
                            type="submit"
                            disabled={submitting}
                            className="col-span-full mt-2 inline-flex items-center justify-center gap-2 rounded bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {submitting ? (
                              <span className="inline-flex items-center gap-2">
                                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                                  <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" className="opacity-75" />
                                </svg>
                                Submitting...
                              </span>
                            ) : (
                              <>
                                Request a Callback
                                <ArrowRight className="h-4 w-4" />
                              </>
                            )}
                          </button>
                        </form>
                      ) : (
                        <form onSubmit={handleSellSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" noValidate>
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-muted">Full Name</span>
                            <input
                              type="text"
                              value={sellForm.name}
                              onChange={(event) =>
                                setSellForm((current) => ({ ...current, name: event.target.value }))
                              }
                              placeholder="e.g. John Doe"
                              className={fieldError(sellErrors, "name")}
                            />
                            {sellAttempted && sellErrors.name && (
                              <p className="mt-1 text-xs font-medium text-red-600">{sellErrors.name}</p>
                            )}
                          </label>
                          <div className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
                            <div
                              className="flex cursor-pointer items-center justify-between rounded-xl border border-[#d1fae5] bg-[#ecfdf5] px-4 py-3"
                              onClick={requestChangePhone}
                              title="Click to change verified phone number"
                            >
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-[#059669]" />
                                <span className="text-sm font-semibold text-[#059669]">{verifiedPhone}</span>
                              </div>
                              <span className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-[#059669] shadow-sm">
                                <Check className="h-3 w-3" /> Verified
                              </span>
                            </div>
                          </div>
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-muted">Email Address</span>
                            <input
                              type="email"
                              value={sellForm.email}
                              onChange={(event) =>
                                setSellForm((current) => ({ ...current, email: event.target.value }))
                              }
                              placeholder="you@example.com"
                              className={fieldError(sellErrors, "email")}
                            />
                            {sellAttempted && sellErrors.email && (
                              <p className="mt-1 text-xs font-medium text-red-600">{sellErrors.email}</p>
                            )}
                          </label>
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-muted">Location</span>
                            <div className="relative">
                              <select
                                value={sellForm.city}
                                onChange={(event) =>
                                  setSellForm((current) => ({ ...current, city: event.target.value }))
                                }
                                className={`${fieldError(sellErrors, "city")} appearance-none pr-10`}
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
                            {sellAttempted && sellErrors.city && (
                              <p className="mt-1 text-xs font-medium text-red-600">{sellErrors.city}</p>
                            )}
                          </label>
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-muted">Car Brand</span>
                            <input
                              type="text"
                              value={sellForm.brand}
                              onChange={(event) =>
                                setSellForm((current) => ({ ...current, brand: event.target.value }))
                              }
                              placeholder="e.g. Hyundai"
                              className={fieldError(sellErrors, "brand")}
                            />
                            {sellAttempted && sellErrors.brand && (
                              <p className="mt-1 text-xs font-medium text-red-600">{sellErrors.brand}</p>
                            )}
                          </label>
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-muted">Car Model</span>
                            <input
                              type="text"
                              value={sellForm.model}
                              onChange={(event) =>
                                setSellForm((current) => ({ ...current, model: event.target.value }))
                              }
                              placeholder="e.g. Creta"
                              className={fieldError(sellErrors, "model")}
                            />
                            {sellAttempted && sellErrors.model && (
                              <p className="mt-1 text-xs font-medium text-red-600">{sellErrors.model}</p>
                            )}
                          </label>
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-muted">Year of Purchase</span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={sellForm.year}
                              onChange={(event) =>
                                setSellForm((current) => ({ ...current, year: event.target.value }))
                              }
                              placeholder="e.g. 2021"
                              className={fieldError(sellErrors, "year")}
                            />
                            {sellAttempted && sellErrors.year && (
                              <p className="mt-1 text-xs font-medium text-red-600">{sellErrors.year}</p>
                            )}
                          </label>
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-muted">Kilometers Driven</span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={sellForm.kms}
                              onChange={(event) =>
                                setSellForm((current) => ({ ...current, kms: event.target.value }))
                              }
                              placeholder="e.g. 35,000 km"
                              className={fieldError(sellErrors, "kms")}
                            />
                            {sellAttempted && sellErrors.kms && (
                              <p className="mt-1 text-xs font-medium text-red-600">{sellErrors.kms}</p>
                            )}
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
                          <label className="col-span-full flex items-start gap-2.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={consent}
                              onChange={(e) => {
                                setConsent(e.target.checked);
                                if (e.target.checked) setConsentError(false);
                              }}
                              className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-brand"
                            />
                            <span className="text-xs leading-relaxed text-muted">
                              I agree to Modi Hyundai&apos;s{" "}
                              <Link href="/terms" className="font-semibold text-text underline hover:text-brand">T&C</Link> and{" "}
                              <Link href="/privacy" className="font-semibold text-text underline hover:text-brand">Privacy Policy</Link>.
                              This consent overrides any DNC/NDNC registrations.
                            </span>
                          </label>
                          {consentError && (
                            <p className="col-span-full text-sm font-medium text-red-500">
                              Please check the box to agree to the T&C and Privacy Policy before proceeding.
                            </p>
                          )}
                          {submitError && (
                            <p className="col-span-full text-sm font-medium text-red-500">
                              Something went wrong. Please try again.
                            </p>
                          )}
                          <button
                            type="submit"
                            disabled={submitting}
                            className="col-span-full mt-2 inline-flex items-center justify-center gap-2 rounded bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {submitting ? (
                              <span className="inline-flex items-center gap-2">
                                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                                  <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" className="opacity-75" />
                                </svg>
                                Submitting...
                              </span>
                            ) : (
                              <>
                                Submit Car Details
                                <ArrowRight className="h-4 w-4" />
                              </>
                            )}
                          </button>
                        </form>
                      )}
                    </>
                  );
                }}
              </OtpGate>
            </Reveal>
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
