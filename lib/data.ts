/* ============================================================
   Content model for the Modi Hyundai landing page.
   Car lineup, images, pricing, engine and transmission specs are
   sourced directly from the official Hyundai India site
   (hyundai.com/in/en) so the dealership page matches the parent
   brand's own data. NAP/location facts come from modihyundai.co.in.
   Portrait/showroom photos use stock stand-ins where noted.
   ============================================================ */

/* Genuine Hyundai India product shot (used for the test-drive interior
   panel; sourced from a public automotive CDN, not the corporate site). */
const hy = (path: string, w = 1280, h = 720) =>
  `https://imgd.aeplcdn.com/${w}x${h}/n/cw/ec/${path}?isig=0&q=80`;

/* Official Hyundai India transparent product cutouts, from hyundai.com/in/en. */
const official = (path: string) => `https://www.hyundai.com${path}`;

/* Stock stand-ins for people and showroom buildings. */
const stock = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/* Indian numbering (lakh/crore) grouping, e.g. 1090700 -> "10,90,700". */
export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* Rotating accent colours (CSS var names) applied to card/icon groups
   for visual variety, matching the parent group's per-card colour bars. */
export const accentCycle = [
  "var(--accent-blue)",
  "var(--accent-red)",
  "var(--accent-orange)",
  "var(--accent-violet)",
];

/* Official hyundai.com transparent product cutouts, 1600x590. */
const officialShot = {
  exter: "/content/dam/hyundai/in/en/data/find-a-car/Exter/booking-open/homemodel-exter.png",
  venue: "/content/dam/hyundai/in/en/data/home/homemodel-venue.png",
  venueNline: "/content/dam/hyundai/in/en/data/home/homemodel-venue-nline.png",
  creta: "/content/dam/hyundai/in/en/data/home/homemodel-creta.png",
  alcazar: "/content/dam/hyundai/in/en/data/home/homemodel-alcazar.png",
  cretaNline: "/content/dam/hyundai/in/en/data/home/homemodel-creta-nline.png",
  verna: "/content/dam/hyundai/in/en/data/home/home-model-verna.png",
  aura: "/content/dam/hyundai/in/en/data/home/homemodel-aura.png",
  nios: "/content/dam/hyundai/in/en/data/home/homemodel-nios.png",
  i20: "/content/dam/hyundai/in/en/data/home/homemodel-i20.png",
  i20Nline: "/content/dam/hyundai/in/en/data/home/homemodel-i20-nline.png",
  ioniq5: "/content/dam/hyundai/in/en/data/home/homemodel-ioniq5.png",
  cretaElectric: "/content/dam/hyundai/in/en/data/home/homemodel-creta-electric.png",
};

/* Full-background photography (not transparent cutouts) for contexts that
   need a real photo rather than a floating product shot: the test-drive
   interior panel and blog thumbnails, which render with object-cover and
   would show through as blank/white behind a transparent PNG. */
const shot = {
  cretaInterior: "106815/creta-interior-dashboard.jpeg",
  creta: "106815/creta-exterior-right-front-three-quarter-2.jpeg",
  alcazar: "157825/alcazar-facelift-exterior-right-front-three-quarter-22.jpeg",
  venue: "197163/venue-exterior-right-front-three-quarter-38.png",
  verna: "204398/verna-exterior-right-front-three-quarter.png",
};

/* Official hyundai.com cinematic hero banners (1860x540), pulled from the
   homepage carousel and individual model pages. These already have the
   marketing headline baked into the photo itself, matching the real
   site's hero treatment exactly. */
const officialHeroBanner = {
  creta: "/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/home/cretakingknightinnerkv-pc.jpg",
  alcazar: "/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Highlights/pc/alcazarboldkvpc2.jpg",
  ioniq5: "/content/dam/hyundai/in/en/images/home/banner/ioniq-des-banner.jpg",
};

/* ---- Canonical business identity (NAP), used everywhere + in schema ---- */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.modihyundai.co.in";

