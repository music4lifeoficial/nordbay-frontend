
"use client";
import { RequireAuthLevel } from "@/components/auth/RequireAuthLevel";
import { useTranslation } from "@/lib/useTranslation";

export default function FavoritesPage() {
  const t = useTranslation();
  return (
    <RequireAuthLevel level="light_account">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">{t.dashboard?.favoritesTitle ?? "Favoritos"}</h1>
        <p className="text-nordic-700">{t.dashboard?.favoritesDescription ?? "Aquí verás tus productos favoritos guardados."}</p>
      </div>
    </RequireAuthLevel>
  );
}
