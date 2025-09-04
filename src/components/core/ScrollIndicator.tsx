import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ScrollIndicator = () => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const tl = gsap.timeline({
        repeat: -1,
      });

      tl.to(q(".scroll-indicator"), {
        duration: 0.5,
        ease: "power4.inOut",
        y: -24,
        delay: 0.5,
      }).to(q(".scroll-indicator"), {
        duration: 1.2,
        ease: "power2.out",
        y: 0,
        delay: 1,
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className={
        "absolute scroll-indicator-wrapper z-50 h-13 w-7 rounded-full border border-slate-400 center-x top-[85dvh] p-[3px]"
      }
    >
      <div className={"relative w-full h-full"}>
        <div
          className={
            "scroll-indicator absolute w-5 h-5 bg-primary-500 rounded-full bottom-0"
          }
        />
      </div>
    </div>
  );
};

export default ScrollIndicator;
