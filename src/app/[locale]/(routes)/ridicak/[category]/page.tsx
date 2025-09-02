import React from "react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import TrainingVehicles from "@/components/sections/TrainingVehicles";

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

export default async function LicenseCategoryPage({ params }: Props) {
  const { locale, category } = await params;

  const allowedCategories = ["a", "b", "c", "d", "t"];
  if (!allowedCategories.includes(category.toLowerCase())) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 pt-20">
        <LicenseCategoryContent category={category} />
      </main>
      <Footer />
    </div>
  );
}

async function LicenseCategoryContent({ category }: { category: string }) {
  const t = await getTranslations(`LicensePage.${category.toUpperCase()}`);

  return (
    <div className="py-8">
      {/* Hero sekce */}
      <div className="text-center py-8 px-4 mb-8">
        <h1 className="text-3xl font-bold text-neutral-800 mb-4">
          {t("title")}
        </h1>
        <p className="text-base text-neutral-600 max-w-4xl mx-auto leading-relaxed">
          {t("description")}
        </p>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        
        {/* Podrobnosti o kurzu */}
        <div>
          <h2 className="text-xl font-bold text-neutral-800 mb-6">
            {t("courseDetails.title")}
          </h2>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-semibold text-primary-700 uppercase tracking-wide mb-1">
                {t("courseDetails.duration.label")}
              </h3>
              <p className="text-neutral-700">{t("courseDetails.duration.value")}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary-700 uppercase tracking-wide mb-1">
                {t("courseDetails.vehicles.label")}
              </h3>
              <p className="text-neutral-700">{t("courseDetails.vehicles.value")}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary-700 uppercase tracking-wide mb-1">
                {t("courseDetails.certification.label")}
              </h3>
              <p className="text-neutral-700">{t("courseDetails.certification.value")}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary-700 uppercase tracking-wide mb-1">
                {t("courseDetails.price.label")}
              </h3>
              <p className="text-neutral-700 font-semibold">{t("courseDetails.price.value")}</p>
            </div>
          </div>
          <button className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors">
            {t("enrollButton")}
          </button>
        </div>

        {/* Training vehicles */}
        <TrainingVehicles category={category} t={t} />
      </div>
    </div>
  );
}
