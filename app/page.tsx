import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import TestDrive from "@/components/TestDrive";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Locations from "@/components/Locations";
import HomeSeoContent from "@/components/HomeSeoContent";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <TrustStrip />
        <FeaturedVehicles />
        <TestDrive />
        <HomeSeoContent />
        <Services />
        <Testimonials />
        <FAQ />
        <Locations />
      </main>
    </>
  );
}
