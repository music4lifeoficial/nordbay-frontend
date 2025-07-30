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
          <div key={i} className="bg-white rounded-lg shadow p-4 border border-nordic-100">
            <Skeleton className="h-32 w-full rounded-md mb-3" />
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {products.map((prod) => (
        <div key={prod.id} className="bg-white rounded-lg shadow p-4 border border-nordic-100">
          <div className="font-semibold text-nordic-800 mb-1">{prod.title}</div>
          <div className="text-nordic-600 text-sm mb-2">{prod.description}</div>
          <div className="text-nordic-700 font-bold">{prod.price} DKK</div>
        </div>
      ))}
    </div>
  );
}
