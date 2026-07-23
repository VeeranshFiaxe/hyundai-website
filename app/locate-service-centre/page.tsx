import type { Metadata } from "next";
import Image from "next/image";
import ServiceBooking from "@/components/ServiceBooking";
import ServiceCentres from "@/components/ServiceCentres";
import ServiceContent from "@/components/ServiceContent";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import {
  serviceHeroImage,
  serviceCentres,
  serviceOfferings,
  serviceFaqData,
  SITE_URL,
} from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";

const title = "Authorised Hyundai Service, Genuine Parts & Warranty | Modi Hyundai";
const description =
  "Book authorised Hyundai service online at Modi Hyundai. Genuine Hyundai parts, service packages, 24x7 roadside assistance and extended warranty across Mumbai, Thane, Vasai, Virar and Wada.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Hyundai service Mumbai",
    "Hyundai service centre",
    "genuine Hyundai parts",
    "Hyundai service packages",
    "Hyundai roadside assistance",
    "Hyundai extended warranty",
    "book Hyundai service",
    "authorised Hyundai service Thane",
  ],
  alternates: { canonical: "/locate-service-centre" },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/locate-service-centre`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const servicePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/locate-service-centre#webpage`,
      url: `${SITE_URL}/locate-service-centre`,
      name: title,
      description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": DEALER_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Locate a Service Centre",
          item: `${SITE_URL}/locate-service-centre`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/locate-service-centre#faq`,
      mainEntity: serviceFaqData.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    // Each service offering as an AutoRepair-style service, so the
    // specific offerings (parts, packages, RSA, warranty) are indexable.
    ...serviceOfferings.map((o) => ({
      "@type": "Service",
      name: o.title,
      description: o.intro,
      provider: { "@id": DEALER_ID },
      areaServed: ["Mumbai", "Thane", "Vasai", "Virar", "Wada"].map(
        (c) => ({ "@type": "City", name: c }),
      ),
    })),
    {
      "@type": "ItemList",
      itemListElement: serviceCentres.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "AutomotiveBusiness",
          name: s.name,
          address: s.address,
          telephone: s.phone,
        },
      })),
    },
  ],
};

export default function LocateServiceCentrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageSchema).replace(/</g, "\\u003c") }}
      />
      <main style={{ marginTop: "96px" }}>
        {/* Hero */}
        <section className="relative h-[35vh] min-h-[250px] max-h-[450px] w-full overflow-hidden bg-brand-deep">
          <Image
            src={serviceHeroImage}
            alt="Hyundai service centre bay"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="container-px absolute inset-x-0 bottom-10 mx-auto max-w-[1400px]">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Service
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                Authorised Hyundai Service &amp; Genuine Parts
              </h1>
              <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                Keep your Hyundai performing at its best with genuine parts,
                factory-trained technicians, clear estimates and convenient
                service booking across Mumbai, Thane, Vasai, Virar and Wada.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Service overview (the "Service That Cares" strip, shared with home) */}
        <Services />

        {/* Detailed offerings: genuine parts, packages, RSA, warranty */}
        <ServiceContent />

        {/* Booking form */}
        <section className="bg-white py-20 lg:py-28">
          <ServiceBooking />
        </section>

        {/* Service-specific FAQ */}
        <FAQ
          id="service-faq"
          data={serviceFaqData}
          title="Hyundai service, answered."
          subtitle="From genuine parts to roadside assistance, here are quick answers about servicing your Hyundai with Modi Hyundai."
        />

        {/* Service centre locations */}
        <ServiceCentres />
      </main>
    </>
  );
}
