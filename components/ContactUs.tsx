"use client";

import { useState, type FormEvent } from "react";
import { company } from "@/lib/data";
import { isEmpty, isValidEmail, isValidMobile, isValidName, isValidPincode, type FormErrors } from "@/lib/validation";
import { submitLead } from "@/lib/submitLead";
import { submitSupabaseLead } from "@/lib/submitSupabaseLead";
import { Check, Clock, Mail, MapPin, Phone, WhatsApp } from "./icons";
import Reveal from "./Reveal";
import { OtpGate } from "./OtpGate";

const fieldBase =
  "w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

const errorBase =
  "w-full rounded border border-red-400 bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-red-500 focus:ring-2 focus:ring-red-400/20";

function ContactFormInner({ verifiedPhone, requestChangePhone }: { verifiedPhone: string; requestChangePhone: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    pincode: "",
    subject: "",
    message: "",
  });
  const mobile = verifiedPhone;

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const fieldError = (key: string, fieldClass: string) =>
    attempted && errors[key] ? errorBase : fieldClass;

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (isEmpty(form.name) || !isValidName(form.name)) e.name = "Enter your full name (at least 2 characters).";
    if (!isValidEmail(form.email)) e.email = "Enter a valid email with @ and a domain (e.g. you@example.com).";
    if (!isValidPincode(form.pincode)) e.pincode = "Enter a valid 6-digit pincode.";
    if (isEmpty(form.subject)) e.subject = "Please enter a subject.";
    if (isEmpty(form.message)) e.message = "Please enter your message.";
    return e;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttempted(true);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitError(false);
    try {
      await submitLead("contact", {
        name: form.name.trim(),
        mobile_number: `\`${mobile}`,
        email: form.email.trim(),
        pincode: form.pincode.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      submitSupabaseLead("contact-us", {
        name: form.name.trim(),
        mobile_number: mobile,
        email: form.email.trim(),
        pincode: form.pincode.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      }).catch((err) => console.error("[ContactUs] Supabase lead insert failed", err));
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h3 className="font-display text-lg font-bold text-text">
        Send Us a Message
      </h3>
      {submitted ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-brand/10 text-brand">
            <Check className="h-7 w-7" />
          </span>
          <h4 className="mt-4 font-display text-lg font-bold text-text">
            Message sent!
          </h4>
          <p className="mt-1 max-w-xs text-sm text-muted">
            Thank you for reaching out. Our team will get back to you shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-5 rounded border border-border px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-bg-3"
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2" noValidate>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Your Name</span>
            <input
              type="text"
              value={form.name}
              onChange={set("name")}
              placeholder="e.g. John Doe"
              className={fieldError("name", fieldBase)}
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
            <span className="mb-1.5 block text-xs font-semibold text-muted">Your Email</span>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="you@example.com"
              className={fieldError("email", fieldBase)}
            />
            {attempted && errors.email && (
              <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>
            )}
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Pincode</span>
            <input
              type="text"
              value={form.pincode}
              onChange={set("pincode")}
              inputMode="numeric"
              placeholder="e.g. 400001"
              className={fieldError("pincode", fieldBase)}
            />
            {attempted && errors.pincode && (
              <p className="mt-1 text-xs font-medium text-red-600">{errors.pincode}</p>
            )}
          </label>
          <label className="col-span-full block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Subject</span>
            <input
              type="text"
              value={form.subject}
              onChange={set("subject")}
              placeholder="How can we help?"
              className={fieldError("subject", fieldBase)}
            />
            {attempted && errors.subject && (
              <p className="mt-1 text-xs font-medium text-red-600">{errors.subject}</p>
            )}
          </label>
          <label className="col-span-full block">
            <span className="mb-1.5 block text-xs font-semibold text-muted">Your Message</span>
            <textarea
              value={form.message}
              onChange={set("message")}
              rows={5}
              placeholder="Tell us more..."
              className={`${fieldError("message", fieldBase)} resize-none`}
            />
            {attempted && errors.message && (
              <p className="mt-1 text-xs font-medium text-red-600">{errors.message}</p>
            )}
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="col-span-full mt-1 rounded bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
          {submitError && (
            <p className="col-span-full mt-1 text-sm font-medium text-red-600">
              Something went wrong. Please try again or call us directly.
            </p>
          )}
        </form>
      )}
    </>
  );
}

export default function ContactUs() {
  return (
    <section id="contact" className="scroll-mt-24 bg-white py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1180px]">
        <Reveal className="mx-auto mb-10 max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand">
            Contact Us
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
            Get in Touch
          </h2>
          <p className="mt-3 text-sm text-muted">
            Reach our team by call, WhatsApp, email, or send a message here.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal variant="slide-right" className="rounded-lg border border-border bg-bg-2 p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold text-text">
              Contact Information
            </h3>
            <p className="mt-1 text-sm text-muted">
              We are here to help with bookings, service queries, finance questions
              and anything else you need.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-muted">Call Us</p>
                  <a
                    href={`tel:${company.phoneE164}`}
                    className="text-sm font-semibold text-text transition-colors hover:text-brand"
                  >
                    {company.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-muted">Main Office</p>
                  <p className="text-sm font-semibold text-text">
                    Modi House 1, Eastern Express Hwy, opp. LIC Bldg., Naupada,
                    Bhakti Mandir, Louis Wadi, Thane West, Thane, Maharashtra 400602
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                  <WhatsApp className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-muted">WhatsApp</p>
                  <a
                    href="https://wa.link/diys8m"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-text transition-colors hover:text-brand"
                  >
                    {company.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-muted">Email Us</p>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-sm font-semibold text-text transition-colors hover:text-brand"
                  >
                    {company.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                  <Clock className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-muted">Working Hours</p>
                  <p className="text-sm font-semibold text-text">{company.hours}</p>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal
            delay={120}
            variant="slide-left"
            className="rounded-lg border border-border bg-white p-6 shadow-[0_4px_32px_0_rgba(0,44,95,0.06)] sm:p-8"
          >
            <OtpGate
              title="Verify to Send a Message"
              subtitle="Enter your phone number to unlock the contact form."
              variant="bare"
              formSource="contact"
            >
              {(verifiedPhone, requestChangePhone) => (
                <ContactFormInner
                  verifiedPhone={verifiedPhone}
                  requestChangePhone={requestChangePhone}
                />
              )}
            </OtpGate>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
