import Image from "next/image";
import { locations } from "@/lib/data";
import { MapPin, Phone, ArrowRight } from "./icons";
import Reveal from "./Reveal";

export default function Locations() {
  return (
    <section id="locations" className="scroll-mt-24 bg-brand py-14 lg:py-20">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Find a Modi Hyundai Near You
            </h2>
            <p className="mt-2 text-sm text-white/70">
              We&apos;re closer than you think, with showrooms and service
              centres across Mumbai, Thane, Vasai, Virar, and Wada.
            </p>
          </div>
          <a
            href="#test-drive"
            className="group inline-flex shrink-0 items-center gap-2 rounded border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
          >
            View All Locations
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        {/* Location cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((loc, i) => (
            <Reveal key={loc.name} delay={(i % 4) * 80}>
              <article className="group relative flex h-56 flex-col justify-end overflow-hidden rounded-lg">
                <Image
                  src={loc.image}
                  alt={`Modi Hyundai ${loc.name} ${loc.type} in ${loc.city}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative p-5">
                  <span className="mb-1.5 inline-block rounded bg-white/20 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur">
                    {loc.type}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">
                    {loc.name}, {loc.city}
                  </h3>
                  <p className="mt-1 flex items-start gap-1.5 text-xs text-white/80">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/70" />
                    <span>{loc.address}</span>
                  </p>
                  <a
                    href={`tel:${loc.phone.replace(/[^0-9+]/g, "")}`}
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-white/90 transition-colors hover:text-white"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0 text-white/70" />
                    {loc.phone}
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
