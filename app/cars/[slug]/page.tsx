import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CarDetailClient from "@/components/CarDetailClient";
import { cars, formatINR, SITE_URL } from "@/lib/data";
import { DEALER_ID } from "@/lib/schema";

export function generateStaticParams() {
  return cars.map((c) => ({ slug: c.slug }));
}

function getCar(slug: string) {
  return cars.find((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) return {};

  const displayName =
    "Hyundai " + car.name.charAt(0) + car.name.slice(1).toLowerCase();
  const title = `${displayName}: Price, Specs, Colours & Test Drive | Modi Hyundai`;
  const description = `${car.blurb} Starting at ${formatINR(car.priceINR)}* ex-showroom. Explore colours, specs and book a test drive at Modi Hyundai.`;

  return {
    title,
    description,
    alternates: { canonical: `/cars/${car.slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}/cars/${car.slug}`,
      images: [car.image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) notFound();

  const displayName =
    "Hyundai " + car.name.charAt(0) + car.name.slice(1).toLowerCase();

  const carPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${SITE_URL}/cars/${car.slug}#product`,
        name: displayName,
        description: car.blurb,
        image: car.image,
        brand: { "@type": "Brand", name: "Hyundai" },
        offers: {
          "@type": "Offer",
          price: car.priceINR,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          seller: { "@id": DEALER_ID },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Cars", item: `${SITE_URL}/#cars` },
          {
            "@type": "ListItem",
            position: 3,
            name: displayName,
            item: `${SITE_URL}/cars/${car.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carPageSchema) }}
      />
      <Navbar />
      <FloatingActions />
      <main style={{ marginTop: "96px" }}>
        <CarDetailClient car={car} />
      </main>
      <Footer />
    </>
  );
}
