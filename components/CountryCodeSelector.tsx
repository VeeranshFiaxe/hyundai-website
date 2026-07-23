"use client";

import { useEffect, useRef, useState } from "react";
import { allCountries, topCountries, type Country } from "@/lib/countries";
import { ChevronDown, Search } from "./icons";

type Props = {
  value: Country;
  onChange: (country: Country) => void;
};

export default function CountryCodeSelector({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const filtered = query.trim()
    ? allCountries.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.dialCode.includes(query) ||
          c.code.toLowerCase().includes(query.toLowerCase()),
      )
    : allCountries;

  const visible = topCountries.slice(0, 6);

  const handleSelect = (country: Country) => {
    onChange(country);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-full items-center gap-1 rounded-l-xl border-r border-border bg-bg-3 px-3 py-3.5 text-sm transition-colors hover:bg-bg-3/80"
      >
        <span className="text-base leading-none">{value.flag}</span>
        <span className="font-semibold text-text">{value.dialCode}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-faint transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-xl border border-border bg-white shadow-[0_12px_40px_rgba(0,44,95,0.12)]">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-faint" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code..."
              className="w-full bg-transparent text-sm text-text outline-none placeholder:text-faint"
              autoFocus
            />
          </div>
          <div className="max-h-56 overflow-y-auto py-1">
            {query.trim() ? (
              filtered.length === 0 ? (
                <p className="px-4 py-3 text-sm text-muted">No countries found.</p>
              ) : (
                filtered.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleSelect(c)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-bg-2 ${
                      value.code === c.code ? "bg-brand/5 font-semibold text-brand" : "text-text"
                    }`}
                  >
                    <span className="text-lg leading-none">{c.flag}</span>
                    <span className="flex-1">{c.name}</span>
                    <span className="text-muted">{c.dialCode}</span>
                  </button>
                ))
              )
            ) : (
              <>
                <p className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-faint">
                  Popular
                </p>
                {visible.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleSelect(c)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-bg-2 ${
                      value.code === c.code ? "bg-brand/5 font-semibold text-brand" : "text-text"
                    }`}
                  >
                    <span className="text-lg leading-none">{c.flag}</span>
                    <span className="flex-1">{c.name}</span>
                    <span className="text-muted">{c.dialCode}</span>
                  </button>
                ))}
                <p className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-faint">
                  All Countries
                </p>
                {allCountries.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleSelect(c)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-bg-2 ${
                      value.code === c.code ? "bg-brand/5 font-semibold text-brand" : "text-text"
                    }`}
                  >
                    <span className="text-lg leading-none">{c.flag}</span>
                    <span className="flex-1">{c.name}</span>
                    <span className="text-muted">{c.dialCode}</span>
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
