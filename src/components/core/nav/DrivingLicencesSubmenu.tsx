"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/utils/routes";
import { Link } from "@/i18n/navigation";
import { GrLinkNext } from "react-icons/gr";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Group {
  title: string;
  href: string;
  items?: Array<{ shortTitle: string }>;
  close: () => void;
}

const Group = ({ title, items, href, close }: Group) => {
  const arrowRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
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

  return (
    <div className="flex flex-col">
      <Link
        ref={linkRef}
        className="group items-baseline hover:underline w-fit flex gap-2 px-1 xl:px-3 py-0.5 xl:py-1.5 mb-1"
        href={href}
        onClick={close}
      >
        <h4 className="font-[500] lg:text-xl text-slate-800 inline-block">
          {title}
        </h4>
        <div className="w-fit h-fit overflow-hidden">
          <div ref={arrowRef}>
            <GrLinkNext />
          </div>
        </div>
      </Link>

      {items?.map(({ shortTitle }) => {
        return (
          <Link
            onClick={close}
            key={shortTitle}
            className="w-fit px-1 xl:px-3 py-0.5 xl:py-1.5 "
            href={href}
          >
            <h5 className="lg:text-lg font-[300] text-slate-700 hover:underline inline-block mb-1">
              {shortTitle}
            </h5>
          </Link>
        );
      })}
    </div>
  );
};

const DrivingLicencesSubmenu = ({ close }: { close: () => void }) => {
  const t = useTranslations("HomePage.Header.DrivingLicenseSubmenu");

  const groups = {
    a: {
      title: t("A.title"),
      items: t.raw("A.items"),
      href: ROUTES.drivingLicenses + "/a",
      close: close,
    },
    b: {
      title: t("B.title"),
      items: t.raw("B.items"),
      href: ROUTES.drivingLicenses + "/b",
      close: close,
    },
    professional: {
      title: t("Professional.title"),
      items: t.raw("Professional.items"),
      href: ROUTES.drivingLicenses + "/profesni",
      close: close,
    },
    schooling: {
      title: t("Schooling.title"),
      href: ROUTES.drivingLicenses + "/skoleni-ridicu",
      close: close,
    },
    training: {
      title: t("Training.title"),
      href: ROUTES.drivingLicenses + "/kondicni-jizdy",
      close: close,
    },
    repeatedLectures: {
      title: t("RepeatedLectures.title"),
      href: ROUTES.drivingLicenses + "/opakovana-vyuka",
      close: close,
    },
  };

  return (
    <div className="grid grid-cols-4 gap-x-12 w-fit">
      <Group {...groups.a} />
      <Group {...groups.b} />
      <Group {...groups.professional} />
      <div className="flex flex-col gap-2">
        <Group {...groups.schooling} />
        <Group {...groups.training} />
        <Group {...groups.repeatedLectures} />
      </div>
    </div>
  );
};

export default DrivingLicencesSubmenu;
