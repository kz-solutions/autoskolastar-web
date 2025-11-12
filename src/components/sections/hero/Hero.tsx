"use client";

import React, { useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ScrollIndicator from "@/components/core/ScrollIndicator";
import { useHeroTimeline } from "@/hooks/gsap/hero/useHeroTimeline";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Hero = () => {
  const t = useTranslations("HomePage.Hero");
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useHeroTimeline(ref);

  return (
    <section ref={ref} id="home" className="w-screen h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute w-[92vw] h-full top-1/2 -translate-y-1/2 max-h-[85vh] rounded-2xl overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/bg_video.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay */}
        <div
          data-hero-bg
          className="absolute inset-0 bg-black/60 pointer-events-none"
        />
      </div>
      <ScrollIndicator />
      <div className={"absolute h-screen w-screen top-0 left-0 z-10"}>
        <div className="relative top-[45%] -translate-y-1/2 left-1/2 -translate-x-1/2">
          <h1
            data-hero-line-top
            className="text-white text-heading_xl text-center whitespace-nowrap leading-[1]!"
          >
            Každá cesta
          </h1>
          <h1
            data-hero-line-bottom
            className="text-white text-heading_xl text-center whitespace-nowrap leading-[1]!"
          >
            má svůj začátek
          </h1>
        </div>
      </div>
      <div
        className={
          "absolute h-screen w-screen top-0 left-0 z-10 pointer-events-none"
        }
      >
        <div
          data-hero-line-here
          className="relative top-[45%] -translate-y-1/2 left-1/2 -translate-x-1/2"
        >
          <h1
            data-hero-line-top-2
            className="opacity-0 text-white text-heading_xl text-center whitespace-nowrap leading-[1]!"
          >
            a ta tvoje
          </h1>
          <h1
            data-hero-line-bottom-2
            className="opacity-0 text-white hero-line hero-bottom text-heading_xl text-center whitespace-nowrap leading-[1]!"
          >
            začíná <span className={"inline-block text-white"}>tady</span>
          </h1>
        </div>
      </div>
      <div
        className={
          "absolute h-screen w-screen top-0 left-0 z-10 pointer-events-none"
        }
      >
        <div className="relative top-[45%] -translate-y-1/2 left-1/2 -translate-x-1/2">
          <h1
            data-hero-line-top-3
            className="opacity-0 text-white text-heading_lg text-center whitespace-nowrap"
          >
            Autoškola, která tě připraví na všechno.
          </h1>
          <h1
            data-hero-line-bottom-3
            className="opacity-0 text-white text-heading_md font-medium! text-center whitespace-nowrap leading-[2]!"
          >
            Bez stresu. S jistotou. S instruktory, co stojí na tvé straně.
          </h1>
        </div>
        <div className="relative top-[70%] -translate-y-1/2 left-1/2 -translate-x-1/2">
          <h1
            data-hero-line-4
            className="opacity-0 text-white text-heading_lg font-medium! text-center whitespace-nowrap"
          >
            BÍLINA – MOST – LITVÍNOV
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
