// ===============================================
// NORDBAY TYPES - RAILWAY BACKEND INTEGRATION
// Based on BACKEND_FOR_FRONTEND.txt (710 lines)
// ===============================================

// ✅ BASE API RESPONSE FORMAT
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

// ✅ USER & AUTHENTICATION (3-Tier System)
export interface User {
  id: string;
  email: string;
  nickname: string;
  name: string;
  phone: string;
  address: string;
  
  // Account Level (3-tier system)
  account_level: 'public' | 'light_account' | 'mitid_verified';
  email_verified: boolean;
  mitid_verified: boolean;
  
  // Profile
  avatar?: string;
  bio?: string;
  location_region?: string;
  location_city?: string;
  
  // Stats
  rating?: number;
  rating_count: number;
  sales_count: number;
  purchases_count: number;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  last_active?: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  account_level: User['account_level'];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nickname: string;
  name: string;
  phone: string;
  address: string;
  accept_terms: boolean;
}

// ✅ PUBLICATIONS (Products) - Core Entity
export interface Publication {
  id: string;
  title: string;
  description: string;
  price: number;
  
  // Category & Classification
  category_id: string;
  subcategory_id?: string;
  condition: 'new' | 'like_new' | 'good' | 'fair';
  
  // Images
  images: string[];
  primary_image?: string;
  
  // Location
  location_region: string;
  location_city: string;
  
  // Shipping
  shipping_info?: {
    offers_shipping: boolean;
    shipping_cost?: number;
    pickup_available: boolean;
    weight?: number;
    dimensions?: {
      length: number;
      width: number;
      height: number;
    };
  };
  
  // Seller Info
  seller: {
    id: string;
    nickname: string;
    avatar?: string;
    rating?: number;
    rating_count: number;
    account_level: User['account_level'];
  };
  
  // Status & Stats
  status: 'active' | 'sold' | 'inactive' | 'pending';
  views_count: number;
  favorites_count: number;
  questions_count: number;
  
  // Premium Features
  boost_expires?: string;
  featured: boolean;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

// Alias for compatibility
export type Product = Publication;

// ✅ CATEGORIES
export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  parent_id?: string;
  level: number;
  children?: Category[];
  
  // Stats
  publications_count: number;
  
  // Metadata
  attributes?: CategoryAttribute[];
  created_at: string;
}

export interface CategoryAttribute {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'multi_select';
  required: boolean;
  options?: string[];
}

// ✅ SEARCH & FILTERS
export interface SearchFilters {
  query?: string;
  category_id?: string;
  subcategory_id?: string;
  price_min?: number;
  price_max?: number;
  condition?: Publication['condition'][];
  location_region?: string;
  location_city?: string;
  radius_km?: number;
  seller_verified?: boolean;
  shipping_free?: boolean;
  sort_by?: 'relevance' | 'price_asc' | 'price_desc' | 'date_desc' | 'distance';
  page?: number;
  per_page?: number;
}

export interface SearchResponse {
  publications: Publication[];
  pagination: PaginatedResponse<Publication>['pagination'];
  filters_applied: SearchFilters;
  total_results: number;
  search_time_ms: number;
}

// ✅ ORDERS & PAYMENTS
export interface Order {
  id: string;
  buyer_id: string;
  seller_id: string;
  publication_id: string;
  
  // Order Details
  quantity: number;
  unit_price: number;
  total_amount: number;
  
  // Status
  status: 'pending' | 'confirmed' | 'paid' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
  
  // Payment
  payment_intent_id?: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  
  // Shipping
  shipping_info?: {
    method: string;
    carrier: 'postnord' | 'gls' | 'dao' | 'pickup';
    tracking_number?: string;
    estimated_delivery?: string;
    address: {
      street: string;
      city: string;
      postal_code: string;
      country: string;
    };
  };
  
  // Timestamps
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: 'DKK';
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled';
  client_secret: string;
  
  // Stripe specific
  stripe_payment_intent_id: string;
  
  // Order reference
  order_id: string;
  
  created_at: string;
}

// ✅ SHIPPING OPTIONS
export interface ShippingOption {
  id: string;
  carrier: 'postnord' | 'gls' | 'dao' | 'pickup';
  method: string;
  price: number;
  estimated_days: number;
  description?: string;
  
  // Pickup points (for carrier services)
  pickup_points?: PickupPoint[];
}

export interface PickupPoint {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    postal_code: string;
  };
  opening_hours: string;
  distance_km?: number;
}

// ✅ QUESTIONS & ANSWERS
export interface Question {
  id: string;
  publication_id: string;
  user_id: string;
  question: string;
  
  // Answer
  answer?: string;
  answered_by?: string;
  answered_at?: string;
  
  // Status
  is_public: boolean;
  status: 'pending' | 'answered';
  
  // User info (public)
  user: {
    id: string;
    nickname: string;
    avatar?: string;
  };
  
  created_at: string;
}

// ✅ NOTIFICATIONS
export interface Notification {
  id: string;
  user_id: string;
  type: 'order' | 'payment' | 'shipping' | 'question' | 'review' | 'system';
  title: string;
  message: string;
  
  // Status
  read: boolean;
  
  // Metadata
  data?: {
    order_id?: string;
    publication_id?: string;
    question_id?: string;
    url?: string;
  };
  
  created_at: string;
}

// ✅ REVIEWS & REPUTATION
export interface Review {
  id: string;
  reviewer_id: string;
  reviewed_user_id: string;
  order_id: string;
  
  // Review content
  rating: number; // 1-5
  comment?: string;
  
  // Review type
  type: 'seller' | 'buyer';
  
  // Reviewer info
  reviewer: {
    id: string;
    nickname: string;
    avatar?: string;
  };
  
  created_at: string;
}

// ✅ FORM DATA TYPES
export interface CreatePublicationData {
  title: string;
  description: string;
  price: number;
  category_id: string;
  subcategory_id?: string;
  condition: Publication['condition'];
  location_region: string;
  location_city: string;
  
  // Images (will be uploaded separately)
  images?: File[];
  
  // Shipping
  offers_shipping: boolean;
  shipping_cost?: number;
  pickup_available: boolean;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}

// ✅ API ERROR TYPES
export interface ApiError {
  message: string;
  code?: string;
  field?: string;
  details?: Record<string, any>;
}

// ✅ UTILITY TYPES
export type APIResponse<T> = Promise<ApiResponse<T>>;
export type PaginatedAPIResponse<T> = Promise<ApiResponse<PaginatedResponse<T>>>;

export type UserAccountLevel = User['account_level'];
export type PublicationStatus = Publication['status'];
export type PublicationCondition = Publication['condition'];
export type OrderStatus = Order['status'];
export type PaymentStatus = Order['payment_status'];
export type NotificationType = Notification['type'];
export type ShippingCarrier = ShippingOption['carrier'];
