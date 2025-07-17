"use client";
import Link from "next/link";
import { useAuthStore } from "@/lib/stores/auth-store";
import { AlertTriangle, ArrowRight } from "lucide-react";

export default function UpgradeSuggestion({ className = "" }: { className?: string }) {
  const { isLightAccount, isMitIDVerified } = useAuthStore();
  if (!isLightAccount() || isMitIDVerified()) return null;
  return (
    <div className={`bg-yellow-50 border-l-4 border-yellow-400 p-4 flex items-center gap-3 rounded-md shadow-sm ${className}`}>
      <AlertTriangle className="text-yellow-500 w-5 h-5" />
      <div className="flex-1">
        <div className="font-medium text-yellow-800">¡Acceso limitado!</div>
        <div className="text-yellow-700 text-sm">Verifica tu identidad con MitID para acceder a todas las funciones de NordBay.</div>
      </div>
      <Link href="/auth/upgrade" className="ml-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold px-3 py-2 rounded flex items-center gap-1 transition-colors">
        Mejorar cuenta <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
