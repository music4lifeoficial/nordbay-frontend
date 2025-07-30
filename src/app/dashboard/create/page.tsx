"use client";
import { RequireAuthLevel } from "@/components/auth/RequireAuthLevel";
import { useTranslation } from "@/lib/useTranslation";

export default function CreatePage() {
  const t = useTranslation();
  return (
    <RequireAuthLevel level="mitid_verified">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">{t.dashboard?.createTitle ?? "Crear publicación"}</h1>
        <p className="text-nordic-700">{t.dashboard?.createDescription ?? "Publica un nuevo producto para vender en NordBay."}</p>
      </div>
    </RequireAuthLevel>
  );
}
