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

  const [reviews] = useState([
    { id: 1, name: "Sarah Johnson", rating: 5, comment: "Absolutely love this product!", date: "2024-10-05", verified: true },
    { id: 2, name: "Michael Chen", rating: 4, comment: "Great quality and comfortable.", date: "2024-10-01", verified: true },
    { id: 3, name: "Emma Williams", rating: 5, comment: "Best purchase I've made this year.", date: "2024-09-28", verified: true },
  ]);

  /* ------------------------------- FETCH PRODUCT ------------------------------ */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await apiService.get(`/api/products/${productId}`);
        const p = res.data;

        setProduct(p);

        // Build gallery → Main image FIRST → then media
        const g = [
          ...(p.image ? [p.image] : []),
          ...(Array.isArray(p.media) ? p.media : []),
        ];

        setGallery(g);

        // Set default selected image
        if (g.length > 0) setSelectedMedia(getImageUrl(g[0]));

        // Select size & color
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

  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  const scrollThumbnails = (dir: "left" | "right") => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollBy({
        left: dir === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) return toast.error("Select size");
    if (!selectedColor) return toast.error("Select color");
    toast.success(`${product.name} added to cart!`);
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
            {/* Main Image */}
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

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="relative w-full mt-6">
                {/* Left arrow */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md"
                  onClick={() => scrollThumbnails("left")}
                >
                  <ChevronLeft />
                </Button>

                {/* Scrollable thumbnails */}
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

                {/* Right arrow */}
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

            {/* Ratings */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 ${
                      i < Math.floor(averageRating)
                        ? "fill-primary_green text-primary_green"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({reviews.length} reviews)</span>
            </div>

            <p className="text-3xl font-semibold mb-2">₣{product.sellingPrice}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Sizes */}
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

            {/* Colors */}
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

            {/* Delivery */}
            <div className="mb-6">
              <h3 className="mb-3 font-medium flex items-center">
                <MapPin className="w-4 h-4 mr-2" /> Check Delivery
              </h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) =>
                    setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="max-w-xs"
                />
                <Button variant="outline" onClick={handleCheckPincode}>
                  Check
                </Button>
              </div>
              {pincodeChecked && (
                <p className="text-green-600 mt-2 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Delivery in 3–5 days
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                className="flex-1 h-12 bg-primary_green text-black hover:bg-green-500"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
              </Button>
              <Button variant="outline" className="h-12">
                <Heart />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t mt-6">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary_green" />
                <div>
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-gray-500">Orders over $100</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary_green" />
                <div>
                  <p className="text-sm font-medium">Secure Payment</p>
                  <p className="text-xs text-gray-500">100% protected</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary_green" />
                <div>
                  <p className="text-sm font-medium">Quality Assured</p>
                  <p className="text-xs text-gray-500">Premium materials</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold mb-6">Ratings & Reviews</h2>

          {reviews.map((review) => (
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
                {review.verified && (
                  <Badge variant="outline" className="ml-2 border-green-600 text-green-600">
                    Verified Purchase
                  </Badge>
                )}
              </div>
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-xs text-gray-400">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
