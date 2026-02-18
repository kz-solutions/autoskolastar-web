"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/utils/routes";
import LangSwitch from "@/components/core/LangSwitch";
import { ImportantLinkItem } from "./ImportantLinkItem";
import type { NavLink, ImportantLink, InfoSubmenu, MobileSubmenuKey } from "./types";

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
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

type Props = {
  panelRef: React.RefObject<HTMLDivElement | null>;
  drivingSubmenuRef: React.RefObject<HTMLDivElement | null>;
  infoSubmenuRef: React.RefObject<HTMLDivElement | null>;
  links: NavLink[];
  contact: { title: string; href: string };
  pathname: string | null;
  importantLinks: ImportantLink[];
  infoSubmenu: InfoSubmenu | null;
  onClose: () => void;
  openSubmenu: MobileSubmenuKey;
  setOpenSubmenu: (key: MobileSubmenuKey) => void;
  hasSubmenuOpen: boolean;
  isMenuOpen: boolean;
};

export function MobileMenuPanel({
  panelRef,
  drivingSubmenuRef,
  infoSubmenuRef,
  links,
  contact,
  pathname,
  importantLinks,
  infoSubmenu,
  onClose,
  openSubmenu,
  setOpenSubmenu,
  hasSubmenuOpen,
  isMenuOpen,
}: Props) {
  const tDL = useTranslations("HomePage.Header.DrivingLicenseSubmenu");
  const normalizedPath = pathname?.replace(/^\/(cs|en)/, "") ?? "";

  return (
    <div
      ref={panelRef}
      id="mobile-nav"
      className={`h-full w-full bg-white shadow-xl will-change-transform overscroll-contain translate-x-full transform-gpu ${
        hasSubmenuOpen ? "overflow-y-auto" : "overflow-y-hidden"
      }`}
    >
      <div className="flex flex-col min-h-full pt-20 pb-6 px-5">
        <nav className="flex flex-col gap-1">
          {links.map(({ href, title, submenuKey }) => {
            const isActive =
              href !== "#" && normalizedPath.startsWith(href);
            const linkClass = isActive
              ? "text-primary-500 font-semibold hover:text-primary-600 transition-colors py-3"
              : "text-neutral-700 hover:text-primary-500 transition-colors py-3";
            const isOpen = openSubmenu === submenuKey;

            if (submenuKey === "drivingLicenses") {
              const groups = {
                a: {
                  title: tDL("A.title"),
                  items: tDL.raw("A.items") as Array<{ shortTitle: string }>,
                  href: ROUTES.drivingLicenses + "/a",
                },
                b: {
                  title: tDL("B.title"),
                  items: tDL.raw("B.items") as Array<{ shortTitle: string }>,
                  href: ROUTES.drivingLicenses + "/b",
                },
                professional: {
                  title: tDL("Professional.title"),
                  items: tDL.raw("Professional.items") as Array<{
                    shortTitle: string;
                  }>,
                  href: ROUTES.drivingLicenses + "/profesni",
                },
                schooling: {
                  title: tDL("Schooling.title"),
                  href: ROUTES.drivingLicenses + "/skoleni-ridicu",
                },
                training: {
                  title: tDL("Training.title"),
                  href: ROUTES.drivingLicenses + "/kondicni-jizdy",
                },
                repeatedLectures: {
                  title: tDL("RepeatedLectures.title"),
                  href: ROUTES.drivingLicenses + "/opakovana-vyuka",
                },
              };

              return (
                <div key={href} className="mt-1">
                  <button
                    type="button"
                    aria-expanded={!!isOpen}
                    onClick={() =>
                      setOpenSubmenu(
                        openSubmenu === "drivingLicenses" ? null : "drivingLicenses",
                      )
                    }
                    className="w-full cursor-pointer flex items-center justify-between py-3 text-neutral-700 hover:text-primary-500 transition-colors"
                  >
                    <span className={isActive ? "font-semibold" : undefined}>
                      {title}
                    </span>
                    <ChevronDown open={!!isOpen} />
                  </button>
                  <div
                    ref={drivingSubmenuRef}
                    aria-hidden={!isOpen}
                    className={isOpen ? "" : "pointer-events-none"}
                  >
                    <div className="pl-3 mt-1 border-l-2 border-neutral-200">
                      <div className="flex flex-col gap-6 py-2">
                        {[groups.a, groups.b, groups.professional].map((g) => (
                          <div key={g.href} className="flex flex-col">
                            <Link
                              href={g.href}
                              onClick={onClose}
                              className="font-semibold text-neutral-800 hover:text-primary-500 transition-colors py-1"
                            >
                              {g.title}
                            </Link>
                            {(g.items ?? []).map((it) => (
                              <Link
                                key={it.shortTitle}
                                href={g.href}
                                onClick={onClose}
                                className="text-neutral-700 hover:text-primary-500 transition-colors py-1 pl-3"
                              >
                                {it.shortTitle}
                              </Link>
                            ))}
                          </div>
                        ))}
                        <div className="flex flex-col gap-2">
                          {[
                            groups.schooling,
                            groups.training,
                            groups.repeatedLectures,
                          ].map((g) => (
                            <Link
                              key={g.href}
                              href={g.href}
                              onClick={onClose}
                              className="font-semibold text-neutral-800 hover:text-primary-500 transition-colors py-1"
                            >
                              {g.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (submenuKey === "info" && infoSubmenu) {
              return (
                <div key={href} className="mt-1">
                  <button
                    type="button"
                    aria-expanded={!!isOpen}
                    onClick={() =>
                      setOpenSubmenu(openSubmenu === "info" ? null : "info")
                    }
                    className="w-full cursor-pointer flex items-center justify-between py-3 text-neutral-700 hover:text-primary-500 transition-colors"
                  >
                    <span className={isActive ? "font-semibold" : undefined}>
                      {title}
                    </span>
                    <ChevronDown open={!!isOpen} />
                  </button>
                  <div
                    ref={infoSubmenuRef}
                    aria-hidden={!isOpen}
                    className={isOpen ? "" : "pointer-events-none"}
                  >
                    <div className="pl-3 mt-1 flex flex-col border-l-2 border-neutral-200 gap-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-neutral-800 text-base">
                          {infoSubmenu.documents.title}
                        </span>
                        {infoSubmenu.documents.items.map((item) => (
                          <ImportantLinkItem
                            key={item.label}
                            item={item}
                            variant="mobile"
                            onClick={onClose}
                          />
                        ))}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-neutral-800 text-base">
                          {infoSubmenu.links.title}
                        </span>
                        {infoSubmenu.links.items.map((item) => (
                          <ImportantLinkItem
                            key={item.label}
                            item={item}
                            variant="mobile"
                            onClick={onClose}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={linkClass}
              >
                {title}
              </Link>
            );
          })}

          <div className="mt-4 flex flex-col gap-4 md:flex-row md:h-12 md:items-stretch md:gap-3">
            <Link
              href={contact.href}
              onClick={onClose}
              className="w-full md:flex-1 md:max-w-96 md:h-full flex items-center justify-center text-white bg-primary-500 hover:bg-primary-600 px-5 py-2.5 rounded-lg text-center font-semibold transition-colors"
            >
              {contact.title}
            </Link>
            <div className="flex items-center md:h-full md:shrink-0">
              <LangSwitch variant="pills" shouldClose={!isMenuOpen} className="h-full" />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
