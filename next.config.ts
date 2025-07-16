import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ VERCEL DEPLOYMENT OPTIMIZATIONS  
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // ✅ MOVED FROM EXPERIMENTAL
  serverExternalPackages: ['@tanstack/react-query'],
  
  // ✅ TYPESCRIPT & BUILD OPTIMIZATION
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // ✅ IMAGE OPTIMIZATION (Vercel + Cloudinary)
  images: {
    domains: [
      'res.cloudinary.com', 
      'images.unsplash.com',
      'nordbay-production.up.railway.app' // Railway backend images
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // ✅ PERFORMANCE OPTIMIZATIONS
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // ✅ WEBPACK OPTIMIZATION
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.devtool = 'eval-source-map'
    }
    
    // Bundle analyzer only in development
    if (process.env.ANALYZE === 'true') {
      const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: true,
      })
      return withBundleAnalyzer(config)
    }
    
    return config
  },
  
  // ✅ SECURITY HEADERS FOR VERCEL
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ],
      },
    ]
  },

  // ✅ REWRITES FOR RAILWAY BACKEND API
  async rewrites() {
    return [
      {
        source: '/api/railway/:path*',
        destination: 'https://nordbay-production.up.railway.app/api/:path*',
      },
    ]
  },

  // ✅ ENVIRONMENT VARIABLES
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  },

  // ✅ OUTPUT FOR VERCEL
  output: 'standalone',
  
  // ✅ TRAILING SLASH CONSISTENCY
  trailingSlash: false,
  
  // ✅ POWERED BY HEADER
  poweredByHeader: false,
};

export default nextConfig;
