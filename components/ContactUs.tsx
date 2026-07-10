"use client";

import { useMemo, useState, type FormEvent } from "react";
import { company, locations } from "@/lib/data";
import { MapPin, Phone, Mail, Clock, WhatsApp, Check, ChevronDown } from "./icons";
import Reveal from "./Reveal";

const fieldBase =
  "w-full rounded border border-border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/10";

const mapEmbedSrc = (address: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

export default function ContactUs() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0].name);
  const [submitted, setSubmitted] = useState(false);

  const active = useMemo(
    () => locations.find((l) => l.name === selectedLocation) ?? locations[0],
    [selectedLocation],
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-white py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        <Reveal className="mx-auto mb-10 max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand">
            Contact Us
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
            Get in Touch
          </h2>
          <p className="mt-3 text-sm text-muted">
            We&apos;re here to help with your next Hyundai, any time.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Get in touch info + form */}
          <Reveal variant="slide-right" className="flex flex-col gap-6">
            <div className="rounded-lg border border-border bg-bg-2 p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-text">
                Get in Touch
              </h3>
              <p className="mt-1 text-sm text-muted">
                We are here to help with your needs. Reach out to us anytime.
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
                    <WhatsApp className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-muted">WhatsApp</p>
                    <a
                      href={`https://wa.me/${company.phoneE164.replace("+", "")}`}
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
            </div>

            {/* Message form */}
            <div className="rounded-lg border border-border bg-white p-6 shadow-[0_4px_32px_0_rgba(0,44,95,0.06)] sm:p-8">
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
                <form onSubmit={onSubmit} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Your Email</span>
                    <input type="email" required placeholder="you@example.com" className={fieldBase} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Subject</span>
                    <input type="text" required placeholder="How can we help?" className={fieldBase} />
                  </label>
                  <label className="col-span-full block">
                    <span className="mb-1.5 block text-xs font-semibold text-muted">Your Message</span>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us more..."
                      className={`${fieldBase} resize-none`}
                    />
                  </label>
                  <button
                    type="submit"
                    className="col-span-full mt-1 rounded bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-light"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Locations selector + map */}
          <Reveal delay={150} variant="slide-left" className="flex flex-col overflow-hidden rounded-lg border border-border">
            <div className="border-b border-border bg-bg-2 p-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted">Our Locations</span>
                <div className="relative">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className={`${fieldBase} appearance-none bg-white pr-10`}
                  >
                    {locations.map((l) => (
                      <option key={l.name} value={l.name}>
                        {l.name} — {l.type} ({l.city})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                </div>
              </label>
            </div>

            <div className="relative h-64 w-full sm:h-80">
              <iframe
                key={active.name}
                src={mapEmbedSrc(active.address)}
                title={`Map to ${active.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            <div className="flex-1 space-y-3 bg-white p-5">
              <span className="inline-block rounded bg-brand/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
                {active.type}
              </span>
              <h4 className="font-display text-base font-bold text-text">{active.name}</h4>
              <p className="flex items-start gap-2 text-sm text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-faint" />
                <span>{active.address}</span>
              </p>
              <a
                href={`tel:${active.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
              >
                <Phone className="h-4 w-4" />
                {active.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
