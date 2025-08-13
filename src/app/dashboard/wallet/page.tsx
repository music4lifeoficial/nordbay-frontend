"use client";
import { useEffect, useState } from 'react';
import { RequireAuthLevel } from '@/components/auth/RequireAuthLevel';
import { paymentsApi, Wallet } from '@/lib/api/payments';
import { Alert } from '@/components/ui/Alert';
import { useTranslation } from '@/lib/useTranslation';

export default function WalletPage() {
  const t = useTranslation();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    paymentsApi.getWallet()
      .then(setWallet)
      .catch(e => setError(e instanceof Error ? e.message : 'Failed to load wallet'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <RequireAuthLevel level="mitid_verified">
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t.dashboard?.walletTitle ?? 'Wallet & Balance'}</h1>
        {error && <Alert type="error" message={error} className="mb-4" />}
        {loading && <div className="h-40 bg-white border border-nordic-100 rounded-xl animate-pulse" />}
        {!loading && wallet && (
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white border border-nordic-100 shadow flex flex-col">
              <p className="text-xs uppercase tracking-wide text-nordic-500 mb-2">{t.dashboard?.walletBalance ?? 'Available balance'}</p>
              <p className="text-3xl font-bold text-brand-600">{wallet.balance} {wallet.currency}</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-nordic-100 shadow flex flex-col">
              <p className="text-xs uppercase tracking-wide text-nordic-500 mb-2">{t.dashboard?.walletPending ?? 'Pending'}</p>
              <p className="text-3xl font-bold text-nordic-700">{wallet.pending} {wallet.currency}</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-nordic-100 shadow flex flex-col col-span-2 md:col-span-1">
              <p className="text-xs uppercase tracking-wide text-nordic-500 mb-2">{t.dashboard?.walletTransactions ?? 'Transactions'}</p>
              <p className="text-2xl font-semibold text-nordic-800">{wallet.transactions_count}</p>
            </div>
          </div>
        )}
        {!loading && !wallet && !error && <Alert type="info" message={t.dashboard?.walletEmpty ?? 'No wallet data.'} />}
      </div>
    </RequireAuthLevel>
  );
}
