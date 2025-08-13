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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-nordic-900">
            Why Choose NordBay?
          </h2>
          <p className="mt-4 text-lg text-nordic-600">
            Built with Nordic values of simplicity, quality, and trust
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center border-nordic-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-6 h-6 text-brand-600" />
            </div>
            <h3 className="text-lg font-semibold text-nordic-900 mb-2">Quality Products</h3>
            <p className="text-nordic-600">Curated marketplace for authentic, high-quality items from trusted sellers.</p>
          </Card>

          <Card className="p-6 text-center border-nordic-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-brand-600" />
            </div>
            <h3 className="text-lg font-semibold text-nordic-900 mb-2">Trusted Community</h3>
            <p className="text-nordic-600">Connect with verified sellers and buyers in a safe, regulated environment.</p>
          </Card>

          <Card className="p-6 text-center border-nordic-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-brand-600" />
            </div>
            <h3 className="text-lg font-semibold text-nordic-900 mb-2">Secure Payments</h3>
            <p className="text-nordic-600">Protected transactions with escrow service and payment guarantees.</p>
          </Card>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-nordic-900">
              Popular Categories
            </h2>
            <p className="mt-4 text-lg text-nordic-600">
              Discover what everyone is talking about
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Electronics', icon: '📱', count: '2.1k items' },
              { name: 'Fashion', icon: '👗', count: '3.5k items' },
              { name: 'Home & Garden', icon: '🏠', count: '1.8k items' },
              { name: 'Sports', icon: '⚽', count: '967 items' },
            ].map((category) => (
              <Card 
                key={category.name}
                className="p-6 text-center border-nordic-200 hover:shadow-lg transition-all cursor-pointer hover:border-brand-200"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-nordic-900 mb-1">{category.name}</h3>
                <p className="text-sm text-nordic-600">{category.count}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-nordic-900 mb-4">
            Ready to Start?
          </h2>
          <p className="text-lg text-nordic-600 mb-8">
            Join thousands of satisfied users in the Nordic marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-brand-500 hover:bg-brand-600">
              <Search className="w-4 h-4 mr-2" />
              Browse Products
            </Button>
            <Button variant="outline" size="lg">
              <TrendingUp className="w-4 h-4 mr-2" />
              Start Selling
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-nordic-200 bg-white py-8 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-nordic-600">
            <p>&copy; 2025 NordBay. Made with ❤️ in Denmark.</p>
          </div>
        </div>
      </footer>
    </AppLayout>
  )
}
