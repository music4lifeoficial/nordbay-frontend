"use client";
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { RequireAuthLevel } from '@/components/auth/RequireAuthLevel';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/useTranslation';
import { pushToast } from '@/hooks/use-toast';
import { useTransaction, useRefunds, useReleaseTransaction, useCreateRefund, useDisputeTransaction } from '@/lib/hooks/usePayments';

interface TxDetail { id: string; amount: number; status: string; escrow_status?: string; dispute?: any; created_at?: string; type?: string; payment_id?: string; }
interface RefundItem { id: string; amount: number; status: string; reason: string; created_at: string; processed_at?: string; }

export default function TransactionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const t = useTranslation();
  
  // React Query hooks
  const { data: tx, isLoading: txLoading, error: txError } = useTransaction(id);
  const { data: refundsData, isLoading: refundsLoading } = useRefunds(tx?.payment_id || '');
  const releaseMutation = useReleaseTransaction();
  const refundMutation = useCreateRefund();
  const disputeMutation = useDisputeTransaction();
  
  // Local UI state
  const [showRefund, setShowRefund] = useState(false);
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('');
  const [showDispute, setShowDispute] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeDescription, setDisputeDescription] = useState('');

  const loading = txLoading || refundsLoading;
  const error = txError?.message;
  const refunds = refundsData?.refunds || [];
  const releasing = releaseMutation.isPending;
  const refunding = refundMutation.isPending;
  const disputing = disputeMutation.isPending;

  const canRelease = tx && (tx.status === 'succeeded' || tx.status === 'escrow_pending') && tx.escrow_status === 'held';
  const canRefund = tx && tx.payment_id && tx.status === 'succeeded';

  const releaseFunds = async () => {
    if (!tx) return;
    try {
      await releaseMutation.mutateAsync(tx.id);
      pushToast({ title: t.common?.success ?? 'Success', message: t.dashboard?.fundsReleased ?? 'Funds released.', type: 'success' });
    } catch (e: any) {
      pushToast({ title: t.common?.error ?? 'Error', message: e.message || 'Failed to release', type: 'error' });
    }
  };

  const submitRefund = async () => {
    if (!tx || !tx.payment_id || !refundAmount || !refundReason.trim()) return;
    try {
      await refundMutation.mutateAsync({ payment_id: tx.payment_id, amount: parseFloat(refundAmount), reason: refundReason });
      pushToast({ message: t.dashboard?.refundRequested ?? 'Refund requested', type: 'success' });
      setShowRefund(false);
      setRefundAmount('');
      setRefundReason('');
    } catch (e: any) {
      pushToast({ message: e.message || 'Failed to request refund', type: 'error' });
    }
  };

  const submitDispute = async () => {
    if (!tx || !disputeReason.trim()) return;
    try {
      await disputeMutation.mutateAsync({ transactionId: tx.id, data: { reason: disputeReason, description: disputeDescription } });
      pushToast({ message: t.dashboard?.disputeOpened ?? 'Dispute opened', type: 'success' });
      setShowDispute(false);
      setDisputeReason('');
      setDisputeDescription('');
    } catch (e: any) {
      pushToast({ message: e.message || 'Failed to open dispute', type: 'error' });
    }
  };

  return (
    <RequireAuthLevel level="mitid_verified">
      <div className="p-8 max-w-4xl">
        <button onClick={()=>router.back()} className="text-sm text-nordic-600 hover:text-nordic-800 mb-4">← {t.common?.back ?? 'Back'}</button>
        <h1 className="text-2xl font-bold mb-4">{t.dashboard?.transactionDetailTitle ?? 'Transaction Detail'}</h1>
        {error && <Alert type="error" message={error} className="mb-4" />}
        {loading && <div className="h-32 rounded-lg bg-white border border-nordic-100 shadow animate-pulse" />}
        {!loading && tx && (
          <div className="space-y-6">
            <div className="bg-white border border-nordic-100 rounded-lg p-5 space-y-4 shadow-sm">
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <p className="text-nordic-500">ID</p>
                  <p className="font-mono text-xs break-all">{tx.id}</p>
                </div>
                <div>
                  <p className="text-nordic-500">{t.common?.amount ?? 'Amount'}</p>
                  <p className="font-semibold">{tx.amount} DKK</p>
                </div>
                <div>
                  <p className="text-nordic-500">Status</p>
                  <p className="font-semibold capitalize">{tx.status}</p>
                </div>
                {tx.type && <div><p className="text-nordic-500">Type</p><p className="font-semibold capitalize">{tx.type}</p></div>}
                {tx.escrow_status && <div><p className="text-nordic-500">Escrow</p><p className="font-semibold capitalize">{tx.escrow_status}</p></div>}
                {tx.payment_id && <div><p className="text-nordic-500">Payment ID</p><p className="font-mono text-xs">{tx.payment_id}</p></div>}
                {tx.created_at && <div><p className="text-nordic-500">{t.common?.date ?? 'Date'}</p><p className="font-semibold">{new Date(tx.created_at).toLocaleString()}</p></div>}
              </div>
              {tx.dispute && <div className="border-t pt-4">
                <p className="text-sm font-semibold mb-2">Dispute</p>
                <pre className="text-xs bg-nordic-50 p-2 rounded overflow-x-auto max-h-56">{JSON.stringify(tx.dispute, null, 2)}</pre>
              </div>}
              <div className="pt-2 flex flex-wrap gap-3">
                {canRelease && <Button disabled={releasing} onClick={releaseFunds} size="sm" variant="secondary">{releasing ? (t.common?.processing ?? 'Processing...') : (t.dashboard?.releaseFunds ?? 'Release Funds')}</Button>}
                {canRefund && <Button size="sm" variant="outline" onClick={()=>setShowRefund(true)}>{t.dashboard?.requestRefund ?? 'Request Refund'}</Button>}
                <Button size="sm" variant="outline" onClick={()=>setShowDispute(true)}>{t.dashboard?.openDispute ?? 'Open Dispute'}</Button>
              </div>
            </div>

            {refunds.length > 0 && (
              <div className="bg-white border border-nordic-100 rounded-lg p-5 shadow-sm">
                <h2 className="text-lg font-semibold mb-3">{t.dashboard?.refundHistory ?? 'Refund History'}</h2>
                <div className="space-y-2">
                  {refunds.map((refund: RefundItem) => (
                    <div key={refund.id} className="flex items-center justify-between p-3 bg-nordic-50 rounded border">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{refund.amount} DKK - {refund.reason}</p>
                        <p className="text-xs text-nordic-500">{new Date(refund.created_at).toLocaleString()} • {refund.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showRefund && (
              <div className="bg-white border border-nordic-100 rounded-lg p-5 shadow-sm space-y-4">
                <h2 className="text-lg font-semibold">{t.dashboard?.requestRefund ?? 'Request Refund'}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input value={refundAmount} onChange={e=>setRefundAmount(e.target.value)} type="number" step="0.01" placeholder={t.dashboard?.refundAmount ?? 'Amount'} className="border rounded px-3 py-2 text-sm" />
                  <input value={refundReason} onChange={e=>setRefundReason(e.target.value)} placeholder={t.dashboard?.refundReason ?? 'Reason'} className="border rounded px-3 py-2 text-sm" />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" disabled={refunding || !refundAmount || !refundReason.trim()} onClick={submitRefund}>{refunding ? (t.common?.processing ?? 'Processing...') : (t.dashboard?.submitRefund ?? 'Submit')}</Button>
                  <Button size="sm" variant="ghost" onClick={()=>{ setShowRefund(false); setRefundAmount(''); setRefundReason(''); }}>{t.common?.cancel ?? 'Cancel'}</Button>
                </div>
              </div>
            )}

            {showDispute && (
              <div className="bg-white border border-nordic-100 rounded-lg p-5 shadow-sm space-y-4">
                <h2 className="text-lg font-semibold">{t.dashboard?.openDispute ?? 'Open Dispute'}</h2>
                <input value={disputeReason} onChange={e=>setDisputeReason(e.target.value)} placeholder={t.dashboard?.disputeReason ?? 'Reason'} className="w-full border rounded px-3 py-2 text-sm" />
                <textarea value={disputeDescription} onChange={e=>setDisputeDescription(e.target.value)} placeholder={t.dashboard?.disputeDescription ?? 'Description (optional)'} className="w-full border rounded px-3 py-2 text-sm min-h-[80px]" />
                <div className="flex gap-2">
                  <Button size="sm" disabled={disputing || !disputeReason.trim()} onClick={submitDispute}>{disputing ? (t.common?.processing ?? 'Processing...') : (t.dashboard?.submitDispute ?? 'Submit Dispute')}</Button>
                  <Button size="sm" variant="ghost" onClick={()=>{ setShowDispute(false); setDisputeReason(''); setDisputeDescription(''); }}>{t.common?.cancel ?? 'Cancel'}</Button>
                </div>
              </div>
            )}
          </div>
        )}
        {!loading && !tx && !error && <Alert type="info" message={t.dashboard?.transactionNotFound ?? 'Transaction not found'} />}
      </div>
    </RequireAuthLevel>
  );
}
