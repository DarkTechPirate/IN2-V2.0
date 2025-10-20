// ProductDetailPage.tsx
import { useEffect, useState } from 'react';
import { ShoppingCart, Heart, Star, MapPin, Truck, Shield, ArrowLeft, Check } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useProducts } from './ProductContext';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { useParams, useNavigate } from 'react-router-dom';

export function ProductDetailPage() {
  const { products, updateProductSales } = useProducts();
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const product = products.find(p => String(p.id) === String(productId));

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);

  useEffect(() => {
    console.log('[ProductDetail] productId param:', productId);
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-gray-500 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            Product not found.
          </p>
          <div className="flex justify-center gap-3">
            <Button onClick={() => navigate('/shop')} variant="outline">Back to Shop</Button>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </div>
          <p className="text-xs text-gray-400 mt-4">If you followed a link, check the product id or try refreshing.</p>
        </div>
      </div>
    );
  }

  // mock reviews
  const reviews = [
    { id: 1, name: 'Sarah Johnson', rating: 5, comment: 'Absolutely love this product! The quality is exceptional and the fit is perfect.', date: '2024-10-05', verified: true },
    { id: 2, name: 'Michael Chen', rating: 4, comment: 'Great quality and comfortable. Would definitely recommend!', date: '2024-10-01', verified: true },
    { id: 3, name: 'Emma Williams', rating: 5, comment: "Best purchase I've made this year. Worth every penny!", date: '2024-09-28', verified: true },
  ];

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

  useEffect(() => {
    if (product.sizes?.length && !selectedSize) setSelectedSize(product.sizes[0]);
    if (product.colors?.length && !selectedColor) setSelectedColor(product.colors[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/shop')}
          className="mb-6 hover:bg-gray-100"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Button>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative overflow-hidden rounded-2xl aspect-square bg-gray-100">
              <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {product.soldCount > 100 && (
                <Badge className="absolute top-4 right-4 bg-primary_green text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Popular
                </Badge>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            {/* Title & Price */}
            <div>
              <h1 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'fill-primary_green text-primary_green' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  ({reviews.length} reviews)
                </span>
              </div>
              <p className="text-3xl font-semibold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                ${product.sellingPrice}
              </p>
              <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>{product.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Select Size</h3>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 ${selectedSize === size ? 'border-primary_green bg-primary_green/10 text-black' : 'border-gray-300 hover:border-gray-400'}`}
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
                    className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 capitalize ${selectedColor === color ? 'border-primary_green bg-primary_green/10 text-black' : 'border-gray-300 hover:border-gray-400'}`}
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
                <Button variant="outline" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10">-</Button>
                <span className="w-12 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>{quantity}</span>
                <Button variant="outline" onClick={() => setQuantity(quantity + 1)} className="w-10 h-10">+</Button>
              </div>
            </div>

            {/* Pincode Check */}
            <div>
              <h3 className="mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}><MapPin className="w-4 h-4 inline mr-2" />Check Delivery</h3>
              <div className="flex gap-2">
                <Input type="text" placeholder="Enter pincode" value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))} className="max-w-xs" style={{ fontFamily: 'Inter, sans-serif' }} />
                <Button onClick={handleCheckPincode} variant="outline" style={{ fontFamily: 'Inter, sans-serif' }}>Check</Button>
              </div>
              {pincodeChecked && <p className="text-green-600 mt-2 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}><Check className="w-4 h-4" />Delivery available in 3-5 business days</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button onClick={handleAddToCart} className="flex-1 h-12 bg-primary_green hover:bg-[#26d41f] text-black transition-all duration-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
              </Button>
              <Button variant="outline" className="h-12 px-6 hover:bg-gray-100"><Heart className="w-5 h-5" /></Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3"><Truck className="w-5 h-5 text-primary_green" /><div><p className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Free Shipping</p><p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>On orders over $100</p></div></div>
              <div className="flex items-center gap-3"><Shield className="w-5 h-5 text-primary_green" /><div><p className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Secure Payment</p><p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>100% protected</p></div></div>
              <div className="flex items-center gap-3"><Check className="w-5 h-5 text-primary_green" /><div><p className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Quality Assured</p><p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>Premium materials</p></div></div>
            </div>
          </motion.div>
        </div>

        {/* Tabs & Related Products (unchanged) */}
        {/* ... keep the same tabs and related products code as before ... */}
      </div>
    </div>
  );
}
