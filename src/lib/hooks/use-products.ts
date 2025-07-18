
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import type { Product, SearchFilters } from '@/types/product';
import type { ApiResponse, PaginatedResponse } from '@/types';

// Fetch products with filters
type ProductsResponse = { items: Product[]; total: number };


function mapApiPaginatedProducts(res: ApiResponse<PaginatedResponse<Product>>): ProductsResponse {
  if (!res.success || !res.data) throw new Error(res.error || 'API error');
  return {
    items: res.data.items,
    total: res.data.pagination.total,
  };
}

export function useProducts(filters: SearchFilters) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', filters],
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<Product>>('/products', { params: filters });
      return mapApiPaginatedProducts(res);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Create product mutation
export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Product>) => {
      const res = await api.post<Product>('/products', data);
      if (!res.success || !res.data) throw new Error(res.error || 'API error');
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
