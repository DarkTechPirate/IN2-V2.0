/**
 * Product Service - Handles all product-related API calls
 */

import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';
import { Product, Review, ApiResponse, PaginatedResponse } from '../types';

export const productService = {
  /**
   * Get all products with filters and pagination
   */
  async getAllProducts(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sizes?: string[];
    colors?: string[];
    sortBy?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Product>> {
    return apiService.get<PaginatedResponse<Product>>(API_ENDPOINTS.PRODUCTS, filters);
  },

  /**
   * Get single product by ID
   */
  async getProductById(id: string): Promise<ApiResponse<Product>> {
    return apiService.get<ApiResponse<Product>>(API_ENDPOINTS.PRODUCT_BY_ID(id));
  },

  /**
   * Get product reviews
   */
  async getProductReviews(productId: string): Promise<ApiResponse<Review[]>> {
    return apiService.get<ApiResponse<Review[]>>(API_ENDPOINTS.PRODUCT_REVIEWS(productId));
  },

  /**
   * Get related products
   */
  async getRelatedProducts(productId: string): Promise<ApiResponse<Product[]>> {
    return apiService.get<ApiResponse<Product[]>>(API_ENDPOINTS.RELATED_PRODUCTS(productId));
  },

  /**
   * Search products
   */
  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    return apiService.get<ApiResponse<Product[]>>(API_ENDPOINTS.PRODUCTS, { search: query });
  },

  /**
   * Add product review
   */
  async addReview(productId: string, review: {
    rating: number;
    comment: string;
  }): Promise<ApiResponse<Review>> {
    return apiService.post<ApiResponse<Review>>(
      API_ENDPOINTS.PRODUCT_REVIEWS(productId),
      review
    );
  },
};
