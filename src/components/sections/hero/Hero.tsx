"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Hero = () => {
  const t = useTranslations("HomePage.Hero");

  return (
    <section
      id="home"
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-x-clip"
    >
      <div className="relative w-[92vw] h-[85svh] max-h-[85vh] rounded-2xl overflow-hidden">
        <Image
          src="/images/hero_poster.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6 sm:px-10">
          <h1 className="text-white text-heading_lg sm:text-heading_xl leading-[1.1]">
            {t("line3Top")}
          </h1>
          <p className="mt-4 max-w-3xl text-white/90 text-base sm:text-lg leading-relaxed">
            {t("line3Bottom")}
          </p>
          <p className="mt-8 text-white text-heading_sm sm:text-heading_md font-medium">
            {t("locations")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-primary-700 active:bg-primary-800 transition-colors"
            >
              {t("ctaServices")}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 text-white font-semibold ring-1 ring-white/30 backdrop-blur hover:bg-white/15 transition-colors"
            >
              {t("ctaButton")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
