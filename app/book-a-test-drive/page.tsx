import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import TestDriveWizard from "@/components/TestDriveWizard";
import Reveal from "@/components/Reveal";
import { SITE_URL } from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";

const title = "Book a Test Drive | Modi Hyundai";
const description =
  "Book a free Hyundai test drive at your nearest Modi Hyundai showroom, or request one at your home. Pick your car, date and time online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/book-a-test-drive" },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/book-a-test-drive`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const testDrivePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/book-a-test-drive#webpage`,
      url: `${SITE_URL}/book-a-test-drive`,
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
          name: "Book a Test Drive",
          item: `${SITE_URL}/book-a-test-drive`,
        },
      ],
    },
  ],
};

export default function BookTestDrivePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(testDrivePageSchema) }}
      />
      <Navbar />
      <FloatingActions />
      <main style={{ marginTop: "96px" }}>
        <section className="bg-bg-2 py-10 lg:py-14">
          <div className="container-px mx-auto max-w-[1400px]">
            <Reveal className="mx-auto max-w-xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Book a Test Drive
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
                Take Your Favourite Hyundai for a Spin
              </h1>
              <p className="mt-3 text-sm text-muted sm:text-base">
                Pick your car, choose a date and time, and we&apos;ll have it
                ready, at our showroom or your home.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-white py-10 lg:py-16">
          <div className="container-px mx-auto max-w-[1400px]">
            <TestDriveWizard />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
