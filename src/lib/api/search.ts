// API client for marketplace search
import { apiClient } from './client';
import type { SearchFilters, SearchResponse } from '@/types';

export async function searchMarketplace(filters: SearchFilters): Promise<SearchResponse> {
  const res = await apiClient.get('/search', { params: filters });
  return res.data;
}
