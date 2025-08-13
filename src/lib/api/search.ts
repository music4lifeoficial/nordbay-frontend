// API client for marketplace search
import { api } from './client';
import type { SearchFilters, SearchResponse } from '@/types';

export async function searchMarketplace(filters: SearchFilters): Promise<SearchResponse> {
  const response = await api.get<SearchResponse>('/search/publications', {
    params: filters,
  });

  if (response.success && response.data) {
    return response.data;
  }

  throw new Error(response.error || 'Failed to search publications');
}
