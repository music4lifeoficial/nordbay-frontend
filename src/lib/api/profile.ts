// API client for user profile data
import { apiClient } from './client';
import type { User } from '@/types';

export async function getProfile(): Promise<User> {
  const res = await apiClient.get('/users/me');
  return res.data;
}

export async function updateProfile(data: Partial<User>): Promise<User> {
  const res = await apiClient.put('/users/me', data);
  return res.data;
}
