"use client";
import { RequireAuthLevel } from "@/components/auth/RequireAuthLevel";
import { useTranslation } from "@/lib/useTranslation";
import { useEffect, useState } from "react";
import { publicationsApi } from "@/lib/api/publications";
import type { Publication } from "@/types";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FavoritesPage() {
  const t = useTranslation();
  const [items, setItems] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    publicationsApi
      .getFavorites()
      .then(setItems)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load favorites"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <RequireAuthLevel level="light_account">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">{t.dashboard?.favoritesTitle ?? "Favoritos"}</h1>
        <p className="text-nordic-700 mb-6">{t.dashboard?.favoritesDescription ?? "Aquí verás tus productos favoritos guardados."}</p>
        {error && <Alert type="error" message={error} className="mb-4" />}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 bg-white rounded-xl border border-nordic-100 shadow animate-pulse" />
            ))}
          </div>
        )}
        {!loading && !items.length && !error && (
          <Alert type="info" message={t.dashboard?.favoritesEmpty ?? "No favorites yet."} />
        )}
        {!loading && !!items.length && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((p) => (
              <div key={p.id} className="bg-white rounded-xl shadow-md border border-nordic-100 flex flex-col group hover:shadow-lg transition overflow-hidden">
                <div className="relative w-full h-44 bg-nordic-100 flex items-center justify-center">
                  {p.primary_image || p.images?.[0] ? (
                    <img src={p.primary_image || p.images[0]} alt={p.title} className="object-cover w-full h-full group-hover:scale-105 transition" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-nordic-300 text-4xl">📦</div>
                  )}
                  {p.featured && (
                    <span className="absolute top-2 left-2 bg-brand-500 text-white text-xs px-2 py-1 rounded-full shadow">
                      {t.product?.featured ?? "Featured"}
                    </span>
                  )}
                </div>
                <div className="flex-1 flex flex-col p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-brand-600 font-bold text-lg">{p.price} DKK</span>
                    <span className="text-xs text-nordic-400 ml-auto capitalize">{p.category_id}</span>
                  </div>
                  <div className="font-semibold text-nordic-900 truncate mb-1" title={p.title}>
                    {p.title}
                  </div>
                  <div className="text-nordic-600 text-xs line-clamp-2 mb-2">{p.description}</div>
                  <Button variant="default" size="sm" className="mt-auto">
                    <Link href={`/products/${p.id}`} className="block w-full h-full">{t.marketplace?.viewProduct ?? 'View product'}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </RequireAuthLevel>
  );
}
