"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useToast } from "@/hooks/useToast";
import { Loader2, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";

export default function MitIDCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { completeMitIDVerification } = useAuthStore();
  const showToast = useToast();
  const t = useTranslation();
  const [status, setStatus] = useState<'pending'|'success'|'error'>("pending");

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      setStatus("error");
      showToast(t?.mitid?.invalidCode || "Invalid code", "error");
      return;
    }
    (async () => {
      try {
        await completeMitIDVerification(code);
        setStatus("success");
        showToast(t?.mitid?.success || "Verification successful!", "success");
        setTimeout(() => router.replace("/dashboard"), 2000);
      } catch {
        setStatus("error");
        showToast(t?.mitid?.error || "Verification error", "error");
      }
    })();
  }, [completeMitIDVerification, router, searchParams, t]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nordic-50 to-white px-4">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-nordic-600 to-nordic-700 rounded-2xl mb-6 shadow-lg mx-auto">
          <ShieldCheck className="text-white w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-nordic-900 mb-2">
          {t?.mitid?.verifying || "Verifying identity..."}
        </h1>
        {status === "pending" && (
          <div className="flex flex-col items-center gap-2 mt-6">
            <Loader2 className="w-6 h-6 animate-spin text-nordic-600" />
            <span className="text-nordic-600">{t?.mitid?.processing || "Processing MitID verification..."}</span>
          </div>
        )}
        {status === "success" && (
          <div className="text-green-600 font-medium mt-6">{t?.mitid?.successRedirect || "Verification successful! Redirecting..."}</div>
        )}
        {status === "error" && (
          <div className="text-red-600 font-medium mt-6">{t?.mitid?.error || "Error verifying your account."}</div>
        )}
      </div>
    </div>
  );
}
