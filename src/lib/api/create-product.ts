// API client for creating a new product (publication)
import { publicationsApi, type CreatePublicationData } from './publications';
import type { Publication } from '@/types/api';

export async function createProduct(data: CreatePublicationData): Promise<Publication> {
  return publicationsApi.create(data);
}
