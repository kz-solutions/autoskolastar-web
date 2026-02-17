"use client";

import React, { useRef } from "react";
import DrivingLicencesSubmenu from "@/components/core/nav/DrivingLicencesSubmenu";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Props {
  submenuKey: string | null;
  isVisible: boolean;
  close: () => void;
}

const OPACITY = { 1: { opacity: 1 }, 0: { opacity: 0 } };
const HEIGHT = { 1: { height: "auto" }, 0: { height: 0 } };

const SubmenuController = ({ submenuKey, isVisible, close }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const hasOpened = useRef(false);

  useGSAP(
    () => {
      const el = ref.current;
      const opened = hasOpened.current;
      if (!el) return;

      gsap.defaults({ duration: 0.5, ease: "power3.out" });

      if (opened && !isVisible) {
        gsap.to(el, HEIGHT["0"]);
        hasOpened.current = false;
      }

      if (opened && isVisible) {
        const currentHeight = el.offsetHeight;

        gsap.set(el, HEIGHT["1"]);
        const newHeight = el.offsetHeight;

        gsap.set(el, { height: currentHeight });
        gsap.to(el, { height: newHeight });

        gsap.fromTo(contentRef.current, OPACITY["0"], OPACITY["1"]);
      }

      if (!opened && isVisible) {
        gsap.fromTo(el, HEIGHT["0"], {
          height: "auto",
          onComplete: () => {
            gsap.set(el, { height: el.offsetHeight });
          },
        });
        hasOpened.current = true;
      }
    },
    { dependencies: [submenuKey, isVisible] },
  );

  return (
    <div
      ref={ref}
      className={`absolute top-full right-0 left-0 bg-white overflow-hidden h-0 shadow flex justify-center`}
    >
      <div ref={contentRef} className="px-24 pt-12 pb-16">
        {submenuKey === "drivingLicenses" && (
          <DrivingLicencesSubmenu close={close} />
        )}
        {submenuKey === "info" && <div>TEST 2</div>}
      </div>
    </div>
  );
};

export default SubmenuController;
