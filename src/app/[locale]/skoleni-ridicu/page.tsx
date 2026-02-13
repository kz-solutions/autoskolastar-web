import React from "react";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";

export default async function DriverTrainingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 pt-20">
        <DriverTrainingContent />
      </main>
      <Footer />
    </div>
  );
}

async function DriverTrainingContent() {
  const t = await getTranslations("DriverTrainingPage");

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
        {/* Training types */}
        <div>
          <h2 className="text-xl font-bold text-neutral-800 mb-6">
            {t("trainingTypes.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-primary-700 uppercase tracking-wide mb-1">
                {t("trainingTypes.referent.label")}
              </h3>
              <p className="text-neutral-700 mb-3">
                {t("trainingTypes.referent.description")}
              </p>
              <p className="text-neutral-700 font-semibold">
                {t("trainingTypes.referent.price")}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary-700 uppercase tracking-wide mb-1">
                {t("trainingTypes.professional.label")}
              </h3>
              <p className="text-neutral-700 mb-3">
                {t("trainingTypes.professional.description")}
              </p>
              <p className="text-neutral-700 font-semibold">
                {t("trainingTypes.professional.price")}
              </p>
            </div>
          </div>
        </div>

        {/* Training content */}
        <div>
          <h2 className="text-xl font-bold text-neutral-800 mb-6">
            {t("content.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t
              .raw("content.items")
              .map(
                (
                  item: { title: string; description: string },
                  index: number,
                ) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border p-6"
                  >
                    <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="w-6 h-6 bg-primary-600 rounded"></div>
                    </div>
                    <h3 className="font-semibold text-neutral-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {item.description}
                    </p>
                  </div>
                ),
              )}
          </div>
        </div>

        {/* Training benefits */}
        <div>
          <h2 className="text-xl font-bold text-neutral-800 mb-6">
            {t("benefits.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                {t("benefits.employer.title")}
              </h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                {Array.from({ length: 3 }).map((_, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {t(`benefits.employer.items.${index}`)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                {t("benefits.employee.title")}
              </h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                {Array.from({ length: 3 }).map((_, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {t(`benefits.employee.items.${index}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors">
            {t("contactButton")}
          </button>
        </div>
      </div>
    </div>
  );
}
