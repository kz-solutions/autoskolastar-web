import { useTranslations } from "next-intl";

export const useStartingPriceTemplate = () => {
  const t = useTranslations("HomePage.LicenseCategories");

  return (price: number) => {
    if (!price) return "-";

    return t(
      "startingPriceTemplate",
      { price },
      {
        number: {
          currency: {
            style: "currency",
          },
        },
      },
    );
  };
};
