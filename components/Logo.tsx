/* Wordmark lockup for Modi Hyundai. Light theme version. */
export default function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <a href="#home" className={`group flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-brand transition-colors group-hover:bg-brand-light">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <ellipse
            cx="12"
            cy="12"
            rx="11"
            ry="7"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          <path
            d="M7 9c2 3.5 8 3.5 10 0M7 15c2-3.5 8-3.5 10 0"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block font-display text-sm font-extrabold tracking-tight ${dark ? "text-white" : "text-brand"}`}>
          MODI HYUNDAI
        </span>
        <span className={`block text-[9px] font-medium uppercase tracking-[0.28em] ${dark ? "text-white/60" : "text-muted"}`}>
          Customer First
        </span>
      </span>
    </a>
  );
}
