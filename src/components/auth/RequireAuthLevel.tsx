"use client";
import React from "react";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/useTranslation";

interface RequireAuthLevelProps {
  level: "public" | "light_account" | "mitid_verified" | "admin";
  children: React.ReactNode;
}


export const RequireAuthLevel: React.FC<RequireAuthLevelProps> = ({ level, children }) => {
  const { isAuthenticated, isLoading, canAccess, isAdmin } = useAuthStore();
  const router = useRouter();
  const t = useTranslation();

  if (isLoading) {
    return <div className="w-full flex justify-center items-center py-12 text-nordic-600">{t.authGuard?.loading ?? "Cargando..."}</div>;
  }

  // Nivel público: siempre permite
  if (level === "public") return <>{children}</>;

  // Si no autenticado, redirige a login
  if (!isAuthenticated) {
    if (typeof window !== "undefined") router.push("/auth/login");
    return <div className="w-full flex justify-center items-center py-12 text-nordic-600">{t.authGuard?.redirecting ?? "Redirigiendo a login..."}</div>;
  }

  // Si requiere admin
  if (level === "admin" && !isAdmin()) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 text-nordic-600">
        <span className="mb-2">{t.authGuard?.adminOnly ?? "Acceso solo para administradores."}</span>
      </div>
    );
  }

  // Si no tiene el nivel requerido
  if (level !== "admin" && !canAccess(level)) {
    let msg = "";
    let cta = null;
    if (level === "light_account") {
      msg = t.authGuard?.verifyEmail ?? "Verifica tu email para acceder a esta función.";
      cta = <a href="/profile" className="underline text-brand">{t.authGuard?.goToProfile ?? "Ir a perfil"}</a>;
    } else if (level === "mitid_verified") {
      msg = t.authGuard?.verifyMitID ?? "Verifica tu identidad con MitID para acceder a esta función.";
      cta = <a href="/profile" className="underline text-brand">{t.authGuard?.verifyWithMitID ?? "Verificar con MitID"}</a>;
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
