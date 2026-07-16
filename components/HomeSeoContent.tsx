import Link from "next/link";
import { company, cars } from "@/lib/data";
import Reveal from "./Reveal";

/* ============================================================
   Homepage SEO & AEO content blocks.

   These sections give the homepage meaningful, crawlable copy so
   it ranks for dealer-level and model-level queries (e.g. "Hyundai
   dealer in Mumbai", "Hyundai Creta price Thane"). Content is
   written to be useful to human buyers and extractable by answer
   engines - short definitional sentences, clear lists and an FAQ
   close. Layout stays clean and on-brand: light surfaces, the
   navy accent and the existing card / eyebrow styling.
   ============================================================ */

const lineages = [
  {
    name: "SUVs",
    blurb:
      "Compact, mid-size and three-row SUVs covering every budget, from the city-friendly Exter to the three-row Alcazar and the all-electric Creta Electric.",
    models: ["EXTER", "VENUE", "CRETA", "ALCAZAR", "CRETA ELECTRIC"],
    href: "/cars",
  },
  {
    name: "Sedans",
    blurb:
      "Affordable and premium sedans with segment-leading boot space, turbo-petrol options and Level 2 ADAS on the Verna.",
    models: ["VERNA", "AURA"],
    href: "/cars",
  },
  {
    name: "Hatchbacks",
    blurb:
      "Feature-rich hatchbacks ideal for daily city commutes, with available factory-fitted CNG for low running costs and premium N Line performance variants.",
    models: ["GRAND I10 NIOS", "I20", "I20 N LINE"],
    href: "/cars",
  },
  {
    name: "Electric",
    blurb:
      "Hyundai's electric range combines ultra-fast charging, Vehicle-to-Load (V2L) and long wheelbases for silent, spacious everyday driving.",
    models: ["IONIQ 5", "CRETA ELECTRIC"],
    href: "/cars",
  },
];

const buyingSteps = [
  {
    step: "01",
    title: "Shortlist your Hyundai",
    text: "Browse the full lineup by body style, fuel type and budget. Compare variants, colours, mileage and on-road pricing for every model in one place.",
  },
  {
    step: "02",
    title: "Book a test drive",
    text: "Pick a date and your nearest Modi Hyundai outlet across Mumbai, Thane, Vasai, Virar or Wada, or request a home test drive at no obligation.",
  },
  {
    step: "03",
    title: "Finalise finance & exchange",
    text: "Get a transparent quote with flexible EMI plans from leading banks, plus instant exchange value on your existing car through Hyundai Promise.",
  },
  {
    step: "04",
    title: "Delivery & aftercare",
    text: "Take delivery of your new Hyundai, then rely on factory-trained technicians, genuine parts and free pickup-and-drop service for the years ahead.",
  },
];

const servicePoints = [
  "Periodic maintenance on the manufacturer-recommended schedule, done right the first time.",
  "Only genuine, warranty-backed Hyundai parts, never aftermarket substitutes.",
  "Free pickup and drop for every service booking across the Mumbai region.",
  "24x7 roadside assistance and extendable warranty plans for total peace of mind.",
];

