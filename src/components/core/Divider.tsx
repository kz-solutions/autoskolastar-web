import React, { HTMLAttributes } from "react";
import { StarIcon } from "@/icons/Star";
import { ClassName } from "@/utils/types/Props";

type Props = {
  orientation?: "horizontal" | "vertical";
  color?: string;
  bgColor?: string;
} & HTMLAttributes<HTMLDivElement>;

const Divider = ({
  orientation = "vertical",
  color = "text-primary-500",
  bgColor = "bg-primary-500",
  className,
  ...rest
}: Props & ClassName) => {
  return (
    <div
      className={`flex items-center gap-3 ${orientation === "vertical" ? "flex-col h-full" : "w-full"} ${className}`}
      {...rest}
    >
      <div
        className={`${orientation === "vertical" ? "h-full w-[1px]" : "w-full h-[1px]"} ${bgColor}`}
      />
      <StarIcon weight={1} className={`shrink-0 ${color}`} />
      <div
        className={`${orientation === "vertical" ? "h-full w-[1px]" : "w-full h-[1px]"} ${bgColor}`}
      />
    </div>
  );
};

export default Divider;
