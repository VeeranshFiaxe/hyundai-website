"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, Phone, Shield } from "./icons";
import { useVerifiedPhone } from "./VerifiedPhoneProvider";
import { submitLead } from "@/lib/submitLead";
import CountryCodeSelector from "./CountryCodeSelector";
import { allCountries, type Country } from "@/lib/countries";

const defaultCountry = allCountries.find((c) => c.code === "IN")!;

type OtpStep = "phone" | "otp";

interface OtpGateProps {
  children: (verifiedPhone: string, requestChangePhone: () => void) => React.ReactNode;
  title?: string;
  subtitle?: string;
  onVerified?: (phone: string) => void;
  variant?: "card" | "bare";
  /**
   * When true (and variant is "bare"), the gate wraps its content in a
   * max-w-md container with the card's horizontal padding. Use this when the
   * gate is rendered directly inside a wider modal that does not add its own
   * content padding until after verification.
   */
  barePadded?: boolean;
  /**
   * Fired with `true` whenever the gate is showing the phone/OTP entry
   * (narrow content), and `false` once verified (wider post-verification
   * content). Lets the embedding modal resize itself to match the content.
   */
  onVerificationChange?: (verifying: boolean) => void;
  /**
   * Label identifying which form/instance this OTP gate serves.
   * Sent with the phone_capture lead on successful verification.
   */
  formSource?: string;
  /**
   * Local image path. When provided AND the user is not yet verified, the
   * phone/OTP entry renders as a wider two-panel card: a brand image panel on
   * the left and the form on the right. Used for modal popups where extra
   * width is available. Once verified, the gate falls back to the normal
   * bare/barePadded layout so the (wider) post-verification form renders as
   * before. Ignored for inline embeds where the modal width is unknown.
   */
  splitImage?: string;
  /** Alt text for the split image panel. */
  splitImageAlt?: string;
}

