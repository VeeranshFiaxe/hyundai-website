import type { Metadata } from "next";
import HyundaiPromise from "@/components/HyundaiPromise";
import { SITE_URL } from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";

const title = "Hyundai Promise | Buy or Sell a Pre-Owned Car";
const description =
  "Explore Hyundai Promise at Modi Hyundai. Enquire to buy a pre-owned car or sell your current one, and our dealership team will reach out to assist you.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/hyundai-promise" },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${SITE_URL}/hyundai-promise`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const promisePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/hyundai-promise#webpage`,
      url: `${SITE_URL}/hyundai-promise`,
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
          name: "Hyundai Promise",
          item: `${SITE_URL}/hyundai-promise`,
        },
      ],
    },
  ],
};

export default function HyundaiPromisePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(promisePageSchema).replace(/</g, "\\u003c") }}
      />
      <main style={{ marginTop: "96px" }}>
        <HyundaiPromise />
      </main>
    </>
  );
}
