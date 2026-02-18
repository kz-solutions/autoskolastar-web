"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAVBAR_SCROLL } from "@/components/core/nav/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useNavbarScroll(
  navbarRef: React.RefObject<HTMLDivElement | null>,
  setShouldHide: (hide: boolean) => void,
  scopeRef: React.RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
      if (!navbarRef.current) return;

      let lastPos = 0;
      const hasScrolled = { down: 0, up: 0 };
      let isInit = false;

      const show = () => {
        setShouldHide(false);
        return gsap.to(navbarRef.current, {
          yPercent: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const hide = () => {
        setShouldHide(true);
        return gsap.to(navbarRef.current, {
          yPercent: -100,
          duration: 0.5,
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
    { scope: scopeRef },
  );
}
