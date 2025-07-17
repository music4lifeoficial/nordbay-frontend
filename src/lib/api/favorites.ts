// API client for user favorites
import { apiClient } from './client';
import type { Publication } from '@/types';

export async function getFavorites(): Promise<Publication[]> {
  const res = await apiClient.get('/favorites');
  return res.data;
}
