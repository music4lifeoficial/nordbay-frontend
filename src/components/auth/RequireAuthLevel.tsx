"use client";
import React from "react";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/useTranslation";

interface RequireAuthLevelProps {
  level: "public" | "light_account" | "mitid_verified";
  children: React.ReactNode;
}

export const RequireAuthLevel: React.FC<RequireAuthLevelProps> = ({ level, children }) => {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const router = useRouter();
  const t = useTranslation();

  const canAccess = (lvl: "public" | "light_account" | "mitid_verified") => {
    if (lvl === "public") return true;
    if (!user) return false;
    if (lvl === "light_account") return !!user.verified;
    if (lvl === "mitid_verified") return !!user.mitid_verified;
    return false;
  };

  if (isLoading) {
    return <div className="w-full flex justify-center items-center py-12 text-nordic-600">{(t as any).authGuard?.loading ?? "Cargando..."}</div>;
  }

  if (level === "public") return <>{children}</>;

  if (!isAuthenticated) {
    if (typeof window !== "undefined") router.push("/auth/login");
    return <div className="w-full flex justify-center items-center py-12 text-nordic-600">{(t as any).authGuard?.redirecting ?? "Redirigiendo a login..."}</div>;
  }

  if (!canAccess(level)) {
    let msg = '';
    let cta: React.ReactNode = null;
    if (level === 'light_account') {
      msg = (t as any).authGuard?.verifyEmail ?? 'Verifica tu email para acceder a esta función.';
      cta = <a href="/profile" className="underline text-brand">{(t as any).authGuard?.goToProfile ?? "Ir a perfil"}</a>;
    } else if (level === 'mitid_verified') {
      msg = (t as any).authGuard?.verifyMitID ?? 'Verifica tu identidad con MitID para acceder a esta función.';
      cta = <a href="/profile" className="underline text-brand">{(t as any).authGuard?.verifyWithMitID ?? "Verificar con MitID"}</a>;
    }
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 text-nordic-600">
        <span className="mb-2">{msg}</span>
        {cta}
      </div>
    );
  }

  return <>{children}</>;
};
