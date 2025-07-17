import { AuthGuard } from '@/hooks/useAuthGuard';

// ---
// Endpoint: GET /api/publications/
// Access: public (sin autenticación)
// ---
// Página principal del marketplace.
// Protegido con <AuthGuard level="public">.
//
// Ver BACKEND_FOR_FRONTEND.txt para detalles de payload y respuesta.

export default function MarketplaceLayoutPage() {
  return (
    <AuthGuard level="public" fallback={<div className="p-8 text-center text-red-600">Acceso restringido.</div>}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Marketplace</h1>
        <p className="text-nordic-700">Bienvenido al marketplace de NordBay.</p>
      </div>
    </AuthGuard>
  );
}
