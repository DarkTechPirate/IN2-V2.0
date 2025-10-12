import { useState } from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Input } from './ui/input';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

export function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Elite Performance Tee',
      price: 89,
      image: 'https://images.unsplash.com/photo-1641808887823-b3201916a57d?w=400',
      quantity: 1,
      size: 'M',
    },
    {
      id: 2,
      name: 'Motion Flex Leggings',
      price: 129,
      image: 'https://images.unsplash.com/photo-1645652367526-a0ecb717650a?w=400',
      quantity: 2,
      size: 'L',
    },
    {
      id: 3,
      name: 'Ultra-Lite Jacket',
      price: 199,
      image: 'https://images.unsplash.com/photo-1637844528612-064026615fcd?w=400',
      quantity: 1,
      size: 'XL',
    },
  ]);

  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.success('Item removed from cart');
  };

  const applyPromoCode = () => {
    if (promoCode.trim()) {
      toast.success('Promo code applied successfully!');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

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
            <ShoppingBag className="w-8 h-8 text-[#2FF924]" />
            <h1 
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              Shopping Cart
            </h1>
          </div>
          <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex gap-4"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between gap-4 mb-2">
                        <h3 style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Size: {item.size}
                      </p>
                      <p className="text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                        ${item.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-24">
                <h2 className="mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Order Summary
                </h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 h-11 border-gray-300"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                    <Button
                      onClick={applyPromoCode}
                      variant="outline"
                      className="h-11"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <span>Total</span>
                  <span className="text-[#2FF924]">${total.toFixed(2)}</span>
                </div>

                {/* Checkout Button */}
                <Button
                  className="w-full h-12 bg-[#2FF924] hover:bg-[#26d41f] text-white mb-3"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                {shipping > 0 && (
                  <p className="text-sm text-center text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Add ${(150 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Add items to get started
            </p>
            <Button
              className="h-12 px-8 bg-[#2FF924] hover:bg-[#26d41f] text-white"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Continue Shopping
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
