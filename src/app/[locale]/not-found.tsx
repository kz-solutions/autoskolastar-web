import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");
  return (
    <main className="flex-1 min-h-screen flex flex-col gap-2 items-center justify-center">
      <h2 className="text-heading_sm text-slate-600">{t("title")}</h2>
      <h3 className="text-xl text-slate-600">{t("subtitle")}</h3>
    </main>
  );
}
