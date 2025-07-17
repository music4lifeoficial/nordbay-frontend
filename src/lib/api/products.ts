// API client for products (publications)
import { apiClient } from './client';
import type { Publication } from '@/types';

export async function getProducts(): Promise<Publication[]> {
  const res = await apiClient.get('/publications');
  return res.data;
}
