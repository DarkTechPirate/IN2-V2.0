import React from "react";
import { Truck, Star, Shield, Gift } from "lucide-react";
import { useTranslation } from "react-i18next";

const whyChooseData = [
  {
    icon: <Star className="w-6 h-6 text-primary_green" />,
    titleKey: "premium_quality_title",
    descriptionKey: "premium_quality_description",
  },
  {
    icon: <Truck className="w-6 h-6 text-primary_green" />,
    titleKey: "fast_delivery_title",
    descriptionKey: "fast_delivery_description",
  },
  {
    icon: <Shield className="w-6 h-6 text-primary_green" />,
    titleKey: "secure_shopping_title",
    descriptionKey: "secure_shopping_description",
  },
  {
    icon: <Gift className="w-6 h-6 text-primary_green" />,
    titleKey: "great_offers_title",
    descriptionKey: "great_offers_description",
  },
];

export function WhyChooseUs() {
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
          {t("why_choose_us_title")}
        </h2>
        <p className="text-gray-600 mb-12 max-w-[700px] mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
          {t("why_choose_us_subtitle")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                {t(item.titleKey)}
              </h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                {t(item.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
