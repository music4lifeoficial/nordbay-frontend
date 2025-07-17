"use client";

import { AuthGuard } from '@/hooks/useAuthGuard';
import UpgradeSuggestion from '@/components/auth/UpgradeSuggestion';
import DashboardDataSection from '@/components/dashboard/DashboardData';

// ---
// Endpoint: GET /api/dashboard
// Access: light_account (email verificado)
// ---
// Muestra panel de usuario con productos, favoritos y actividad.
// Protegido con <AuthGuard level="light_account">.
//
// Si el usuario es light_account, se sugiere upgrade a MitID.
//
// Ver BACKEND_FOR_FRONTEND.txt para detalles de payload y respuesta.

export default function DashboardPage() {
  return (
    <AuthGuard level="light_account" fallback={<div className="p-8 text-center text-red-600">Acceso restringido: necesitas una cuenta verificada por email.</div>}>
      <div className="p-8 space-y-6">
        <UpgradeSuggestion />
        <h1 className="text-3xl font-bold mb-4">Panel de usuario</h1>
        <p className="text-nordic-700">Bienvenido a tu dashboard. Aquí verás tus productos, favoritos y actividad.</p>
        <DashboardDataSection />
      </div>
    </AuthGuard>
  );
}
