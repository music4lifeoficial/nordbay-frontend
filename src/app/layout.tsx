import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import AppLayout from "@/components/layout/AppLayout";
import { LocaleProvider } from "../context/LocaleContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NordBay - Nordic Marketplace for Conscious Consumers",
    template: "%s | NordBay"
  },
  description: "The Danish marketplace for authentic, quality products. Buy and sell with confidence in our trusted Nordic community.",
  keywords: [
    "marketplace", 
    "Denmark", 
    "Nordic", 
    "sustainable", 
    "quality", 
    "authentic",
    "danish design",
    "conscious consumers"
  ],
  authors: [{ name: "NordBay Team" }],
  creator: "NordBay",
  publisher: "NordBay",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://nordbay.vercel.app'),
  openGraph: {
    title: "NordBay - Nordic Marketplace",
    description: "The Danish marketplace for authentic, quality products. Buy and sell with confidence in our trusted Nordic community.",
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://nordbay.vercel.app',
    siteName: "NordBay",
    locale: "da_DK",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NordBay - Nordic Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NordBay - Nordic Marketplace",
    description: "The Danish marketplace for authentic, quality products.",
    images: ["/og-image.jpg"],
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
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <LocaleProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </LocaleProvider>
        <Toaster />
      </body>
    </html>
  );
}
