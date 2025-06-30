import { ClassName } from "@/utils/types/Props";

export const FileIcon = ({ className }: ClassName) => (
  <svg
    width="12"
    height="14"
    viewBox="0 0 12 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.3538 3.94044L7.85375 0.440439C7.7599 0.346695 7.63265 0.294085 7.5 0.294189H1.5C0.947715 0.294189 0.5 0.741905 0.5 1.29419V12.2942C0.5 12.8465 0.947715 13.2942 1.5 13.2942H10.5C11.0523 13.2942 11.5 12.8465 11.5 12.2942V4.29419C11.5001 4.16154 11.4475 4.03429 11.3538 3.94044ZM8 2.00106L9.79313 3.79419H8V2.00106ZM10.5 12.2942H1.5V1.29419H7V4.29419C7 4.57033 7.22386 4.79419 7.5 4.79419H10.5V12.2942Z"
      fill="currentColor"
    />
  </svg>
);
