// ===============================================
// PUBLICATIONS API - RAILWAY BACKEND
// Products/Publications CRUD Operations
// ===============================================

import { api } from './client';
import type { 
  Publication, 
  CreatePublicationData,
  SearchFilters,
  SearchResponse,
  Category,
  Question
} from '@/types';

// ✅ PUBLICATIONS ENDPOINTS
export const publicationsApi = {
  // Search/List publications with filters
  search: async (filters: SearchFilters = {}): Promise<SearchResponse> => {
    const params = new URLSearchParams();
    
    // Build query parameters from filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, String(v)));
        } else {
          params.set(key, String(value));
        }
      }
    });

    const response = await api.get<SearchResponse>(`/publications?${params.toString()}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to search publications');
  },

  // Get single publication by ID
  getById: async (id: string): Promise<Publication> => {
    const response = await api.get<Publication>(`/publications/${id}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Publication not found');
  },

  // Create new publication (requires Light Account or higher)
  create: async (data: CreatePublicationData): Promise<Publication> => {
    const response = await api.post<Publication>('/publications', data);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to create publication');
  },

  // Update publication (only by owner)
  update: async (id: string, data: Partial<CreatePublicationData>): Promise<Publication> => {
    const response = await api.put<Publication>(`/publications/${id}`, data);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to update publication');
  },

  // Delete publication (only by owner)
  delete: async (id: string): Promise<void> => {
    const response = await api.delete(`/publications/${id}`);
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete publication');
    }
  },

  // Upload images for publication
  uploadImages: async (publicationId: string, images: File[]): Promise<string[]> => {
    const formData = new FormData();
    formData.append('publication_id', publicationId);
    
    images.forEach((image, _index) => {
      formData.append(`images`, image);
    });

    const response = await api.post<string[]>('/publication-images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to upload images');
  },

  // Get user's own publications
  getMyPublications: async (status?: Publication['status']): Promise<Publication[]> => {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    
    const response = await api.get<Publication[]>(`/publications/my?${params.toString()}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to get your publications');
  },

  // Mark publication as sold
  markAsSold: async (id: string): Promise<Publication> => {
    const response = await api.patch<Publication>(`/publications/${id}/sold`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to mark as sold');
  },

  // Add to favorites
  addToFavorites: async (id: string): Promise<void> => {
    const response = await api.post(`/publications/${id}/favorite`);
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to add to favorites');
    }
  },

  // Remove from favorites
  removeFromFavorites: async (id: string): Promise<void> => {
    const response = await api.delete(`/publications/${id}/favorite`);
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to remove from favorites');
    }
  },

  // Get user's favorites
  getFavorites: async (): Promise<Publication[]> => {
    const response = await api.get<Publication[]>('/publications/favorites');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to get favorites');
  },

  // Boost/promote publication
  boost: async (id: string, days: number): Promise<Publication> => {
    const response = await api.post<Publication>(`/publications/${id}/boost`, { days });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to boost publication');
  },

  // Get related/similar publications
  getRelated: async (id: string, limit: number = 6): Promise<Publication[]> => {
    const response = await api.get<Publication[]>(`/publications/${id}/related?limit=${limit}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to get related publications');
  },
};

// ✅ CATEGORIES API
export const categoriesApi = {
  // Get all categories (flat list)
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categories');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to get categories');
  },

  // Get categories hierarchy (tree structure)
  getTree: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categories/hierarchy/tree');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to get categories tree');
  },

  // Get category by ID with attributes
  getById: async (id: string): Promise<Category> => {
    const response = await api.get<Category>(`/categories/${id}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Category not found');
  },

  // Get category attributes (for dynamic forms)
  getAttributes: async (id: string): Promise<Category['attributes']> => {
    const response = await api.get<Category['attributes']>(`/categories/${id}/attributes`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to get category attributes');
  },
};

// ✅ QUESTIONS & ANSWERS API
export const questionsApi = {
  // Get questions for a publication
  getForPublication: async (publicationId: string): Promise<Question[]> => {
    const response = await api.get<Question[]>(`/questions/publication/${publicationId}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to get questions');
  },

  // Ask a question
  ask: async (publicationId: string, question: string): Promise<Question> => {
    const response = await api.post<Question>('/questions', {
      publication_id: publicationId,
      question,
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to ask question');
  },

  // Answer a question (seller only)
  answer: async (questionId: string, answer: string): Promise<Question> => {
    const response = await api.post<Question>(`/questions/${questionId}/answer`, {
      answer,
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to answer question');
  },
};

// ✅ SEARCH SUGGESTIONS API
export const searchApi = {
  // Get search suggestions/autocomplete
  getSuggestions: async (query: string): Promise<string[]> => {
    if (query.length < 2) return [];
    
    const response = await api.get<string[]>(`/search/suggestions?q=${encodeURIComponent(query)}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    return []; // Return empty array on error for better UX
  },
};

// ✅ PUBLICATIONS UTILITIES
export const publicationsUtils = {
  // Format price with DKK currency
  formatPrice: (price: number): string => {
    return new Intl.NumberFormat('da-DK', {
      style: 'currency',
      currency: 'DKK',
    }).format(price);
  },

  // Calculate time ago
  timeAgo: (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  },

  // Get condition display text
  getConditionText: (condition: Publication['condition']): string => {
    const conditionMap = {
      'new': 'New',
      'like_new': 'Like New',
      'good': 'Good',
      'fair': 'Fair'
    };
    return conditionMap[condition] || condition;
  },

  // Get status display text with color
  getStatusInfo: (status: Publication['status']): { text: string; color: string } => {
    const statusMap = {
      'active': { text: 'Active', color: 'green' },
      'sold': { text: 'Sold', color: 'blue' },
      'inactive': { text: 'Inactive', color: 'gray' },
      'pending': { text: 'Pending', color: 'yellow' }
    };
    return statusMap[status] || { text: status, color: 'gray' };
  },

  // Check if user can edit publication
  canUserEdit: (publication: Publication, userId?: string): boolean => {
    if (!userId) return false;
    return publication.seller.id === userId;
  },
};

export default publicationsApi;
