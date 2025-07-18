// Este layout asegura que las páginas de autenticación NO tengan barra lateral ni navegación global.
"use client";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
