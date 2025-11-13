import React from "react";
// --- FIX 1: Import useNavigate from react-router-dom ---
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// --- FIX 2: Remove onNavigate from props ---
const SocksPromo = () => {
  // --- FIX 3: Initialize the navigate function ---
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (

    <div className="flex flex-wrap gap-5 p-5 max-w-7xl mx-auto  font-sans">
      {/* --- LEFT COLUMN: Main Promo --- */}
      <div className="flex flex-[2] min-w-[300px] items-center bg-green-50 rounded-lg overflow-hidden">
        {/* Left: Image */}
        <div className="flex-1 h-full">
          {" "}
          <img
            src="product/image.png"
            alt={t("womens_socks")}
            className="w-full h-full object-cover block"
          />
        </div>

        {/* Left: Text Content */}
        <div className="flex-1 p-8 text-left">
          <p className="text-green-700 font-bold text-sm m-0">{t("new_arrivals")}</p>{" "}
          <h2 className="text-3xl lg:text-4xl my-3 text-gray-900 font-medium">
            {t("womens_socks")}
          </h2>
          <p className="text-lg text-gray-700 mb-6">{t("up_to_70_off")}</p>
          <button
            type="button"
            // --- FIX 4: Use navigate() instead of onNavigate() ---
            onClick={() => navigate("/shop")}
            className="inline-block py-2.5 px-5 border border-green-700 text-green-700 no-underline font-bold rounded-md transition-colors duration-300 hover:bg-green-700 hover:text-white cursor-pointer"
          >
            {t("shop_now")}
          </button>
        </div>
      </div>

      {/* --- RIGHT COLUMN: Categories --- */}
      <div className="flex flex-[1.5] min-w-[300px] flex-col gap-5">
        {/* Top Row (Two smaller boxes) */}
        <div className="flex gap-5">
          {/* Top-Left Box (Ankle Socks) */}
          <div className="relative flex-1 p-5 bg-cover bg-center rounded-lg min-h-[200px] flex flex-col justify-center text-gray-800">
            <img
              src="product/2.jpg"
              alt={t("ankle_socks")}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black opacity-30 rounded-lg z-10"></div>
            <span className="absolute top-4 left-4 bg-green-600 text-white py-1 px-2 text-xs font-bold rounded-sm z-20">
              20% OFF
            </span>
            <h3 className="text-2xl font-medium my-2 relative z-20 text-white">
              {t("ankle_socks")}
            </h3>{" "}
            <button
              type="button"
              // --- FIX 4: Use navigate() instead of onNavigate() ---
              onClick={() => navigate("/shop")} // Assumes this also goes to shop
              className="no-underline font-bold text-sm hover:underline relative z-20 text-white text-left cursor-pointer bg-transparent border-none p-0"
            >
              {t("shop_now")} &rsaquo;
            </button>
          </div>

          {/* Top-Right Box (Crew Socks) */}
          <div className="relative flex-1 p-5 bg-cover bg-center rounded-lg min-h-[200px] flex flex-col justify-center text-gray-800">
            <img
              src="product/4.jpg"
              alt={t("crew_socks")}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black opacity-30 rounded-lg z-10"></div>
            <span className="absolute top-4 left-4 bg-green-600 text-white py-1 px-2 text-xs font-bold rounded-sm z-20">
              15% OFF
            </span>
            <h3 className="text-2xl font-medium my-2 relative z-20 text-white">
              {t("crew_socks")}
            </h3>{" "}
            <button
              type="button"
              // --- FIX 4: Use navigate() instead of onNavigate() ---
              onClick={() => navigate("/shop")} // Assumes this also goes to shop
              className="no-underline font-bold text-sm hover:underline relative z-20 text-white text-left cursor-pointer bg-transparent border-none p-0"
            >
              {t("shop_now")} &rsaquo;
            </button>
          </div>
        </div>

        {/* Bottom Row (One large box) - Athletic Socks */}
        <div className="relative p-5 bg-cover bg-center rounded-lg min-h-[200px] flex flex-col justify-center text-gray-800">
          <img
            src="product/5.jpg"
            alt={t("athletic_socks")}
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black opacity-30 rounded-lg z-10"></div>

          <p className="text-sm m-0 font-bold text-white relative z-20">
            {t("performance")}
          </p>
          <h3 className="text-2xl font-medium my-2 text-white relative z-20">
            {t("athletic_socks")}
          </h3>
          <p className="text-base mb-2.5 text-white relative z-20">
            {t("sale_40_60_off")}
          </p>
          <button
            type="button"
            // --- FIX 4: Use navigate() instead of onNavigate() ---
            onClick={() => navigate("/shop")} // Assumes this also goes to shop
            className="no-underline font-bold text-sm hover:underline relative z-20 text-white text-left cursor-pointer bg-transparent border-none p-0"
          >
            {t("shop_now")} &rsaquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocksPromo;
