"use client";
import { useEffect, useState } from 'react';
import { getFavorites } from '@/lib/api/favorites';
import type { Publication } from '@/types';

export default function FavoritesList() {
  const [favorites, setFavorites] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getFavorites()
      .then(setFavorites)
      .catch((err) => setError(err?.message || 'Error al cargar favoritos'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-nordic-600">Cargando favoritos...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!favorites.length) return <div className="text-nordic-500">No tienes productos favoritos aún.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {favorites.map((fav) => (
        <div key={fav.id} className="bg-white rounded-lg shadow p-4 border border-nordic-100">
          <div className="font-semibold text-nordic-800 mb-1">{fav.title}</div>
          <div className="text-nordic-600 text-sm mb-2">{fav.description}</div>
          <div className="text-nordic-700 font-bold">{fav.price} DKK</div>
        </div>
      ))}
    </div>
  );
}
