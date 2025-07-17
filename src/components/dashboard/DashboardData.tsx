"use client";
import { useEffect, useState } from 'react';
import { getDashboardData, DashboardData } from '@/lib/api/dashboard';

export default function DashboardDataSection() {
  // const { user } = useAuthStore();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getDashboardData()
      .then(setData)
      .catch((err) => setError(err?.message || 'Error al cargar el dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-nordic-600">Cargando datos del dashboard...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!data) return null;

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-2">Mi actividad</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-nordic-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-nordic-700">{data.user.sales_count}</div>
            <div className="text-nordic-600 text-sm">Ventas</div>
          </div>
          <div className="bg-nordic-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-nordic-700">{data.user.purchases_count}</div>
            <div className="text-nordic-600 text-sm">Compras</div>
          </div>
          <div className="bg-nordic-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-nordic-700">{data.products.length}</div>
            <div className="text-nordic-600 text-sm">Mis productos</div>
          </div>
          <div className="bg-nordic-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-nordic-700">{data.favorites.length}</div>
            <div className="text-nordic-600 text-sm">Favoritos</div>
          </div>
        </div>
      </section>
      {/* Puedes expandir con más secciones: productos, favoritos, actividad reciente, etc. */}
    </div>
  );
}
