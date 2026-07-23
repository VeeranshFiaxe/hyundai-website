"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Shield, Check, Phone } from "./icons";
import { isValidMobile, isValidEmail, isEmpty } from "@/lib/validation";
import CountryCodeSelector from "./CountryCodeSelector";
import { allCountries, type Country } from "@/lib/countries";

const defaultCountry = allCountries.find((c) => c.code === "IN")!;

type Step = "phone" | "otp" | "form" | "success";

interface OtpGatedFormProps {
  variant?: "inline" | "popup";
  onClosePopup?: () => void;
}

export function OtpGatedFormBase({ variant = "inline", onClosePopup }: OtpGatedFormProps) {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(defaultCountry);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [car, setCar] = useState("");
  const [message, setMessage] = useState("");
  
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setConsentError(true);
      return;
    }
    if (!phone || phone.length !== selectedCountry.maxLength) {
      setError(`Please enter a valid ${selectedCountry.maxLength}-digit phone number.`);
      return;
    }
    if (selectedCountry.code === "IN" && !/^[6-9]\d{9}$/.test(phone)) {
      setError("Please enter a valid 10-digit Indian phone number starting with 6-9.");
      return;
    }
    setError("");
    setConsentError(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1200);
  };
  
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) {
      setError("Please enter a 4-digit OTP.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otp === "0000") {
        setStep("form");
      } else {
        setError("Invalid OTP. For demo, use 0000.");
      }
    }, 800);
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmpty(name) || !isValidEmail(email) || isEmpty(car)) {
      setError("Please fill out all required fields correctly.");
      return;
    }
    setError("");
    setStep("success");
  };
  
  const resetForm = () => {
    setStep("phone");
    setPhone("");
    setOtp("");
    setName("");
    setEmail("");
    setCar("");
    setMessage("");
    if (onClosePopup) onClosePopup();
  };

  const OtpModal = () => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={() => setStep("phone")}>
      <div className="animate-fade-up relative w-full max-w-sm rounded-xl bg-white px-4 py-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={() => setStep("phone")} className="absolute right-4 top-4 text-faint hover:text-text transition-colors">
          <X className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
            <Shield className="h-6 w-6" />
          </div>
          <h3 className="font-display text-xl font-bold text-text">Verify OTP</h3>
          <p className="mt-2 text-sm text-muted">
            Code sent to <span className="font-semibold text-text">{selectedCountry.dialCode} {phone}</span>
          </p>
          <form onSubmit={handleOtpSubmit} className="mt-6 w-full">
            <input
              type="text"
              maxLength={4}
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
              className="w-full rounded-lg border border-border bg-bg-2 py-3 text-center text-2xl font-bold tracking-[0.5em] text-text outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/10"
              autoFocus
            />
            {error && <p className="mt-2 text-sm font-medium text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded bg-brand py-3 font-semibold text-white transition-colors hover:bg-brand-light disabled:opacity-70"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
              className="mt-4 text-sm font-medium text-muted transition-colors hover:text-text"
            >
              Change Phone Number
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const containerClass = variant === "popup" 
    ? "w-full max-w-md rounded-xl bg-white px-4 py-6 shadow-2xl animate-fade-up relative"
    : "w-full max-w-md rounded-xl bg-white px-4 py-6 shadow-sm border border-border";

  if (step === "phone" || step === "otp") {
    return (
      <div className={containerClass} onClick={e => e.stopPropagation()}>
        {variant === "popup" && (
          <button onClick={resetForm} className="absolute right-4 top-4 text-faint hover:text-text transition-colors">
            <X className="h-5 w-5" />
          </button>
        )}
        <h3 className="font-display text-xl font-bold text-text">Enter Phone Number</h3>
        <p className="mt-2 text-sm text-muted">We will send you an OTP to verify your number.</p>
        <form onSubmit={handlePhoneSubmit} className="mt-6">
          <div className="relative flex items-center rounded-xl border-2 border-border bg-bg-2 transition-all focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
            <CountryCodeSelector value={selectedCountry} onChange={setSelectedCountry} />
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
              maxLength={selectedCountry.maxLength}
              placeholder={selectedCountry.placeholder}
              className="w-full rounded-r-xl border-0 bg-transparent px-4 py-3.5 text-sm text-text outline-none placeholder:text-faint"
            />
          </div>
          {error && <p className="mt-2 text-sm font-medium text-red-500">{error}</p>}
          <label className="mt-4 flex items-start gap-2.5 text-left cursor-pointer">
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
            <p className="mt-2 text-sm font-medium text-red-500">
              Please check the box to agree to the T&C and Privacy Policy before proceeding.
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded bg-brand py-3 font-semibold text-white transition-colors hover:bg-brand-light disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
        {step === "otp" && <OtpModal />}
      </div>
    );
  }

  if (step === "form") {
    return (
      <div className={containerClass} onClick={e => e.stopPropagation()}>
        {variant === "popup" && (
          <button onClick={resetForm} className="absolute right-4 top-4 text-faint hover:text-text transition-colors">
            <X className="h-5 w-5" />
          </button>
        )}
        <h3 className="font-display text-xl font-bold text-text">Almost Done!</h3>
        <p className="mt-2 text-sm text-muted">Please fill in your details to continue.</p>
        
        <div className="mt-6 flex items-center justify-between rounded-lg bg-[#ecfdf5] px-4 py-3 border border-[#d1fae5]">
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-[#059669]" />
            <span className="text-sm font-semibold text-brand">{selectedCountry.dialCode} {phone}</span>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-bold text-[#059669] bg-white px-2 py-1 rounded-full shadow-sm">
            <Check className="h-3 w-3" /> Verified
          </span>
        </div>
        
        <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
          <input type="hidden" name="mobile" value={`${selectedCountry.dialCode} ${phone}`} />
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full rounded border border-border bg-white px-3 py-2.5 text-sm text-text outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/10"
              placeholder="e.g. John Doe"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded border border-border bg-white px-3 py-2.5 text-sm text-text outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/10"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">Preferred Car</label>
            <select
              value={car}
              onChange={e => setCar(e.target.value)}
              className="w-full rounded border border-border bg-white px-3 py-2.5 text-sm text-text outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/10 appearance-none"
            >
              <option value="" disabled>Select a car</option>
              <option value="creta">Hyundai Creta</option>
              <option value="venue">Hyundai Venue</option>
              <option value="i20">Hyundai i20</option>
              <option value="tucson">Hyundai Tucson</option>
              <option value="verna">Hyundai Verna</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">Message (Optional)</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={3}
              className="w-full rounded border border-border bg-white px-3 py-2.5 text-sm text-text outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/10 resize-none"
              placeholder="Any specific requirements?"
            />
          </div>
          {error && <p className="text-sm font-medium text-red-500">{error}</p>}
          <button
            type="submit"
            className="mt-2 w-full rounded bg-brand py-3 font-semibold text-white transition-colors hover:bg-brand-light"
          >
            Submit Request
          </button>
        </form>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className={containerClass} onClick={e => e.stopPropagation()}>
        <div className="flex flex-col items-center justify-center text-center p-4">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
            <Check className="h-6 w-6" />
          </span>
          <h3 className="mt-4 font-display text-lg font-bold text-text">Request Submitted!</h3>
          <p className="mt-2 text-sm text-muted">Thank you, {name}. We will contact you shortly at {selectedCountry.dialCode} {phone}.</p>
          <button
            onClick={resetForm}
            className="mt-6 rounded border border-border px-8 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-bg-2"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export function OtpGatedForm() {
  return <OtpGatedFormBase variant="inline" />;
}

export function OtpGatedFormPopup({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={className || "rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-light"}
      >
        Book Your Test Drive
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <OtpGatedFormBase variant="popup" onClosePopup={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}
