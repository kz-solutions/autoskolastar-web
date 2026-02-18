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
import { useNavbarScroll } from "@/hooks/useNavbarScroll";
import { useMobileMenuPanel } from "@/hooks/useMobileMenuPanel";
import { ROUTES } from "@/utils/routes";
import {
  BurgerButton,
  MobileMenuPanel,
  SubmenuController,
  parseImportantLinks,
} from "@/components/core/nav";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Navbar = () => {
  const t = useTranslations("HomePage.Header");
  const pathname = usePathname();
  useSmoothScroll();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpening, setMenuOpening] = useState(false);
  const [isMenuClosing, setMenuClosing] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<
    "drivingLicenses" | "info" | null
  >(null);
  const [shouldHide, setShouldHide] = useState(false);
  const [visibleSubmenu, setVisibleSubmenu] = useState<string | null>(null);

  const scopeRef = useRef<HTMLDivElement | null>(null);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileDrivingSubmenuRef = useRef<HTMLDivElement | null>(null);
  const mobileInfoSubmenuRef = useRef<HTMLDivElement | null>(null);
  const importantDropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleMobileMenu = () => {
    if (isMenuOpening || isMenuClosing) return;
    setIsMobileMenuOpen((s) => !s);
  };

  const closeMobileMenu = () => {
    if (isMenuOpening || isMenuClosing) return;
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
  };

  const importantLinks = parseImportantLinks(t.raw("importantLinks"));

  useMobileMenu(isMobileMenuOpen || isMenuClosing, closeMobileMenu);
  useNavbarScroll(navbarRef, setShouldHide, scopeRef);
  useMobileMenuPanel(
    {
      panel: mobileMenuRef,
      drivingSubmenu: mobileDrivingSubmenuRef,
      infoSubmenu: mobileInfoSubmenuRef,
    },
    scopeRef,
    isMobileMenuOpen,
    openMobileSubmenu,
    { setMenuOpening, setMenuClosing },
  );

  useLayoutEffect(() => {
    if (importantDropdownRef.current) {
      gsap.set(importantDropdownRef.current, {
        opacity: 0,
        y: -8,
        scale: 0.96,
      });
    }
  }, []);

  const links = [
    { title: t("drivingLicenses"), submenuKey: "drivingLicenses" as const, href: ROUTES.drivingLicenses },
    { title: t("info"), submenuKey: "info" as const, href: ROUTES.info },
    { title: t("pricing"), href: ROUTES.pricing },
    { title: t("fleet"), href: ROUTES.fleet },
    { title: t("classrooms"), href: ROUTES.classrooms },
  ];

  const contact = { title: t("contact"), href: ROUTES.contact };

  return (
    <div ref={scopeRef} className="bg-black absolute top-0 left-0 right-0 z-50">
      <nav
        ref={navbarRef}
        className="bg-white shadow-sm w-full fixed top-0 z-50 will-change-transform h-16 flex items-center justify-center"
        onMouseLeave={() => setVisibleSubmenu(null)}
      >
        <div className="w-full px-4 sm:px-6 xl:px-20 max-w-[1800px]">
          <div className="flex items-center justify-between">
            <div className="flex gap-12 items-center">
              <Link
                href="/"
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <StarIcon className="text-primary-500 w-8 h-8" />
                <span className="text-xl font-semibold text-neutral-800">
                  Autoškola STAR
                </span>
              </Link>

              <div className="hidden lg:flex gap-4">
                {links.map(({ href, title, submenuKey }, idx) => {
                  const normalizedPath = pathname?.replace(/^\/(cs|en)/, "");
                  const isActive = normalizedPath?.startsWith(href);
                  return (
                    <div key={href} className="flex items-center gap-4">
                      <Link
                        onMouseEnter={() =>
                          setVisibleSubmenu(submenuKey ?? null)
                        }
                        href={href}
                        className={`hover:text-primary-500 font-semibold transition-all ${
                          isActive
                            ? "text-primary-500 hover:text-primary-600"
                            : "text-slate-600"
                        }`}
                      >
                        {title}
                      </Link>
                      {idx < links.length - 1 && (
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
                href={contact.href}
                className="text-white shadow-transparent shadow-md hover:shadow-primary-500/30 transition-all duration-300 bg-primary-500 hover:bg-primary-600 px-4 py-1.5 rounded-lg"
              >
                {contact.title}
              </Link>
            </nav>

            <BurgerButton
              isOpen={isMobileMenuOpen}
              isMenuOpening={isMenuOpening}
              isMenuClosing={isMenuClosing}
              onClick={() =>
                isMobileMenuOpen ? closeMobileMenu() : toggleMobileMenu()
              }
            />
          </div>
        </div>
      </nav>

      <div
        className="lg:hidden fixed inset-0 z-[45] [contain:paint] overflow-x-clip"
        style={{
          pointerEvents: isMobileMenuOpen || isMenuClosing ? "auto" : "none",
        }}
        aria-hidden={!isMobileMenuOpen && !isMenuClosing}
      >
        <MobileMenuPanel
          panelRef={mobileMenuRef}
          drivingSubmenuRef={mobileDrivingSubmenuRef}
          infoSubmenuRef={mobileInfoSubmenuRef}
          links={links}
          contact={contact}
          pathname={pathname}
          importantLinks={importantLinks}
          onClose={closeMobileMenu}
          openSubmenu={openMobileSubmenu}
          setOpenSubmenu={setOpenMobileSubmenu}
          hasSubmenuOpen={!!openMobileSubmenu}
        />
      </div>
    </div>
  );
};

export default Navbar;
