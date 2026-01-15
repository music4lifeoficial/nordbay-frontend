"use client";
import { useEffect, useState } from 'react';
import { productsAPI, type Product } from '@/lib/api/products-fixed';
import { Skeleton } from '@/components/ui/Skeleton';
import { Alert } from '@/components/ui/alert';
import { useTranslation } from '@/lib/useTranslation';


export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslation();

  useEffect(() => {
    setLoading(true);
    productsAPI.search({ page_size: 12 })
      .then(res => setProducts(res.items))
      .catch((err: any) => setError(t.alert?.productsLoadError || err?.message || 'Error loading products'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
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
  if (error) return <Alert variant="destructive">{error}</Alert>;
  if (!products.length) return <Alert> {t.alert?.productsEmpty ?? 'No products have been published yet.'} </Alert>;

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
          </div>
          <div className="flex-1 flex flex-col p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-brand-600 font-bold text-lg">{prod.price} DKK</span>
              <span className="text-xs text-nordic-400 ml-auto capitalize">{prod.category_id}</span>
            </div>
            <div className="font-semibold text-nordic-900 truncate mb-1" title={prod.title}>{prod.title}</div>
            <div className="text-nordic-600 text-xs line-clamp-2 mb-2">{prod.description}</div>
            <button className="mt-3 w-full bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg font-semibold transition">Ver producto</button>
          </div>
        </div>
      ))}
    </div>
  );
}
