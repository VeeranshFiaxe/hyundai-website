/* ============================================================
   Content model for the Modi Hyundai landing page.
   Car lineup, pricing, engine and transmission specs are sourced
   directly from the official Hyundai India site (hyundai.com/in/en)
   so the dealership page matches the parent brand's own data.
   NAP/location facts come from modihyundai.co.in.

   Every image is served locally from /public — see lib/image-manifest.ts
   for the single source of truth and scripts/fetch-car-images.mjs for
   how the assets were downloaded from hyundai.com / AeplCDN / Unsplash.
   ============================================================ */

import {
  banners,
  bannersMobile,
  bannersTablet,
  cutouts,
  coloursBySlug,
  blogImages,
  avatars,
  stockHeroes,
  blogHero,
  testDriveImage as testDriveImageLocal,
} from "./image-manifest";

/* Indian numbering (lakh/crore) grouping, e.g. 1090700 -> "10,90,700". */
export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* ---- Canonical business identity (NAP), used everywhere + in schema ---- */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.modihyundai.co.in";

export const company = {
  name: "Modi Hyundai",
  tagline: "Customer First",
  phone: "98877 33000",
  phoneE164: "+919887733000",
  // NOTE: verify before launch - not published on the source site.
  email: "contact@modihyundai.co.in",
  primaryAddress: {
    street: "New Link Road, Malad West",
    locality: "Mumbai",
    region: "Maharashtra",
    postalCode: "400064",
    country: "IN",
  },
  // NOTE: confirm exact opening hours with the dealership before launch.
  hours: "Mon to Sun, 9:00 AM to 8:00 PM",
  hoursSpec: { days: "Mo-Su", opens: "09:00", closes: "20:00" },
  areasServed: ["Mumbai", "Thane", "Vasai", "Virar", "Wada"],
  stats: {
    carsSold: "250,000+",
    usedCarsSold: "200,000+",
    satisfaction: "98%",
    servicesDone: "550,000+",
  },
  social: {
    facebook: "https://www.facebook.com/ModiHyundaiMumbai/",
    instagram: "https://www.instagram.com/modihyundaimumbai/",
    x: "https://x.com/ModiHyundai",
    youtube: "https://www.youtube.com/channel/UCz2_GnMMUYePExHZZ3UpLdA",
    linkedin: "https://in.linkedin.com/company/modi-hyundai",
  },
};

