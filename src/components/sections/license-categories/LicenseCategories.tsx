"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { StarIcon } from "@/icons/Star";
import Label from "@/components/core/Label";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

interface Category {
  title: string;
  group: string;
  description: string;
  price: string;
  href: string;
}

const LicenseCategories = () => {
  const t = useTranslations("HomePage.LicenseCategories");
  


  return (
    <section id="services" className="bg-white px-4 sm:px-6 lg:px-12 py-32">
      <div className="max-w-[1320px] mx-auto w-full">
        {/* Header Section */}
        <header className="text-center mb-24">
          {/* Mobile */}
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

          <h1 className="text-heading_lg sm:text-heading_xl text-neutral-800 mb-6 sm:mb-8 px-4">
            {t.rich("title", {
              primary: (chunks) => (
                <span className="text-primary-500">{chunks}</span>
              ),
            })}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-4xl mx-auto leading-relaxed px-4">
            {t("subtitle")}
          </p>
        </header>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left side - 2 cards */}
          <div className="lg:col-span-3 space-y-6">
            {t.raw("leftCategories").map((category: Category, index: number) => {
              const imageMap = ['/images/drivers-licence/caterogy_d.png', '/images/drivers-licence/category_c.png'];
              return (
              <div key={category.title} className=" px-5 py-8 flex flex-col">
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
                <h3 className="text-heading_sm text-neutral-800 mb-2">
                  <span className="font-bold">{category.title}</span>
                  <span className="font-normal"> {category.group}</span>
                </h3>
                <p className="text-sm text-neutral-600 mb-4 leading-relaxed flex-grow">
                  {category.description}
                </p>
                <div className="text-lg text-gray-700 mb-3">
                  {category.price}
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
          <div className="lg:col-span-3">
            <div className="p-6 h-full flex flex-col">
              <div className="bg-neutral-100 rounded-lg h-96 w-full mb-4 overflow-hidden">
                <Image
                  src="/images/drivers-licence/category_a.png"
                  alt={t("centerLeftCategory.title")}
                  width={400}
                  height={384}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-heading_sm text-neutral-800 mb-2">
                <span className="font-bold">
                  {t("centerLeftCategory.title")}
                </span>
                <span className="font-normal">
                  {" "}
                  {t("centerLeftCategory.group")}
                </span>
              </h3>
              <p className="text-sm text-neutral-600 mb-4 leading-relaxed flex-grow">
                {t("centerLeftCategory.description")}
              </p>
              <div className="text-lg text-gray-700 mb-3">
                {t("centerLeftCategory.price")}
              </div>
              <Link 
                href={t("centerLeftCategory.href")} 
                prefetch={true}
                className="w-1/2 bg-primary-600 text-white py-2 px-4 rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium inline-block text-center"
              >
                {t("findOutMore")}
              </Link>
            </div>
          </div>

          {/* Center-right - 1 card */}
          <div className="lg:col-span-3">
            <div className="p-6 h-full flex flex-col">
              <div className="bg-neutral-100 rounded-lg h-96 w-full mb-4 overflow-hidden">
                <Image
                  src="/images/drivers-licence/category_b.png"
                  alt={t("centerRightCategory.title")}
                  width={400}
                  height={384}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-heading_sm text-neutral-800 mb-2">
                <span className="font-bold">
                  {t("centerRightCategory.title")}
                </span>
                <span className="font-normal">
                  {" "}
                  {t("centerRightCategory.group")}
                </span>
              </h3>
              <p className="text-sm text-neutral-600 mb-4 leading-relaxed flex-grow">
                {t("centerRightCategory.description")}
              </p>
              <div className="text-lg text-gray-700 mb-3">
                {t("centerRightCategory.price")}
              </div>
              <Link 
                href={t("centerRightCategory.href")} 
                prefetch={true}
                className="w-1/2 bg-primary-600 text-white py-2 px-4 rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium inline-block text-center"
              >
                {t("findOutMore")}
              </Link>
            </div>
          </div>

          {/* Right side - 2 cards */}
          <div className="lg:col-span-3 space-y-6">
            {t.raw("rightCategories").map((category: Category, index: number) => {
              const imageMap = ['/images/drivers-licence/category_t.png', '/images/drivers_training.png'];
              return (
              <div key={category.title} className="p-6 flex flex-col">
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
                <h3 className="text-heading_sm text-neutral-800 mb-2">
                  <span className="font-bold">{category.title}</span>
                  <span className="font-normal"> {category.group}</span>
                </h3>
                <p className="text-sm text-neutral-600 mb-4 leading-relaxed flex-grow">
                  {category.description}
                </p>
                <div className="text-lg text-gray-700 mb-3">
                  {category.price}
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
