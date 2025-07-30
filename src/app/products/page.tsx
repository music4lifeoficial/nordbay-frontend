
import { RequireAuthLevel } from '@/components/auth/RequireAuthLevel';
import ProductsList from '@/components/products/ProductsList';

// ---
// Endpoint: GET /api/publications/
// Access: public (sin autenticación)
// ---
// Lista todos los productos del marketplace.
// Protegido con <AuthGuard level="public">.
//
// Ver BACKEND_FOR_FRONTEND.txt para detalles de payload y respuesta.


export default function ProductsPage() {
  return (
    <RequireAuthLevel level="public">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Productos</h1>
        <p className="text-nordic-700">Explora todos los productos del marketplace.</p>
        <ProductsList />
      </div>
    </RequireAuthLevel>
  );
}
