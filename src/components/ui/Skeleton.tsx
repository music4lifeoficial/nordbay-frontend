import React from "react";
import { cn } from "@/lib/utils";

/**
 * Skeleton: bloque animado para loading states, adaptable a cualquier tamaño.
 * Inspirado en la filosofía nórdica y la usabilidad de Mercado Libre.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-nordic-200/70 animate-pulse rounded-md",
        className
      )}
    />
  );
}

// Ejemplo de uso:
// <Skeleton className="h-6 w-32 mb-2" />
// <Skeleton className="h-48 w-full rounded-xl" />
