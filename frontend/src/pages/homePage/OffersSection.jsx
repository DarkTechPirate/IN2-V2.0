import React from "react";
import { useTranslation } from "react-i18next";

export function OffersSection() {
  const { t } = useTranslation();

  const offers = [
    {
      titleKey: "home.offers.offer1.title",
      descriptionKey: "home.offers.offer1.description",
      bgColor: "bg-green-100",
      ctaKey: "home.offers.offer1.cta",
    },
    {
      titleKey: "home.offers.offer2.title",
      descriptionKey: "home.offers.offer2.description",
      bgColor: "bg-yellow-100",
      ctaKey: "home.offers.offer2.cta",
    },
    {
      titleKey: "home.offers.offer3.title",
      descriptionKey: "home.offers.offer3.description",
      bgColor: "bg-blue-100",
      ctaKey: "home.offers.offer3.cta",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2
          className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {t("home.offers.heading")}
        </h2>
        <p
          className="text-gray-600 mb-12 max-w-[700px] mx-auto"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {t("home.offers.description")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ${offer.bgColor}`}
            >
              <h3
                className="text-xl font-semibold mb-2 text-gray-900"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {t(offer.titleKey)}
              </h3>
              <p
                className="text-gray-700 mb-4 text-sm"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {t(offer.descriptionKey)}
              </p>
              <button className="px-4 py-2 rounded-lg bg-primary_green text-white hover:bg-green-600 transition-colors duration-300">
                {t(offer.ctaKey)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
