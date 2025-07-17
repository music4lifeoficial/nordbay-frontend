// API client for creating a new product (publication)
import { apiClient } from './client';
import type { CreatePublicationData, Publication } from '@/types';

export async function createProduct(data: CreatePublicationData): Promise<Publication> {
  const res = await apiClient.post('/publications', data);
  return res.data;
}
