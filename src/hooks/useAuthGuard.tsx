// Guard para proteger rutas según nivel de autenticación
"use client";
// Uso: <AuthGuard level="light_account">contenido</AuthGuard>

import { useAuthStore } from '@/lib/stores/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';

interface AuthGuardProps {
  level?: 'public' | 'light_account' | 'mitid_verified';
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function AuthGuard({ level = 'public', fallback = null, children }: AuthGuardProps) {
  const { user } = useAuthStore();
  const router = useRouter();

  const canLevel = useCallback((lvl: 'public' | 'light_account' | 'mitid_verified') => {
    if (lvl === 'public') return true;
    if (!user) return false;
    if (lvl === 'light_account') return !!user.verified;
    if (lvl === 'mitid_verified') return !!user.mitid_verified;
    return false;
  }, [user]);

  useEffect(() => {
    if (!canLevel(level) && level !== 'public') {
      router.replace('/auth/login');
    }
  }, [level, router, canLevel]);

  if (!canLevel(level) && level !== 'public') {
    return fallback;
  }

  return <>{children}</>;
}
