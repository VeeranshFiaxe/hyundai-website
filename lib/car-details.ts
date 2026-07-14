import type { Car, CarDetail, GalleryImage } from "./data";

const passengerCarWarranty =
  "3 years / unlimited km standard Hyundai warranty. Extended warranty and roadside-assistance plans can be selected at delivery; ask Modi Hyundai to confirm current plan terms for your variant.";

const evWarranty =
  "3 years / unlimited km standard vehicle warranty, plus an 8-year / 160,000 km high-voltage battery warranty. Extended protection options are available; confirm current terms and exclusions with Modi Hyundai.";

type DetailInput = Omit<CarDetail, "warranty"> & { warranty?: string };

const detail = (input: DetailInput): CarDetail => ({
  ...input,
  warranty: input.warranty ?? passengerCarWarranty,
});

/*
 * Buyer-facing facts are maintained separately from card data. They have
 * been checked against the linked Hyundai India highlights, feature and
 * specification pages. Equipment, paint and price can change by variant.
 */
export const carDetails: Record<string, CarDetail> = {
  exter: detail({
    overview:
      "EXTER brings SUV-like confidence to a compact city footprint. It is an easy first car for buyers who want a high seating position, practical luggage space and a factory-fitted CNG choice without losing everyday usability.",
    idealFor: "First-time buyers, city commuters and small families seeking a compact SUV stance.",
    performance: [
      "1.2L Kappa petrol: 83 PS and 114 Nm, with 5-speed manual or Smart Auto AMT.",
      "Hy-CNG Duo uses twin underfloor cylinders to retain useful luggage space; CNG output is 69 PS and 95.2 Nm.",
      "185 mm ground clearance and hill-start assist add confidence on ramps, speed breakers and broken urban roads.",
    ],
    safety: [
      "6 airbags, ABS with EBD, ESC, VSM and hill-start assist are standard safety foundations.",
      "ISOFIX child-seat anchors, rear parking sensors and seat-belt reminders support family use.",
      "Rear camera, TPMS and dual-camera dashcam are available on selected variants.",
    ],
    interior: [
      "High seating position with practical storage, rear AC vents and a roomy 391-litre petrol boot.",
      "Semi-leatherette upholstery, cooled glovebox and a leather-wrapped steering wheel are offered higher in the range.",
      "Hy-CNG Duo variants preserve 225 litres of luggage space through underfloor cylinders.",
    ],
    exterior: [
      "H-shaped LED DRLs, parametric grille, bridge-type roof rails and muscular wheel arches create the SUV look.",
      "15-inch diamond-cut alloy wheels and a rear spoiler are available on higher trims.",
      "Choose from single-tone, dual-tone and matte finishes, subject to variant availability.",
    ],
    infotainment: [
      "8-inch touchscreen with wireless Android Auto and Apple CarPlay on eligible trims.",
      "Digital cluster, steering-mounted controls and Hyundai Bluelink connected-car functions are available by variant.",
      "Segment-first dual-camera dashcam is offered on select versions.",
    ],
    comfort: [
      "Smart electric sunroof, cruise control and keyless entry with push-button start are available higher in the range.",
      "AMT is the convenience-led choice for frequent stop-start driving; manual suits buyers who prefer direct control.",
    ],
    variants: [
      "Petrol manual: HX 2, HX 3, HX 4, HX 4+, HX 6, HX 8 and HX 10.",
      "Petrol AMT and Hy-CNG Duo availability depends on the selected HX trim.",
      "Ask for a feature-by-feature quotation before deciding between a value trim and a top-spec sunroof/tech trim.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "3,830 × 1,723 × 1,643 mm" },
      { label: "Wheelbase", value: "2,450 mm" },
      { label: "Ground clearance", value: "185 mm" },
      { label: "Boot space", value: "391 L petrol / 225 L Hy-CNG Duo" },
      { label: "Fuel tank", value: "37 L petrol; 60 L water-equivalent CNG" },
      { label: "Claimed efficiency", value: "Up to 21.1 kmpl petrol / 27.1 km/kg CNG" },
    ],
    sourceUrl: "https://www.hyundai.com/in/en/find-a-car/exter/highlights",
  }),
  venue: detail({
    overview:
      "VENUE is a compact SUV for buyers who want a manageable city size without giving up engine choice, connected technology or a confident highway feel.",
    idealFor: "Urban professionals and young families who want a flexible petrol or diesel compact SUV.",
    performance: [
      "1.2L petrol makes 83 PS and 114.7 Nm with a 5-speed manual for relaxed daily use.",
      "1.0L turbo GDi petrol makes 120 PS and 172 Nm, with manual or 7-speed DCT options on selected trims.",
      "1.5L CRDi diesel delivers 116 PS and 250 Nm for long-distance efficiency, with manual or automatic options.",
    ],
    safety: [
      "6 airbags, ESC, VSM, hill-start assist and ABS with EBD are standard safety essentials.",
      "Rear camera, TPMS, ISOFIX anchors and a tyre mobility kit/full-size spare vary with the trim.",
      "Selected variants add a 360-degree camera and advanced parking aids.",
    ],
    interior: [
      "Five-seat cabin with rear AC vents, rear window sunshades and useful small-item storage.",
      "Higher trims add leatherette upholstery, a power driver seat and an electric sunroof.",
      "350-litre boot is sized for regular weekend luggage and daily errands.",
    ],
    exterior: [
      "Signature parametric grille, LED lighting and a strong shoulder line give the VENUE a grown-up SUV presence.",
      "Alloy wheels, roof rails, dual-tone roof choices and Knight styling depend on version.",
    ],
    infotainment: [
      "Touchscreen infotainment with Android Auto and Apple CarPlay; connectivity format varies by system and trim.",
      "Hyundai Bluelink, voice recognition, digital cluster and premium audio are offered higher in the range.",
    ],
    comfort: [
      "Automatic climate control, wireless charger, cruise control and keyless entry are offered on selected versions.",
      "Choose manual for a lower entry price or automatic/DCT for traffic-heavy commutes.",
    ],
    variants: [
      "HX trims span the 1.2 petrol, turbo-petrol and diesel range.",
      "Powertrain and gearbox availability changes by trim; the turbo DCT and diesel automatic sit higher in the lineup.",
      "Knight and dual-tone editions add appearance-led choices where offered.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "3,995 × 1,770 × 1,645 mm" },
      { label: "Wheelbase", value: "2,500 mm" },
      { label: "Ground clearance", value: "Up to 190 mm (variant dependent)" },
      { label: "Boot space", value: "350 L" },
      { label: "Fuel tank", value: "45 L" },
      { label: "Claimed efficiency", value: "Up to 18.4 kmpl petrol / 23.7 kmpl diesel" },
    ],
    sourceUrl: "https://www.hyundai.com/in/en/find-a-car/venue/highlights",
  }),
  "venue-n-line": detail({
    overview:
      "VENUE N Line gives the compact SUV a more expressive edge with a turbo-petrol heart, N-specific detailing and a more engaging driving character.",
    idealFor: "Drivers who want compact-SUV practicality with sportier looks and a turbo-petrol response.",
    performance: [
      "1.0L turbo GDi petrol produces 120 PS and 172 Nm.",
      "Choose a 6-speed manual or 7-speed DCT; DCT versions add paddle shifters for manual control on demand.",
      "N Line-specific suspension and steering calibration aim for a more connected feel.",
    ],
    safety: [
      "6 airbags, ESC, VSM, hill-start assist, ABS with EBD and ISOFIX anchors provide the core protection suite.",
      "Rear camera, TPMS and parking aids are equipped according to variant.",
    ],
    interior: [
      "All-black N Line cabin with red accents, N-branded seats and a leather-wrapped steering wheel.",
      "Rear AC vents and a 350-litre boot retain the regular VENUE's everyday practicality.",
    ],
    exterior: [
      "N Line grille, red exterior accents, side skirts, sporty bumper treatment and twin-tip exhaust styling.",
      "Exclusive alloy-wheel and paint combinations help distinguish it from the standard VENUE.",
    ],
    infotainment: [
      "Touchscreen infotainment, Android Auto/Apple CarPlay, Bluelink and digital driver display are available by trim.",
      "Bose audio and voice-enabled features are offered on higher N Line versions.",
    ],
    comfort: [
      "Electric sunroof, automatic climate control, wireless charger and cruise control are available on higher trims.",
      "DCT suits traffic and quick highway overtakes; manual is the more hands-on option.",
    ],
    variants: [
      "N6 and N8 are the principal N Line grades; availability can change with Hyundai updates.",
      "Both manual and DCT choices should be compared for feature mix as well as driving preference.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "3,995 × 1,770 × 1,645 mm" },
      { label: "Wheelbase", value: "2,500 mm" },
      { label: "Boot space", value: "350 L" },
      { label: "Fuel tank", value: "45 L" },
      { label: "Power / torque", value: "120 PS / 172 Nm" },
      { label: "Claimed efficiency", value: "Up to 18.2 kmpl" },
    ],
    sourceUrl: "https://www.hyundai.com/in/en/find-a-car/venue-n-line/highlights",
  }),
  creta: detail({
    overview:
      "CRETA combines a spacious five-seat cabin, a broad powertrain choice and the technology buyers expect from a modern mid-size SUV. It is the balanced choice for commuting, family duty and regular highway travel.",
    idealFor: "Families who want a versatile five-seat SUV with a wide range of engine and automatic choices.",
    performance: [
      "1.5L MPi petrol: 115 PS / 143.8 Nm with 6-speed manual or IVT.",
      "1.5L turbo GDi petrol: 160 PS / 253 Nm with 7-speed DCT for the strongest acceleration.",
      "1.5L CRDi diesel: 116 PS / 250 Nm with 6-speed manual or 6-speed automatic for long-distance use.",
    ],
    safety: [
      "6 airbags, ESC, VSM, hill-start assist, all-wheel disc brakes and ISOFIX anchors form the core suite.",
      "Tyre pressure monitoring, front/rear parking sensors, rear camera and 360-degree camera are variant dependent.",
      "Hyundai SmartSense Level 2 ADAS is available on select higher variants.",
    ],
    adas: [
      "Forward Collision-Avoidance Assist, Lane Keeping Assist and Lane Following Assist.",
      "Smart Cruise Control with Stop & Go, Driver Attention Warning and High Beam Assist on eligible variants.",
      "Blind-Spot Collision Warning and Rear Cross-Traffic Collision-Avoidance Assist where equipped.",
    ],
    interior: [
      "Dual 10.25-inch displays, ambient lighting and premium upholstery create the high-tech cabin feel on upper trims.",
      "Ventilated front seats, rear AC vents and a 433-litre boot support everyday family use.",
      "Panoramic sunroof and power driver seat are available on selected versions.",
    ],
    exterior: [
      "Horizon LED positioning lamp/DRL treatment, distinctive grille and connected LED tail lamps define the look.",
      "17- or 18-inch alloy designs, roof rails and dual-tone choices vary by variant.",
    ],
    infotainment: [
      "10.25-inch touchscreen navigation, Bose 8-speaker system and Bluelink connected-car technology on higher variants.",
      "Android Auto, Apple CarPlay, voice recognition and over-the-air map/infotainment updates depend on trim.",
    ],
    comfort: [
      "Dual-zone automatic climate control, ventilated seats, rear sunshades and an electric parking brake are offered higher in the lineup.",
      "IVT is smooth for city traffic, diesel AT suits mile-eaters and turbo DCT is the performance choice.",
    ],
    variants: [
      "The range spans value, mid and high trims, including manual and automatic choices across petrol and diesel engines.",
      "Top versions add the panoramic sunroof, Bose audio, 360-degree camera and ADAS; compare the official feature chart before booking.",
      "Special and Knight editions may be available with unique cosmetic treatments.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "4,330 × 1,790 × 1,635 mm" },
      { label: "Wheelbase", value: "2,610 mm" },
      { label: "Ground clearance", value: "190 mm" },
      { label: "Boot space", value: "433 L" },
      { label: "Fuel tank", value: "50 L" },
      { label: "Claimed efficiency", value: "Up to 18.4 kmpl petrol / 21.8 kmpl diesel" },
    ],
    sourceUrl: "https://www.hyundai.com/in/en/find-a-car/creta/highlights",
  }),
  "creta-n-line": detail({
    overview:
      "CRETA N Line is the performance-led expression of the Creta: the same usable SUV package, sharpened with an exclusive cabin, bolder bodywork and a turbo-petrol-only drivetrain.",
    idealFor: "SUV buyers who value strong turbo performance and N Line visual character over diesel efficiency.",
    performance: [
      "1.5L turbo GDi petrol delivers 160 PS and 253 Nm.",
      "6-speed manual and 7-speed DCT choices are offered; DCT versions include paddle shifters.",
      "N Line-specific steering and suspension tuning are designed for a more engaging response.",
    ],
    safety: [
      "6 airbags, ESC, VSM, hill-start assist, all-wheel disc brakes and ISOFIX anchors.",
      "Parking sensors/camera, TPMS and 360-degree camera availability depend on the selected N Line variant.",
      "Level 2 Hyundai SmartSense ADAS is available on the higher grade.",
    ],
    adas: [
      "Forward Collision-Avoidance Assist, lane-support functions and Driver Attention Warning.",
      "Smart Cruise Control, Blind-Spot Collision Warning and Rear Cross-Traffic Collision-Avoidance Assist on equipped versions.",
    ],
    interior: [
      "All-black cabin with red inserts, N-branded seats, steering wheel, gear knob and metal pedals.",
      "Ventilated front seats, panoramic sunroof and 433-litre boot retain the regular Creta's usefulness.",
    ],
    exterior: [
      "N Line grille and bumpers, red accents, side skirts, rear diffuser and twin-tip exhaust styling.",
      "18-inch alloy wheels and exclusive colour choices give it a distinct stance.",
    ],
    infotainment: [
      "Dual 10.25-inch screens, Bose sound, Bluelink and connected navigation are available on upper trims.",
      "Wireless charger, voice commands and smartphone integration are offered according to variant.",
    ],
    comfort: [
      "Dual-zone climate control, power driver seat, ventilated seats and electric parking brake are offered higher in the range.",
      "Choose manual for maximum driver involvement or DCT for easy traffic use.",
    ],
    variants: [
      "N8 and N10 grades are offered with manual or DCT availability depending on the current line-up.",
      "N10 is the feature-led choice; compare its ADAS, camera and comfort equipment against N8 before deciding.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "4,330 × 1,790 × 1,635 mm" },
      { label: "Wheelbase", value: "2,610 mm" },
      { label: "Ground clearance", value: "190 mm" },
      { label: "Boot space", value: "433 L" },
      { label: "Power / torque", value: "160 PS / 253 Nm" },
      { label: "Claimed efficiency", value: "Up to 18.7 kmpl" },
    ],
    sourceUrl: "https://www.hyundai.com/in/en/find-a-car/creta-n-line/highlights",
  }),
  alcazar: detail({
    overview:
      "ALCAZAR adds a genuinely usable third row and premium road-trip comforts to Hyundai's SUV formula. Pick six seats for captain-chair comfort or seven seats for maximum passenger flexibility.",
    idealFor: "Growing families who need three rows, weekend luggage flexibility and a premium long-distance cabin.",
    performance: [
      "1.5L turbo GDi petrol: 160 PS / 253 Nm with 6-speed manual or 7-speed DCT.",
      "1.5L CRDi diesel: 116 PS / 250 Nm with 6-speed manual or 6-speed automatic.",
      "Drive and traction modes (Snow, Mud and Sand) help tailor throttle and traction response to conditions.",
    ],
    safety: [
      "6 airbags, ESC, VSM, hill-start assist, all-wheel disc brakes and ISOFIX anchors are key protections.",
      "360-degree camera, TPMS, front parking sensors and blind-view display are available on selected versions.",
      "Hyundai SmartSense Level 2 ADAS is offered on high variants.",
    ],
    adas: [
      "Forward Collision-Avoidance Assist, Lane Keeping Assist and Lane Following Assist.",
      "Smart Cruise Control with Stop & Go, High Beam Assist and Driver Attention Warning on equipped versions.",
      "Blind-Spot and rear cross-traffic collision warnings/assistance where fitted.",
    ],
    interior: [
      "Choose a 6-seat layout with second-row captain chairs or a 7-seat layout with bench seating.",
      "Ventilated front seats, third-row AC controls and 180-litre boot with all rows up.",
      "Seatback tables, a magnetic pad and available 8-way powered front seats make long journeys easier.",
    ],
    exterior: [
      "Dark chrome grille, quad-beam LED headlamps, H-shaped LED signatures and bridge-type roof rails.",
      "18-inch alloy wheels and Knight edition detailing are available on selected variants.",
    ],
    infotainment: [
      "Dual 10.25-inch displays, Bose premium audio, Bluelink and voice recognition are available higher in the range.",
      "Connected navigation, wireless charger and smartphone connectivity depend on selected trim.",
    ],
    comfort: [
      "Dual-zone climate control, panoramic sunroof, powered front seats and paddle shifters are available by variant.",
      "Diesel automatic is the relaxed highway choice; turbo DCT prioritises performance.",
    ],
    variants: [
      "Executive, Prestige, Corporate, Platinum and Signature grades are offered, with Knight editions on selected grades.",
      "Confirm whether your preferred trim has 6 or 7 seats and which powertrain/automatic combination it supports.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "4,560 × 1,800 × 1,710 mm" },
      { label: "Wheelbase", value: "2,760 mm" },
      { label: "Ground clearance", value: "200 mm" },
      { label: "Boot space", value: "180 L with third row up; expandable when folded" },
      { label: "Fuel tank", value: "50 L" },
      { label: "Claimed efficiency", value: "Up to 20.4 kmpl diesel / 16.2 kmpl petrol" },
    ],
    sourceUrl: "https://www.hyundai.com/in/en/find-a-car/alcazar/highlights",
  }),
  verna: detail({
    overview:
      "VERNA is the choice for buyers who prefer a low-slung sedan's ride, a large 528-litre boot and a genuinely quick turbo-petrol option without giving up modern safety technology.",
    idealFor: "Sedan buyers who value highway stability, rear-seat comfort and a large boot.",
    performance: [
      "1.5L MPi petrol: 115 PS / 143.8 Nm with 6-speed manual or IVT.",
      "1.5L turbo GDi petrol: 160 PS / 253 Nm with 6-speed manual or 7-speed DCT.",
      "Turbo DCT models add paddle shifters and deliver the strongest performance in the range.",
    ],
    safety: [
      "6 airbags, ESC, VSM, hill-start assist, ISOFIX anchors and TPMS provide core protection.",
      "All-wheel disc brakes, front parking sensors, rear camera and 360-degree camera availability differs by grade.",
      "Hyundai SmartSense Level 2 ADAS is offered on top versions.",
    ],
    adas: [
      "Forward Collision-Avoidance Assist, Lane Keeping Assist and Lane Following Assist.",
      "Smart Cruise Control with Stop & Go, Blind-Spot Collision Warning and Rear Cross-Traffic Collision-Avoidance Assist on equipped versions.",
    ],
    interior: [
      "Wide dashboard with dual integrated displays, switchable themes and soft-touch elements on higher variants.",
      "Ventilated front seats, front armrest, rear AC vents and generous 528-litre boot improve daily practicality.",
    ],
    exterior: [
      "Horizon LED positioning lamp, parametric grille and connected LED tail lamps give the VERNA a distinctive sedan profile.",
      "15- and 16-inch wheel options, sunroof and dual-tone paint availability depend on trim.",
    ],
    infotainment: [
      "10.25-inch infotainment/navigation, Bose audio, Bluelink and digital key are offered on higher variants.",
      "Android Auto, Apple CarPlay, wireless charging and voice recognition vary by feature grade.",
    ],
    comfort: [
      "Ventilated front seats, automatic climate control, electric sunroof, cruise control and remote engine start are available by trim.",
      "IVT is city-friendly; the turbo DCT is for buyers seeking a faster, more engaging sedan.",
    ],
    variants: [
      "The MPi range focuses on comfort and efficiency; turbo grades add the performance drivetrain and sportier wheels.",
      "Top variants bring the full ADAS, camera and premium audio feature set. Ask for a live trim-wise feature comparison.",
    ],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "4,535 × 1,765 × 1,475 mm" },
      { label: "Wheelbase", value: "2,670 mm" },
      { label: "Ground clearance", value: "165 mm" },
      { label: "Boot space", value: "528 L" },
      { label: "Fuel tank", value: "45 L" },
      { label: "Claimed efficiency", value: "Up to 20.6 kmpl" },
    ],
    sourceUrl: "https://www.hyundai.com/in/en/find-a-car/verna/highlights",
  }),
  aura: detail({
    overview:
      "AURA delivers compact-sedan value with a large 402-litre boot, easy city dimensions and a factory CNG option for buyers focused on running costs.",
    idealFor: "Value-led sedan buyers, daily commuters and owners who need a practical boot.",
    performance: [
      "1.2L Kappa petrol makes 83 PS and 114 Nm, with 5-speed manual or Smart Auto AMT.",
      "Factory-fitted CNG provides a lower-running-cost alternative with 69 PS and 95.2 Nm.",
      "AMT is the easier choice for city traffic; manual gives buyers direct gearbox control.",
    ],
    safety: [
      "6 airbags, ABS with EBD, ESC, VSM and hill-start assist are available across the range as specified by Hyundai.",
      "ISOFIX anchors, rear camera, rear parking sensors and TPMS availability varies by trim.",
    ],
    interior: ["Five-seat cabin with rear AC vents, rear armrest and a substantial 402-litre boot.", "Higher trims add leatherette upholstery, cooled glovebox, adjustable rear headrests and a wireless charger."],
    exterior: ["Cascade grille, projector headlamps, LED DRLs and 15-inch diamond-cut alloy wheels are offered across selected variants.", "Compact proportions make the AURA simple to park while retaining a sedan boot."],
    infotainment: ["8-inch touchscreen with smartphone connectivity, Bluetooth and steering-mounted controls on selected versions.", "Digital cluster and Arkamys audio are available higher in the range."],
    comfort: ["Rear AC vents, automatic climate control, push-button start and cruise control are offered by variant.", "Factory CNG is best for predictable high-mileage use; petrol/AMT adds flexibility in stop-start traffic."],
    variants: ["Petrol manual, petrol AMT and CNG manual choices are distributed across E, S, SX and higher grades.", "Confirm boot space and feature availability when comparing petrol with CNG versions."],
    specifications: [
      { label: "Dimensions (L × W × H)", value: "3,995 × 1,680 × 1,520 mm" },
      { label: "Wheelbase", value: "2,450 mm" },
      { label: "Ground clearance", value: "165 mm" },
      { label: "Boot space", value: "402 L" },
      { label: "Fuel tank", value: "37 L petrol" },
      { label: "Claimed efficiency", value: "Up to 20.1 kmpl petrol / 26.4 km/kg CNG" },
    ],
    warranty: "3 years / 100,000 km (whichever comes first) standard Hyundai warranty. Extended warranty plans may be available; ask Modi Hyundai to confirm the current terms for your variant.",
    sourceUrl: "https://www.hyundai.com/in/en/find-a-car/aura/highlights",
  }),
  "grand-i10-nios": detail({
    overview: "GRAND i10 NIOS makes city driving feel easy while still giving a five-seat cabin, rear AC vents and Hyundai's factory CNG option. It is a strong all-round hatchback for everyday ownership.",
    idealFor: "First-time car owners and small families wanting an easy-to-own premium hatchback.",
    performance: ["1.2L Kappa petrol produces 83 PS and 114 Nm with 5-speed manual or Smart Auto AMT.", "Hy-CNG Duo offers 69 PS and 95.2 Nm with twin underfloor cylinders to preserve boot usability.", "Compact size and light controls make it suited to dense city roads and parking."],
    safety: ["6 airbags, ABS with EBD, ESC, VSM and hill-start assist are available as specified by Hyundai across the range.", "ISOFIX anchors, rear parking sensors, rear camera and TPMS are feature/variant dependent."],
    interior: ["Five-seat cabin with segment-first rear AC vents and a 260-litre boot.", "Higher trims bring leatherette upholstery, cooled glovebox, rear USB charging and adjustable rear headrests."],
    exterior: ["Cascading grille, swept-back headlamps, LED DRLs and diamond-cut alloy wheels on selected grades.", "VIBE editions and paint choices add more visual character where offered."],
    infotainment: ["8-inch touchscreen, Android Auto, Apple CarPlay and wireless phone charging are available on suitable trims.", "Digital display, Bluetooth and steering-wheel controls support daily use."],
    comfort: ["Rear AC vents, automatic climate control, keyless entry and cruise control are offered by version.", "AMT is the low-effort traffic choice; CNG is aimed at high-mileage cost savings."],
    variants: ["Petrol manual is offered from Era through Asta; petrol AMT and CNG manual are available on selected grades.", "Sportz, Sportz (O) and VIBE versions should be compared for infotainment and style equipment."],
    specifications: [{ label: "Dimensions (L × W × H)", value: "3,815 × 1,680 × 1,520 mm" }, { label: "Wheelbase", value: "2,450 mm" }, { label: "Ground clearance", value: "165 mm" }, { label: "Boot space", value: "260 L" }, { label: "Fuel tank", value: "37 L petrol" }, { label: "Claimed efficiency", value: "Up to 20.3 kmpl petrol / 25.4 km/kg CNG" }],
    warranty: "3 years / 100,000 km (whichever comes first) standard Hyundai warranty. Extended warranty plans may be available; ask Modi Hyundai to confirm the current terms for your variant.",
    sourceUrl: "https://www.hyundai.com/in/en/find-a-car/grand-i10-nios/highlights",
  }),
  i20: detail({
    overview: "i20 gives buyers a premium hatchback experience with bold styling, a composed cabin and technology usually expected a class above. It is practical enough for daily use and polished enough for the highway.",
    idealFor: "Hatchback buyers who prioritise premium features, design and everyday flexibility.",
    performance: ["1.2L Kappa petrol produces 83 PS and 114.7 Nm.", "Choose a 5-speed manual or IVT automatic; the IVT is especially suited to daily traffic.", "170 mm ground clearance offers useful confidence over typical urban obstacles."],
    safety: ["6 airbags, ESC, VSM, hill-start assist, ABS with EBD and ISOFIX anchors are central safety features.", "Rear camera, TPMS and parking sensors are supplied according to selected trim."],
    interior: ["Five-seat cabin with a layered dashboard, leatherette upholstery options and 311-litre boot.", "Electric sunroof, ambient lighting and a digital instrument cluster are offered on high variants."],
    exterior: ["Parametric jewel-pattern grille, LED headlamps/DRLs and a strong tailgate treatment define the i20.", "16-inch alloy wheels, dual-tone roof and Knight edition styling vary by trim."],
    infotainment: ["10.25-inch touchscreen with navigation, Bose sound and Bluelink connected-car technology on higher grades.", "Android Auto, Apple CarPlay, wireless charger and voice recognition availability varies by variant."],
    comfort: ["Automatic climate control, cruise control, electric sunroof and keyless entry are offered on selected trims.", "Manual is the value-led choice; IVT keeps city driving smooth and relaxed."],
    variants: ["Manual and IVT options are available across the i20 range, from value-focused to feature-rich grades.", "Top trims add the premium audio, larger screens and sunroof; verify the current feature matrix before booking."],
    specifications: [{ label: "Dimensions (L × W × H)", value: "3,995 × 1,775 × 1,505 mm" }, { label: "Wheelbase", value: "2,580 mm" }, { label: "Ground clearance", value: "170 mm" }, { label: "Boot space", value: "311 L" }, { label: "Fuel tank", value: "37 L" }, { label: "Claimed efficiency", value: "Up to 20.35 kmpl" }],
    warranty: "3 years / 100,000 km (whichever comes first) standard Hyundai warranty. Extended warranty plans may be available; ask Modi Hyundai to confirm the current terms for your variant.",
    sourceUrl: "https://www.hyundai.com/in/en/find-a-car/i20/highlights",
  }),
  "i20-n-line": detail({
    overview: "i20 N Line makes the premium hatchback more playful with a turbo-petrol engine, sporty N detailing and a choice of manual or DCT transmission.",
    idealFor: "Enthusiasts who want an everyday hatchback with more performance and visual attitude.",
    performance: ["1.0L turbo GDi petrol produces 120 PS and 172 Nm.", "6-speed manual and 7-speed DCT options are available; DCT adds paddle shifters.", "N Line suspension and exhaust tuning are designed for a more engaging drive."],
    safety: ["6 airbags, ESC, VSM, hill-start assist, ABS with EBD and ISOFIX anchors.", "Rear camera, TPMS and parking sensors are offered according to variant."],
    interior: ["All-black N Line interior with red accents, N-badged seats, steering wheel and metal pedals.", "Five seats and 311-litre boot keep it practical despite its sportier focus."],
    exterior: ["N Line grille, chequered flag-inspired styling details, red accents, side skirts and twin-tip exhaust treatment.", "16-inch alloy wheels and dual-tone colours add to the performance-hatch look."],
    infotainment: ["10.25-inch touchscreen, Bose sound, Bluelink and navigation are available on upper versions.", "Smartphone connectivity, voice recognition and wireless charging depend on grade."],
    comfort: ["Electric sunroof, automatic climate control, cruise control and wireless charger are available higher in the range.", "Choose manual for the most interactive drive or DCT for two-pedal convenience."],
    variants: ["N6 and N8 are the main grades; manual and DCT availability differs by grade and current line-up.", "N8 is normally the richer equipment choice—request a live feature sheet for exact equipment."],
    specifications: [{ label: "Dimensions (L × W × H)", value: "3,995 × 1,775 × 1,505 mm" }, { label: "Wheelbase", value: "2,580 mm" }, { label: "Ground clearance", value: "170 mm" }, { label: "Boot space", value: "311 L" }, { label: "Power / torque", value: "120 PS / 172 Nm" }, { label: "Claimed efficiency", value: "Up to 18.2 kmpl" }],
    warranty: "3 years / 100,000 km (whichever comes first) standard Hyundai warranty. Extended warranty plans may be available; ask Modi Hyundai to confirm the current terms for your variant.",
    sourceUrl: "https://www.hyundai.com/in/en/find-a-car/i20-n-line/highlights",
  }),
  "ioniq-5": detail({
    overview: "IONIQ 5 is Hyundai's flagship electric SUV: a dedicated EV architecture, an exceptionally long wheelbase and ultra-fast charging wrapped in its distinctive pixel-inspired design.",
    idealFor: "Premium EV buyers who want a spacious lounge-like cabin, fast-charge capability and long-range touring ability.",
    performance: ["84 kWh liquid-cooled lithium-ion battery and rear-mounted permanent magnet synchronous motor produce 168 kW (228.5 PS).", "Single-speed reduction gear and rear-wheel drive deliver smooth, immediate EV response.", "10–80% DC charging is claimed in 18 minutes with a compatible 350 kW charger; 11 kW AC 10–100% takes about 7 hours 35 minutes."],
    safety: ["6 airbags, multi-collision avoidance brake, 360-degree Surround View Monitor and Blind-Spot View Monitor.", "Battery protection structure, high-strength passenger cell and electronic stability systems support EV safety.", "Tyre mobility kit replaces a conventional spare wheel."],
    adas: ["Hyundai SmartSense Level 2 ADAS with 22 features on the current model.", "Forward Collision-Avoidance Assist, Lane Following Assist, Smart Cruise Control and blind-spot support functions."],
    interior: ["Flat-floor E-GMP cabin, sliding centre console, relaxation front seats and eco-processed materials.", "Five seats, 527-litre rear boot and 57-litre front trunk create flexible storage.", "Fixed vision roof and long 3,000 mm wheelbase maximise the sense of space."],
    exterior: ["Parametric pixel LED headlamps/tail lamps, clamshell bonnet and flush door handles.", "20-inch aero alloy wheels and retro-futuristic proportions set it apart from conventional SUVs."],
    infotainment: ["Dual 12.3-inch digital displays, Bose 8-speaker audio and navigation.", "Bluelink, voice recognition, wireless phone charging and smartphone integration are included as specified by Hyundai."],
    comfort: ["Vehicle-to-Load (V2L) provides AC power from the car for compatible devices.", "Power-adjustable relaxation seats, dual-zone climate control and rear sunshades enhance long journeys."],
    variants: ["IONIQ 5 is offered as a premium, highly equipped rear-wheel-drive EV in India.", "Confirm the current model year, battery capacity, paint and accessory package with Modi Hyundai before booking."],
    specifications: [{ label: "Dimensions (L × W × H)", value: "4,655 × 1,890 × 1,625 mm" }, { label: "Wheelbase", value: "3,000 mm" }, { label: "Battery / motor", value: "84 kWh / PMSM, rear-wheel drive" }, { label: "Claimed range", value: "Up to 690 km (ARAI, current 84 kWh model)" }, { label: "Boot / frunk", value: "527 L / 57 L" }, { label: "DC charge (10–80%)", value: "About 18 min with 350 kW charger" }],
    warranty: evWarranty,
    sourceUrl: "https://www.hyundai.com/in/en/find-a-car/ioniq-5/highlights",
  }),
  "creta-electric": detail({
    overview: "CRETA Electric pairs the familiar Creta SUV package with silent EV response, two battery choices and a strong mix of connected technology, V2L functionality and ADAS on selected versions.",
    idealFor: "Buyers moving to their first family EV who want a practical SUV size and clear battery-range options.",
    performance: ["42 kWh battery: 99 kW (135 PS), MIDC range up to 420 km.", "51.4 kWh long-range battery: 126 kW (171 PS), MIDC range up to 510 km.", "Both use an IPMSM motor, single-speed reduction gear and selectable regenerative braking via paddles."],
    safety: ["6 airbags, ABS with EBD, ESC, VSM, hill-start/descent control, TPMS and front/rear disc brakes are standard.", "360-degree camera with dynamic guidelines, dashcam and additional parking support are offered on selected variants.", "Battery systems are liquid cooled and packaged within the protected floor structure."],
    adas: ["Level 2 ADAS includes Forward Collision-Avoidance Assist, Lane Keeping Assist and Lane Following Assist.", "Smart Cruise Control with Stop & Go is offered on Excellence variants as specified by Hyundai.", "Blind-Spot and rear cross-traffic assist features are available on equipped versions."],
    interior: ["Granite Grey/Dark Navy cabin, floating centre console and eco-friendly leatherette upholstery.", "Five seats, 433-litre boot and 22-litre frunk for charging cables or small bags.", "Ventilated front seats, panoramic sunroof and rear wireless charger are offered by variant."],
    exterior: ["Pixelated closed grille, quad-beam LED headlamps, horizon lighting and aero alloy wheels.", "Knight versions add blacked-out details, black alloys and unique interior/exterior accents."],
    infotainment: ["Dual 10.25-inch digital displays, Bluelink, JioSaavn, in-car payments and OTA navigation/infotainment updates.", "Bose 8-speaker audio, digital key and wireless Android Auto/Apple CarPlay are available by version."],
    comfort: ["V2L, shift-by-wire column selector, dual-zone climate control and voice-enabled panoramic sunroof.", "Charge at home using portable equipment/wallbox options or use CCS2 public DC charging for fast top-ups."],
    variants: ["42 kWh: Executive, Executive Tech, Premium, Excellence and Excellence Knight.", "51.4 kWh long range: Executive (O) LR, ESmart (O) LR, Excellence LR and Excellence LR Knight.", "Compare battery, ADAS, charging equipment and comfort upgrades—not only stated range—before selecting a variant."],
    specifications: [{ label: "Dimensions (L × W × H)", value: "4,340 × 1,790 × 1,655 mm" }, { label: "Wheelbase", value: "2,610 mm" }, { label: "Battery options", value: "42 kWh / 51.4 kWh" }, { label: "Claimed range", value: "420 km / 510 km (MIDC)" }, { label: "Boot / frunk", value: "433 L / 22 L" }, { label: "DC charge (10–80%)", value: "About 39 min with compatible >100 kW DC charger" }],
    warranty: evWarranty,
    sourceUrl: "https://www.hyundai.com/in/en/find-a-car/creta-electric/highlights",
  }),
  "prime-hb": detail({
    overview: "PRIME HB is Hyundai's fleet-focused hatchback solution, built around a factory CNG powertrain, practical cabin and an ownership proposition designed for predictable high-mileage work.",
    idealFor: "Taxi and fleet operators seeking a compact, low-running-cost Hyundai hatchback.",
    performance: ["1.2L bi-fuel petrol/CNG engine with 5-speed manual transmission.", "Factory CNG supports lower fuel costs for predictable daily routes and high annual mileage.", "Compact size helps in congested pickup, drop-off and parking locations."],
    safety: ["Core occupant protection, ABS with EBD, rear parking sensors and mandatory safety equipment apply as per the commercial specification.", "Confirm final airbag and feature count against the current Prime HB quotation, as fleet equipment differs from retail NIOS trims."],
    interior: ["Five-seat fleet-friendly cabin with durable, easy-care trim and 260-litre luggage space.", "Straightforward controls are designed for frequent, multi-driver use."],
    exterior: ["Compact hatchback body makes the Prime HB easy to manoeuvre in dense urban operating conditions.", "Available paint choices depend on commercial stock and regional approval."],
    infotainment: ["Audio/connectivity equipment varies by fleet configuration; confirm exact fitment before purchase.", "Prioritise required operational accessories such as GPS, charging points or taxi equipment with the dealer."],
    comfort: ["Air-conditioning and practical cabin space support long working shifts.", "Manual gearbox keeps the package simple for common fleet operating conditions."],
    variants: ["Prime HB is a commercial CNG hatchback offering; equipment and registration requirements are fleet-specific.", "Ask Modi Hyundai for a commercial quotation covering maintenance, insurance and delivery commitments."],
    specifications: [{ label: "Dimensions (L × W × H)", value: "3,815 × 1,680 × 1,520 mm" }, { label: "Wheelbase", value: "2,450 mm" }, { label: "Seating", value: "5" }, { label: "Boot space", value: "260 L" }, { label: "Fuel", value: "Petrol + factory CNG" }, { label: "Claimed CNG efficiency", value: "Up to 25.4 km/kg" }],
    warranty: "Commercial-vehicle warranty and maintenance terms can differ from retail models. Modi Hyundai will confirm the current Prime HB coverage in your fleet quotation.",
    sourceUrl: "https://www.hyundai.com/in/en/find-a-car/grand-i10-nios/highlights",
  }),
  "prime-sd": detail({
    overview: "PRIME SD is the fleet-oriented compact sedan choice, pairing factory CNG running costs with a large 402-litre boot for luggage, airport transfers and everyday commercial work.",
    idealFor: "Taxi and fleet owners who need sedan luggage space and CNG operating economics.",
    performance: ["1.2L bi-fuel petrol/CNG engine with 5-speed manual transmission.", "Factory-fitted CNG is designed for lower day-to-day fuel costs on high-mileage routes.", "Compact-sedan proportions balance manoeuvrability with a more useful luggage compartment."],
    safety: ["Core safety equipment, ABS with EBD and rear parking assistance apply according to the current commercial specification.", "Check the approved Prime SD equipment list, including airbags, before confirming a fleet order."],
    interior: ["Five-seat cabin with fleet-oriented durable trim and a 402-litre boot.", "Rear-seat space and boot capacity are key advantages for passenger and luggage duty."],
    exterior: ["Compact-sedan silhouette gives a more formal appearance while retaining easy city manoeuvrability.", "Commercial paint and accessory choices depend on available stock."],
    infotainment: ["Audio/connectivity features vary by fleet build; confirm exact equipment before ordering.", "Modi Hyundai can advise on approved accessories for tracking, charging and passenger convenience."],
    comfort: ["Air-conditioning and sedan rear-seat space support extended operating hours.", "Manual transmission keeps servicing and operating routines straightforward."],
    variants: ["Prime SD is a commercial CNG sedan offering with equipment and registration requirements tailored to fleet use.", "Request a fleet quote that includes service support, insurance, accessories and commercial delivery timeline."],
    specifications: [{ label: "Dimensions (L × W × H)", value: "3,995 × 1,680 × 1,520 mm" }, { label: "Wheelbase", value: "2,450 mm" }, { label: "Seating", value: "5" }, { label: "Boot space", value: "402 L" }, { label: "Fuel", value: "Petrol + factory CNG" }, { label: "Claimed CNG efficiency", value: "Up to 26.4 km/kg" }],
    warranty: "Commercial-vehicle warranty and maintenance terms can differ from retail models. Modi Hyundai will confirm the current Prime SD coverage in your fleet quotation.",
    sourceUrl: "https://www.hyundai.com/in/en/find-a-car/aura/highlights",
  }),
};

