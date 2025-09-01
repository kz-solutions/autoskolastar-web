"use client";

import React from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Hero = () => {
  const t = useTranslations("HomePage.Hero");

  return (
    <section id="home" className="w-full min-h-screen relative overflow-hidden">
      {/* Background image - full section background */}
      <div className="absolute inset-0">
        {/* Placeholder for background image - replace with your actual image */}
        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center"></div>

        {/* You can replace the placeholder above with your actual image like this: */}
        {/* <img 
          src="/your-car-image.jpg" 
          alt="Modern car background" 
          className="w-full h-full object-cover"
        /> */}
      </div>

      {/* Gradient overlay for right side */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-gray-800 to-transparent" />

      {/* Content container */}
      <div className="relative z-10 w-full h-full px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-[1320px] mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full">
            {/* Left side - Text content */}
            <div className="space-y-6 lg:space-y-8">
              {/* Main heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-800 leading-tight">
                {t("mainHeading")}
              </h1>

              {/* Locations */}
              <div className="text-3xl sm:text-2xl lg:text-3xl text-primary-600">
                {t("locations")}
              </div>

              {/* Description */}
              <p className="text-lg sm:text-xl lg:text-2xl text-neutral-700 leading-relaxed max-w-2xl">
                {t("description")}
              </p>

              {/* CTA Button */}
              <button className="bg-primary-600 text-white px-16 py-3 rounded-2xl hover:bg-primary-700 text-lg sm:text-xl font-semibold shadow-lg hover:shadow-xl">
                {t("ctaButton")}
              </button>
            </div>

            {/* Right side - empty space for visual balance */}
            <div className="hidden lg:block">
              {/* This side is intentionally empty to let the background image show through */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
