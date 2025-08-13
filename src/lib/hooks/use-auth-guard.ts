'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';
import { AuthLevel, AUTH_LEVELS } from '@/lib/auth/auth-levels';
import { toast } from 'sonner';

interface UseAuthGuardOptions {
  requiredLevel: AuthLevel;
  redirectTo?: string;
  showToast?: boolean;
  permission?: string;
}

/**
 * Hook para proteger rutas basado en niveles de autorización
 * Según ARQUITECTURA_AUTENTICACION.md
 */
export function useAuthGuard({
  requiredLevel,
  redirectTo = '/auth/login',
  showToast = true,
  permission
}: UseAuthGuardOptions) {
  const router = useRouter();
  const { user, hasAuthLevel, hasPermission } = useAuthStore();

  useEffect(() => {
    // Verificar nivel de autorización
    if (!hasAuthLevel(requiredLevel)) {
      if (showToast) {
        const levelName = AUTH_LEVELS[requiredLevel].name;
        toast.error(`Du skal have ${levelName} for at tilgå denne side`);
      }
      router.push(redirectTo);
      return;
    }

    // Verificar permiso específico si se proporciona
    if (permission && !hasPermission(permission)) {
      if (showToast) {
        toast.error('Du har ikke tilladelse til at tilgå denne side');
      }
      router.push(redirectTo);
      return;
    }
  }, [user, requiredLevel, permission, hasAuthLevel, hasPermission, router, redirectTo, showToast]);

  return {
    hasAccess: hasAuthLevel(requiredLevel) && (!permission || hasPermission(permission)),
    user,
    authLevel: user?.auth_level || AuthLevel.PUBLIC
  };
}

/**
 * Hook específico para verificar si puede vender (Nivel 2 - MitID Verified)
 */
export function useCanSell() {
  return useAuthGuard({
    requiredLevel: AuthLevel.MITID_VERIFIED,
    permission: 'create_publications',
    redirectTo: '/auth/verify-mitid'
  });
}

/**
 * Hook específico para verificar si puede comprar (Nivel 2 - MitID Verified)
 */
export function useCanBuy() {
  return useAuthGuard({
    requiredLevel: AuthLevel.MITID_VERIFIED,
    permission: 'buy_products',
    redirectTo: '/auth/verify-mitid'
  });
}

/**
 * Hook específico para funciones sociales (Nivel 1 - Light Account)
 */
export function useCanSocial() {
  return useAuthGuard({
    requiredLevel: AuthLevel.LIGHT_ACCOUNT,
    redirectTo: '/auth/verify-email'
  });
}

/**
 * Componente HOC para proteger rutas
 */
interface AuthGuardProps {
  children: React.ReactNode;
  requiredLevel: AuthLevel;
  fallback?: React.ReactNode;
  permission?: string;
}

export function AuthGuard({ 
  children, 
  requiredLevel, 
  fallback, 
  permission 
}: AuthGuardProps) {
  const { hasAccess } = useAuthGuard({ 
    requiredLevel, 
    showToast: false,
    permission 
  });

  if (!hasAccess) {
    return fallback || (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-nordic-900 mb-2">
            Adgang nægtet
          </h2>
          <p className="text-nordic-600 mb-4">
            Du skal have {AUTH_LEVELS[requiredLevel].name} for at se dette indhold
          </p>
          <AuthLevelDisplay user={null} />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export {};
