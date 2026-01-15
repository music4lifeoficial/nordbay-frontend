"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";

export default function UpgradeAccount() {
  const { isMitIDVerified } = useAuthStore();
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isMitIDVerified()) {
      router.replace("/dashboard");
    }
  }, [isMitIDVerified, router]);

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      toast({ title: t?.mitid?.redirecting || "Redirecting to MitID..." });
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/mitid/verify`;
    } catch (error) {
      toast({ title: t?.mitid?.initError || "Error starting MitID. Try again or contact support.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  if (isMitIDVerified()) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nordic-50 to-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-nordic-600 to-nordic-700 rounded-2xl mb-6 shadow-lg">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-nordic-900 mb-2">
            {t?.mitid?.upgradeTitle || "Verify your identity with MitID"}
          </h1>
          <p className="text-nordic-600">
            {t?.mitid?.upgradeDescription || "To access all NordBay features, you must verify your identity with MitID."}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-nordic-200 p-6">
          <ul className="mb-6 text-nordic-700 text-sm list-disc pl-5">
            <li>{t?.mitid?.benefit1 || "Buy and sell products"}</li>
            <li>{t?.mitid?.benefit2 || "Post listings"}</li>
            <li>{t?.mitid?.benefit3 || "Full marketplace access"}</li>
          </ul>
          <button
            onClick={handleUpgrade}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-nordic-600 to-nordic-700 text-white py-3 px-4 rounded-lg font-medium hover:from-nordic-700 hover:to-nordic-800 focus:ring-2 focus:ring-nordic-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {t?.mitid?.startVerification || "Start MitID verification"}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
        <div className="text-center mt-8 text-xs text-nordic-500">
          <p>© 2025 NordBay. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
