import type { User } from "./user";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  condition: "new" | "used" | "like_new";
  seller: User;
  location: {
    city: string;
    country: string;
    coordinates?: [number, number];
  };
  shipping_options: ShippingOption[];
  created_at: string;
  updated_at: string;
  status: "active" | "sold" | "paused";
  views_count: number;
  likes_count: number;
  questions_count: number;
}

export interface ShippingOption {
  method: string;
  price: number;
  estimated_days: number;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  price_min?: number;
  price_max?: number;
  condition?: Product["condition"];
  location?: string;
  sort_by?: "price_asc" | "price_desc" | "date_desc" | "relevance";
  page?: number;
  per_page?: number;
}
