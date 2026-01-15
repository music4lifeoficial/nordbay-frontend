import { apiClient } from './client'

// Types for Railway backend compatibility
export interface Product {
  id: string
  title: string
  description: string
  price: number
  category_id: string
  subcategory_id?: string
  condition: 'new' | 'like_new' | 'good' | 'fair'
  images: string[]
  primary_image?: string
  location_region: string
  location_city: string
  shipping_info?: {
    offers_shipping: boolean
    shipping_cost?: number
    pickup_available: boolean
  }
  seller: {
    id: string
    username: string
    avatar?: string
    rating?: number
  }
  status: 'active' | 'sold' | 'inactive' | 'pending'
  views_count: number
  favorites_count: number
  boost_expires?: string
  created_at: string
  updated_at: string
}

export interface CreateProductData {
  title: string
  description: string
  price: number
  category_id: string
  subcategory_id?: string
  condition: 'new' | 'like_new' | 'good' | 'fair'
  location_region: string
  location_city: string
  shipping_info?: {
    offers_shipping: boolean
    shipping_cost?: number
    pickup_available: boolean
  }
}

export interface SearchFilters {
  query?: string
  category_id?: string
  subcategory_id?: string
  min_price?: number
  max_price?: number
  condition?: string
  location_region?: string
  location_city?: string
  page?: number
  page_size?: number
  sort_by?: 'price_asc' | 'price_desc' | 'date_desc' | 'date_asc' | 'relevance'
}

export interface ProductResponse {
  items: Product[]
  total: number
  page: number
  page_size: number
  total_pages: number
  has_next: boolean
  has_prev: boolean
}

// Products API aligned with Railway backend
export const productsAPI = {
  // Search products (backend: GET /api/publications/)
  search: async (filters: SearchFilters = {}): Promise<ProductResponse> => {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value))
      }
    })

    const response = await apiClient.get(`/publications/?${params.toString()}`)
    return response.data
  },

  // Get single product (backend: GET /api/publications/:id)
  getById: async (id: string): Promise<Product> => {
    const response = await apiClient.get(`/publications/${id}`)
    return response.data
  },

  // Create product (backend: POST /api/publications/ - requires MitID)
  create: async (data: CreateProductData): Promise<Product> => {
    const response = await apiClient.post('/publications/', data)
    return response.data
  },

  // Update product (backend: PUT /api/publications/:id)
  update: async (id: string, data: Partial<CreateProductData>): Promise<Product> => {
    const response = await apiClient.put(`/publications/${id}`, data)
    return response.data
  },

  // Delete product (backend: DELETE /api/publications/:id)
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/publications/${id}`)
  },

  // Upload images (backend: POST /api/publication-images/upload)
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

    return response.data.images.map((img: any) => img.url)
  },

  // Get product images
  getImages: async (publicationId: string): Promise<string[]> => {
    const response = await apiClient.get(`/publication-images/publication/${publicationId}`)
    return response.data.images?.map((img: any) => img.url) || []
  },

  // Report product
  report: async (id: string, reason: string, details?: string): Promise<{ success: boolean }> => {
    const response = await apiClient.post(`/publications/${id}/report`, {
      reason,
      description: details
    })
    return response.data
  }
}
