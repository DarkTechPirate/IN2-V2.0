import React from "react";
import { Truck, Star, Shield, Gift } from "lucide-react";

const whyChooseData = [
  {
    icon: <Star className="w-6 h-6 text-primary_green" />,
    title: "Premium Quality",
    description: "Our socks are made from high-quality materials ensuring comfort, durability, and style.",
  },
  {
    icon: <Truck className="w-6 h-6 text-primary_green" />,
    title: "Fast Delivery",
    description: "Quick and reliable shipping to get your favorite socks delivered to your doorstep.",
  },
  {
    icon: <Shield className="w-6 h-6 text-primary_green" />,
    title: "Secure Shopping",
    description: "100% safe and secure payment options for a worry-free shopping experience.",
  },
  {
    icon: <Gift className="w-6 h-6 text-primary_green" />,
    title: "Great Offers",
    description: "Exclusive deals, discounts, and bundle offers to keep your sock drawer happy.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
          Why Choose Us
        </h2>
        <p className="text-gray-600 mb-12 max-w-[700px] mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
          We are committed to providing the best socks experience with comfort, style, and convenience. Here’s why our customers love us:
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
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
