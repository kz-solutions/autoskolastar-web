import Navbar from "@/components/core/Navbar";
import { HomePageScrollInit } from "@/components/core/HomePageScrollInit";
import Hero from "@/components/sections/hero/Hero";
import LicenseCategories from "@/components/sections/license-categories/LicenseCategories";
import StepsToGettingALicense from "@/components/sections/steps-to-getting-a-license/StepsToGettingALicense";
import ContactAndLocation from "@/components/sections/contact-and-location/ContactAndLocation";
import Footer from "@/components/core/Footer";
import WhyChooseUs from "@/components/sections/why-choose-us/WhyChooseUs";

export default function HomePage() {
  return (
    <div className={"w-full flex flex-col items-center justify-center"}>
      <HomePageScrollInit />
      <Navbar />
      <Hero />
      <LicenseCategories />
      <StepsToGettingALicense />
      <WhyChooseUs />
      <ContactAndLocation />
      <Footer />
    </div>
  );
}
