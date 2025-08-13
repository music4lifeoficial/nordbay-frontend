// API client for products/publications - Railway backend integration
// Updated for BACKEND_FOR_FRONTEND.txt compatibility - FASE 3 MARKETPLACE CORE

import { apiClient } from './client'
import type { Product, CreateProductData, SearchFilters, ProductResponse } from '@/types'

// ===============================================
// PRODUCTS API CLIENT - RAILWAY BACKEND
// ===============================================

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
  // Requires MitID verification on backend
  create: async (data: CreateProductData): Promise<{ publication_id: string }> => {
    // Transform frontend data to backend format
    const backendData = {
      title: data.title,
      description: data.description,
      price: data.price,
      category_id: data.category, // Backend expects category_id
      condition: data.condition,
      quantity: data.quantity || 1,
      location: data.location?.city || data.location,
      shipping_type: data.shipping_options?.length > 0 ? 'shipping' : 'pickup',
      featured: data.featured || false,
      // Images will be uploaded separately via publication-images endpoint
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
      location: data.location?.city || data.location,
      shipping_type: data.shipping_options?.length > 0 ? 'shipping' : 'pickup',
    }

    await apiClient.put(`/publications/${id}`, backendData)
  },

  // Delete product (backend: DELETE /api/publications/:id)
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/publications/${id}`)
  }

  // Toggle product status (active/paused)
  async toggleStatus(id: string): Promise<Product> {
    const response = await apiClient.patch(`/publications/${id}/toggle-status`)
    return response.data
  }

  // Mark product as sold
  async markAsSold(id: string): Promise<Product> {
    const response = await apiClient.patch(`/publications/${id}/mark-sold`)
    return response.data
  }

  // Boost product (featured listing)
  async boost(id: string, duration: number): Promise<Product> {
    const response = await apiClient.post(`/publications/${id}/boost`, { duration })
    return response.data
  }

  // Get related/similar products
  async getSimilar(id: string, limit: number = 8): Promise<Product[]> {
    const response = await apiClient.get(`/publications/${id}/similar?limit=${limit}`)
    return response.data
  }

  // Get user's products
  async getByUser(userId: string, filters: Partial<SearchFilters> = {}): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value))
      }
    })

    const response = await apiClient.get(`/users/${userId}/publications?${params.toString()}`)
    return response.data
  }

  // Get featured products
  async getFeatured(limit: number = 12): Promise<Product[]> {
    const response = await apiClient.get(`/publications/featured?limit=${limit}`)
    return response.data
  }

  // Get recently viewed products (requires auth)
  async getRecentlyViewed(limit: number = 10): Promise<Product[]> {
    const response = await apiClient.get(`/publications/recently-viewed?limit=${limit}`)
    return response.data
  }

  // Report product
  async report(id: string, reason: string, details?: string): Promise<BaseResponse> {
    const response = await apiClient.post(`/publications/${id}/report`, { reason, details })
    return response.data
  }

  // Upload images
  async uploadImages(publicationId: string, images: File[]): Promise<string[]> {
    const formData = new FormData()
    formData.append('publication_id', publicationId)
    
    images.forEach((image, index) => {
      formData.append('images', image)
    })

    const response = await apiClient.post('/publication-images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data.images.map((img: any) => img.url)
  }

  // Get images
  async getImages(publicationId: string): Promise<string[]> {
    const response = await apiClient.get(`/publication-images/publication/${publicationId}`)
    return response.data.images?.map((img: any) => img.url) || []
  }

  // Delete image
  async deleteImage(imageId: string): Promise<void> {
    await apiClient.delete(`/publication-images/${imageId}`)
  }

  // Set primary image
  async setPrimaryImage(imageId: string): Promise<void> {
    await apiClient.patch(`/publication-images/${imageId}/primary`)
  }

  // Get feed for home
  async getFeed(options: { page?: number } = {}): Promise<PaginatedResponse<Product>> {
    const response = await apiClient.get('/publications/feed', {
      params: { page: options.page || 1 }
    })
    return response.data
  }

  // Toggle status
  async toggleStatus(id: string): Promise<Product> {
    const response = await apiClient.put(`/publications/${id}/toggle-status`)
    return response.data
  }

  // Mark as sold
  async markAsSold(id: string): Promise<Product> {
    const response = await apiClient.put(`/publications/${id}`, { status: 'sold' })
    return response.data
  }
}

export const productsAPI = new ProductsAPI()