export const company = {
  name: "Modi Hyundai",
  tagline: "Customer First",
  phone: "98877 33000",
  phoneE164: "+919887733000",
  // NOTE: verify before launch — not published on the source site.
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
  areasServed: ["Mumbai", "Kalyan", "Ambernath", "Shahapur", "Pune"],
  stats: {
    carsSold: "250,000+",
    usedCarsSold: "200,000+",
    satisfaction: "98%",
    servicesDone: "550,000+",
  },
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://twitter.com/",
    youtube: "https://www.youtube.com/",
    linkedin: "https://www.linkedin.com/",
  },
};

export const nav = {
  phone: company.phone,
  location: "Mumbai",
  links: [
    { label: "Home", href: "/#home" },
    { label: "Cars", href: "/#cars" },
    { label: "Offers", href: "/#offers" },
    { label: "Service", href: "/#service" },
    { label: "Stories", href: "/#blogs" },
    { label: "Showrooms", href: "/#locations" },
    { label: "About Us", href: "/about" },
  ],
};

/* ---- About Us page content ----
   Dealership facts sourced from modihyundai.co.in. Parent group facts
   (values, brand portfolio, workforce/sales growth) sourced from
   gautammodigroup.com. Hyundai Motor India brand facts sourced from
   hyundai.com/in/en's own "About Us" / brand-story pages. */
export const aboutHeroImage = stock("photo-1560179707-f14e90ef3623", 1600);
export const aboutCultureImage = stock("photo-1522071820081-009f0129c71c", 1200);

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

export type Slide = {
  model: string;
  badge: string;
  headline: string;
  sub: string;
  price: string;
  image: string;
  alt: string;
};

export const heroSlides: Slide[] = [
  {
    model: "Hyundai CRETA",
    badge: "India's favourite SUV",
    headline: "Command the road.",
    sub: "Level 2 ADAS, a panoramic sunroof and a presence that speaks before you do.",
    price: "10.91",
    image: official(officialHeroBanner.creta),
    alt: "Hyundai Creta Summer Edition, official campaign banner",
  },
  {
    model: "Hyundai ALCAZAR",
    badge: "6 & 7 Seater",
    headline: "Room for the whole family.",
    sub: "Three spacious rows and boss-mode comfort, built for grand journeys.",
    price: "14.51",
    image: official(officialHeroBanner.alcazar),
    alt: "The bold new Hyundai Alcazar, official campaign banner",
  },
  {
    model: "Hyundai IONIQ 5",
    badge: "All-Electric",
    headline: "The future, arrived.",
    sub: "Hyundai's flagship electric SUV, with futuristic design and a 500km+ range.",
    price: "55.71",
    image: official(officialHeroBanner.ioniq5),
    alt: "The new Hyundai Ioniq 5, official campaign banner",
  },
];

export type CarCategory = "SUV" | "Sedan" | "Hatchback" | "Electric" | "Taxi";

export type Car = {
  name: string;
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
};

const lakh = (inr: number) => (inr / 100000).toFixed(2);

/* Full lineup, pricing, engine and transmission specs sourced directly
   from the official hyundai.com/in/en homepage and model pages. Tucson
   has been discontinued in India (its price page 404s on hyundai.com as
   of this build) even though it is still listed on modihyundai.co.in;
   removed here to keep the lineup accurate. Prime HB/SD are Hyundai's
   commercial taxi variants of the Nios/Aura, images reused accordingly. */
