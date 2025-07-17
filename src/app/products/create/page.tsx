
import { AuthGuard } from '@/hooks/useAuthGuard';
import CreateProductWizard from '@/components/products/CreateProductWizard';

// ---
// Endpoint: POST /api/publications
// Access: mitid_verified (MitID verificado)
// ---
// Permite crear un nuevo producto para vender.
// Protegido con <AuthGuard level="mitid_verified">.
//
// Ver BACKEND_FOR_FRONTEND.txt para detalles de payload y respuesta.

export default function ProductsCreatePage() {
  return (
    <AuthGuard level="mitid_verified" fallback={<div className="p-8 text-center text-red-600">Acceso restringido: solo usuarios con MitID verificado pueden crear productos.</div>}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Crear producto</h1>
        <p className="text-nordic-700">Aquí puedes crear un nuevo producto para vender.</p>
        <CreateProductWizard />
      </div>
    </AuthGuard>
  );
}
