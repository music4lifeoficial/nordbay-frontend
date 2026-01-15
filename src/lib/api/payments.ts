// Payments & Transactions API Client
import { api } from './client';

interface PaymentIntentResponse { payment_intent: { id: string; client_secret: string; amount: number; }; }
interface TransactionsListResponse { transactions: { id: string; amount: number; status: string; type: string; payment_id: string; created_at: string; }[] }
interface TransactionDetailResponse { transaction: { id: string; amount: number; status: string; escrow_status?: string; dispute?: any; payment_id?: string; type?: string; created_at?: string; }; }
interface WalletResponse { wallet: { balance: number; pending: number; currency: string; transactions_count: number; } }
interface RefundsListResponse { refunds: { id: string; amount: number; status: string; reason: string; created_at: string; processed_at?: string; }[]; total: number; }
interface RefundDetailResponse { refund: { id: string; payment_id: string; amount: number; status: string; reason: string; created_at: string; processed_at?: string; }; }

export type Wallet = { balance: number; pending: number; currency: string; transactions_count: number; };
export type Refund = { id: string; payment_id: string; amount: number; status: string; reason: string; created_at: string; processed_at?: string; };

export const paymentsApi = {
  createIntent: async (data: { publication_id: string; quantity?: number; shipping_method: string; address?: any; }) => {
    const res = await api.post<PaymentIntentResponse>('/payments/intent', data);
    if (res.success && res.data) return res.data.payment_intent;
    throw new Error(res.error || 'Failed to create payment intent');
  },
  getTransactions: async (query: { status?: string; type?: string; page?: number } = {}) => {
    const res = await api.get<TransactionsListResponse>('/payments/transactions', { params: query });
    if (res.success && res.data) return res.data.transactions;
    throw new Error(res.error || 'Failed to load transactions');
  },
  getTransaction: async (transaction_id: string) => {
    const res = await api.get<TransactionDetailResponse>(`/payments/transactions/${transaction_id}`);
    if (res.success && res.data) return res.data.transaction;
    throw new Error(res.error || 'Transaction not found');
  },
  releaseTransaction: async (transaction_id: string) => {
    const res = await api.post<{ message: string }>(`/payments/transactions/${transaction_id}/release`);
    if (res.success) return true;
    throw new Error(res.error || 'Failed to release transaction');
  },
  disputeTransaction: async (transaction_id: string, data: { reason: string; description: string; evidence_url?: string }) => {
    const res = await api.post<{ dispute_id: string }>(`/payments/transactions/${transaction_id}/dispute`, data);
    if (res.success && res.data) return (res.data as any).dispute_id;
    throw new Error(res.error || 'Failed to open dispute');
  },
  getRefunds: async (payment_id: string) => {
    const res = await api.get<RefundsListResponse>(`/payments/${payment_id}/refunds`);
    if (res.success && res.data) return res.data;
    throw new Error(res.error || 'Failed to load refunds');
  },
  createRefund: async (data: { payment_id: string; amount: number; reason: string }) => {
    const res = await api.post<RefundDetailResponse>('/payments/refunds', data);
    if (res.success && res.data) return res.data.refund;
    throw new Error(res.error || 'Failed to create refund');
  },
  getRefund: async (refund_id: string) => {
    const res = await api.get<RefundDetailResponse>(`/payments/refunds/${refund_id}`);
    if (res.success && res.data) return res.data.refund;
    throw new Error(res.error || 'Failed to load refund');
  },
  getWallet: async () => {
    const res = await api.get<WalletResponse>('/payments/wallet');
    if (res.success && res.data) return res.data.wallet as Wallet;
    throw new Error(res.error || 'Failed to load wallet');
  },
  refund: async (payment_id: string, data: { reason: string; amount?: number }) => {
    const res = await api.post<{ refund_id: string }>(`/payments/payments/${payment_id}/refund`, data);
    if (res.success && res.data) return (res.data as any).refund_id;
    throw new Error(res.error || 'Failed to refund payment');
  },
};
