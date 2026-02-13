import { ReactRef, useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

export const useHeroTimeline = (ref: ReactRef) => {
  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);

      const tl = gsap.timeline();

      const splitBottom = new SplitText(q("[data-hero-title-bottom]"), {
        type: "words",
      });

      gsap.set(splitBottom.words, {
        y: 30,
        opacity: 0,
      });

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
        .fromTo(
          q("[data-hero-title-top]"),
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=1.5",
        )
        .to(
          q("[data-hero-title-bottom]"),
          { opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=1.3",
        )
        .to(
          splitBottom.words,
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
          },
          "<",
        );
    },
    { scope: ref },
  );
};
