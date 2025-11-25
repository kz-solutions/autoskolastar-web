"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Label from "@/components/core/Label";
import { StarIcon } from "@/icons/Star";

const ContactAndLocation = () => {
  const t = useTranslations("HomePage.ContactAndLocation");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section id="contact" className="bg-white px-4 sm:px-6 lg:px-12 py-32">
      <div className="max-w-[1320px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Column - Map and Location */}
          <div className="space-y-8">
            {/* Map Component */}
            <div className="bg-neutral-100 rounded-xl h-64 sm:h-72 lg:h-80 w-full relative overflow-hidden border border-neutral-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4">
                  <div className="text-xl sm:text-2xl font-bold text-neutral-800 mb-2">
                    {t("mapPlaceholder")}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {t("mapSubtext")}
                  </div>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-primary-500 font-medium uppercase tracking-wide mb-3">
                  {t("accessibilitySlogan")}
                </p>

                <h2 className="text-heading_md sm:text-heading_lg text-neutral-800 mb-4 leading-tight">
                  {t("mainHeading")}
                </h2>

                <p className="text-base text-neutral-600 leading-relaxed mb-6">
                  {t("description")}
                </p>
              </div>

              <ul className="space-y-3">
                {t
                  .raw("pickupLocations")
                  .map((location: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-base text-neutral-700">
                        {location}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="space-y-8">
            {/* Header */}
            <header className="text-center">
              {/* Mobile */}
              <div className="lg:hidden mb-6">
                <div className="flex items-center justify-center space-x-3">
                  <StarIcon className="text-primary-500 w-4 h-4" />
                  <span className="text-sm text-primary-500 uppercase tracking-widest">
                    {t("contactHeading")}
                  </span>
                  <StarIcon className="text-primary-500 w-4 h-4" />
                </div>
              </div>

              {/* Desktop */}
              <Label text={t("contactHeading")} />

              <h2 className="text-heading_md sm:text-heading_lg text-neutral-800 mb-4 leading-tight">
                {t("contactSubheading")}
              </h2>
            </header>

            <form
              onSubmit={handleSubmit}
              className="space-y-8 max-w-md mx-auto px-4 lg:px-0"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold text-neutral-600 mb-3 uppercase tracking-wider"
                >
                  {t("nameLabel")}
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t("namePlaceholder")}
                  className="w-full px-5 py-4 bg-white border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-base placeholder-neutral-400 text-neutral-800 transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="contact"
                  className="block text-xs font-semibold text-neutral-600 mb-3 uppercase tracking-wider"
                >
                  {t("contactLabel")}
                </label>
                <input
                  id="contact"
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder={t("contactPlaceholder")}
                  className="w-full px-5 py-4 bg-white border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-base placeholder-neutral-400 text-neutral-800 transition-all duration-200"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-primary-700 active:bg-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {t("submitButton")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactAndLocation;
