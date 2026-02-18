"use client";

import React, { useRef } from "react";
import DrivingLicencesSubmenu from "@/components/core/nav/DrivingLicencesSubmenu";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GrLinkNext } from "react-icons/gr";

export type ImportantLink = {
  label: string;
  href?: string;
  external?: boolean;
  download?: boolean;
};

interface Props {
  submenuKey: string | null;
  isVisible: boolean;
  close: () => void;
  importantLinks?: ImportantLink[];
}

const OPACITY = { 1: { opacity: 1 }, 0: { opacity: 0 } };
const HEIGHT = { 1: { height: "auto" }, 0: { height: 0 } };

function getImportantLinkMeta(item: ImportantLink) {
  const href = (item.href ?? "").trim();
  const disabled = href.length === 0;
  const external = item.external ?? href.startsWith("http");
  return { href, disabled, external };
}

function ImportantDesktopItem({
  item,
  close,
}: {
  item: ImportantLink;
  close: () => void;
}) {
  const { href, disabled, external } = getImportantLinkMeta(item);
  const arrowRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (disabled) return;
    const el = arrowRef.current;

    gsap.defaults({ duration: 0.3 });
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        gsap.set(el, { xPercent: 0 });
      },
    });

    tl.to(el, { xPercent: 100, ease: "power2.in" })
      .set(el, { xPercent: -100 })
      .to(el, { xPercent: 0, ease: "power1.out" });

    linkRef.current?.addEventListener("mouseenter", () => {
      if (!tl.isActive()) {
        tl.play(0);
      }
    });
  });

  if (disabled) {
    return (
      <span
        key={item.label}
        className="group items-baseline w-fit flex gap-2 px-1 xl:px-3 py-1.5 text-neutral-400 cursor-not-allowed"
      >
        <span className="font-[500] lg:text-xl inline-block">
          {item.label}
        </span>
      </span>
    );
  }

  return (
    <a
      key={item.label}
      ref={linkRef}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      download={item.download}
      onClick={close}
      className="group items-baseline hover:underline w-fit flex gap-2 px-1 xl:px-3 py-0.5 xl:py-1.5 mb-1"
    >
      <span className="font-[500] lg:text-xl text-slate-800 inline-block">
        {item.label}
      </span>
      <div className="w-fit h-fit overflow-hidden text-slate-600">
        <div ref={arrowRef}>
          <GrLinkNext />
        </div>
      </div>
    </a>
  );
}

const SubmenuController = ({
  submenuKey,
  isVisible,
  close,
  importantLinks = [],
}: Props) => {
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
      <div
        ref={contentRef}
        className="px-12 xl:px-24 pt-8 xl:pt-12 pb-12 xl:pb-16"
      >
        {submenuKey === "drivingLicenses" && (
          <DrivingLicencesSubmenu close={close} />
        )}
        {submenuKey === "info" && <div>TEST 2</div>}
        {submenuKey === "important" && (
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-3 w-fit">
            {importantLinks.map((item) => (
              <ImportantDesktopItem key={item.label} item={item} close={close} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmenuController;
