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

const LOCALES: Locales[] = ["en", "cs"];

type Variant = "dropdown" | "pills";

const LangSwitch = ({
  shouldClose = false,
  className = "",
  variant = "dropdown",
}: { shouldClose?: boolean; variant?: Variant } & ClassName) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [selectedLang, setSelectedLang] = useState(locale);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedLang(locale);
  }, [locale]);

  useEffect(() => {
    if (shouldClose) setIsOpen(false);
  }, [shouldClose]);

  const handleLanguageChange = (lang: string) => {
    if (lang === selectedLang) return;
    setSelectedLang(lang);
    if (variant === "dropdown") setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: lang, scroll: false });
    });
  };

  useEffect(() => {
    if (variant !== "dropdown") return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [variant, isOpen]);

  if (variant === "pills") {
    return (
      <div
        className={`inline-flex h-full min-h-[2.25rem] rounded-full p-0.5 ${className}`}
        role="radiogroup"
        aria-label="Vyberte jazyk"
      >
        {LOCALES.map((loc) => {
          const isSelected = selectedLang === loc;
          return (
            <button
              key={loc}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleLanguageChange(loc)}
              className={`inline-flex flex-1 min-w-0 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium uppercase transition-colors duration-300 ${
                isSelected
                  ? "bg-primary-500 text-white shadow-sm"
                  : "bg-transparent text-gray-800 hover:bg-primary-500/10"
              }`}
              aria-label={loc === "en" ? "English" : "Čeština"}
            >
              <Image
                src={FLAGS[loc]}
                alt=""
                className="size-5 shrink-0 rounded-full shadow-sm"
                width={20}
                height={20}
              />
              <span>{loc}</span>
              {isSelected && (
                <span className="ml-0.5 text-white" aria-hidden>
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className={`relative z-10 my-auto h-[33px] w-22 ${className}`}
    >
      <div
        className="absolute left-0 right-0 top-0 flex h-[33px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs transition-[height,box-shadow] duration-300"
        style={{
          height: isOpen
            ? BUTTON_HEIGHT * Object.keys(FLAGS).length
            : BUTTON_HEIGHT,
          boxShadow: isOpen ? "0 10px 15px -3px rgb(0 0 0 / 0.1)" : undefined,
        }}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex w-full items-center gap-2 p-[3px]"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Vyberte jazyk"
        >
          <Image
            className="size-[25px] rounded-full shadow-sm"
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
          .map((loc) => (
            <button
              key={loc}
              type="button"
              role="option"
              onClick={() => handleLanguageChange(loc)}
              className={`flex h-[33px] w-full shrink-0 items-center gap-2 border-gray-300 p-[3px] ${!isOpen ? "pointer-events-none" : ""}`}
              tabIndex={isOpen ? 0 : -1}
            >
              <Image
                src={FLAGS[loc as Locales]}
                alt={loc}
                className="size-[25px] shrink-0 rounded-full shadow-sm"
              />
              <span className="font-medium uppercase">{loc}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default LangSwitch;
