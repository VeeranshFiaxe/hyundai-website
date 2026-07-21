import { Suspense } from "react";
import type { Metadata } from "next";
import TestDriveWizard from "@/components/TestDriveWizard";
import { SITE_URL } from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";

const title = "Book a Hyundai Test Drive in Mumbai | Modi Hyundai";
const description =
  "Book a no-obligation Hyundai test drive in Mumbai, Thane, Vasai, Virar or Wada. Choose your model, preferred time and showroom or doorstep location online.";

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(testDrivePageSchema).replace(/</g, "\\u003c") }}
      />
      <main style={{ marginTop: "96px" }}>
        <section className="bg-white py-20 lg:py-28">
          <div className="container-px mx-auto max-w-[1400px]">
            <Suspense fallback={<div className="mx-auto max-w-3xl rounded-lg border border-border bg-white p-6 shadow sm:p-10 text-center text-muted">Loading...</div>}>
              <TestDriveWizard />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
}
