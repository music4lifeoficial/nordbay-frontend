import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NordBay - Nordic Marketplace for Conscious Consumers",
  description: "The Danish marketplace for authentic, quality products. Buy and sell with confidence in our trusted Nordic community.",
  keywords: ["marketplace", "Denmark", "Nordic", "sustainable", "quality", "authentic"],
  authors: [{ name: "NordBay Team" }],
  creator: "NordBay",
  publisher: "NordBay",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://nordbay.dk'),
  openGraph: {
    title: "NordBay - Nordic Marketplace",
    description: "The Danish marketplace for authentic, quality products",
    url: "https://nordbay.dk",
    siteName: "NordBay",
    locale: "en_DK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NordBay - Nordic Marketplace",
    description: "The Danish marketplace for authentic, quality products",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-nordic-50 font-sans antialiased">
        <Providers>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'white',
                color: 'var(--color-nordic-900)',
                border: '1px solid var(--color-nordic-200)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
