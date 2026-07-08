"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { nav } from "@/lib/data";
import { Phone, Menu, X } from "./icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_0_#e2e6ec,0_4px_16px_0_rgba(0,44,95,0.07)]" : "shadow-[0_1px_0_0_#e2e6ec]"
      }`}
    >
      {/* Top utility bar */}
      <div className="hidden border-b border-border bg-bg-2 lg:block">
        <div className="container-px mx-auto flex h-9 max-w-[1400px] items-center justify-end gap-6 text-xs text-muted">
          <a
            href={`tel:${nav.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 transition-colors hover:text-brand"
          >
            <Phone className="h-3.5 w-3.5 text-brand" />
            <span className="font-medium">Call Us: {nav.phone}</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container-px mx-auto flex h-[60px] max-w-[1400px] items-center justify-between">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {nav.links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="relative rounded px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-bg-2 hover:text-brand"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <Link
            href="/#test-drive"
            className="hidden rounded bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-light sm:inline-block"
          >
            Book a Test Drive
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-9 w-9 place-items-center rounded border border-border bg-bg-2 text-text lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-1 border-l border-border bg-white p-6 shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <Logo />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded border border-border bg-bg-2 text-text"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {nav.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded px-4 py-3 text-base font-medium text-text transition-colors hover:bg-bg-2 hover:text-brand"
            >
              {l.label}
            </Link>
          ))}

          <Link
            href="/#test-drive"
            onClick={() => setOpen(false)}
            className="mt-4 rounded bg-brand px-5 py-3.5 text-center text-sm font-semibold text-white"
          >
            Book a Test Drive
          </Link>
          <a
            href={`tel:${nav.phone.replace(/\s/g, "")}`}
            className="mt-2 flex items-center justify-center gap-2 rounded border border-border px-5 py-3.5 text-sm font-semibold text-brand"
          >
            <Phone className="h-4 w-4" /> {nav.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
