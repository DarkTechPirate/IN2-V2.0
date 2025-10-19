import { useState } from 'react';
import { ShoppingCart, Heart, Star, MapPin, Truck, Shield, ArrowLeft, Check } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useProducts } from './ProductContext';
import { toast } from 'sonner@2.0.3';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string, productId?: string) => void;
}

export function ProductDetailPage({ productId, onNavigate }: ProductDetailPageProps) {
  const { products, updateProductSales } = useProducts();
  const product = products.find(p => p.id === productId);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>Product not found</p>
      </div>
    );
  }

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely love this product! The quality is exceptional and the fit is perfect.',
      date: '2024-10-05',
      verified: true,
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 4,
      comment: 'Great quality and comfortable. Would definitely recommend!',
      date: '2024-10-01',
      verified: true,
    },
    {
      id: 3,
      name: 'Emma Williams',
      rating: 5,
      comment: 'Best purchase I\'ve made this year. Worth every penny!',
      date: '2024-09-28',
      verified: true,
    },
  ];

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    updateProductSales(product.id, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleCheckPincode = () => {
    if (pincode.length === 6) {
      setPincodeChecked(true);
      toast.success('Delivery available in your area!');
    } else {
      toast.error('Please enter a valid 6-digit pincode');
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('shop')}
          className="mb-6 hover:bg-gray-100"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Button>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative overflow-hidden rounded-2xl aspect-square bg-gray-100">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.soldCount > 100 && (
                <Badge className="absolute top-4 right-4 bg-primary_green text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Popular
                </Badge>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Title & Price */}
            <div>
              <h1 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'fill-primary_green text-primary_green' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  ({reviews.length} reviews)
                </span>
              </div>
              <p className="text-3xl font-semibold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                ${product.sellingPrice}
              </p>
              <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Select Size</h3>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-primary_green bg-primary_green/10 text-black'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Select Color</h3>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 capitalize ${
                      selectedColor === color
                        ? 'border-primary_green bg-primary_green/10 text-black'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10"
                >
                  -
                </Button>
                <span className="w-12 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Pincode Check */}
            <div>
              <h3 className="mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <MapPin className="w-4 h-4 inline mr-2" />
                Check Delivery
              </h3>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="max-w-xs"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <Button
                  onClick={handleCheckPincode}
                  variant="outline"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Check
                </Button>
              </div>
              {pincodeChecked && (
                <p className="text-green-600 mt-2 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <Check className="w-4 h-4" />
                  Delivery available in 3-5 business days
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-primary_green hover:bg-[#26d41f] text-black transition-all duration-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="h-12 px-6 hover:bg-gray-100"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary_green" />
                <div>
                  <p className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Free Shipping</p>
                  <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary_green" />
                <div>
                  <p className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Secure Payment</p>
                  <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>100% protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary_green" />
                <div>
                  <p className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Quality Assured</p>
                  <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>Premium materials</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Product Details</h3>
                <p className="text-gray-600 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {product.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Features</h4>
                    <ul className="space-y-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary_green mt-1 flex-shrink-0" />
                        <span>Premium quality materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary_green mt-1 flex-shrink-0" />
                        <span>Moisture-wicking technology</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary_green mt-1 flex-shrink-0" />
                        <span>Four-way stretch fabric</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary_green mt-1 flex-shrink-0" />
                        <span>Breathable and lightweight</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Care Instructions</h4>
                    <ul className="space-y-2 text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <li>• Machine wash cold</li>
                      <li>• Do not bleach</li>
                      <li>• Tumble dry low</li>
                      <li>• Do not iron</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>{review.name}</h4>
                        {review.verified && (
                          <Badge variant="outline" className="text-primary_green border-primary_green" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'fill-primary_green text-primary_green' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>{review.comment}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="mb-8" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  onClick={() => onNavigate('product-detail', relatedProduct.id)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4] bg-gray-100">
                    <ImageWithFallback
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary_green transition-all duration-300 rounded-2xl" />
                  </div>
                  <h3 className="mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {relatedProduct.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {relatedProduct.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                      ${relatedProduct.sellingPrice}
                    </span>
                    {relatedProduct.soldCount > 100 && (
                      <span className="text-xs text-primary_green bg-primary_green/10 px-2 py-1 rounded-full" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Popular
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
