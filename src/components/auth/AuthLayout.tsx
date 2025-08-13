'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-nordic-50 via-white to-brand-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="absolute top-6 left-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-nordic-600 hover:text-nordic-900">
            <ArrowLeft className="w-4 h-4" />
            Tilbage til NordBay
          </Button>
        </Link>
      </div>

      {/* Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <Link href="/" className="flex justify-center items-center space-x-3 text-2xl font-bold text-nordic-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg">
            NB
          </div>
          <span className="text-3xl">NordBay</span>
        </Link>
      </div>

      {/* Content */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-xl rounded-2xl border border-nordic-100">
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-nordic-500">
          Ved at fortsætte accepterer du vores{' '}
          <Link href="/terms" className="text-brand-600 hover:text-brand-700 font-medium">
            Servicevilkår
          </Link>{' '}
          og{' '}
          <Link href="/privacy" className="text-brand-600 hover:text-brand-700 font-medium">
            Privatlivspolitik
          </Link>
        </p>
      </div>
    </div>
  )
}