export function getCarDetail(car: Car): CarDetail {
  const researched = carDetails[car.slug];
  if (researched) return researched;

  const isElectric = car.category === "Electric";
  return detail({
    overview: `${car.blurb} This guide brings the core ownership facts together so you can compare the Hyundai ${car.name} on space, efficiency, powertrain choice and everyday equipment before a test drive.`,
    idealFor: `${car.type} buyers looking for a Hyundai that matches their driving needs, budget and preferred fuel type.`,
    performance: [
      `${car.engine}.`,
      `Transmission choices: ${car.transmission}.`,
      `${isElectric ? "Range and charging time depend on battery choice, charger output, state of charge and conditions." : `Claimed efficiency: ${car.mileage}.`}`,
    ],
    safety: [
      "Safety equipment varies by variant; ask for the latest Hyundai feature chart and a trim-wise quotation.",
      "Confirm the exact airbag count, stability-control features, camera and parking-assistance equipment on your preferred version.",
      "ISOFIX and tyre-pressure monitoring availability should be checked if these are important to your family use.",
    ],
    interior: [
      `${car.seating}-seat layout with ${car.bootSpace} of quoted luggage space.`,
      "Request a showroom walkaround to compare seat comfort, rear-room and storage with your regular passengers and luggage.",
    ],
    exterior: [
      `${car.type} body style with the colour choices shown above.`,
      "Paint, wheel design and exterior lighting vary by selected variant and may change with Hyundai's current line-up.",
    ],
    infotainment: [
      "Screen size, smartphone integration, connected-car functions and audio system vary by trim.",
      "Have the advisor demonstrate the exact infotainment system on the version you are considering.",
    ],
    comfort: [
      "Compare manual and automatic options against your daily traffic, highway distance and driving preference.",
      "Check climate control, rear ventilation, cruise control and convenience features on the current variant chart.",
    ],
    variants: [
      `Available powertrains: ${car.engine}.`,
      `Available transmissions: ${car.transmission}.`,
      "Colour and feature availability is subject to selected variant and current stock. Modi Hyundai can prepare a side-by-side comparison.",
    ],
    specifications: [
      { label: "Seating", value: car.seating },
      { label: "Fuel", value: car.fuel },
      { label: "Engine / motor", value: car.engine },
      { label: "Transmission", value: car.transmission },
      { label: "Mileage / range", value: car.mileage },
      { label: "Boot space", value: car.bootSpace },
    ],
    warranty: isElectric ? evWarranty : passengerCarWarranty,
    sourceUrl: `https://www.hyundai.com/in/en/find-a-car/${car.slug}/highlights`,
  });
}

