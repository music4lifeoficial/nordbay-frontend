import { useEffect, useState } from "react";

// Hook para saber si el render es del lado del cliente
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
}