export const cars: Car[] = [
  {
    name: "EXTER",
    type: "Compact SUV",
    category: "SUV",
    price: lakh(580600),
    priceINR: 580600,
    engine: "1.2L Kappa Petrol, 1.2L Bi-Fuel Kappa CNG",
    transmission: "5-Speed Manual, Smart Auto AMT",
    fuel: "Petrol · CNG",
    blurb: "Hyundai's boldest compact SUV, built for the city and beyond.",
    cta: "Explore the Exter",
    image: official(officialShot.exter),
    alt: "Hyundai Exter compact SUV, official product shot",
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
    type: "Compact SUV",
    category: "SUV",
    price: lakh(799900),
    priceINR: 799900,
    engine: "1.2L Kappa Petrol, 1.0L Turbo GDi Petrol, 1.5L CRDi Diesel",
    transmission: "Manual, Automatic & DCT",
    fuel: "Petrol · Diesel",
    blurb: "A confident compact SUV with genuinely big-car features.",
    cta: "Explore the Venue",
    image: official(officialShot.venue),
    alt: "Hyundai Venue compact SUV, official product shot",
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
    type: "Performance Compact SUV",
    category: "SUV",
    price: lakh(1066100),
    priceINR: 1066100,
    engine: "1.0L Turbo GDi Petrol",
    transmission: "6-Speed Manual, 7-Speed DCT",
    fuel: "Petrol",
    blurb: "The Venue, sharpened: a turbo-punchy N Line trim with sportier styling.",
    cta: "Explore the Venue N Line",
    image: official(officialShot.venueNline),
    alt: "Hyundai Venue N Line compact SUV, official product shot",
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
    type: "Mid-size SUV",
    category: "SUV",
    price: lakh(1090700),
    priceINR: 1090700,
    engine: "1.5L Turbo GDi Petrol, 1.5L MPi Petrol, 1.5L CRDi Diesel",
    transmission: "6-Speed Manual & 7-Speed DCT, 6-Speed Manual & IVT",
    fuel: "Petrol · Diesel",
    blurb: "India's best-selling SUV, now sharper on style and tech.",
    cta: "Explore the Creta",
    image: official(officialShot.creta),
    alt: "Hyundai Creta mid-size SUV, official product shot",
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
    type: "Performance SUV",
    category: "SUV",
    price: lakh(1903300),
    priceINR: 1903300,
    engine: "1.5L Turbo GDi Petrol",
    transmission: "6-Speed Manual, 7-Speed DCT",
    fuel: "Petrol",
    blurb: "The Creta's sportiest form yet, with N Line styling and turbo performance.",
    cta: "Explore the Creta N Line",
    image: official(officialShot.cretaNline),
    alt: "Hyundai Creta N Line performance SUV, official product shot",
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
    type: "7-Seater SUV",
    category: "SUV",
    price: lakh(1450700),
    priceINR: 1450700,
    engine: "1.5L CRDi Diesel, 1.5L Turbo GDi Petrol",
    transmission: "6-Speed Manual, 7-Speed DCT, 6-Speed Automatic",
    fuel: "Petrol · Diesel",
    blurb: "Three rows of real space, Hyundai's SUV for growing families.",
    cta: "Explore the Alcazar",
    image: official(officialShot.alcazar),
    alt: "Hyundai Alcazar 7-seater SUV, official product shot",
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
    type: "Sedan",
    category: "Sedan",
    price: lakh(1099200),
    priceINR: 1099200,
    engine: "1.5L Turbo GDi Petrol, 1.5L MPi Petrol",
    transmission: "6-Speed Manual, iVT & 7-Speed DCT",
    fuel: "Petrol",
    blurb: "A sedan built for comfort, performance and everyday practicality.",
    cta: "Explore the Verna",
    image: official(officialShot.verna),
    alt: "Hyundai Verna sedan, official product shot",
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
    type: "Sedan",
    category: "Sedan",
    price: lakh(599990),
    priceINR: 599990,
    engine: "1.2L Kappa Petrol, 1.2L Bi-Fuel CNG",
    transmission: "5-Speed Manual, Smart Auto AMT",
    fuel: "Petrol · CNG",
    blurb: "A compact sedan that packs genuine comfort and value into a small footprint.",
    cta: "Explore the Aura",
    image: official(officialShot.aura),
    alt: "Hyundai Aura sedan, official product shot",
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
    type: "Hatchback",
    category: "Hatchback",
    price: lakh(559700),
    priceINR: 559700,
    engine: "1.2L Kappa Petrol, 1.2L Bi-Fuel CNG",
    transmission: "5-Speed Manual, Smart Auto AMT",
    fuel: "Petrol · CNG",
    blurb: "A spacious, feature-rich hatchback built for effortless city driving.",
    cta: "Explore the Grand i10 Nios",
    image: official(officialShot.nios),
    alt: "Hyundai Grand i10 Nios hatchback, official product shot",
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
    type: "Premium Hatchback",
    category: "Hatchback",
    price: lakh(599700),
    priceINR: 599700,
    engine: "1.2L Kappa Petrol",
    transmission: "5-Speed Manual, IVT",
    fuel: "Petrol",
    blurb: "A premium hatchback with segment-leading style, tech and safety.",
    cta: "Explore the i20",
    image: official(officialShot.i20),
    alt: "Hyundai i20 premium hatchback, official product shot",
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
    type: "Performance Hatchback",
    category: "Hatchback",
    price: lakh(927200),
    priceINR: 927200,
    engine: "1.0L Turbo GDi Petrol",
    transmission: "7-Speed DCT, 6-Speed Manual",
    fuel: "Petrol",
    blurb: "The sporty, turbocharged N Line take on Hyundai's popular hatchback.",
    cta: "Explore the i20 N Line",
    image: official(officialShot.i20Nline),
    alt: "Hyundai i20 N Line performance hatchback, official product shot",
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
    type: "Electric SUV",
    category: "Electric",
    price: lakh(5570600),
    priceINR: 5570600,
    engine: "Permanent Magnet Synchronous Motor",
    transmission: "Single-Speed Reduction Gear",
    fuel: "Electric",
    blurb: "Hyundai's flagship electric SUV, with futuristic design and a 500km+ range.",
    cta: "Explore the Ioniq 5",
    image: official(officialShot.ioniq5),
    alt: "Hyundai Ioniq 5 electric SUV, official product shot",
    seating: "5",
    mileage: "Up to 631 km range per charge (claimed, long-range)",
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
    type: "Electric SUV",
    category: "Electric",
    price: lakh(1802800),
    priceINR: 1802800,
    engine: "Interior Permanent Magnet Synchronous Motor",
    transmission: "Single-Speed Reduction Gear",
    fuel: "Electric",
    blurb: "India's favourite SUV, reimagined as a zero-emission electric vehicle.",
    cta: "Explore the Creta Electric",
    image: official(officialShot.cretaElectric),
    alt: "Hyundai Creta Electric SUV, official product shot",
    seating: "5",
    mileage: "Up to 473 km range per charge (claimed, long-range)",
    bootSpace: "433 litres",
    highlights: [
      "Vehicle-to-Load (V2L) charging support",
      "Level 2 ADAS suite",
      "Fast charging, 10–80% in about 58 minutes",
      "Same spacious cabin as the ICE Creta",
    ],
  },
  {
    name: "PRIME HB",
    type: "Taxi Hatchback",
    category: "Taxi",
    price: lakh(640600),
    priceINR: 640600,
    engine: "1.2L Bi-Fuel Petrol with CNG",
    transmission: "5-Speed Manual",
    fuel: "Petrol · CNG",
    blurb: "Hyundai's purpose-built hatchback for taxi and fleet operators.",
    cta: "Explore the Prime HB",
    image: official(officialShot.nios),
    alt: "Hyundai Prime HB taxi hatchback, official product shot",
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
    type: "Taxi Sedan",
    category: "Taxi",
    price: lakh(695600),
    priceINR: 695600,
    engine: "1.2L Bi-Fuel Petrol with CNG",
    transmission: "5-Speed Manual",
    fuel: "Petrol · CNG",
    blurb: "Hyundai's purpose-built sedan for taxi and fleet operators.",
    cta: "Explore the Prime SD",
    image: official(officialShot.aura),
    alt: "Hyundai Prime SD taxi sedan, official product shot",
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
    text: "Showrooms and service centres across Mumbai, Kalyan, Ambernath, Shahapur and Pune.",
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
    avatar: stock("photo-1500648767791-00dcc994a43e", 200),
  },
  {
    name: "Sneha Iyer",
    role: "Venue owner",
    rating: 5,
    text: "Booking to delivery was smooth and completely transparent. The finance desk got me a rate I did not expect.",
    avatar: stock("photo-1494790108377-be9c29b29330", 200),
  },
  {
    name: "Amit Verma",
    role: "Alcazar owner",
    rating: 5,
    text: "Service here is genuinely a step above. They explained the work, shared photos and stuck to the estimate.",
    avatar: stock("photo-1507003211169-0a1dd7228f2d", 200),
  },
  {
    name: "Priya Nair",
    role: "Exter owner",
    rating: 5,
    text: "As a first-time buyer I had endless questions. They were patient and helped me pick the right car for my budget.",
    avatar: stock("photo-1438761681033-6461ffad8d80", 200),
  },
  {
    name: "Karan Malhotra",
    role: "Creta N Line owner, Mumbai",
    rating: 5,
    text: "The Creta N Line handover was flawless. Great attention to detail and no last-minute surprises on the on-road price.",
    avatar: stock("photo-1506794778202-cad84cf45f1d", 200),
  },
  {
    name: "Deepa Rao",
    role: "Verna owner, Pune",
    rating: 5,
    text: "Serviced my Verna at the Pune centre. Quick, courteous, and the free pickup and drop saved me a whole day.",
    avatar: stock("photo-1544005313-94ddf0286df2", 200),
  },
  {
    name: "Farhan Shaikh",
    role: "Creta owner, Mumbai",
    rating: 5,
    text: "Booked from the Malad showroom. They were upfront about the waiting period and kept me updated the whole way.",
    avatar: stock("photo-1633332755192-727a05c4013d", 200),
  },
  {
    name: "Anjali Desai",
    role: "Exter owner, Kalyan",
    rating: 5,
    text: "Loved how patient they were with a first-time buyer. The finance options were explained clearly, no jargon.",
    avatar: stock("photo-1580489944761-15a19d654956", 200),
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
      "We have Hyundai showrooms and service centres across Mumbai, Kalyan, Ambernath, Shahapur and Pune, so sales and service are always close by.",
  },
  {
    question: "What documents do I need to buy a car from Modi Hyundai?",
    answer:
      "You will typically need photo ID, address proof, passport-size photographs and PAN details. Our team will guide you through the exact paperwork for cash or finance purchases.",
  },
];

