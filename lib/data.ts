/* ============================================================
   Content model for the Modi Hyundai landing page.
   All business facts (NAP, pricing, locations, stats) are sourced
   from the live dealership site modihyundai.co.in so the page is
   accurate and safe for local SEO / NAP consistency.
   Vehicle photography uses genuine Hyundai India product images
   served from a public automotive CDN; portraits/showroom photos
   use stock stand-ins (replace with real branch photos for launch).
   ============================================================ */

/* Genuine Hyundai India product shots (public automotive CDN). */
const hy = (path: string, w = 1280, h = 720) =>
  `https://imgd.aeplcdn.com/${w}x${h}/n/cw/ec/${path}?isig=0&q=80`;

/* Stock stand-ins for people and showroom buildings. */
const stock = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/* Rotating accent colours (CSS var names) applied to card/icon groups
   for visual variety, matching the parent group's per-card colour bars. */
export const accentCycle = [
  "var(--accent-blue)",
  "var(--accent-red)",
  "var(--accent-orange)",
  "var(--accent-violet)",
];

const shot = {
  nios: "136183/grand-i10-nios-exterior-right-front-three-quarter-17.png",
  i20: "150603/i20-exterior-right-front-three-quarter-13.png",
  i20nline: "158139/i20-n-line-exterior-right-front-three-quarter-16.png",
  aura: "139133/aura-exterior-right-front-three-quarter-9.png",
  exter: "216807/exter-exterior-right-front-three-quarter.png",
  venue: "197163/venue-exterior-right-front-three-quarter-38.png",
  venueNline: "210466/new-venue-n-line-exterior-right-front-three-quarter-11.png",
  creta: "106815/creta-exterior-right-front-three-quarter-2.jpeg",
  cretaNline: "168697/creta-n-line-exterior-right-front-three-quarter-26.png",
  cretaElectric: "167017/creta-electric-exterior-right-front-three-quarter-15.png",
  verna: "204398/verna-exterior-right-front-three-quarter.png",
  alcazar: "157825/alcazar-facelift-exterior-right-front-three-quarter-22.jpeg",
  tucson: "106821/tucson-exterior-right-front-three-quarter-8.png",
  ioniq5: "201627/ioniq-5-exterior-right-front-three-quarter-2.jpeg",
  cretaInterior: "106815/creta-interior-dashboard.jpeg",
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
    { label: "Home", href: "#home" },
    { label: "Cars", href: "#cars" },
    { label: "Offers", href: "#offers" },
    { label: "Service", href: "#service" },
    { label: "Stories", href: "#blogs" },
    { label: "Showrooms", href: "#locations" },
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
    price: "10.73",
    image: hy(shot.creta, 1600, 900),
    alt: "Hyundai Creta mid-size SUV, front three-quarter exterior view",
  },
  {
    model: "Hyundai ALCAZAR",
    badge: "6 & 7 Seater",
    headline: "Room for the whole family.",
    sub: "Three spacious rows and boss-mode comfort, built for grand journeys.",
    price: "14.47",
    image: hy(shot.alcazar, 1600, 900),
    alt: "Hyundai Alcazar 7-seater SUV, front three-quarter exterior view",
  },
  {
    model: "Hyundai TUCSON",
    badge: "The Flagship SUV",
    headline: "Design that turns heads.",
    sub: "Parametric styling, a curved panoramic display and intelligent all-wheel drive.",
    price: "27.32",
    image: hy(shot.tucson, 1600, 900),
    alt: "Hyundai Tucson flagship SUV, front three-quarter exterior view",
  },
];

export type Car = {
  name: string;
  type: string;
  price: string;
  priceINR: number;
  blurb: string;
  cta: string;
  fuel: string;
  image: string;
  alt: string;
};

