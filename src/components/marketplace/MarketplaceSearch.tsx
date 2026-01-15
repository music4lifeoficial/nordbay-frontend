"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { publicationsApi, categoriesApi } from '@/lib/api/publications';
import type { Publication, Category } from '@/types/api';
import type { SearchFilters } from '@/types';
import { Alert } from '@/components/ui/alert';
import { useTranslation } from '@/lib/useTranslation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { tokenManager } from '@/lib/api/client';
import Link from 'next/link';

export default function MarketplaceSearch() {
  // Core state
  const [publications, setPublications] = useState<Publication[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set()); // local optimistic favorites

  // Filters state
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [conditions, setConditions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'relevance' | 'date_desc' | 'price_asc' | 'price_desc'>('date_desc');
  const [page, setPage] = useState(1);
  const [perPage] = useState(24);

  // Pagination meta
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const t = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL params
  useEffect(() => {
    const qp = searchParams;
    if (!qp) return;
    const qQuery = qp.get('q') || '';
    const qCat = qp.get('cat') || '';
    const qMin = qp.get('pmin') || '';
    const qMax = qp.get('pmax') || '';
    const qCond = qp.getAll('cond');
    const qSort = (qp.get('sort') as typeof sortBy) || 'date_desc';
    const qPage = parseInt(qp.get('page') || '1', 10) || 1;

    setQuery(qQuery);
    setCategoryId(qCat);
    setPriceMin(qMin);
    setPriceMax(qMax);
    setConditions(qCond);
    setSortBy(qSort);
    setPage(qPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch categories once
  useEffect(() => {
    categoriesApi.getAll()
      .then(setCategories)
      .catch(() => {/* silent */});
  }, []);

  const buildFilters = useCallback((): SearchFilters => {
    const filters: SearchFilters = {
      query: query || undefined,
      category: categoryId || undefined,
      price_min: priceMin ? Number(priceMin) : undefined,
      price_max: priceMax ? Number(priceMax) : undefined,
      condition: conditions.length ? (conditions as any) : undefined,
      sort_by: sortBy,
      page,
      per_page: perPage,
    };
    return filters;
  }, [query, categoryId, priceMin, priceMax, conditions, sortBy, page, perPage]);

  const syncUrl = useCallback((filters: SearchFilters) => {
    const params = new URLSearchParams();
    if (filters.query) params.set('q', filters.query);
    if (filters.category) params.set('cat', String(filters.category));
    if (filters.price_min !== undefined) params.set('pmin', String(filters.price_min));
    if (filters.price_max !== undefined) params.set('pmax', String(filters.price_max));
    if (filters.condition) (filters.condition as string[]).forEach(c => params.append('cond', c));
    if (filters.sort_by) params.set('sort', filters.sort_by);
    if (filters.page) params.set('page', String(filters.page));
    router.replace(`?${params.toString()}`);
  }, [router]);

  const performSearch = useCallback(async (opts?: { goToPage?: number; keepPage?: boolean }) => {
    setLoading(true);
    setError(null);
    try {
      const nextPage = opts?.goToPage ? opts.goToPage : (opts?.keepPage ? page : 1);
      if (!opts?.keepPage && !opts?.goToPage) setPage(1);
      const filters = { ...buildFilters(), page: nextPage };
      const data = await publicationsApi.search(filters);
      setPublications(data.publications);
      setTotalPages(data.pagination.pages);
      setTotalResults(data.pagination.total);
      setPage(data.pagination.page);
      syncUrl(filters);
    } catch (e: any) {
      setError((t as any).alert?.marketplaceSearchError ?? (e?.message || 'Marketplace search failed'));
    } finally {
      setLoading(false);
    }
  }, [buildFilters, page, syncUrl, t]);

  // Trigger search when mounted (after URL params parsed)
  useEffect(() => {
    performSearch({ keepPage: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  const handleReset = () => {
    setQuery('');
    setCategoryId('');
    setPriceMin('');
    setPriceMax('');
    setConditions([]);
    setSortBy('date_desc');
    setPage(1);
    performSearch();
  };

  const toggleCondition = (value: string) => {
    setConditions(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const changePage = (next: number) => {
    if (next < 1 || next > totalPages || next === page) return;
    performSearch({ goToPage: next, keepPage: true });
  };

  const paginatedLabel = useMemo(() => {
    if (!totalResults) return '';
    const start = (page - 1) * perPage + 1;
    const end = Math.min(page * perPage, totalResults);
    return `${start}-${end} / ${totalResults}`;
  }, [page, perPage, totalResults]);

  const toggleFavorite = async (pub: Publication) => {
    const id = pub.id;
    const token = tokenManager.getToken();
    if (!token) {
      router.push(`/auth/login?next=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      return;
    }
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    try {
      if (favorites.has(id)) {
        await publicationsApi.removeFromFavorites(id);
      } else {
        await publicationsApi.addToFavorites(id);
      }
    } catch {
      // Revert on error
      setFavorites(prev => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id); else next.add(id);
        return next;
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-6">
      <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur rounded-xl border border-nordic-100 p-4 md:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={(t as any).marketplace?.searchPlaceholder ?? 'Buscar productos o vendedores...'}
            className="flex-1"
          />
          <div className="flex gap-2">
            <Button type="submit" variant="secondary" size="lg" disabled={loading}>{loading ? ((t as any).common?.searching ?? 'Buscando...') : ((t as any).common?.search ?? 'Buscar')}</Button>
            <Button type="button" variant="outline" size="lg" onClick={handleReset} disabled={loading}>{(t as any).common?.reset ?? 'Reset'}</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-nordic-500">{(t as any).marketplace?.category ?? 'Categoría'}</label>
            <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="border rounded-md px-2 py-2 text-sm bg-white">
              <option value="">{(t as any).common?.all ?? 'Todas'}</option>
              {categories.map(cat => <option key={cat.id} value={String(cat.id)}>{cat.name}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-nordic-500">{(t as any).marketplace?.priceMin ?? 'Precio mín.'}</label>
            <Input type="number" value={priceMin} onChange={e => setPriceMin(e.target.value)} placeholder="0" className="text-sm" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-nordic-500">{(t as any).marketplace?.priceMax ?? 'Precio máx.'}</label>
            <Input type="number" value={priceMax} onChange={e => setPriceMax(e.target.value)} placeholder="1000" className="text-sm" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-nordic-500">{(t as any).marketplace?.conditions ?? 'Condición'}</label>
            <div className="flex flex-wrap gap-2">
              {['new','like_new','good','fair'].map(c => (
                <button
                  type="button"
                  key={c}
                  onClick={() => toggleCondition(c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition ${conditions.includes(c) ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-nordic-200 text-nordic-600 hover:border-brand-400'}`}
                >{c}</button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-nordic-500">{(t as any).marketplace?.sortBy ?? 'Ordenar'}</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="border rounded-md px-2 py-2 text-sm bg-white">
              <option value="date_desc">{(t as any).marketplace?.sortNewest ?? 'Más recientes'}</option>
              <option value="price_asc">{(t as any).marketplace?.sortPriceAsc ?? 'Precio ↑'}</option>
              <option value="price_desc">{(t as any).marketplace?.sortPriceDesc ?? 'Precio ↓'}</option>
              <option value="relevance">{(t as any).marketplace?.sortRelevance ?? 'Relevancia'}</option>
            </select>
          </div>
        </div>
      </form>

      {error && <Alert type="error" message={error} className="mt-4" />}

      {/* Results meta */}
      <div className="flex items-center justify-between mt-6">
        <h2 className="text-lg font-semibold text-nordic-800">{(t as any).marketplace?.results ?? 'Resultados'}</h2>
        {paginatedLabel && <span className="text-xs text-nordic-500">{paginatedLabel}</span>}
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-3 border border-nordic-100 animate-pulse h-72" />
          ))}
        </div>
      )}

      {/* Results grid */}
      {!loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {publications.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md border border-nordic-100 flex flex-col group hover:shadow-lg transition overflow-hidden">
              <div className="relative w-full h-44 bg-nordic-100 flex items-center justify-center">
                {item.images && item.images[0] ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="object-cover w-full h-full transition group-hover:scale-105 duration-200"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-nordic-300 text-4xl">📦</div>
                )}
                <button
                  type="button"
                  onClick={() => toggleFavorite(item)}
                  className="absolute top-2 right-2 bg-white/80 backdrop-blur rounded-full p-2 shadow hover:scale-105 transition"
                  aria-label="Toggle favorite"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={favorites.has(item.id) ? '#ef4444' : 'none'} stroke={favorites.has(item.id) ? '#ef4444' : '#1f2937'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
              </div>
              <div className="flex-1 flex flex-col p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-brand-600 font-bold text-lg">{item.price} DKK</span>
                  <span className="text-xs text-nordic-400 ml-auto capitalize">{String(item.category_id)}</span>
                </div>
                <div className="font-semibold text-nordic-900 truncate mb-1" title={item.title}>{item.title}</div>
                <div className="text-nordic-600 text-xs line-clamp-2 mb-2">{item.description}</div>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="w-7 h-7 rounded-full bg-nordic-200 flex items-center justify-center text-nordic-400 text-lg">👤</span>
                  <span className="text-xs text-nordic-700 font-medium">{item.seller_nickname}</span>
                </div>
                <Button className="mt-3 w-full" variant="default">
                  <Link href={`/products/${item.id}`} className="block w-full h-full">{(t as any).marketplace?.viewProduct ?? 'Ver producto'}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !publications.length && !error && (
        <Alert type="info" message={(t as any).alert?.marketplaceNoResults ?? 'No se encontraron resultados.'} className="mt-6" />
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <Button type="button" variant="outline" size="sm" disabled={page === 1} onClick={() => changePage(page - 1)}>Prev</Button>
          {Array.from({ length: totalPages }).slice(0, 7).map((_, idx) => {
            const p = idx + 1;
            return (
              <button
                key={p}
                onClick={() => changePage(p)}
                className={`w-9 h-9 rounded-md text-sm font-medium border transition ${p === page ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-nordic-200 text-nordic-600 hover:border-brand-400'}`}
              >{p}</button>
            );
          })}
          {totalPages > 7 && <span className="text-xs text-nordic-400 px-2">...</span>}
          <Button type="button" variant="outline" size="sm" disabled={page === totalPages} onClick={() => changePage(page + 1)}>Next</Button>
        </div>
      )}
    </div>
  );
}
