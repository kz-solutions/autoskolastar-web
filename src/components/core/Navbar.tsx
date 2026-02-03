"use client";

import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { StarIcon } from "@/icons/Star";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LangSwitch from "@/components/core/LangSwitch";
import { Link } from "@/i18n/navigation";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ImportantLink = {
  label: string;
  href?: string;
  external?: boolean;
  download?: boolean;
};

function parseImportantLinks(value: unknown): ImportantLink[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((v): v is Record<string, unknown> => typeof v === "object" && !!v)
    .map((v) => ({
      label: String(v.label ?? ""),
      href: typeof v.href === "string" ? v.href : undefined,
      external: typeof v.external === "boolean" ? v.external : undefined,
      download: typeof v.download === "boolean" ? v.download : undefined,
    }))
    .filter((v) => v.label.trim().length > 0);
}

function getImportantLinkMeta(item: ImportantLink) {
  const href = (item.href ?? "").trim();
  const disabled = href.length === 0;
  const external = item.external ?? href.startsWith("http");
  return { href, disabled, external };
}

function ImportantLinkItem({
  item,
  variant,
  role,
  onClick,
}: {
  item: ImportantLink;
  variant: "desktop" | "mobile";
  role?: React.AriaRole;
  onClick?: () => void;
}) {
  const { href, disabled, external } = getImportantLinkMeta(item);

  const baseClass =
    variant === "desktop"
      ? "block px-4 py-3 text-sm text-neutral-700"
      : "pl-4 py-2 text-neutral-700 transition-colors";

  const stateClass = disabled
    ? "opacity-50 cursor-not-allowed"
    : variant === "desktop"
      ? "hover:bg-neutral-50 hover:text-primary-600"
      : "hover:text-primary-500";

  if (disabled) {
    return (
      <span
        key={item.label}
        role={role}
        aria-disabled="true"
        className={`${baseClass} ${stateClass}`}
      >
        {item.label}
      </span>
    );
  }

  return (
    <a
      key={item.label}
      role={role}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      download={item.download}
      onClick={onClick}
      className={`${baseClass} ${stateClass}`}
    >
      {item.label}
    </a>
  );
}

const Navbar = () => {
  const t = useTranslations("HomePage.Header");
  useSmoothScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isImportantOpen, setIsImportantOpen] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);

  const navbarRef = useRef<HTMLDivElement | null>(null);
  const scope = useRef<HTMLDivElement | null>(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const importantLinks = parseImportantLinks(t.raw("importantLinks"));

  useGSAP(
    () => {
      if (!navbarRef.current) return;

      let lastPos = 0;
      const hasScrolled = {
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
            <Link
              href="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <StarIcon className="text-primary-500 w-8 h-8" />
              <span className="text-2xl font-bold text-neutral-800">
                Autoškola STAR
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <LangSwitch shouldClose={shouldHide} />
              <Link
                href="/#home"
                className="text-primary-500 font-semibold hover:text-primary-600"
              >
                {t("home")}
              </Link>
              <Link
                href="/#services"
                className="text-neutral-700 hover:text-primary-500"
              >
                {t("drivingLicenses")}
              </Link>
              <Link
                href="/cenik"
                className="text-neutral-700 hover:text-primary-500"
              >
                {t("pricing")}
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setIsImportantOpen(true)}
                onMouseLeave={() => setIsImportantOpen(false)}
              >
                <button
                  type="button"
                  className="text-neutral-700 hover:text-primary-500 inline-flex items-center gap-2"
                  aria-haspopup="menu"
                  aria-expanded={isImportantOpen}
                  onClick={() => setIsImportantOpen((s) => !s)}
                >
                  {t("important")}
                </button>

                {isImportantOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full w-64 pt-2"
                  >
                    <div className="rounded-xl border border-neutral-200 bg-white shadow-lg overflow-hidden">
                      {importantLinks.map((item) => (
                        <ImportantLinkItem
                          key={item.label}
                          role="menuitem"
                          item={item}
                          variant="desktop"
                          onClick={() => setIsImportantOpen(false)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/#contact"
                className="text-neutral-700 hover:text-primary-500"
              >
                {t("contact")}
              </Link>
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
                <Link
                  href="/#home"
                  onClick={closeMobileMenu}
                  className="text-primary-500 font-semibold hover:text-primary-600 transition-colors"
                >
                  {t("home")}
                </Link>
                <Link
                  href="/#services"
                  onClick={closeMobileMenu}
                  className="text-neutral-700 hover:text-primary-500 transition-colors"
                >
                  {t("drivingLicenses")}
                </Link>
                <Link
                  href="/cenik"
                  onClick={closeMobileMenu}
                  className="text-neutral-700 hover:text-primary-500 transition-colors"
                >
                  {t("pricing")}
                </Link>

                <details className="group">
                  <summary className="cursor-pointer list-none text-neutral-700 hover:text-primary-500 transition-colors flex items-center justify-between">
                    <span>{t("important")}</span>
                  </summary>
                  <div className="mt-2 flex flex-col">
                    {importantLinks.map((item) => (
                      <ImportantLinkItem
                        key={item.label}
                        item={item}
                        variant="mobile"
                        onClick={closeMobileMenu}
                      />
                    ))}
                  </div>
                </details>

                <Link
                  href="/#contact"
                  onClick={closeMobileMenu}
                  className="text-neutral-700 hover:text-primary-500 transition-colors"
                >
                  {t("contact")}
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
