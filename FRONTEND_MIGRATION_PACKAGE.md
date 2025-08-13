# 🚀 NORDBAY FRONTEND - MIGRATION PACKAGE
**Fecha:** 15 Julio 2025  
**Objetivo:** Crear frontend Next.js 15 en repo nuevo para deployment en Vercel

## 🎯 ARQUITECTURA OBJETIVO
- **Backend:** Railway (https://nordbay-production.up.railway.app/api)
- **Frontend:** Vercel (nuevo repo + deployment)
- **Stack:** Next.js 15 + React 19 + TypeScript + Tailwind CSS 4

## 📦 BACKEND INFO COMPLETA

### API Base URL
```
Production: https://nordbay-production.up.railway.app/api
Headers: Content-Type: application/json, Authorization: Bearer {token}
```

### Endpoints Principales
```
POST /auth/register - Registro usuario
POST /auth/login - Login usuario  
GET /auth/profile - Perfil usuario

GET /products - Listar productos
POST /products - Crear producto
GET /products/:id - Detalle producto
PUT /products/:id - Actualizar producto
DELETE /products/:id - Eliminar producto

POST /payments/create-payment-intent - Stripe payment
GET /shipping/rates - Calcular envío
POST /orders - Crear orden
```

### Schema de Datos
```typescript
// Usuario
interface User {
  id: string
  email: string
  name: string
  role: 'buyer' | 'seller' | 'admin'
  profile?: {
    phone?: string
    address?: string
    bio?: string
  }
}

// Producto
interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  images: string[]
  sellerId: string
  status: 'active' | 'sold' | 'inactive'
  shipping: {
    weight: number
    dimensions: { length: number, width: number, height: number }
    methods: string[]
  }
}

// Orden
interface Order {
  id: string
  buyerId: string
  sellerId: string
  productId: string
  amount: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  shipping: ShippingInfo
  payment: PaymentInfo
}
```

## 🎨 DISEÑO Y UX

### Páginas Principales
1. **Landing Page** - Hero section + productos destacados
2. **Auth Pages** - Login/Register con diseño danés minimalista
3. **Marketplace** - Grid de productos con filtros avanzados
4. **Product Detail** - Galería, info, compra directa
5. **Create Product** - Wizard multi-step
6. **Dashboard** - Perfil, órdenes, productos vendidos
7. **Search** - Búsqueda avanzada con filtros

### Estilo Danés 2025
- **Colores:** Whites, soft grays, navy blue accents
- **Typography:** Clean sans-serif (Inter/Geist)
- **Layout:** Generous whitespace, minimal shadows
- **Components:** Subtle animations, focus on usability

## ⚙️ TECH STACK EXACTO

### Dependencies Required
```json
{
  "dependencies": {
    "next": "15.4.1",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "typescript": "^5",
    "@tanstack/react-query": "^5.83.0",
    "axios": "^1.10.0",
    "zustand": "^5.0.6",
    "react-hook-form": "^7.60.0",
    "@hookform/resolvers": "^5.1.1",
    "zod": "^4.0.5",
    "tailwindcss": "^4",
    "framer-motion": "^12.23.6",
    "lucide-react": "^0.525.0",
    "@radix-ui/react-*": "latest",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1",
    "sonner": "^2.0.6",
    "@stripe/stripe-js": "^7.4.0"
  }
}
```

### File Structure
```
src/
├── app/                     # Next.js 15 App Router
│   ├── (auth)/             # Auth pages group
│   ├── (dashboard)/        # Protected dashboard
│   ├── (marketplace)/      # Public marketplace
│   └── products/           # Product pages
├── components/
│   ├── ui/                 # Shadcn components
│   ├── layout/             # Header, Footer, Nav
│   ├── auth/               # Auth forms
│   ├── products/           # Product components
│   └── marketplace/        # Search, filters
├── lib/
│   ├── api/                # API client + endpoints
│   ├── stores/             # Zustand stores
│   ├── hooks/              # Custom hooks
│   └── utils/              # Utilities
└── types/                  # TypeScript definitions
```

## 🔧 CONFIGURACIONES CLAVE

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://nordbay-production.up.railway.app/api
NEXT_PUBLIC_APP_URL=https://nordbay.vercel.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Next.js Config
```typescript
const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    serverComponentsExternalPackages: ['@tanstack/react-query'],
  },
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  }
}
```

### API Client Template
```typescript
import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is required')
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Railway cold starts
  headers: { 'Content-Type': 'application/json' },
})

// JWT interceptors + error handling
```

## 🚀 DEPLOYMENT CONFIG

### Vercel Settings
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next", 
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": { "maxDuration": 30 }
  }
}
```

## 📋 MIGRATION CHECKLIST

### Phase 1: Setup (30 min)
- [ ] Create new GitHub repo
- [ ] Setup Next.js 15 + TypeScript
- [ ] Install all dependencies
- [ ] Configure Tailwind CSS 4
- [ ] Setup basic file structure

### Phase 2: Core (60 min)  
- [ ] API client + Railway integration
- [ ] Auth system (login/register)
- [ ] Basic UI components (shadcn)
- [ ] Layout components

### Phase 3: Features (90 min)
- [ ] Product listing + search
- [ ] Product detail page
- [ ] Create product wizard
- [ ] User dashboard

### Phase 4: Deploy (30 min)
- [ ] Vercel deployment
- [ ] Environment variables
- [ ] Domain configuration
- [ ] CORS setup in Railway

## 🎯 SUCCESS CRITERIA
- ✅ Frontend deployed to Vercel
- ✅ API integration with Railway backend working
- ✅ User auth flow complete
- ✅ Product CRUD operations functional
- ✅ Danish design aesthetic achieved
- ✅ Mobile responsive
- ✅ Performance optimized (Core Web Vitals)

---
**READY FOR NEW SESSION** 🚀
