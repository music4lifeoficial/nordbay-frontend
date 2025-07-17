import { useCallback } from "react";
import { toast } from "react-hot-toast";

// Hook para mostrar toasts personalizados
export function useToast() {
  return useCallback((message: string, type: "success" | "error" = "success") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }, []);
}
