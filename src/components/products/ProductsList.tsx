"use client";
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/api/products';
import type { Publication } from '@/types';
import { Skeleton } from '@/components/ui/Skeleton';
import { Alert } from '@/components/ui/Alert';
import { useTranslation } from '@/lib/useTranslation';


export default function ProductsList() {
  const [products, setProducts] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslation();

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .catch((err) => setError(t.alert?.productsLoadError || err?.message || 'Error loading products'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    // Skeletons for product cards (3 columns desktop, 1 mobile)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4 border border-nordic-100">
            <Skeleton className="h-40 w-full rounded-lg mb-3" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-5 w-1/4" />
          </div>
        ))}
      </div>
    );
  }
  if (error) return <Alert type="error" message={error} className="mb-4" />;
  if (!products.length) return <Alert type="info" message={t.alert?.productsEmpty ?? 'No products have been published yet.'} className="mb-4" />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {products.map((prod) => (
        <div key={prod.id} className="bg-white rounded-xl shadow-md border border-nordic-100 flex flex-col group hover:shadow-lg transition overflow-hidden">
          <div className="relative w-full h-48 bg-nordic-100 flex items-center justify-center">
            {prod.primary_image || (prod.images && prod.images[0]) ? (
              <img
                src={prod.primary_image || prod.images[0]}
                alt={prod.title}
                className="object-cover w-full h-full transition group-hover:scale-105 duration-200"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-nordic-300 text-4xl">📦</div>
            )}
            {prod.featured && (
              <span className="absolute top-2 left-2 bg-brand-500 text-white text-xs px-2 py-1 rounded-full shadow">Featured</span>
            )}
          </div>
          <div className="flex-1 flex flex-col p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-brand-600 font-bold text-lg">{prod.price} DKK</span>
              <span className="text-xs text-nordic-400 ml-auto capitalize">{prod.category_id}</span>
            </div>
            <div className="font-semibold text-nordic-900 truncate mb-1" title={prod.title}>{prod.title}</div>
            <div className="text-nordic-600 text-xs line-clamp-2 mb-2">{prod.description}</div>
            <div className="flex items-center gap-2 mt-auto">
              {prod.seller.avatar ? (
                <img src={prod.seller.avatar} alt={prod.seller.nickname} className="w-7 h-7 rounded-full border" />
              ) : (
                <span className="w-7 h-7 rounded-full bg-nordic-200 flex items-center justify-center text-nordic-400 text-lg">👤</span>
              )}
              <span className="text-xs text-nordic-700 font-medium">{prod.seller.nickname}</span>
              <span className="ml-auto flex items-center gap-1 text-nordic-400 text-xs">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#f87171"/></svg>
                {prod.favorites_count}
              </span>
            </div>
            <button className="mt-3 w-full bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg font-semibold transition">Ver producto</button>
          </div>
        </div>
      ))}
    </div>
  );
}
