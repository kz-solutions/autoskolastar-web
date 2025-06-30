import { ClassName } from "@/utils/types/Props";

type Props = {
  weight?: number;
};

export const StarIcon = ({ weight = 2, className }: Props & ClassName) => {
  return (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.2939 7.21875L11.5186 7.91016H16.4326L13.0449 10.3711L12.457 10.7988L12.6816 11.4893L13.9756 15.4717L10.5879 13.0107L10 12.584L9.41211 13.0107L6.02344 15.4717L7.31836 11.4893L7.54297 10.7988L6.95508 10.3711L3.56738 7.91016H8.48145L8.70605 7.21875L10 3.23535L11.2939 7.21875Z"
        stroke="currentColor"
        strokeWidth={`${weight}`}
      />
    </svg>
  );
};
