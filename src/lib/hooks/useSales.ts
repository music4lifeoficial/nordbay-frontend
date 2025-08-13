// React Query hooks for Sales & Transactions
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { salesApi } from '@/lib/api/sales';

// Query Keys
export const salesKeys = {
  all: ['sales'] as const,
  lists: () => [...salesKeys.all, 'list'] as const,
  list: (filters: { status?: string; type?: string; page?: number }) => [...salesKeys.lists(), filters] as const,
  details: () => [...salesKeys.all, 'detail'] as const,
  detail: (id: string) => [...salesKeys.details(), id] as const,
};

// Hooks
export function useSales(query: { status?: string; type?: string; page?: number } = {}) {
  return useQuery({
    queryKey: salesKeys.list(query),
    queryFn: () => salesApi.list(query),
  });
}

export function useSale(id: string) {
  return useQuery({
    queryKey: salesKeys.detail(id),
    queryFn: () => salesApi.get(id),
    enabled: !!id,
  });
}

// Mutations
export function useCreateSale() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { publication_id: string; quantity?: number; shipping_address?: any; payment_method: string }) => 
      salesApi.create(data),
    onSuccess: () => {
      // Invalidate sales lists
      queryClient.invalidateQueries({ queryKey: salesKeys.lists() });
    },
  });
}

export function useConfirmSale() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data?: { confirmation_code?: string; signature?: string } }) => 
      salesApi.confirm(id, data || {}),
    onSuccess: (_, variables) => {
      // Invalidate sale detail and lists
      queryClient.invalidateQueries({ queryKey: salesKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: salesKeys.lists() });
    },
  });
}

export function useDisputeSale() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { 
      id: string; 
      data: { reason: string; description: string; evidence_url?: string } 
    }) => salesApi.dispute(id, data),
    onSuccess: (_, variables) => {
      // Invalidate sale detail and lists
      queryClient.invalidateQueries({ queryKey: salesKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: salesKeys.lists() });
    },
  });
}