const galleryLabels = [
  "Front three-quarter",
  "Side profile",
  "Exterior angle",
  "Exterior angle",
  "Rear three-quarter",
  "Rear profile",
];

const officialAsset = (path: string) => `https://www.hyundai.com${path}`;

/* Curated manufacturer images from each Hyundai India model page. These add
   cabin, technology, boot and feature detail to the separate 360° gallery. */
const modelFeatureGallery: Record<string, GalleryImage[]> = {
  exter: [
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Exter/booking-open/interior-banner.jpg"), alt: "Hyundai Exter interior and dashboard", label: "Interior" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Exter/booking-open/spacious-boot.jpg"), alt: "Hyundai Exter boot space", label: "Boot space" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Exter/booking-open/dashcam.jpg"), alt: "Hyundai Exter dual-camera dashcam feature", label: "Dashcam" },
  ],
  venue: [
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/pre-booking/venueinteriorimg-pc.jpg"), alt: "Hyundai Venue dashboard and front cabin", label: "Dashboard" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/pre-booking/venue_2nd-row-spacious-cabin.jpg"), alt: "Hyundai Venue rear-seat cabin", label: "Rear seats" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/pre-booking/dual-curved-panoramic-displays.jpg"), alt: "Hyundai Venue connected displays", label: "Displays" },
  ],
  "venue-n-line": [
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/interior-banner.jpg"), alt: "Hyundai Venue N Line sports interior", label: "N Line interior" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/steering-wheel.jpg"), alt: "Hyundai Venue N Line steering wheel", label: "Steering wheel" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/interior-gear-hift-knob.jpg"), alt: "Hyundai Venue N Line gear selector", label: "Gear selector" },
  ],
  creta: [
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/knightking/cretakingdashboard.jpg"), alt: "Hyundai Creta dashboard", label: "Dashboard" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/Hyundai-creta-suv-highlight-small-800x530-2-infotainment%20&%20Cluster%20screen.jpg"), alt: "Hyundai Creta infotainment and driver display", label: "Infotainment" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Creta/Highlights/Hyundai-creta-suv-highlight-small-800x530-3-leather%20seats.jpg"), alt: "Hyundai Creta leather seat upholstery", label: "Seats" },
  ],
  "creta-n-line": [
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/creta-n-line-interior.jpg"), alt: "Hyundai Creta N Line sports cabin", label: "N Line interior" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinescoopseats.jpg"), alt: "Hyundai Creta N Line seats", label: "N Line seats" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/pc/cretanlineinterior.jpg"), alt: "Hyundai Creta N Line dashboard", label: "Dashboard" },
  ],
  alcazar: [
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Gallery/alcazargallerybig1.jpg"), alt: "Hyundai Alcazar cabin", label: "Cabin" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Alcazar/booking-open/tech-passenger-seat-walk-in.jpg"), alt: "Hyundai Alcazar passenger seat walk-in feature", label: "Seat walk-in" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Alcazar/Gallery/alcazargallerybig5.jpg"), alt: "Hyundai Alcazar lifestyle detail", label: "Lifestyle" },
  ],
  verna: [
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Verna/Interior/dashboard.jpg"), alt: "Hyundai Verna dashboard", label: "Dashboard" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Verna/Interior/leatherette-seat-upholstery.jpg"), alt: "Hyundai Verna leatherette seats", label: "Seats" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Verna/Interior/d_cut-steering-wheel.jpg"), alt: "Hyundai Verna steering wheel", label: "Steering wheel" },
  ],
  aura: [
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Aura/gallery/pc/auragallerypc_1.jpg"), alt: "Hyundai Aura exterior and cabin showcase", label: "Showcase" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Aura/gallery/pc/auragallerypc_2.jpg"), alt: "Hyundai Aura interior feature", label: "Interior" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Aura/gallery/pc/auragallerypc_3.jpg"), alt: "Hyundai Aura feature detail", label: "Feature detail" },
  ],
  "grand-i10-nios": [
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Gallery%20Section/big/pc/niosgallery_1.jpg"), alt: "Hyundai Grand i10 Nios exterior and cabin", label: "Showcase" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Gallery%20Section/big/pc/niosgallery_2.jpg"), alt: "Hyundai Grand i10 Nios interior", label: "Interior" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Highlights/Grandi10niosnew/nios-vibe-interior.jpg"), alt: "Hyundai Grand i10 Nios cabin", label: "Cabin" },
  ],
  i20: [
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20interiordashbig1.jpg"), alt: "Hyundai i20 dashboard", label: "Dashboard" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20knightallblackseats.jpg"), alt: "Hyundai i20 black seat upholstery", label: "Seats" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20galleryb_1.jpg"), alt: "Hyundai i20 feature showcase", label: "Feature detail" },
  ],
  "i20-n-line": [
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/knight/i20nlinegallery7.jpg"), alt: "Hyundai i20 N Line feature showcase", label: "N Line detail" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/pc/i20-n-linesmallgallery_1.jpg"), alt: "Hyundai i20 N Line cabin", label: "Cabin" },
  ],
  "ioniq-5": [
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/ioniq-5/highlights/feature-collage-1.jpg"), alt: "Hyundai Ioniq 5 cabin and technology", label: "Cabin & tech" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/ioniq-5/highlights/feature-collage-2.jpg"), alt: "Hyundai Ioniq 5 interior feature showcase", label: "Interior features" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/ioniq-5/highlights/vehicle-to-load.jpg"), alt: "Hyundai Ioniq 5 Vehicle-to-Load feature", label: "Vehicle-to-Load" },
  ],
  "creta-electric": [
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/creta-electric/highlights/gallery/1120x600_040-058-Overall-Interior-Layout-1st-Row-Dashboard_FR03.jpg"), alt: "Hyundai Creta Electric dashboard and front cabin", label: "Dashboard" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/creta-electric/highlights/gallery/1120x600_044B-222-Connected-Screens-Angle_FR01.jpg"), alt: "Hyundai Creta Electric connected screens", label: "Connected screens" },
    { src: officialAsset("/content/dam/hyundai/in/en/data/find-a-car/creta-electric/highlights/gallery/1120x600_128-164-6-Airbags_FR05.jpg"), alt: "Hyundai Creta Electric six-airbag safety feature", label: "Safety feature" },
  ],
};

