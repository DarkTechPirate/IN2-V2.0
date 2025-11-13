import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Eye,
  Filter,
  Search,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { Slider } from "../../../components/ui/slider";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import { Input } from "../../../components/ui/input";
import { motion } from "motion/react";
import { apiService } from "../../../services/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../../utils/imageUrl";
import { Product } from "@/types";

export function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]); // dynamic
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  /* ---------------------------------------------------
    FETCH ALL PRODUCTS + AUTO PRICE RANGE
  --------------------------------------------------- */
  const fetchProducts = async () => {
    try {
      const res = await apiService.get("/api/products");
      const list = res.data;

      console.log("Products:", list);
      setProducts(list);

      if (list.length > 0) {
        const prices = list.map((p: Product) => p.sellingPrice);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        setPriceRange([minPrice, maxPrice]);
      }

    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ---------------------------------------------------
    ADD TO CART
  --------------------------------------------------- */
  const handleAddToCart = async (product: Product) => {
    try {
      await apiService.post("/api/cart/add", {
        productId: product._id,
        quantity: 1,
        size: product.sizes?.[0],
        color: product.colors?.[0],
      });

      toast.success(`${product.name} added to cart`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    }
  };

  /* ---------------------------------------------------
    FILTERING LOGIC
  --------------------------------------------------- */
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
  const allColors = Array.from(new Set(products.flatMap((p) => p.colors)));

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();

    // Search filter
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(query) &&
      !product.description.toLowerCase().includes(query)
    )
      return false;

    // Category filter
    if (
      selectedCategories.length &&
      !selectedCategories.includes(product.category)
    )
      return false;

    // Price filter
    if (
      product.sellingPrice < priceRange[0] ||
      product.sellingPrice > priceRange[1]
    )
      return false;

    // Size filter
    if (
      selectedSizes.length &&
      !selectedSizes.some((s) => product.sizes.includes(s))
    )
      return false;

    // Color filter
    if (
      selectedColors.length &&
      !selectedColors.some((c) => product.colors.includes(c))
    )
      return false;

    return true;
  });

  /* ---------------------------------------------------
    FILTER SIDEBAR COMPONENT
  --------------------------------------------------- */
  const FilterContent = () => (
    <div className="space-y-8">
      {/* Category Filter */}
      <div>
        <h3 className="mb-4 font-poppins">Category</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) =>
                  checked
                    ? setSelectedCategories([...selectedCategories, category])
                    : setSelectedCategories(selectedCategories.filter((c) => c !== category))
                }
              />
              <span className="capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Dynamic Price Range */}
      <div>
        <h3 className="mb-4 font-poppins">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={priceRange[1]}
          min={priceRange[0]}
          step={10}
        />
        <div className="flex justify-between text-gray-600 text-sm">
          <span>₣{priceRange[0]}</span>
          <span>₣{priceRange[1]}</span>
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h3 className="mb-4 font-poppins">Size</h3>
        <div className="space-y-3">
          {allSizes.map((size) => (
            <label key={size} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedSizes.includes(size)}
                onCheckedChange={(checked) =>
                  checked
                    ? setSelectedSizes([...selectedSizes, size])
                    : setSelectedSizes(selectedSizes.filter((s) => s !== size))
                }
              />
              <span>{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h3 className="mb-4 font-poppins">Color</h3>
        <div className="space-y-3">
          {allColors.map((color) => (
            <label key={color} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedColors.includes(color)}
                onCheckedChange={(checked) =>
                  checked
                    ? setSelectedColors([...selectedColors, color])
                    : setSelectedColors(selectedColors.filter((c) => c !== color))
                }
              />
              <span className="capitalize">{color}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  /* ---------------------------------------------------
    PAGE UI
  --------------------------------------------------- */

  if (loading) {
    return (
      <div className="pt-20 text-center text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">

        {/* Search + Filters Top */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              Showing {filteredProducts.length} products
            </p>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* LEFT Sidebar */}
          <aside className="hidden lg:block w-64">
            <div className="sticky top-24">
              <FilterContent />
            </div>
          </aside>

          {/* RIGHT Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4] bg-gray-100">
                    <ImageWithFallback
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary_green rounded-2xl" />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      {/* ADD TO CART BUTTON */}
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="bg-white text-black hover:bg-primary_green hover:text-white transition-all shadow-lg"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>

                      {/* VIEW DETAILS */}
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white hover:bg-gray-100 transition-all shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${product._id}`);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <h3 className="font-poppins">{product.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <span>₣{product.sellingPrice}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                No products found. Try adjusting your filters.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
