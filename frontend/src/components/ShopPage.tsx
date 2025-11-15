// ShopPage.tsx
import { useState } from "react";
// Added Search icon
import { ShoppingCart, Eye, Filter, Search } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
// Added Input component
import { Input } from "./ui/input";
import { motion } from "motion/react";
import { useProducts } from "./ProductContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function ShopPage() {
  const { products, updateProductSales } = useProducts();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 250]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  // --- New State for Search ---
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // Get unique categories, sizes, and colors from products
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
  const allColors = Array.from(new Set(products.flatMap((p) => p.colors)));

  const handleAddToCart = (productId: string, productName: string) => {
    updateProductSales(productId, 1);
    toast.success(`${productName} added to cart!`);
  };

  // --- Updated Filter Logic ---
  const filteredProducts = products.filter((product) => {
    // 1. Search Filter (checks name and description)
    const query = searchQuery.toLowerCase();
    if (
      searchQuery.length > 0 &&
      !product.name.toLowerCase().includes(query) &&
      !product.description.toLowerCase().includes(query)
    ) {
      return false;
    }

    // 2. Category Filter
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(product.category)
    )
      return false;

    // 3. Price Filter
    if (
      product.sellingPrice < priceRange[0] ||
      product.sellingPrice > priceRange[1]
    )
      return false;

    // 4. Size Filter
    if (
      selectedSizes.length > 0 &&
      !selectedSizes.some((size) => product.sizes.includes(size))
    )
      return false;

    // 5. Color Filter
    if (
      selectedColors.length > 0 &&
      !selectedColors.some((color) => product.colors.includes(color))
    )
      return false;

    return true;
  });

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Category Filter */}
      <div>
        <h3 className="mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
          Category
        </h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category]);
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter((c) => c !== category)
                    );
                  }
                }}
                className="data-[state=checked]:bg-primary_green data-[state=checked]:border-primary_green"
              />
              <span
                className="capitalize group-hover:text-primary_green transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
          Price Range
        </h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={250}
          step={10}
          className="mb-4"
        />
        <div
          className="flex justify-between text-sm text-gray-600"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <span>₣{priceRange[0]}</span>
          <span>₣{priceRange[1]}</span>
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h3 className="mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
          Size
        </h3>
        <div className="space-y-3">
          {allSizes.map((size) => (
            <label
              key={size}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <Checkbox
                checked={selectedSizes.includes(size)}
                onCheckedChange={(checked) => {
                  if (checked) setSelectedSizes([...selectedSizes, size]);
                  else
                    setSelectedSizes(selectedSizes.filter((s) => s !== size));
                }}
                className="data-[state=checked]:bg-primary_green data-[state=checked]:border-primary_green"
              />
              <span
                className="group-hover:text-primary_green transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {size}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h3 className="mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
          Color
        </h3>
        <div className="space-y-3">
          {allColors.map((color) => (
            <label
              key={color}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <Checkbox
                checked={selectedColors.includes(color)}
                onCheckedChange={(checked) => {
                  if (checked) setSelectedColors([...selectedColors, color]);
                  else
                    setSelectedColors(
                      selectedColors.filter((c) => c !== color)
                    );
                }}
                className="data-[state=checked]:bg-primary_green data-[state=checked]:border-primary_green"
              />
              <span
                className="capitalize group-hover:text-primary_green transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {color}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            }}
          >
            Shop All
          </h1>
        </div>

        {/* --- New Controls Bar (Search, Count, Mobile Filter) --- */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* --- Search Bar --- */}
          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3 mt-1.5 h-5 w-5 text-gray-400 pointer-events-none" />
            <Input
              type="search"
              aria-label="Search products"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10" // This provides space for the icon
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>

          {/* Count and Mobile Filter */}
          <div className="flex items-center justify-between md:justify-end gap-4">
            <p
              className="text-gray-600 shrink-0"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Showing {filteredProducts.length} products
            </p>

            {/* Mobile Filter Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle style={{ fontFamily: "Poppins, sans-serif" }}>
                    Filters
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4] bg-gray-100">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary_green transition-all duration-300 rounded-2xl" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product.id, product.name);
                        }}
                        className="bg-white text-black hover:bg-primary_green hover:text-white transition-all duration-300 shadow-lg"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white hover:bg-gray-100 transition-all duration-300 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${product.id}`);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <h3
                    className="mb-1"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-xs text-gray-500 mb-2 line-clamp-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-gray-900"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      ₣{product.sellingPrice}
                    </span>
                    {product.soldCount > 100 && (
                      <span
                        className="text-xs text-primary_green bg-primary_green/10 px-2 py-1 rounded-full"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Popular
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p
                  className="text-gray-500"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  No products found. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
