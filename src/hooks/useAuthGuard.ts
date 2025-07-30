"use client";
import React, { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

// Hook para proteger rutas según el nivel de cuenta
export function useAuthGuard(
  requiredLevel: "public" | "light_account" | "mitid_verified",
  redirectTo = "/auth/login"
) {
  const router = useRouter();
  const { isLoading, isAuthenticated, canAccess } = useAuthStore((state) => ({
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    canAccess: state.canAccess,
  }));

  useEffect(() => {
    if (!isLoading && typeof canAccess === "function" && !canAccess(requiredLevel)) {
      router.replace(redirectTo);
    }
  }, [isLoading, isAuthenticated, requiredLevel, canAccess, router, redirectTo]);

  return { isLoading, isAuthenticated };
}

// Componente para proteger secciones de UI
export type AuthGuardProps = {
  level: "public" | "light_account" | "mitid_verified";
  children: ReactNode;
  fallback?: ReactNode;
};

export function AuthGuard({ level, children, fallback = null }: AuthGuardProps) {
  const canAccess = useAuthStore((s) => s.canAccess);
  if (typeof canAccess !== "function" || !canAccess(level)) {
    return React.createElement("div", null, fallback);
  }
  return React.createElement("div", null, children);
}