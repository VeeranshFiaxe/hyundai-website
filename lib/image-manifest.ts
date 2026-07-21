/* ============================================================
   Single source of truth for every local image / PDF path on the
   site. Generated alongside scripts/fetch-car-images.mjs — the path
   conventions here mirror the script's exactly, so the two never
   drift. Import from here instead of building https:// URLs.

   All paths are absolute-from-public-root (e.g. "/cars/cutouts/..."),
   ready to drop into <Image src=...> or next/image remotePatterns-free.
   ============================================================ */

/* Shared sanitiser — must match scripts/fetch-car-images.mjs. */
export const sanitize = (p: string) =>
  decodeURIComponent(String(p).split("/").pop()?.split("?")[0] ?? "")
    .replace(/&/g, "and")
    .replace(/[^A-Za-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");

const bannerPath = (cdnPath: string) => `/cars/banners/${sanitize(cdnPath)}`;
const cutoutPath = (cdnPath: string) => `/cars/cutouts/${sanitize(cdnPath)}`;
const galleryPath = (slug: string, cdnPath: string) =>
  `/cars/gallery/${slug}/${sanitize(cdnPath)}`;
const blogShotPath = (cdnRel: string) => `/cars/blog/${sanitize(cdnRel)}`;
const testDrivePath = (cdnRel: string) =>
  `/cars/test-drive/${sanitize(cdnRel)}`;
const stockHeroPath = (id: string) => `/stock/hero/${id}.jpg`;
const avatarPath = (id: string) => `/stock/avatars/${id}.jpg`;

/* ── Hero carousel banners (heroSlides[].image in lib/data.ts) ─────── */
const bannerCdnPaths = {
  creta: "/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/home/cretakingknightinnerkv-pc.jpg",
  alcazar: "/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Highlights/pc/alcazarboldkvpc2.jpg",
  ioniq5: "/content/dam/hyundai/in/en/images/home/banner/ioniq-des-banner.jpg",
  exter: "/content/dam/hyundai/in/en/images/home/banner/exter-home-newpc-banner.jpg",
  venue: "/content/dam/hyundai/in/en/images/home/banner/venue-homepage-des-banner.jpg",
  verna: "/content/dam/hyundai/in/en/images/home/banner/verna-homepage-des-banner.jpg",
  cretaElectric: "/content/dam/hyundai/in/en/images/home/baas-creta-electricpc.jpg",
  venueNline: "/content/dam/hyundai/in/en/images/home/banner/venue-n-line-inner-kv-desk-banner.jpg",
  venueKnight: "/content/dam/hyundai/in/en/images/home/banner/home-knight-edition-des-banner.jpg",
  i20Nline: "/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/pc/i20nlineinnerkv-pc.jpg",
  i20: "/content/dam/hyundai/in/en/data/find-a-car/i20/i20-des-banner.jpg",
  nios: "/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Highlights/Grandi10niosnew/innerkvnioscng-des.jpg",
  venueKv: "/content/dam/hyundai/in/en/data/find-a-car/Venue/Highlights/pc/venueinnerkv-pc.jpg",
  alcazarKv: "/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Highlights/pc/alcazarboldkvpc.jpg",
  promise: "/content/dam/hyundai/in/en/data/hyundai-story/hyundai-promise/h-promise-des-banner.jpg",
  thirtyYears: "/content/dam/hyundai/in/en/images/hyundai-story/hyundai-motor-india/30-years/30-years-memories-innerkv-pc1.jpg",
  offers: "/content/dam/hyundai/in/en/images/ClicktoBuy/specialoffer/newspecialoffergst-pc.jpg",
} as const;

export const banners: Record<keyof typeof bannerCdnPaths, string> = Object.fromEntries(
  Object.entries(bannerCdnPaths).map(([k, p]) => [k, bannerPath(p)]),
) as Record<keyof typeof bannerCdnPaths, string>;

/* ── Transparent product cutouts (Car.image / officialShot) ────────── */
const cutoutCdnPaths = {
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
} as const;

export const cutouts: Record<keyof typeof cutoutCdnPaths, string> = Object.fromEntries(
  Object.entries(cutoutCdnPaths).map(([k, p]) => [k, cutoutPath(p)]),
) as Record<keyof typeof cutoutCdnPaths, string>;

/* ── Per-model feature gallery (modelFeatureGallery in car-details.ts) ─
   Source URL → sanitised local filename. Order matches the original
   array exactly so labels and alts in car-details.ts still line up. */
const galleryCdnPaths: Record<string, string[]> = {
  exter: [
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exter-ext-front.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exter-ext-rear.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterior-des-banner.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/ext-bold-grille.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/ext-led.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter-int-bigimage-pc.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter-dcut.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter-seat-upholder.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/convenience/integrated-infotainment-cluster.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/convenience/digital-cluster.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/convenience/electric-sunroof.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/convenience/rear-ac-vents.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/convenience/smartphone-wireless-charger.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/booking-open/spacious-boot.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/booking-open/dashcam.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/performance/kappa-engine.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/performance/exter-cng-refueling-nozzle.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Exter/safety/airbags-standard-des-banner.jpg",
  ],
  venue: [
    "/content/dam/hyundai/in/en/data/find-a-car/Venue/Exterior/pc/venuefirstbigimage1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Venue/Exterior/pc/venueextfront1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Venue/Exterior/pc/venueextfront2.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Venue/Exterior/pc/venueextrear1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Venue/Exterior/pc/venueextside1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Venue/Interior/pc/venueintbigimg-1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Venue/Interior/pc/venueintimg1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Venue/Interior/pc/venueintimg3.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Venue/Interior/pc/venueintsmallimg-6.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Venue/Convenience/pc/venueconvimg-1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Venue/Convenience/pc/venuetabimg-1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Venue/Performance/pc/kappagdiengperformimg2.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Venue/Performance/pc/u2engperformimg1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Venue/Safety/pc/venuesafetysmallimg-3.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Venue/knight-edition/black-painted-alloys-with-red-brake-calipers.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Venue/knight-edition/exclusive-black-leather-seat-upholstery.jpg",
  ],
  "venue-n-line": [
    "/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/interior-banner.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/steering-wheel.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/interior-gear-hift-knob.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/venuenlineextfront1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/venuenlineextrear1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/dark-chrome-radiator-grille-with-N-Line-emblem.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/diamond-cut-alloy-wheel.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/LED_sequential_lights.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/exterior-banner.jpg",
  ],
  creta: [
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Interior/pc/Hyundai-creta-suv-interior-big-1120x600-1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Interior/pc/Hyundai-creta-suv-interior-big-1120x600-2.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingdashboard.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/Hyundai-creta-suv-highlight-small-800x530-2-infotainment%20&%20Cluster%20screen.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/Hyundai-creta-suv-highlight-small-800x530-3-leather%20seats.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingpremiumseats.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingmemoryseats.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakinggearknob.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Convenience/Hyundai-creta-suv-convenience-big-1120x600-3-bose.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Convenience/Hyundai-creta-suv-convenience-small-800x530-4-%20sunroof.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Convenience/Hyundai-creta-suv-convenience-small-800x530-5-%20ambient%20lighting.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-big-1120x600-front-2.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-big-1120x600-rear-2.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Exterior/pc/Hyundai-creta-suv-exterior-big-1120x600-side-1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingalloy.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingheadlamp.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingtaillamps.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Creta/Performance/Hyundai-creta-suv-performance-big-1120x600-1-Turbo_1.5l-Petrol-Turbo-7DCT.jpg",
  ],
  "creta-n-line": [
    "/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/creta-n-line-interior.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinescoopseats.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/pc/cretanlineinterior.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/front.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/rear.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/side.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/Convenience%20-%204%20-%20sunroof.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Performance/creta-n-line-suv-performance-manualtransmission.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Performance/creta-n-line-suv-performance-automatictransmission.jpg",
  ],
  alcazar: [
    "/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Gallery/alcazargallerybig1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Gallery/alcazargallerybig2.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Gallery/alcazargallerybig3.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Gallery/alcazargallerybig4.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Gallery/alcazargallerybig5.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Gallery/alcazargallerysmall1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Highlights/pc/rowcaptainseats.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/1stand2ndventilatedseats.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/tech-passenger-seat-walk-in.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Convenience/pc/alcazarconvenience1120x600_2.jpg",
  ],
  verna: [
    "/content/dam/hyundai/in/en/data/find-a-car/Verna/Interior/dashboard.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Verna/Interior/leatherette-seat-upholstery.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Verna/Interior/d_cut-steering-wheel.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Verna/Exterior/verna-rear.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Verna/Exterior/diamond_cut-alloys.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Verna/Convenience/bose-premium-sound-8-speaker-system.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Verna/Convenience/electric_driver-seat-with-8-way-adjust.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Verna/Convenience/multi_display_digital_cluster.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Verna/Convenience/surround_view-monitor.jpg",
  ],
  aura: [
    "/content/dam/hyundai/in/en/data/find-a-car/Aura/gallery/pc/auragallerypc_1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Aura/gallery/pc/auragallerypc_2.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Aura/gallery/pc/auragallerypc_3.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Aura/Exterior/1600x580.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Aura/Exterior/1120x600_3.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Aura/Highlights/pc/aurahighlight_int_pc.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Aura/Interior/Pc/auraint_3.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Aura/Convenience/PC/auracovpc_2.jpg",
  ],
  "grand-i10-nios": [
    "/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Gallery%20Section/big/pc/niosgallery_1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Gallery%20Section/big/pc/niosgallery_2.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Gallery%20Section/big/pc/niosgallery_3.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Exterior_Front_1120x600.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Ext_1120x600.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Convenience/pc/Exterior_1120x600_Wireless%20phone%20charger.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Convenience/pc/Exterior_1120x600_Speedometer%20with%20multi%20information%20display.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Highlights/Grandi10niosnew/nios-vibe-interior.jpg",
  ],
  i20: [
    "/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20interiordashbig1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20knightallblackseats.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20galleryb_1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20pe1_ext.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20pe2_ext.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/i20highbig2.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/convenience_electric_sunroof_544x360.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/Safety-Bottom1.jpg",
  ],
  "i20-n-line": [
    "/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/knight/i20nlinegallery7.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/pc/i20-n-linesmallgallery_1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Interior/pc/i20-nline-Interior-big1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/pc/i20nlineinnerkv-pc.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/pc/i20-n-line5pc.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Exterior/Hyundai-i20-nline-Exterior-small-section-PC-800x530-1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/knight/i20nlineexteriorkv.jpg",
  ],
  "ioniq-5": [
    "/content/dam/hyundai/in/en/data/find-a-car/ioniq-5/highlights/feature-collage-1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/ioniq-5/highlights/feature-collage-2.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/ioniq-5/highlights/feature-collage-3.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/ioniq-5/highlights/vehicle-to-load.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/ioniq-5/exterior/headlamps.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/ioniq-5/exterior/aero-alloy.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/ioniq-5/interior/eco-processed-leather.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/ioniq-5/convenience/easy-charging-big-pc.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/ioniq-5/convenience/outside-v2l.jpg",
  ],
  "creta-electric": [
    "/content/dam/hyundai/in/en/data/find-a-car/creta-electric/highlights/gallery/1120x600_040-058-Overall-Interior-Layout-1st-Row-Dashboard_FR03.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/creta-electric/highlights/gallery/1120x600_044B-222-Connected-Screens-Angle_FR01.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/creta-electric/highlights/gallery/1120x600_128-164-6-Airbags_FR05.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/creta-electric/convenience/convenience_512x340_V2L_inside.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/creta-electric/exterior/creta-electric-front-1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/creta-electric/exterior/creta-electric-rear-1.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/creta-electric/convenience/convenience_512x340_Voice_enabled_smart_panoramic_sunroof.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/creta-electric/convenience/convenience_512x340_Bose_Premium_Sound.jpg",
    "/content/dam/hyundai/in/en/data/find-a-car/creta-electric/convenience/convenience_512x340_SBW.jpg",
  ],
};

export const galleryBySlug: Record<string, string[]> = Object.fromEntries(
  Object.entries(galleryCdnPaths).map(([slug, paths]) => [
    slug,
    paths.map((p) => galleryPath(slug, p)),
  ]),
);

/* ── Per-colour turntable frame 0 (Car.image + colours[].image) ──────
   Same modelFolder + colour-slug scheme as the 360 frames, just frame 0.
   The 360 spin itself is built dynamically by Car360Viewer from
   /cars/360/<modelFolder>/<colorSlug>/<colorSlug>_<n>.png — no manifest
   needed for every frame, only frame 0 for the static card image. */
const coloursByModel: Record<string, [folder: string, slugs: string[]][]> = {
  // slug → list of (modelFolder, colour-slug) pairs it reuses
  exter: [["Exter", ["abyss-black", "abyss-black-matte", "atlas-white", "titan-grey", "starry-night-blue", "khaki", "khaki-dual-tone", "golden-bronze"]]],
  venue: [["Venue", ["abyss-black", "black-knight", "atlas-white", "altas-white-dual-tone", "titan-grey", "dragon-red", "hazel-blue", "hazel-blue-matte", "hazel-blue-dual-tone", "mystic-sapphire", "mystic-sapphire-matte"]]],
  "venue-n-line": [["venue-n-line", ["abyss-black", "atlas-white", "atlas-white-dual-tone", "titan-grey", "dragon-red", "dragon-red-dual-tone", "hazel-blue", "hazel-blue-dual-tone"]]],
  creta: [["Creta", ["abyss-black", "atlas-white", "altas-white-dual-tone", "titan-grey", "fiery-red", "robust-emerald-pearl", "starry-night", "typhoon-silver", "khaki"]]],
  "creta-n-line": [["creta-n-line", ["abyss-black", "abyss-black-matte", "atlas-white", "altas-white-dual-tone", "titan-grey", "thunder-blue"]]],
  alcazar: [["Alcazar", ["abyss-black", "abyss-black-matte", "atlas-white", "altas-white-dual-tone", "robust-emerald-pearl", "starry-night"]]],
  verna: [["Verna", ["abyss-black", "atlas-white", "altas-white-dual-tone", "titan-grey", "titan-grey-matte", "classy-blue", "starry-night"]]],
  aura: [["Aura", ["polar-white", "starry-night", "titan-grey", "typhoon-silver"]]],
  "grand-i10-nios": [["Grand-i10-Nios", ["polar-white", "fiery-red", "titan-grey-matte", "typhoon-silver", "aqua-teal"]]],
  i20: [["i20", ["knight-black", "polar-white", "polar-white-black-roof", "titan-grey", "titan-grey-matte", "fiery-red", "starry-night"]]],
  "i20-n-line": [["i20-n-line", ["abyss-black", "polar-white", "polar-white-dual-tone", "blue-black-dual-tone", "titan-grey", "starry-night"]]],
  "ioniq-5": [["ioniq-5", ["midnight-black-pearl", "optic-white", "titan-grey", "gravity-gold-matte"]]],
  "creta-electric": [["creta-electric", ["abyss-black", "atlas-white", "altas-white-dual-tone", "titan-grey", "fiery-red", "knight-black-matte", "ocean-blue", "ocean-blue-matte", "ocean-blue-dual-tone", "robust-emerald-matte", "starry-night"]]],
  // Prime HB / SD reuse the Nios / Aura colour sets respectively.
  "prime-hb": [["Grand-i10-Nios", ["polar-white", "typhoon-silver", "titan-grey-matte"]]],
  "prime-sd": [["Aura", ["polar-white", "typhoon-silver", "titan-grey"]]],
};

/** Frame 0 of a colour's turntable — used as the car-card / hero image. */
export const colourFrame0 = (modelFolder: string, colourSlug: string) =>
  `/cars/360/${modelFolder}/${colourSlug}/${colourSlug}_0.png`;

/** Full frame-0 map keyed by car slug → { colourSlug: path }. */
export const coloursBySlug: Record<string, Record<string, string>> =
  Object.fromEntries(
    Object.entries(coloursByModel).map(([slug, groups]) => {
      const map: Record<string, string> = {};
      for (const [folder, slugs] of groups)
        for (const cs of slugs) map[cs] = colourFrame0(folder, cs);
      return [slug, map];
    }),
  );

/* ── Blog thumbnails (AeplCDN) ─────────────────────────────────────── */
const blogShotCdnRels = {
  cretaInterior: "106815/creta-interior-dashboard.jpeg",
  creta: "106815/creta-exterior-right-front-three-quarter-2.jpeg",
  alcazar: "157825/alcazar-facelift-exterior-right-front-three-quarter-22.jpeg",
  venue: "197163/venue-exterior-right-front-three-quarter-38.png",
  verna: "204398/verna-exterior-right-front-three-quarter.png",
  exter: "216807/exter-exterior-right-front-three-quarter.png",
  exterInterior: "216807/exter-interior-dashboard.jpeg",
  ioniq5: "110289/ioniq-5-exterior-right-front-three-quarter-96.png",
} as const;

export const blogImages: Record<string, string> = {
  "creta-n-line-how-much-sportier": blogShotPath(blogShotCdnRels.creta),
  "alcazar-family-road-trip-suv": blogShotPath(blogShotCdnRels.alcazar),
  "monsoon-car-care-tips": blogShotPath(blogShotCdnRels.venue),
  "car-loan-or-lease-2026": blogShotPath(blogShotCdnRels.verna),
  "hyundai-exter-buying-guide": blogShotPath(blogShotCdnRels.exter),
  "first-car-buying-checklist": blogShotPath(blogShotCdnRels.exterInterior),
  "ioniq-5-electric-ownership-guide": blogShotPath(blogShotCdnRels.ioniq5),
  "hyundai-service-intervals-explained": blogShotPath(blogShotCdnRels.cretaInterior),
};

/* Test-drive interior panel (portrait crop, same source as the blog
   cretaInterior shot — different on-disk file because of the dimensions
   used at fetch time, but the sanitised name collides; stored separately
   under /cars/test-drive/ to keep both). */
export const testDriveImage = testDrivePath(blogShotCdnRels.cretaInterior);

/* ── Campaign heroes (Hyundai.com) ─────────────────────────────────── */
/* Promise hero is the exact same Creta campaign file as banners.creta,
   so reuse it rather than duplicate the bytes. */
export const promiseHero = banners.creta;
export const blogHero = "/campaigns/blog-hero.jpg";

/* ── Stock photography (Unsplash) ──────────────────────────────────── */
export const stockHeroes = {
  about: stockHeroPath("photo-1560179707-f14e90ef3623"),
  aboutCulture: stockHeroPath("photo-1522071820081-009f0129c71c"),
  service: stockHeroPath("photo-1486262715619-67b85e0b08d3"),
} as const;

export const avatars: string[] = [
  "photo-1500648767791-00dcc994a43e",
  "photo-1494790108377-be9c29b29330",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1438761681033-6461ffad8d80",
  "photo-1506794778202-cad84cf45f1d",
  "photo-1544005313-94ddf0286df2",
  "photo-1633332755192-727a05c4013d",
  "photo-1580489944761-15a19d654956",
].map(avatarPath);

/* ── Brochure PDFs ───────────────────────────────────────────────────
   (creta-electric's source file is creta-ev.pdf, saved locally as
   creta-electric.pdf for slug consistency.) */
export const brochureBySlug: Record<string, string> = {
  exter: "/brochures/exter.pdf",
  venue: "/brochures/venue.pdf",
  "venue-n-line": "/brochures/venue-n-line.pdf",
  creta: "/brochures/creta.pdf",
  "creta-n-line": "/brochures/creta-n-line.pdf",
  alcazar: "/brochures/alcazar.pdf",
  verna: "/brochures/verna.pdf",
  aura: "/brochures/aura.pdf",
  "grand-i10-nios": "/brochures/grand-i10-nios.pdf",
  i20: "/brochures/i20.pdf",
  "i20-n-line": "/brochures/i20-n-line.pdf",
  "ioniq-5": "/brochures/ioniq-5.pdf",
  "creta-electric": "/brochures/creta-electric.pdf",
};
