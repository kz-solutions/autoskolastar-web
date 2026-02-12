"use client";

import React, { useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useHeroTimeline } from "@/hooks/gsap/hero/useHeroTimeline";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Hero = () => {
  const t = useTranslations("HomePage.Hero");
  const ref = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p !== undefined) {
      p.catch(() => {});
    }
  }, []);

  useHeroTimeline(ref);

  return (
    <section
      ref={ref}
      id="home"
      className="w-screen h-screen px-0 md:px-6 lg:px-20! pb-0! md:pb-12! lg:pb-16! pt-0! md:pt-24! mb-12 md:mb-0 relative flex justify-center"
    >
      <div className="h-full w-full md:rounded-3xl overflow-hidden relative max-w-[1440px] flex items-center">
        <div className="relative h-full w-full md:rounded-3xl overflow-hidden max-w-[1440px]">
          <img
            data-hero-img
            src="/images/hero.webp"
            alt="hero bg"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
          />
          <div className="absolute inset-0 pointer-events-none">
            <div
              data-hero-cover-top
              className="absolute top-0 left-0 w-full h-1/2 bg-white origin-bottom md:rounded-t-3xl"
            />
            <div
              data-hero-cover-bottom
              className="absolute bottom-0 left-0 w-full h-1/2 bg-white origin-top md:rounded-b-3xl"
            />
          </div>
        </div>
        <div className="absolute h-full w-full top-0 left-0 z-10">
          <div className="relative top-[15%] left-[10%]">
            <h1
              data-hero-title-top
              className="text-slate-800 text-heading_xl whitespace-nowrap leading-[1]! mb-2 opacity-0"
            >
              {/*{t("line1Top")}*/}
              První cesta je ta nejdůležitější.
            </h1>
            <h1
              data-hero-title-bottom
              className="text-slate-700 text-heading_lg whitespace-nowrap leading-[1]! opacity-0"
            >
              {/*{t("line1Bottom")}*/}
              Vaše cesta. Vaše tempo.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
