'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Filter } from 'lucide-react'
import { productsAPI, type Product, type SearchFilters } from '@/lib/api/products'
import { cn } from '@/lib/utils'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({})

  useEffect(() => {
    loadProducts()
  }, [filters])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await productsAPI.search(filters)
      setProducts(response.items)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters({ ...filters, query: searchQuery })
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('da-DK', {
      style: 'currency',
      currency: 'DKK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getConditionLabel = (condition: string): string => {
    const labels = {
      'new': 'Ny',
      'like_new': 'Som ny',
      'good': 'God',
      'fair': 'Acceptabel'
    }
    return labels[condition as keyof typeof labels] || condition
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Produkter</h1>
            <p className="text-muted-foreground">
              Udforsk tusindvis af produkter fra danske sælgere
            </p>
          </div>
          
          <Link href="/products/create">
            <Button size="lg" className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Opret annonce
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <Input
              placeholder="Søg efter produkter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </form>
          
          <Button variant="outline" className="md:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filtre
          </Button>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-square bg-muted rounded-t-lg"></div>
                <CardContent className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-6 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4 text-6xl">📦</div>
            <h3 className="text-xl font-semibold mb-2">Ingen produkter fundet</h3>
            <p className="text-muted-foreground mb-6">
              Prøv at ændre dine søgekriterier eller opret det første produkt.
            </p>
            <Link href="/products/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Opret dit første produkt
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-square relative overflow-hidden rounded-t-lg bg-muted">
                  {product.primary_image || product.images[0] ? (
                    <img
                      src={product.primary_image || product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-muted-foreground">
                      📷
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 left-2">
                    <Badge 
                      variant={product.status === 'active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {product.status === 'active' ? 'Aktiv' : 
                       product.status === 'sold' ? 'Solgt' : 
                       product.status}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {getConditionLabel(product.condition)}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      📍 {product.location_city}, {product.location_region}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>👀 {product.views_count}</span>
                      <span>❤️ {product.favorites_count}</span>
                    </div>
                    
                    {/* Seller Info */}
                    <div className="flex items-center gap-2 pt-2 border-t">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                        {product.seller.avatar ? (
                          <img 
                            src={product.seller.avatar} 
                            alt={product.seller.username}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          product.seller.username.charAt(0).toUpperCase()
                        )}
                      </div>
                      <span className="text-sm">{product.seller.username}</span>
                      {product.seller.rating && (
                        <span className="text-xs text-muted-foreground">
                          ⭐ {product.seller.rating.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
