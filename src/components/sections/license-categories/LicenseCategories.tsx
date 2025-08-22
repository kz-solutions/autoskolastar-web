"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { StarIcon } from "@/icons/Star";

interface Category {
  title: string;
  group: string;
  description: string;
  price: string;
}

const LicenseCategories = () => {
  const t = useTranslations("HomePage.LicenseCategories");

  return (
         <section className="bg-white px-4 sm:px-6 lg:px-12 py-32">
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
          <div className="hidden lg:block relative w-full mb-6">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4">
              <StarIcon className="text-primary-500 w-6 h-6" />
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
              <StarIcon className="text-primary-500 w-6 h-6" />
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-64 lg:w-96 h-0.5 bg-primary-500 opacity-20"></div>
              <span className="text-sm text-primary-500 uppercase tracking-widest mx-8 lg:mx-16">
                {t("slogan")}
              </span>
              <div className="w-64 lg:w-96 h-0.5 bg-primary-500 opacity-20"></div>
            </div>
          </div>
          
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
            {t.raw("leftCategories").map((category: Category, index: number) => (
              <div
                key={category.title}
                className=" px-5 py-8 flex flex-col"
              >
                <div className="bg-neutral-100 rounded-lg h-32 w-full mb-4 flex items-center justify-center">
                  <div className="text-neutral-400 text-center px-4">
                    <div className="text-sm font-medium mb-1">Image</div>
                    <div className="text-xs">Will be inserted here</div>
                  </div>
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
                <button className="w-1/2 bg-primary-600 text-white py-2 px-4 rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium">
                  {t("findOutMore")}
                </button>
              </div>
            ))}
          </div>

          {/* Center-left - 1 card */}
          <div className="lg:col-span-3">
            <div className="p-6 h-full flex flex-col">
              <div className="bg-neutral-100 rounded-lg h-96 w-full mb-4 flex items-center justify-center">
                <div className="text-neutral-400 text-center px-4">
                  <div className="text-base font-medium mb-2">Image</div>
                  <div className="text-xs">Will be inserted here</div>
                </div>
              </div>
              <h3 className="text-heading_sm text-neutral-800 mb-2">
                <span className="font-bold">{t("centerLeftCategory.title")}</span>
                <span className="font-normal"> {t("centerLeftCategory.group")}</span>
              </h3>
              <p className="text-sm text-neutral-600 mb-4 leading-relaxed flex-grow">
                {t("centerLeftCategory.description")}
              </p>
              <div className="text-lg text-gray-700 mb-3">
                {t("centerLeftCategory.price")}
              </div>
              <button className="w-1/2 bg-primary-600 text-white py-2 px-4 rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium">
                {t("findOutMore")}
              </button>
            </div>
          </div>

          {/* Center-right - 1 card */}
          <div className="lg:col-span-3">
            <div className="p-6 h-full flex flex-col">
              <div className="bg-neutral-100 rounded-lg h-96 w-full mb-4 flex items-center justify-center">
                <div className="text-neutral-400 text-center px-4">
                  <div className="text-base font-medium mb-2">Image</div>
                  <div className="text-xs">Will be inserted here</div>
                </div>
              </div>
              <h3 className="text-heading_sm text-neutral-800 mb-2">
                <span className="font-bold">{t("centerRightCategory.title")}</span>
                <span className="font-normal"> {t("centerRightCategory.group")}</span>
              </h3>
              <p className="text-sm text-neutral-600 mb-4 leading-relaxed flex-grow">
                {t("centerRightCategory.description")}
              </p>
              <div className="text-lg text-gray-700 mb-3">
                {t("centerRightCategory.price")}
              </div>
              <button className="w-1/2 bg-primary-600 text-white py-2 px-4 rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium">
                {t("findOutMore")}
              </button>
            </div>
          </div>

          {/* Right side - 2 cards */}
          <div className="lg:col-span-3 space-y-6">
            {t.raw("rightCategories").map((category: Category, index: number) => (
              <div
                key={category.title}
                className="p-6 flex flex-col"
              >
                <div className="bg-neutral-100 rounded-lg h-32 w-full mb-4 flex items-center justify-center">
                  <div className="text-neutral-400 text-center px-4">
                    <div className="text-sm font-medium mb-1">Image</div>
                    <div className="text-xs">Will be inserted here</div>
                  </div>
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
                <button className="w-1/2 bg-primary-600 text-white py-2 px-4 rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium">
                  {t("findOutMore")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LicenseCategories;
