// React Query hooks for Publications & Marketplace
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { publicationsApi } from '@/lib/api/publications';

// Query Keys
export const publicationKeys = {
  all: ['publications'] as const,
  lists: () => [...publicationKeys.all, 'list'] as const,
  list: (filters: any) => [...publicationKeys.lists(), filters] as const,
  details: () => [...publicationKeys.all, 'detail'] as const,
  detail: (id: string) => [...publicationKeys.details(), id] as const,
  related: (id: string) => [...publicationKeys.all, 'related', id] as const,
  favorites: () => [...publicationKeys.all, 'favorites'] as const,
  isFavorited: (id: string) => [...publicationKeys.all, 'isFavorited', id] as const,
};

// Hooks
export function usePublications(filters: any = {}) {
  return useQuery({
    queryKey: publicationKeys.list(filters),
    queryFn: () => publicationsApi.search(filters),
  });
}

export function usePublication(id: string) {
  return useQuery({
    queryKey: publicationKeys.detail(id),
    queryFn: () => publicationsApi.getById(id),
    enabled: !!id,
  });
}

export function useRelatedPublications(id: string) {
  return useQuery({
    queryKey: publicationKeys.related(id),
    queryFn: () => publicationsApi.getRelated(id),
    enabled: !!id,
  });
}

export function useFavorites() {
  return useQuery({
    queryKey: publicationKeys.favorites(),
    queryFn: () => publicationsApi.getFavorites(),
  });
}

export function useIsFavorited(id: string) {
  return useQuery({
    queryKey: publicationKeys.isFavorited(id),
    queryFn: () => publicationsApi.isFavorited(id),
    enabled: !!id,
  });
}

// Mutations
export function useToggleFavorite() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (publicationId: string) => {
      const isFavorited = await publicationsApi.isFavorited(publicationId);
      if (isFavorited) {
        await publicationsApi.removeFromFavorites(publicationId);
        return { favorited: false };
      } else {
        await publicationsApi.addToFavorites(publicationId);
        return { favorited: true };
      }
    },
    onSuccess: (result, publicationId) => {
      // Update the specific isFavorited query
      queryClient.setQueryData(publicationKeys.isFavorited(publicationId), result.favorited);
      
      // Invalidate favorites list
      queryClient.invalidateQueries({ queryKey: publicationKeys.favorites() });
      
      // Invalidate publications lists that might show favorite counts
      queryClient.invalidateQueries({ queryKey: publicationKeys.lists() });
    },
  });
}
