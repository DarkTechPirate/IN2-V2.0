import { useEffect, useState, useRef } from "react";
import {
  ShoppingCart,
  Heart,
  Star,
  MapPin,
  Truck,
  Shield,
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "../../../services/api";
import { getImageUrl } from "../../../utils/imageUrl";
import { Product } from "@/types";

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<string>("");

  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [zoomed, setZoomed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeChecked, setPincodeChecked] = useState(false);

  const thumbnailRef = useRef<HTMLDivElement | null>(null);

  /* ------------------------------- FETCH PRODUCT ------------------------------ */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await apiService.get(`/api/products/${productId}`);
        const p = res.data;

        setProduct(p);

        const g = [
          ...(p.image ? [p.image] : []),
          ...(Array.isArray(p.media) ? p.media : []),
        ];

        setGallery(g);
        if (g.length > 0) setSelectedMedia(getImageUrl(g[0]));

        if (p.sizes?.length) setSelectedSize(p.sizes[0]);
        if (p.colors?.length) setSelectedColor(p.colors[0]);
      } catch {
        toast.error("Product not found");
        navigate("/shop");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="min-h-screen pt-20 text-center">Loading product...</div>;
  }

  if (!product) {
    return <div className="min-h-screen pt-20 text-center">Product not found.</div>;
  }

  const scrollThumbnails = (dir: "left" | "right") => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollBy({
        left: dir === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  /* -------------------------- ADD TO CART -------------------------- */
  const handleAddToCart = async () => {
    if (!selectedSize) return toast.error("Please select a size");
    if (!selectedColor) return toast.error("Please select a color");

    try {
      await apiService.post("/api/cart/add", {
        productId: product._id,
        quantity,
        size: selectedSize,
        color: selectedColor,
      });

      toast.success(`${product.name} added to cart!`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleCheckPincode = () => {
    if (pincode.length === 6) {
      setPincodeChecked(true);
      toast.success("Delivery available");
    } else toast.error("Enter valid pincode");
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">

        {/* BACK BUTTON */}
        <Button variant="ghost" onClick={() => navigate("/shop")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* ------------------------------ LEFT GALLERY ------------------------------ */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div
              className={`relative overflow-hidden rounded-2xl bg-gray-100 w-full aspect-square ${
                zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
            >
              <motion.img
                src={selectedMedia}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  zoomed ? "scale-110" : "scale-100"
                }`}
              />

              {product.soldCount > 100 && (
                <Badge className="absolute top-4 right-4 bg-primary_green">Popular</Badge>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="relative w-full mt-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md"
                  onClick={() => scrollThumbnails("left")}
                >
                  <ChevronLeft />
                </Button>

                <div
                  ref={thumbnailRef}
                  className="flex gap-4 overflow-x-auto px-10 scrollbar-hide"
                >
                  {gallery.map((item, i) => {
                    const url = getImageUrl(item);
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedMedia(url)}
                        className={`border-2 rounded-xl w-[90px] h-[90px] overflow-hidden flex-shrink-0 ${
                          selectedMedia === url
                            ? "border-primary_green"
                            : "border-gray-300"
                        }`}
                      >
                        <img src={url} className="w-full h-full object-cover" />
                      </button>
                    );
                  })}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md"
                  onClick={() => scrollThumbnails("right")}
                >
                  <ChevronRight />
                </Button>
              </div>
            )}
          </motion.div>

          {/* ---------------------------- RIGHT DETAILS ---------------------------- */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            {/* PRICE */}
            <p className="text-3xl font-semibold mb-2">₣{product.sellingPrice}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Size */}
            <div className="mb-6">
              <h3 className="mb-3 font-medium">Select Size</h3>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg border-2 ${
                      selectedSize === size
                        ? "border-primary_green bg-primary_green/10"
                        : "border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mb-6">
              <h3 className="mb-3 font-medium">Select Color</h3>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 capitalize rounded-lg border-2 ${
                      selectedColor === color
                        ? "border-primary_green bg-primary_green/10"
                        : "border-gray-300"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="mb-3 font-medium">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button variant="outline" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex gap-4 pt-4">
              <Button
                className="flex-1 h-12 bg-primary_green text-black hover:bg-green-500"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>

              <Button variant="outline" className="h-12">
                <Heart />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold mb-6">Ratings & Reviews</h2>

          {[
            { id: 1, name: "Sarah Johnson", rating: 5, comment: "Absolutely love this product!" },
            { id: 2, name: "Michael Chen", rating: 4, comment: "Great quality and comfortable." },
            { id: 3, name: "Emma Williams", rating: 5, comment: "Best purchase I've made this year." }
          ].map((review) => (
            <div key={review.id} className="border-b py-4">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 ${
                      i < review.rating
                        ? "fill-primary_green text-primary_green"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <p className="ml-3 font-semibold">{review.name}</p>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