export function OtpGate({
  children,
  title = "Enter Phone Number",
  subtitle = "We'll send you an OTP to verify your number.",
  onVerified,
  variant = "card",
  barePadded = false,
  onVerificationChange,
  formSource,
  splitImage,
  splitImageAlt = "",
}: OtpGateProps) {
  // Verified state is shared site-wide via VerifiedPhoneProvider so verifying
  // once unlocks every form. Transient entry state (the typed digits, loading,
  // error, the change-number dialog) stays local to this gate instance.
  const { verifiedPhone, verify, clear } = useVerifiedPhone();
  const isVerified = !!verifiedPhone;
  const [step, setStep] = useState<OtpStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(defaultCountry);
  const [showConfirm, setShowConfirm] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null]);
  const otpContainerRef = useRef<HTMLDivElement>(null);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    setError("");

    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }

    if (next.every((d) => d !== "")) {
      setTimeout(() => verifyOtp(next.join("")), 150);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasted.length === 0) return;
    const next = [...otp];
    for (let i = 0; i < Math.min(4, pasted.length); i++) {
      next[i] = pasted[i];
    }
    setOtp(next);
    setError("");

    const focusIdx = Math.min(3, pasted.length);
    otpRefs.current[focusIdx]?.focus();

    if (next.every((d) => d !== "")) {
      setTimeout(() => verifyOtp(next.join("")), 150);
    }
  };

  // Calls the real send-otp API. Server-side normalization strips the dial
  // code's "+" and the space, so we can send the human-readable form as-is.
  const requestOtp = async (): Promise<{ ok: boolean; error?: string }> => {
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: `${selectedCountry.dialCode} ${phone}` }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return { ok: false, error: data.error || "Failed to send OTP. Please try again." };
      }
      return { ok: true };
    } catch {
      return { ok: false, error: "Network error. Please try again." };
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
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
    const result = await requestOtp();
    setLoading(false);
    if (!result.ok) {
      setError(result.error!);
      return;
    }
    setStep("otp");
    setTimeout(() => otpRefs.current[0]?.focus(), 200);
  };

  const verifyOtp = async (code: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: `${selectedCountry.dialCode} ${phone}`,
          otp: code,
        }),
      });
      const data = await res.json().catch(() => ({}));
      setLoading(false);
      if (!res.ok || !data.success) {
        setError(data.error || "Invalid OTP.");
        setOtp(["", "", "", ""]);
        otpRefs.current[0]?.focus();
        return;
      }
      // Commit to the shared provider so every form on the site sees this
      // phone as verified (and persists it across refreshes).
      verify(`${selectedCountry.dialCode} ${phone}`);
      if (onVerified) onVerified(`${selectedCountry.dialCode} ${phone}`);

      // Fire-and-forget phone-capture: send the verified number immediately
      // so we have it even if the user abandons the rest of the form.
      if (formSource) {
        submitLead("phone_capture", {
          phone_number: `\`${selectedCountry.dialCode} ${phone}`,
          form_source: formSource,
        }).catch(() => {});
      }
    } catch {
      setLoading(false);
      setError("Network error. Please try again.");
      setOtp(["", "", "", ""]);
      otpRefs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    setOtp(["", "", "", ""]);
    setError("");
    setLoading(true);
    const result = await requestOtp();
    setLoading(false);
    if (!result.ok) {
      setError(result.error!);
      return;
    }
    otpRefs.current[0]?.focus();
  };

  const requestChangePhone = () => {
    setShowConfirm(true);
  };

  const confirmChangePhone = () => {
    setShowConfirm(false);
    // Clear the shared verification so every form reverts to the phone step:
    // "reverify and change" applies universally.
    clear();
    setStep("phone");
    setOtp(["", "", "", ""]);
    setError("");
  };

  // Let the parent modal know whether we're showing the narrow phone/OTP entry
  // (verifying === true) or the wider verified content. Fires on mount and
  // whenever the verified state flips.
  useEffect(() => {
    onVerificationChange?.(!isVerified);
  }, [isVerified, onVerificationChange]);

  const cancelChangePhone = () => {
    setShowConfirm(false);
  };

  // `bare` keeps the original flush behaviour (no padding, no width constraint)
  // so existing embedders that provide their own chrome (e.g. ContactUs) are
  // unaffected. `barePadded` opts into the card's width + horizontal padding so
  // the OTP form looks right when rendered directly inside a wider modal whose
  // own padding only kicks in after verification.
  const header = variant === "card" || barePadded ? "px-6 sm:px-10" : "";
  const wrapperClasses =
    variant === "card"
      ? "mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-border bg-white shadow-[0_8px_40px_0_rgba(0,44,95,0.10)] relative"
      : barePadded
        ? "relative mx-auto w-full max-w-md"
        : "relative";

  // When a splitImage is provided we are in a modal popup with room for a
  // two-panel card. The image panel only shows for the phone/OTP entry (the
  // unverified state). Once verified, the (wider) post-verification form takes
  // over and we drop the image so it renders as before.
  const useSplit = Boolean(splitImage) && !isVerified;

  if (!isVerified) {
    // The phone-entry and OTP-entry markup, rendered identically in both the
    // single-column and split layouts. Keeping it as one variable avoids
    // duplication and guarantees the two layouts never drift.
    const stepContent =
      step === "phone" ? (
        <div key="phone-step" className="animate-fade-up py-8 text-center sm:py-10">
          <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-brand/10">
            <Phone className="h-7 w-7 text-brand" />
          </div>
          <h3 className="font-display text-xl font-bold text-text">{title}</h3>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
          <form onSubmit={handlePhoneSubmit} className="mt-8">
            <div className="relative flex items-center rounded-xl border-2 border-border bg-bg-2 transition-all focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
              <CountryCodeSelector value={selectedCountry} onChange={setSelectedCountry} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, ""));
                  setError("");
                }}
                maxLength={selectedCountry.maxLength}
                placeholder={selectedCountry.placeholder}
                className="w-full rounded-r-xl bg-transparent px-4 py-3.5 text-sm text-text outline-none placeholder:text-faint"
              />
            </div>
            {error && (
              <p className="mt-3 text-sm font-medium text-red-500">{error}</p>
            )}
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
                <Link href="/terms" className="font-semibold text-text underline hover:text-brand">T&amp;C</Link> and{" "}
                <Link href="/privacy" className="font-semibold text-text underline hover:text-brand">Privacy Policy</Link>.
                This consent overrides any DNC/NDNC registrations.
              </span>
            </label>
            {consentError && (
              <p className="mt-2 text-sm font-medium text-red-500">
                Please check the box to agree to the T&amp;C and Privacy Policy before proceeding.
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-brand py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-light hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" className="opacity-75" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
        </div>
      ) : (
        <div key="otp-step" className="animate-fade-up py-8 text-center sm:py-10">
          <button
            type="button"
            onClick={() => {
              setStep("phone");
              setOtp(["", "", "", ""]);
              setError("");
            }}
            className="absolute left-6 top-6 grid h-9 w-9 place-items-center rounded-xl text-muted transition-all hover:bg-bg-2 hover:text-text sm:left-10 sm:top-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-brand/10">
            <Shield className="h-7 w-7 text-brand" />
          </div>
          <h3 className="font-display text-xl font-bold text-text">Verify OTP</h3>
          <p className="mt-2 text-sm text-muted">
            Code sent to{" "}
            <span className="font-semibold text-text">{selectedCountry.dialCode} {phone}</span>
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (otp.every((d) => d !== "")) verifyOtp(otp.join(""));
            }}
            className="mt-8"
          >
            <div ref={otpContainerRef} className="flex items-center justify-center gap-3">
              {otp.map((digit, i) => {
                const isFilled = digit !== "";
                const isError = error !== "" && isFilled;
                return (
                  <input
                    key={i}
                    ref={(el) => {
                      otpRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onPaste={i === 0 ? handleOtpPaste : undefined}
                    className={`h-14 w-14 rounded-xl border-2 text-center text-xl font-bold text-text outline-none transition-all ${
                      isError
                        ? "border-red-400 bg-red-50"
                        : isFilled
                          ? "border-brand bg-brand/5"
                          : "border-border bg-bg-2 focus:border-brand focus:ring-4 focus:ring-brand/10"
                    }`}
                  />
                );
              })}
            </div>
            {error && (
              <p className="mt-4 text-sm font-medium text-red-500">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || otp.some((d) => d === "")}
              className="mt-6 w-full rounded-xl bg-brand py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-light hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" className="opacity-75" />
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify OTP"
              )}
            </button>
            <div className="mt-5 flex items-center justify-center gap-4 text-sm">
              <button
                type="button"
                onClick={handleResend}
                className="font-medium text-brand transition-colors hover:text-brand-light"
              >
                Resend OTP
              </button>
              <span className="text-border">|</span>
              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setOtp(["", "", "", ""]);
                  setError("");
                }}
                className="font-medium text-muted transition-colors hover:text-text"
              >
                Change Number
              </button>
            </div>
          </form>
        </div>
      );

    return (
      <>
        {useSplit ? (
          // Two-panel split card for modal popups: brand image left, form right.
          // The form column reuses the exact same stepContent markup so phone and
          // OTP entry stay visually consistent with the inline variant.
          <div className="relative mx-auto grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_8px_40px_0_rgba(0,44,95,0.10)] sm:grid-cols-2">
            <div className="relative hidden min-h-full sm:block">
              <Image
                src={splitImage!}
                alt={splitImageAlt}
                fill
                sizes="(max-width: 640px) 0px, 320px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/45 to-brand-deep/25" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Modi Hyundai
                </p>
                <h4 className="mt-2 font-display text-xl font-bold leading-snug text-white">
                  Your test drive, your way
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Authorised Hyundai dealer. Factory-trained team, transparent
                  pricing and a test drive at our showroom or your home.
                </p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-white/80">
                  <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> 250,000+ cars delivered</span>
                  <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> 98% satisfaction</span>
                </div>
              </div>
            </div>
            <div className="relative px-6 sm:px-10">{stepContent}</div>
          </div>
        ) : (
          <div className={wrapperClasses}>
            <div className={header}>{stepContent}</div>
          </div>
        )}

        {showConfirm && (
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={cancelChangePhone}
          >
            <div
              className="animate-fade-up w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-lg font-bold text-text">Change Phone Number?</h3>
              <p className="mt-2 text-sm text-muted">
                You&apos;ll need to re-verify your new number. Proceed?
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={cancelChangePhone}
                  className="flex-1 rounded-xl border border-border bg-white py-2.5 text-sm font-semibold text-text transition-colors hover:bg-bg-2"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmChangePhone}
                  className="flex-1 rounded-xl bg-brand py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-light"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {/*
        Prefer the shared verifiedPhone (covers the page-load case where the
        visitor is verified via localStorage but this gate's local phone input
        was never touched). Fall back to the local phone for safety.
      */}
      {children(verifiedPhone || phone, requestChangePhone)}
      {showConfirm && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={cancelChangePhone}
        >
          <div
            className="animate-fade-up w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-lg font-bold text-text">Change Phone Number?</h3>
            <p className="mt-2 text-sm text-muted">
              You&apos;ll need to re-verify your new number. Proceed?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={cancelChangePhone}
                className="flex-1 rounded-xl border border-border bg-white py-2.5 text-sm font-semibold text-text transition-colors hover:bg-bg-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmChangePhone}
                className="flex-1 rounded-xl bg-brand py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-light"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
