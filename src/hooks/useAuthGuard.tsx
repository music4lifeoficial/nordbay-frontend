// Guard para proteger rutas según nivel de autenticación
"use client";
// Uso: <AuthGuard level="light_account">contenido</AuthGuard>

import { useUser } from '@/lib/stores/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
  level?: 'public' | 'light_account' | 'mitid_verified';
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function AuthGuard({ level = 'public', fallback = null, children }: AuthGuardProps) {
  const user = useUser();
  const router = useRouter();

  // Niveles en orden de menor a mayor
  const levels = ['public', 'light_account', 'mitid_verified'];
  const userLevel = user?.account_level || 'public';
  const canAccess = levels.indexOf(userLevel) >= levels.indexOf(level);

  useEffect(() => {
    if (!canAccess && level !== 'public') {
      router.replace('/login');
    }
  }, [canAccess, level, router]);

  if (!canAccess && level !== 'public') {
    return fallback;
  }

  return <>{children}</>;
}
