"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { StarIcon } from "@/icons/Star";

const Footer = () => {
  const t = useTranslations("HomePage.Footer");

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <StarIcon className="text-primary-500 w-6 h-6" />
              <span className="text-xl font-bold text-white">
                Autoškola STAR
              </span>
            </div>
            <p className="text-neutral-300 text-sm leading-relaxed mb-6">
              {t("companyDescription")}
            </p>
            <div className="space-y-2 text-sm text-neutral-300">
              <p>📧 {t("email")}</p>
              <p>📞 {t("phone")}</p>
              <p>📍 {t("address")}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#license-categories"
                  className="text-neutral-300 hover:text-primary-500 transition-colors text-sm"
                >
                  {t("drivingLicenses")}
                </a>
              </li>
              <li>
                <a
                  href="#steps"
                  className="text-neutral-300 hover:text-primary-500 transition-colors text-sm"
                >
                  {t("howToGetLicense")}
                </a>
              </li>
              <li>
                <a
                  href="#why-choose-us"
                  className="text-neutral-300 hover:text-primary-500 transition-colors text-sm"
                >
                  {t("whyChooseUs")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-neutral-300 hover:text-primary-500 transition-colors text-sm"
                >
                  {t("contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              {t("services")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#pricing"
                  className="text-neutral-300 hover:text-primary-500 transition-colors text-sm"
                >
                  {t("pricing")}
                </a>
              </li>
              <li>
                <a
                  href="#theory"
                  className="text-neutral-300 hover:text-primary-500 transition-colors text-sm"
                >
                  {t("theoryCourses")}
                </a>
              </li>
              <li>
                <a
                  href="#practical"
                  className="text-neutral-300 hover:text-primary-500 transition-colors text-sm"
                >
                  {t("practicalDriving")}
                </a>
              </li>
              <li>
                <a
                  href="#exams"
                  className="text-neutral-300 hover:text-primary-500 transition-colors text-sm"
                >
                  {t("exams")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              {t("support")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#faq"
                  className="text-neutral-300 hover:text-primary-500 transition-colors text-sm"
                >
                  {t("faq")}
                </a>
              </li>
              <li>
                <a
                  href="#help"
                  className="text-neutral-300 hover:text-primary-500 transition-colors text-sm"
                >
                  {t("help")}
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-neutral-300 hover:text-primary-500 transition-colors text-sm"
                >
                  {t("privacyPolicy")}
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-neutral-300 hover:text-primary-500 transition-colors text-sm"
                >
                  {t("termsOfService")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-neutral-400">
              © {new Date().getFullYear()} Autoškola STAR.{" "}
              {t("allRightsReserved")}
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-500 transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-500 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary-500 transition-colors"
              >
                <span className="sr-only">YouTube</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
