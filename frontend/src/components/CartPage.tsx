import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion } from "motion/react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { apiService } from "../services/api";
import { getImageUrl } from "../utils/imageUrl";
import { useNavigate } from "react-router-dom";

export function CartPage() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ------------------- FETCH CART ------------------- */
  const fetchCart = async () => {
    try {
      const res = await apiService.get("/api/cart");
      setCart(res);
    } catch {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <div className="pt-20 text-center">Loading cart...</div>;

  if (!cart || cart.cart.items.length === 0)
    return (
      <div className="pt-20 text-center">
        <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
      </div>
    );

  const items = cart.cart.items;

  /* ------------------- UPDATE QUANTITY ------------------- */
  const updateQty = async (item: any, newQty: number) => {
    if (newQty < 1) return;

    try {
      const res = await apiService.put("/api/cart/update", {
        productId: item.product._id,
        size: item.size,
        color: item.color,
        quantity: newQty,
      });

      setCart(res);
      toast.success("Quantity updated");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update quantity");
    }
  };

  /* ------------------- REMOVE ITEM ------------------- */
  const removeItem = async (item: any) => {
    try {
      const res = await apiService.delete(
        `/api/cart/${item.product._id}?size=${item.size}&color=${item.color}`
      );

      setCart(res);
      toast.success("Item removed");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  /* ------------------- PAGE UI ------------------- */
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="w-8 h-8 text-primary_green" />
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
          </div>
          <p className="text-gray-600">{items.length} items in your cart</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ------------------- LEFT: Items ------------------- */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl p-4 shadow flex gap-4 border"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={getImageUrl(item.product.image)}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{item.product.name}</h3>

                      <button
                        onClick={() => removeItem(item)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 mt-1">
                      Size: {item.size} • Color: {item.color}
                    </p>

                    <p className="text-lg font-semibold mt-1">
                      ₣{item.product.sellingPrice}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => updateQty(item, item.quantity - 1)}
                    >
                      <Minus />
                    </Button>

                    <span className="w-8 text-center">{item.quantity}</span>

                    <Button
                      variant="outline"
                      onClick={() => updateQty(item, item.quantity + 1)}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ------------------- RIGHT: Summary ------------------- */}
          <div className="bg-white rounded-xl p-6 shadow border">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₣{cart.totalCost.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>₣15</span>
            </div>

            <div className="flex justify-between mb-4">
              <strong>Total</strong>
              <strong>₣{(cart.totalCost + 15).toFixed(2)}</strong>
            </div>

            <Button
              className="w-full bg-primary_green text-black"
              onClick={() => navigate("/checkout")}
            >
              Checkout <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
