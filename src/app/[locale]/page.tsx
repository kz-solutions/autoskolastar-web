import StepsToGettingALicense from "@/components/sections/steps-to-getting-a-license/StepsToGettingALicense";
import ContactAndLocation from "@/components/sections/contact-and-location/ContactAndLocation";
import BetterExperience from "@/components/sections/better-experience/BetterExperience";

export default function HomePage() {
  return (
    <div className={"w-screen flex flex-col items-center justify-center"}>
      <StepsToGettingALicense />
      <BetterExperience />
      <ContactAndLocation />
    </div>
  );
}
