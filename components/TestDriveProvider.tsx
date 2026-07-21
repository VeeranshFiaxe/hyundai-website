"use client";

import { createContext, Suspense, useCallback, useContext, useState, type ReactNode } from "react";
import TestDriveWizard from "./TestDriveWizard";
import { X } from "./icons";

type TestDriveContextType = {
  openTestDrive: (carSlug?: string) => void;
};

const TestDriveContext = createContext<TestDriveContextType>({
  openTestDrive: () => {},
});

export function useTestDrive() {
  return useContext(TestDriveContext);
}

export default function TestDriveProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [carSlug, setCarSlug] = useState<string | undefined>();
  // While the OTP gate is up the content is narrow; widen once verified so the
  // car grid has room to breathe.
  const [verifying, setVerifying] = useState(true);

  const openTestDrive = useCallback((slug?: string) => {
    setCarSlug(slug);
    setVerifying(true);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <TestDriveContext.Provider value={{ openTestDrive }}>
      {children}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-12 backdrop-blur-sm">
          <div
            className={`relative w-full overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_0_rgba(0,0,0,0.25)] transition-[max-width] duration-300 ease-out ${
              verifying ? "max-w-md" : "max-w-3xl"
            }`}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-xl bg-black/10 text-text backdrop-blur transition-all hover:bg-black/20 hover:text-text"
            >
              <X className="h-5 w-5" />
            </button>
            <Suspense fallback={<div className="p-10 text-center text-muted">Loading...</div>}>
              <TestDriveWizard initialCarSlug={carSlug} onBack={close} onVerificationChange={setVerifying} />
            </Suspense>
          </div>
        </div>
      )}
    </TestDriveContext.Provider>
  );
}
