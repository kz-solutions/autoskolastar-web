"use client";
import React, { startTransition, useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import EN from "@/images/flags/en.png";
import CS from "@/images/flags/cs.png";
import Image from "next/image";
import { ClassName, Locales } from "@/utils/types/Props";
import { useLocale } from "use-intl";
import { ChevronIcon } from "@/icons/Chevron";

const BUTTON_HEIGHT = 33;

const FLAGS = {
  en: EN,
  cs: CS,
};

const LangSwitch = ({
  shouldClose = false,
  className = "",
}: { shouldClose?: boolean } & ClassName) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locale = useLocale();
  const [selectedLang, setSelectedLang] = useState(locale);

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    setIsOpen(false);
    
    startTransition(() => {
      router.replace(pathname, { locale: lang });
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (shouldClose) setIsOpen(false);
  }, [shouldClose]);

  return (
    <div ref={dropdownRef} className={`relative z-10 my-auto h-[33px] w-22 ${className}`}>
      <div
        className={`default-ease absolute h-[33px] overflow-hidden left-0 right-0 top-0 items-baseline flex flex-col rounded-2xl border border-gray-200 bg-white duration-300 ${!isOpen ? "shadow-xs" : "shadow-lg shadow-gray-700/50"}`}
        style={{
          height: isOpen
            ? BUTTON_HEIGHT * Object.keys(FLAGS).length
            : BUTTON_HEIGHT,
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="relative flex w-full items-center gap-2 p-[3px]"
        >
          <Image
            className="size-[25px] shadow-sm rounded-full"
            src={FLAGS[selectedLang as Locales]}
            alt={selectedLang}
          />
          <span className="mt-[1px] font-medium uppercase">{selectedLang}</span>
          <span
            className={`mr-1 shrink-0 transition-transform duration-300 ${isOpen ? "-rotate-90" : "rotate-90"}`}
          >
            <ChevronIcon className="size-2 text-gray-500" />
          </span>
        </button>
        {Object.keys(FLAGS)
          .filter((item) => item !== selectedLang)
          .map((locale) => (
            <button
              key={locale}
              onClick={() => handleLanguageChange(locale)}
              className={`flex h-[33px] shrink-0 items-center gap-2 p-[3px] w-full ${isOpen ? "" : "pointer-events-none"} border-gray-300`}
              tabIndex={isOpen ? 0 : -1}
            >
              <Image
                src={FLAGS[locale as Locales]}
                alt={locale}
                className="size-[25px] shrink-0 shadow-sm rounded-full"
              />
              <span className={`font-medium uppercase`}>{locale}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default LangSwitch;
