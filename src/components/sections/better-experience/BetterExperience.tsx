"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { StarIcon } from "@/icons/Star";
import Label from "@/components/core/Label";
import Image from "next/image";

const BetterExperience = () => {
  const t = useTranslations("HomePage.BetterExperience");

  return (
    <section className="bg-[#181D27] px-4 sm:px-6 lg:px-12 py-32">
      <div className="max-w-[1320px] mx-auto">
        {/* Header Section */}
        <header className="text-center mb-24">
          <div className="lg:hidden mb-6">
            <div className="flex items-center justify-center space-x-3">
              <StarIcon className="text-primary-500 w-4 h-4" />
              <span className="text-sm text-primary-500 uppercase tracking-widest">
                {t("slogan")}
              </span>
              <StarIcon className="text-primary-500 w-4 h-4" />
            </div>
          </div>

          {/* Desktop */}
          <Label text={t("slogan")} />

          <h2 className="text-heading_md sm:text-heading_lg text-white mb-6 sm:mb-8 px-4">
            {t.rich("title", {
              primary: (chunks) => (
                <span className="text-primary-500">{chunks}</span>
              ),
            })}
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 max-w-4xl mx-auto leading-relaxed px-4">
            {t("description")}
          </p>
        </header>

        {/* Features Section */}
        <div className="space-y-16 sm:space-y-24 lg:space-y-32">
          {t.raw("features").map((feature: any, index: number) => (
            <div
              key={feature.number}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Text Content */}
              <div
                className={`space-y-4 sm:space-y-6 px-4 lg:px-0 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
              >
                <div className="text-primary-500 text-3xl sm:text-4xl font-bold">
                  {feature.number}
                </div>
                <h3 className="text-heading_sm sm:text-heading_md text-white leading-tight">
                  {feature.title}
                </h3>
                <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Feature Image */}
              <div
                className={`px-4 lg:px-0 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}
              >
                <div className="bg-neutral-800 rounded-lg h-64 sm:h-72 lg:h-80 w-full relative overflow-hidden shadow-lg">
                  <Image
                    src={`/images/better-experience/whyus_${index + 1}.png`}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BetterExperience;
