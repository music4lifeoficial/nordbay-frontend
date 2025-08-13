// Sales API Client
import { api } from './client';

interface CreateSaleResponse { sale_id: string; payment_url?: string; }
interface SalesListResponse { sales: { id: string; publication: any; status: string; amount: number; created_at: string; }[] }
interface SaleDetailResponse { sale: { id: string; publication: any; status: string; amount: number; created_at: string; } }

export const salesApi = {
  create: async (data: { publication_id: string; quantity?: number; shipping_address?: any; payment_method: string; }) => {
    const res = await api.post<CreateSaleResponse>('/sales', data);
    if (res.success && res.data) return res.data;
    throw new Error(res.error || 'Failed to create sale');
  },
  list: async (query: { status?: string; type?: string; page?: number } = {}) => {
    const res = await api.get<SalesListResponse>('/sales', { params: query });
    if (res.success && res.data) return res.data.sales;
    throw new Error(res.error || 'Failed to load sales');
  },
  get: async (id: string) => {
    const res = await api.get<SaleDetailResponse>(`/sales/${id}`);
    if (res.success && res.data) return (res.data as any).sale;
    throw new Error(res.error || 'Failed to load sale');
  },
  confirm: async (id: string, data: { confirmation_code?: string; signature?: string } = {}) => {
    const res = await api.post<{ message: string }>(`/sales/${id}/confirm`, data);
    if (res.success) return true;
    throw new Error(res.error || 'Failed to confirm sale');
  },
  dispute: async (id: string, data: { reason: string; description: string; evidence_url?: string }) => {
    const res = await api.post<{ dispute_id: string }>(`/sales/${id}/dispute`, data);
    if (res.success && res.data) return (res.data as any).dispute_id;
    throw new Error(res.error || 'Failed to open dispute');
  },
};
