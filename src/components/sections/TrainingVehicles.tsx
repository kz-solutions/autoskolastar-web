import React from "react";
import { getTranslations } from "next-intl/server";
import { getVehicleTypes, getVehicleColors, getVehicleRotations } from "@/utils/vehicleUtils";

type Props = {
  category: string;
  t: Awaited<ReturnType<typeof getTranslations>>;
};

export default function TrainingVehicles({ category, t }: Props) {
  const vehicleTypes = getVehicleTypes(category);
  const colorSchemes = getVehicleColors(category);
  const rotations = getVehicleRotations();

  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-800 mb-6">
        {t("trainingVehicles.title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicleTypes.map((vehicleType, index) => {
          const colors = colorSchemes[index];
          const rotation = rotations[index];
          
          return (
            <div
              key={vehicleType}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${colors.bg} border border-white/50 shadow-lg ${rotation} hover:scale-105 transition-transform duration-300`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.overlay} opacity-10`} />
              <div className="relative z-10">
                <div className={`w-16 h-10 ${colors.vehicle} rounded-lg mb-4 shadow-md`} />
                <h3 className="font-semibold text-neutral-800 mb-2">
                  {t(`trainingVehicles.${vehicleType}.title`)}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {t(`trainingVehicles.${vehicleType}.description`)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
