'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Bell, User, Menu, ShoppingBag, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/lib/stores/auth-store'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const { user, isAuthenticated, logout } = useAuthStore()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // TODO: Implementar navegación a search
      console.log('Search:', searchQuery)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-nordic-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-xl font-bold text-nordic-900"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white">
            NB
          </div>
          <span className="hidden sm:block">NordBay</span>
        </Link>

        {/* Search Bar - Desktop */}
        <form 
          onSubmit={handleSearch} 
          className="hidden md:flex flex-1 max-w-lg mx-8"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-nordic-400" />
            <Input
              type="search"
              placeholder="Search for anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 border-nordic-200 focus:border-brand-500 focus:ring-brand-500/20"
            />
          </div>
        </form>

        {/* Navigation Actions */}
        <div className="flex items-center space-x-4">
          {/* Mobile Search Toggle */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* Favorites */}
              <Button variant="ghost" size="sm">
                <Heart className="h-5 w-5" />
              </Button>

              {/* My Products */}
              <Button variant="ghost" size="sm">
                <ShoppingBag className="h-5 w-5" />
              </Button>

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-nordic-200 flex items-center justify-center">
                    {user?.name?.charAt(0) || user?.nickname?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden sm:block">{user?.nickname}</span>
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-brand-500 hover:bg-brand-600">
                  Sign up
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="border-t border-nordic-200 px-4 py-3 md:hidden">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-nordic-400" />
            <Input
              type="search"
              placeholder="Search for anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4"
            />
          </div>
        </form>
      </div>
    </header>
  )
}
