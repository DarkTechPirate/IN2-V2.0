/**
 * Authentication Service - Handles user authentication
 */

import { apiService } from './api';
import { API_ENDPOINTS, STORAGE_KEYS } from '../constants';
import { UserData, ApiResponse, LoginFormData, SignupFormData } from '../types';

export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginFormData): Promise<ApiResponse<{
    user: UserData;
    token: string;
    refreshToken: string;
  }>> {
    const response = await apiService.post<ApiResponse<{
      user: UserData;
      token: string;
      refreshToken: string;
    }>>( API_ENDPOINTS.LOGIN, credentials);

    // Store tokens if login successful
    if (response.success && response.data) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
    }

    return response;
  },

  /**
   * Signup user
   */
  async signup(userData: SignupFormData): Promise<ApiResponse<{
    user: UserData;
    token: string;
    refreshToken: string;
  }>> {
    const response = await apiService.post<ApiResponse<{
      user: UserData;
      token: string;
      refreshToken: string;
    }>>(API_ENDPOINTS.SIGNUP, userData);

    // Store tokens if signup successful
    if (response.success && response.data) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
    }

    return response;
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiService.post(API_ENDPOINTS.LOGOUT);
    } finally {
      // Clear local storage regardless of API call result
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      localStorage.removeItem(STORAGE_KEYS.CART);
      localStorage.removeItem(STORAGE_KEYS.WISHLIST);
    }
  },

  /**
   * Get current user
   */
  getCurrentUser(): UserData | null {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiService.post<ApiResponse<{ token: string }>>(
      API_ENDPOINTS.REFRESH_TOKEN,
      { refreshToken }
    );

    if (response.success && response.data) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
    }

    return response;
  },

  /**
   * Verify email
   */
  async verifyEmail(token: string): Promise<ApiResponse<void>> {
    return apiService.post<ApiResponse<void>>(API_ENDPOINTS.VERIFY_EMAIL, { token });
  },

  /**
   * Forgot password
   */
  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return apiService.post<ApiResponse<void>>(API_ENDPOINTS.FORGOT_PASSWORD, { email });
  },

  /**
   * Reset password
   */
  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<void>> {
    return apiService.post<ApiResponse<void>>(API_ENDPOINTS.RESET_PASSWORD, {
      token,
      newPassword,
    });
  },
};
