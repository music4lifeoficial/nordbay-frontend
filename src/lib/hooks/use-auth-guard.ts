"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';
import { toast } from 'sonner';

// Lightweight levels aligned with backend flags
export enum AuthLevel {
  PUBLIC = 'public',
  VERIFIED = 'verified',
  MITID_VERIFIED = 'mitid_verified',
}

const LEVEL_NAMES: Record<AuthLevel, string> = {
  [AuthLevel.PUBLIC]: 'Offentlig',
  [AuthLevel.VERIFIED]: 'Email verificeret',
  [AuthLevel.MITID_VERIFIED]: 'MitID verificeret',
};

interface UseAuthGuardOptions {
  requiredLevel: AuthLevel;
  redirectTo?: string;
  showToast?: boolean;
  // kept for backward compatibility; currently not used
  permission?: string;
}

/**
 * Hook de protección basado únicamente en flags del backend (verified, mitid_verified)
 */
export function useAuthGuard({
  requiredLevel,
  redirectTo,
  showToast = true,
}: UseAuthGuardOptions) {
  const router = useRouter();
  const { user } = useAuthStore();

  const isVerified = !!user?.verified;
  const isMitIDVerified = !!user?.mitid_verified;

  const hasAccess =
    requiredLevel === AuthLevel.PUBLIC ||
    (requiredLevel === AuthLevel.VERIFIED && isVerified) ||
    (requiredLevel === AuthLevel.MITID_VERIFIED && isMitIDVerified);

  useEffect(() => {
    if (hasAccess) return;

    // Pick sensible default redirect if not provided
    const defaultRedirect =
      requiredLevel === AuthLevel.MITID_VERIFIED
        ? '/auth/verify-mitid'
        : requiredLevel === AuthLevel.VERIFIED
        ? '/auth/verify-email'
        : '/auth/login';

    if (showToast) {
      const levelName = LEVEL_NAMES[requiredLevel];
      toast.error(`Du skal have ${levelName} for at tilgå denne side`);
    }

    router.push(redirectTo || defaultRedirect);
  }, [hasAccess, requiredLevel, redirectTo, router, showToast]);

  return {
    hasAccess,
    user,
    authLevel:
      isMitIDVerified
        ? AuthLevel.MITID_VERIFIED
        : isVerified
        ? AuthLevel.VERIFIED
        : AuthLevel.PUBLIC,
  };
}

/**
 * Helpers específicos
 */
export function useCanSell() {
  return useAuthGuard({ requiredLevel: AuthLevel.MITID_VERIFIED, redirectTo: '/auth/verify-mitid' });
}

export function useCanBuy() {
  return useAuthGuard({ requiredLevel: AuthLevel.MITID_VERIFIED, redirectTo: '/auth/verify-mitid' });
}

export function useCanSocial() {
  return useAuthGuard({ requiredLevel: AuthLevel.VERIFIED, redirectTo: '/auth/verify-email' });
}

/**
 * Componente HOC sin JSX (compatible con .ts)
 */
interface AuthGuardProps {
  children: React.ReactNode;
  requiredLevel: AuthLevel;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, requiredLevel, fallback }: AuthGuardProps) {
  const { hasAccess } = useAuthGuard({ requiredLevel, showToast: false });
  if (!hasAccess) return (fallback ?? null) as any;
  return children as any;
}
