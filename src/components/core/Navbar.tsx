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
import DrivingLicencesSubmenu from "@/components/core/nav/DrivingLicencesSubmenu";

gsap.registerPlugin(ScrollTrigger, useGSAP);


const NAVBAR_SCROLL = {
  JITTER: 2,
  HIDE_AFTER: 160,
  SHOW_AFTER: 40,
} as const;

const MOBILE_MENU_ANIM = {
  OPEN: { duration: 0.3, ease: "power2.out" as const },
  CLOSE: { duration: 0.25, ease: "power2.in" as const },
} as const;

const MOBILE_ACCORDION_ANIM = {
  OPEN: { duration: 0.28, ease: "power2.out" as const },
  CLOSE: { duration: 0.22, ease: "power2.in" as const },
} as const;

const MOBILE_SUBMENU_KEYS = [
  "drivingLicenses",
  "info",
  "important",
] as const;
type MobileSubmenuKey = (typeof MOBILE_SUBMENU_KEYS)[number];

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

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    className={`w-5 h-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

function MobileAccordionItem({
  submenuKey,
  title,
  isActive,
  isOpen,
  onToggle,
  setPanelRef,
  children,
}: {
  submenuKey: MobileSubmenuKey;
  title: string;
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
  setPanelRef: (el: HTMLDivElement | null) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-1">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="w-full cursor-pointer flex items-center justify-between py-3 text-neutral-700 hover:text-primary-500 transition-colors"
      >
        <span className={isActive ? "font-semibold" : undefined}>{title}</span>
        <ChevronDown open={isOpen} />
      </button>
      <div
        ref={setPanelRef}
        aria-hidden={!isOpen}
        className={isOpen ? "" : "pointer-events-none"}
      >
        <div className="pl-3 mt-1 border-l-2 border-neutral-200">{children}</div>
      </div>
    </div>
  );
}

const Navbar = () => {
  const t = useTranslations("HomePage.Header");
  const pathname = usePathname();
  useSmoothScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
    null,
  );
  const [shouldHide, setShouldHide] = useState(false);

  const navbarRef = useRef<HTMLDivElement | null>(null);
  const scope = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const importantDropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileSubmenuRefs = useRef<Record<MobileSubmenuKey, HTMLDivElement | null>>({
    drivingLicenses: null,
    info: null,
    important: null,
  });

  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
  };

  const importantLinks = parseImportantLinks(t.raw("importantLinks"));

  useMobileMenu(isMobileMenuOpen, closeMobileMenu);

  useLayoutEffect(() => {
    if (mobileMenuRef.current) {
      gsap.set(mobileMenuRef.current, { x: "100%" });
    }
    MOBILE_SUBMENU_KEYS.forEach((key) => {
      const el = mobileSubmenuRefs.current[key];
      if (el) {
        gsap.set(el, { height: 0, opacity: 0, overflow: "hidden" });
      }
    });
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
          x: 0,
          ...MOBILE_MENU_ANIM.OPEN,
        });
      } else {
        gsap.to(el, {
          x: "100%",
          ...MOBILE_MENU_ANIM.CLOSE,
        });
      }
    },
    { dependencies: [isMobileMenuOpen], scope },
  );

  useGSAP(
    () => {
      MOBILE_SUBMENU_KEYS.forEach((key) => {
        const el = mobileSubmenuRefs.current[key];
        if (!el) return;

        const shouldBeOpen = isMobileMenuOpen && openMobileSubmenu === key;

        if (shouldBeOpen) {
          const currentHeight = el.offsetHeight;
          const targetHeight = el.scrollHeight;
          gsap.killTweensOf(el);
          gsap.fromTo(
            el,
            {
              height: currentHeight,
              opacity: Number(gsap.getProperty(el, "opacity")) || 0,
            },
            {
              height: targetHeight,
              opacity: 1,
              overflow: "hidden",
              overwrite: "auto",
              ...MOBILE_ACCORDION_ANIM.OPEN,
              onComplete: () => {
                gsap.set(el, { height: "auto" });
              },
            },
          );
        } else {
          if (el.offsetHeight === 0) {
            gsap.set(el, { height: 0, opacity: 0, overflow: "hidden" });
            return;
          }
          gsap.killTweensOf(el);
          gsap.to(el, {
            height: 0,
            opacity: 0,
            overflow: "hidden",
            overwrite: "auto",
            ...MOBILE_ACCORDION_ANIM.CLOSE,
          });
        }
      });
    },
    { dependencies: [openMobileSubmenu, isMobileMenuOpen], scope },
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
    {
      title: t("important"),
      submenuKey: "important",
      href: "#",
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
        <div className="w-full px-4 sm:px-6 xl:px-20 max-w-[1800px]">
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
                importantLinks={importantLinks}
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
        className="lg:hidden fixed top-0 right-0 bottom-0 z-[45] w-full max-w-[320px] overflow-y-auto bg-white shadow-xl will-change-transform"
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-5">
          <nav className="flex flex-col gap-1">
            {LINKS.map(({ href, title, submenuKey }) => {
              const normalizedPath = pathname?.replace(/^\/(cs|en)/, "") ?? "";
              const isActive = href !== "#" && normalizedPath.startsWith(href);

              const linkClass = isActive
                ? "text-primary-500 font-semibold hover:text-primary-600 transition-colors py-3"
                : "text-neutral-700 hover:text-primary-500 transition-colors py-3";

              if (
                submenuKey &&
                (MOBILE_SUBMENU_KEYS as readonly string[]).includes(submenuKey)
              ) {
                const key = submenuKey as MobileSubmenuKey;
                return (
                  <MobileAccordionItem
                    key={href}
                    submenuKey={key}
                    title={title}
                    isActive={isActive}
                    isOpen={openMobileSubmenu === key}
                    onToggle={() =>
                      setOpenMobileSubmenu((s) => (s === key ? null : key))
                    }
                    setPanelRef={(el) => {
                      mobileSubmenuRefs.current[key] = el;
                    }}
                  >
                    {key === "drivingLicenses" && (
                      <DrivingLicencesSubmenu
                        close={closeMobileMenu}
                        variant="mobile"
                      />
                    )}
                    {key === "info" && (
                      <div className="text-neutral-600 text-sm">
                        <div className="py-2">TEST 2</div>
                      </div>
                    )}
                    {key === "important" && (
                      <div className="flex flex-col">
                        {importantLinks.map((item) => (
                          <ImportantLinkItem
                            key={item.label}
                            item={item}
                            variant="mobile"
                            onClick={closeMobileMenu}
                          />
                        ))}
                      </div>
                    )}
                  </MobileAccordionItem>
                );
              }

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMobileMenu}
                  className={linkClass}
                >
                  {title}
                </Link>
              );
            })}

            <Link
              href={CONTACT.href}
              onClick={closeMobileMenu}
              className="mt-2 text-white bg-primary-500 hover:bg-primary-600 px-4 py-2.5 rounded-lg text-center font-semibold transition-colors"
            >
              {CONTACT.title}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
