"use client";

import { useState, type FormEvent } from "react";
import { carModels, cityOptions } from "@/lib/data";
import { isEmpty, isValidName, type FormErrors } from "@/lib/validation";
import { Check, ChevronDown, Calendar, ArrowRight, ArrowLeft, Phone } from "./icons";
import { OtpGate } from "./OtpGate";

const fieldBase =
  "w-full rounded border border-border bg-white px-3 py-2.5 text-[13px] text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

const errorBase =
  "w-full rounded border border-red-400 bg-white px-3 py-2.5 text-[13px] text-text outline-none transition-colors placeholder:text-faint focus:border-red-500 focus:ring-2 focus:ring-red-400/20";

function HeroFormInner({ verifiedPhone, requestChangePhone }: { verifiedPhone: string; requestChangePhone: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [attempted, setAttempted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [step2Errors, setStep2Errors] = useState<FormErrors>({});

  const [name, setName] = useState("");
  const mobile = verifiedPhone;
  const [model, setModel] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const fieldError = (key: string) =>
    (attempted && errors[key]) || errors[key] ? errorBase : fieldBase;
  const step2FieldError = (key: string) =>
    step2Errors[key] ? errorBase : fieldBase;

  const validateStep1 = (): FormErrors => {
    const e: FormErrors = {};
    if (isEmpty(name) || !isValidName(name)) e.name = "Enter your full name.";
    if (isEmpty(model)) e.model = "Please select a car model.";
    return e;
  };

  const validateStep2 = (): FormErrors => {
    const e: FormErrors = {};
    if (isEmpty(location)) e.location = "Please select a location.";
    if (isEmpty(date)) e.date = "Please select a date.";
    if (isEmpty(time)) e.time = "Please select a time.";
    return e;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validateStep2();
    setStep2Errors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  };

  const handleNext = () => {
    setAttempted(true);
    const errs = validateStep1();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(2);
  };

  if (submitted) {
    return (
      <div className="flex h-[340px] w-full max-w-[340px] flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-2xl">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-4 font-display text-lg font-bold text-text">Booking received!</h3>
        <p className="mt-2 text-xs text-muted">We&apos;ll call shortly to confirm your preferred car, time and location.</p>
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(1);
            setName("");
            setModel("");
          }}
          className="mt-6 rounded border border-border px-4 py-2 text-xs font-semibold text-text transition-colors hover:bg-bg-2"
        >
          Book another
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[340px] rounded-lg bg-white p-6 shadow-2xl">
      <h3 className="font-display text-xl font-bold text-text">Book a Test Drive</h3>
      <p className="mt-1 text-xs text-muted">
        {step === 1 ? "Step 1 of 2: Tell us what you want to drive" : "Step 2 of 2: Pick a time and location"}
      </p>
      
      <form onSubmit={onSubmit} className="mt-5 overflow-hidden">
        <div 
          className="flex w-[200%] transition-transform duration-500 ease-in-out"
          style={{ transform: step === 1 ? "translateX(0)" : "translateX(-50%)" }}
        >
          {/* Step 1 */}
          <div className="w-1/2 shrink-0 flex flex-col gap-3 pr-4">
            <label className="block">
              <span className="sr-only">Your Name</span>
              <input
                type="text"
                placeholder="e.g. John Doe"
                className={fieldError("name")}
                value={name}
                onChange={e => setName(e.target.value)}
              />
              {attempted && errors.name && (
                <p className="mt-0.5 text-[11px] font-medium text-red-600">{errors.name}</p>
              )}
            </label>
            <div
              className="flex cursor-pointer items-center justify-between rounded border border-[#dbeafe] bg-[#f0f7ff] px-3 py-2.5"
              onClick={requestChangePhone}
              title="Click to change verified phone number"
            >
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-brand" />
                <span className="text-[13px] font-semibold text-brand">+91 {mobile}</span>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-brand shadow-sm">
                <Check className="h-2.5 w-2.5" /> Verified
              </span>
            </div>
            <label className="block">
              <span className="sr-only">Select Car Model</span>
              <div className="relative">
                <select
                  className={`${fieldError("model")} appearance-none pr-8`}
                  value={model}
                  onChange={e => setModel(e.target.value)}
                >
                  <option value="" disabled className="text-faint">Select Car Model</option>
                  {carModels.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              </div>
              {attempted && errors.model && (
                <p className="mt-0.5 text-[11px] font-medium text-red-600">{errors.model}</p>
              )}
            </label>
            <button
              type="button"
              onClick={handleNext}
              className="mt-2 group flex w-full items-center justify-center gap-2 rounded bg-brand py-3 text-[13px] font-semibold text-white transition-all hover:bg-brand-light active:scale-[0.98]"
            >
              Next
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="text-center text-[11px] text-faint">
              No obligation. Takes less than 30 seconds.
            </p>
          </div>

          {/* Step 2 */}
          <div className="w-1/2 shrink-0 flex flex-col gap-3 pl-4">
            <label className="block">
              <span className="sr-only">Select Location</span>
              <div className="relative">
                <select
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className={`${step2FieldError("location")} appearance-none pr-8`}
                >
                  <option value="" disabled className="text-faint">Select Location</option>
                  {cityOptions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              </div>
              {step2Errors.location && (
                <p className="mt-0.5 text-[11px] font-medium text-red-600">{step2Errors.location}</p>
              )}
            </label>
            <label className="block">
              <span className="sr-only">Preferred Date</span>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className={`${step2FieldError("date")} pr-8`}
                />
                <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              </div>
              {step2Errors.date && (
                <p className="mt-0.5 text-[11px] font-medium text-red-600">{step2Errors.date}</p>
              )}
            </label>
            <label className="block">
              <span className="sr-only">Preferred Time</span>
              <div className="relative">
                <select
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className={`${step2FieldError("time")} appearance-none pr-8`}
                >
                  <option value="" disabled className="text-faint">Select Time</option>
                  <option value="Morning">Morning (9-12)</option>
                  <option value="Afternoon">Afternoon (12-4)</option>
                  <option value="Evening">Evening (4-8)</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              </div>
              {step2Errors.time && (
                <p className="mt-0.5 text-[11px] font-medium text-red-600">{step2Errors.time}</p>
              )}
            </label>
            
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="group flex w-1/3 items-center justify-center rounded border border-border bg-bg-2 py-3 text-[13px] font-semibold text-text transition-colors hover:bg-bg-3"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button
                type="submit"
                className="flex w-2/3 items-center justify-center rounded bg-brand py-3 text-[13px] font-semibold text-white transition-all hover:bg-brand-light active:scale-[0.98]"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function HeroForm() {
  return (
    <OtpGate
      title="Book a Test Drive"
      subtitle="Enter your phone number to get started. We'll verify it before you book."
    >
      {(verifiedPhone, requestChangePhone) => (
        <HeroFormInner
          verifiedPhone={verifiedPhone}
          requestChangePhone={requestChangePhone}
        />
      )}
    </OtpGate>
  );
}
