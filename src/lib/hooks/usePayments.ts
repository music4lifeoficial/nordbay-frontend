// React Query hooks for Payments & Transactions
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentsApi } from '@/lib/api/payments';

// Query Keys
export const paymentKeys = {
  all: ['payments'] as const,
  transactions: () => [...paymentKeys.all, 'transactions'] as const,
  transaction: (id: string) => [...paymentKeys.transactions(), id] as const,
  wallet: () => [...paymentKeys.all, 'wallet'] as const,
  refunds: (paymentId: string) => [...paymentKeys.all, 'refunds', paymentId] as const,
  refund: (id: string) => [...paymentKeys.all, 'refund', id] as const,
};

// Hooks
export function useTransactions(query: { status?: string; type?: string; page?: number } = {}) {
  return useQuery({
    queryKey: [...paymentKeys.transactions(), query],
    queryFn: () => paymentsApi.getTransactions(query),
  });
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: paymentKeys.transaction(id),
    queryFn: () => paymentsApi.getTransaction(id),
    enabled: !!id,
  });
}

export function useWallet() {
  return useQuery({
    queryKey: paymentKeys.wallet(),
    queryFn: () => paymentsApi.getWallet(),
  });
}

export function useRefunds(paymentId: string) {
  return useQuery({
    queryKey: paymentKeys.refunds(paymentId),
    queryFn: () => paymentsApi.getRefunds(paymentId),
    enabled: !!paymentId,
  });
}

export function useRefund(id: string) {
  return useQuery({
    queryKey: paymentKeys.refund(id),
    queryFn: () => paymentsApi.getRefund(id),
    enabled: !!id,
  });
}

// Mutations
export function useReleaseTransaction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (transactionId: string) => paymentsApi.releaseTransaction(transactionId),
    onSuccess: (_, transactionId) => {
      // Invalidate transaction and transactions list
      queryClient.invalidateQueries({ queryKey: paymentKeys.transaction(transactionId) });
      queryClient.invalidateQueries({ queryKey: paymentKeys.transactions() });
      queryClient.invalidateQueries({ queryKey: paymentKeys.wallet() });
    },
  });
}

export function useCreateRefund() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { payment_id: string; amount: number; reason: string }) => 
      paymentsApi.createRefund(data),
    onSuccess: (_, variables) => {
      // Invalidate refunds list and wallet
      queryClient.invalidateQueries({ queryKey: paymentKeys.refunds(variables.payment_id) });
      queryClient.invalidateQueries({ queryKey: paymentKeys.wallet() });
      queryClient.invalidateQueries({ queryKey: paymentKeys.transactions() });
    },
  });
}

export function useDisputeTransaction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ transactionId, data }: { 
      transactionId: string; 
      data: { reason: string; description: string; evidence_url?: string } 
    }) => paymentsApi.disputeTransaction(transactionId, data),
    onSuccess: (_, variables) => {
      // Invalidate transaction and transactions list
      queryClient.invalidateQueries({ queryKey: paymentKeys.transaction(variables.transactionId) });
      queryClient.invalidateQueries({ queryKey: paymentKeys.transactions() });
    },
  });
}
