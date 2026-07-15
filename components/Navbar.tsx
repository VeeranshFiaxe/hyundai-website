"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { nav } from "@/lib/data";
import { Phone, Menu, X } from "./icons";

// Route part of an href, ignoring any hash (e.g. "/#home" -> "/", "/#blogs" -> "/")
function routeOf(href: string) {
  return href.split("#")[0];
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // First matching link wins, so on "/" Home is marked active instead of Blogs.
  const activeHref = nav.links.find((l) => {
    const route = routeOf(l.href);
    if (route === "/") return pathname === "/";
    return pathname === route || pathname.startsWith(route + "/");
  })?.href;

  // Single sliding underline marker. Measured from the active link's DOM box.
  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [marker, setMarker] = useState<{ left: number; width: number; visible: boolean }>({ left: 0, width: 0, visible: false });

  const positionMarker = useCallback(() => {
    const list = listRef.current;
    if (!list || !activeHref) {
      setMarker((m) => ({ ...m, visible: false }));
      return;
    }
    const link = linkRefs.current[activeHref];
    if (!link) {
      setMarker((m) => ({ ...m, visible: false }));
      return;
    }
    const listRect = list.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    // Marker is 60% of the link width, centered under it.
    const width = linkRect.width * 0.6;
    setMarker({
      left: linkRect.left - listRect.left + (linkRect.width - width) / 2,
      width,
      visible: true,
    });
  }, [activeHref]);

  useEffect(() => {
    positionMarker();
  }, [positionMarker]);

  useEffect(() => {
    // Reposition on viewport changes (fonts loading, resize, orientation).
    window.addEventListener("resize", positionMarker);
    window.addEventListener("orientationchange", positionMarker);
    return () => {
      window.removeEventListener("resize", positionMarker);
      window.removeEventListener("orientationchange", positionMarker);
    };
  }, [positionMarker]);

  // Re-measure once webfonts have settled the link widths.
  useEffect(() => {
    if (!document.fonts?.ready) return;
    document.fonts.ready.then(() => positionMarker());
  }, [positionMarker]);

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
      {/* Main nav */}
      <nav className="container-px mx-auto flex h-[60px] max-w-[1400px] items-center justify-between">
        <Logo />

        {/* Desktop links */}
        <ul ref={listRef} className="relative hidden items-center gap-0.5 lg:flex">
          {/* Sliding active marker — single element that moves between links */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 z-10 h-px rounded-full bg-brand transition-all duration-300 ease-out"
            style={{
              left: marker.left,
              width: marker.width,
              opacity: marker.visible ? 1 : 0,
            }}
          />
          {nav.links.map((l) => {
            const active = l.href === activeHref;
            return (
              <li key={l.href}>
                <Link
                  ref={(el) => { linkRefs.current[l.href] = el; }}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded px-4 py-2 text-sm font-medium transition-colors hover:bg-bg-2 hover:text-brand ${
                    active ? "text-brand" : "text-muted"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <Link
            href="/book-a-test-drive"
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

          {nav.links.map((l) => {
            const active = l.href === activeHref;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`relative rounded-l px-4 py-3 text-base font-medium transition-colors hover:bg-bg-2 hover:text-brand ${
                  active ? "bg-bg-2 text-brand" : "text-text"
                }`}
              >
                {l.label}
                {/* Active marker: a brand-coloured accent on the left edge */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-2 left-0 w-0.5 origin-top rounded-full bg-brand transition-transform duration-300 ease-out ${
                    active ? "scale-y-100" : "scale-y-0"
                  }`}
                />
              </Link>
            );
          })}

          <Link
            href="/book-a-test-drive"
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
