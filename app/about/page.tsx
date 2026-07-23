import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import { ArrowRight, Check } from "@/components/icons";
import {
  company,
  groupInfo,
  hyundaiIndiaFacts,
  aboutFaqData,
  SITE_URL,
} from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";

const title = "About Modi Hyundai | Authorised Hyundai Dealer in Mumbai";
const description =
  "Meet Modi Hyundai, an authorised Hyundai dealer from the Gautam Modi Group. Explore our customer-first approach to new cars, test drives and service across Mumbai, Thane, Vasai, Virar and Wada.";

const aboutHeroImage = "/images/about/modi-hyundai-team.jpg";
const aboutCultureImage = "/images/about/modi-hyundai-customer-team.png";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Modi Hyundai",
    "Hyundai dealer Mumbai",
    "authorised Hyundai dealership",
    "Hyundai showroom Mumbai",
    "Hyundai service centre Mumbai",
    "Gautam Modi Group",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/about`,
    images: [{ url: aboutHeroImage, width: 1792, height: 1024, alt: "Modi Hyundai showroom experience" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [aboutHeroImage],
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about#webpage`,
      url: `${SITE_URL}/about`,
      name: title,
      description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": DEALER_ID },
      primaryImageOfPage: `${SITE_URL}${aboutHeroImage}`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "About Us",
          item: `${SITE_URL}/about`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/about#faq`,
      mainEntity: aboutFaqData.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

const stats = [
  { value: company.stats.carsSold, label: "New Cars Sold" },
  { value: company.stats.usedCarsSold, label: "Used Cars Sold" },
  { value: company.stats.servicesDone, label: "Services Completed" },
  { value: company.stats.satisfaction, label: "Customer Satisfaction" },
];

function joinWithAnd(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema).replace(/</g, "\\u003c") }}
      />
      <main style={{ marginTop: "96px" }}>
        {/* Hero */}
        <section className="relative min-h-[45vh] w-full overflow-hidden bg-brand-deep sm:min-h-[50vh]">
          <Image
            src={aboutHeroImage}
            alt="Modi Hyundai showroom"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/80 via-brand-deep/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="container-px absolute inset-x-0 bottom-12 mx-auto max-w-[1400px] sm:bottom-16">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Authorised Hyundai Dealer · Mumbai Region
              </p>
              <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Your Hyundai journey, made personal
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base lg:text-lg">
                Authorised Hyundai dealer serving Mumbai, Thane, Vasai, Virar and Wada.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Our story */}
        <section className="bg-white py-16 lg:py-24">
          <div className="container-px mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="slide-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Our Story
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                A trusted Hyundai dealership in Mumbai and Thane
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
                <p>
                  Modi Hyundai is an authorised Hyundai dealership owned and
                  operated by the {groupInfo.name}. From selecting a new Hyundai
                  to booking a test drive and maintaining it for years, our teams
                  make every step clear and comfortable. We serve Mumbai, Thane,
                  Vasai, Virar and Wada, and have sold over{" "}
                  {company.stats.carsSold} new cars with a{" "}
                  {company.stats.satisfaction} customer satisfaction score.
                </p>
                <p>
                  The {groupInfo.name} represents {joinWithAnd(groupInfo.brands)}{" "}
                  across multiple automotive businesses, alongside{" "}
                  {joinWithAnd(groupInfo.ventures.map((v) => v.name))}.{" "}
                  {groupInfo.founded} {groupInfo.growth}
                </p>
              </div>
            </Reveal>
            <Reveal
              variant="slide-left"
              delay={150}
              className="relative min-h-[330px] overflow-hidden rounded-2xl lg:min-h-full"
            >
              <Image
                src={aboutCultureImage}
                alt="Modi Hyundai team welcoming customers at a showroom"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* Stats strip */}
        <section className="bg-bg-2 py-12">
          <div className="container-px mx-auto grid max-w-[1400px] grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 90}
                variant="scale-up"
                className="rounded-xl bg-white px-4 py-5 text-center shadow-[0_4px_24px_rgba(0,44,95,0.06)]"
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

        <section className="bg-white py-16 lg:py-20">
          <div className="container-px mx-auto grid max-w-[1400px] gap-8 rounded-2xl bg-brand-deep px-6 py-9 text-white sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-14 lg:py-12">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Our local commitment</p>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Here for every milestone on the road.</h2>
            </Reveal>
            <Reveal delay={100} className="text-sm leading-relaxed text-white/75 sm:text-base">
              Whether you are buying your first car, upgrading your family SUV or arranging routine service, our showroom and service teams provide practical help close to home. Visit Modi Hyundai across the Mumbai region for new Hyundai cars, test drives, genuine parts and expert service support.
              <div className="mt-5 flex flex-wrap gap-2">
                {["Mumbai", "Thane", "Vasai", "Virar", "Wada"].map((area) => (
                  <span key={area} className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/90">{area}</span>
                ))}
              </div>
            </Reveal>
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
                Hyundai Motor India: &ldquo;{hyundaiIndiaFacts.tagline}&rdquo;
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

        <FAQ
          id="about-faq"
          data={aboutFaqData}
          title="About Modi Hyundai: Frequently Asked Questions"
          subtitle="Quick answers about our ownership, group and track record."
        />

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
    </>
  );
}
