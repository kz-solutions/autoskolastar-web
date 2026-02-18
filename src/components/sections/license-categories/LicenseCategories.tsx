"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { StarIcon } from "@/icons/Star";
import Label from "@/components/core/Label";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useStartingPriceTemplate } from "@/utils/common";

interface Category {
  title: string;
  group: string;
  description: string;
  code: string;
  href: string;
}

const LicenseCategories = () => {
  const t = useTranslations("HomePage.LicenseCategories");
  const [pricing, setPricing] = useState<
    Array<{ category_code: string; min_price: number }>
  >([]);

  useEffect(() => {
    const loadPricing = async () => {
      const res = await fetch("/api/pricing-categories/starting-prices");
      const data = await res.json();
      setPricing(data);
    };

    loadPricing();
  }, []);

  const formatStartingPrice = useStartingPriceTemplate();

  const matchPrice = (code: string) =>
    formatStartingPrice(
      pricing.find(({ category_code }) => category_code === code)?.min_price ??
        0,
    );

  return (
    <section
      id="services"
      className="bg-white px-10 lg:px-12 pb-20! md:pb-24! lg:pb-32! pt-0!"
    >
      <div className="max-w-[1320px] mx-auto w-full">
        {/* Header Section */}
        <header className="text-center mb-8 sm:12 lg:mb-24">
          {/* Mobile */}
          <div className="lg:hidden mb-2 lg:mb-6">
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

          <h2 className="text-heading_lg sm:text-heading_xl text-neutral-800 mb-4 lg:mb-8 px-4">
            {t.rich("title", {
              primary: (chunks) => (
                <span className="text-primary-500">{chunks}</span>
              ),
            })}
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 max-w-4xl mx-auto leading-relaxed px-4">
            {t("subtitle")}
          </p>
        </header>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left side - 2 cards */}
          <div className="lg:col-span-3 space-y-6 flex flex-col">
            {t
              .raw("leftCategories")
              .map((category: Category, index: number) => {
                const imageMap = [
                  "/images/drivers-licence/caterogy_d.png",
                  "/images/drivers-licence/category_c.png",
                ];
                return (
                  <div
                    key={category.title}
                    className="sm:py-2 md:py-6 flex flex-col h-full"
                  >
                    <div className="bg-neutral-100 rounded-lg h-32 w-full mb-4 overflow-hidden">
                      <Image
                        src={imageMap[index]}
                        alt={category.title}
                        width={300}
                        height={128}
                        priority
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-heading_sm text-neutral-800 flex flex-col mb-2">
                      <span className="font-bold">{category.title}</span>
                      <span className="font-normal text-2xl">
                        {category.group}
                      </span>
                    </h3>
                    <div className="text-lg text-gray-700 mb-3 mt-auto">
                      {matchPrice(category.code)}
                    </div>
                    <Link
                      href={category.href}
                      prefetch={true}
                      className="w-1/2 bg-primary-600 text-white py-2 px-4 rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium inline-block text-center"
                    >
                      {t("findOutMore")}
                    </Link>
                  </div>
                );
              })}
          </div>

          {/* Center-left - 1 card */}
          <div className="lg:col-span-3 flex">
            <div className="sm:py-2 md:py-6 w-full flex flex-col h-full">
              <div className="bg-neutral-100 rounded-lg h-80 w-full mb-4 overflow-hidden">
                <Image
                  src="/images/drivers-licence/category_a.png"
                  alt={t("centerLeftCategory.title")}
                  width={400}
                  height={384}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-heading_sm flex flex-col text-neutral-800 mb-2">
                <span className="font-bold">
                  {t("centerLeftCategory.title")}
                </span>
                <span className="font-normal text-2xl">
                  {t("centerLeftCategory.group")}
                </span>
              </h3>
              <p className="text-sm text-neutral-600 mb-3 leading-relaxed flex-grow">
                {t("centerLeftCategory.description")}
              </p>
              <div className="text-lg text-gray-700 mb-3">
                {matchPrice(t("centerLeftCategory.code"))}
              </div>
              <Link
                href={t("centerLeftCategory.href")}
                prefetch={true}
                className="w-1/2 bg-primary-600 text-white py-2 px-4 rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium inline-block text-center mt-auto"
              >
                {t("findOutMore")}
              </Link>
            </div>
          </div>

          {/* Center-right - 1 card */}
          <div className="lg:col-span-3 flex">
            <div className="sm:py-2 md:py-6 w-full flex flex-col h-full">
              <div className="bg-neutral-100 rounded-lg h-80 w-full mb-4 overflow-hidden">
                <Image
                  src="/images/drivers-licence/category_b.png"
                  alt={t("centerRightCategory.title")}
                  width={400}
                  height={384}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-heading_sm flex flex-col  text-neutral-800 mb-2">
                <span className="font-bold">
                  {t("centerRightCategory.title")}
                </span>
                <span className="font-normal text-2xl">
                  {t("centerRightCategory.group")}
                </span>
              </h3>
              <p className="text-sm text-neutral-600 mb-3 leading-relaxed flex-grow">
                {t("centerRightCategory.description")}
              </p>
              <div className="text-lg text-gray-700 mb-3">
                {matchPrice(t("centerRightCategory.code"))}
              </div>
              <Link
                href={t("centerRightCategory.href")}
                prefetch={true}
                className="w-1/2 bg-primary-600 text-white py-2 px-4 rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium inline-block text-center mt-auto"
              >
                {t("findOutMore")}
              </Link>
            </div>
          </div>

          {/* Right side - 2 cards */}
          <div className="lg:col-span-3 space-y-6 flex flex-col">
            {t
              .raw("rightCategories")
              .map((category: Category, index: number) => {
                const imageMap = [
                  "/images/drivers-licence/category_t.png",
                  "/images/drivers_training.png",
                ];
                return (
                  <div
                    key={category.title}
                    className="sm:py-2 md:py-6 flex flex-col h-full"
                  >
                    <div className="bg-neutral-100 rounded-lg h-32 w-full mb-4 overflow-hidden">
                      <Image
                        src={imageMap[index]}
                        alt={category.title}
                        width={300}
                        height={128}
                        priority
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-heading_sm flex flex-col text-neutral-800 mb-2">
                      <span className="font-bold">{category.title}</span>
                      <span className="font-normal text-2xl">
                        {category.group}
                      </span>
                    </h3>
                    <div className="text-lg text-gray-700 mb-3 mt-auto">
                      {matchPrice(category.code)}
                    </div>
                    <Link
                      href={category.href}
                      prefetch={true}
                      className="w-1/2 bg-primary-600 text-white py-2 px-4 rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium inline-block text-center"
                    >
                      {t("findOutMore")}
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LicenseCategories;
