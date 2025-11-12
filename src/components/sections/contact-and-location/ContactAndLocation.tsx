"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

const ContactAndLocation = () => {
  const t = useTranslations("HomePage.ContactAndLocation");
  const [formData, setFormData] = useState({
    name: "",
    contact: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="contact" className="bg-gray-100 px-4 sm:px-8 lg:px-12 py-16 sm:py-24 lg:py-32">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start lg:items-center">
          {/* Left Column - Map and Location */}
          <div className="space-y-6 sm:space-y-8">
            {/* Map Component */}
            <div className="bg-gray-800 rounded-lg h-64 sm:h-72 lg:h-80 w-full relative overflow-hidden shadow-md">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center px-4">
                  <div className="text-xl sm:text-2xl font-bold mb-2">{t("mapPlaceholder")}</div>
                  <div className="text-sm text-gray-300">{t("mapSubtext")}</div>
                </div>
              </div>
            </div>
            
            {/* Location Info */}
            <div className="space-y-4 px-4 lg:px-0">
              <p className="text-sm sm:text-md text-primary-500 font-medium">
                {t("accessibilitySlogan")}
              </p>
              
              <h2 className="text-heading_md sm:text-heading_lg text-neutral-800 leading-tight">
                {t("mainHeading")}
              </h2>
              
              <p className="text-sm sm:text-md text-neutral-600 leading-relaxed">
                {t("description")}
              </p>
              
              <ul className="space-y-2 text-sm sm:text-md text-neutral-600">
                {t.raw("pickupLocations").map((location: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-500 mr-2 mt-0.5 text-xs">•</span>
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center">
              <div className="w-24 sm:w-32 md:w-64 lg:w-128 h-0.5 sm:h-1 bg-neutral-600 mx-auto mb-4"></div>
              <h2 className="text-heading_lg sm:text-heading_xl text-neutral-800 mb-4">{t("contactHeading")}</h2>
              <div className="w-24 sm:w-32 md:w-64 lg:w-128 h-0.5 sm:h-1 bg-neutral-600 mx-auto"></div>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary-500 mb-6 sm:mb-8 leading-tight max-w-md mx-auto px-4">
                {t("contactSubheading")}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-12 max-w-md mx-auto px-4 lg:px-0">
              <div>
                <label className="block text-sm sm:text-md font-bold text-neutral-700 mb-1 uppercase tracking-wide">
                  {t("nameLabel")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t("namePlaceholder")}
                  className="w-full px-4 py-3 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base placeholder-gray-400 placeholder:font-bold text-neutral-800 transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm sm:text-md font-bold text-neutral-700 mb-1 uppercase tracking-wide">
                  {t("contactLabel")}
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder={t("contactPlaceholder")}
                  className="w-full px-4 py-3 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base placeholder-gray-400 placeholder:font-bold text-neutral-800 transition-all duration-200"
                />
              </div>
              
              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#47525b] text-white px-6 sm:px-8 py-3 rounded-xl font-bold text-base hover:bg-[#3a4249] transition-all duration-200 shadow-md hover:shadow-lg"
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
