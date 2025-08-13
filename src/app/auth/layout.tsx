// Este layout asegura que las páginas de autenticación NO tengan barra lateral ni navegación global.
"use client";

import { AuthLayout } from '@/components/auth/AuthLayout'

export default function AuthSectionLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>
}
