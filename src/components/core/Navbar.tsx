"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { StarIcon } from "@/icons/Star";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LangSwitch from "@/components/core/LangSwitch";
import { Link, usePathname } from "@/i18n/navigation";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { ROUTES } from "@/utils/routes";
import SubmenuController from "@/components/core/nav/SubmenuController";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NAV_LINKS: Array<{
  href: string;
  key: "drivingLicenses" | "pricing" | "contact";
  matchPath?: string;
}> = [
  { href: "/sluzby", key: "drivingLicenses", matchPath: "/sluzby" },
  { href: "/cenik", key: "pricing", matchPath: "/cenik" },
  { href: "/kontakt", key: "contact", matchPath: "/kontakt" },
];

const NAVBAR_SCROLL = {
  JITTER: 2,
  HIDE_AFTER: 160,
  SHOW_AFTER: 40,
} as const;

const MOBILE_MENU_ANIM = {
  OPEN: { duration: 0.3, ease: "power2.out" as const },
  CLOSE: { duration: 0.25, ease: "power2.in" as const },
} as const;

const DROPDOWN_ANIM = {
  OPEN: { duration: 0.2, ease: "power2.out" as const },
  CLOSE: { duration: 0.15, ease: "power2.in" as const },
} as const;

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
  const pathname = usePathname();
  useSmoothScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isImportantOpen, setIsImportantOpen] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);

  const navbarRef = useRef<HTMLDivElement | null>(null);
  const scope = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const importantDropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const importantLinks = parseImportantLinks(t.raw("importantLinks"));

  useMobileMenu(isMobileMenuOpen, closeMobileMenu);

  useGSAP(
    () => {
      const el = importantDropdownRef.current;
      if (!el) return;
      if (isImportantOpen) {
        gsap.fromTo(
          el,
          { opacity: 0, y: -8, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ...DROPDOWN_ANIM.OPEN,
          },
        );
      } else {
        gsap.to(el, {
          opacity: 0,
          y: -8,
          scale: 0.96,
          ...DROPDOWN_ANIM.CLOSE,
        });
      }
    },
    { dependencies: [isImportantOpen], scope },
  );

  useLayoutEffect(() => {
    if (mobileMenuRef.current) {
      gsap.set(mobileMenuRef.current, { height: 0, overflow: "hidden" });
    }
    if (importantDropdownRef.current) {
      gsap.set(importantDropdownRef.current, {
        opacity: 0,
        y: -8,
        scale: 0.96,
      });
    }
  }, []);

  useGSAP(
    () => {
      const el = mobileMenuRef.current;
      if (!el) return;
      if (isMobileMenuOpen) {
        gsap.to(el, {
          height: Math.min(el.scrollHeight, window.innerHeight - 64),
          overflow: "auto",
          ...MOBILE_MENU_ANIM.OPEN,
        });
      } else {
        gsap.to(el, {
          height: 0,
          overflow: "hidden",
          ...MOBILE_MENU_ANIM.CLOSE,
        });
      }
    },
    { dependencies: [isMobileMenuOpen], scope },
  );

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

          if (delta > NAVBAR_SCROLL.JITTER) {
            hasScrolled.up = 0;
            hasScrolled.down += Math.abs(delta);
            if (hasScrolled.down >= NAVBAR_SCROLL.HIDE_AFTER) {
              hide();
              hasScrolled.down = 0;
            }
          } else if (delta < NAVBAR_SCROLL.JITTER) {
            hasScrolled.down = 0;
            hasScrolled.up += Math.abs(delta);
            if (hasScrolled.up >= NAVBAR_SCROLL.SHOW_AFTER) {
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

  const LINKS = [
    {
      title: t("drivingLicenses"),
      submenuKey: "drivingLicenses",
      href: ROUTES.drivingLicenses,
    },
    {
      title: t("info"),
      submenuKey: "info",
      href: ROUTES.info,
    },
    {
      title: t("pricing"),
      href: ROUTES.pricing,
    },
    {
      title: t("fleet"),
      href: ROUTES.fleet,
    },
    {
      title: t("classrooms"),
      href: ROUTES.classrooms,
    },
  ];

  const CONTACT = {
    title: t("contact"),
    href: ROUTES.contact,
  };

  const [visibleSubmenu, setVisibleSubmenu] = useState<string | null>(null);

  return (
    <div ref={scope} className={"bg-black absolute top-0 left-0 right-0 z-50"}>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
      <nav
        ref={navbarRef}
        className="bg-white shadow-sm w-full fixed top-0 z-50 will-change-transform h-16 flex items-center justify-center"
        onMouseLeave={() => setVisibleSubmenu(null)}
      >
        <div className="w-full px-4 sm:px-6 lg:px-20 max-w-[1800px]">
          <div className="flex items-center justify-between">
            <div className="flex gap-12 items-center ">
              <Link
                href="/"
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <StarIcon className="text-primary-500 w-8 h-8" />
                <span className="text-xl font-semibold text-neutral-800">
                  Autoškola STAR
                </span>
              </Link>

              <div className={"hidden lg:flex gap-4"}>
                {LINKS.map(({ href, title, submenuKey }, idx) => {
                  const normalizedPath = pathname?.replace(/^\/(cs|en)/, "");
                  const isActive = normalizedPath?.startsWith(href);
                  return (
                    <div key={href} className="flex items-center gap-4">
                      <Link
                        onMouseEnter={() =>
                          setVisibleSubmenu(submenuKey || null)
                        }
                        href={href}
                        className={`hover:text-primary-500 font-semibold transition-all ${isActive ? "text-primary-500 hover:text-primary-600" : "text-slate-600"}`}
                      >
                        {title}
                      </Link>
                      {idx < LINKS.length - 1 && (
                        <div
                          className="self-stretch w-[1px] rounded-md bg-slate-400"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <SubmenuController
                submenuKey={visibleSubmenu}
                isVisible={!!visibleSubmenu}
                close={() => setVisibleSubmenu(null)}
              />
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              <LangSwitch shouldClose={shouldHide} />

              <Link
                href={CONTACT.href}
                className="text-white shadow-transparent shadow-md hover:shadow-primary-500/30 transition-all duration-300 bg-primary-500 hover:bg-primary-600 px-4 py-1.5 rounded-lg"
              >
                {CONTACT.title}
              </Link>
            </nav>

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
        </div>
      </nav>

      <div
        ref={mobileMenuRef}
        id="mobile-nav"
        className="lg:hidden fixed top-16 left-0 right-0 z-[45] max-h-[calc(100vh-4rem)] overflow-x-hidden overflow-y-auto bg-white shadow-lg"
      >
        <div className="border-t border-neutral-200 px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.slice(0, 3).map(({ href, key, matchPath }) => {
              const isActive =
                matchPath === "/"
                  ? pathname === "/" || pathname === "/cs" || pathname === "/en"
                  : (pathname ?? "").startsWith(matchPath ?? "");
              return (
                <Link
                  key={key}
                  href={href}
                  onClick={closeMobileMenu}
                  className={
                    isActive
                      ? "text-primary-500 font-semibold hover:text-primary-600 transition-colors"
                      : "text-neutral-700 hover:text-primary-500 transition-colors"
                  }
                >
                  {t(key)}
                </Link>
              );
            })}

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

            {NAV_LINKS.slice(3).map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                onClick={closeMobileMenu}
                className="text-neutral-700 hover:text-primary-500 transition-colors"
              >
                {t(key)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
