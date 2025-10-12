import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Package, MapPin, Truck, CheckCircle2, Clock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import React from "react";


interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'in-transit' | 'delivered';
  items: {
    name: string;
    image: string;
    quantity: number;
  }[];
  tracking: {
    location: string;
    date: string;
    status: string;
  }[];
  estimatedDelivery: string;
}

export function OrderTrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);

  // Mock order data
  const mockOrder: Order = {
    id: 'IN2-2024-1234',
    date: 'October 8, 2025',
    status: 'in-transit',
    items: [
      {
        name: 'Elite Performance Tee',
        image: 'https://images.unsplash.com/photo-1641808887823-b3201916a57d?w=400',
        quantity: 1,
      },
      {
        name: 'Motion Flex Leggings',
        image: 'https://images.unsplash.com/photo-1645652367526-a0ecb717650a?w=400',
        quantity: 2,
      },
    ],
    tracking: [
      {
        location: 'New York, NY - Distribution Center',
        date: 'Oct 8, 2025 - 2:30 PM',
        status: 'Out for delivery',
      },
      {
        location: 'Newark, NJ - Sorting Facility',
        date: 'Oct 8, 2025 - 9:15 AM',
        status: 'In transit',
      },
      {
        location: 'Philadelphia, PA - Hub',
        date: 'Oct 7, 2025 - 6:45 PM',
        status: 'Departed facility',
      },
      {
        location: 'Baltimore, MD - Warehouse',
        date: 'Oct 7, 2025 - 10:00 AM',
        status: 'Order shipped',
      },
    ],
    estimatedDelivery: 'October 11, 2025',
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setTrackedOrder(mockOrder);
      toast.success('Order found!');
    } else {
      toast.error('Please enter a tracking number');
    }
  };

  const getStatusIcon = (index: number) => {
    if (index === 0) return <Truck className="w-6 h-6 text-[#2FF924]" />;
    return <CheckCircle2 className="w-6 h-6 text-[#2FF924]" />;
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-[#2FF924]" />
            <h1 
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              Track Your Order
            </h1>
          </div>
          <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Enter your tracking number to see the latest updates
          </p>
        </motion.div>

        {/* Tracking Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8"
        >
          <form onSubmit={handleTrackOrder} className="flex gap-3">
            <Input
              type="text"
              placeholder="Enter tracking number (e.g., IN2-2024-1234)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1 h-12 border-gray-300 focus:border-[#2FF924] focus:ring-[#2FF924]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
            <Button
              type="submit"
              className="h-12 px-8 bg-[#2FF924] hover:bg-[#26d41f] text-white"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Track Order
            </Button>
          </form>
        </motion.div>

        {/* Order Details */}
        {trackedOrder && (
          <>
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Order {trackedOrder.id}
                  </h2>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Placed on {trackedOrder.date}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-[#2FF924]/10 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4 text-[#2FF924]" />
                  <span className="text-sm capitalize text-[#2FF924]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {trackedOrder.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                {trackedOrder.items.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Estimated Delivery */}
              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#2FF924]" />
                <div>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Estimated Delivery
                  </p>
                  <p style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {trackedOrder.estimatedDelivery}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tracking Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
            >
              <h2 className="mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Tracking History
              </h2>

              <div className="space-y-6">
                {trackedOrder.tracking.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    {/* Icon */}
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-[#2FF924]/10' : 'bg-gray-100'
                      }`}>
                        {getStatusIcon(index)}
                      </div>
                      {index < trackedOrder.tracking.length - 1 && (
                        <div className="absolute left-1/2 top-12 -translate-x-1/2 w-0.5 h-6 bg-gray-200" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <h3 className={`mb-1 ${index === 0 ? 'text-[#2FF924]' : ''}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {event.status}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {event.location}
                      </p>
                      <p className="text-gray-500 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {event.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {/* Empty State */}
        {!trackedOrder && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-20"
          >
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              No order tracked yet
            </h2>
            <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Enter your tracking number above to view order details
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
