import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { motion } from "motion/react";
import { Package, MapPin, Truck, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { apiService } from "../../../services/api";
import { getImageUrl } from "../../../utils/imageUrl";

interface OrderTrackingResponse {
  order: {
    trackingNumber: string;
    createdAt: string;
    status: string;
    estimatedDelivery: string;
    trackingHistory: {
      location: string;
      date: string;
      status: string;
    }[];
    items: {
      product: {
        name: string;
        image: string;
      };
      quantity: number;
    }[];
  };
}

export function OrderTrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [order, setOrder] = useState<OrderTrackingResponse["order"] | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingNumber.trim()) {
      toast.error("Please enter a tracking number");
      return;
    }

    try {
      setLoading(true);
      setOrder(null);

      const res = await apiService.get<OrderTrackingResponse>(
        `/api/order/track/${trackingNumber}`
      );

      setOrder(res.order);
      console.log(res);
      toast.success("Order found!");
    } catch (err: any) {
      toast.error(
        err?.message === "Order not found"
          ? "No order found for this tracking number"
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (index: number) => {
    if (index === 0) return <Truck className="w-6 h-6 text-primary_green" />;
    return <CheckCircle2 className="w-6 h-6 text-primary_green" />;
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-primary_green" />
            <h1
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              }}
            >
              Track Your Order
            </h1>
          </div>
          <p
            className="text-gray-600"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Enter your tracking number to see the latest updates
          </p>
        </motion.div>

        {/* Tracking Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8"
        >
          <form onSubmit={handleTrackOrder} className="flex gap-3">
            <Input
              type="text"
              placeholder="Enter tracking number (e.g., IN2-2024-1234)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1 h-12 border-gray-300 focus:border-primary_green focus:ring-primary_green"
              style={{ fontFamily: "Inter, sans-serif" }}
            />

            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-8 bg-primary_green hover:bg-[#26d41f] text-white"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {loading ? "Tracking..." : "Track Order"}
            </Button>
          </form>
        </motion.div>

        {/* Order Details */}
        {order && (
          <>
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2
                    className="mb-1"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Order {order.trackingNumber}
                  </h2>
                  <p
                    className="text-gray-600 text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Placed on {new Date(order.createdAt).toDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-primary_green/10 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4 text-primary_green" />
                  <span
                    className="text-sm capitalize text-primary_green"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={getImageUrl(item.product.image)}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-sm"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {item.product.name}
                      </h3>
                      <p
                        className="text-sm text-gray-600"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Estimated Delivery */}
              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary_green" />
                <div>
                  <p
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Estimated Delivery
                  </p>
                  <p style={{ fontFamily: "Poppins, sans-serif" }}>
                    {order.estimatedDelivery}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tracking Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <h2 className="mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                Tracking History
              </h2>

              <div className="space-y-6">
                {order.trackingHistory.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          index === 0 ? "bg-primary_green/10" : "bg-gray-100"
                        }`}
                      >
                        {getStatusIcon(index)}
                      </div>

                      {index < order.trackingHistory.length - 1 && (
                        <div className="absolute left-1/2 top-12 -translate-x-1/2 w-0.5 h-6 bg-gray-200" />
                      )}
                    </div>

                    <div className="flex-1 pb-6">
                      <h3
                        className={`mb-1 ${
                          index === 0 ? "text-primary_green" : ""
                        }`}
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {event.status}
                      </h3>
                      <p
                        className="text-gray-600 text-sm mb-1"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {event.location}
                      </p>
                      <p
                        className="text-gray-500 text-sm"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {event.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {/* Empty State */}
        {!order && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-20"
          >
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2
              className="mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              No order tracked yet
            </h2>
            <p
              className="text-gray-600"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Enter your tracking number above to view order details
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
