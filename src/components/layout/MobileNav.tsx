'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, PlusCircle, Heart, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/lib/stores/auth-store'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/search', icon: Search, label: 'Search' },
  { href: '/create', icon: PlusCircle, label: 'Sell', requiresAuth: true },
  { href: '/favorites', icon: Heart, label: 'Favorites', requiresAuth: true },
  { href: '/profile', icon: User, label: 'Profile', requiresAuth: true },
]

export function MobileNav() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuthStore()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-nordic-200 bg-white/90 backdrop-blur-lg md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map(({ href, icon: Icon, label, requiresAuth }) => {
          const isActive = pathname === href
          
          // Don't show auth-required items if not authenticated
          if (requiresAuth && !isAuthenticated) {
            return (
              <Link
                key={href}
                href="/login"
                className="flex flex-col items-center justify-center text-xs text-nordic-400 hover:text-nordic-600 transition-colors"
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="truncate">{label}</span>
              </Link>
            )
          }
          
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center text-xs transition-colors',
                isActive 
                  ? 'text-brand-600' 
                  : 'text-nordic-400 hover:text-nordic-600'
              )}
            >
              <Icon className={cn('h-5 w-5 mb-1', isActive && 'fill-current')} />
              <span className="truncate">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
