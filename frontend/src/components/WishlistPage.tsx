import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

export function WishlistPage() {
  const { t } = useTranslation();

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Elite Performance Tee",
      price: 89,
      image:
        "https://images.unsplash.com/photo-1641808887823-b3201916a57d?w=400",
      inStock: true,
    },
    {
      id: 2,
      name: "Motion Flex Leggings",
      price: 129,
      image:
        "https://images.unsplash.com/photo-1645652367526-a0ecb717650a?w=400",
      inStock: true,
    },
    {
      id: 3,
      name: "Ultra-Lite Jacket",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1637844528612-064026615fcd?w=400",
      inStock: false,
    },
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    toast.success(t("wishlist.removed"));
  };

  const addToCart = (item: WishlistItem) => {
    toast.success(t("wishlist.added_to_cart", { name: item.name }));
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-primary_green" />
            <h1
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              }}
            >
              {t("wishlist.title")}
            </h1>
          </div>
          <p
            className="text-gray-600"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1
              ? t("wishlist.items_single")
              : t("wishlist.items")}
          </p>
        </motion.div>

        {/* Wishlist Items */}
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span
                        className="bg-white px-4 py-2 rounded-full text-sm"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {t("wishlist.out_of_stock")}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md"
                    aria-label={t(
                      "nav.remove_from_wishlist",
                      "Remove from wishlist"
                    )}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3
                    className="mb-2"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="text-gray-600 mb-4"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    ${item.price}
                  </p>
                  <Button
                    onClick={() => addToCart(item)}
                    disabled={!item.inStock}
                    className="w-full h-11 bg-primary_green hover:bg-[#26d41f] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {item.inStock
                      ? t("wishlist.add_to_cart")
                      : t("wishlist.out_of_stock")}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              {t("wishlist.empty_title")}
            </h2>
            <p
              className="text-gray-600 mb-8"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {t("wishlist.empty_paragraph")}
            </p>
            <Button
              className="h-12 px-8 bg-primary_green hover:bg-[#26d41f] text-white"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {t("wishlist.continue_shopping")}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
