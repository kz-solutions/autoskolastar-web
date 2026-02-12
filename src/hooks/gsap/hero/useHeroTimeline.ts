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
          y: 30,
          ease: "power3.out",
        },
        "-=1.2",
      )
      .to(
        q("[data-hero-title-bottom]"),
        {
          opacity: 1,
          duration: 1.2,
          y: 30,
          ease: "power3.out",
        },
        "<0.1",
      );

    //   to(q("[data-hero-line-top]"), {
    //     xPercent: -30,
    //     opacity: 0,
    //     duration: 1,
    //   })
    //     .to(
    //       q("[data-hero-line-bottom]"),
    //       { xPercent: 30, opacity: 0, duration: 1 },
    //       "<",
    //     )
    //     .fromTo(
    //       q("[data-hero-line-top-2]"),
    //       {
    //         xPercent: -20,
    //         opacity: 0,
    //       },
    //       { xPercent: 0, opacity: 1, duration: 1 },
    //       "+=0.5",
    //     )
    //     .fromTo(
    //       q("[data-hero-line-bottom-2]"),
    //       { xPercent: 20, opacity: 0 },
    //       { xPercent: 0, opacity: 1, duration: 1 },
    //       "+=0.5",
    //     )
    //     .fromTo(
    //       q("[data-hero-line-here]"),
    //       {
    //         scale: 1,
    //         transformOrigin: "center center",
    //       },
    //       {
    //         scale: 150,
    //         duration: 2,
    //         ease: "power4.in",
    //       },
    //       "+=0.1",
    //     )
    //     .to(
    //       q("[data-hero-line-here]"),
    //       {
    //         opacity: 0,
    //         duration: 0.5,
    //         ease: "power2.out",
    //       },
    //       ">-0.5",
    //     )
    //     .to(
    //       q("[data-hero-line-here]"),
    //       {
    //         display: "none",
    //       },
    //       "<",
    //     )
    //     .to(
    //       q("[data-hero-line-top-2]"),
    //       {
    //         opacity: 0,
    //         duration: 0.5,
    //         ease: "power2.out",
    //       },
    //       ">-=0.8",
    //     )
    //     .to(
    //       q("[data-hero-line-bottom-2]"),
    //       {
    //         opacity: 0,
    //         duration: 0.5,
    //         ease: "power2.out",
    //       },
    //       "<",
    //     )
    //     .to(
    //       q("[data-hero-bg]"),
    //       {
    //         backgroundColor: "rgba(0, 0, 0, 0.85)",
    //         duration: 0.5,
    //         ease: "power2.out",
    //       },
    //       "<",
    //     )
    //     .fromTo(
    //       q("[data-hero-line-top-3]"),
    //       {
    //         scale: 0.5,
    //         opacity: 0,
    //         ease: "power2.out",
    //         transformOrigin: "center center",
    //         y: 80,
    //       },
    //       { scale: 1, opacity: 1, duration: 2, y: 0 },
    //       ">-=0.1",
    //     )
    //     .fromTo(
    //       q("[data-hero-line-bottom-3]"),
    //       {
    //         scale: 0.5,
    //         opacity: 0,
    //         ease: "power2.out",
    //         transformOrigin: "center center",
    //         y: 50,
    //       },
    //       { scale: 1, opacity: 1, duration: 2, y: 0 },
    //       "<",
    //     )
    //     .fromTo(
    //       q("[data-hero-line-4]"),
    //       {
    //         y: -30,
    //         opacity: 0,
    //         ease: "power2.out",
    //         transformOrigin: "center center",
    //       },
    //       { opacity: 1, duration: 1, y: 0 },
    //       ">-=0.1",
    //     )
    //     .to({}, { duration: 1 });
  });
};
