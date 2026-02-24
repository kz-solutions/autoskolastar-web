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

  const props = {
    t,
    matchPrice,
  };

  return (
    <section
      id="services"
      className="bg-white px-8 lg:px-12 pb-20! md:pb-24! lg:pb-32! pt-0!"
    >
      <div className="max-w-[1440px] mx-auto w-full">
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
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-4 lg:gap-x-6 lg:gap-8 items-stretch">
          {/* Left side - 2 cards */}
          <CategorySection side={"left"} {...props} />

          {/* Center-left - 1 card */}
          <MainCategory side={"left"} {...props} />
          {/* Center-right - 1 card */}
          <MainCategory side={"right"} {...props} />

          {/* Right side - 2 cards */}
          <CategorySection side={"right"} {...props} />
        </div>
      </div>
    </section>
  );
};

const MainCategory = ({
  t,
  matchPrice,
  side,
}: {
  t: ReturnType<typeof useTranslations>;
  matchPrice: (code: string) => string;
  side: "left" | "right";
}) => {
  const imageSrc = {
    left: "/images/drivers-licence/category_a.png",
    right: "/images/drivers-licence/category_b.png",
  };

  const namespace = {
    left: "centerLeftCategory",
    right: "centerRightCategory",
  };

  const order = {
    left: "max-md:row-start-0 max-md:row-end-1 max-md:col-start-1 max-md:col-end-3",
    right:
      "max-md:row-start-1 max-md:row-end-2 max-md:col-start-1 max-md:col-end-3",
  };

  return (
    <div
      className={`${order[side]} lg:col-span-3 max-sm:py-4 max-lg:py-6 w-full h-full grid grid-flow-col grid-cols-1 gap-y-2 grid-rows-[minmax(0,1fr)_min-content_auto_min-content_min-content]`}
    >
      <div className="bg-neutral-100 rounded-lg w-full mb-4 xl:mb-0 overflow-hidden h-64 md:h-96 xl:max-h-[28rem] lg:h-full">
        <Image
          src={imageSrc[side]}
          alt={t(`${namespace[side]}.title`)}
          width={400}
          height={384}
          priority
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-heading_sm flex flex-col text-neutral-800 mb-2">
        <span className="font-bold">{t(`${namespace[side]}.title`)}</span>
        <span className="font-normal text-2xl">
          {t(`${namespace[side]}.group`)}
        </span>
      </h3>
      <p className="text-sm text-neutral-600 leading-relaxed col-span-3 line-clamp-4 h-full min-h-[4lh]">
        {t(`${namespace[side]}.description`)}
      </p>

      <div className="text-lg text-gray-700 col-span-3">
        {matchPrice(t(`${namespace[side]}.code`))}
      </div>
      <Link
        href={t(`${namespace[side]}.href`)}
        prefetch={true}
        className="w-1/2 col-span-3 bg-primary-600 text-white py-2 px-4 rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium inline-block text-center mt-auto whitespace-nowrap"
      >
        {t("findOutMore")}
      </Link>
    </div>
  );
};

const CategoryCard = ({
  category,
  imageSrc,
  matchPrice,
  t,
}: {
  category: Category;
  imageSrc: string;
  matchPrice: (code: string) => string;
  t: ReturnType<typeof useTranslations>;
}) => {
  return (
    <div
      key={category.title}
      className="h-full mb-0 grid grid-flow-col grid-cols-1 gap-y-2 grid-rows-[minmax(0,1fr)_min-content_auto_min-content]"
    >
      <div className="bg-neutral-100 rounded-lg h-32 xl:h-full xl:max-h-44 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={category.title}
          width={300}
          height={128}
          priority
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-heading_sm flex flex-col text-neutral-800">
        <span className="font-bold min-h-[1lh]">{category.title}</span>
        <span className="font-normal text-2xl min-h-[1lh]">
          {category.group}
        </span>
      </h3>
      <div className="text-lg text-gray-700 mb-3 mt-auto">
        {matchPrice(category.code)}
      </div>
      <Link
        href={category.href}
        prefetch={true}
        className="w-1/2 bg-primary-600 text-white py-2 px-4 rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium inline-block text-center whitespace-nowrap"
      >
        {t("findOutMore")}
      </Link>
    </div>
  );
};

const CategorySection = ({
  side,
  ...rest
}: {
  side: "left" | "right";
  t: ReturnType<typeof useTranslations>;
  matchPrice: (code: string) => string;
}) => {
  const namespace = {
    left: "leftCategories",
    right: "rightCategories",
  };
  const imageMap = {
    left: [
      "/images/drivers-licence/category_d.png",
      "/images/drivers-licence/category_c.png",
    ],
    right: [
      "/images/drivers-licence/category_t.png",
      "/images/drivers_training.png",
    ],
  };

  const { t } = rest;

  return (
    <div className="col-span-2 grid grid-cols-2 gap-x-4 lg:gap-x-6 lg:gap-y-6 lg:col-span-3 space-y-6 lg:grid-flow-col lg:grid-rows-[1fr_1fr] lg:grid-cols-1 max-md:mb-4">
      {t.raw(namespace[side]).map((category: Category, index: number) => {
        return (
          <CategoryCard
            key={category.title}
            category={category}
            imageSrc={imageMap[side][index]}
            {...rest}
          />
        );
      })}
    </div>
  );
};

export default LicenseCategories;
