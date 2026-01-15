"use client";
import Link from "next/link";
import { useTranslation } from "@/lib/useTranslation";

export default function MarketplaceHomeClient() {
  const t = useTranslation();
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-nordic-900 mb-2">{t?.marketplace?.searchTitle || 'Search the marketplace'}</h1>
      <p className="text-nordic-600 mb-6">{t?.marketplace?.searchDescription || 'Find products and sellers on NordBay.'}</p>
      <Link href="/marketplace/search" className="inline-block bg-nordic-600 text-white px-4 py-2 rounded-lg hover:bg-nordic-700">
        {t?.benefits?.cta || 'Explore the marketplace'}
      </Link>
    </main>
  );
}
