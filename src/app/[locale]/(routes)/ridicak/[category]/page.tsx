import React from "react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import Image from "next/image";

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
  
  // Get vehicle types based on category
  const getVehicleTypes = (cat: string) => {
    const lowerCat = cat.toLowerCase();
    switch (lowerCat) {
      case 'b':
        return ['sedan', 'hatchback', 'suv'];
      case 'a':
        return ['sport', 'naked', 'touring'];
      case 'c':
        return ['medium', 'box', 'flatbed'];
      case 'd':
        return ['city', 'intercity', 'minibus'];
      case 't':
        return ['agricultural', 'construction', 'forestry'];
      default:
        return ['sedan', 'hatchback', 'suv'];
    }
  };

  const vehicleTypes = getVehicleTypes(category);

  // Get colors based on category
  const getVehicleColors = (cat: string, index: number) => {
    const lowerCat = cat.toLowerCase();
    const colorSchemes: Record<string, Array<{bg: string, overlay: string, vehicle: string}>> = {
      'b': [
        { bg: 'from-gray-100 to-gray-200', overlay: 'from-gray-300 via-gray-400 to-gray-500', vehicle: 'bg-gray-600' },
        { bg: 'from-blue-100 to-blue-200', overlay: 'from-blue-300 via-blue-400 to-blue-600', vehicle: 'bg-blue-700' },
        { bg: 'from-gray-50 to-gray-100', overlay: 'from-gray-200 via-gray-300 to-gray-400', vehicle: 'bg-gray-500' }
      ],
      'a': [
        { bg: 'from-red-100 to-red-200', overlay: 'from-red-300 via-red-400 to-red-600', vehicle: 'bg-red-700' },
        { bg: 'from-orange-100 to-orange-200', overlay: 'from-orange-300 via-orange-400 to-orange-600', vehicle: 'bg-orange-700' },
        { bg: 'from-yellow-100 to-yellow-200', overlay: 'from-yellow-300 via-yellow-400 to-yellow-600', vehicle: 'bg-yellow-700' }
      ],
      'c': [
        { bg: 'from-green-100 to-green-200', overlay: 'from-green-300 via-green-400 to-green-600', vehicle: 'bg-green-700' },
        { bg: 'from-teal-100 to-teal-200', overlay: 'from-teal-300 via-teal-400 to-teal-600', vehicle: 'bg-teal-700' },
        { bg: 'from-cyan-100 to-cyan-200', overlay: 'from-cyan-300 via-cyan-400 to-cyan-600', vehicle: 'bg-cyan-700' }
      ],
      'd': [
        { bg: 'from-purple-100 to-purple-200', overlay: 'from-purple-300 via-purple-400 to-purple-600', vehicle: 'bg-purple-700' },
        { bg: 'from-indigo-100 to-indigo-200', overlay: 'from-indigo-300 via-indigo-400 to-indigo-600', vehicle: 'bg-indigo-700' },
        { bg: 'from-pink-100 to-pink-200', overlay: 'from-pink-300 via-pink-400 to-pink-600', vehicle: 'bg-pink-700' }
      ],
      't': [
        { bg: 'from-amber-100 to-amber-200', overlay: 'from-amber-300 via-amber-400 to-amber-600', vehicle: 'bg-amber-700' },
        { bg: 'from-lime-100 to-lime-200', overlay: 'from-lime-300 via-lime-400 to-lime-600', vehicle: 'bg-lime-700' },
        { bg: 'from-emerald-100 to-emerald-200', overlay: 'from-emerald-300 via-emerald-400 to-emerald-600', vehicle: 'bg-emerald-700' }
      ]
    };
    return colorSchemes[lowerCat] || colorSchemes['b'];
  };

  const colorSchemes = getVehicleColors(category, 0);

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
        <div>
          <h2 className="text-xl font-bold text-neutral-800 mb-6">
            {t("trainingVehicles.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicleTypes.map((vehicleType, index) => {
              const colors = getVehicleColors(category, index)[index];
              const rotations = ['transform -rotate-1', 'transform rotate-1', 'transform'];
              
              return (
                <div key={vehicleType} className="text-center">
                  <div className="bg-white rounded-xl shadow-sm border mb-4 overflow-hidden">
                    <div className={`h-44 bg-gradient-to-br ${colors.bg} flex items-center justify-center relative`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.overlay} opacity-80`}></div>
                      <div className={`relative w-32 h-16 ${colors.vehicle} rounded-lg shadow-lg ${rotations[index]}`}></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-neutral-800 mb-2">
                        {t(`trainingVehicles.${vehicleType}.title`)}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {t(`trainingVehicles.${vehicleType}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
