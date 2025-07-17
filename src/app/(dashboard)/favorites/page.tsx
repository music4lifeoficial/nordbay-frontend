
import { AuthGuard } from '@/hooks/useAuthGuard';
import FavoritesList from '@/components/dashboard/FavoritesList';

// ---
// Endpoint: GET /api/favorites
// Access: light_account (email verificado)
// ---
// Muestra los productos favoritos del usuario.
// Protegido con <AuthGuard level="light_account">.
//
// Ver BACKEND_FOR_FRONTEND.txt para detalles de payload y respuesta.

export default function DashboardFavoritesPage() {
  return (
    <AuthGuard level="light_account" fallback={<div className="p-8 text-center text-red-600">Acceso restringido: necesitas una cuenta verificada por email para ver favoritos.</div>}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Favoritos</h1>
        <p className="text-nordic-700">Aquí verás tus productos favoritos.</p>
        <FavoritesList />
      </div>
    </AuthGuard>
  );
}
