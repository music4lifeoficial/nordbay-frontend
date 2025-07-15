'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-nordic-50 to-brand-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to NordBay
          </Button>
        </Link>
      </div>

      {/* Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center items-center space-x-2 text-2xl font-bold text-nordic-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white">
            NB
          </div>
          <span>NordBay</span>
        </Link>
      </div>

      {/* Content */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 border border-nordic-200">
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-nordic-600">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="text-brand-600 hover:text-brand-500">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-brand-600 hover:text-brand-500">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