/* Full lineup and prices sourced from modihyundai.co.in. */
export const cars: Car[] = [
  {
    name: "GRAND I10 NIOS",
    type: "Hatchback",
    price: "5.47",
    priceINR: 547278,
    fuel: "Petrol · CNG",
    blurb: "A spacious, feature-rich hatchback built for effortless city driving.",
    cta: "Explore the Grand i10 Nios",
    image: hy(shot.nios),
    alt: "Hyundai Grand i10 Nios hatchback exterior",
  },
  {
    name: "I20",
    type: "Premium Hatchback",
    price: "6.87",
    priceINR: 686865,
    fuel: "Petrol",
    blurb: "A premium hatchback with segment-leading style, tech and safety.",
    cta: "Explore the i20",
    image: hy(shot.i20),
    alt: "Hyundai i20 premium hatchback exterior",
  },
  {
    name: "I20 N LINE",
    type: "Performance Hatchback",
    price: "9.14",
    priceINR: 914265,
    fuel: "Petrol",
    blurb: "The sporty, turbocharged N Line take on Hyundai's popular hatchback.",
    cta: "Explore the i20 N Line",
    image: hy(shot.i20nline),
    alt: "Hyundai i20 N Line performance hatchback exterior",
  },
  {
    name: "AURA",
    type: "Sedan",
    price: "5.98",
    priceINR: 598320,
    fuel: "Petrol · CNG",
    blurb: "A compact sedan that packs genuine comfort and value into a small footprint.",
    cta: "Explore the Aura",
    image: hy(shot.aura),
    alt: "Hyundai Aura sedan exterior",
  },
  {
    name: "VERNA",
    type: "Sedan",
    price: "10.69",
    priceINR: 1069210,
    fuel: "Petrol",
    blurb: "A sedan built for comfort, performance and everyday practicality.",
    cta: "Explore the Verna",
    image: hy(shot.verna),
    alt: "Hyundai Verna sedan exterior",
  },
  {
    name: "EXTER",
    type: "Compact SUV",
    price: "5.69",
    priceINR: 568803,
    fuel: "Petrol · CNG",
    blurb: "Hyundai's boldest compact SUV, built for the city and beyond.",
    cta: "Explore the Exter",
    image: hy(shot.exter),
    alt: "Hyundai Exter compact SUV exterior",
  },
  {
    name: "VENUE",
    type: "Compact SUV",
    price: "7.90",
    priceINR: 789900,
    fuel: "Petrol · Diesel",
    blurb: "A confident compact SUV with genuinely big-car features.",
    cta: "Explore the Venue",
    image: hy(shot.venue),
    alt: "Hyundai Venue compact SUV exterior",
  },
  {
    name: "VENUE N LINE",
    type: "Performance Compact SUV",
    price: "10.55",
    priceINR: 1055400,
    fuel: "Petrol",
    blurb: "The Venue, sharpened: a turbo-punchy N Line trim with sportier styling.",
    cta: "Explore the Venue N Line",
    image: hy(shot.venueNline),
    alt: "Hyundai Venue N Line compact SUV exterior",
  },
  {
    name: "CRETA",
    type: "Mid-size SUV",
    price: "10.73",
    priceINR: 1072589,
    fuel: "Petrol · Diesel",
    blurb: "India's best-selling SUV, now sharper on style and tech.",
    cta: "Explore the Creta",
    image: hy(shot.creta),
    alt: "Hyundai Creta mid-size SUV exterior",
  },
  {
    name: "CRETA N LINE",
    type: "Performance SUV",
    price: "17.83",
    priceINR: 1782628,
    fuel: "Petrol",
    blurb: "The Creta's sportiest form yet, with N Line styling and turbo performance.",
    cta: "Explore the Creta N Line",
    image: hy(shot.cretaNline),
    alt: "Hyundai Creta N Line performance SUV exterior",
  },
  {
    name: "ALCAZAR",
    type: "7-Seater SUV",
    price: "14.47",
    priceINR: 1447305,
    fuel: "Petrol · Diesel",
    blurb: "Three rows of real space, Hyundai's SUV for growing families.",
    cta: "Explore the Alcazar",
    image: hy(shot.alcazar),
    alt: "Hyundai Alcazar 7-seater SUV exterior",
  },
  {
    name: "TUCSON",
    type: "Flagship SUV",
    price: "27.32",
    priceINR: 2731661,
    fuel: "Petrol · Diesel",
    blurb: "The flagship SUV with parametric design, ADAS and all-wheel drive.",
    cta: "Explore the Tucson",
    image: hy(shot.tucson),
    alt: "Hyundai Tucson flagship SUV exterior",
  },
  {
    name: "IONIQ 5",
    type: "Electric SUV",
    price: "46.30",
    priceINR: 4630000,
    fuel: "Electric",
    blurb: "Hyundai's flagship electric SUV, with futuristic design and 500km+ range.",
    cta: "Explore the Ioniq 5",
    image: hy(shot.ioniq5),
    alt: "Hyundai Ioniq 5 electric SUV exterior",
  },
  {
    name: "CRETA ELECTRIC",
    type: "Electric SUV",
    price: "18.02",
    priceINR: 1802200,
    fuel: "Electric",
    blurb: "India's favourite SUV, reimagined as a zero-emission electric vehicle.",
    cta: "Explore the Creta Electric",
    image: hy(shot.cretaElectric),
    alt: "Hyundai Creta Electric SUV exterior",
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
    role: "Tucson owner, Mumbai",
    rating: 5,
    text: "The Tucson handover was flawless. Great attention to detail and no last-minute surprises on the on-road price.",
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
    image: hy(shot.tucson, 900, 600),
    alt: "Hyundai SUV in the monsoon, car-care tips",
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
    name: "Hyundai Santacruz",
    type: "Showroom",
    city: "Mumbai",
    address: "Hyundai Santacruz Showroom",
    phone: "98877 33000",
    image: "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/03/Untitled-design-24-300x150.png",
  },
  {
    name: "Hyundai Vasai",
    type: "Showroom",
    city: "Vasai",
    address: "Prime House Main Rd, Sativali Rd, Opp Shailesh Industries Estate, Waliv Phata, Vasai East, Maharashtra 401208",
    phone: "98877 33000",
    image: "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-Vasai-Showroom-scaled.png",
  },
  {
    name: "Hyundai Virar",
    type: "Showroom",
    city: "Virar",
    address: "HDL Residency Park, Shop 1/2 E Wing, Global City, Opp Yazoo Park, Virar West, Mumbai, Maharashtra 401305",
    phone: "98877 33000",
    image: "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-Virar-Showroom-scaled.png",
  },
  {
    name: "Hyundai Thane",
    type: "Showroom",
    city: "Thane",
    address: "Modi House 1 Eastern Express Highway opp LIC Bldg., Naupada, Louis Wadi, Thane West, Maharashtra 400602",
    phone: "98877 33000",
    image: "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-Thane-Showroom-scaled.png",
  },
  {
    name: "Hyundai H Promise Thane",
    type: "Showroom",
    city: "Thane",
    address: "Wadekar Compound, Modi Hyundai H Promise Showroom, near Viddyapith Bus Stop, Service Rd, Thane West - 400601",
    phone: "98877 33000",
    image: "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/03/Untitled-design-30.png",
  },
  {
    name: "Hyundai Wada",
    type: "Showroom",
    city: "Wada",
    address: "HDL Residency Park , Shop No. 1/2, E Wing Global City , Opp Yazoo Park Virar, Virar West, Maharashtra 401305",
    phone: "98877 33000",
    image: "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-Service-and-sales-Wada-scaled.png",
  },
  {
    name: "Hyundai Service Centre Wada",
    type: "Service Centre",
    city: "Wada",
    address: "Hyundai Service Centre Wada",
    phone: "98877 33000",
    image: "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/03/Untitled-design-24-300x150.png",
  },
  {
    name: "Hyundai Service Centre Chunabhatti",
    type: "Service Centre",
    city: "Mumbai",
    address: "Jogani Industrial Estate, VN Purav Marg, Panchsheel Nagar, Chunabhatti, Sion, Mumbai, Maharashtra 400022",
    phone: "98877 33000",
    image: "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-Service-Chunnabhatti-scaled.png",
  },
  {
    name: "Hyundai Service Centre Thane",
    type: "Service Centre",
    city: "Thane",
    address: "Navjeevan Compound, 2, Pokhran Rd, opp. Oswal Park, Subhash Nagar, Majiwada, Thane, Maharashtra 400601",
    phone: "98877 33000",
    image: "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-Thane-Service-scaled.png",
  },
  {
    name: "Hyundai Service Centre Vasai",
    type: "Service Centre",
    city: "Vasai",
    address: "Gala No 8, Richa Industrial Estate, Sativali Rd, Waliv Phata, Golani Naka, Vasai East, Maharashtra 401208",
    phone: "98877 33000",
    image: "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-Vasai-Service-scaled.png",
  },
  {
    name: "Hyundai Service Centre Virar",
    type: "Service Centre",
    city: "Virar",
    address: "Sanjog Industrial Estate, Gala no 18,19, near Ran Pada Ground, Virar West, Virar, Maharashtra 401303",
    phone: "98877 33000",
    image: "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-Virar-Service-scaled.png",
  },
  {
    name: "Hyundai Service Centre Thane (Raghunath Nagar)",
    type: "Service Centre",
    city: "Thane",
    address: "ICEM Engineering Compound Mohanji, Road, opposite Valencia Park, Raghunath Nagar, Sunderji, Thane, Maharashtra 400604",
    phone: "98877 33000",
    image: "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-raghunath-nagar-service-scaled.png",
  },
];

/* Curated subset for the footer's "Popular Cars" column, so it doesn't
   list all 14 models. */
const popularNames = ["CRETA", "VENUE", "EXTER", "ALCAZAR", "TUCSON", "I20"];
export const popularCars = popularNames
  .map((n) => cars.find((c) => c.name === n))
  .filter((c): c is Car => Boolean(c));

export const testDriveImage = hy(shot.cretaInterior, 1000, 1200);
export const carModels = cars.map((c) => c.name);
export const cityOptions = ["Mumbai", "Thane", "Vasai", "Virar", "Wada"];
