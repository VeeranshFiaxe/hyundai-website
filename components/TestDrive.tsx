"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { carModels, cityOptions, testDriveImage } from "@/lib/data";
import { isEmpty, isValidEmail, isValidMobile, isValidName, isValidPincode, type FormErrors } from "@/lib/validation";
import { submitLead } from "@/lib/submitLead";
import { Calendar, Check, ChevronDown } from "./icons";
import Reveal from "./Reveal";

const fieldBase =
  "w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

const errorBase =
  "w-full rounded border border-red-400 bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-red-500 focus:ring-2 focus:ring-red-400/20";

const timeSlots = [
  { label: "Morning (9–12)", start: 9, end: 12 },
  { label: "Afternoon (12–4)", start: 12, end: 16 },
  { label: "Evening (4–8)", start: 16, end: 20 },
];

function SelectField({
  label,
  options,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  placeholder: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const controlled = value !== undefined;
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted">{label}</span>
      <div className="relative">
        <select
          {...(controlled
            ? { value, onChange: (e: ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value) }
            : { defaultValue: "" })}
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
  const [attempted, setAttempted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [form, setForm] = useState({
    carModel: "",
    location: "",
    name: "",
    mobile: "",
    email: "",
    pincode: "",
    address: "",
    date: "",
    time: "",
  });
  const minDate = new Date().toISOString().slice(0, 10);

  const setField = (key: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const fieldError = (key: string) =>
    attempted && errors[key] ? errorBase : fieldBase;

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (isEmpty(form.carModel)) e.carModel = "Please select a car model.";
    if (isEmpty(form.location)) e.location = "Please select a location.";
    if (isEmpty(form.name) || !isValidName(form.name)) e.name = "Enter your full name (at least 2 characters).";
    if (!isValidMobile(form.mobile)) e.mobile = "Enter a valid 10-digit mobile number.";
    if (!isValidEmail(form.email)) e.email = "Enter a valid email with @ and a domain (e.g. you@example.com).";
    if (!isValidPincode(form.pincode)) e.pincode = "Enter a valid 6-digit pincode.";
    if (isEmpty(form.date)) e.date = "Please select a date.";
    if (isEmpty(form.time)) e.time = "Please select a time.";
    return e;
  };

  const availableTimeSlots = useMemo(() => {
    if (!form.date || form.date !== minDate) return timeSlots;
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;
    return timeSlots.filter((s) => s.end > currentHour);
  }, [form.date, minDate]);

  const effectiveTime = availableTimeSlots.some((s) => s.label === form.time)
    ? form.time
    : "";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttempted(true);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitError(false);
    try {
      await submitLead("test_drive", {
        car_model: form.carModel,
        location: form.location,
        name: form.name.trim(),
        mobile_number: form.mobile.trim(),
        email: form.email.trim(),
        pincode: form.pincode.trim(),
        address: form.address.trim(),
        preferred_date: form.date,
        preferred_time: form.time,
      });
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
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
              <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2" noValidate>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Select Car Model</span>
                  <div className="relative">
                    <select
                      value={form.carModel}
                      onChange={setField("carModel")}
                      className={`${fieldError("carModel")} appearance-none pr-10`}
                    >
                      <option value="" disabled className="text-faint">Select Car Model</option>
                      {carModels.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  </div>
                  {attempted && errors.carModel && (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.carModel}</p>
                  )}
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Select Location</span>
                  <div className="relative">
                    <select
                      value={form.location}
                      onChange={setField("location")}
                      className={`${fieldError("location")} appearance-none pr-10`}
                    >
                      <option value="" disabled className="text-faint">Select Location</option>
                      {cityOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  </div>
                  {attempted && errors.location && (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.location}</p>
                  )}
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Your Name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={setField("name")}
                    placeholder="e.g. John Doe"
                    className={fieldError("name")}
                  />
                  {attempted && errors.name && (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.name}</p>
                  )}
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Mobile Number</span>
                  <input
                    type="tel"
                    value={form.mobile}
                    onChange={setField("mobile")}
                    placeholder="e.g. 9876543210"
                    className={fieldError("mobile")}
                  />
                  {attempted && errors.mobile && (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.mobile}</p>
                  )}
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={setField("email")}
                    placeholder="you@example.com"
                    className={fieldError("email")}
                  />
                  {attempted && errors.email && (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>
                  )}
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Pincode</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.pincode}
                    onChange={setField("pincode")}
                    placeholder="e.g. 400001"
                    className={fieldError("pincode")}
                  />
                  {attempted && errors.pincode && (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.pincode}</p>
                  )}
                </label>

                <label className="col-span-full block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">
                    Address <span className="font-normal text-faint">(optional)</span>
                  </span>
                  <input
                    type="text"
                    value={form.address}
                    onChange={setField("address")}
                    placeholder="House no., street, area"
                    className={fieldBase}
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Date</span>
                  <div className="relative">
                    <input
                      type="date"
                      min={minDate}
                      value={form.date}
                      onChange={setField("date")}
                      suppressHydrationWarning
                      className={`${fieldError("date")} pr-10 ${form.date ? "" : "text-transparent"}`}
                    />
                    <Calendar className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  </div>
                  {attempted && errors.date && (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.date}</p>
                  )}
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-muted">Preferred Time</span>
                  <div className="relative">
                    <select
                      value={effectiveTime}
                      onChange={setField("time")}
                      className={`${fieldError("time")} appearance-none pr-10`}
                    >
                      <option value="" disabled className="text-faint">
                        {form.date && availableTimeSlots.length === 0
                          ? "No slots left today"
                          : "Select time"}
                      </option>
                      {availableTimeSlots.map((s) => (
                        <option key={s.label} value={s.label}>{s.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  </div>
                  {attempted && errors.time && (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.time}</p>
                  )}
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="col-span-full mt-2 rounded bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Booking..." : "Book My Test Drive"}
                </button>
                {submitError && (
                  <p className="col-span-full mt-1 text-sm font-medium text-red-600">
                    Something went wrong. Please try again or call us directly.
                  </p>
                )}
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
