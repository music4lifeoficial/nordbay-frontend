"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useToast } from "@/hooks/useToast";
import { Loader2, ShieldCheck } from "lucide-react";

export default function MitIDCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { completeMitIDVerification } = useAuthStore();
  const showToast = useToast();
  const [status, setStatus] = useState<'pending'|'success'|'error'>("pending");

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      setStatus("error");
      showToast("Código inválido", "error");
      return;
    }
    (async () => {
      try {
        await completeMitIDVerification(code);
        setStatus("success");
        showToast("¡Verificación exitosa!", "success");
        setTimeout(() => router.replace("/dashboard2page"), 2000);
      } catch {
        setStatus("error");
        showToast("Error de verificación", "error");
      }
    })();
  }, [completeMitIDVerification, router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nordic-50 to-white px-4">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-nordic-600 to-nordic-700 rounded-2xl mb-6 shadow-lg mx-auto">
          <ShieldCheck className="text-white w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-nordic-900 mb-2">
          Verificando identidad...
        </h1>
        {status === "pending" && (
          <div className="flex flex-col items-center gap-2 mt-6">
            <Loader2 className="w-6 h-6 animate-spin text-nordic-600" />
            <span className="text-nordic-600">Procesando verificación de MitID...</span>
          </div>
        )}
        {status === "success" && (
          <div className="text-green-600 font-medium mt-6">¡Verificación exitosa! Redirigiendo...</div>
        )}
        {status === "error" && (
          <div className="text-red-600 font-medium mt-6">Error al verificar tu cuenta.</div>
        )}
      </div>
    </div>
  );
}
