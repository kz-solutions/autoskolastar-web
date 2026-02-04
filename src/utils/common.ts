import { useTranslations } from "next-intl";

export const useStartingPriceTemplate = (price: number) => {
  const t = useTranslations("HomePage.LicenseCategories");

  return t(
    "startingPriceTemplate",
    {
      price,
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
