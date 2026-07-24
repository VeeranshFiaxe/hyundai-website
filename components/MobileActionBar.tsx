"use client";

import { nav } from "@/lib/data";
import { Calendar, Phone } from "./icons";
import { useTestDrive } from "./TestDriveProvider";

// Persistent mobile-only quick-action bar. Desktop already has the
// equivalent via FloatingActions.
export default function MobileActionBar() {
  const { openTestDrive } = useTestDrive();

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-white md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={`tel:${nav.phone.replace(/\s/g, "")}`}
        className="flex flex-col items-center justify-center gap-1 py-2.5 text-brand active:bg-bg-2"
      >
        <Phone className="h-5 w-5" />
        <span className="text-[10px] font-semibold leading-none">Call Us</span>
      </a>
      <button
        type="button"
        onClick={() => openTestDrive()}
        className="flex flex-col items-center justify-center gap-1 border-l border-border py-2.5 text-brand active:bg-bg-2"
      >
        <Calendar className="h-5 w-5" />
        <span className="text-[10px] font-semibold leading-none">Test Drive</span>
      </button>
    </nav>
  );
}
