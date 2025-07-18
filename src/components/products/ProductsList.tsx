"use client";
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/api/products';
import type { Publication } from '@/types';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ProductsList() {
  const [products, setProducts] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .catch((err) => setError(err?.message || 'Error al cargar productos'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    // Skeletons para cards de producto (3 columnas en desktop, 1 en mobile)
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
  if (error) return <div className="text-red-600">{error}</div>;
  if (!products.length) return <div className="text-nordic-500">No hay productos publicados aún.</div>;

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
