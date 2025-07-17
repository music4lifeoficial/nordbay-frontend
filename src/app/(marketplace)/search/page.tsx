import { AuthGuard } from '@/hooks/useAuthGuard';

// ---
// Endpoint: GET /api/search/*
// Access: public (sin autenticación)
// ---
// Permite buscar productos y vendedores en el marketplace.
// Protegido con <AuthGuard level="public">.
//
// Ver BACKEND_FOR_FRONTEND.txt para detalles de payload y respuesta.

import MarketplaceSearch from '@/components/marketplace/MarketplaceSearch';

export default function MarketplaceSearchPage() {
  return (
    <AuthGuard level="public" fallback={<div className="p-8 text-center text-red-600">Acceso restringido.</div>}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Buscar en el marketplace</h1>
        <p className="text-nordic-700 mb-6">Encuentra productos y vendedores en NordBay.</p>
        <MarketplaceSearch />
      </div>
    </AuthGuard>
  );
}
