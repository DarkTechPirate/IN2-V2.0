import { useEffect, useState } from "react";
import { apiService } from "../../../services/api";
import { motion } from "motion/react";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { Button } from "../../../components/ui/button";
import { Package, Truck, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function OrderHistoryPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    apiService.get("/api/order/history")
      .then((res) => setOrders(res.orders))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="pt-20 text-center">Loading order history...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="pt-20 text-center">
        <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold">No Orders Yet</h2>
        <p className="text-gray-600">Start shopping to place your first order!</p>
      </div>
    );
  }

  const statusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-orange-500" />;
      case "in-transit":
        return <Truck className="w-5 h-5 text-yellow-500" />;
      case "delivered":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-primary_green" />
            <h1 className="font-poppins text-3xl">My Orders</h1>
          </div>
          <p className="text-gray-600 font-inter">View your past order history</p>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white p-6 rounded-xl shadow border"
            >
              {/* Top Section */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-poppins text-lg">
                    Order #{order.trackingNumber}
                  </h2>
                  <p className="text-gray-500 text-sm font-inter">
                    {new Date(order.createdAt).toDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                  {statusIcon(order.status)}
                  <span className="font-inter text-sm capitalize">
                    {order.status.replace("-", " ")}
                  </span>
                </div>
              </div>

              {/* Items Preview */}
              <div className="flex gap-6 overflow-x-auto pb-2">
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-poppins text-sm">{item.product.name}</p>
                      <p className="text-gray-500 text-xs font-inter">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Section */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <p className="font-poppins text-lg">
                  Total: ₣{order.totalAmount.toFixed(2)}
                </p>

                <Button
                  className="bg-primary_green text-black flex items-center gap-2"
                  onClick={() => navigate(`/track-order/${order.trackingNumber}`)}
                >
                  Track Order <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
