"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { cars, cityOptions, locations, nav } from "@/lib/data";
import { isEmpty, isValidEmail, isValidMobile, isValidName, isValidPincode } from "@/lib/validation";
import { submitLead } from "@/lib/submitLead";
import { submitDatabaseLead } from "@/lib/submitDatabaseLead";
import { Calendar, Check, ChevronDown, ChevronRight, X, Phone } from "./icons";
import Reveal from "./Reveal";
import { OtpGate } from "./OtpGate";

const fieldBase =
  "w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

const timeSlots = [
  { label: "Morning (9–12)", start: 9, end: 12 },
  { label: "Afternoon (12–4)", start: 12, end: 16 },
  { label: "Evening (4–8)", start: 16, end: 20 },
];

const steps = ["Select Car", "When & Where", "Your Details"];

interface TestDriveWizardProps {
  initialCarSlug?: string;
  onBack?: () => void;
  verifiedPhone?: string;
  requestChangePhone?: () => void;
  /** Forwarded to OtpGate so the embedding modal can match the OTP step's narrower width. */
  onVerificationChange?: (verifying: boolean) => void;
  /** Identifies which entry point launched this wizard. */
  formSource?: string;
  /**
   * Local image path forwarded to OtpGate to render the two-panel phone-entry
   * card (image left, form right) in modal contexts. Omit for inline embeds.
   */
  splitImage?: string;
  /** Alt text for the split image panel. */
  splitImageAlt?: string;
}

