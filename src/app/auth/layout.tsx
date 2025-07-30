// Este layout asegura que las páginas de autenticación NO tengan barra lateral ni navegación global.
"use client";

import Header from "@/components/layout/Header";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body className="min-h-screen bg-background font-sans antialiased">
        <Header />
        <main className="flex flex-col items-center justify-center min-h-[80vh] w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
