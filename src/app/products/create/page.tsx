"use client";
import { RequireAuthLevel } from '@/components/auth/RequireAuthLevel';
import CreateProductWizard from '@/components/products/CreateProductWizard';
import { useTranslation } from '@/lib/useTranslation';

// ---
// Endpoint: POST /api/publications
// Access: mitid_verified (MitID verificado)
// ---
// Permite crear un nuevo producto para vender.
// Protegido con <AuthGuard level="mitid_verified">.
//
// Ver BACKEND_FOR_FRONTEND.txt para detalles de payload y respuesta.


export default function ProductsCreatePage() {
  const t = useTranslation();
  return (
    <RequireAuthLevel level="mitid_verified">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">{t.products?.createTitle ?? "Crear producto"}</h1>
        <p className="text-nordic-700">{t.products?.createDescription ?? "Aquí puedes crear un nuevo producto para vender."}</p>
        <CreateProductWizard />
      </div>
    </RequireAuthLevel>
  );
}
