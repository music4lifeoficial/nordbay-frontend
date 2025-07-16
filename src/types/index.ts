// Updated types for NordBay backend - July 2025
// Based on complete BACKEND_FOR_FRONTEND.txt specification

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  verified: boolean
  mitid_verified: boolean
  role: 'user' | 'vendor' | 'admin'
  created_at: string
  updated_at: string
  location?: {
    city: string
    country: string
    postal_code: string
    coordinates?: [number, number]
  }
  profile?: {
    bio: string
    phone?: string
    website?: string
  }
  preferences?: {
    notifications: boolean
    newsletter: boolean
    language: 'en' | 'da'
    currency: 'DKK' | 'EUR'
  }
  stats?: {
    products_count: number
    followers_count: number
    following_count: number
    rating: number
    sales_count: number
  }
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  images: ProductImage[]
  category: string
  condition: 'new' | 'like_new' | 'good' | 'fair'
  status: 'active' | 'sold' | 'paused' | 'pending'
  seller: User
  location: {
    city: string
    country: string
    postal_code: string
    coordinates?: [number, number]
  }
  shipping_options: ShippingOption[]
  views_count: number
  likes_count: number
  questions_count: number
  created_at: string
  updated_at: string
  featured?: boolean
  boost_expires_at?: string
}

export interface ProductImage {
  id: string
  url: string
  alt?: string
  order: number
  is_primary: boolean
}

export interface ShippingOption {
  id: string
  carrier: 'postnord' | 'gls' | 'dao' | 'pickup'
  method: string
  price: number
  estimated_days: number
  description?: string
}

export interface SearchFilters {
  query?: string
  category?: string
  price_min?: number
  price_max?: number
  condition?: Product['condition'][]
  location?: string
  radius_km?: number
  seller_verified?: boolean
  shipping_free?: boolean
  sort_by?: 'relevance' | 'price_asc' | 'price_desc' | 'date_desc' | 'distance'
  page?: number
  per_page?: number
}

export interface AuthResponse {
  user: User
  access_token: string
  refresh_token: string
  expires_in: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  accept_terms: boolean
}

export interface BaseResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
  has_next: boolean
  has_prev: boolean
}

export type APIResponse<T> = Promise<BaseResponse<T>>
export type PaginatedAPIResponse<T> = Promise<BaseResponse<PaginatedResponse<T>>>
