"use client";
import { useEffect, useState } from 'react';
import { RequireAuthLevel } from '@/components/auth/RequireAuthLevel';
import { useTranslation } from '@/lib/useTranslation';
import { salesApi } from '@/lib/api/sales';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SaleItem { id: string; publication: any; status: string; amount: number; created_at: string; }

export default function SalesPage() {
  const t = useTranslation();
  const [sales, setSales] = useState<SaleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    salesApi.list(filter ? { status: filter } : {})
      .then(setSales)
      .catch(e => setError(e instanceof Error ? e.message : 'Failed to load sales'))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <RequireAuthLevel level="light_account">
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold">{t.dashboard?.salesTitle ?? 'My Purchases & Sales'}</h1>
          <select value={filter} onChange={e=>setFilter(e.target.value)} className="border rounded-md px-2 py-1 text-sm ml-auto">
            <option value="">{t.common?.all ?? 'All'}</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        {error && <Alert type="error" message={error} className="mb-4" />}
        {loading && <div className="grid gap-4">{Array.from({ length: 5 }).map((_,i)=><div key={i} className="h-16 rounded-lg bg-white border border-nordic-100 shadow animate-pulse" />)}</div>}
        {!loading && !sales.length && !error && <Alert type="info" message={t.dashboard?.salesEmpty ?? 'No sales found.'} />}
        {!loading && !!sales.length && (
          <div className="space-y-3">
            {sales.map(s => (
              <div key={s.id} className="bg-white border border-nordic-100 rounded-lg p-4 flex items-center gap-4 shadow-sm hover:shadow transition">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-nordic-800 truncate">{s.publication?.title ?? 'Publication'}</p>
                  <p className="text-xs text-nordic-500">{new Date(s.created_at).toLocaleDateString()} • {s.status}</p>
                </div>
                <span className="text-brand-600 font-semibold text-sm">{s.amount} DKK</span>
                <Button variant="outline" size="sm">
                  <Link href={`/dashboard/sales/${s.id}`} className="block w-full h-full">{t.dashboard?.viewDetails ?? 'Details'}</Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </RequireAuthLevel>
  );
}
