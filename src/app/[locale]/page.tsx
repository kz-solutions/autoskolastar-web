import Hero from "@/components/sections/hero/Hero";
import LicenseCategories from "@/components/sections/license-categories/LicenseCategories";
import StepsToGettingALicense from "@/components/sections/steps-to-getting-a-license/StepsToGettingALicense";
import ContactAndLocation from "@/components/sections/contact-and-location/ContactAndLocation";
import WhyChooseUs from "@/components/sections/why-choose-us/WhyChooseUs";
import { registerGSAP } from "@/utils/gsap";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

registerGSAP();

type Params = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
      shortcut: "/favicon.ico",
    },
    alternates: {
      languages: {
        cs: "/cs",
        en: "/en",
      },
    },
    manifest: "/site.webmanifest",
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
  };
}

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
