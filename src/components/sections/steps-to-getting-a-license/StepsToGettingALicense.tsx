"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Divider from "@/components/core/Divider";
import useIsDesktop from "@/hooks/useIsDesktop";
import { FileIcon } from "@/icons/File";
import { BookIcon } from "@/icons/Book";
import { SteeringWheelIcon } from "@/icons/SteeringWheel";
import { GraduationHatIcon } from "@/icons/GraduationHat";

const StepsToGettingALicense = () => {
  const t = useTranslations("HomePage.StepsToGettingALicense");
  const isDesktop = useIsDesktop();

  const steps = t.raw("steps");
  const icons = [FileIcon, BookIcon, SteeringWheelIcon, GraduationHatIcon];

  return (
    <section className={"bg-gray-100 px-4 sm:px-6 lg:px-12"}>
      <header>
        <h2 className={"text-heading_lg text-neutral-800 text-center"}>
          {t.rich("title", {
            primary: (chunks) => (
              <span className={"text-primary-500"}>{chunks}</span>
            ),
          })}
        </h2>
        <p className={"text-md text-neutral-600 text-center"}>{t("perex")}</p>
      </header>
      <div
        className={
          "grid lg:grid-rows-[min-content_max-content] lg:grid-flow-col gap-x-4 lg:gap-x-12 gap-y-8 max-w-[1320px]"
        }
      >
        {steps.map(
          (
            { title, description }: { title: string; description: string },
            idx: number,
          ) => {
            const Icon = icons[idx];
            return (
              <React.Fragment key={title}>
                <div
                  key={"section-" + title}
                  className={"flex flex-col gap-y-1"}
                >
                  <div className={"flex gap-x-2 items-center"}>
                    <Icon className={"text-primary-500 size-4 mb-0.5"} />
                    <h5 className={"text-primary-500"}>
                      {"0".concat(String(idx + 1))}
                    </h5>
                  </div>

                  <h3 className={"text-heading_md text-neutral-800"}>
                    {title}
                  </h3>
                </div>

                <p className={"place-self-end-safe text-md text-neutral-600"}>
                  {description}
                </p>
                {idx < steps.length - 1 && (
                  <Divider
                    orientation={isDesktop ? "vertical" : "horizontal"}
                    className={"lg:row-span-2 col-span-2"}
                  />
                )}
              </React.Fragment>
            );
          },
        )}
      </div>
    </section>
  );
};

export default StepsToGettingALicense;
