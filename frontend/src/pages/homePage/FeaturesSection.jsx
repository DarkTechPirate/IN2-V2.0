import React from "react";
import { Feather, Sun, Leaf, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

const featuresData = [
  {
    icon: <Feather className="w-6 h-6 text-white" />,
    titleKey: "ultra_soft_title",
    descriptionKey: "ultra_soft_description",
    bgColor: "bg-primary_green",
  },
  {
    icon: <Sun className="w-6 h-6 text-white" />,
    titleKey: "breathable_title",
    descriptionKey: "breathable_description",
    bgColor: "bg-yellow-400",
  },
  {
    icon: <Leaf className="w-6 h-6 text-white" />,
    titleKey: "eco_friendly_title",
    descriptionKey: "eco_friendly_description",
    bgColor: "bg-green-500",
  },
  {
    icon: <Heart className="w-6 h-6 text-white" />,
    titleKey: "durable_reliable_title",
    descriptionKey: "durable_reliable_description",
    bgColor: "bg-red-500",
  },
];

export function FeaturesSection() {
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2
          className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {t("our_features")}
        </h2>
        <p
          className="text-gray-600 mb-12 max-w-[700px] mx-auto"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {t("features_subtitle")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className={`flex items-center justify-center w-14 h-14 mb-4 rounded-full ${feature.bgColor}`}
              >
                {feature.icon}
              </div>
              <h3
                className="text-xl font-semibold mb-2 text-gray-900"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {t(feature.titleKey)}
              </h3>
              <p
                className="text-gray-600 text-sm"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {t(feature.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