const brochurePathBySlug: Record<string, string> = {
  exter: "/content/dam/hyundai/in/en/data/brochure/exter.pdf",
  venue: "/content/dam/hyundai/in/en/data/brochure/venue.pdf",
  "venue-n-line": "/content/dam/hyundai/in/en/data/brochure/venue-n-line.pdf",
  creta: "/content/dam/hyundai/in/en/data/brochure/creta.pdf",
  "creta-n-line": "/content/dam/hyundai/in/en/data/brochure/creta-n-line.pdf",
  alcazar: "/content/dam/hyundai/in/en/data/brochure/alcazar.pdf",
  verna: "/content/dam/hyundai/in/en/data/brochure/verna.pdf",
  aura: "/content/dam/hyundai/in/en/data/brochure/aura.pdf",
  "grand-i10-nios": "/content/dam/hyundai/in/en/data/brochure/grand-i10-nios.pdf",
  i20: "/content/dam/hyundai/in/en/data/brochure/i20.pdf",
  "i20-n-line": "/content/dam/hyundai/in/en/data/brochure/i20-n-line.pdf",
  "ioniq-5": "/content/dam/hyundai/in/en/data/brochure/ioniq-5.pdf",
  "creta-electric": "/content/dam/hyundai/in/en/data/brochure/creta-ev.pdf",
};

export function getCarBrochure(car: Car) {
  const path = brochurePathBySlug[car.slug];
  return path ? officialAsset(path) : undefined;
}

/* Genuine Hyundai 360-degree exterior frames. This gallery has independent
   state in the page component, so it never changes the selected paint. */
export function getCarGallery(car: Car): GalleryImage[] {
  const source = car.colors[0]?.image;
  const exterior = !source || !/_\d+\.png$/.test(source)
    ? [{ src: car.image, alt: car.alt, label: "Exterior" }]
    : [6, 0, 12, 18, 24, 30].map((frame, index) => ({
    src: source.replace(/_\d+\.png$/, `_${frame}.png`),
    alt: `${car.alt}, ${galleryLabels[index].toLowerCase()} view`,
    label: galleryLabels[index],
  }));

  return [...exterior, ...(modelFeatureGallery[car.slug] ?? [])];
}
