import Hero from "@/components/sections/hero/Hero";
import LicenseCategories from "@/components/sections/license-categories/LicenseCategories";
import StepsToGettingALicense from "@/components/sections/steps-to-getting-a-license/StepsToGettingALicense";
import ContactAndLocation from "@/components/sections/contact-and-location/ContactAndLocation";
import WhyChooseUs from "@/components/sections/why-choose-us/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LicenseCategories />
      <StepsToGettingALicense />
      <WhyChooseUs />
      <ContactAndLocation />
    </>
  );
}
