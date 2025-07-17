
import { AuthGuard } from '@/hooks/useAuthGuard';
import UpgradeSuggestion from '@/components/auth/UpgradeSuggestion';
import ProfileDataSection from '@/components/dashboard/ProfileData';

// ---
// Endpoint: GET /api/users/me
// Access: light_account (email verificado)
// ---
// Muestra y permite editar información personal del usuario.
// Protegido con <AuthGuard level="light_account">.
//
// Si el usuario es light_account, se sugiere upgrade a MitID.
//
// Ver BACKEND_FOR_FRONTEND.txt para detalles de payload y respuesta.

export default function DashboardProfilePage() {
  return (
    <AuthGuard level="light_account" fallback={<div className="p-8 text-center text-red-600">Acceso restringido: necesitas una cuenta verificada por email para ver tu perfil.</div>}>
      <div className="p-8 space-y-6">
        <UpgradeSuggestion />
        <h1 className="text-3xl font-bold mb-4">Mi perfil</h1>
        <p className="text-nordic-700">Aquí puedes ver y editar tu información personal.</p>
        <ProfileDataSection />
      </div>
    </AuthGuard>
  );
}
