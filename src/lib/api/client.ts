// ===============================================
// NORDBAY API CLIENT - RAILWAY BACKEND
// Professional production-ready client
// ===============================================

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiResponse } from '@/types';

// ✅ CONFIGURATION
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://nordbay-production.up.railway.app/api';
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000');

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is required');
}

console.log('🚀 NordBay Frontend (Vercel) connecting to Railway backend:', API_BASE_URL);

// ✅ AXIOS INSTANCE - OPTIMIZED FOR RAILWAY
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT, // Railway needs time for cold starts
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Retry logic for Railway cold starts
  validateStatus: (status) => status < 500 || status === 503,
});

// ✅ TOKEN MANAGEMENT
interface TokenManager {
  getToken: () => string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
  refreshToken: () => Promise<string | null>;
}

const tokenManager: TokenManager = {
  getToken: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('nordbay_access_token');
  },
  
  setToken: (token: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('nordbay_access_token', token);
  },
  
  removeToken: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('nordbay_access_token');
    localStorage.removeItem('nordbay_refresh_token');
    localStorage.removeItem('nordbay_user');
  },
  
  refreshToken: async () => {
    if (typeof window === 'undefined') return null;
    
    const refreshToken = localStorage.getItem('nordbay_refresh_token');
    if (!refreshToken) return null;
    
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refresh_token: refreshToken,
      });
      
      const { access_token } = response.data.data;
      tokenManager.setToken(access_token);
      return access_token;
    } catch (error) {
      console.error('❌ Token refresh failed:', error);
      tokenManager.removeToken();
      return null;
    }
  },
};

// ✅ REQUEST INTERCEPTOR
apiClient.interceptors.request.use(
  (config) => {
    // Add JWT token automatically
    const token = tokenManager.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Railway cold start handling
    if (config.timeout && config.timeout < 30000) {
      config.timeout = 30000;
    }
    
    console.log(`📡 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// ✅ RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    console.error('❌ API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data?.error || error.message,
    });

    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const newToken = await tokenManager.refreshToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } else {
        // Refresh failed, redirect to login
        if (typeof window !== 'undefined') {
          tokenManager.removeToken();
          window.location.href = '/auth/login';
        }
      }
    }

    // Handle Railway-specific errors
    if (isRailwayError(error)) {
      console.warn('🐌 Railway backend cold start or timeout - this is normal');
      
      // Auto-retry for cold starts (once)
      if (!originalRequest._retried) {
        originalRequest._retried = true;
        await new Promise(resolve => setTimeout(resolve, 2000));
        return apiClient(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

// ✅ RAILWAY ERROR DETECTION
function isRailwayError(error: any): boolean {
  return (
    error.code === 'ECONNABORTED' ||
    error.message?.includes('timeout') ||
    error.response?.status === 503 ||
    error.response?.status === 502 ||
    error.response?.status === 504
  );
}

// ✅ RAILWAY HEALTH CHECK
export async function checkRailwayHealth(): Promise<{
  healthy: boolean;
  responseTime: number;
  error?: string;
}> {
  const startTime = Date.now();
  
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10000), // 10s timeout for health check
    });
    
    const responseTime = Date.now() - startTime;
    
    if (response.ok) {
      return { healthy: true, responseTime };
    } else {
      return { 
        healthy: false, 
        responseTime, 
        error: `HTTP ${response.status}` 
      };
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return { 
      healthy: false, 
      responseTime, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// ✅ GENERIC API HELPERS
export const api = {
  // GET request with proper typing
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await apiClient.get<ApiResponse<T>>(url, config);
    return response.data;
  },
  
  // POST request with proper typing
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await apiClient.post<ApiResponse<T>>(url, data, config);
    return response.data;
  },
  
  // PUT request with proper typing
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await apiClient.put<ApiResponse<T>>(url, data, config);
    return response.data;
  },
  
  // DELETE request with proper typing
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await apiClient.delete<ApiResponse<T>>(url, config);
    return response.data;
  },
  
  // PATCH request with proper typing
  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  },
};

// ✅ EXPORT TOKEN MANAGER
export { tokenManager };

// ✅ DEFAULT EXPORT
export default apiClient;
