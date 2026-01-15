"use client";
import { useState } from 'react';
import { RequireAuthLevel } from '@/components/auth/RequireAuthLevel';
import { useParams, useRouter } from 'next/navigation';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/useTranslation';
import { pushToast } from '@/hooks/use-toast';
import { useSale, useConfirmSale, useDisputeSale } from '@/lib/hooks/useSales';

interface SaleDetail { id: string; publication?: any; status: string; amount: number; created_at: string; payment_id?: string; payment_amount?: number; payment_status?: string; payment_method?: string; }

export default function SaleDetailPage() {
  const { id } = useParams() as { id: string };
  const t = useTranslation();
  const router = useRouter();
  
  // React Query hooks
  const { data: sale, isLoading: loading, error: saleError } = useSale(id);
  const confirmMutation = useConfirmSale();
  const disputeMutation = useDisputeSale();
  
  // Local UI state
  const [showDispute, setShowDispute] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeDescription, setDisputeDescription] = useState('');

  const error = saleError?.message;
  const confirming = confirmMutation.isPending;
  const disputing = disputeMutation.isPending;

  const confirm = async () => {
    if (!sale) return;
    try {
      await confirmMutation.mutateAsync({ id: sale.id, data: {} });
      pushToast({ message: t.dashboard?.saleConfirmed ?? 'Sale confirmed', type: 'success' });
    } catch (e: any) {
      pushToast({ message: e.message || 'Failed to confirm sale', type: 'error' });
    }
  };

  const submitDispute = async () => {
    if (!sale || !disputeReason.trim()) return;
    try {
      await disputeMutation.mutateAsync({ 
        id: sale.id, 
        data: { reason: disputeReason, description: disputeDescription } 
      });
      pushToast({ message: t.dashboard?.disputeOpened ?? 'Dispute opened', type: 'success' });
      setShowDispute(false);
      setDisputeReason('');
      setDisputeDescription('');
    } catch (e: any) {
      pushToast({ message: e.message || 'Failed to open dispute', type: 'error' });
    }
  };

  return (
    <RequireAuthLevel level="light_account">
      <div className="p-8 max-w-3xl mx-auto">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">← {t.common?.back ?? 'Back'}</Button>
        {error && <Alert type="error" message={error} className="mb-4" />}
        {loading && <div className="h-40 bg-white border border-nordic-100 rounded-lg animate-pulse" />}
        {!loading && !sale && !error && <Alert type="info" message={t.dashboard?.saleNotFound ?? 'Sale not found.'} />}
        {sale && (
          <div className="space-y-6 bg-white border border-nordic-100 rounded-xl p-6 shadow">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-bold text-nordic-900 mb-1">{sale.publication?.title ?? 'Publication'}</h1>
                <p className="text-xs text-nordic-500">{new Date(sale.created_at).toLocaleString()}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-nordic-100 text-nordic-600 capitalize">{sale.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-lg bg-nordic-50 border border-nordic-100">
                <p className="text-nordic-500 text-xs mb-1 uppercase tracking-wide">{t.product?.price ?? 'Price'}</p>
                <p className="font-semibold text-nordic-800">{sale.amount} DKK</p>
              </div>
              <div className="p-4 rounded-lg bg-nordic-50 border border-nordic-100">
                <p className="text-nordic-500 text-xs mb-1 uppercase tracking-wide">Sale ID</p>
                <p className="font-mono text-xs">{sale.id}</p>
              </div>
              {sale.payment_id && (
                <div className="p-4 rounded-lg bg-nordic-50 border border-nordic-100">
                  <p className="text-nordic-500 text-xs mb-1 uppercase tracking-wide">Payment ID</p>
                  <p className="font-mono text-xs">{sale.payment_id}</p>
                </div>
              )}
              {sale.payment_status && (
                <div className="p-4 rounded-lg bg-nordic-50 border border-nordic-100">
                  <p className="text-nordic-500 text-xs mb-1 uppercase tracking-wide">Payment Status</p>
                  <p className="font-semibold capitalize">{sale.payment_status}</p>
                </div>
              )}
              {sale.payment_method && (
                <div className="p-4 rounded-lg bg-nordic-50 border border-nordic-100">
                  <p className="text-nordic-500 text-xs mb-1 uppercase tracking-wide">Payment Method</p>
                  <p className="font-semibold capitalize">{sale.payment_method}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3">
              {sale.status !== 'completed' && (
                <Button onClick={confirm} disabled={confirming} size="lg" className="w-full">{confirming ? (t.common?.saving ?? 'Saving...') : (t.dashboard?.confirmSale ?? 'Confirm reception')}</Button>
              )}
              <Button variant="outline" size="sm" onClick={()=>setShowDispute(true)}>{t.dashboard?.openDispute ?? 'Open dispute'}</Button>
            </div>
            {showDispute && (
              <div className="border-t pt-4 space-y-3">
                <h2 className="text-sm font-semibold">{t.dashboard?.disputeTitle ?? 'Dispute this sale'}</h2>
                <input value={disputeReason} onChange={e=>setDisputeReason(e.target.value)} placeholder={t.dashboard?.disputeReasonPlaceholder ?? 'Reason'} className="w-full border rounded px-2 py-1 text-sm" />
                <textarea value={disputeDescription} onChange={e=>setDisputeDescription(e.target.value)} placeholder={t.dashboard?.disputeDescriptionPlaceholder ?? 'Description (optional)'} className="w-full border rounded px-2 py-1 text-sm min-h-[80px]" />
                <div className="flex gap-2">
                  <Button size="sm" disabled={disputing || !disputeReason.trim()} onClick={submitDispute}>{disputing ? (t.common?.processing ?? 'Processing...') : (t.dashboard?.submitDispute ?? 'Submit dispute')}</Button>
                  <Button size="sm" variant="ghost" onClick={()=>{ setShowDispute(false); setDisputeReason(''); setDisputeDescription(''); }}>{t.common?.cancel ?? 'Cancel'}</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </RequireAuthLevel>
  );
}
