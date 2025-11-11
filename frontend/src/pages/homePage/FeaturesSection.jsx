import React from "react";
import { Feather, Sun, Leaf, Heart } from "lucide-react";

const featuresData = [
  {
    icon: <Feather className="w-6 h-6 text-white" />,
    title: "Ultra Soft",
    description: "Experience unmatched comfort with our premium soft socks.",
    bgColor: "bg-primary_green",
  },
  {
    icon: <Sun className="w-6 h-6 text-white" />,
    title: "Breathable",
    description: "Keep your feet fresh all day with our breathable fabric.",
    bgColor: "bg-yellow-400",
  },
  {
    icon: <Leaf className="w-6 h-6 text-white" />,
    title: "Eco-Friendly",
    description: "Made from sustainable materials to protect the environment.",
    bgColor: "bg-green-500",
  },
  {
    icon: <Heart className="w-6 h-6 text-white" />,
    title: "Durable & Reliable",
    description: "Long-lasting socks that stay comfortable wash after wash.",
    bgColor: "bg-red-500",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2
          className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Our Features
        </h2>
        <p
          className="text-gray-600 mb-12 max-w-[700px] mx-auto"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Discover why our socks are loved by thousands. We focus on comfort, durability, and style for all-day wear.
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
                {feature.title}
              </h3>
              <p
                className="text-gray-600 text-sm"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
