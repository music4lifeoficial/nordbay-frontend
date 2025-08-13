import { apiClient } from './client'

// Types based on Railway backend specification
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

export interface BaseResponse {
  success: boolean
  message?: string
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

    // CORRECCIÓN: Usar rutas exactas del backend /api/publications/
    const response = await apiClient.get(`/api/publications/?${params.toString()}`)
    return response.data
  },

  // Get single product (backend: GET /api/publications/:id)
  getById: async (id: string): Promise<Product> => {
    const response = await apiClient.get(`/api/publications/${id}`)
    return response.data
  },

  // Create product (backend: POST /api/publications/ - requires MitID)
  create: async (data: CreateProductData): Promise<Product> => {
    const response = await apiClient.post('/api/publications/', data)
    return response.data
  },

  // Update product (backend: PUT /api/publications/:id)
  update: async (id: string, data: Partial<CreateProductData>): Promise<Product> => {
    const response = await apiClient.put(`/api/publications/${id}`, data)
    return response.data
  },

  // Delete product (backend: DELETE /api/publications/:id)
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/publications/${id}`)
  },

  // Get user's products
  getMyProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get('/publications/', {
      params: { user_id: 'me' }
    })
    return response.data.items || []
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

  // Get product images (backend: GET /api/publication-images/publication/:publication_id)
  getImages: async (publicationId: string): Promise<string[]> => {
    const response = await apiClient.get(`/publication-images/publication/${publicationId}`)
    return response.data.images?.map((img: any) => img.url) || []
  },

  // Set primary image (backend: PATCH /api/publication-images/:id/primary)
  setPrimaryImage: async (imageId: string): Promise<void> => {
    await apiClient.patch(`/publication-images/${imageId}/primary`)
  },

  // Delete image (backend: DELETE /api/publication-images/:id)
  deleteImage: async (imageId: string): Promise<void> => {
    await apiClient.delete(`/publication-images/${imageId}`)
  },

  // Feed for home page (backend: GET /api/publications/feed)
  getFeed: async (options: { page?: number } = {}): Promise<ProductResponse> => {
    const response = await apiClient.get('/publications/feed', {
      params: { page: options.page || 1 }
    })
    return response.data
  },

  // Toggle product status (backend: PUT /api/publications/:id/toggle-status)
  toggleStatus: async (id: string): Promise<Product> => {
    const response = await apiClient.put(`/publications/${id}/toggle-status`)
    return response.data
  },

  // Mark as sold (backend: PUT /api/publications/:id)
  markAsSold: async (id: string): Promise<Product> => {
    const response = await apiClient.put(`/publications/${id}`, { status: 'sold' })
    return response.data
  },

  // Report product (backend: POST /api/publications/:id/report)
  report: async (id: string, reason: string, details?: string): Promise<BaseResponse> => {
    const response = await apiClient.post(`/publications/${id}/report`, {
      reason,
      description: details
    })
    return response.data
  },

  // Get featured products
  getFeatured: async (limit: number = 12): Promise<Product[]> => {
    const response = await apiClient.get('/publications/featured', {
      params: { limit }
    })
    return response.data.items || []
  },

  // Get recently viewed
  getRecentlyViewed: async (limit: number = 10): Promise<Product[]> => {
    const response = await apiClient.get('/publications/recently-viewed', {
      params: { limit }
    })
    return response.data.items || []
  }
}

// Helper functions
export const transformImageUrls = (images: any[]): string[] => {
  if (!images) return []
  
  return images.map(img => {
    if (typeof img === 'string') return img
    return img.url || img.src || img
  })
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export const getConditionLabel = (condition: string): string => {
  const labels = {
    'new': 'Ny',
    'like_new': 'Som ny',
    'good': 'God',
    'fair': 'Acceptabel'
  }
  return labels[condition as keyof typeof labels] || condition
}
