/* One-off script: downloads every external image and brochure PDF the
   site references (Hyundai India product photography, 360° turntable
   frames, Unsplash stock, AEM brochures) into /public so the site is
   fully self-contained and pushable to GitHub with no runtime CDN
   dependency. Re-runnable: existing files are skipped.

   The local-path conventions below are mirrored exactly by the helpers
   in lib/image-manifest.ts — keep them in sync.

   Usage:  node scripts/fetch-car-images.mjs            (everything)
           node scripts/fetch-car-images.mjs --no-360   (skip the big set) */
import { writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");
const skip360 = process.argv.includes("--no-360");

/* ── shared path conventions (mirror lib/image-manifest.ts) ────────── */
const sanitize = (p) =>
  decodeURIComponent(String(p).split("/").pop().split("?")[0])
    .replace(/&/g, "and")
    .replace(/[^A-Za-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");

const bannerPath = (cdnPath) => `/cars/banners/${sanitize(cdnPath)}`;
const cutoutPath = (cdnPath) => `/cars/cutouts/${sanitize(cdnPath)}`;
const galleryPath = (slug, cdnPath) => `/cars/gallery/${slug}/${sanitize(cdnPath)}`;
const blogShotPath = (cdnRel) => `/cars/blog/${sanitize(cdnRel)}`;
const testDrivePath = (cdnRel) => `/cars/test-drive/${sanitize(cdnRel)}`;
const colourFrameLocal = (folder, slug, frame) =>
  `/cars/360/${folder}/${slug}/${slug}_${frame}.png`;
const brochureLocal = (slug) => `/brochures/${slug}.pdf`;
const stockHeroLocal = (id) => `/stock/hero/${id}.jpg`;
const avatarLocal = (id) => `/stock/avatars/${id}.jpg`;

/* ── source URL builders ──────────────────────────────────────────── */
const HYUNDAI = "https://www.hyundai.com";
const aeplcdn = (rel, w, h) =>
  `https://imgd.aeplcdn.com/${w}x${h}/n/cw/ec/${rel}?isig=0&q=80`;
const unsplash = (id, w) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const colourFrameUrl = (folder, slug, frame) =>
  `${HYUNDAI}/content/dam/hyundai/in/en/data/find-a-car/${folder}/360/${slug}/pc/${slug}_${frame}.png`;

/* ── the full URL → local map ─────────────────────────────────────── */
const jobs = [];

// Hero carousel banners (heroSlides in lib/data.ts).
for (const p of [
  "/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/home/cretakingknightinnerkv-pc.jpg",
  "/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Highlights/pc/alcazarboldkvpc2.jpg",
  "/content/dam/hyundai/in/en/images/home/banner/ioniq-des-banner.jpg",
  "/content/dam/hyundai/in/en/images/home/banner/exter-home-newpc-banner.jpg",
  "/content/dam/hyundai/in/en/images/home/banner/venue-homepage-des-banner.jpg",
  "/content/dam/hyundai/in/en/images/home/banner/verna-homepage-des-banner.jpg",
  "/content/dam/hyundai/in/en/images/home/baas-creta-electricpc.jpg",
  "/content/dam/hyundai/in/en/images/home/banner/venue-n-line-inner-kv-desk-banner.jpg",
  "/content/dam/hyundai/in/en/images/home/banner/home-knight-edition-des-banner.jpg",
  "/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/pc/i20nlineinnerkv-pc.jpg",
  "/content/dam/hyundai/in/en/data/find-a-car/i20/i20-des-banner.jpg",
  "/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Highlights/Grandi10niosnew/innerkvnioscng-des.jpg",
  "/content/dam/hyundai/in/en/data/find-a-car/Venue/Highlights/pc/venueinnerkv-pc.jpg",
  "/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Highlights/pc/alcazarboldkvpc.jpg",
  "/content/dam/hyundai/in/en/data/hyundai-story/hyundai-promise/h-promise-des-banner.jpg",
  "/content/dam/hyundai/in/en/images/hyundai-story/hyundai-motor-india/30-years/30-years-memories-innerkv-pc1.jpg",
  "/content/dam/hyundai/in/en/images/ClicktoBuy/specialoffer/newspecialoffergst-pc.jpg",
]) {
  jobs.push({ url: HYUNDAI + p, local: bannerPath(p) });
}

// Transparent product cutouts (officialShot in lib/data.ts).
for (const p of [
  "/content/dam/hyundai/in/en/data/find-a-car/Exter/booking-open/homemodel-exter.png",
  "/content/dam/hyundai/in/en/data/home/homemodel-venue.png",
  "/content/dam/hyundai/in/en/data/home/homemodel-venue-nline.png",
  "/content/dam/hyundai/in/en/data/home/homemodel-creta.png",
  "/content/dam/hyundai/in/en/data/home/homemodel-alcazar.png",
  "/content/dam/hyundai/in/en/data/home/homemodel-creta-nline.png",
  "/content/dam/hyundai/in/en/data/home/home-model-verna.png",
  "/content/dam/hyundai/in/en/data/home/homemodel-aura.png",
  "/content/dam/hyundai/in/en/data/home/homemodel-nios.png",
  "/content/dam/hyundai/in/en/data/home/homemodel-i20.png",
  "/content/dam/hyundai/in/en/data/home/homemodel-i20-nline.png",
  "/content/dam/hyundai/in/en/data/home/homemodel-ioniq5.png",
  "/content/dam/hyundai/in/en/data/home/homemodel-creta-electric.png",
]) {
  jobs.push({ url: HYUNDAI + p, local: cutoutPath(p) });
}

// Per-model feature gallery (modelFeatureGallery in lib/car-details.ts).
const gallery = {
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
for (const [slug, paths] of Object.entries(gallery)) {
  for (const p of paths) jobs.push({ url: HYUNDAI + p, local: galleryPath(slug, p) });
}

// 360° turntable frames: every (modelFolder, colourSlug) × 36 frames.
const models360 = [
  ["Exter", ["abyss-black", "abyss-black-matte", "atlas-white", "titan-grey", "starry-night-blue", "khaki", "khaki-dual-tone", "golden-bronze"]],
  ["Venue", ["abyss-black", "black-knight", "atlas-white", "altas-white-dual-tone", "titan-grey", "dragon-red", "hazel-blue", "hazel-blue-matte", "hazel-blue-dual-tone", "mystic-sapphire", "mystic-sapphire-matte"]],
  ["venue-n-line", ["abyss-black", "atlas-white", "atlas-white-dual-tone", "titan-grey", "dragon-red", "dragon-red-dual-tone", "hazel-blue", "hazel-blue-dual-tone"]],
  ["Creta", ["abyss-black", "atlas-white", "altas-white-dual-tone", "titan-grey", "fiery-red", "robust-emerald-pearl", "starry-night", "typhoon-silver", "khaki"]],
  ["creta-n-line", ["abyss-black", "abyss-black-matte", "atlas-white", "altas-white-dual-tone", "titan-grey", "thunder-blue"]],
  ["Alcazar", ["abyss-black", "abyss-black-matte", "atlas-white", "altas-white-dual-tone", "robust-emerald-pearl", "starry-night"]],
  ["Verna", ["abyss-black", "atlas-white", "altas-white-dual-tone", "titan-grey", "titan-grey-matte", "classy-blue", "starry-night"]],
  ["Aura", ["polar-white", "starry-night", "titan-grey", "typhoon-silver"]],
  ["Grand-i10-Nios", ["polar-white", "fiery-red", "titan-grey-matte", "typhoon-silver", "aqua-teal"]],
  ["i20", ["knight-black", "polar-white", "polar-white-black-roof", "titan-grey", "titan-grey-matte", "fiery-red", "starry-night"]],
  ["i20-n-line", ["abyss-black", "polar-white", "polar-white-dual-tone", "blue-black-dual-tone", "titan-grey", "starry-night"]],
  ["ioniq-5", ["midnight-black-pearl", "optic-white", "titan-grey", "gravity-gold-matte"]],
  ["creta-electric", ["abyss-black", "atlas-white", "altas-white-dual-tone", "titan-grey", "fiery-red", "knight-black-matte", "ocean-blue", "ocean-blue-matte", "ocean-blue-dual-tone", "robust-emerald-matte", "starry-night"]],
];
if (!skip360) {
  for (const [folder, slugs] of models360) {
    for (const slug of slugs) {
      for (let f = 0; f < 36; f++) {
        jobs.push({ url: colourFrameUrl(folder, slug, f), local: colourFrameLocal(folder, slug, f) });
      }
    }
  }
}

// Blog thumbnails + test-drive panel (AeplCDN photography).
const shot = {
  cretaInterior: "106815/creta-interior-dashboard.jpeg",
  creta: "106815/creta-exterior-right-front-three-quarter-2.jpeg",
  alcazar: "157825/alcazar-facelift-exterior-right-front-three-quarter-22.jpeg",
  venue: "197163/venue-exterior-right-front-three-quarter-38.png",
  verna: "204398/verna-exterior-right-front-three-quarter.png",
  exter: "216807/exter-exterior-right-front-three-quarter.png",
  exterInterior: "216807/exter-interior-dashboard.jpeg",
  ioniq5: "110289/ioniq-5-exterior-right-front-three-quarter-96.png",
};
const blogShots = [
  ["creta-n-line-how-much-sportier", "creta"],
  ["alcazar-family-road-trip-suv", "alcazar"],
  ["monsoon-car-care-tips", "venue"],
  ["car-loan-or-lease-2026", "verna"],
  ["hyundai-exter-buying-guide", "exter"],
  ["first-car-buying-checklist", "exterInterior"],
  ["ioniq-5-electric-ownership-guide", "ioniq5"],
  ["hyundai-service-intervals-explained", "cretaInterior"],
];
for (const [, key] of blogShots) {
  jobs.push({ url: aeplcdn(shot[key], 900, 600), local: blogShotPath(shot[key]) });
}
// Test-drive interior panel (portrait crop).
jobs.push({ url: aeplcdn(shot.cretaInterior, 1000, 1200), local: testDrivePath(shot.cretaInterior) });

// Campaign heroes (Hyundai.com). The Promise hero reuses the Creta banner file.
jobs.push({
  url: `${HYUNDAI}/content/dam/hyundai/in/en/data/hyundai-story/campaign/myhyundaimymemories/mymemories-bannerpc1.jpg`,
  local: "/campaigns/blog-hero.jpg",
});

// Stock photography (Unsplash) — heroes and avatars.
for (const [id, w] of [
  ["photo-1560179707-f14e90ef3623", 1600],
  ["photo-1522071820081-009f0129c71c", 1200],
  ["photo-1486262715619-67b85e0b08d3", 1600],
]) {
  jobs.push({ url: unsplash(id, w), local: stockHeroLocal(id) });
}
for (const id of [
  "photo-1500648767791-00dcc994a43e",
  "photo-1494790108377-be9c29b29330",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1438761681033-6461ffad8d80",
  "photo-1506794778202-cad84cf45f1d",
  "photo-1544005313-94ddf0286df2",
  "photo-1633332755192-727a05c4013d",
  "photo-1580489944761-15a19d654956",
]) {
  jobs.push({ url: unsplash(id, 200), local: avatarLocal(id) });
}

// Brochure PDFs (note: creta-electric source file is creta-ev.pdf).
const brochureSources = [
  ["exter", "exter"],
  ["venue", "venue"],
  ["venue-n-line", "venue-n-line"],
  ["creta", "creta"],
  ["creta-n-line", "creta-n-line"],
  ["alcazar", "alcazar"],
  ["verna", "verna"],
  ["aura", "aura"],
  ["grand-i10-nios", "grand-i10-nios"],
  ["i20", "i20"],
  ["i20-n-line", "i20-n-line"],
  ["ioniq-5", "ioniq-5"],
  ["creta-electric", "creta-ev"],
];
for (const [slug, file] of brochureSources) {
  jobs.push({
    url: `${HYUNDAI}/content/dam/hyundai/in/en/data/brochure/${file}.pdf`,
    local: brochureLocal(slug),
  });
}

/* ── dedupe by local path (gallery/blog may share a source) ───────── */
const seen = new Set();
const unique = jobs.filter((j) => (seen.has(j.local) ? false : (seen.add(j.local), true)));

/* ── download with bounded concurrency + retries ──────────────────── */
const exists = (p) => access(p).then(() => true).catch(() => false);
let done = 0;
let skipped = 0;
const failures = [];

async function fetchOne(job) {
  const dest = path.join(publicDir, job.local);
  await mkdir(path.dirname(dest), { recursive: true });
  if (await exists(dest)) { skipped++; return; }
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(job.url, { redirect: "follow" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length === 0) throw new Error("empty body");
      await writeFile(dest, buf);
      return;
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }
  failures.push({ ...job, error: String(lastErr?.message || lastErr) });
}

const CONCURRENCY = 8;
let cursor = 0;
async function worker() {
  while (cursor < unique.length) {
    const i = cursor++;
    await fetchOne(unique[i]);
    done++;
    if (done % 50 === 0 || done === unique.length) {
      process.stdout.write(`\r${done}/${unique.length} (${skipped} cached, ${failures.length} failed)   `);
    }
  }
}

console.log(`Fetching ${unique.length} assets${skip360 ? " (--no-360)" : ""}…`);
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
process.stdout.write("\n");

if (failures.length) {
  console.log(`\n${failures.length} failed:`);
  for (const f of failures.slice(0, 60)) console.log(`  [${f.error}] ${f.url}`);
  if (failures.length > 60) console.log(`  …and ${failures.length - 60} more`);
} else {
  console.log("All assets fetched.");
}
console.log("Done.");