function TestDriveWizardInner({ initialCarSlug, onBack, verifiedPhone = "", requestChangePhone }: TestDriveWizardProps) {
  const searchParams = useSearchParams();
  const preSelectedCar = initialCarSlug || searchParams?.get("car");
  const router = useRouter();

  const [step, setStep] = useState(preSelectedCar ? 2 : 1);
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [carSlug, setCarSlug] = useState(preSelectedCar || "");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const mobile = verifiedPhone;
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");

  const today = new Date();
  today.setDate(today.getDate() + 1);
  const minDate = today.toISOString().slice(0, 10);
  const selectedCar = cars.find((c) => c.slug === carSlug);
  const showroomsInCity = locations.filter(
    (l) => l.type === "Showroom" && (city ? l.city === city : true),
  );

  const canProceed = () => {
    if (step === 1) return Boolean(carSlug);
    if (step === 2) return Boolean(city && date && time);
    if (step === 3)
      return Boolean(isValidName(name) && mobile && isValidEmail(email) && isValidPincode(pincode));
    return true;
  };

  const fieldErrors = {
    name: attempted && step === 3 && !isValidName(name) ? "Enter your full name (at least 2 characters)." : "",
    mobile: "",
    email:
      attempted && step === 3 && !isValidEmail(email) ? "Enter a valid email with @ and a domain (e.g. you@example.com)." : "",
    pincode:
      attempted && step === 3 && !isValidPincode(pincode) ? "Enter a valid 6-digit pincode." : "",
  };

  const stepMessage =
    attempted && step === 1 && !carSlug
      ? "Please select a car to continue."
      : attempted && step === 2 && !city
        ? "Please select a location to continue."
        : attempted && step === 2 && city && !date
          ? "Please choose a preferred date."
          : attempted && step === 2 && city && date && !time
            ? "Please choose a preferred time slot."
            : "";

  const goNext = () => {
    if (canProceed()) {
      setAttempted(false);
      setStep((s) => Math.min(3, s + 1));
    } else {
      setAttempted(true);
    }
  };
  const goBack = () => {
    setAttempted(false);
    setStep((s) => Math.max(1, s - 1));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canProceed()) {
      setAttempted(true);
      return;
    }

    setSubmitting(true);

    const leadFields = {
      car_model: carSlug,
      location: city,
      name,
      email,
      pincode,
      address,
      preferred_date: date,
      preferred_time: time,
    };

    // Fired in parallel so a Google Sheets failure never blocks PostgreSQL
    // (and vice versa), matching the pattern used in the other forms.
    const [sheetsResult, databaseResult] = await Promise.allSettled([
      submitLead("test_drive", { ...leadFields, mobile_number: `\`${mobile}` }),
      submitDatabaseLead("test-drive", { ...leadFields, mobile_number: mobile }),
    ]);

    if (sheetsResult.status === "rejected") {
      console.error("[TestDriveWizard] Sheets lead submission failed", sheetsResult.reason);
    }
    if (databaseResult.status === "rejected") {
      console.error("[TestDriveWizard] PostgreSQL lead insert failed", databaseResult.reason);
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  // Close the wizard and return to wherever the user was before it opened.
  // In modal contexts onBack is provided; on the standalone page we use history.
  const closeWizard = () => {
    setSubmitted(false);
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const renderNavButtons = () => (
    <div className="mt-8 flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={() => {
          if (step === 1 && preSelectedCar) {
            if (onBack) { onBack(); } else { router.push(`/cars/${preSelectedCar}`); }
          } else if (preSelectedCar && step === 2) {
            if (onBack) { onBack(); } else { router.push(`/cars/${preSelectedCar}`); }
          } else {
            goBack();
          }
        }}
        disabled={step === 1 && !preSelectedCar}
        className="rounded border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:bg-bg-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Back
      </button>
      {step < 3 ? (
        <button
          type="button"
          onClick={goNext}
          className={`group inline-flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light ${
            !canProceed() ? "opacity-50" : ""
          }`}
        >
          Next Step
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-brand px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Confirming..." : "Confirm Booking"}
        </button>
      )}
    </div>
  );

  useEffect(() => {
    if (!submitted) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [submitted]);

  useEffect(() => {
    setAttempted(false);
  }, [step]);

  return (
    <>
      <div className="mx-auto max-w-3xl bg-white p-6 sm:p-10">
        {/* Step indicator */}
        <div className="flex items-center justify-between">
          {steps.map((label, i) => {
            const n = i + 1;
            const state = n === step ? "active" : n < step ? "done" : "todo";
            return (
              <div key={label} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                      state === "done"
                        ? "bg-brand text-white"
                        : state === "active"
                          ? "bg-brand text-white ring-4 ring-brand/15"
                          : "bg-bg-2 text-faint"
                    }`}
                  >
                    {state === "done" ? <Check className="h-4 w-4" /> : n}
                  </span>
                  <span
                    className={`hidden text-center text-[10px] font-medium sm:block ${
                      state === "todo" ? "text-faint" : "text-text"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {n < steps.length && (
                  <span
                    className={`mx-1.5 mt-[15px] h-0.5 flex-1 self-start rounded transition-colors ${
                      state === "done" ? "bg-brand" : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={onSubmit} className="mt-8">
          {step === 1 && (
            <Reveal variant="fade-in">
              <h3 className="font-display text-lg font-bold text-text">Select Your Car</h3>
              
              {preSelectedCar ? (
                <>
                  <div className="mt-6">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Car selected</p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {cars.filter(c => c.slug === preSelectedCar).map((car) => (
                        <button
                          type="button"
                          key={car.slug}
                          onClick={() => { setCarSlug(car.slug); setStep(2); }}
                          className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all ${
                            carSlug === car.slug
                              ? "border-brand bg-brand/5"
                              : "border-border hover:border-muted"
                          }`}
                        >
                          <Image
                            src={car.image}
                            alt={car.alt}
                            title={car.alt}
                            width={140}
                            height={60}
                            className="h-10 w-full object-contain"
                          />
                          <span className="text-xs font-semibold text-text">{car.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 border-t border-border pt-8">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">More options</p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {cars.slice(0, 12).filter(c => c.slug !== preSelectedCar).map((car) => (
                        <button
                          type="button"
                          key={car.slug}
                          onClick={() => { setCarSlug(car.slug); setStep(2); }}
                          className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all ${
                            carSlug === car.slug
                              ? "border-brand bg-brand/5"
                              : "border-border hover:border-muted"
                          }`}
                        >
                          <Image
                            src={car.image}
                            alt={car.alt}
                            title={car.alt}
                            width={140}
                            height={60}
                            className="h-10 w-full object-contain"
                          />
                          <span className="text-xs font-semibold text-text">{car.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {cars.slice(0, 12).map((car) => (
                    <button
                      type="button"
                      key={car.slug}
                      onClick={() => { setCarSlug(car.slug); setStep(2); }}
                      className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all ${
                        carSlug === car.slug
                          ? "border-brand bg-brand/5"
                          : "border-border hover:border-muted"
                      }`}
                    >
                      <Image
                        src={car.image}
                        alt={car.alt}
                        title={car.alt}
                        width={140}
                        height={60}
                        className="h-10 w-full object-contain"
                      />
                      <span className="text-xs font-semibold text-text">{car.name}</span>
                    </button>
                  ))}
                </div>
              )}
              {stepMessage && (
                <p className="mt-3 text-sm font-medium text-red-600">{stepMessage}</p>
              )}
            </Reveal>
          )}

          {step === 2 && (
            <Reveal variant="fade-in">
              <h3 className="font-display text-lg font-bold text-text">When &amp; Where</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="col-span-full block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Location</span>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`${fieldBase} appearance-none pr-10`}
                    >
                      <option value="" disabled>
                        Select your location
                      </option>
                      {cityOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  </div>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Date</span>
                  <div className="relative">
                    <input
                      type="date"
                      min={minDate}
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setTime("");
                      }}
                      suppressHydrationWarning
                      className={`${fieldBase} pr-10 ${date ? "" : "text-transparent"}`}
                    />
                    <Calendar className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  </div>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Time</span>
                  <div className="relative">
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      disabled={!date}
                      className={`${fieldBase} appearance-none pr-10 disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                      <option value="" disabled>
                        Select time
                      </option>
                      {timeSlots.map((s) => (
                        <option key={s.label} value={s.label}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  </div>
                </label>
              </div>
              {city && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold text-muted">
                    Showrooms in {city}
                  </p>
                  {showroomsInCity.length === 0 && (
                    <p className="text-sm text-faint">
                      No showroom listed in {city} yet. Our nearest team will reach out.
                    </p>
                  )}
                  {showroomsInCity.map((s) => (
                    <div
                      key={s.name}
                      className="rounded border border-border bg-bg-2 px-4 py-3 text-sm text-text"
                    >
                      {s.name}, <span className="text-muted">{s.address}</span>
                    </div>
                  ))}
                </div>
              )}
              {stepMessage && (
                <p className="mt-3 text-sm font-medium text-red-600">{stepMessage}</p>
              )}
            </Reveal>
          )}

          {step === 3 && (
            <Reveal variant="fade-in">
              <h3 className="font-display text-lg font-bold text-text">Your Details</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Your Name</span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                    className={`${fieldBase} ${fieldErrors.name ? "border-red-400 focus:border-red-400" : ""}`}
                  />
                  {fieldErrors.name && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.name}</p>
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
                      <span className="text-sm font-semibold text-[#059669]">{mobile}</span>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-[#059669] shadow-sm">
                      <Check className="h-3 w-3" /> Verified
                    </span>
                  </div>
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Email</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`${fieldBase} ${fieldErrors.email ? "border-red-400 focus:border-red-400" : ""}`}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.email}</p>
                  )}
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Pincode</span>
                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="e.g. 400001"
                    className={`${fieldBase} ${fieldErrors.pincode ? "border-red-400 focus:border-red-400" : ""}`}
                  />
                  {fieldErrors.pincode && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.pincode}</p>
                  )}
                </label>
                <label className="col-span-full block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">
                    Address <span className="font-normal text-faint">(optional)</span>
                  </span>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House no., street, area"
                    className={fieldBase}
                  />
                </label>
              </div>
            </Reveal>
          )}

          {/* Nav buttons */}
          {step !== 1 && renderNavButtons()}
        </form>
      </div>

      {/* Confirmation popup */}
      {submitted && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={closeWizard}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="animate-fade-up relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-[0_20px_60px_0_rgba(0,0,0,0.25)] sm:p-10"
          >
            <button
              aria-label="Close"
              onClick={closeWizard}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl text-muted transition-colors hover:bg-bg-2"
            >
              <X className="h-5 w-5" />
            </button>
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand/10 text-brand">
              <Check className="h-8 w-8" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold text-text">
              Thanks for your interest!
            </h3>
            <p className="mt-5 text-muted leading-relaxed">
              Thank you for your interest in test driving the{" "}
              {selectedCar ? `Hyundai ${selectedCar.name}` : "Hyundai"}. Our
              representative will contact you shortly on{" "}
              <span className="whitespace-nowrap font-semibold text-text">{mobile}</span>.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              Note: This is not a confirmed test drive. We will check vehicle
              availability and confirm with you.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              We appreciate your time and patience. For further details, call
              us on{" "}
              <span className="whitespace-nowrap font-semibold text-text">{nav.phone}</span>.
            </p>
            <button
              onClick={closeWizard}
              className="mt-6 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:bg-bg-3"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function TestDriveWizard({ initialCarSlug, onBack, onVerificationChange, formSource, splitImage, splitImageAlt }: Omit<TestDriveWizardProps, "verifiedPhone" | "requestChangePhone">) {
  return (
    <OtpGate
      title="Verify to Book a Test Drive"
      subtitle="Enter your phone number to unlock the booking wizard."
      variant="bare"
      barePadded
      onVerificationChange={onVerificationChange}
      formSource={formSource}
      splitImage={splitImage}
      splitImageAlt={splitImageAlt}
    >
      {(verifiedPhone, requestChangePhone) => (
        <TestDriveWizardInner
          initialCarSlug={initialCarSlug}
          onBack={onBack}
          verifiedPhone={verifiedPhone}
          requestChangePhone={requestChangePhone}
        />
      )}
    </OtpGate>
  );
}
