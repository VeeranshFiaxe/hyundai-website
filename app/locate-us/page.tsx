import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import LocateUs from "@/components/LocateUs";
import Reveal from "@/components/Reveal";
import { aboutHeroImage, SITE_URL } from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";

const title = "Locate Us | Modi Hyundai Showrooms & Service Centres";
const description =
  "Find Modi Hyundai showrooms and service centres across Mumbai, Thane, Vasai, Virar and Wada. View each branch on the map and open Google Maps directions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/locate-us" },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/locate-us`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const locateUsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/locate-us#webpage`,
      url: `${SITE_URL}/locate-us`,
      name: title,
      description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": DEALER_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Locate Us", item: `${SITE_URL}/locate-us` },
      ],
    },
  ],
};

export default function LocateUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locateUsSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <FloatingActions />
      <main style={{ marginTop: "96px" }}>
        <section className="relative h-[260px] w-full overflow-hidden bg-brand-deep sm:h-[320px]">
          <Image
            src={aboutHeroImage}
            alt="Modi Hyundai locations"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="container-px absolute inset-x-0 bottom-10 mx-auto max-w-[1400px]">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Locate Us
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                Find Your Nearest Modi Hyundai Location
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
                Explore every Modi Hyundai showroom and service centre, preview the
                branch on the map, and get live navigation in Google Maps.
              </p>
            </Reveal>
          </div>
        </section>

        <LocateUs />
      </main>
      <Footer />
    </>
  );
}
