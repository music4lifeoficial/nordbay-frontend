// API client for user favorites
import { publicationsApi } from './publications';
import type { Publication } from '@/types/api';

export async function getFavorites(): Promise<Publication[]> {
  return publicationsApi.getFavorites();
}
