import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { SearchParams, Publication } from '@/types/api';
import { publicationsApi } from '@/lib/api/publications';

// Temporary adapter around publications search
export function useProducts(filters: Partial<SearchParams>) {
  return useQuery<{ items: Publication[]; total: number }>({
    queryKey: ['products', filters],
    queryFn: async () => {
      const res = await publicationsApi.search(filters as any);
      return { items: res.publications, total: res.pagination.total };
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: publicationsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
