import React from "react";
import { StarIcon } from "@/icons/Star";

type Props = {
  title: string;
  color?: string;
};

const SectionLabel = ({ title, color = "text-primary-500" }: Props) => {
  return (
    <div
      className={`w-full justify-between flex text-label items-center gap-24 ${color}`}
    >
      <StarIcon className={`shrink-0 ${color}`} />
      <hr className={`w-full ${color}`} />
      <span className={"text-nowrap"}>{title}</span>
      <hr className={`w-full ${color}`} />
      <StarIcon className={`shrink-0 ${color}`} />
    </div>
  );
};

export default SectionLabel;
