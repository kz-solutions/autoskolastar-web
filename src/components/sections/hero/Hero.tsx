"use client";

import React from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Hero = () => {
  const t = useTranslations("HomePage.Hero");

  return (
         <section id="home" className="relative w-full min-h-[85svh] overflow-hidden">
       {/* 1) Gray background */}
       <div className="absolute inset-0 z-0 bg-gradient-to-r from-neutral-100 via-neutral-200 to-gray-400" />
 
       {/* 2) Grid lines via CSS */}
       <div className="absolute inset-0 z-[1] pointer-events-none">

         
         {/* Dashed lines - main horizontal */}
         <div className="absolute inset-0 opacity-40">
           {Array.from({ length: 6 }, (_, i) => (
             <div
               key={`dash-h-${i}`}
               className="absolute left-0 right-0 h-0.5 bg-white"
               style={{ 
                 top: `${15 + i * 35}%`,
                 background: 'repeating-linear-gradient(to right, white 0px, white 20px, transparent 20px, transparent 40px)'
               }}
             />
           ))}
         </div>
         
         {/* Dashed lines - main vertical */}
         <div className="absolute inset-0 opacity-40">
           {Array.from({ length: 8 }, (_, i) => (
             <div
               key={`dash-v-${i}`}
               className="absolute top-0 bottom-0 w-0.5 bg-white"
               style={{ 
                 left: `${10 + i * 12}%`,
                 background: 'repeating-linear-gradient(to bottom, white 0px, white 20px, transparent 20px, transparent 40px)'
               }}
             />
           ))}
         </div>
       </div>

       {/* Car image - positioned on the right */}
       <div className="absolute right-0 bottom-0 z-[2] pointer-events-none">
         <Image
           src="/images/herocar.png"
           alt="Modern car"
           width={800}
           height={600}
           priority
           className="
             w-[280px] sm:w-[350px] md:w-[450px] lg:w-[550px] xl:w-[650px] 
             h-auto object-contain
             transform translate-x-[10%] sm:translate-x-[5%] md:translate-x-0
           "
         />
       </div>

      {/* Content container */}
      <div className="relative z-10 w-full h-full px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-[1320px] mx-auto h-full">
          <div className="flex items-center h-full">
            {/* Left side - Text content */}
            <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 pl-0 lg:pl-8">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
