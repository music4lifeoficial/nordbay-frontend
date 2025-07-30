"use client";
import { RequireAuthLevel } from '@/components/auth/RequireAuthLevel';
import { useTranslation } from '@/lib/useTranslation';

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
  const t = useTranslation();
  return (
    <RequireAuthLevel level="public">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">{t.marketplace?.searchTitle ?? "Buscar en el marketplace"}</h1>
        <p className="text-nordic-700 mb-6">{t.marketplace?.searchDescription ?? "Encuentra productos y vendedores en NordBay."}</p>
        <MarketplaceSearch />
      </div>
    </RequireAuthLevel>
  );
}
