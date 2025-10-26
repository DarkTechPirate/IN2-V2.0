import React from "react";

const offersData = [
  {
    title: "Buy 3 Get 1 Free",
    description: "Stock up on your favorite socks! Add 4 pairs to your cart and pay for only 3.",
    bgColor: "bg-green-100",
    cta: "Shop Now",
  },
  {
    title: "20% Off on Winter Collection",
    description: "Keep your feet warm and stylish this winter. Limited-time discount on selected socks.",
    bgColor: "bg-yellow-100",
    cta: "Explore Collection",
  },
  {
    title: "Bundle Pack: Sports Socks",
    description: "Grab 5 pairs of sports socks at a special bundle price. Perfect for workouts.",
    bgColor: "bg-blue-100",
    cta: "Buy Bundle",
  },
];

export function OffersSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2
          className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Current Offers & Promotions
        </h2>
        <p
          className="text-gray-600 mb-12 max-w-[700px] mx-auto"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Don’t miss our exclusive deals! Check out our bundle offers and seasonal discounts.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offersData.map((offer, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ${offer.bgColor}`}
            >
              <h3
                className="text-xl font-semibold mb-2 text-gray-900"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {offer.title}
              </h3>
              <p
                className="text-gray-700 mb-4 text-sm"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {offer.description}
              </p>
              <button
                className="px-4 py-2 rounded-lg bg-primary_green text-white hover:bg-green-600 transition-colors duration-300"
              >
                {offer.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
