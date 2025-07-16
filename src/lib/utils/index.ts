// ===============================================
// UTILITY FUNCTIONS - NORDBAY
// Core utilities for the application
// ===============================================

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ✅ TAILWIND CLASS MERGER (shadcn/ui pattern)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ✅ CURRENCY FORMATTING (Danish Kroner)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// ✅ DATE FORMATTING
export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('da-DK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
};

export const formatRelativeTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - d.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return formatDate(d);
};

// ✅ NUMBER FORMATTING
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('da-DK').format(num);
};

export const formatCompactNumber = (num: number): string => {
  return new Intl.NumberFormat('da-DK', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
};

// ✅ URL UTILITIES
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove multiple hyphens
    .trim();
};

export const getImageUrl = (path: string): string => {
  if (!path) return '/images/placeholder.jpg';
  if (path.startsWith('http')) return path;
  return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${path}`;
};

// ✅ VALIDATION UTILITIES
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  // Danish phone number validation
  const phoneRegex = /^(\+45\s?)?(\d{2}\s?\d{2}\s?\d{2}\s?\d{2})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const isValidDanishPostalCode = (postalCode: string): boolean => {
  const postalRegex = /^\d{4}$/;
  return postalRegex.test(postalCode);
};

// ✅ STRING UTILITIES
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// ✅ ARRAY UTILITIES
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const group = String(item[key]);
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

export const removeDuplicates = <T>(array: T[], key?: keyof T): T[] => {
  if (!key) return [...new Set(array)];
  
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

// ✅ LOCAL STORAGE UTILITIES
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    if (typeof window === 'undefined') return defaultValue || null;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue || null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
  
  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  }
};

// ✅ DEBOUNCE UTILITY
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// ✅ FILE UTILITIES
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
};

export const isValidImageSize = (file: File, maxSizeMB: number = 5): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

// ✅ ENVIRONMENT UTILITIES
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
};

// ✅ ERROR HANDLING
export const handleApiError = (error: any): string => {
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }
  
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

// ✅ CONSTANTS
export const CONSTANTS = {
  MAX_IMAGE_SIZE_MB: 5,
  MAX_IMAGES_PER_PUBLICATION: 8,
  CURRENCY: 'DKK',
  COUNTRY_CODE: 'DK',
  PHONE_PREFIX: '+45',
  
  // Route paths
  ROUTES: {
    HOME: '/',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/profile',
    PRODUCTS: '/products',
    SEARCH: '/search',
    CREATE: '/create',
    FAVORITES: '/favorites',
  },
  
  // Account levels
  ACCOUNT_LEVELS: {
    PUBLIC: 'public',
    LIGHT_ACCOUNT: 'light_account',
    MITID_VERIFIED: 'mitid_verified',
  } as const,
  
  // Publication statuses
  PUBLICATION_STATUS: {
    ACTIVE: 'active',
    SOLD: 'sold',
    INACTIVE: 'inactive',
    PENDING: 'pending',
  } as const,
  
  // Conditions
  CONDITIONS: {
    NEW: 'new',
    LIKE_NEW: 'like_new',
    GOOD: 'good',
    FAIR: 'fair',
  } as const,
};
