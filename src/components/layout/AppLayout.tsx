'use client'

import { Header } from './Header'
import { MobileNav } from './MobileNav'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-nordic-50">
      <Header />
      
      {/* Main Content */}
      <main className="pt-0 pb-20 md:pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
}
