"use client";
import Link from "next/link";
import { useAuthStore } from "@/lib/stores/auth-store";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";

export default function UpgradeSuggestion({ className = "" }: { className?: string }) {
  const { isVerified, isMitIDVerified } = useAuthStore();
  const t = useTranslation();
  // Show suggestion only for verified email users who are not MitID verified
  if (!isVerified() || isMitIDVerified()) return null;
  return (
    <div className={`bg-yellow-50 border-l-4 border-yellow-400 p-4 flex items-center gap-3 rounded-md shadow-sm ${className}`}>
      <AlertTriangle className="text-yellow-500 w-5 h-5" />
      <div className="flex-1">
        <div className="font-medium text-yellow-800">{t?.mitid?.limitedAccess || "Limited access!"}</div>
        <div className="text-yellow-700 text-sm">{t?.mitid?.suggestion || "Verify your identity with MitID to access all NordBay features."}</div>
      </div>
      <Link href="/auth/upgrade" className="ml-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold px-3 py-2 rounded flex items-center gap-1 transition-colors">
        {t?.mitid?.upgradeCta || "Upgrade account"} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
