import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

const SCROLL_OFFSET_Y = 100;
const SCROLL_DURATION = 1.2;
const HOME_PATHS = ["/", "/cs", "/en"] as const;

function scrollToElement(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  gsap.to(window, {
    duration: SCROLL_DURATION,
    scrollTo: { y: el, offsetY: SCROLL_OFFSET_Y },
    ease: "power2.inOut",
  });
}

function parseHashFromHref(href: string): { pathPart: string; hashPart: string } | null {
  const hashIdx = href.indexOf("#");
  if (hashIdx === -1) return null;
  const pathPart = hashIdx > 0 ? href.slice(0, hashIdx) : "";
  const hashPart = href.slice(hashIdx + 1);
  return hashPart ? { pathPart, hashPart } : null;
}

function isHomePageAnchor(href: string, pathname: string): boolean {
  const parsed = parseHashFromHref(href);
  if (!parsed) return false;
  const { pathPart } = parsed;
  const isHome = HOME_PATHS.includes(pathname as (typeof HOME_PATHS)[number]);
  const isHomePath = pathPart === "" || pathPart === "/" || pathPart === "/cs" || pathPart === "/en";
  return href.startsWith("#") || (isHome && isHomePath);
}

let isListenerAdded = false;

export const useSmoothScroll = () => {
  const hasAddedListener = useRef(false);

  useEffect(() => {
    if (isListenerAdded || hasAddedListener.current) return;
    isListenerAdded = true;
    hasAddedListener.current = true;

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      const parsed = parseHashFromHref(href);
      if (!parsed) return;

      const pathname = typeof window !== "undefined" ? window.location.pathname : "";
      if (!isHomePageAnchor(href, pathname)) return;

      const targetElement = document.getElementById(parsed.hashPart);
      if (targetElement) {
        e.preventDefault();
        scrollToElement(parsed.hashPart);
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      isListenerAdded = false;
      hasAddedListener.current = false;
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);
};

export const useScrollToHashOnLoad = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash?.slice(1);
    if (!hash) return;

    let cancelled = false;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) scrollToElement(hash);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, []);
};

