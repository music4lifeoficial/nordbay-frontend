"use client";
import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useTranslation } from "@/lib/useTranslation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const { locale, setLocale } = useLocale();
  const t = useTranslation();

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as 'da' | 'en');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-nordic-200 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-nordic-900">NordBay</span>
          </Link>
          <div className="flex items-center space-x-2">
            <label htmlFor="locale-select" className="text-sm text-nordic-700 font-medium">Sprog / Language:</label>
            <select id="locale-select" value={locale} onChange={handleLocaleChange} className="border rounded px-2 py-1 text-sm">
              <option value="da">Dansk</option>
              <option value="en">English</option>
            </select>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <Link href="/auth/login" className="text-sm font-medium text-nordic-600 hover:text-nordic-900 transition-colors">{t.header.login}</Link>
                <Link href="/auth/register" className="bg-nordic-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-nordic-700 transition-colors">{t.header.register}</Link>
              </>
            ) : (
              <>
                <Link href="/dashboard2page" className="text-sm font-medium">{t.header.dashboard}</Link>
                <Link href="/favorites" className="text-sm font-medium">{t.header.favorites}</Link>
                <Link href="/profile" className="text-sm font-medium">{t.header.profile}</Link>
                <button onClick={logout} className="text-sm font-medium">{t.header.logout}</button>
              </>
            )}
          </nav>
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col space-y-2 mt-2">
            {!isAuthenticated ? (
              <>
                <Link href="/auth/login" className="text-base font-medium" onClick={() => setIsMenuOpen(false)}>{t.header.login}</Link>
                <Link href="/auth/register" className="text-base font-medium" onClick={() => setIsMenuOpen(false)}>{t.header.register}</Link>
              </>
            ) : (
              <>
                <Link href="/dashboard2page" className="text-base font-medium" onClick={() => setIsMenuOpen(false)}>{t.header.dashboard}</Link>
                <Link href="/favorites" className="text-base font-medium" onClick={() => setIsMenuOpen(false)}>{t.header.favorites}</Link>
                <Link href="/profile" className="text-base font-medium" onClick={() => setIsMenuOpen(false)}>{t.header.profile}</Link>
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-base font-medium">{t.header.logout}</button>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}