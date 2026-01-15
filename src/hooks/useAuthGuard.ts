"use client";
import React, { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

// Hook para proteger rutas según flags del backend
export function useAuthGuard(
  requiredLevel: "public" | "light_account" | "mitid_verified",
  redirectTo = "/auth/login"
) {
  const router = useRouter();
  const { isLoading, isAuthenticated, user } = useAuthStore((state) => ({
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  }));

  const canAccess = (level: "public" | "light_account" | "mitid_verified") => {
    if (level === "public") return true;
    if (!user) return false;
    if (level === "light_account") return !!user.verified; // email verified
    if (level === "mitid_verified") return !!user.mitid_verified;
    return false;
  };

  useEffect(() => {
    if (!isLoading && !canAccess(requiredLevel)) {
      router.replace(redirectTo);
    }
  }, [isLoading, isAuthenticated, requiredLevel, router, redirectTo]);

  return { isLoading, isAuthenticated };
}

// Componente para proteger secciones de UI
export type AuthGuardProps = {
  level: "public" | "light_account" | "mitid_verified";
  children: ReactNode;
  fallback?: ReactNode;
};

export function AuthGuard({ level, children, fallback = null }: AuthGuardProps) {
  const { user } = useAuthStore();
  const canAccess = (lvl: "public" | "light_account" | "mitid_verified") => {
    if (lvl === "public") return true;
    if (!user) return false;
    if (lvl === "light_account") return !!user.verified;
    if (lvl === "mitid_verified") return !!user.mitid_verified;
    return false;
  };
  if (!canAccess(level)) {
    return React.createElement("div", null, fallback);
  }
  return React.createElement("div", null, children);
}