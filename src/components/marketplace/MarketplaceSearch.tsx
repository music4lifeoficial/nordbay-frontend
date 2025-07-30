"use client";
import { useState } from 'react';
import { searchMarketplace } from '@/lib/api/search';
import type { Publication } from '@/types';
import { Alert } from '@/components/ui/Alert';
import { useTranslation } from '@/lib/useTranslation';

export default function MarketplaceSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslation();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await searchMarketplace({ query });
      setResults(data.publications);
    } catch {
      setError(t.alert?.marketplaceSearchError ?? 'Error al buscar en el marketplace');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t.marketplace?.searchPlaceholder ?? 'Buscar productos o vendedores...'}
          className="input flex-1"
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? t.common?.searching ?? 'Buscando...' : t.common?.search ?? 'Buscar'}
        </button>
      </form>
      {error && <Alert type="error" message={error} className="mb-4" />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4 border border-nordic-100">
            <div className="font-semibold text-nordic-800 mb-1">{item.title}</div>
            <div className="text-nordic-600 text-sm mb-2">{item.description}</div>
            <div className="text-nordic-700 font-bold">{item.price} DKK</div>
          </div>
        ))}
      </div>
      {!loading && !results.length && query && (
        <Alert type="info" message={t.alert?.marketplaceNoResults ?? 'No se encontraron resultados.'} className="mt-4" />
      )}
    </div>
  );
}
