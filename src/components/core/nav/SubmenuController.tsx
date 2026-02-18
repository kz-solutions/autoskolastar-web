"use client";

import React, { useRef } from "react";
import DrivingLicencesSubmenu from "@/components/core/nav/DrivingLicencesSubmenu";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GrLinkNext } from "react-icons/gr";

import type { InfoSubmenu } from "./types";

export interface SubmenuControllerProps {
  submenuKey: string | null;
  isVisible: boolean;
  close: () => void;
  importantLinks?: Array<{
    label: string;
    href?: string;
    external?: boolean;
    download?: boolean;
  }>;
  infoSubmenu?: InfoSubmenu | null;
}

const OPACITY = { 1: { opacity: 1 }, 0: { opacity: 0 } };
const HEIGHT = { 1: { height: "auto" }, 0: { height: 0 } };

function getImportantLinkMeta(item: {
  label: string;
  href?: string;
  external?: boolean;
  download?: boolean;
}) {
  const href = (item.href ?? "").trim();
  const disabled = href.length === 0;
  const external = item.external ?? href.startsWith("http");
  return { href, disabled, external };
}

const ImportantLinkItem = ({
  item,
  close,
  variant = "default",
}: {
  item: {
    label: string;
    href?: string;
    external?: boolean;
    download?: boolean;
  };
  close: () => void;
  variant?: "default" | "subitem";
}) => {
  const { href, disabled, external } = getImportantLinkMeta(item);
  const arrowRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const isSubitem = variant === "subitem";

  useGSAP(() => {
    if (disabled) return;
    const el = arrowRef.current;

    gsap.defaults({ duration: 0.3, ease: "power2.out" });
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        gsap.set(el, { xPercent: 0 });
      },
    });

    tl.to(el, { xPercent: 100 })
      .set(el, { xPercent: -100 })
      .to(el, { xPercent: 0 });

    linkRef.current?.addEventListener("mouseenter", () => {
      if (!tl.isActive()) {
        tl.play(0);
      }
    });
  });

  const labelClass = isSubitem
    ? "lg:text-lg font-[300] text-slate-700"
    : "font-[500] lg:text-xl text-slate-800";
  const disabledLabelClass = isSubitem
    ? "lg:text-lg font-[300] text-neutral-400"
    : "font-[500] lg:text-xl text-neutral-400";

  if (disabled) {
    return (
      <span className="group items-baseline w-fit flex gap-2 px-1 xl:px-3 py-0.5 xl:py-1.5 mb-1 cursor-not-allowed">
        <span className={`${disabledLabelClass} inline-block`}>{item.label}</span>
      </span>
    );
  }

  return (
    <a
      ref={linkRef}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      download={item.download}
      onClick={close}
      className="group items-baseline hover:underline w-fit flex gap-2 px-1 xl:px-3 py-0.5 xl:py-1.5 mb-1"
    >
      <span className={`${labelClass} inline-block`}>{item.label}</span>
      <div className="w-fit h-fit overflow-hidden">
        <div ref={arrowRef}>
          <GrLinkNext />
        </div>
      </div>
    </a>
  );
};

/** Stejná struktura jako DrivingLicencesSubmenu Group: nadpis se šipkou, pod ním odsazené položky bez šipky. */
function InfoSubmenuView({
  infoSubmenu,
  close,
}: {
  infoSubmenu: InfoSubmenu;
  close: () => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-x-12 w-fit">
      <div className="flex flex-col">
        <div className="px-1 xl:px-3 py-0.5 xl:py-1.5 mb-1">
          <span className="font-[500] lg:text-xl text-slate-800">
            {infoSubmenu.documents.title}
          </span>
        </div>
        <div>
          {infoSubmenu.documents.items.map((item) => {
            const { href, disabled, external } = getImportantLinkMeta(item);
            if (disabled) {
              return (
                <span
                  key={item.label}
                  className="block w-fit px-1 xl:px-3 py-0.5 xl:py-1.5 mb-1 lg:text-lg font-[300] text-neutral-400 cursor-not-allowed"
                >
                  {item.label}
                </span>
              );
            }
            return (
              <a
                key={item.label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                download={item.download}
                onClick={close}
                className="block w-fit px-1 xl:px-3 py-0.5 xl:py-1.5"
              >
                <span className="lg:text-lg font-[300] text-slate-700 hover:underline inline-block mb-1">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="px-1 xl:px-3 py-0.5 xl:py-1.5 mb-1">
          <span className="font-[500] lg:text-xl text-slate-800">
            {infoSubmenu.links.title}
          </span>
        </div>
        <div>
          {infoSubmenu.links.items.map((item) => {
            const { href, disabled, external } = getImportantLinkMeta(item);
            if (disabled) {
              return (
                <span
                  key={item.label}
                  className="block w-fit px-1 xl:px-3 py-0.5 xl:py-1.5 mb-1 lg:text-lg font-[300] text-neutral-400 cursor-not-allowed"
                >
                  {item.label}
                </span>
              );
            }
            return (
              <a
                key={item.label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                download={item.download}
                onClick={close}
                className="block w-fit px-1 xl:px-3 py-0.5 xl:py-1.5"
              >
                <span className="lg:text-lg font-[300] text-slate-700 hover:underline inline-block mb-1">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const SubmenuController = ({
  submenuKey,
  isVisible,
  close,
  importantLinks = [],
  infoSubmenu = null,
}: SubmenuControllerProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const hasOpened = useRef(false);

  useGSAP(
    () => {
      const el = ref.current;
      const opened = hasOpened.current;
      if (!el) return;

      gsap.defaults({ duration: 0.5, ease: "power2.out" });

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
      <div
        ref={contentRef}
        className="px-12 xl:px-24 pt-8 xl:pt-12 pb-12 xl:pb-16"
      >
        {submenuKey === "drivingLicenses" && (
          <DrivingLicencesSubmenu close={close} />
        )}
        {submenuKey === "info" && infoSubmenu && (
          <InfoSubmenuView infoSubmenu={infoSubmenu} close={close} />
        )}
      </div>
    </div>
  );
};

export default SubmenuController;