export default function HomeSeoContent() {
  return (
    <>
      {/* Lineup by category */}
      <section className="bg-bg-2 py-14 lg:py-20">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="max-w-2xl">
            <span className="eyebrow mb-3 block">The Hyundai Lineup</span>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl lg:text-[2.25rem]">
              New Hyundai cars for every driver, family and budget
            </h2>
            <p className="mt-3 text-base text-muted">
              As an authorised Hyundai Motor India dealership, Modi Hyundai
              stocks the complete Hyundai range: compact SUVs, mid-size SUVs,
              a three-row family SUV, sedans, hatchbacks and fully electric
              vehicles. Explore each category below or compare{" "}
              <Link
                href="/cars"
                className="font-semibold text-brand underline underline-offset-4 hover:text-brand-light"
              >
                all Hyundai models
              </Link>{" "}
              side by side.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {lineages.map((group, i) => (
              <Reveal key={group.name} delay={i * 90} variant="fade-up">
                <Link
                  href={group.href}
                  className="group flex h-full flex-col rounded-lg border border-border bg-white p-6 shadow-[0_2px_12px_0_rgba(0,44,95,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(0,44,95,0.12)]"
                >
                  <h3 className="font-display text-lg font-bold text-text">
                    {group.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {group.blurb}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand">
                    {group.models.join(" · ")}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why buy from an authorised dealer */}
      <section className="bg-white py-14 lg:py-20">
        <div className="container-px mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal variant="slide-right">
            <span className="eyebrow mb-3 block">Why Modi Hyundai</span>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl lg:text-[2.25rem]">
              Your authorised Hyundai dealer across the Mumbai and Thane region
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              <p>
                Modi Hyundai is an authorised Hyundai Motor India dealership
                serving Mumbai, Thane, Vasai, Virar and Wada. Every new car,
                genuine part and accessory we supply is sourced directly from
                Hyundai, so your purchase is backed by the full manufacturer
                warranty and nationwide service network.
              </p>
              <p>
                With over 250,000 new cars and 200,000 pre-owned cars delivered,
                more than 550,000 services completed and a 98% customer
                satisfaction score, our team brings decades of combined Hyundai
                experience to every test drive, finance plan and service
                booking.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/book-a-test-drive"
                className="btn-primary"
              >
                Book a Test Drive
              </Link>
              <Link href="/about" className="btn-outline">
                About Modi Hyundai
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} variant="slide-left">
            <dl className="grid grid-cols-2 gap-4">
              {[
                ["250,000+", "New cars delivered"],
                ["200,000+", "Pre-owned cars sold"],
                ["550,000+", "Services completed"],
                ["98%", "Customer satisfaction"],
              ].map(([stat, label]) => (
                <div
                  key={label}
                  className="rounded-lg border border-border bg-bg-2 p-6 text-center"
                >
                  <dt className="font-display text-3xl font-bold text-brand sm:text-4xl">
                    {stat}
                  </dt>
                  <dd className="mt-1 text-xs font-medium text-muted sm:text-sm">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* How buying works */}
      <section className="bg-bg-2 py-14 lg:py-20">
        <div className="container-px mx-auto max-w-[1400px]">
          <Reveal className="max-w-2xl">
            <span className="eyebrow mb-3 block">How It Works</span>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl lg:text-[2.25rem]">
              Buying a Hyundai in four simple steps
            </h2>
            <p className="mt-3 text-base text-muted">
              From shortlisting to delivery and aftercare, we make buying and
              owning a Hyundai straightforward and transparent: no pressure,
              no hidden charges.
            </p>
          </Reveal>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {buyingSteps.map((item, i) => (
              <Reveal as="li" key={item.step} delay={i * 90} variant="fade-up">
                <div className="flex h-full flex-col rounded-lg border border-border bg-white p-6">
                  <span className="font-display text-3xl font-bold text-brand/20">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Authorised service */}
      <section className="bg-white py-14 lg:py-20">
        <div className="container-px mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal variant="slide-right">
            <span className="eyebrow mb-3 block">Authorised Service</span>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl lg:text-[2.25rem]">
              Genuine Hyundai service, close to home
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Keep your Hyundai performing like new with factory-trained
              technicians, genuine parts and manufacturer-approved service
              schedules. Book online and we will collect your car for service
              and drop it back, at no extra cost, anywhere in our service
              area.
            </p>
            <div className="mt-6">
              <Link href="/locate-service-centre" className="btn-primary">
                Book a Service
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} variant="slide-left">
            <ul className="grid gap-3 sm:grid-cols-2">
              {servicePoints.map((point) => (
                <li
                  key={point}
                  className="rounded-lg border border-border bg-bg-2 p-5 text-sm leading-relaxed text-text"
                >
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* AEO definitional paragraph + popular models */}
      <section className="bg-bg-2 py-14 lg:py-20">
        <div className="container-px mx-auto max-w-[1100px]">
          <Reveal>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl">
              Frequently compared Hyundai models at Modi Hyundai
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              <p>
                The <strong className="text-text">Hyundai Creta</strong> is
                India&apos;s best-selling mid-size SUV, prized for its panoramic
                sunroof, Level 2 ADAS and a choice of turbo-petrol, naturally
                aspirated petrol and diesel engines. The{" "}
                <strong className="text-text">Hyundai Exter</strong> brings an
                SUV stance to the compact segment with a factory CNG option,
                while the <strong className="text-text">Hyundai Venue</strong>{" "}
                adds turbo-petrol and diesel choices in a city-friendly footprint.
              </p>
              <p>
                Growing families often choose the three-row{" "}
                <strong className="text-text">Hyundai Alcazar</strong> for its
                captain-chair or bench second row, while sedan buyers gravitate
                to the <strong className="text-text">Hyundai Verna</strong> for
                its large boot and turbo-petrol performance. For electric
                buyers, the <strong className="text-text">Hyundai IONIQ 5</strong>{" "}
                and <strong className="text-text">Hyundai Creta Electric</strong>{" "}
                offer fast charging and Vehicle-to-Load capability.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 flex flex-wrap gap-2">
            {cars
              .filter((c) =>
                ["CRETA", "VENUE", "EXTER", "ALCAZAR", "VERNA", "IONIQ 5", "CRETA ELECTRIC"].includes(
                  c.name,
                ),
              )
              .map((car) => (
                <Link
                  key={car.slug}
                  href={`/cars/${car.slug}`}
                  className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-text transition-colors hover:border-brand hover:text-brand"
                >
                  Hyundai {car.name.charAt(0) + car.name.slice(1).toLowerCase()}
                </Link>
              ))}
          </div>

          <Reveal>
            <p className="mt-10 border-t border-border pt-8 text-sm leading-relaxed text-muted">
              <strong className="text-text">Areas we serve:</strong>{" "}
              {company.areasServed.join(", ")} and the wider Mumbai Metropolitan
              Region. Visit any of our showrooms and service centres, or call{" "}
              <a
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                className="font-semibold text-brand underline underline-offset-4 hover:text-brand-light"
              >
                {company.phone}
              </a>{" "}
              to speak with our sales and service teams. Showrooms are open{" "}
              {company.hours}.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