export const nav = {
  phone: company.phone,
  location: "Mumbai",
  links: [
    { label: "Home", href: "/#home" },
    { label: "About Us", href: "/about" },
    { label: "Find A Car", href: "/cars" },
    { label: "Service", href: "/locate-service-centre" },
    { label: "Hyundai Promise", href: "/hyundai-promise" },
    { label: "Locate Us", href: "/locate-us" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact Us", href: "/contact-us" },
  ],
};

/* ---- About Us page content ----
   Dealership facts sourced from modihyundai.co.in. Parent group facts
   (values, brand portfolio, workforce/sales growth) sourced from
   gautammodigroup.com. Hyundai Motor India brand facts sourced from
   hyundai.com/in/en's own "About Us" / brand-story pages. */
export const aboutHeroImage = stockHeroes.about;
/* "My Hyundai My Memories" customer-campaign banner (verified live on
   hyundai.com). Moved from the home hero slideshow to the /blogs hero,
   where it fits the journal/customer-stories theme. Sits behind a dark
   gradient overlay so the white hero copy stays legible. */
export const blogHeroImage = blogHero;
export const aboutCultureImage = stockHeroes.aboutCulture;

export const groupInfo = {
  name: "Gautam Modi Group",
  url: "https://gautammodigroup.com",
  founded:
    "Grown over decades from a 100-member team to a 3,500+ strong organisation.",
  growth:
    "Monthly sales have scaled from over 500 to more than 1,500 units, reflecting sustained market leadership and customer trust.",
  brands: ["Hyundai", "Audi", "Mahindra", "Kia", "MG"],
  ventures: [
    { name: "Krishiv Insurance", text: "Insurance solutions for vehicle owners." },
    { name: "ThinkKarz", text: "The group's premium pre-owned vehicle brand." },
  ],
  values: [
    {
      title: "Exploring New Horizons",
      text: "Embracing new opportunities for growth and innovation.",
    },
    {
      title: "Nurturing Talents",
      text: "Empowering and developing our people to help them excel.",
    },
    {
      title: "Process with Tenacity",
      text: "Converting strategy into consistent, effective action.",
    },
    {
      title: "Grandiose Experience",
      text: "Creating meaningful experiences through recognition and service.",
    },
  ],
  headquarters:
    "Neo Vikram Building, Andheri Link Rd, Sahakar Nagar, Azad Nagar, Andheri West, Mumbai, Maharashtra 400053",
};

export const hyundaiIndiaFacts = {
  tagline: "Progress for Humanity",
  founded: 1996,
  plant: "Manufacturing plant near Chennai, Kancheepuram District, Tamil Nadu, with a new facility under commissioning in Pune, Maharashtra.",
  network: "1,366 sales points and 1,550 service points across India.",
  milestone: "Celebrating 30 years of Hyundai in India, with 9 million+ customer journeys and counting.",
  csr: [
    {
      title: "Samarth by Hyundai",
      text: "Supports para-athletes and skill-development programmes across India.",
    },
    {
      title: "Hyundai Motor India Foundation",
      text: "Backs community projects and record-breaking expeditions nationwide.",
    },
  ],
};

export const aboutFaqData = [
  {
    question: "Who owns Modi Hyundai?",
    answer:
      "Modi Hyundai is owned and operated by the Gautam Modi Group, an automotive business group that also represents Audi, Mahindra, Kia and MG in India.",
  },
  {
    question: "Is Modi Hyundai an authorised Hyundai dealership?",
    answer:
      "Yes. Modi Hyundai is an authorised Hyundai Motor India dealership, with showrooms and service centres across Mumbai, Thane, Vasai, Virar and Wada.",
  },
  {
    question: "How many cars has Modi Hyundai sold?",
    answer:
      "Modi Hyundai has sold over 250,000 new cars and 200,000 used cars, and completed more than 550,000 vehicle services, with a 98% customer satisfaction score.",
  },
  {
    question: "Which cities does Modi Hyundai serve?",
    answer:
      "Modi Hyundai serves Mumbai, Thane, Vasai, Virar and Wada, with dedicated showrooms and service centres across the Mumbai region.",
  },
  {
    question: "When was Hyundai Motor India founded?",
    answer:
      "Hyundai Motor India was founded in 1996. It now operates over 1,366 sales points and 1,550 service points across the country, marking 30 years in India.",
  },
];

export type Slide = {
  model: string;
  badge: string;
  headline: string;
  sub: string;
  price: string;
  image: string;
  /** Art-directed crop for portrait phones (<=767px), matching hyundai.com's own breakpoint. */
  imageMobile: string;
  /** Art-directed crop for tablets (768-1023px). Falls back to `image` when hyundai.com has none either. */
  imageTablet?: string;
  alt: string;
};

export const heroSlides: Slide[] = [
  {
    model: "Hyundai CRETA",
    badge: "India's favourite SUV",
    headline: "Command the road.",
    sub: "Level 2 ADAS, a panoramic sunroof and a presence that speaks before you do.",
    price: "10.91",
    image: banners.creta,
    imageMobile: bannersMobile.creta,
    imageTablet: bannersTablet.creta,
    alt: "Hyundai Creta, official campaign banner",
  },
  {
    model: "Hyundai ALCAZAR",
    badge: "6 & 7 Seater",
    headline: "Room for the whole family.",
    sub: "Three spacious rows and boss-mode comfort, built for grand journeys.",
    price: "14.51",
    image: banners.alcazar,
    imageMobile: bannersMobile.alcazar,
    imageTablet: bannersTablet.alcazar,
    alt: "The bold new Hyundai Alcazar, official campaign banner",
  },
  {
    model: "Hyundai IONIQ 5",
    badge: "All-Electric",
    headline: "The future, arrived.",
    sub: "Hyundai's flagship electric SUV, with futuristic design and a 500km+ range.",
    price: "55.71",
    image: banners.ioniq5,
    imageMobile: bannersMobile.ioniq5,
    imageTablet: bannersTablet.ioniq5,
    alt: "The Hyundai Ioniq 5 electric SUV, official campaign banner",
  },
  {
    model: "Hyundai EXTER",
    badge: "Compact SUV",
    headline: "Drive to shine.",
    sub: "Confident city size, an SUV stance and a practical factory CNG choice.",
    price: "5.81",
    image: banners.exter,
    imageMobile: bannersMobile.exter,
    alt: "Hyundai Exter compact SUV, official campaign banner",
  },
  {
    model: "Hyundai VENUE",
    badge: "Compact SUV",
    headline: "Made for your every day.",
    sub: "Turbo-petrol, diesel and connected technology in a city-friendly SUV.",
    price: "8.00",
    image: banners.venue,
    imageMobile: bannersMobile.venue,
    imageTablet: bannersTablet.venue,
    alt: "Hyundai Venue compact SUV, official campaign banner",
  },
  {
    model: "Hyundai VERNA",
    badge: "Dynamic Sedan",
    headline: "Futuristic by design.",
    sub: "A spacious sedan with a responsive turbo-petrol option and advanced driver assistance.",
    price: "10.99",
    image: banners.verna,
    imageMobile: bannersMobile.verna,
    imageTablet: bannersTablet.verna,
    alt: "Hyundai Verna sedan, official campaign banner",
  },
  {
    model: "Hyundai CRETA ELECTRIC",
    badge: "All-Electric SUV",
    headline: "Undisputed. Ultimate. Now electric.",
    sub: "Choose the battery range that fits your week, with V2L and Level 2 ADAS on selected variants.",
    price: "18.03",
    image: banners.cretaElectric,
    imageMobile: bannersMobile.cretaElectric,
    imageTablet: bannersTablet.cretaElectric,
    alt: "Hyundai Creta Electric SUV, official campaign banner",
  },
  {
    model: "Hyundai VENUE N LINE",
    badge: "Performance Compact SUV",
    headline: "Sharper by design.",
    sub: "The Venue, tuned for enthusiasts with a turbo-petrol heart and N Line detailing.",
    price: "10.66",
    image: banners.venueNline,
    imageMobile: bannersMobile.venueNline,
    imageTablet: bannersTablet.venueNline,
    alt: "Hyundai Venue N Line performance SUV, official campaign banner",
  },
  {
    model: "Hyundai VENUE",
    badge: "Knight Edition",
    headline: "Born in the dark.",
    sub: "Blacked-out Knight Edition styling for a bolder, more confident Venue presence.",
    price: "8.00",
    image: banners.venueKnight,
    imageMobile: bannersMobile.venueKnight,
    imageTablet: bannersTablet.venueKnight,
    alt: "Hyundai Venue Knight Edition compact SUV, official campaign banner",
  },
  {
    model: "Hyundai I20 N LINE",
    badge: "Performance Hatchback",
    headline: "Pocket-rocket energy.",
    sub: "A turbocharged N Line hatchback with sport seats, paddle shifters and red accents.",
    price: "9.27",
    image: banners.i20Nline,
    imageMobile: bannersMobile.i20Nline,
    imageTablet: bannersTablet.i20Nline,
    alt: "Hyundai i20 N Line performance hatchback, official campaign banner",
  },
  {
    model: "Hyundai I20",
    badge: "Premium Hatchback",
    headline: "Style, dialled up.",
    sub: "A premium hatchback with Bose sound, a digital cluster and segment-leading features.",
    price: "5.99",
    image: banners.i20,
    imageMobile: bannersMobile.i20,
    alt: "Hyundai i20 premium hatchback, official campaign banner",
  },
  {
    model: "Hyundai GRAND I10 NIOS",
    badge: "Feature Hatchback",
    headline: "City-smart, every day.",
    sub: "Rear AC vents, wireless charging and an available factory CNG option for low running costs.",
    price: "5.59",
    image: banners.nios,
    imageMobile: bannersMobile.nios,
    imageTablet: bannersTablet.nios,
    alt: "Hyundai Grand i10 Nios with factory CNG, official campaign banner",
  },
  {
    model: "Hyundai VENUE",
    badge: "Compact SUV",
    headline: "Confidence, in every commute.",
    sub: "Connected SUV technology and a grown-up stance in a city-friendly footprint.",
    price: "8.00",
    image: banners.venueKv,
    imageMobile: bannersMobile.venueKv,
    imageTablet: bannersTablet.venueKv,
    alt: "Hyundai Venue compact SUV, official key visual banner",
  },
  {
    model: "Hyundai ALCAZAR",
    badge: "Premium 7-Seater",
    headline: "Travel in grand style.",
    sub: "Captain-chair comfort, a panoramic sunroof and ADAS for relaxed long-distance family travel.",
    price: "14.51",
    image: banners.alcazarKv,
    imageMobile: bannersMobile.alcazarKv,
    imageTablet: bannersTablet.alcazarKv,
    alt: "Hyundai Alcazar premium 7-seater SUV, official key visual banner",
  },
  {
    model: "Hyundai Promise",
    badge: "Certified Pre-Owned",
    headline: "Promise, delivered.",
    sub: "Hyundai-certified pre-owned cars with warranty-backed assurance from Modi Hyundai.",
    price: "",
    image: banners.promise,
    imageMobile: bannersMobile.promise,
    imageTablet: bannersTablet.promise,
    alt: "Hyundai Promise certified pre-owned programme, official banner",
  },
  {
    model: "30 Years of Hyundai",
    badge: "Since 1996",
    headline: "Three decades in India.",
    sub: "Celebrating 30 years of Hyundai in India and 9 million customer journeys.",
    price: "",
    image: banners.thirtyYears,
    imageMobile: bannersMobile.thirtyYears,
    imageTablet: bannersTablet.thirtyYears,
    alt: "30 years of Hyundai Motor India, official anniversary banner",
  },
  {
    model: "Special Offers",
    badge: "Click to Buy",
    headline: "Season savings, now on.",
    sub: "Cash discounts, exchange bonuses and corporate benefits on select Hyundai models this season.",
    price: "",
    image: banners.offers,
    imageMobile: bannersMobile.offers,
    imageTablet: bannersTablet.offers,
    alt: "Hyundai India special seasonal offers, official banner",
  },
];

export type CarCategory = "SUV" | "Sedan" | "Hatchback" | "Electric" | "Taxi";

export type CarColor = { name: string; hex: string; image: string; colorSlug: string };

export type Car = {
  name: string;
  slug: string;
  type: string;
  category: CarCategory;
  price: string;
  priceINR: number;
  engine: string;
  transmission: string;
  blurb: string;
  cta: string;
  fuel: string;
  image: string;
  alt: string;
  seating: string;
  mileage: string;
  bootSpace: string;
  highlights: string[];
  colors: CarColor[];
  /** CDN folder name for the 360° frame sequence, e.g. "Venue" or "creta-n-line" */
  modelFolder: string;
};

export type DetailSpec = { label: string; value: string };

export type CarDetail = {
  overview: string;
  idealFor: string;
  performance: string[];
  safety: string[];
  adas?: string[];
  interior: string[];
  exterior: string[];
  infotainment: string[];
  comfort: string[];
  variants: string[];
  specifications: DetailSpec[];
  warranty: string;
  sourceUrl: string;
};

export type GalleryImage = { src: string; alt: string; label: string };

const lakh = (inr: number) => (inr / 100000).toFixed(2);

const slugify = (n: string) => n.toLowerCase().replace(/\s+/g, "-");

/* Real per-colour product photography, sourced directly from each
   model's official "Colours" page on hyundai.com/in/en (Adobe AEM
   `/content/dam/.../find-a-car/{Model}/360/{colour-slug}/pc/{slug}_0.png`
   turntable-frame renders - one distinct image per colour, not a single
   cutout with a CSS filter guessing the paint). Every URL below was
   fetched and confirmed live. Hex values are visual approximations of
   the named paint for the swatch dot; the photo itself carries the
   real colour. Frame 0 is the front three-quarter (≈45°) view, used as
   the main hero image so both the front and side of the vehicle read.
   Paths come from coloursBySlug in lib/image-manifest.ts (which mirrors
   the /cars/360/<modelFolder>/<colorSlug>/<colorSlug>_0.png layout). */
const colours = (
  carSlug: string,
  defs: [name: string, hex: string, colorSlug: string][],
): CarColor[] => {
  const map = coloursBySlug[carSlug] ?? {};
  return defs.map(([name, hex, colorSlug]) => ({
    name,
    hex,
    image: map[colorSlug] ?? coloursBySlug[carSlug]?.[Object.keys(map)[0]] ?? "",
    colorSlug,
  }));
};

/* Full lineup, pricing, engine and transmission specs sourced directly
   from the official hyundai.com/in/en homepage and model pages. Tucson
   has been discontinued in India (its price page 404s on hyundai.com as
   of this build) even though it is still listed on modihyundai.co.in;
   removed here to keep the lineup accurate. Prime HB/SD are Hyundai's
   commercial taxi variants of the Nios/Aura, images reused accordingly. */
export const cars: Car[] = [
  {
    name: "EXTER",
    slug: slugify("EXTER"),
    type: "Compact SUV",
    category: "SUV",
    price: lakh(580600),
    priceINR: 580600,
    engine: "1.2L Kappa Petrol, 1.2L Bi-Fuel Kappa CNG",
    transmission: "5-Speed Manual, Smart Auto AMT",
    fuel: "Petrol · CNG",
    blurb: "Hyundai's boldest compact SUV, built for the city and beyond.",
    cta: "Explore the Exter",
    image: cutouts.exter,
    alt: "Hyundai Exter compact SUV, official product shot",
    modelFolder: "Exter",
    colors: colours("exter", [
      ["Titanium Black", "#16181A", "abyss-black"],
      ["Titanium Black Matte", "#101112", "abyss-black-matte"],
      ["Atlas White", "#F2F1EC", "atlas-white"],
      ["Titan Grey", "#5B5E61", "titan-grey"],
      ["Starry Night", "#1C2331", "starry-night-blue"],
      ["Ranger Khaki", "#9C8752", "khaki"],
      ["Khaki Dual Tone", "#9C8752", "khaki-dual-tone"],
      ["Golden Bronze", "#9C7A44", "golden-bronze"],
    ]),
    seating: "5",
    mileage: "Up to 21.1 kmpl (petrol), 27.1 km/kg (CNG)",
    bootSpace: "391 litres",
    highlights: [
      "Segment-first rear disc brakes",
      "Bluelink connected-car tech",
      "6 airbags standard across variants",
      "Sporty pixel LED lighting front & rear",
    ],
  },
  {
    name: "VENUE",
    slug: slugify("VENUE"),
    type: "Compact SUV",
    category: "SUV",
    price: lakh(799900),
    priceINR: 799900,
    engine: "1.2L Kappa Petrol, 1.0L Turbo GDi Petrol, 1.5L CRDi Diesel",
    transmission: "Manual, Automatic & DCT",
    fuel: "Petrol · Diesel",
    blurb: "A confident compact SUV with genuinely big-car features.",
    cta: "Explore the Venue",
    image: cutouts.venue,
    alt: "Hyundai Venue compact SUV, official product shot",
    modelFolder: "Venue",
    colors: colours("venue", [
      ["Titanium Black", "#16181A", "abyss-black"],
      ["Titanium Black Knight Matte", "#101112", "black-knight"],
      ["Atlas White", "#F2F1EC", "atlas-white"],
      ["Atlas White Dual Tone", "#F2F1EC", "altas-white-dual-tone"],
      ["Titan Grey", "#5B5E61", "titan-grey"],
      ["Dragon Red", "#B33A2E", "dragon-red"],
      ["Hazel Blue", "#33546E", "hazel-blue"],
      ["Hazel Blue Matte", "#33546E", "hazel-blue-matte"],
      ["Hazel Blue Dual Tone", "#33546E", "hazel-blue-dual-tone"],
      ["Mystic Sapphire", "#1C2331", "mystic-sapphire"],
      ["Mystic Sapphire Matte", "#1C2331", "mystic-sapphire-matte"],
    ]),
    seating: "5",
    mileage: "Up to 18.4 kmpl (petrol), 23.7 kmpl (diesel)",
    bootSpace: "350 litres",
    highlights: [
      "Turbo-petrol, naturally-aspirated and diesel engine choices",
      "Bluelink connected SUV technology",
      "Wireless Android Auto & Apple CarPlay",
      "6 airbags standard across variants",
    ],
  },
  {
    name: "VENUE N LINE",
    slug: slugify("VENUE N LINE"),
    type: "Performance Compact SUV",
    category: "SUV",
    price: lakh(1066100),
    priceINR: 1066100,
    engine: "1.0L Turbo GDi Petrol",
    transmission: "6-Speed Manual, 7-Speed DCT",
    fuel: "Petrol",
    blurb: "The Venue, sharpened: a turbo-punchy N Line trim with sportier styling.",
    cta: "Explore the Venue N Line",
    image: cutouts.venueNline,
    alt: "Hyundai Venue N Line compact SUV, official product shot",
    modelFolder: "venue-n-line",
    colors: colours("venue-n-line", [
      ["Titanium Black", "#16181A", "abyss-black"],
      ["Atlas White", "#F2F1EC", "atlas-white"],
      ["Atlas White Dual Tone", "#F2F1EC", "atlas-white-dual-tone"],
      ["Titan Grey", "#5B5E61", "titan-grey"],
      ["Dragon Red", "#B33A2E", "dragon-red"],
      ["Dragon Red Dual Tone", "#B33A2E", "dragon-red-dual-tone"],
      ["Hazel Blue", "#33546E", "hazel-blue"],
      ["Hazel Blue Dual Tone", "#33546E", "hazel-blue-dual-tone"],
    ]),
    seating: "5",
    mileage: "Up to 18.2 kmpl",
    bootSpace: "350 litres",
    highlights: [
      "N Line sporty body kit with red accents",
      "Turbo-petrol engine with paddle shifters",
      "Sportier suspension and steering tune",
      "N Line exclusive interior trim",
    ],
  },
  {
    name: "CRETA",
    slug: slugify("CRETA"),
    type: "Mid-size SUV",
    category: "SUV",
    price: lakh(1090700),
    priceINR: 1090700,
    engine: "1.5L Turbo GDi Petrol, 1.5L MPi Petrol, 1.5L CRDi Diesel",
    transmission: "6-Speed Manual & 7-Speed DCT, 6-Speed Manual & IVT",
    fuel: "Petrol · Diesel",
    blurb: "India's best-selling SUV, now sharper on style and tech.",
    cta: "Explore the Creta",
    image: cutouts.creta,
    alt: "Hyundai Creta mid-size SUV, official product shot",
    modelFolder: "Creta",
    colors: colours("creta", [
      ["Abyss Black", "#16181A", "abyss-black"],
      ["Atlas White", "#F2F1EC", "atlas-white"],
      ["Atlas White Dual Tone", "#F2F1EC", "altas-white-dual-tone"],
      ["Titan Grey", "#5B5E61", "titan-grey"],
      ["Fiery Red", "#B33A2E", "fiery-red"],
      ["Robust Emerald Pearl", "#1E4A3B", "robust-emerald-pearl"],
      ["Starry Night", "#1C2331", "starry-night"],
      ["Typhoon Silver", "#9DA0A2", "typhoon-silver"],
      ["Ranger Khaki", "#9C8752", "khaki"],
    ]),
    seating: "5",
    mileage: "Up to 21 kmpl (diesel), 18.4 kmpl (petrol)",
    bootSpace: "433 litres",
    highlights: [
      "Panoramic sunroof and ventilated front seats",
      "Level 2 ADAS on turbo variants",
      "Dual 10.25\" screens with Bose sound system",
      "India's best-selling SUV nameplate",
    ],
  },
  {
    name: "CRETA N LINE",
    slug: slugify("CRETA N LINE"),
    type: "Performance SUV",
    category: "SUV",
    price: lakh(1903300),
    priceINR: 1903300,
    engine: "1.5L Turbo GDi Petrol",
    transmission: "6-Speed Manual, 7-Speed DCT",
    fuel: "Petrol",
    blurb: "The Creta's sportiest form yet, with N Line styling and turbo performance.",
    cta: "Explore the Creta N Line",
    image: cutouts.cretaNline,
    alt: "Hyundai Creta N Line performance SUV, official product shot",
    modelFolder: "creta-n-line",
    colors: colours("creta-n-line", [
      ["Abyss Black", "#16181A", "abyss-black"],
      ["Abyss Black Matte", "#101112", "abyss-black-matte"],
      ["Atlas White", "#F2F1EC", "atlas-white"],
      ["Atlas White Dual Tone", "#F2F1EC", "altas-white-dual-tone"],
      ["Titan Grey", "#5B5E61", "titan-grey"],
      ["Thunder Blue", "#2B3A55", "thunder-blue"],
    ]),
    seating: "5",
    mileage: "Up to 18.7 kmpl",
    bootSpace: "433 litres",
    highlights: [
      "N Line exclusive styling inside and out",
      "Sportier suspension and steering feel",
      "Turbo-petrol only powertrain lineup",
      "N-branded seats, pedals and instrument cluster",
    ],
  },
  {
    name: "ALCAZAR",
    slug: slugify("ALCAZAR"),
    type: "7-Seater SUV",
    category: "SUV",
    price: lakh(1450700),
    priceINR: 1450700,
    engine: "1.5L CRDi Diesel, 1.5L Turbo GDi Petrol",
    transmission: "6-Speed Manual, 7-Speed DCT, 6-Speed Automatic",
    fuel: "Petrol · Diesel",
    blurb: "Three rows of real space, Hyundai's SUV for growing families.",
    cta: "Explore the Alcazar",
    image: cutouts.alcazar,
    alt: "Hyundai Alcazar 7-seater SUV, official product shot",
    modelFolder: "Alcazar",
    colors: colours("alcazar", [
      ["Abyss Black", "#16181A", "abyss-black"],
      ["Titanium Black Matte", "#16181A", "abyss-black-matte"],
      ["Atlas White", "#F2F1EC", "atlas-white"],
      ["Atlas White Dual Tone", "#F2F1EC", "altas-white-dual-tone"],
      ["Robust Emerald Pearl", "#1E4A3B", "robust-emerald-pearl"],
      ["Starry Night", "#1C2331", "starry-night"],
    ]),
    seating: "6 / 7",
    mileage: "Up to 20.4 kmpl (diesel), 16.2 kmpl (petrol)",
    bootSpace: "180 litres (3rd row up), expandable",
    highlights: [
      "6-seat captain's chair or 7-seat bench layouts",
      "Panoramic sunroof and ventilated front seats",
      "ADAS suite available on top variants",
      "Three full rows of genuine adult space",
    ],
  },
  {
    name: "VERNA",
    slug: slugify("VERNA"),
    type: "Sedan",
    category: "Sedan",
    price: lakh(1099200),
    priceINR: 1099200,
    engine: "1.5L Turbo GDi Petrol, 1.5L MPi Petrol",
    transmission: "6-Speed Manual, iVT & 7-Speed DCT",
    fuel: "Petrol",
    blurb: "A sedan built for comfort, performance and everyday practicality.",
    cta: "Explore the Verna",
    image: cutouts.verna,
    alt: "Hyundai Verna sedan, official product shot",
    modelFolder: "Verna",
    colors: colours("verna", [
      ["Abyss Black", "#16181A", "abyss-black"],
      ["Atlas White", "#F2F1EC", "atlas-white"],
      ["Atlas White Dual Tone", "#F2F1EC", "altas-white-dual-tone"],
      ["Titan Grey", "#5B5E61", "titan-grey"],
      ["Titan Grey Matte", "#5B5E61", "titan-grey-matte"],
      ["Classy Blue", "#33546E", "classy-blue"],
      ["Starry Night", "#1C2331", "starry-night"],
    ]),
    seating: "5",
    mileage: "Up to 20.4 kmpl (petrol)",
    bootSpace: "528 litres",
    highlights: [
      "Level 2 ADAS with 10 airbags",
      "Ventilated front seats and Bose premium sound",
      "Digital key and remote engine start",
      "Turbo-petrol option for sportier performance",
    ],
  },
  {
    name: "AURA",
    slug: slugify("AURA"),
    type: "Sedan",
    category: "Sedan",
    price: lakh(599990),
    priceINR: 599990,
    engine: "1.2L Kappa Petrol, 1.2L Bi-Fuel CNG",
    transmission: "5-Speed Manual, Smart Auto AMT",
    fuel: "Petrol · CNG",
    blurb: "A compact sedan that packs genuine comfort and value into a small footprint.",
    cta: "Explore the Aura",
    image: cutouts.aura,
    alt: "Hyundai Aura sedan, official product shot",
    modelFolder: "Aura",
    colors: colours("aura", [
      ["Polar White", "#F4F4F2", "polar-white"],
      ["Starry Night", "#1C2331", "starry-night"],
      ["Titan Grey", "#5B5E61", "titan-grey"],
      ["Typhoon Silver", "#9DA0A2", "typhoon-silver"],
    ]),
    seating: "5",
    mileage: "Up to 20.1 kmpl (petrol), 26.4 km/kg (CNG)",
    bootSpace: "402 litres, segment-leading",
    highlights: [
      "Largest boot space in the compact sedan segment",
      "Rear AC vents and wireless phone charger",
      "Available factory-fitted CNG option",
      "Sunroof and projector headlamps",
    ],
  },
  {
    name: "GRAND I10 NIOS",
    slug: slugify("GRAND I10 NIOS"),
    type: "Hatchback",
    category: "Hatchback",
    price: lakh(559700),
    priceINR: 559700,
    engine: "1.2L Kappa Petrol, 1.2L Bi-Fuel CNG",
    transmission: "5-Speed Manual, Smart Auto AMT",
    fuel: "Petrol · CNG",
    blurb: "A spacious, feature-rich hatchback built for effortless city driving.",
    cta: "Explore the Grand i10 Nios",
    image: cutouts.nios,
    alt: "Hyundai Grand i10 Nios hatchback, official product shot",
    modelFolder: "Grand-i10-Nios",
    colors: colours("grand-i10-nios", [
      ["Polar White", "#F4F4F2", "polar-white"],
      ["Fiery Red", "#B33A2E", "fiery-red"],
      ["Titan Grey Matte", "#5B5E61", "titan-grey-matte"],
      ["Typhoon Silver", "#9DA0A2", "typhoon-silver"],
      ["Aqua Teal", "#2E6E6B", "aqua-teal"],
    ]),
    seating: "5",
    mileage: "Up to 20.3 kmpl (petrol), 25.4 km/kg (CNG)",
    bootSpace: "260 litres",
    highlights: [
      "Segment-first rear AC vents",
      "Wireless Android Auto & Apple CarPlay",
      "6 airbags available across the range",
      "Available factory-fitted CNG option",
    ],
  },
  {
    name: "I20",
    slug: slugify("I20"),
    type: "Premium Hatchback",
    category: "Hatchback",
    price: lakh(599700),
    priceINR: 599700,
    engine: "1.2L Kappa Petrol",
    transmission: "5-Speed Manual, IVT",
    fuel: "Petrol",
    blurb: "A premium hatchback with segment-leading style, tech and safety.",
    cta: "Explore the i20",
    image: cutouts.i20,
    alt: "Hyundai i20 premium hatchback, official product shot",
    modelFolder: "i20",
    colors: colours("i20", [
      ["Knight Black", "#16181A", "knight-black"],
      ["Polar White", "#F4F4F2", "polar-white"],
      ["Polar White Black Roof", "#F4F4F2", "polar-white-black-roof"],
      ["Titan Grey", "#5B5E61", "titan-grey"],
      ["Titan Grey Matte", "#5B5E61", "titan-grey-matte"],
      ["Fiery Red", "#B33A2E", "fiery-red"],
      ["Starry Night", "#1C2331", "starry-night"],
    ]),
    seating: "5",
    mileage: "Up to 20.35 kmpl",
    bootSpace: "311 litres",
    highlights: [
      "Bose premium sound system",
      "Sunroof and 10.25\" digital driver's cluster",
      "Wireless smartphone charger",
      "Segment-leading feature list",
    ],
  },
  {
    name: "I20 N LINE",
    slug: slugify("I20 N LINE"),
    type: "Performance Hatchback",
    category: "Hatchback",
    price: lakh(927200),
    priceINR: 927200,
    engine: "1.0L Turbo GDi Petrol",
    transmission: "7-Speed DCT, 6-Speed Manual",
    fuel: "Petrol",
    blurb: "The sporty, turbocharged N Line take on Hyundai's popular hatchback.",
    cta: "Explore the i20 N Line",
    image: cutouts.i20Nline,
    alt: "Hyundai i20 N Line performance hatchback, official product shot",
    modelFolder: "i20-n-line",
    colors: colours("i20-n-line", [
      ["Abyss Black", "#16181A", "abyss-black"],
      ["Polar White", "#F4F4F2", "polar-white"],
      ["Polar White Dual Tone", "#F4F4F2", "polar-white-dual-tone"],
      ["Blue Black Dual Tone", "#33546E", "blue-black-dual-tone"],
      ["Titan Grey", "#5B5E61", "titan-grey"],
      ["Starry Night", "#1C2331", "starry-night"],
    ]),
    seating: "5",
    mileage: "Up to 18.2 kmpl",
    bootSpace: "311 litres",
    highlights: [
      "1.0L turbo-petrol with paddle-shift DCT",
      "N Line sport body kit and red stitching",
      "Sportier suspension tuning",
      "Bose sound system and sunroof",
    ],
  },
  {
    name: "IONIQ 5",
    slug: slugify("IONIQ 5"),
    type: "Electric SUV",
    category: "Electric",
    price: lakh(5570600),
    priceINR: 5570600,
    engine: "Permanent Magnet Synchronous Motor",
    transmission: "Single-Speed Reduction Gear",
    fuel: "Electric",
    blurb: "Hyundai's flagship electric SUV, with futuristic design and a 500km+ range.",
    cta: "Explore the Ioniq 5",
    image: cutouts.ioniq5,
    alt: "Hyundai Ioniq 5 electric SUV, official product shot",
    modelFolder: "ioniq-5",
    colors: colours("ioniq-5", [
      ["Midnight Black Pearl", "#16181A", "midnight-black-pearl"],
      ["Optic White", "#F2F1EC", "optic-white"],
      ["Titan Grey", "#5B5E61", "titan-grey"],
      ["Gravity Gold Matte", "#8A7D5C", "gravity-gold-matte"],
    ]),
    seating: "5",
    mileage: "Up to 690 km range per charge (ARAI, 84 kWh)",
    bootSpace: "527 litres + 57 litre front trunk",
    highlights: [
      "Vehicle-to-Load (V2L): power devices from the car",
      "Ultra-fast charging, 10–80% in about 18 minutes",
      "Dual 12.3\" curved displays and flat cabin floor",
      "Retro-futuristic, pixel-inspired design language",
    ],
  },
  {
    name: "CRETA ELECTRIC",
    slug: slugify("CRETA ELECTRIC"),
    type: "Electric SUV",
    category: "Electric",
    price: lakh(1802800),
    priceINR: 1802800,
    engine: "Interior Permanent Magnet Synchronous Motor",
    transmission: "Single-Speed Reduction Gear",
    fuel: "Electric",
    blurb: "India's favourite SUV, reimagined as a zero-emission electric vehicle.",
    cta: "Explore the Creta Electric",
    image: cutouts.cretaElectric,
    alt: "Hyundai Creta Electric SUV, official product shot",
    modelFolder: "creta-electric",
    colors: colours("creta-electric", [
      ["Abyss Black", "#16181A", "abyss-black"],
      ["Atlas White", "#F2F1EC", "atlas-white"],
      ["Atlas White Dual Tone", "#F2F1EC", "altas-white-dual-tone"],
      ["Titan Grey", "#5B5E61", "titan-grey"],
      ["Fiery Red", "#B33A2E", "fiery-red"],
      ["Knight Black Matte", "#101112", "knight-black-matte"],
      ["Ocean Blue", "#33546E", "ocean-blue"],
      ["Ocean Blue Matte", "#33546E", "ocean-blue-matte"],
      ["Ocean Blue Dual Tone", "#33546E", "ocean-blue-dual-tone"],
      ["Robust Emerald Matte", "#1E4A3B", "robust-emerald-matte"],
      ["Starry Night", "#1C2331", "starry-night"],
    ]),
    seating: "5",
    mileage: "Up to 510 km range per charge (MIDC, 51.4 kWh)",
    bootSpace: "433 litres + 22 litre frunk",
    highlights: [
      "Vehicle-to-Load (V2L) charging support",
      "Level 2 ADAS suite",
      "Fast charging, 10–80% in about 58 minutes",
      "Same spacious cabin as the ICE Creta",
    ],
  },
  {
    name: "PRIME HB",
    slug: slugify("PRIME HB"),
    type: "Taxi Hatchback",
    category: "Taxi",
    price: lakh(640600),
    priceINR: 640600,
    engine: "1.2L Bi-Fuel Petrol with CNG",
    transmission: "5-Speed Manual",
    fuel: "Petrol · CNG",
    blurb: "Hyundai's purpose-built hatchback for taxi and fleet operators.",
    cta: "Explore the Prime HB",
    image: cutouts.nios,
    alt: "Hyundai Prime HB taxi hatchback, official product shot",
    modelFolder: "Grand-i10-Nios",
    colors: colours("prime-hb", [
      ["Polar White", "#F4F4F2", "polar-white"],
      ["Typhoon Silver", "#9DA0A2", "typhoon-silver"],
      ["Titan Grey Matte", "#5B5E61", "titan-grey-matte"],
    ]),
    seating: "5",
    mileage: "Up to 25.4 km/kg (CNG)",
    bootSpace: "260 litres",
    highlights: [
      "Factory-fitted CNG for low running costs",
      "Built for high-mileage fleet and taxi duty",
      "Backed by Hyundai's dealer service network",
      "Durable, low-maintenance cabin trim",
    ],
  },
  {
    name: "PRIME SD",
    slug: slugify("PRIME SD"),
    type: "Taxi Sedan",
    category: "Taxi",
    price: lakh(695600),
    priceINR: 695600,
    engine: "1.2L Bi-Fuel Petrol with CNG",
    transmission: "5-Speed Manual",
    fuel: "Petrol · CNG",
    blurb: "Hyundai's purpose-built sedan for taxi and fleet operators.",
    cta: "Explore the Prime SD",
    image: cutouts.aura,
    alt: "Hyundai Prime SD taxi sedan, official product shot",
    modelFolder: "Aura",
    colors: colours("prime-sd", [
      ["Polar White", "#F4F4F2", "polar-white"],
      ["Typhoon Silver", "#9DA0A2", "typhoon-silver"],
      ["Titan Grey", "#5B5E61", "titan-grey"],
    ]),
    seating: "5",
    mileage: "Up to 26.4 km/kg (CNG)",
    bootSpace: "402 litres",
    highlights: [
      "Factory-fitted CNG for low running costs",
      "Segment-leading boot space for luggage/fares",
      "Built for high-mileage fleet and taxi duty",
      "Backed by Hyundai's dealer service network",
    ],
  },
];

export const trust = [
  {
    icon: "shield",
    title: "Authorised Hyundai Dealer",
    text: "Every car, part and accessory is 100% genuine, sourced directly from Hyundai Motor India.",
  },
  {
    icon: "users",
    title: "250,000+ Cars Sold",
    text: "One of Mumbai's most trusted Hyundai dealers, with 98% customer satisfaction.",
  },
  {
    icon: "network",
    title: "Wide Sales & Service Network",
    text: "Showrooms and service centres across Mumbai, Thane, Vasai, Virar and Wada.",
  },
  {
    icon: "rupee",
    title: "Easy Finance & Exchange",
    text: "Flexible EMI plans, fast loan approvals, and instant exchange value on your old car.",
  },
  {
    icon: "wrench",
    title: "Expert Service",
    text: "Factory-trained technicians who work exclusively with genuine Hyundai parts.",
  },
];

export type Offer = {
  title: string;
  amount: string;
  caption: string;
  icon: string;
};

export const offers: Offer[] = [
  {
    title: "Cash Discount",
    amount: "₹50,000",
    caption: "Instant savings on select Hyundai models this season.",
    icon: "gift",
  },
  {
    title: "Exchange Bonus",
    amount: "₹40,000",
    caption: "Extra value when you trade in your old car.",
    icon: "car",
  },
  {
    title: "Corporate Benefit",
    amount: "₹40,000",
    caption: "Special pricing for corporate and fleet buyers.",
    icon: "users",
  },
];

export const services = [
  {
    icon: "wrench",
    title: "Periodic Maintenance",
    text: "Manufacturer-recommended service schedules, done right the first time.",
  },
  {
    icon: "shield",
    title: "Hyundai Genuine Parts",
    text: "Only authentic, warranty-backed Hyundai parts, never aftermarket substitutes.",
  },
  {
    icon: "truck",
    title: "Free Pickup & Drop",
    text: "We collect your car for service and drop it back, at no extra cost.",
  },
  {
    icon: "road",
    title: "24x7 Roadside Assistance",
    text: "Stuck on the road? Help is one call away, any time, any day.",
  },
  {
    icon: "badge",
    title: "Extended Warranty",
    text: "Extend your protection well beyond the standard three-year cover.",
  },
];

/* Detailed service offerings for the /locate-service-centre page.
   Each entry maps to a footer Service link and gets its own anchored,
   SEO-rich section. Copy is written in definitional, extractable
   sentences so answer engines can cite it, and every claim stays within
   the authorised-dealer positioning already used across the site. */
export type ServiceOffering = {
  id: string;
  icon: string;
  title: string;
  heading: string;
  intro: string;
  body: string[];
  points: string[];
};

export const serviceOfferings: ServiceOffering[] = [
  {
    id: "genuine-parts",
    icon: "shield",
    title: "Genuine Hyundai Parts",
    heading: "Only genuine, warranty-backed Hyundai parts",
    intro:
      "Every part we fit at a Modi Hyundai service centre is a genuine Hyundai component, sourced directly from Hyundai Motor India and engineered for the exact model we are servicing.",
    body: [
      "Genuine Hyundai parts are designed, tested and approved by Hyundai for your specific car, so they fit precisely and perform the way the manufacturer intended. From brake pads and filters to clutch assemblies and body panels, each part carries Hyundai's own warranty backing.",
      "Aftermarket substitutes often look similar but differ in material grade and tolerances. Over time that gap shows up as faster wear, noisier operation and, in safety-critical parts like brakes, longer stopping distances. Fitting genuine parts is the simplest way to protect your car's reliability, fuel efficiency and resale value.",
      "When you service with Modi Hyundai, you always get the real part. Our parts counter is open to retail customers across Mumbai, Thane, Vasai, Virar and Wada, so you can buy genuine Hyundai parts and accessories over the counter, whether or not your car is in for service.",
    ],
    points: [
      "Engineered and tested by Hyundai for your exact model",
      "Manufacturer warranty backing on every genuine part",
      "Full parts counter for retail buyers and accessories",
      "Protects performance, fuel efficiency and resale value",
    ],
  },
  {
    id: "service-packages",
    icon: "clipboard",
    title: "Service Packages",
    heading: "Transparent service packages for every Hyundai",
    intro:
      "Our service packages follow Hyundai's manufacturer-recommended maintenance schedule, with clear estimates upfront so you know what is included before any work begins.",
    body: [
      "Hyundai's maintenance schedule is based on time or distance, whichever comes first. Our periodic service packages bundle the right oil and filter changes, fluid top-ups, brake inspections and a full multipoint check for each interval, so nothing gets missed as the kilometres build.",
      "Beyond scheduled maintenance, we offer running repair packages for brakes, batteries, tyres, air-conditioning, clutches and suspension. Each job starts with a clear estimate, and our advisors walk you through what is essential versus what can wait, with no pressure to add work you do not need.",
      "Ask about our value service and seasonal care packages, which combine common checks into a single, transparent price. These are especially popular before the monsoon and ahead of long highway trips.",
    ],
    points: [
      "Manufacturer-recommended schedules, done right the first time",
      "Clear, upfront estimates with no hidden charges",
      "Free multipoint health check on every service",
      "Seasonal care packages for monsoon and long trips",
    ],
  },
  {
    id: "roadside-assistance",
    icon: "road",
    title: "Roadside Assistance",
    heading: "24x7 roadside assistance, anywhere you drive",
    intro:
      "Every new Hyundai includes 24x7 roadside assistance, and Modi Hyundai helps you use it. Whether it is a flat tyre, a dead battery or a breakdown far from home, help is one call away, any time of day or night.",
    body: [
      "Hyundai's roadside assistance programme covers you across India for the kinds of events that stop a journey: flat tyres, dead batteries, lost keys, empty fuel tanks, minor electrical faults and mechanical breakdowns. Depending on the situation, the service includes on-spot minor repairs, a jump-start, a fuel top-up, a tyre change, or towing to the nearest authorised service centre.",
      "Save your roadside assistance number in your phone before you need it. When you call, keep your vehicle registration number and current location handy so the team can dispatch the right help quickly.",
      "Need help right now or unsure whether your cover is active? Call Modi Hyundai on 98877 33000 and our team will guide you through the next step.",
    ],
    points: [
      "Round-the-clock cover, every day of the year",
      "On-spot minor repairs, jump-starts and fuel top-ups",
      "Towing to the nearest authorised service centre",
      "Pan-India support for breakdowns far from home",
    ],
  },
  {
    id: "extended-warranty",
    icon: "badge",
    title: "Extended Warranty",
    heading: "Extend your protection beyond the standard cover",
    intro:
      "A new Hyundai comes with the manufacturer's standard warranty, and you can extend that peace of mind with a Hyundai extended warranty, available through Modi Hyundai at the time of purchase or before your original cover ends.",
    body: [
      "The extended warranty continues manufacturer-backed protection for your engine, transmission and electrical systems well beyond the standard three-year period. Because it is issued by Hyundai, repairs are carried out at authorised service centres using genuine parts, with no out-of-pocket cost for covered components.",
      "Buying the extended warranty early costs less than buying it later, and it transfers to a new owner if you sell the car, which can lift its resale value. Our team can confirm the exact coverage terms, durations and pricing for your specific Hyundai model.",
      "Pairing an extended warranty with Hyundai's roadside assistance gives you complete protection for the long term, factory-backed, transferable and valid across the nationwide service network.",
    ],
    points: [
      "Manufacturer-backed cover for engine, transmission and electrics",
      "Repairs at authorised centres using genuine parts",
      "Lower cost when bought early, and transferable on resale",
      "Pairs with roadside assistance for complete protection",
    ],
  },
];

/* FAQ specific to the service page, used for the accordion and the
   FAQPage structured data so service queries can be answered directly
   on this page and cited by answer engines. */
export const serviceFaqData = [
  {
    question: "How do I book a Hyundai service at Modi Hyundai?",
    answer:
      "Use the Book a Service form on this page to choose your car model, nearest service centre, type of service and a convenient date and time. Our team will call you to confirm the appointment. You can also book by calling us on 98877 33000.",
  },
  {
    question: "Do you use genuine Hyundai parts for repairs and service?",
    answer:
      "Yes. Modi Hyundai is an authorised Hyundai dealership, so every part we fit is a genuine Hyundai component, sourced directly from Hyundai Motor India and carrying the manufacturer's warranty backing. We never use aftermarket substitutes for warranty or paid repairs.",
  },
  {
    question: "Which service packages does Modi Hyundai offer?",
    answer:
      "We offer manufacturer-recommended periodic service packages at each time and distance interval, plus running repair packages for brakes, batteries, tyres, air-conditioning, clutches and suspension. Every package starts with a clear, upfront estimate and a free multipoint health check.",
  },
  {
    question: "Is roadside assistance included with my Hyundai?",
    answer:
      "Every new Hyundai includes 24x7 roadside assistance covering flat tyres, dead batteries, lost keys, empty fuel tanks and mechanical breakdowns across India. Depending on the event, it covers on-spot minor repairs, a jump-start, a tyre change, a fuel top-up or towing to the nearest authorised service centre.",
  },
  {
    question: "Can I extend the warranty on my Hyundai?",
    answer:
      "Yes. You can buy a Hyundai extended warranty through Modi Hyundai at the time of purchase or before your standard warranty ends. It continues manufacturer-backed cover for the engine, transmission and electrical systems, with repairs carried out at authorised service centres using genuine parts.",
  },
  {
    question: "Do you offer free pickup and drop for servicing?",
    answer:
      "Yes. Modi Hyundai offers free pickup and drop for servicing across Mumbai, Thane, Vasai, Virar and Wada. Tick the Pick-up and Drop option on the booking form, and we will collect your car and return it to you once the service is complete.",
  },
  {
    question: "Where are the Modi Hyundai service centres located?",
    answer:
      "We run authorised service centres across Mumbai, Thane, Vasai, Virar and Wada, including Chunabhatti, Thane, Vasai, Virar and Wada. Each is staffed by factory-trained technicians and listed with its address and phone number in the Locate a Service Centre section on this page.",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
};

/* NOTE: demo reviews with stock avatars. Replace with real, attributable
   customer reviews before launch; do not build AggregateRating schema
   from these placeholder figures. */
export const testimonials: Testimonial[] = [
  {
    name: "Rahul Mehta",
    role: "Creta owner",
    rating: 5,
    text: "The team walked me through every variant without any pressure. Delivery was on time and the car was spotless.",
    avatar: avatars[0],
  },
  {
    name: "Sneha Iyer",
    role: "Venue owner",
    rating: 5,
    text: "Booking to delivery was smooth and completely transparent. The finance desk got me a rate I did not expect.",
    avatar: avatars[1],
  },
  {
    name: "Amit Verma",
    role: "Alcazar owner",
    rating: 5,
    text: "Service here is genuinely a step above. They explained the work, shared photos and stuck to the estimate.",
    avatar: avatars[2],
  },
  {
    name: "Priya Nair",
    role: "Exter owner",
    rating: 5,
    text: "As a first-time buyer I had endless questions. They were patient and helped me pick the right car for my budget.",
    avatar: avatars[3],
  },
  {
    name: "Karan Malhotra",
    role: "Creta N Line owner, Mumbai",
    rating: 5,
    text: "The Creta N Line handover was flawless. Great attention to detail and no last-minute surprises on the on-road price.",
    avatar: avatars[4],
  },
  {
    name: "Deepa Rao",
    role: "Verna owner, Thane",
    rating: 5,
    text: "Serviced my Verna at the Thane centre. Quick, courteous, and the free pickup and drop saved me a whole day.",
    avatar: avatars[5],
  },
  {
    name: "Farhan Shaikh",
    role: "Creta owner, Mumbai",
    rating: 5,
    text: "Booked from the Malad showroom. They were upfront about the waiting period and kept me updated the whole way.",
    avatar: avatars[6],
  },
  {
    name: "Anjali Desai",
    role: "Exter owner, Virar",
    rating: 5,
    text: "Loved how patient they were with a first-time buyer. The finance options were explained clearly, no jargon.",
    avatar: avatars[7],
  },
];

export const faqData = [
  {
    question: "How do I book a test drive at Modi Hyundai?",
    answer:
      "You can book a test drive online using the form on this page, or by calling us on 98877 33000. Once you share your details, our team will confirm your preferred date, time and location, at our showroom or your home.",
  },
  {
    question: "Do you offer car finance and exchange?",
    answer:
      "Yes. We work with leading banks to offer flexible EMI plans and quick loan approvals, plus instant exchange value on your existing car through Hyundai Promise.",
  },
  {
    question: "Can I book my car service online?",
    answer:
      "Yes. Use Book a Service from the menu or footer to choose your model, preferred service centre and a convenient date, and our team will call to confirm.",
  },
  {
    question: "What is the warranty period on a new Hyundai car?",
    answer:
      "New Hyundai cars come with the standard manufacturer warranty, with optional extended warranty plans available. Our sales team can confirm the exact coverage for your chosen model.",
  },
  {
    question: "Do you accept trade-ins for old cars?",
    answer:
      "Yes. We evaluate your current vehicle and offer an exchange bonus you can apply against your new Hyundai's on-road price.",
  },
  {
    question: "Which areas does Modi Hyundai serve?",
    answer:
      "We have Hyundai showrooms and service centres across Mumbai, Thane, Vasai, Virar and Wada, so sales and service are always close by.",
  },
  {
    question: "What documents do I need to buy a car from Modi Hyundai?",
    answer:
      "You will typically need photo ID, address proof, passport-size photographs and PAN details. Our team will guide you through the exact paperwork for cash or finance purchases.",
  },
];

export type BlogSection = { heading?: string; body: string[] };

export type Blog = {
  slug: string;
  date: string;
  title: string;
  category: string;
  excerpt: string;
  readingTime: string;
  image: string;
  alt: string;
  /* Structured article body. Each section is an optional heading followed
     by one or more paragraphs. Rendered directly as HTML on the post page,
     so this is draft marketing copy for the dealer to refine before launch. */
  content: BlogSection[];
};

/* NOTE: blog body copy is draft marketing content written for this build.
   Facts (model features, pricing, service intervals) are drawn from the
   same Hyundai India sources used elsewhere in this file, but the article
   prose itself should be reviewed and edited before launch. */
export const blogs: Blog[] = [
  {
    slug: "creta-n-line-how-much-sportier",
    date: "24 Jun 2026",
    category: "Models",
    title: "The Creta N Line: how much sportier is it, really?",
    excerpt:
      "Beyond the red accents and N badges, the Creta N Line gets a sharper drive. Here is what actually changes versus the standard Creta.",
    readingTime: "4 min read",
    image: blogImages["creta-n-line-how-much-sportier"],
    alt: "Hyundai Creta N Line exterior styling",
    content: [
      {
        heading: "More than a sticker pack",
        body: [
          "The Creta N Line is the sportiest version of India's best-selling SUV, and the changes go deeper than the badges. You get an N Line-exclusive body kit, red accent stitching, sport seats, metal pedals and an N-branded steering wheel and instrument cluster.",
          "Underneath, Hyundai has retuned the suspension and steering for a firmer, more connected feel. It is still comfortable enough for daily use, but the chassis feels keener when you push on.",
        ],
      },
      {
        heading: "Turbo-only performance",
        body: [
          "Every N Line is powered by the 1.5L turbo GDi petrol engine, available with a 6-speed manual or 7-speed DCT. The turbo gives it a punchy mid-range that the naturally-aspirated Creta can't match, and the DCT's paddle shifters make overtaking genuinely fun.",
          "If you enjoy driving and want a Creta that feels special every time you get in, the N Line is the one to shortlist.",
        ],
      },
      {
        heading: "Should you pick it over the standard Creta?",
        body: [
          "The standard Creta remains the smarter all-rounder for most families, especially if you want diesel or IVT efficiency. The N Line is for buyers who prioritise the driving experience and want the sportier look as part of the deal.",
          "Book a test drive of both back-to-back at Modi Hyundai and the difference is obvious within the first kilometre.",
        ],
      },
    ],
  },
  {
    slug: "alcazar-family-road-trip-suv",
    date: "18 Jun 2026",
    category: "Ownership",
    title: "Why the Alcazar is the family road-trip SUV to beat",
    excerpt:
      "Three real rows, captain-chair comfort and a panoramic sunroof make the Alcazar built for long journeys with the whole family.",
    readingTime: "5 min read",
    image: blogImages["alcazar-family-road-trip-suv"],
    alt: "Hyundai Alcazar on a family road trip",
    content: [
      {
        heading: "Three rows that adults actually fit in",
        body: [
          "Most three-row SUVs treat the third row as an afterthought. The Alcazar gives it genuine adult space, with easy tip-and-slide access through the second row. For weekend trips with grandparents or kids' friends along, that matters more than any spec sheet.",
          "Choose the 6-seat captain's-chair layout for premium comfort, or the 7-seat bench when you need to carry more people more often.",
        ],
      },
      {
        heading: "Built for long distances",
        body: [
          "Ventilated front seats, a panoramic sunroof and a Bose premium sound system turn a long highway stretch into something the family looks forward to. ADAS on the top variants adds a layer of relaxed safety for tired drivers.",
          "With both petrol and diesel engine options and manual, automatic and DCT transmissions, you can spec the Alcazar around how you actually drive.",
        ],
      },
      {
        heading: "The road-trip test",
        body: [
          "Our team has handed over hundreds of Alcazars to Mumbai families, and the feedback is consistent: it is the first car they have owned that nobody complains about getting the \"bad seat\".",
          "Thinking of upgrading for a growing family? Drive the Alcazar at Modi Hyundai and see whether three rows fit your life.",
        ],
      },
    ],
  },
  {
    slug: "monsoon-car-care-tips",
    date: "09 Jun 2026",
    category: "Service",
    title: "5 Monsoon Car-Care Tips Every Hyundai Owner Should Know",
    excerpt:
      "Mumbai monsoons are hard on cars. These five checks keep your Hyundai safe, reliable and corrosion-free through the rains.",
    readingTime: "4 min read",
    image: blogImages["monsoon-car-care-tips"],
    alt: "Hyundai Venue SUV in the monsoon, car-care tips",
    content: [
      {
        heading: "1. Tyres and tread depth come first",
        body: [
          "Worn tyres are the biggest monsoon risk. The legal minimum tread depth is 1.6 mm, but for wet-road safety you want noticeably more. Check for the tread-wear indicators built into the groove, and replace tyres that are near the limit before the rains set in.",
          "Also check tyre pressure regularly. It drops faster in fluctuating temperatures and affects both grip and braking.",
        ],
      },
      {
        heading: "2. Make sure your wipers and lights work",
        body: [
          "Wiper blades harden and streak over a year. Replace them at the start of every monsoon, and top up the washer fluid with a mild detergent mix to cut through oily road film.",
          "Check all lights, headlights, tail lamps, indicators and brake lights. In heavy rain, being seen is as important as seeing.",
        ],
      },
      {
        heading: "3. Protect the bodywork from corrosion",
        body: [
          "Road grime and salt in standing water accelerate rust, especially on the underbody and wheel arches. A pre-monsoon wash, underbody anti-rust treatment and prompt attention to any paint chips will keep your Hyundai looking new for longer.",
        ],
      },
      {
        heading: "4. Brakes and battery",
        body: [
          "Wet brakes take longer to bite. Have your brake pads and fluid checked before the season, and listen for any squealing or sponginess during the rains. Batteries also work harder in humid weather. A quick load test at service time avoids a no-start on a wet morning.",
        ],
      },
      {
        heading: "5. Keep an emergency kit",
        body: [
          "A small kit - torch, tow rope, first-aid, phone numbers for roadside assistance, and a dry cloth for the windows and mirrors - takes minutes to assemble and is invaluable if you are caught out.",
          "Every new Hyundai includes 24x7 roadside assistance. Save the number in your phone before you need it. Need a pre-monsoon check? Book a service at any Modi Hyundai service centre across Mumbai, Thane, Vasai, Virar and Wada.",
        ],
      },
    ],
  },
  {
    slug: "car-loan-or-lease-2026",
    date: "02 Jun 2026",
    category: "Finance",
    title: "Car Loan or Lease in 2026: Which Actually Saves You More?",
    excerpt:
      "EMI ownership or lease-style usage? We break down the real costs, the trade-offs and which buyer each suits best.",
    readingTime: "6 min read",
    image: blogImages["car-loan-or-lease-2026"],
    alt: "Hyundai Verna sedan parked outdoors",
    content: [
      {
        heading: "Two ways to drive the same car",
        body: [
          "A car loan means you borrow, buy, and own the car outright once the EMIs end. A lease (or subscription) means you pay to use the car for a fixed term, then hand it back or buy it. Both put you behind the wheel. The question is which fits your money and your plans.",
        ],
      },
      {
        heading: "Where a loan wins",
        body: [
          "Loans build equity. Every EMI takes you closer to owning an asset you can later sell, exchange or keep payment-free. You can also customise the car, drive unlimited kilometres, and end the loan early with a prepayment whenever your finances allow.",
          "For buyers who keep a car for 5-7+ years, ownership through a loan is almost always cheaper overall than continuous leasing.",
        ],
      },
      {
        heading: "Where a lease wins",
        body: [
          "Leases keep monthly outgoings lower and bundle maintenance, insurance and roadside assistance into one predictable payment. You always drive a newer car, and you avoid the hassle of eventually selling it.",
          "For buyers who change cars every 2-3 years, drive predictable kilometres, and value simplicity over ownership, leasing is genuinely attractive.",
        ],
      },
      {
        heading: "How to decide",
        body: [
          "Ask three questions: How long do I want to keep this car? How much do I drive each year? Do I care about owning the asset at the end? If the answers lean long-distance, high-kilometre and ownership, a loan is your better bet.",
          "Our finance desk at Modi Hyundai works with leading banks to build flexible EMI plans alongside exchange value for your current car. Tell us your budget and we will run both numbers for you, transparently, so you can compare.",
        ],
      },
    ],
  },
  {
    slug: "hyundai-exter-buying-guide",
    date: "27 May 2026",
    category: "Models",
    title: "Hyundai Exter buying guide: which variant is right for you?",
    excerpt:
      "Compact-SUV size, factory CNG and segment-first features. We walk through the Exter line-up to help you pick the right variant.",
    readingTime: "5 min read",
    image: blogImages["hyundai-exter-buying-guide"],
    alt: "Hyundai Exter compact SUV, front three-quarter view",
    content: [
      {
        heading: "A compact SUV that earns the badge",
        body: [
          "The Exter is Hyundai's boldest answer to city driving, confident SUV styling, a tall stance and a practical cabin in a footprint that is genuinely easy to park. It pairs a 1.2L Kappa petrol engine with either a 5-speed manual or a smart AMT.",
          "There's also a factory-fitted 1.2L Bi-Fuel CNG option across selected variants, which makes the Exter one of the most affordable cars to run daily.",
        ],
      },
      {
        heading: "Features that punch above the segment",
        body: [
          "Even at this size, the Exter brings segment-first rear disc brakes, six airbags as standard across variants, Bluelink connected-car technology, and sporty pixel LED lighting front and rear.",
          "You also get an 8-inch touchscreen with wireless Android Auto and Apple CarPlay, a digital cluster with voice commands, and a built-in dashcam option on the top variant.",
        ],
      },
      {
        heading: "Choosing your variant",
        body: [
          "Start with your powertrain. If running cost is your priority, the CNG variant is hard to beat at up to 27.1 km/kg. If convenience matters most, pick the AMT over the manual.",
          "Then move up the feature ladder: the mid variants add the sunroof, wireless charger and rear wiper that most buyers actually use day-to-day; the top variant layers in the dashcam, premium interior and the full connected-car suite.",
          "Not sure where your budget lands? Drive two Exter variants back-to-back at Modi Hyundai and our team will help you compare exactly what changes at each step.",
        ],
      },
    ],
  },
  {
    slug: "first-car-buying-checklist",
    date: "20 May 2026",
    category: "Ownership",
    title: "Your first car: a practical checklist for first-time buyers",
    excerpt:
      "From setting a real budget to closing the paperwork, here is what first-time car buyers in Mumbai should know.",
    readingTime: "6 min read",
    image: blogImages["first-car-buying-checklist"],
    alt: "Hyundai Exter interior dashboard, first-car buyer guide",
    content: [
      {
        heading: "Set a budget that includes everything",
        body: [
          "The on-road price is not the ex-showroom price. Budget for road tax, registration, insurance, accessories and your first year of fuel and service. A realistic number keeps the EMI comfortable and avoids surprises at delivery.",
          "A good rule of thumb: keep your car EMI to a level you could still afford on a tighter month, and keep a small buffer for the first service and registration add-ons.",
        ],
      },
      {
        heading: "Pick the car around how you actually use it",
        body: [
          "Who travels with you, how far you drive each day, and where you park should drive the choice, not the badge. A compact hatchback or compact SUV is often the smartest first car for Mumbai's traffic and parking, with lower EMIs and easier running costs.",
          "List your top three must-haves (say, an automatic, rear AC vents, and good mileage) before you visit a showroom. It makes shortlisting much faster.",
        ],
      },
      {
        heading: "Sort finance and exchange early",
        body: [
          "Get a pre-approved loan indication before you finalise the car, so you know your ceiling. If you have an old vehicle to exchange, have it evaluated first. The exchange value comes straight off your on-road price and can reduce the loan amount meaningfully.",
        ],
      },
      {
        heading: "Know your paperwork",
        body: [
          "You will typically need photo ID, address proof, passport-size photographs and PAN details. For a finance purchase, keep your latest salary slips and bank statements ready to speed up approval.",
          "Our team at Modi Hyundai will walk you through every document and every charge before you sign. No last-minute surprises, no jargon.",
        ],
      },
    ],
  },
  {
    slug: "ioniq-5-electric-ownership-guide",
    date: "13 May 2026",
    category: "Electric",
    title: "Going electric with the Hyundai IONIQ 5: an ownership guide",
    excerpt:
      "500km+ range, ultra-fast charging and Vehicle-to-Load tech. Here is what owning Hyundai's flagship electric SUV is actually like.",
    readingTime: "5 min read",
    image: blogImages["ioniq-5-electric-ownership-guide"],
    alt: "Hyundai IONIQ 5 electric SUV, front three-quarter view",
    content: [
      {
        heading: "Range and charging in the real world",
        body: [
          "The IONIQ 5 delivers up to 690 km of ARAI-certified range on the 84 kWh battery pack, which comfortably covers a full week of Mumbai commuting on a single charge. On longer trips, ultra-fast DC charging takes the battery from 10% to 80% in about 18 minutes, quicker than a coffee break.",
          "At home, a standard AC charger tops it up overnight. Plan a charging point in your parking, and daily running becomes as simple as plugging in your phone.",
        ],
      },
      {
        heading: "Vehicle-to-Load: power, in reverse",
        body: [
          "V2L turns the IONIQ 5 into a power bank on wheels. Using an adapter, you can run laptops, lights, speakers or even small appliances directly from the car's battery, invaluable for camping, outdoor events or a power cut at home.",
        ],
      },
      {
        heading: "A cabin from the future",
        body: [
          "The flat cabin floor, dual 12.3-inch curved displays and pixel-inspired design make the IONIQ 5 feel like nothing else on the road. There is genuine space for five, plus a large boot and a front trunk for charging cables.",
          "Add Level 2 ADAS, a premium sound system and a clean, quiet ride, and it is as relaxing to drive in traffic as it is on the highway.",
        ],
      },
      {
        heading: "Is an EV right for you?",
        body: [
          "Electric suits buyers who can charge at home or at work, drive a predictable distance most days, and want the lowest possible running cost. If you frequently do very long intercity runs, plan your fast-charging stops in advance.",
          "Curious? Book an IONIQ 5 test drive at Modi Hyundai and our team will walk you through charging, range and ownership step by step.",
        ],
      },
    ],
  },
  {
    slug: "hyundai-service-intervals-explained",
    date: "06 May 2026",
    category: "Service",
    title: "Hyundai service intervals explained: what happens, and when",
    excerpt:
      "Understanding your service schedule keeps your Hyundai reliable and protects its resale value. Here is a plain-English guide.",
    readingTime: "5 min read",
    image: blogImages["hyundai-service-intervals-explained"],
    alt: "Hyundai interior dashboard, service intervals guide",
    content: [
      {
        heading: "Why intervals matter",
        body: [
          "Regular servicing keeps your Hyundai safe, efficient and reliable, and it protects your warranty. More importantly, a car with a complete service history is worth noticeably more when you eventually sell or exchange it.",
          "Hyundai's recommended schedule is based on either time or distance, whichever comes first. Following it is the single best thing you can do for long-term ownership.",
        ],
      },
      {
        heading: "The first service",
        body: [
          "Your first service is usually a check-up rather than a major job. It typically covers an oil and filter change, a full multipoint inspection, and a look at the brakes, tyres, battery and all fluids. It is also when small adjustments are made as the engine settles in.",
        ],
      },
      {
        heading: "Periodic maintenance",
        body: [
          "As kilometres build, services cycle through filter replacements, brake pad checks, fluid top-ups and, on automatics, transmission checks. Tyre rotation and wheel alignment are done on a schedule to keep wear even.",
          "Always use genuine Hyundai parts. They are engineered for your car, carry warranty backing, and avoid the premature wear that aftermarket substitutes often cause.",
        ],
      },
      {
        heading: "Make it effortless",
        body: [
          "Modi Hyundai offers free pickup and drop for servicing across Mumbai, Thane, Vasai, Virar and Wada, so a service day no longer has to cost you a full one. Book online, choose your nearest service centre and a convenient slot, and our factory-trained technicians handle the rest.",
        ],
      },
    ],
  },
];


export type Location = {
  name: string;
  type: "Showroom" | "Service Centre";
  city: string;
  address: string;
  phone: string;
  image: string;
  mapsUrl: string;
};

/* Real Modi Hyundai outlets (source: modihyundai.co.in). */
export const locations: Location[] = [
  {
    name: "Hyundai Vasai",
    type: "Showroom",
    city: "Vasai",
    address: "Prime House Main Rd, Sativali Rd, Opp Shailesh Industries Estate, Waliv Phata, Vasai East, Maharashtra 401208",
    phone: "98877 33000",
    image: "/locations/vasai-showroom.webp",
    mapsUrl: "https://maps.app.goo.gl/W7seJ74ksR7L8XqV7",
  },
  {
    name: "Hyundai Virar",
    type: "Showroom",
    city: "Virar",
    address: "HDL Residency Park, Shop 1/2 E Wing, Global City, Opp Yazoo Park, Virar West, Mumbai, Maharashtra 401305",
    phone: "98877 33000",
    image: "/locations/virar-showroom.webp",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=HDL%20Residency%20Park%2C%20Shop%201%2F2%20E%20Wing%2C%20Global%20City%2C%20Opp%20Yazoo%20Park%2C%20Virar%20West%2C%20Mumbai%2C%20Maharashtra%20401305&travelmode=driving",
  },
  {
    name: "Hyundai Thane",
    type: "Showroom",
    city: "Thane",
    address: "Modi House 1 Eastern Express Highway opp LIC Bldg., Naupada, Louis Wadi, Thane West, Maharashtra 400602",
    phone: "98877 33000",
    image: "/locations/thane-showroom.webp",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Modi%20House%201%20Eastern%20Express%20Highway%20opp%20LIC%20Bldg.%2C%20Naupada%2C%20Louis%20Wadi%2C%20Thane%20West%2C%20Maharashtra%20400602&travelmode=driving",
  },
  {
    name: "Hyundai H Promise Thane",
    type: "Showroom",
    city: "Thane",
    address: "Wadekar Compound, Modi Hyundai H Promise Showroom, near Viddyapith Bus Stop, Service Rd, Thane West - 400601",
    phone: "98877 33000",
    image: "/locations/h-promise-thane-showroom.webp",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Wadekar%20Compound%2C%20Modi%20Hyundai%20H%20Promise%20Showroom%2C%20near%20Viddyapith%20Bus%20Stop%2C%20Service%20Rd%2C%20Thane%20West%20400601&travelmode=driving",
  },
  {
    name: "Hyundai Wada",
    type: "Showroom",
    city: "Wada",
    address: "HDL Residency Park , Shop No. 1/2, E Wing Global City , Opp Yazoo Park Virar, Virar West, Maharashtra 401305",
    phone: "98877 33000",
    image: "/locations/wada-showroom.webp",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=HDL%20Residency%20Park%2C%20Shop%20No.%201%2F2%2C%20E%20Wing%20Global%20City%2C%20Opp%20Yazoo%20Park%20Virar%2C%20Virar%20West%2C%20Maharashtra%20401305&travelmode=driving",
  },
  {
    name: "Hyundai Service Centre Chunabhatti",
    type: "Service Centre",
    city: "Mumbai",
    address: "Jogani Industrial Estate, VN Purav Marg, Panchsheel Nagar, Chunabhatti, Sion, Mumbai, Maharashtra 400022",
    phone: "98877 33000",
    image: "/locations/chunabhatti-service.webp",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Jogani%20Industrial%20Estate%2C%20VN%20Purav%20Marg%2C%20Panchsheel%20Nagar%2C%20Chunabhatti%2C%20Sion%2C%20Mumbai%2C%20Maharashtra%20400022&travelmode=driving",
  },
  {
    name: "Hyundai Service Centre Thane",
    type: "Service Centre",
    city: "Thane",
    address: "Navjeevan Compound, 2, Pokhran Rd, opp. Oswal Park, Subhash Nagar, Majiwada, Thane, Maharashtra 400601",
    phone: "98877 33000",
    image: "/locations/thane-service.webp",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Navjeevan%20Compound%2C%202%2C%20Pokhran%20Rd%2C%20opp.%20Oswal%20Park%2C%20Subhash%20Nagar%2C%20Majiwada%2C%20Thane%2C%20Maharashtra%20400601&travelmode=driving",
  },
  {
    name: "Hyundai Service Centre Vasai",
    type: "Service Centre",
    city: "Vasai",
    address: "Gala No 8, Richa Industrial Estate, Sativali Rd, Waliv Phata, Golani Naka, Vasai East, Maharashtra 401208",
    phone: "98877 33000",
    image: "/locations/vasai-service.webp",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Gala%20No%208%2C%20Richa%20Industrial%20Estate%2C%20Sativali%20Rd%2C%20Waliv%20Phata%2C%20Golani%20Naka%2C%20Vasai%20East%2C%20Maharashtra%20401208&travelmode=driving",
  },
  {
    name: "Hyundai Service Centre Virar",
    type: "Service Centre",
    city: "Virar",
    address: "Sanjog Industrial Estate, Gala no 18,19, near Ran Pada Ground, Virar West, Virar, Maharashtra 401303",
    phone: "98877 33000",
    image: "/locations/virar-service.webp",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Sanjog%20Industrial%20Estate%2C%20Gala%20no%2018%2C19%2C%20near%20Ran%20Pada%20Ground%2C%20Virar%20West%2C%20Virar%2C%20Maharashtra%20401303&travelmode=driving",
  },
  {
    name: "Hyundai Service Centre Thane (Raghunath Nagar)",
    type: "Service Centre",
    city: "Thane",
    address: "ICEM Engineering Compound Mohanji, Road, opposite Valencia Park, Raghunath Nagar, Sunderji, Thane, Maharashtra 400604",
    phone: "98877 33000",
    image: "/locations/thane-raghunath-service.webp",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=ICEM%20Engineering%20Compound%20Mohanji%20Road%2C%20opposite%20Valencia%20Park%2C%20Raghunath%20Nagar%2C%20Sunderji%2C%20Thane%2C%20Maharashtra%20400604&travelmode=driving",
  },
  /* No verifiable branch photo found online for these two outlets after
     checking the dealer site, Justdial, Sulekha, CarDekho, Mappls and
     Carz4Sale - placed last rather than shown with a placeholder image. */
  {
    name: "Hyundai Santacruz",
    type: "Showroom",
    city: "Santacruz",
    address: "Vikas Centre, G/02, Next to Santacruz Bus Depot, S.V. Road, Santacruz West, Mumbai, Maharashtra 400054",
    phone: "98877 33000",
    image: "/locations/santacruz-showroom.webp",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Vikas%20Centre%2C%20G%2F02%2C%20Next%20to%20Santacruz%20Bus%20Depot%2C%20S.V.%20Road%2C%20Santacruz%20West%2C%20Mumbai%2C%20Maharashtra%20400054&travelmode=driving",
  },
  {
    name: "Hyundai Service Centre Wada",
    type: "Service Centre",
    city: "Wada",
    address: "Hyundai Service Centre Wada",
    phone: "98877 33000",
    image: "/locations/wada-service.webp",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Hyundai%20Service%20Centre%20Wada&travelmode=driving",
  },
];

/* Curated subset for the footer's "Popular Cars" column, so it doesn't
   list all 14 models. */
const popularNames = ["CRETA", "VENUE", "EXTER", "ALCAZAR", "VERNA", "I20"];
export const popularCars = popularNames
  .map((n) => cars.find((c) => c.name === n))
  .filter((c): c is Car => Boolean(c));

export const testDriveImage = testDriveImageLocal;
export const serviceHeroImage = stockHeroes.service;
export const carModels = cars.map((c) => c.name);
export const cityOptions = ["Santacruz", "Thane", "Vasai", "Virar", "Wada"];
export const serviceCentres = locations.filter((l) => l.type === "Service Centre");
