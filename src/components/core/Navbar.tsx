"use client";

import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { StarIcon } from "@/icons/Star";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LangSwitch from "@/components/core/LangSwitch";
import { Link } from "@/i18n/navigation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Navbar = () => {
  const t = useTranslations("HomePage.Header");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);

  const navbarRef = useRef<HTMLDivElement | null>(null);
  const scope = useRef<HTMLDivElement | null>(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);

  useGSAP(
    () => {
      if (!navbarRef.current) return;

      let lastPos = 0;
      let hasScrolled = {
        down: 0,
        up: 0,
      };
      let isInit = false;

      const show = () => {
        setShouldHide(false);
        return gsap.to(navbarRef.current, {
          y: "0%",
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const hide = () => {
        setShouldHide(true);
        return gsap.to(navbarRef.current, {
          y: "-100%",
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      const JITTER = 2;
      const HIDE_AFTER = 160;
      const SHOW_AFTER = 40;

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate(self) {
          if (!navbarRef.current) return;

          const currentPos = self.scroll();
          let delta = currentPos - lastPos;

          if (!isInit) {
            delta = 0;
            isInit = true;
          }

          if (currentPos <= 0) {
            hasScrolled.down = 0;
            hasScrolled.up = 0;
            show();
            lastPos = currentPos;
            return;
          }

          if (delta > JITTER) {
            hasScrolled.up = 0;
            hasScrolled.down += Math.abs(delta);
            if (hasScrolled.down >= HIDE_AFTER) {
              hide();
              hasScrolled.down = 0;
            }
          } else if (delta < JITTER) {
            hasScrolled.down = 0;
            hasScrolled.up += Math.abs(delta);
            if (hasScrolled.up >= SHOW_AFTER) {
              show();
              hasScrolled.up = 0;
            }
          }

          lastPos = currentPos;
        },
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className={"bg-black absolute top-0 left-0 right-0 z-50"}>
      <header
        ref={navbarRef}
        className="bg-white shadow-sm w-full fixed top-0 z-50 will-change-transform"
      >
        {/* Main header */}
        <div className="w-full px-4 sm:px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <StarIcon className="text-primary-500 w-8 h-8" />
              <span className="text-2xl font-bold text-neutral-800">
                Autoškola STAR
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <LangSwitch shouldClose={shouldHide} />
              <a
                href="#home"
                className="text-primary-500 font-semibold hover:text-primary-600"
              >
                {t("home")}
              </a>
              <a
                href="#services"
                className="text-neutral-700 hover:text-primary-500"
              >
                {t("services")}
              </a>
              <a
                href="#contact"
                className="text-neutral-700 hover:text-primary-500"
              >
                {t("contact")}
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-neutral-700 hover:text-primary-500 transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div
              id="mobile-nav"
              className="lg:hidden mt-4 pb-4 border-t border-neutral-200"
            >
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
    </div>
  );
};

export default Navbar;
