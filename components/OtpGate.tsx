"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, Phone, Shield } from "./icons";
import { useVerifiedPhone } from "./VerifiedPhoneProvider";
import { submitLead } from "@/lib/submitLead";

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

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length !== 10 || !/^[6-9]\d{9}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      setTimeout(() => otpRefs.current[0]?.focus(), 200);
    }, 800);
  };

  const verifyOtp = (code: string) => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      if (code === "0000") {
        // Commit to the shared provider so every form on the site sees this
        // phone as verified (and persists it across refreshes).
        verify(phone);
        if (onVerified) onVerified(phone);

        // Fire-and-forget phone-capture: send the verified number immediately
        // so we have it even if the user abandons the rest of the form.
        if (formSource) {
          submitLead("phone_capture", {
            phone_number: phone,
            form_source: formSource,
          }).catch(() => {});
        }
      } else {
        setError("Invalid OTP. For demo, use 0000.");
        setOtp(["", "", "", ""]);
        otpRefs.current[0]?.focus();
      }
    }, 600);
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      otpRefs.current[0]?.focus();
    }, 800);
  };

  const requestChangePhone = () => {
    setShowConfirm(true);
  };

  const confirmChangePhone = () => {
    setShowConfirm(false);
    // Clear the shared verification so every form reverts to the phone step —
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

  if (!isVerified) {
    return (
      <>
        <div className={wrapperClasses}>
          <div className={header}>
            {step === "phone" ? (
              <div key="phone-step" className="animate-fade-up py-8 text-center sm:py-10">
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-brand/10">
                  <Phone className="h-7 w-7 text-brand" />
                </div>
                <h3 className="font-display text-xl font-bold text-text">{title}</h3>
                <p className="mt-2 text-sm text-muted">{subtitle}</p>
                <form onSubmit={handlePhoneSubmit} className="mt-8">
                  <div className="relative flex items-center rounded-xl border-2 border-border bg-bg-2 transition-all focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
                    <span className="flex h-full items-center rounded-l-xl border-r border-border bg-bg-3 px-4 py-3.5 text-sm font-semibold text-text">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value.replace(/\D/g, ""));
                        setError("");
                      }}
                      maxLength={10}
                      placeholder="9876543210"
                      className="w-full rounded-r-xl bg-transparent px-4 py-3.5 text-sm text-text outline-none placeholder:text-faint"
                      autoFocus
                    />
                  </div>
                  {error && (
                    <p className="mt-3 text-sm font-medium text-red-500">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full rounded-xl bg-brand py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-light hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
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
                  <span className="font-semibold text-text">+91 {phone}</span>
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
            )}
          </div>
        </div>

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
