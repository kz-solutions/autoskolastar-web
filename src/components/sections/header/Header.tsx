"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { StarIcon } from "@/icons/Star";

const Header = () => {
  const t = useTranslations("HomePage.Header");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm w-full">

      {/* Main header */}
      <div className="w-full px-4 sm:px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <StarIcon className="text-primary-500 w-8 h-8" />
            <span className="text-2xl font-bold text-neutral-800">Autoškola STAR</span>
          </div>

          {/* Desktop Navigation - only 3 items */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a 
              href="#home" 
              className="text-primary-500 font-semibold hover:text-primary-600 transition-colors"
            >
              {t("home")}
            </a>
            <a 
              href="#services" 
              className="text-neutral-700 hover:text-primary-500 transition-colors"
            >
              {t("services")}
            </a>
            <a 
              href="#contact" 
              className="text-neutral-700 hover:text-primary-500 transition-colors"
            >
              {t("contact")}
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-neutral-700 hover:text-primary-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-neutral-200">
            <nav className="flex flex-col space-y-4 pt-4">
              <a 
                href="#home" 
                className="text-primary-500 font-semibold hover:text-primary-600 transition-colors"
              >
                {t("home")}
              </a>
              <a 
                href="#services" 
                className="text-neutral-700 hover:text-primary-500 transition-colors"
              >
                {t("services")}
              </a>
              <a 
                href="#contact" 
                className="text-neutral-700 hover:text-primary-500 transition-colors"
              >
                {t("contact")}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
