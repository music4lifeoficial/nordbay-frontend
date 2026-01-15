// API client for dashboard data
import { apiClient } from './client';
import type { User } from '@/types';

export interface DashboardData {
  user: User;
  products: any[];
  favorites: any[];
  activity: any[];
}

export async function getDashboardData(): Promise<DashboardData> {
  const res = await apiClient.get('/dashboard2');
  return res.data;
}
