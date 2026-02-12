import { ReactRef, useGSAP } from "@gsap/react";
import gsap from "gsap";

export const useHeroTimeline = (ref: ReactRef) => {
  useGSAP(() => {
    const q = gsap.utils.selector(ref);

    const tl = gsap.timeline();

    tl.fromTo(
      "[data-hero-cover-top]",
      {
        clipPath: "inset(0% 0% 0% 0%)",
      },
      {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.2,
        ease: "power4.inOut",
      },
    )
      .fromTo(
        "[data-hero-cover-bottom]",
        {
          clipPath: "inset(0% 0% 0% 0%)",
        },
        {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.2,
          ease: "power4.inOut",
        },
        "<",
      )
      .fromTo(
        q("[data-hero-img]"),
        { scale: 1.1 },
        { scale: 1, duration: 1.8, ease: "power3.out" },
        "-=0.8",
      )
      .to(
        q("[data-hero-title-top]"),
        {
          opacity: 1,
          duration: 1.2,
          y: -30,
          ease: "power3.out",
        },
        "-=1.5",
      )
      .to(
        q("[data-hero-title-bottom]"),
        {
          opacity: 1,
          duration: 1.2,
          y: -30,
          ease: "power3.out",
        },
        "<0.1",
      );
  });
};
