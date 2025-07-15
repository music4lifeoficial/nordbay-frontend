// Tipos base del API de NordBay basados en BACKEND_FOR_FRONTEND.txt

export interface ApiResponse<T = any> {
  success: boolean
  error?: string
  details?: object
  data?: T
}

// User interface actualizada según backend
export interface User {
  id: string
  email: string
  nickname: string
  name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
  // Campos específicos del backend
  verified: boolean // email verification
  mitid_verified: boolean // Danish identity verification
  role: 'user' | 'vendor' | 'admin'
  phone?: string
  address?: string
  // Stats adicionales
  reputation?: number
  sales_count?: number
  completion_rate?: number
}

export interface AuthResponse {
  success: boolean
  jwt: string
  refresh: string
  user: User
}

export interface RegisterRequest {
  email: string
  password: string
  nickname: string
  name?: string
  phone?: string
  address?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface Publication {
  id: string
  title: string
  description: string
  price: number
  category_id: number
  condition: 'new' | 'like_new' | 'good' | 'fair'
  location: string
  images: string[]
  seller_id: string
  seller_nickname: string
  seller_reputation?: number
  created_at: string
  updated_at: string
  status: 'active' | 'sold' | 'paused' | 'deleted'
}

// Alias para compatibilidad
export type Product = Publication

export interface SearchParams {
  q?: string
  category_id?: number
  price_min?: number
  price_max?: number
  condition?: Publication['condition']
  location?: string
  sort?: 'price' | 'date' | 'relevance'
  page?: number
  page_size?: number
}

export interface SearchResponse {
  success: boolean
  data: Publication[]
  pagination: {
    page: number
    page_size: number
    total: number
    pages: number
  }
}

export interface Category {
  id: number
  name: string
  parent_id: number | null
  icon_url?: string
  order: number
  children?: Category[]
}

export interface Payment {
  id: string
  sale_id: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  payment_method: string
  created_at: string
}

export interface Sale {
  id: string
  publication_id: string
  buyer_id: string
  seller_id: string
  quantity: number
  total_amount: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'completed' | 'cancelled'
  payment_id?: string
  shipping_id?: string
  created_at: string
  updated_at: string
}

export interface Question {
  id: string
  publication_id: string
  question: string
  answer?: string
  asked_by: string
  answered_at?: string
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: string
  message: string
  channel: string
  target_id?: string
  read: boolean
  created_at: string
}
