import { API_BASE_URL, API_TIMEOUT } from "../constants";

let getAccessTokenFromContext: (() => string | null) | null = null;

/**
 * Registered by AuthContext on mount
 */
export function registerAccessTokenGetter(fn: () => string | null) {
  getAccessTokenFromContext = fn;
}

interface RequestConfig {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  data?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

class ApiService {
  private baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  private timeout = API_TIMEOUT;

  private getAccessToken(): string | null {
    if (getAccessTokenFromContext) {
      return getAccessTokenFromContext();
    }
    return localStorage.getItem("accessToken");
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }

  private buildHeaders(customHeaders?: Record<string, string>): Headers {
    const headers = new Headers({
      "Content-Type": "application/json",
      ...customHeaders,
    });

    const token = this.getAccessToken();
    if (token) headers.append("Authorization", `Bearer ${token}`);
    return headers;
  }

  private buildURL(url: string, params?: Record<string, any>) {
    if (!params) return this.baseURL + url;
    const qs = new URLSearchParams(params).toString();
    return `${this.baseURL}${url}?${qs}`;
  }

  private async request<T>(config: RequestConfig, retry = false): Promise<T> {
    const { method, url, data, headers, params } = config;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(this.buildURL(url, params), {
        method,
        headers: this.buildHeaders(headers),
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.status === 401 && !retry) {
        const refreshed = await this.tryRefreshAccessToken();
        if (refreshed) return this.request<T>(config, true);
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Request failed");
      }

      return await response.json();
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === "AbortError") throw new Error("Request timeout");
      throw err;
    }
  }

  private async tryRefreshAccessToken(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const res = await fetch(`${this.baseURL}/api/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) return false;

      const { accessToken: newAccess } = await res.json();
      if (newAccess) {
        localStorage.setItem("accessToken", newAccess);
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }

  // === Public HTTP Methods ===
  get<T>(url: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>({ method: "GET", url, params });
  }

  post<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({ method: "POST", url, data });
  }

  put<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({ method: "PUT", url, data });
  }

  patch<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({ method: "PATCH", url, data });
  }

  delete<T>(url: string): Promise<T> {
    return this.request<T>({ method: "DELETE", url });
  }
}

export const apiService = new ApiService();
export default ApiService;
