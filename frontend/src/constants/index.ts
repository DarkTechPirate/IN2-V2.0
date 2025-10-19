/**
 * Application Constants
 */

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
export const API_TIMEOUT = 30000; // 30 seconds

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  VERIFY_EMAIL: '/auth/verify-email',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: string) => `/products/${id}`,
  PRODUCT_REVIEWS: (id: string) => `/products/${id}/reviews`,
  RELATED_PRODUCTS: (id: string) => `/products/${id}/related`,

  // Cart
  CART: '/cart',
  CART_ADD: '/cart/add',
  CART_UPDATE: '/cart/update',
  CART_REMOVE: '/cart/remove',
  CART_CLEAR: '/cart/clear',

  // Orders
  ORDERS: '/orders',
  ORDER_BY_ID: (id: string) => `/orders/${id}`,
  ORDER_TRACK: (id: string) => `/orders/${id}/track`,
  ORDER_CANCEL: (id: string) => `/orders/${id}/cancel`,

  // User
  USER_PROFILE: '/user/profile',
  USER_UPDATE: '/user/update',
  USER_ORDERS: '/user/orders',
  USER_WISHLIST: '/user/wishlist',

  // Payment
  PAYMENT_CREATE: '/payment/create',
  PAYMENT_VERIFY: '/payment/verify',

  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_USERS: '/admin/users',
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  PRODUCT_DETAIL: '/product/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_TRACKING: '/order-tracking',
  PROFILE: '/profile',
  WISHLIST: '/wishlist',
  SOCIAL_CAUSE: '/social-cause',
  GALLERY: '/gallery',
  CONTACT: '/contact',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ADMIN_DASHBOARD: '/admin',
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  CART: 'cart',
  WISHLIST: 'wishlist',
  THEME: 'theme',
  RECENT_SEARCHES: 'recent_searches',
};

// Product Categories
export const PRODUCT_CATEGORIES = [
  { value: 'tops', label: 'Tops' },
  { value: 'bottoms', label: 'Bottoms' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'footwear', label: 'Footwear' },
];

// Product Sizes
export const PRODUCT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// Product Colors
export const PRODUCT_COLORS = [
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
  { value: 'gray', label: 'Gray' },
  { value: 'navy', label: 'Navy' },
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
];

// Sort Options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
];

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const ORDER_STATUS_LABELS = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

// Payment Methods
export const PAYMENT_METHODS = [
  { value: 'card', label: 'Credit/Debit Card', icon: 'CreditCard' },
  { value: 'upi', label: 'UPI', icon: 'Smartphone' },
  { value: 'netbanking', label: 'Net Banking', icon: 'Building' },
  { value: 'cod', label: 'Cash on Delivery', icon: 'Banknote' },
];

// Validation Rules
export const VALIDATION = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z\s]+$/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 50,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  PHONE: {
    PATTERN: /^[0-9]{10}$/,
  },
  PINCODE: {
    PATTERN: /^[0-9]{6}$/,
  },
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
};

// Theme
export const THEME = {
  PRIMARY_COLOR: '#2FF924',
  PRIMARY_HOVER: '#26d41f',
  FONT_HEADING: 'Poppins, sans-serif',
  FONT_BODY: 'Inter, sans-serif',
};

// Toast Messages
export const TOAST_MESSAGES = {
  // Success
  PRODUCT_ADDED: 'Product added to cart successfully!',
  PRODUCT_REMOVED: 'Product removed from cart',
  WISHLIST_ADDED: 'Added to wishlist',
  WISHLIST_REMOVED: 'Removed from wishlist',
  ORDER_PLACED: 'Order placed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully',
  
  // Error
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  AUTH_REQUIRED: 'Please login to continue',
  INVALID_CREDENTIALS: 'Invalid email or password',
  
  // Info
  SELECT_SIZE: 'Please select a size',
  SELECT_COLOR: 'Please select a color',
  EMPTY_CART: 'Your cart is empty',
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
};

// Shipping
export const SHIPPING = {
  FREE_SHIPPING_THRESHOLD: 100, // USD
  STANDARD_SHIPPING_COST: 10,
  EXPRESS_SHIPPING_COST: 20,
  ESTIMATED_DELIVERY_DAYS: 5,
};

// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/in2sportswear',
  INSTAGRAM: 'https://instagram.com/in2sportswear',
  TWITTER: 'https://twitter.com/in2sportswear',
  YOUTUBE: 'https://youtube.com/@in2sportswear',
};

// Contact Information
export const CONTACT_INFO = {
  EMAIL: 'support@in2sportswear.com',
  PHONE: '+1 (555) 123-4567',
  ADDRESS: '123 Fashion Street, New York, NY 10001',
  BUSINESS_HOURS: 'Mon-Fri: 9AM-6PM EST',
};

// Feature Flags (for gradual rollout)
export const FEATURES = {
  ENABLE_WISHLIST: true,
  ENABLE_REVIEWS: true,
  ENABLE_SOCIAL_LOGIN: false,
  ENABLE_LIVE_CHAT: false,
  ENABLE_GIFT_CARDS: false,
};

// Analytics Events
export const ANALYTICS_EVENTS = {
  PRODUCT_VIEW: 'product_view',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  CHECKOUT_START: 'checkout_start',
  PURCHASE: 'purchase',
  SIGNUP: 'signup',
  LOGIN: 'login',
};
