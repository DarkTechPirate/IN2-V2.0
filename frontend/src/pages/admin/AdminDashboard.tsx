import { useState } from "react";
import { motion } from "framer-motion";
import { ProductPerformanceTable } from "../../components/admin/dashboard/ProductPerformanceTable";
import { AnalyticsSummary } from "../../components/admin/dashboard/AnalyticsSummary";
import { SalesByTimeCard } from "../../components/admin/dashboard/SalesByTimeCard";
import { SalesByLocationCard } from "../../components/admin/dashboard/SalesByLocationCard";
import { SalesByPriceCard } from "../../components/admin/dashboard/SalesByPriceCard";
import { ActionBar } from "../../components/admin/dashboard/ActionBar";

export function AdminDashboard() {
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <h1 className="mb-2" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
            Admin Dashboard
          </h1>
          <p className="text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
            Manage gallery and view analytics
          </p>
        </motion.div>

        {/* Action bar (no Add Product button here) */}
        <ActionBar />

        {/* Summary Cards + performance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 mt-6">
          <AnalyticsSummary selectedMonth={selectedMonth} />
          <ProductPerformanceTable selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
          <SalesByTimeCard />
          <div className="grid md:grid-cols-2 gap-6">
            <SalesByLocationCard />
            <SalesByPriceCard />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
