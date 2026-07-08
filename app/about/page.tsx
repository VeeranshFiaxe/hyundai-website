import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import Reveal from "@/components/Reveal";
import { ArrowRight, Check } from "@/components/icons";
import {
  company,
  groupInfo,
  hyundaiIndiaFacts,
  aboutHeroImage,
  aboutCultureImage,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Modi Hyundai is part of the Gautam Modi Group, an authorised Hyundai dealership serving Mumbai and Pune with 250,000+ cars sold and 98% customer satisfaction.",
  alternates: { canonical: "/about" },
};

const stats = [
  { value: company.stats.carsSold, label: "New Cars Sold" },
  { value: company.stats.usedCarsSold, label: "Used Cars Sold" },
  { value: company.stats.servicesDone, label: "Services Completed" },
  { value: company.stats.satisfaction, label: "Customer Satisfaction" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <FloatingActions />
      <main style={{ marginTop: "96px" }}>
        {/* Hero */}
        <section className="relative h-[320px] w-full overflow-hidden bg-brand-deep sm:h-[380px]">
          <Image
            src={aboutHeroImage}
            alt="Modi Hyundai showroom"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="container-px absolute inset-x-0 bottom-10 mx-auto max-w-[1400px]">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Who We Are
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                About Modi Hyundai
              </h1>
              <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                An authorised Hyundai dealership from the Gautam Modi Group,
                serving Mumbai and Pune with genuine cars, honest service and
                a customer-first promise.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Our story */}
        <section className="bg-white py-14 lg:py-20">
          <div className="container-px mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="slide-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Our Story
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                Part of the Gautam Modi Group
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
                <p>
                  Modi Hyundai is an authorised Hyundai dealership operating
                  showrooms and service centres across Malad, Kanjurmarg,
                  Kalyan, Ambernath, Shahapur and Pune. We&apos;ve sold{" "}
                  {company.stats.carsSold} new cars and completed{" "}
                  {company.stats.servicesDone} services, backed by a{" "}
                  {company.stats.satisfaction} customer satisfaction score.
                </p>
                <p>
                  We&apos;re part of the {groupInfo.name}, an automotive
                  business group representing {groupInfo.brands.join(", ")} —
                  and running {groupInfo.ventures.map((v) => v.name).join(" and ")}{" "}
                  alongside them. {groupInfo.founded}{" "}
                  {groupInfo.growth}
                </p>
              </div>
            </Reveal>
            <Reveal
              variant="slide-left"
              delay={150}
              className="relative min-h-[260px] overflow-hidden rounded-lg lg:min-h-full"
            >
              <Image
                src={aboutCultureImage}
                alt="Modi Hyundai team culture"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* Stats strip */}
        <section className="bg-bg-2 py-10">
          <div className="container-px mx-auto grid max-w-[1400px] grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 90}
                variant="scale-up"
                className="text-center"
              >
                <p className="font-display text-2xl font-bold text-brand sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-medium text-muted sm:text-sm">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Core values */}
        <section className="bg-white py-14 lg:py-20">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal className="mx-auto max-w-xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                What Drives Us
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                Our Core Values
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {groupInfo.values.map((v, i) => (
                <Reveal
                  key={v.title}
                  delay={i * 100}
                  variant="scale-up"
                  className="rounded-lg border border-border bg-white p-6 text-center transition-[transform,box-shadow] duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_0_rgba(0,44,95,0.12)]"
                >
                  <h3 className="text-sm font-semibold text-text">{v.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {v.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Hyundai Motor India credibility */}
        <section className="bg-brand-deep py-14 text-white lg:py-20">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                Backed By
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                Hyundai Motor India — &ldquo;{hyundaiIndiaFacts.tagline}&rdquo;
              </h2>
              <p className="mt-3 text-sm text-white/70 sm:text-base">
                Founded in {hyundaiIndiaFacts.founded}, Hyundai Motor India is
                the country&apos;s leading automobile manufacturer, with{" "}
                {hyundaiIndiaFacts.network} {hyundaiIndiaFacts.milestone}
              </p>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {hyundaiIndiaFacts.csr.map((c, i) => (
                <Reveal
                  key={c.title}
                  delay={i * 100}
                  variant="fade-up"
                  className="rounded-lg border border-white/15 bg-white/5 p-6"
                >
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-white/70">
                        {c.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-14 lg:py-16">
          <Reveal className="container-px mx-auto flex max-w-[1400px] flex-col items-center gap-4 text-center">
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              Ready to visit a showroom?
            </h2>
            <p className="max-w-md text-sm text-muted">
              Book a free test drive or find your nearest Modi Hyundai
              showroom and service centre.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/#test-drive"
                className="group inline-flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-light"
              >
                Book a Test Drive
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/#locations"
                className="inline-flex items-center gap-2 rounded border border-brand px-6 py-3 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-white"
              >
                Find a Showroom
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
