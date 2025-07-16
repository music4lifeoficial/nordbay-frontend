'use client'

import { AppLayout } from '@/components/layout/AppLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ShoppingBag, Users, Shield, Heart, Search, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-nordic-50 py-16 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-nordic-900 sm:text-6xl">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-brand-500 to-brand-600 bg-clip-text text-transparent">
                NordBay
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-nordic-600">
              The Nordic marketplace for conscious consumers. Buy and sell quality products 
              with trust, transparency, and authentic community connections.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="bg-brand-500 hover:bg-brand-600">
                Start Exploring
              </Button>
              <Button variant="outline" size="lg">
                Sell Something
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-nordic-900">
              Why Choose NordBay?
            </h2>
            <p className="mt-4 text-lg text-nordic-600">
              Built with Nordic values of simplicity, quality, and trust
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ShoppingBag,
                title: 'Quality Products',
                description: 'Curated marketplace for authentic, high-quality items from verified sellers.'
              },
              {
                icon: Users,
                title: 'Trusted Community',
                description: 'Connect with verified buyers and sellers in a safe, moderated environment.'
              },
              {
                icon: Shield,
                title: 'Secure Payments',
                description: 'Protected transactions with escrow system and buyer/seller guarantees.'
              },
              {
                icon: Heart,
                title: 'Conscious Commerce',
                description: 'Promote sustainable consumption through quality second-hand and new items.'
              },
              {
                icon: Search,
                title: 'Smart Discovery',
                description: 'AI-powered recommendations and advanced search to find exactly what you need.'
              },
              {
                icon: TrendingUp,
                title: 'Fair Pricing',
                description: 'Transparent commission structure and pricing that benefits both parties.'
              }
            ].map((feature) => (
              <Card key={feature.title} className="p-6 text-center border-nordic-200 hover:shadow-md transition-shadow">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50">
                  <feature.icon className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-nordic-900">{feature.title}</h3>
                <p className="mt-2 text-nordic-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-nordic-900">
              Ready to start your Nordic marketplace journey?
            </h2>
              <p className="mt-4 text-lg text-nordic-600">
                Join thousands of users buying and selling on Denmark&apos;s most trusted platform
              </p>
            <div className="mt-8 flex items-center justify-center gap-x-4">
              <Button size="lg" className="bg-brand-500 hover:bg-brand-600">
                Browse Products
              </Button>
              <Button variant="outline" size="lg">
                List Your First Item
              </Button>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}
