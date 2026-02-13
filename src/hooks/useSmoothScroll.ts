import { useEffect, useRef } from "react";
import gsap from "gsap";

let isListenerAdded = false;

export function useScrollToHashOnLoad() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.location.hash;
    if (!raw || raw === "#") return;

    const targetId = decodeURIComponent(raw.slice(1));
    if (!targetId) return;

    // Wait a tick so layout is ready (fonts/images/sections).
    const raf = window.requestAnimationFrame(() => {
      const el = document.getElementById(targetId);
      if (!el) return;

      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: el,
          offsetY: 100,
        },
        ease: "power2.inOut",
      });
    });

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, []);
}

export const useSmoothScroll = () => {
  const hasAddedListener = useRef(false);

  useEffect(() => {
    // Only add listener once globally
    if (isListenerAdded || hasAddedListener.current) return;

    isListenerAdded = true;
    hasAddedListener.current = true;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: targetElement,
            offsetY: 100, // Offset pro navbar a padding
          },
          ease: "power2.inOut",
        });
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
