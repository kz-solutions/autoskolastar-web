import React, { useRef } from "react";
import { StarIcon } from "@/icons/Star";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const DURATION = 0.7;

const Label = ({ text }: { text: string }) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);

      const bars = q(".label-divider") as HTMLElement[];
      if (bars.length === 2) {
        gsap.set(bars[0], { transformOrigin: "right center", scaleX: 0 });
        gsap.set(bars[1], { transformOrigin: "left center", scaleX: 0 });
      }

      const tl = gsap.timeline({
        defaults: { duration: DURATION, ease: "power2.out" },
        scrollTrigger: {
          trigger: ".label-text",
          start: "top center",
        },
      });

      tl.to(".label-text", { y: 0, opacity: 1 })
        .fromTo(bars, { scaleX: 0 }, { scaleX: 1 }, ">-0.3")
        .to(".label-star", { opacity: 1 }, ">-0.2");
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="hidden lg:block relative w-full mb-6">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 opacity-0 label-star">
        <StarIcon className="text-primary-500 w-6 h-6" />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 opacity-0 label-star">
        <StarIcon className="text-primary-500 w-6 h-6" />
      </div>

      <div className="flex items-center justify-center">
        <div className="w-64 lg:w-96 h-0.5 bg-primary-500 opacity-20 label-divider" />
        <span className="label-text opacity-0 translate-y-full text-sm text-primary-500 uppercase tracking-widest mx-8 lg:mx-16">
          {text || ""}
        </span>
        <div className="w-64 lg:w-96 h-0.5 bg-primary-500 opacity-20 label-divider" />
      </div>
    </div>
  );
};

export default Label;
