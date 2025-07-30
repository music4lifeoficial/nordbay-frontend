
"use client";
import { RequireAuthLevel } from "@/components/auth/RequireAuthLevel";
import { useTranslation } from "@/lib/useTranslation";

export default function ProfilePage() {
  const t = useTranslation();
  return (
    <RequireAuthLevel level="light_account">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">{t.dashboard?.profileTitle ?? "Perfil"}</h1>
        <p className="text-nordic-700">{t.dashboard?.profileDescription ?? "Gestiona tu información personal y verifica tu cuenta."}</p>
      </div>
    </RequireAuthLevel>
  );
}
