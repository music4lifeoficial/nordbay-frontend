import { AuthGuard } from '@/hooks/useAuthGuard';

// ---
// Endpoint: POST /api/publications
// Access: mitid_verified (MitID verificado)
// ---
// Permite crear un nuevo producto desde el dashboard.
// Protegido con <AuthGuard level="mitid_verified">.
//
// Ver BACKEND_FOR_FRONTEND.txt para detalles de payload y respuesta.

export default function DashboardCreatePage() {
  return (
    <AuthGuard level="mitid_verified" fallback={<div className="p-8 text-center text-red-600">Acceso restringido: solo usuarios con MitID verificado pueden crear publicaciones.</div>}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Crear publicación</h1>
        <p className="text-nordic-700">Aquí podrás crear un nuevo producto para vender en NordBay.</p>
      </div>
    </AuthGuard>
  );
}
