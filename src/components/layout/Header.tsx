'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-nordic-200 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-nordic-600 to-nordic-700 rounded-lg">
                <span className="text-lg font-bold text-white">N</span>
              </div>
              <span className="text-xl font-bold text-nordic-900">NordBay</span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-nordic-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar productos..."
                className="block w-full pl-10 pr-3 py-2 border border-nordic-300 rounded-lg focus:ring-2 focus:ring-nordic-500 focus:border-nordic-500 bg-white"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard2"
                  className={`text-sm font-medium transition-colors hover:text-nordic-700 ${
                    isActive('/dashboard2') ? 'text-nordic-900' : 'text-nordic-600'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/create"
                  className={`text-sm font-medium transition-colors hover:text-nordic-700 ${
                    isActive('/create') ? 'text-nordic-900' : 'text-nordic-600'
                  }`}
                >
                  Vender
                </Link>
                <Link
                  href="/favorites"
                  className={`text-sm font-medium transition-colors hover:text-nordic-700 ${
                    isActive('/favorites') ? 'text-nordic-900' : 'text-nordic-600'
                  }`}
                >
                  Favoritos
                </Link>
                
                {/* User Menu */}
                <div className="flex items-center space-x-4">
                  <button className="relative p-2 text-nordic-600 hover:text-nordic-900 transition-colors">
                    <ShoppingBag className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-nordic-600 text-white text-xs rounded-full flex items-center justify-center">
                      0
                    </span>
                  </button>
                  
                  <div className="relative group">
                    <button className="flex items-center space-x-2 p-2 text-nordic-600 hover:text-nordic-900 transition-colors">
                      <User className="h-5 w-5" />
                      <span className="text-sm font-medium">{user?.nickname}</span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-nordic-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-nordic-700 hover:bg-nordic-50 transition-colors"
                      >
                        Mi perfil
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-nordic-700 hover:bg-nordic-50 transition-colors"
                      >
                        Configuración
                      </Link>
                      <hr className="my-1 border-nordic-200" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-nordic-700 hover:bg-nordic-50 transition-colors"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-nordic-600 hover:text-nordic-900 transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-nordic-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-nordic-700 transition-colors"
                >
                  Registrarse
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-nordic-600 hover:text-nordic-900 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-3 border-t border-nordic-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-nordic-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar productos..."
              className="block w-full pl-10 pr-3 py-2 border border-nordic-300 rounded-lg focus:ring-2 focus:ring-nordic-500 focus:border-nordic-500 bg-white"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-nordic-200 py-4">
            <nav className="space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard2"
                    className="block px-2 py-2 text-base font-medium text-nordic-700 hover:bg-nordic-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/create"
                    className="block px-2 py-2 text-base font-medium text-nordic-700 hover:bg-nordic-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Vender
                  </Link>
                  <Link
                    href="/favorites"
                    className="block px-2 py-2 text-base font-medium text-nordic-700 hover:bg-nordic-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Favoritos
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-2 py-2 text-base font-medium text-nordic-700 hover:bg-nordic-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mi perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-2 py-2 text-base font-medium text-nordic-700 hover:bg-nordic-50 rounded-lg transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block px-2 py-2 text-base font-medium text-nordic-700 hover:bg-nordic-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block px-2 py-2 text-base font-medium bg-nordic-600 text-white rounded-lg hover:bg-nordic-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
