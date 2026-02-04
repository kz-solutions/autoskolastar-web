import { useTranslations } from "next-intl";

export const priceTemplate = (
  category_code: string,
  pricingArray: Array<{ category_code: string; min_price: number }>,
  t: ReturnType<typeof useTranslations>,
) => {
  return t(
    "priceTemplate",
    {
      price:
        pricingArray.find(({ category_code: code }) => code === category_code)
          ?.min_price ?? 0,
    },
    {
      number: {
        currency: {
          style: "currency",
        },
      },
    },
  );
};
