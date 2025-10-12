/**
 * Product Related Types
 */

export interface MonthlySales {
  month: string; // Format: "2024-01"
  units: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  profitMargin: number;
  sizes: string[];
  colors: string[];
  image: string;
  soldCount: number;
  addedDate: string;
  monthlySales: MonthlySales[];
}

export interface ProductFormData extends Omit<Product, 'id' | 'soldCount' | 'addedDate' | 'monthlySales'> {}

/**
 * User Related Types
 */

export interface UserData {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  role?: 'user' | 'admin';
  avatar?: string;
  createdAt?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  isAdmin: boolean;
  user: UserData | null;
}

/**
 * Cart Related Types
 */

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

/**
 * Order Related Types
 */

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod';
  shippingAddress: ShippingAddress;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
}

/**
 * Review Related Types
 */

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  verified: boolean;
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Wishlist Related Types
 */

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

/**
 * Filter Related Types
 */

export interface ProductFilters {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  sortBy: 'newest' | 'price-low' | 'price-high' | 'popular';
}

/**
 * Navigation Types
 */

export type PageType = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout'
  | 'order-tracking'
  | 'profile'
  | 'wishlist'
  | 'social-cause' 
  | 'gallery' 
  | 'contact' 
  | 'login' 
  | 'signup' 
  | 'admin-dashboard';

/**
 * API Response Types
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Form Types
 */

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface CheckoutFormData {
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod';
  cardDetails?: {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
  };
}

/**
 * Dashboard/Admin Types
 */

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenueGrowth: number;
  ordersGrowth: number;
}

export interface SalesData {
  month: string;
  revenue: number;
  orders: number;
}
