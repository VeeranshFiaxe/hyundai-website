/* ============================================================
   JSON-LD structured data for AEO / rich results.
   Builds a single @graph describing the dealership, its cars,
   and the FAQ so answer engines (Google AI Overviews, ChatGPT,
   Perplexity, Gemini) can extract accurate, citable facts.

   Deliberately NOT emitted: AggregateRating / Review schema, because
   the on-page reviews are demo placeholders. Add it only once real,
   verifiable review data exists.
   ============================================================ */
import { SITE_URL, company, cars, faqData, locations } from "./data";

export const DEALER_ID = `${SITE_URL}/#dealer`;

export function buildJsonLd() {
  const dealer = {
    "@type": "AutoDealer",
    "@id": DEALER_ID,
    name: company.name,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/opengraph-image`,
    telephone: company.phoneE164,
    email: company.email,
    priceRange: "₹₹",
    brand: { "@type": "Brand", name: "Hyundai" },
    address: {
      "@type": "PostalAddress",
      streetAddress: company.primaryAddress.street,
      addressLocality: company.primaryAddress.locality,
      addressRegion: company.primaryAddress.region,
      postalCode: company.primaryAddress.postalCode,
      addressCountry: company.primaryAddress.country,
    },
    areaServed: company.areasServed.map((a) => ({ "@type": "City", name: a })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: company.hoursSpec.opens,
      closes: company.hoursSpec.closes,
    },
    sameAs: Object.values(company.social),
    // Each physical outlet as a sub-department for local relevance.
    department: locations.map((loc) => ({
      "@type": loc.type === "Showroom" ? "AutoDealer" : "AutoRepair",
      name: `Modi Hyundai ${loc.name} ${loc.type}`,
      telephone: loc.phone.replace(/[^0-9+]/g, ""),
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.address,
        addressLocality: loc.city,
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    })),
  };

  const products = cars.map((car) => ({
    "@type": "Car",
    name: `Hyundai ${car.name}`,
    image: car.image,
    description: car.blurb,
    brand: { "@type": "Brand", name: "Hyundai" },
    vehicleConfiguration: car.type,
    fuelType: car.fuel.replace(/\s·\s/g, ", "),
    vehicleEngine: { "@type": "EngineSpecification", name: car.engine },
    vehicleTransmission: car.transmission,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: car.priceINR,
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": DEALER_ID },
    },
  }));

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqData.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${company.name} | Authorised Hyundai Dealer`,
    publisher: { "@id": DEALER_ID },
    inLanguage: "en-IN",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [dealer, website, faqPage, ...products],
  };
}
