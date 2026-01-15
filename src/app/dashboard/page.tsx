
"use client";
import { RequireAuthLevel } from "@/components/auth/RequireAuthLevel";
import { useTranslation } from "@/lib/useTranslation";

export default function DashboardPage() {
  const t = useTranslation();
  return (
    <RequireAuthLevel level="light_account">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">{t.dashboard?.title ?? "Dashboard"}</h1>
        <p className="text-nordic-700">{t.dashboard?.description ?? "Gestiona tus productos, favoritos y perfil desde un solo lugar."}</p>
      </div>
    </RequireAuthLevel>
  );
}
