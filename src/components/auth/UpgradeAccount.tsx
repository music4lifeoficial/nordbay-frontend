"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useToast } from "@/hooks/useToast";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function UpgradeAccount() {
  const { isMitIDVerified, initiateMitIDVerification } = useAuthStore();
  const showToast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Mejor práctica: redirigir en useEffect para evitar side effects en render
  useEffect(() => {
    if (isMitIDVerified()) {
      router.replace("/dashboard");
    }
  }, [isMitIDVerified, router]);

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const url = await initiateMitIDVerification();
      showToast("Redirigiendo a MitID... Completa la verificación en la plataforma oficial.", "success");
      window.location.href = url;
    } catch (error) {
      showToast("Error al iniciar MitID. Intenta nuevamente o contacta soporte.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Mientras verifica si está autenticado, evitar doble render del contenido
  if (isMitIDVerified()) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nordic-50 to-white px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-nordic-600 to-nordic-700 rounded-2xl mb-6 shadow-lg">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-nordic-900 mb-2">
            Verifica tu identidad con MitID
          </h1>
          <p className="text-nordic-600">
            Para acceder a todas las funciones de NordBay, debes verificar tu identidad con MitID.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-nordic-200 p-6">
          <ul className="mb-6 text-nordic-700 text-sm list-disc pl-5">
            <li>Comprar y vender productos</li>
            <li>Publicar anuncios</li>
            <li>Acceso completo al marketplace</li>
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
                Iniciar verificación MitID
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
        <div className="text-center mt-8 text-xs text-nordic-500">
          <p>© 2025 NordBay. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
