"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * Verified phone number shared across every OtpGate on the site.
 *
 * Each `<OtpGate>` used to track its own `isVerified` flag, so verifying on
 * the contact form did nothing for the test drive form, etc. This provider
 * lifts just the verified-phone value into a shared context and persists it
 * to `localStorage`, so a single verification unlocks every form until the
 * visitor clears their data or clicks "Change Number".
 *
 * Transient OTP-entry state (the input value, the typed digits, loading,
 * error, the change-number confirm dialog) stays local to each OtpGate —
 * only the verified result is shared.
 */

const STORAGE_KEY = "modi-hyundai:verified-phone";

type VerifiedPhoneContextType = {
  verifiedPhone: string | null;
  verify: (phone: string) => void;
  clear: () => void;
};

const VerifiedPhoneContext = createContext<VerifiedPhoneContextType>({
  verifiedPhone: null,
  verify: () => {},
  clear: () => {},
});

export function useVerifiedPhone() {
  return useContext(VerifiedPhoneContext);
}

export default function VerifiedPhoneProvider({ children }: { children: ReactNode }) {
  // Start null on both server and first client render so the markup matches;
  // hydrate from localStorage in an effect below. Without this we'd ship a
  // server/client mismatch warning and a flash of the OTP step.
  const [verifiedPhone, setVerifiedPhone] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setVerifiedPhone(stored);
      }
    } catch {
      // localStorage may be unavailable (private mode, cookies disabled) —
      // fall back to in-memory-only verification for this session.
    }
  }, []);

  // Keep every tab in sync: if the verified phone changes in another tab or
  // gets cleared, reflect it here too.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      const next = e.newValue;
      setVerifiedPhone(next || null);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const verify = useCallback((phone: string) => {
    setVerifiedPhone(phone);
    try {
      window.localStorage.setItem(STORAGE_KEY, phone);
    } catch {
      // Ignore write failures — in-memory fallback still works for this tab.
    }
  }, []);

  const clear = useCallback(() => {
    setVerifiedPhone(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore — provider state is already cleared for this tab.
    }
  }, []);

  return (
    <VerifiedPhoneContext.Provider value={{ verifiedPhone, verify, clear }}>
      {children}
    </VerifiedPhoneContext.Provider>
  );
}
