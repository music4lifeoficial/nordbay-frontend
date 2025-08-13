"use client";
import { useEffect, useState } from 'react';
import { RequireAuthLevel } from '@/components/auth/RequireAuthLevel';
import { paymentsApi } from '@/lib/api/payments';
import { Alert } from '@/components/ui/Alert';
import { useTranslation } from '@/lib/useTranslation';
import Link from 'next/link';

interface Tx { id: string; amount: number; status: string; type: string; created_at: string; }

export default function PaymentsTransactionsPage() {
  const t = useTranslation();
  const [txs, setTxs] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    setLoading(true);
    paymentsApi.getTransactions({ status: status || undefined, type: type || undefined })
      .then(setTxs)
      .catch(e => setError(e instanceof Error ? e.message : 'Failed to load transactions'))
      .finally(() => setLoading(false));
  }, [status, type]);

  return (
    <RequireAuthLevel level="mitid_verified">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">{t.dashboard?.transactionsTitle ?? 'Payment Transactions'}</h1>
        <div className="flex flex-wrap gap-3 mb-6">
          <select value={status} onChange={e=>setStatus(e.target.value)} className="border rounded-md px-2 py-1 text-sm">
            <option value="">{t.common?.all ?? 'All'}</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="succeeded">Succeeded</option>
            <option value="failed">Failed</option>
          </select>
          <select value={type} onChange={e=>setType(e.target.value)} className="border rounded-md px-2 py-1 text-sm">
            <option value="">{t.common?.all ?? 'All'}</option>
            <option value="sale">Sale</option>
            <option value="purchase">Purchase</option>
            <option value="refund">Refund</option>
            <option value="escrow">Escrow</option>
          </select>
        </div>
        {error && <Alert type="error" message={error} className="mb-4" />}
        {loading && <div className="space-y-3">{Array.from({ length: 6 }).map((_,i)=><div key={i} className="h-14 rounded-lg bg-white border border-nordic-100 shadow animate-pulse" />)}</div>}
        {!loading && !txs.length && !error && <Alert type="info" message={t.dashboard?.transactionsEmpty ?? 'No transactions found.'} />}
        {!loading && !!txs.length && (
          <div className="space-y-2">
            {txs.map(tx => {
              const statusColor = tx.status === 'succeeded' ? 'bg-emerald-100 text-emerald-700' : tx.status === 'pending' ? 'bg-amber-100 text-amber-700' : tx.status === 'failed' ? 'bg-red-100 text-red-600' : 'bg-nordic-100 text-nordic-600';
              const typeColor = tx.type === 'refund' ? 'bg-purple-100 text-purple-700' : tx.type === 'escrow' ? 'bg-blue-100 text-blue-700' : tx.type === 'sale' ? 'bg-brand-100 text-brand-700' : 'bg-nordic-100 text-nordic-600';
              return (
              <Link href={`/dashboard/payments/transactions/${tx.id}`} key={tx.id} className="block">
                <div className="bg-white border border-nordic-100 rounded-lg p-3 flex items-center gap-4 text-sm shadow-sm hover:border-brand-300 hover:shadow transition cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-nordic-800 truncate flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${typeColor}`}>{tx.type}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColor}`}>{tx.status}</span>
                    </p>
                    <p className="text-xs text-nordic-500">{new Date(tx.created_at).toLocaleString()}</p>
                  </div>
                  <span className="font-semibold text-brand-600">{tx.amount} DKK</span>
                </div>
              </Link>);
            })}
          </div>
        )}
      </div>
    </RequireAuthLevel>
  );
}
