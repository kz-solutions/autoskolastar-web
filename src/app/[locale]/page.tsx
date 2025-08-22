import Header from "@/components/sections/header/Header";
import Hero from "@/components/sections/hero/Hero";
import LicenseCategories from "@/components/sections/license-categories/LicenseCategories";
import StepsToGettingALicense from "@/components/sections/steps-to-getting-a-license/StepsToGettingALicense";
import ContactAndLocation from "@/components/sections/contact-and-location/ContactAndLocation";
import BetterExperience from "@/components/sections/better-experience/BetterExperience";
import Footer from "@/components/sections/footer/Footer";

export default function HomePage() {
  return (
    <div className={"w-full flex flex-col items-center justify-center"}>
      <Header />
      <Hero />
      <LicenseCategories />
      <StepsToGettingALicense />
      <BetterExperience />
      <ContactAndLocation />
      <Footer />
    </div>
  );
}
