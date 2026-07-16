import type { Metadata } from "next";
import LocateUs from "@/components/LocateUs";
import { SITE_URL } from "@/lib/data";
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
      <main style={{ marginTop: "72px" }}>
        <LocateUs />
      </main>
    </>
  );
}
