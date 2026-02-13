import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

export const registerGSAP = () => {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
    gsap.registerPlugin(ScrollTrigger, useGSAP);
    gsap.registerPlugin(SplitText);
  }
};
