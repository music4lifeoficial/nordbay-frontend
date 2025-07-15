// API client for products/publications - Railway backend integration
// Updated for BACKEND_FOR_FRONTEND.txt compatibility - FASE 3 MARKETPLACE CORE

import { apiClient } from './client'
import type { Product } from '@/types'

// ===============================================
// PRODUCTS API CLIENT - RAILWAY BACKEND
// ===============================================

interface SearchFilters {
  query?: string
  category?: string
  price_min?: number
  price_max?: number
  condition?: string
  location?: string
  sort_by?: string
  page?: number
  per_page?: number
}

interface CreateProductData {
  title: string
  description: string
  price: number
  category: string
  condition: string
  quantity?: number
  location?: any
  shipping_options?: any[]
  featured?: boolean
}

interface ProductResponse {
  items: Product[]
  total: number
  page: number
  per_page: number
  hasNext: boolean
}

export const productsApi = {
  // Get all products with filters (matching backend search)
  search: async (filters: SearchFilters = {}): Promise<ProductResponse> => {
    const params = new URLSearchParams()
    
    // Backend expects these exact query params from BACKEND_FOR_FRONTEND.txt
    if (filters.query) params.set('q', filters.query)
    if (filters.category) params.set('category', filters.category)
    if (filters.price_min) params.set('price_min', filters.price_min.toString())
    if (filters.price_max) params.set('price_max', filters.price_max.toString())
    if (filters.condition) params.set('condition', filters.condition)
    if (filters.location) params.set('location', filters.location)
    if (filters.sort_by) params.set('sort', filters.sort_by)
    if (filters.page) params.set('page', filters.page.toString())
    if (filters.per_page) params.set('page_size', filters.per_page.toString())

    const response = await apiClient.get(`/publications/?${params}`)
    
    // Transform backend response to frontend format
    return {
      items: response.data.items || [],
      total: response.data.total || 0,
      page: response.data.page || 1,
      per_page: response.data.page_size || 20,
      hasNext: response.data.page * response.data.page_size < response.data.total
    }
  },

  // Get product by ID (backend: GET /api/publications/:id)
  getById: async (id: string): Promise<Product> => {
    const response = await apiClient.get(`/publications/${id}`)
    return response.data.publication
  },

  // Create new product (backend: POST /api/publications)
  create: async (data: CreateProductData): Promise<{ publication_id: string }> => {
    const backendData = {
      title: data.title,
      description: data.description,
      price: data.price,
      category_id: data.category,
      condition: data.condition,
      quantity: data.quantity || 1,
      location: typeof data.location === 'string' ? data.location : data.location?.city,
      shipping_type: data.shipping_options?.length ? 'shipping' : 'pickup',
      featured: data.featured || false,
    }

    const response = await apiClient.post('/publications/', backendData)
    return {
      publication_id: response.data.publication_id
    }
  },

  // Update product (backend: PUT /api/publications/:id)
  update: async (id: string, data: Partial<CreateProductData>): Promise<void> => {
    const backendData = {
      title: data.title,
      description: data.description,
      price: data.price,
      condition: data.condition,
      quantity: data.quantity,
      location: typeof data.location === 'string' ? data.location : data.location?.city,
      shipping_type: data.shipping_options?.length ? 'shipping' : 'pickup',
    }

    await apiClient.put(`/publications/${id}`, backendData)
  },

  // Delete product (backend: DELETE /api/publications/:id)
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/publications/${id}`)
  },

  // Toggle product status (active/paused)
  toggleStatus: async (id: string): Promise<Product> => {
    const response = await apiClient.patch(`/publications/${id}/toggle-status`)
    return response.data
  },

  // Mark product as sold
  markAsSold: async (id: string): Promise<Product> => {
    const response = await apiClient.patch(`/publications/${id}/mark-sold`)
    return response.data
  },

  // Get featured products
  getFeatured: async (limit: number = 12): Promise<Product[]> => {
    const response = await apiClient.get(`/publications/featured?limit=${limit}`)
    return response.data
  },

  // Upload images
  uploadImages: async (publicationId: string, images: File[]): Promise<string[]> => {
    const formData = new FormData()
    formData.append('publication_id', publicationId)
    
    images.forEach((image) => {
      formData.append('images', image)
    })

    const response = await apiClient.post('/publication-images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data.images?.map((img: any) => img.url) || []
  }
}