export type Blog = {
  date: string;
  title: string;
  category: string;
  image: string;
  alt: string;
};

export const blogs: Blog[] = [
  {
    date: "24 Jun 2026",
    category: "Models",
    title: "The Creta N Line: how much sportier is it, really?",
    image: hy(shot.creta, 900, 600),
    alt: "Hyundai Creta N Line exterior styling",
  },
  {
    date: "18 Jun 2026",
    category: "Ownership",
    title: "Why the Alcazar is the family road-trip SUV to beat",
    image: hy(shot.alcazar, 900, 600),
    alt: "Hyundai Alcazar on a family road trip",
  },
  {
    date: "09 Jun 2026",
    category: "Service",
    title: "5 Monsoon Car-Care Tips Every Hyundai Owner Should Know",
    image: hy(shot.venue, 900, 600),
    alt: "Hyundai Venue SUV in the monsoon, car-care tips",
  },
  {
    date: "02 Jun 2026",
    category: "Finance",
    title: "Car Loan or Lease in 2026: Which Actually Saves You More?",
    image: hy(shot.verna, 900, 600),
    alt: "Hyundai Verna sedan parked outdoors",
  },
];

export type Location = {
  name: string;
  type: "Showroom" | "Service Centre";
  city: string;
  address: string;
  phone: string;
  image: string;
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
  },
  {
    name: "Hyundai Virar",
    type: "Showroom",
    city: "Virar",
    address: "HDL Residency Park, Shop 1/2 E Wing, Global City, Opp Yazoo Park, Virar West, Mumbai, Maharashtra 401305",
    phone: "98877 33000",
    image: "/locations/virar-showroom.webp",
  },
  {
    name: "Hyundai Thane",
    type: "Showroom",
    city: "Thane",
    address: "Modi House 1 Eastern Express Highway opp LIC Bldg., Naupada, Louis Wadi, Thane West, Maharashtra 400602",
    phone: "98877 33000",
    image: "/locations/thane-showroom.webp",
  },
  {
    name: "Hyundai H Promise Thane",
    type: "Showroom",
    city: "Thane",
    address: "Wadekar Compound, Modi Hyundai H Promise Showroom, near Viddyapith Bus Stop, Service Rd, Thane West - 400601",
    phone: "98877 33000",
    image: "/locations/h-promise-thane-showroom.webp",
  },
  {
    name: "Hyundai Wada",
    type: "Showroom",
    city: "Wada",
    address: "HDL Residency Park , Shop No. 1/2, E Wing Global City , Opp Yazoo Park Virar, Virar West, Maharashtra 401305",
    phone: "98877 33000",
    image: "/locations/wada-showroom.webp",
  },
  {
    name: "Hyundai Service Centre Chunabhatti",
    type: "Service Centre",
    city: "Mumbai",
    address: "Jogani Industrial Estate, VN Purav Marg, Panchsheel Nagar, Chunabhatti, Sion, Mumbai, Maharashtra 400022",
    phone: "98877 33000",
    image: "/locations/chunabhatti-service.webp",
  },
  {
    name: "Hyundai Service Centre Thane",
    type: "Service Centre",
    city: "Thane",
    address: "Navjeevan Compound, 2, Pokhran Rd, opp. Oswal Park, Subhash Nagar, Majiwada, Thane, Maharashtra 400601",
    phone: "98877 33000",
    image: "/locations/thane-service.webp",
  },
  {
    name: "Hyundai Service Centre Vasai",
    type: "Service Centre",
    city: "Vasai",
    address: "Gala No 8, Richa Industrial Estate, Sativali Rd, Waliv Phata, Golani Naka, Vasai East, Maharashtra 401208",
    phone: "98877 33000",
    image: "/locations/vasai-service.webp",
  },
  {
    name: "Hyundai Service Centre Virar",
    type: "Service Centre",
    city: "Virar",
    address: "Sanjog Industrial Estate, Gala no 18,19, near Ran Pada Ground, Virar West, Virar, Maharashtra 401303",
    phone: "98877 33000",
    image: "/locations/virar-service.webp",
  },
  {
    name: "Hyundai Service Centre Thane (Raghunath Nagar)",
    type: "Service Centre",
    city: "Thane",
    address: "ICEM Engineering Compound Mohanji, Road, opposite Valencia Park, Raghunath Nagar, Sunderji, Thane, Maharashtra 400604",
    phone: "98877 33000",
    image: "/locations/thane-raghunath-service.webp",
  },
  /* No verifiable branch photo found online for these two outlets after
     checking the dealer site, Justdial, Sulekha, CarDekho, Mappls and
     Carz4Sale — placed last rather than shown with a placeholder image. */
  {
    name: "Hyundai Santacruz",
    type: "Showroom",
    city: "Mumbai",
    address: "Vikas Centre, G/02, Next to Santacruz Bus Depot, S.V. Road, Santacruz West, Mumbai, Maharashtra 400054",
    phone: "98877 33000",
    image: "/locations/santacruz-showroom.webp",
  },
  {
    name: "Hyundai Service Centre Wada",
    type: "Service Centre",
    city: "Wada",
    address: "Hyundai Service Centre Wada",
    phone: "98877 33000",
    image: "/locations/wada-service.webp",
  },
];

/* Curated subset for the footer's "Popular Cars" column, so it doesn't
   list all 14 models. */
const popularNames = ["CRETA", "VENUE", "EXTER", "ALCAZAR", "VERNA", "I20"];
export const popularCars = popularNames
  .map((n) => cars.find((c) => c.name === n))
  .filter((c): c is Car => Boolean(c));

export const testDriveImage = hy(shot.cretaInterior, 1000, 1200);
export const carModels = cars.map((c) => c.name);
export const cityOptions = ["Mumbai", "Thane", "Vasai", "Virar", "Wada"];
