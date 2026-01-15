// Ejemplos de skeletons para futuras vistas: perfil de usuario y detalle de producto.
// Úsalos como referencia cuando implementes esas páginas.

import { Skeleton } from "./Skeleton";

export function ProfileSkeleton() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-6 mb-6">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-2/3 mb-6" />
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <Skeleton className="h-80 w-full rounded-xl mb-4" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-full rounded-md mt-6" />
      </div>
    </div>
  );
}

// Usa estos componentes en los estados de carga de las páginas de perfil y detalle de producto.
// Ejemplo:
// if (loading) return <ProfileSkeleton />;
// if (loading) return <ProductDetailSkeleton />;
