"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  MOBILE_MENU_ANIM,
  MOBILE_ACCORDION_ANIM,
} from "@/components/core/nav/constants";

type Refs = {
  panel: React.RefObject<HTMLDivElement | null>;
  drivingSubmenu: React.RefObject<HTMLDivElement | null>;
  infoSubmenu: React.RefObject<HTMLDivElement | null>;
};

type Setters = {
  setMenuOpening: (v: boolean) => void;
  setMenuClosing: (v: boolean) => void;
};

export function useMobileMenuPanel(
  refs: Refs,
  scopeRef: React.RefObject<HTMLDivElement | null>,
  isMobileMenuOpen: boolean,
  openMobileSubmenu: "drivingLicenses" | "info" | null,
  setters: Setters,
) {
  const { panel, drivingSubmenu, infoSubmenu } = refs;
  const { setMenuOpening, setMenuClosing } = setters;

  useLayoutEffect(() => {
    if (panel.current) {
      gsap.set(panel.current, { xPercent: 100, x: 0 });
    }
    if (drivingSubmenu.current) {
      gsap.set(drivingSubmenu.current, {
        height: 0,
        opacity: 0,
        overflow: "hidden",
      });
    }
    if (infoSubmenu.current) {
      gsap.set(infoSubmenu.current, {
        height: 0,
        opacity: 0,
        overflow: "hidden",
      });
    }
  }, [panel, drivingSubmenu, infoSubmenu]);

  useGSAP(
    () => {
      const el = panel.current;
      if (!el) return;
      gsap.killTweensOf(el);
      if (isMobileMenuOpen) {
        setMenuOpening(true);
        setMenuClosing(false);
        gsap.to(el, {
          xPercent: 0,
          x: 0,
          overwrite: "auto",
          ...MOBILE_MENU_ANIM.OPEN,
          onComplete: () => setMenuOpening(false),
        });
      } else {
        setMenuOpening(false);
        setMenuClosing(true);
        gsap.to(el, {
          xPercent: 100,
          x: 0,
          overwrite: "auto",
          ...MOBILE_MENU_ANIM.CLOSE,
          onComplete: () => setMenuClosing(false),
        });
      }
    },
    { dependencies: [isMobileMenuOpen], scope: scopeRef },
  );

  useGSAP(
    () => {
      const sections: Array<{
        key: "drivingLicenses" | "info";
        el: HTMLDivElement | null;
      }> = [
        { key: "drivingLicenses", el: drivingSubmenu.current },
        { key: "info", el: infoSubmenu.current },
      ];

      for (const { key, el } of sections) {
        if (!el) continue;
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
            continue;
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
      }
    },
    {
      dependencies: [openMobileSubmenu, isMobileMenuOpen],
      scope: scopeRef,
    },
  );
}
