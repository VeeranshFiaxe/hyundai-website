"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { carModels, serviceCentres } from "@/lib/data";
import { isEmpty, isValidEmail, isValidMobile, isValidName, type FormErrors } from "@/lib/validation";
import { submitLead } from "@/lib/submitLead";
import { submitSupabaseLead } from "@/lib/submitSupabaseLead";
import { Calendar, Check, ChevronDown, Phone } from "./icons";
import Reveal from "./Reveal";
import { OtpGate } from "./OtpGate";

const fieldBase =
  "w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

const errorBase =
  "w-full rounded border border-red-400 bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-red-500 focus:ring-2 focus:ring-red-400/20";

const timeSlots = [
  { label: "Morning (9–12)", start: 9, end: 12 },
  { label: "Afternoon (12–4)", start: 12, end: 16 },
  { label: "Evening (4–8)", start: 16, end: 20 },
];

const serviceCentreOptions = serviceCentres.map((s) => `${s.name}, ${s.city}`);

const serviceTypes = ["Free Service", "Paid Service", "Running Repair"];

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
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted">{label}</span>
      <div className="relative">
        <select
          value={value ?? ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value)}
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

function ServiceBookingInner({ verifiedPhone, requestChangePhone }: { verifiedPhone: string; requestChangePhone: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [pickupDrop, setPickupDrop] = useState(false);
  const [form, setForm] = useState({
    carModel: "",
    serviceCentre: "",
    serviceType: "",
    name: "",
    email: "",
    regNumber: "",
    date: "",
    time: "",
  });
  const mobile = verifiedPhone;
  const [customCarModel, setCustomCarModel] = useState("");
  const isOther = form.carModel === "Other";
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const minDate = today.toISOString().slice(0, 10);

  const setField = (key: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const fieldError = (key: string) =>
    attempted && errors[key] ? errorBase : fieldBase;

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (isEmpty(form.carModel)) e.carModel = "Please select a car model.";
    if (isOther && isEmpty(customCarModel)) e.customCarModel = "Please enter your car model.";
    if (isEmpty(form.serviceCentre)) e.serviceCentre = "Please select a service centre.";
    if (isEmpty(form.serviceType)) e.serviceType = "Please select a type of service.";
    if (isEmpty(form.name) || !isValidName(form.name)) e.name = "Enter your full name (at least 2 characters).";
    if (!isValidEmail(form.email)) e.email = "Enter a valid email with @ and a domain (e.g. you@example.com).";
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
      await submitLead("service", {
        car_model: isOther ? customCarModel.trim() : form.carModel,
        service_centre: form.serviceCentre,
        service_type: form.serviceType,
        name: form.name.trim(),
        mobile_number: `\`${mobile}`,
        email: form.email.trim(),
        registration_number: form.regNumber.trim(),
        preferred_date: form.date,
        preferred_time: form.time,
        pickup_drop: pickupDrop ? "Yes" : "No",
      });
      submitSupabaseLead("service", {
        car_model: isOther ? customCarModel.trim() : form.carModel,
        service_centre: form.serviceCentre,
        service_type: form.serviceType,
        name: form.name.trim(),
        mobile_number: mobile,
        email: form.email.trim(),
        registration_number: form.regNumber.trim(),
        preferred_date: form.date,
        preferred_time: form.time,
        pickup_drop: pickupDrop ? "Yes" : "No",
      }).catch((err) => console.error("[ServiceBooking] Supabase lead insert failed", err));
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Reveal delay={150} className="mx-auto max-w-3xl rounded-lg border border-border bg-bg-2 p-8 shadow-[0_4px_32px_0_rgba(0,44,95,0.08)] sm:p-10">
      {submitted ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand">
            <Check className="h-8 w-8" />
          </span>
          <h3 className="mt-6 font-display text-2xl font-bold text-text">
            Service booking received!
          </h3>
          <p className="mt-2 max-w-sm text-muted">
            Thank you. A Modi Hyundai service advisor will call you shortly to confirm your appointment.
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
                onChange={(e) => {
                  setField("carModel")(e);
                  if (e.target.value !== "Other") setCustomCarModel("");
                }}
                className={`${fieldError("carModel")} appearance-none pr-10`}
              >
                <option value="" disabled className="text-faint">Select Car Model</option>
                {carModels.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            </div>
            {attempted && errors.carModel && (
              <p className="mt-1 text-xs font-medium text-red-600">{errors.carModel}</p>
            )}
          </label>
          {isOther && (
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-muted">Your Car Model</span>
              <input
                type="text"
                value={customCarModel}
                onChange={(e) => setCustomCarModel(e.target.value)}
                placeholder="e.g. Santro Xing"
                className={fieldError("customCarModel")}
              />
              {attempted && errors.customCarModel && (
                <p className="mt-1 text-xs font-medium text-red-600">{errors.customCarModel}</p>
              )}
            </label>
          )}
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Select Service Centre</span>
            <div className="relative">
              <select
                value={form.serviceCentre}
                onChange={setField("serviceCentre")}
                className={`${fieldError("serviceCentre")} appearance-none pr-10`}
              >
                <option value="" disabled className="text-faint">Select Service Centre</option>
                {serviceCentreOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            </div>
            {attempted && errors.serviceCentre && (
              <p className="mt-1 text-xs font-medium text-red-600">{errors.serviceCentre}</p>
            )}
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Type of Service</span>
            <div className="relative">
              <select
                value={form.serviceType}
                onChange={setField("serviceType")}
                className={`${fieldError("serviceType")} appearance-none pr-10`}
              >
                <option value="" disabled className="text-faint">Select Type of Service</option>
                {serviceTypes.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            </div>
            {attempted && errors.serviceType && (
              <p className="mt-1 text-xs font-medium text-red-600">{errors.serviceType}</p>
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
            <span className="mb-1.5 block text-xs font-semibold text-muted">
              Registration Number{" "}
              <span className="font-normal text-faint">(optional)</span>
            </span>
            <input
              type="text"
              maxLength={12}
              value={form.regNumber}
              onChange={setField("regNumber")}
              placeholder="e.g. MH04AB1234"
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
                    ? "No slots available"
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

          <label className="col-span-full flex items-center gap-2.5 rounded border border-border bg-white px-4 py-3">
            <input
              type="checkbox"
              checked={pickupDrop}
              onChange={(e) => setPickupDrop(e.target.checked)}
              className="h-4 w-4 shrink-0 rounded border-border text-brand accent-brand focus:ring-2 focus:ring-brand/10"
            />
            <span className="text-sm text-text">Pick-up &amp; Drop required</span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="col-span-full mt-2 rounded bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Booking..." : "Book My Service"}
          </button>
          {submitError && (
            <p className="col-span-full mt-1 text-sm font-medium text-red-600">
              Something went wrong. Please try again or call us directly.
            </p>
          )}
          <p className="col-span-full text-center text-xs text-faint">
            By submitting, you agree to be contacted by Modi Hyundai about
            your service request. See our{" "}
            <a href="/privacy" className="font-medium text-brand hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      )}
    </Reveal>
  );
}

export default function ServiceBooking() {
  return (
    <section id="book-service" className="scroll-mt-24">
      <div className="container-px mx-auto max-w-[1400px]">
        <Reveal className="mx-auto mb-10 max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand">
            Service Booking
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
            Book a Service Appointment
          </h2>
          <p className="mt-3 text-sm text-muted">
            Choose your nearest service centre and a slot that works for you.
            Our team will confirm your booking shortly.
          </p>
        </Reveal>

        <OtpGate
          title="Verify Your Phone"
          subtitle="Enter your mobile number to unlock the service booking form."
          variant="card"
          formSource="service"
        >
          {(verifiedPhone, requestChangePhone) => (
            <ServiceBookingInner
              verifiedPhone={verifiedPhone}
              requestChangePhone={requestChangePhone}
            />
          )}
        </OtpGate>
      </div>
    </section>
  );
}
