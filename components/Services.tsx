import { services, accentCycle } from "@/lib/data";
import { iconMap, ArrowRight, type IconName } from "./icons";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="service" className="scroll-mt-24 bg-bg-2 py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              Service That Cares
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              From routine maintenance to roadside help, our factory-trained team
              keeps your Hyundai running the way it should, with genuine parts,
              transparent pricing, and service centres across Mumbai and Pune.
            </p>
          </div>
          <a
            href="#test-drive"
            className="group inline-flex shrink-0 items-center gap-2 rounded border border-brand px-5 py-2.5 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-white"
          >
            Book a Service Appointment
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        {/* Icon strip */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon as IconName];
            const accent = accentCycle[i % accentCycle.length];
            return (
              <Reveal
                key={s.title}
                delay={i * 70}
                variant="scale-up"
                className="group flex flex-col items-center gap-3 rounded-lg border border-border bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_0_rgba(0,44,95,0.12)]"
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full transition-colors"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`,
                    color: accent,
                  }}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-sm font-semibold leading-snug text-text">{s.title}</h3>
                <p className="text-xs leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
