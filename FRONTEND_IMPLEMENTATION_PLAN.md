# 🛠️ Workflow y Parámetros Profesionales para NordBay Frontend

Este documento es la **fuente de verdad** para todo el equipo y Copilot/GPT. Aquí se define el método, parámetros y checklist para abordar cada módulo/feature con coherencia y calidad profesional.

## Metodología y Workflow

1. **Antes de programar:** Documentar cada módulo/feature en su propio archivo (design.md, Notion, etc.) con:
   - Introducción, objetivo, parámetros de marca, reglas para devs/Copilot.
   - Desglose en subtasks/micro-puntos (UX, copy, estados, animaciones, QA, edge-cases).
   - Benchmark y validación de mejores prácticas.
   - Checklist de QA y criterios de “done”.

2. **Iterativo y colaborativo:** Avanzar módulo por módulo, validando y documentando cada decisión antes de escribir código. No teorizar todo el proyecto primero.

3. **Prompt para Copilot/desarrolladores:**
   - NO usar contenido genérico, stock, ni completar con texto falso (“lorem ipsum”).
   - Si algo NO está definido, dejarlo como TODO y NO rellenar con defaults.
   - Respetar naming, paleta, responsividad, accesibilidad, idioma y personalidad de marca.
   - Revisar este documento antes de cada nueva tarea/módulo.

4. **Checklist QA por feature:**
   - Validación visual, funcional y de accesibilidad antes de avanzar.
   - Documentar edge-cases, estados, animaciones y microcopy.

5. **Fuente de verdad única:** Este archivo + design.md en repo + Notion para trabajo colaborativo.

6. **Para cada nuevo módulo:** Volver a esta sección y seguir el mismo proceso.

---

# 🚀 Plan de Implementación Frontend NordBay - Roadmap Técnico Detallado

### API Base URL
```
Production: https://nordbay-production.up.railway.app/api
---

## 📑 DOCUMENTACIÓN: FLUJO DE REGISTRO Y ONBOARDING (SOCIAL/EMAIL)

### 5.1 Registro y Onboarding - Documentación y Microtareas

**🎯 Introducción y Objetivo:**
El objetivo es crear un flujo de registro y onboarding minimalista, progresivo y social-first para NordBay, alineado con el contrato backend y la personalidad de marca. El registro debe ser lo más simple posible (email/social + password + nickname), con onboarding posterior para completar perfil y preferencias. Todo el proceso debe ser mobile-first, accesible (AA), y con copy relevante para Dinamarca/Escandinavia.

**🛡️ Parámetros de Marca y Reglas para Devs/Copilot:**
- No usar texto genérico ni placeholder (“lorem ipsum” prohibido)
- Copy y microcopy siempre relevante para DK/Scandinavia
- Social login (Google, MitID) siempre visible y prioritario
- Email/password como alternativa clara
- Nickname obligatorio, nombre opcional
- Onboarding separado tras registro exitoso
- Animaciones suaves, feedback visual claro
- Accesibilidad AA, mobile-first, dark mode
- No pedir más datos de los necesarios en el primer paso
- Si algo no está definido, dejarlo como TODO

**📝 Desglose en Microtareas (UX, Copy, Estados, Animaciones, Edge-cases):**
1. **Pantalla de bienvenida registro**
   - Branding NordBay, value proposition breve
   - Botones: “Continuar con Google”, “Continuar con MitID”, “Registrarse con email”
   - Microcopy sobre privacidad y términos
   - Animación de entrada sutil

2. **Registro social**
   - Redirige a OAuth (Google/MitID)
   - Feedback de loading, error, cancelación
   - Si éxito: ir directo a onboarding

3. **Registro por email**
   - Campos: email, password, nickname (obligatorio), nombre (opcional)
   - Validación en tiempo real (zod)
   - Botón “Crear cuenta”
   - Feedback de error (email en uso, password débil, etc.)
   - Loading state en botón

4. **Onboarding wizard (post-registro)**
   - Paso 1: Completa tu perfil (avatar, nombre, ubicación)
   - Paso 2: Preferencias (categorías, notificaciones)
   - Paso 3: Confirmación y bienvenida
   - Progreso visual (dots/bar)
   - Opción de saltar pasos no obligatorios

5. **Edge-cases y estados**
   - Error de red, backend caído
   - Usuario ya logueado intenta registrar
   - Cancelación de social login
   - Email ya registrado
   - Password débil
   - Validación nickname único
   - Loading global y por botón
   - Accesibilidad: focus, aria, contraste

**🔍 Benchmark y Validación de Mejores Prácticas:**
- Referencia: Vinted, Trendsales, Facebook Marketplace, Airbnb
- Social login siempre primero, email como fallback
- Registro en 1-2 pasos máximo antes de onboarding
- Onboarding progresivo, nunca forzar todo en un solo paso
- Feedback visual inmediato (errores, loading, éxito)
- Microcopy claro sobre privacidad y uso de datos
- Mobile-first, botones grandes, navegación clara
- Animaciones sutiles (fade, slide, progress)
- Dark mode y accesibilidad AA

**✅ Checklist de QA y Criterios de “Done” (Registro/Onboarding):**
- [ ] Social login (Google, MitID) funcional y prioritario
- [ ] Registro por email/nickname/password funcional
- [ ] Validación robusta (zod, feedback inmediato)
- [ ] Onboarding wizard post-registro operativo
- [ ] Copy y microcopy revisados para DK/EN
- [ ] Mobile-first y accesibilidad AA
- [ ] Animaciones y feedback visual implementados
- [ ] Edge-cases y errores gestionados
- [ ] QA manual en dispositivos reales
- [ ] Documentación y checklist actualizados

---

### 5.2 Wireframe Funcional y Desglose de UI (Registro & Onboarding)

**Estructura de Componentes y Jerarquía Visual:**

1. **Pantalla de bienvenida registro**
   - `<AuthWelcome />` (nuevo componente)
     - Logo NordBay
     - Value proposition breve
     - Botón primario: “Continuar con Google” (`<Button variant="social-google" />`)
     - Botón secundario: “Continuar con MitID” (`<Button variant="social-mitid" />`)
     - Link: “Registrarse con email” (abre modal o navega a `<RegisterForm />`)
     - Microcopy: “Al continuar aceptas nuestros Términos y Política de Privacidad”
     - Animación fade-in

2. **Registro social**
   - `<SocialAuthHandler />` (gestiona OAuth, loading, error)
   - Feedback visual: spinner, error toast, retry

3. **Registro por email**
   - `<RegisterForm />` (nuevo, minimalista)
     - Campos: email, password, nickname (obligatorio), nombre (opcional)
     - Validación en tiempo real (zod)
     - Botón: “Crear cuenta”
     - Link: “¿Ya tienes cuenta? Inicia sesión”
     - Feedback de error inline
     - Loading state en botón

4. **Onboarding wizard (post-registro)**
   - `<OnboardingWizard />` (multi-step, progresivo)
     - Paso 1: `<ProfileStep />` (avatar, nombre, ubicación)
     - Paso 2: `<PreferencesStep />` (categorías, notificaciones)
     - Paso 3: `<WelcomeStep />` (confirmación, tips)
     - Progreso visual: dots/bar arriba
     - Botón “Saltar” en pasos opcionales
     - Animaciones slide/fade entre pasos

**Navegación y Estados:**
- Navegación clara entre bienvenida, social/email, onboarding
- Redirección automática tras éxito social/email
- Feedback inmediato en cada acción (loading, error, éxito)
- Mobile-first: botones grandes, layout vertical, padding generoso
- Dark mode: fondo, botones y campos adaptados

**Recomendaciones de Layout/Responsividad:**
- Máximo 400-480px de ancho en mobile
- Espaciado vertical generoso entre secciones
- Botones full-width en mobile
- Tipografía clara, jerarquía visual fuerte (h1, h2, labels)
- Iconos de Google/MitID en botones sociales
- Microcopy siempre visible bajo botones principales

**Wireframe textual (mobile):**

```
┌───────────────────────────────┐
│   [NordBay Logo]             │
│   Sælg nemt. Køb trygt.      │
│   Giv videre.                │
│------------------------------│
│ [Continuar con Google]       │
│ [Continuar con MitID]        │
│ [Registrarse con email]      │
│------------------------------│
│ Al continuar aceptas...      │
└───────────────────────────────┘

// Si elige email:
┌───────────────────────────────┐
│   Crear cuenta                │
│------------------------------│
│ Email:  [___________]         │
│ Nickname: [_________]         │
│ Nombre:   [_________] (op)    │
│ Contraseña: [_______]         │
│ [Crear cuenta]                │
│ ¿Ya tienes cuenta? Inicia sesión│
└───────────────────────────────┘

// Onboarding (wizard):
┌───────────────────────────────┐
│ Paso 1/3: Completa tu perfil  │
│ [Avatar] [Nombre] [Ubicación] │
│ [Siguiente] [Saltar]          │
│------------------------------│
│ Paso 2/3: Preferencias        │
│ [Categorías] [Notificaciones] │
│ [Siguiente] [Saltar]          │
│------------------------------│
│ Paso 3/3: ¡Listo!             │
│ [Tips, links, CTA]            │
│ [Ir al marketplace]           │
└───────────────────────────────┘
```

---

---

Nuestro slogan: “Sælg nemt. Køb trygt. Giv videre.”

## 📋 ÍNDICE DE FEATURES POR PRIORIDAD

### FASE 1: FUNDACIÓN TÉCNICA (Semana 1-2)
1. [Setup Proyecto Next.js 15](#1-setup-proyecto-nextjs-15)
2. [Configuración Design System](#2-configuración-design-system)
3. [API Client TypeScript](#3-api-client-typescript)
4. [Layout Base & Navegación](#4-layout-base--navegación)

### FASE 2: AUTENTICACIÓN & USUARIO (Semana 3-4)
5. [Sistema de Autenticación](#5-sistema-de-autenticación)
6. [Onboarding Flow](#6-onboarding-flow)
7. [Perfil de Usuario](#7-perfil-de-usuario)

### FASE 3: MARKETPLACE CORE (Semana 5-7)
8. [CRUD Publicaciones](#8-crud-publicaciones)
9. [Sistema de Búsqueda Avanzada](#9-sistema-de-búsqueda-avanzada)
10. [Feed Gallery Instagram-style](#10-feed-gallery-instagram-style)
11. [Página de Producto](#11-página-de-producto)

### FASE 4: COMERCIO & PAGOS (Semana 8-9)
12. [Checkout Flow con Stripe](#12-checkout-flow-con-stripe)
13. [Simulador de Comisiones](#13-simulador-de-comisiones)
14. [Sistema Q&A Público](#14-sistema-qa-público)

### FASE 5: SOCIAL LAYER (Semana 10-12)
15. [Follow/Unfollow Vendors](#15-followunfollow-vendors)
16. [Feed Curado Personal](#16-feed-curado-personal)
17. [Sistema de Likes Discretos](#17-sistema-de-likes-discretos)
18. [AI Recommendations](#18-ai-recommendations)

---

## 📦 FASE 1: FUNDACIÓN TÉCNICA

### 1. Setup Proyecto Next.js 15

**🎯 Objetivo:** Crear la base técnica del proyecto con todas las dependencias optimizadas.

**📋 Tareas específicas:**
- Inicializar proyecto Next.js 15 con App Router
- Configurar TypeScript estricto
- Setup ESLint + Prettier + Husky
- Configurar variables de entorno
- Setup structure de carpetas escalable

**💻 Solución técnica:**
```bash
# Commands a ejecutar
npx create-next-app@latest nordbay-frontend --typescript --tailwind --eslint --app --src-dir
cd nordbay-frontend
npm install @tanstack/react-query zustand framer-motion @stripe/stripe-js
npm install -D @types/node
```

**📁 Estructura de carpetas:**
```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── layout.tsx
│   ├── (marketplace)/
│   │   ├── page.tsx              # Home feed
│   │   ├── search/page.tsx
│   │   ├── product/[id]/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── profile/page.tsx
│   │   ├── my-products/page.tsx
│   │   └── layout.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── loading.tsx
├── components/
│   ├── ui/                       # Shadcn components
│   ├── auth/
│   ├── marketplace/
│   ├── social/
│   └── layout/
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   ├── auth.ts
│   │   ├── products.ts
│   │   └── types.ts
│   ├── stores/
│   │   ├── auth-store.ts
│   │   ├── products-store.ts
│   │   └── ui-store.ts
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── constants.ts
│   │   └── validations.ts
│   └── hooks/
├── types/
│   ├── auth.ts
│   ├── product.ts
│   └── api.ts
└── public/
    ├── icons/
    └── images/
```

**🔧 Configuraciones clave:**
- `next.config.js`: Image optimization, bundle analyzer
- `tailwind.config.js`: Danish color palette, custom spacing
- `tsconfig.json`: Strict mode, path aliases
- `.env.local`: Variables de entorno con fallbacks

**✅ Criterios de completitud:**
- [ ] Proyecto inicia sin errores
- [ ] TypeScript configurado strictamente
- [ ] Todas las dependencias instaladas
- [ ] Hot reload funciona
- [ ] Structure de carpetas creada

## 🚀 VERCEL DEPLOYMENT READY

### ✅ Configuración Completa para Vercel

**📦 Arquitectura Vercel + Railway:**
```
Frontend (Vercel) ←→ Backend (Railway)
   ↓                    ↓
Vercel Edge CDN    Railway PostgreSQL
   ↓                    ↓
Global Performance   European Data
```

**🔧 Optimizaciones Vercel-Specific:**

1. **Next.js 15 + Turbopack**
   - Build times 5x más rápidos en Vercel
   - Hot reload instantáneo en desarrollo
   - Bundle optimization automático

2. **Performance Edge Computing**
   ```typescript
   // vercel.json
   "regions": ["fra1"], // Frankfurt para Nordic users
   "functions": {
     "app/api/**/*.ts": {
       "maxDuration": 30
     }
   }
   ```

3. **Image Optimization**
   - Vercel's CDN automático para imágenes
   - WebP/AVIF generation en edge
   - Lazy loading optimizado

4. **API Proxy Configuration**
   ```json
   "rewrites": [
     {
       "source": "/api/backend/(.*)",
       "destination": "$NEXT_PUBLIC_API_URL/$1"
     }
   ]
   ```

**🌍 Variables de Entorno Vercel:**
```bash
# En Vercel Dashboard > Settings > Environment Variables
NEXT_PUBLIC_APP_URL=https://nordbay.vercel.app
NEXT_PUBLIC_API_URL=https://nordbay-backend.up.railway.app/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

**⚡ Deployment Commands:**
```bash
# Development
npm run dev

# Production Build (Vercel automático)
npm run build
npm run start

# Pre-deployment checks
npm run lint
npm run type-check
```

**🔒 Security Headers en Vercel:**
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- CSP automático para XSS protection
- HTTPS enforcement

**📊 Monitoring Vercel:**
- Vercel Analytics integrado
- Core Web Vitals tracking
- Function execution times
- Error boundary reporting

**🚀 CI/CD Automático:**
- Git push → Vercel auto-deploy
- Preview deployments en PRs
- Production deploy en main branch
- Rollback instantáneo disponible

**✅ Verified Vercel Compatibility:**
- ✅ Next.js 15 App Router
- ✅ React 19 Server Components  
- ✅ TanStack Query SSR
- ✅ Stripe Elements
- ✅ Framer Motion animations
- ✅ Tailwind CSS optimizado
- ✅ TypeScript strict mode
- ✅ Image optimization
- ✅ API routes optimizadas

---

### 2. Configuración Design System

**🎯 Objetivo:** Establecer un sistema de diseño coherente con aesthetic nórdico minimalista.

**📋 Tareas específicas:**
- Instalar y configurar Shadcn/ui
- Definir color palette nórdico
- Configurar typography scale
- Crear componentes base customizados
- Setup animation system

**💻 Solución técnica:**
```bash
# Install Shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input label
npx shadcn-ui@latest add dropdown-menu dialog sheet
```

**🎨 Color Palette Nórdico:**
```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Nordic minimalist palette
        nordic: {
          50: '#f8fafc',   // Ice white
          100: '#f1f5f9',  // Snow
          200: '#e2e8f0',  // Light grey
          300: '#cbd5e1',  // Medium grey
          400: '#94a3b8',  // Dark grey
          500: '#64748b',  // Slate
          600: '#475569',  // Dark slate
          700: '#334155',  // Charcoal
          800: '#1e293b',  // Dark charcoal
          900: '#0f172a',  // Midnight
        },
        brand: {
          50: '#f0f9ff',   // Light blue
          500: '#3b82f6',  // Primary blue
          600: '#2563eb',  // Dark blue
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      }
    }
  }
}
```

**🧩 Componentes base customizados:**
- `<NordButton />`: Variantes primary, secondary, ghost
- `<NordCard />`: Elevación sutil, rounded corners
- `<NordInput />`: Focus states elegantes
- `<LoadingSpinner />`: Animation sutil
- `<Avatar />`: Circular, con fallback

**✅ Criterios de completitud:**
- [ ] Shadcn/ui instalado y configurado
- [ ] Color palette aplicado
- [ ] Componentes base funcionando
- [ ] Typography responsive
- [ ] Animations suaves definidas

---

### 3. API Client TypeScript

**🎯 Objetivo:** Crear cliente API type-safe para comunicación con backend.

**📋 Tareas específicas:**
- Configurar Axios con interceptors
- Definir tipos TypeScript para todas las entidades
- Crear custom hooks con TanStack Query
- Manejar autenticación automática
- Error handling centralizado

**💻 Solución técnica:**
```typescript
// lib/api/client.ts
import axios from 'axios'
import { getAuthToken, clearAuth } from '@/lib/stores/auth-store'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
})

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

**📝 Tipos TypeScript:**
```typescript
// types/product.ts
export interface Product {
  id: string
  title: string
  description: string
  price: number
  images: string[]
  category: string
  condition: 'new' | 'used' | 'like_new'
  seller: User
  location: {
    city: string
    country: string
    coordinates?: [number, number]
  }
  shipping_options: ShippingOption[]
  created_at: string
  updated_at: string
  status: 'active' | 'sold' | 'paused'
  views_count: number
  likes_count: number
  questions_count: number
}

export interface SearchFilters {
  query?: string
  category?: string
  price_min?: number
  price_max?: number
  condition?: Product['condition']
  location?: string
  sort_by?: 'price_asc' | 'price_desc' | 'date_desc' | 'relevance'
  page?: number
  per_page?: number
}
```

**🪝 Custom Hooks:**
```typescript
// lib/hooks/use-products.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '@/lib/api/products'

export const useProducts = (filters: SearchFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productsApi.search(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: productsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
```

**✅ Criterios de completitud:**
- [ ] API client configurado con interceptors
- [ ] Tipos TypeScript completos
- [ ] Custom hooks funcionando
- [ ] Error handling implementado
- [ ] Token refresh automático

---

### 4. Layout Base & Navegación

**🎯 Objetivo:** Crear layout responsive con navegación móvil-first elegante.

**📋 Tareas específicas:**
- Header responsive con search bar
- Bottom navigation móvil
- Sidebar desktop (colapsible)
- Breadcrumbs para navegación profunda
- Loading states y skeletons

**💻 Solución técnica:**
```typescript
// components/layout/AppLayout.tsx
'use client'

import { useState } from 'react'
import { Header } from './Header'
import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'
import { useAuthStore } from '@/lib/stores/auth-store'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuthStore()

  return (
    <div className="min-h-screen bg-nordic-50">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:pt-16">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 pb-20 lg:pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
}
```

**📱 Mobile Navigation:**
```typescript
// components/layout/MobileNav.tsx
import { Home, Search, PlusCircle, Heart, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/search', icon: Search, label: 'Search' },
  { href: '/create', icon: PlusCircle, label: 'Sell' },
  { href: '/favorites', icon: Heart, label: 'Likes' },
  { href: '/profile', icon: User, label: 'Profile' },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-nordic-200 z-50">
      <div className="grid grid-cols-5 h-16">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          
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
```

**🔍 Search Header:**
```typescript
// components/layout/SearchHeader.tsx
'use client'

import { useState } from 'react'
import { Search, Filter, Bell } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function SearchHeader() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-nordic-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-nordic-900">NordBay</span>
          </Link>

          {/* Search Bar - Hidden on mobile, shown in separate component */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nordic-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            
            <Button variant="ghost" size="sm">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
```

**✅ Criterios de completitud:**
- [ ] Header responsive funcionando
- [ ] Mobile navigation operativa
- [ ] Search bar integrado
- [ ] Sidebar desktop colapsible
- [ ] Loading states implementados

---

## 📦 FASE 2: AUTENTICACIÓN & USUARIO

### 5. Sistema de Autenticación

**🎯 Objetivo:** Implementar autenticación segura con MitID + Social Login.

**📋 Tareas específicas:**
- Login/Register forms con validación
- Integración con backend JWT
- Social login (Google, Facebook)
- Simulación MitID (para demo)
- Session management con Zustand

**💻 Solución técnica:**
```typescript
// lib/stores/auth-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authApi } from '@/lib/api/auth'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  verified: boolean
  role: 'user' | 'vendor' | 'admin'
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const response = await authApi.login({ email, password })
          set({ 
            user: response.user, 
            token: response.token,
            isLoading: false 
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      register: async (data) => {
        set({ isLoading: true })
        try {
          const response = await authApi.register(data)
          set({ 
            user: response.user, 
            token: response.token,
            isLoading: false 
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: () => {
        set({ user: null, token: null })
      },

      refreshToken: async () => {
        const { token } = get()
        if (!token) return
        
        try {
          const response = await authApi.refresh(token)
          set({ token: response.token })
        } catch (error) {
          set({ user: null, token: null })
        }
      },
    }),
    {
      name: 'nordbay-auth',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token 
      }),
    }
  )
)
```

**📝 Login Form:**
```typescript
// components/auth/LoginForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/lib/stores/auth-store'
import { toast } from 'sonner'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export function LoginForm() {
  const { login, isLoading } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password)
      toast.success('Welcome back!')
    } catch (error) {
      toast.error('Invalid credentials')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6 bg-white p-8 rounded-lg shadow-sm">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-nordic-900">Welcome back</h2>
        <p className="text-nordic-600 mt-2">Sign in to your account</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...form.register('email')}
            className="mt-1"
          />
          {form.formState.errors.email && (
            <p className="text-error text-sm mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...form.register('password')}
            className="mt-1"
          />
          {form.formState.errors.password && (
            <p className="text-error text-sm mt-1">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      {/* Social Login */}
      <div className="space-y-3">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-nordic-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-nordic-600">Or continue with</span>
          </div>
        </div>

        <Button variant="outline" className="w-full">
          <GoogleIcon className="w-5 h-5 mr-2" />
          Continue with Google
        </Button>

        <Button variant="outline" className="w-full">
          <MitIDIcon className="w-5 h-5 mr-2" />
          Continue with MitID
        </Button>
      </div>
    </div>
  )
}
```

**✅ Criterios de completitud:**
- [ ] Login/Register forms funcionando
- [ ] JWT token management
- [ ] Social login integrado
- [ ] Session persistence
- [ ] Error handling robusto

---

### 6. Onboarding Flow

**🎯 Objetivo:** Guiar nuevos usuarios con un onboarding minimalista y efectivo.

**📋 Tareas específicas:**
- Welcome screen con value proposition
- Profile completion wizard
- Preference settings (categories, location)
- Tutorial interactivo opcional
- Email verification flow

**💻 Solución técnica:**
```typescript
// components/onboarding/OnboardingWizard.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WelcomeStep } from './steps/WelcomeStep'
import { ProfileStep } from './steps/ProfileStep'
import { PreferencesStep } from './steps/PreferencesStep'
import { TutorialStep } from './steps/TutorialStep'

const steps = [
  { id: 'welcome', component: WelcomeStep },
  { id: 'profile', component: ProfileStep },
  { id: 'preferences', component: PreferencesStep },
  { id: 'tutorial', component: TutorialStep },
]

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userData, setUserData] = useState({})

  const nextStep = (data?: any) => {
    if (data) {
      setUserData(prev => ({ ...prev, ...data }))
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const CurrentStepComponent = steps[currentStep]?.component

  return (
    <div className="min-h-screen bg-gradient-to-br from-nordic-50 to-brand-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'w-2 h-2 rounded-full transition-colors',
                  index <= currentStep 
                    ? 'bg-brand-600' 
                    : 'bg-nordic-300'
                )}
              />
            ))}
          </div>
          <p className="text-center text-nordic-600 mt-2">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {CurrentStepComponent && (
              <CurrentStepComponent
                onNext={nextStep}
                onPrev={prevStep}
                data={userData}
                isFirst={currentStep === 0}
                isLast={currentStep === steps.length - 1}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
```

**👋 Welcome Step:**
```typescript
// components/onboarding/steps/WelcomeStep.tsx
import { Button } from '@/components/ui/button'
import { ShoppingBag, Users, Shield } from 'lucide-react'

export function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center space-y-8 bg-white p-8 rounded-lg shadow-sm">
      <div>
        <h1 className="text-3xl font-bold text-nordic-900 mb-2">
          Welcome to NordBay
        </h1>
        <p className="text-nordic-600 text-lg">
          The Nordic marketplace for conscious consumers
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <ShoppingBag className="w-6 h-6 text-brand-600" />
          </div>
          <h3 className="font-semibold text-nordic-900">Quality Products</h3>
          <p className="text-sm text-nordic-600">Curated marketplace for authentic items</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-brand-600" />
          </div>
          <h3 className="font-semibold text-nordic-900">Trusted Community</h3>
          <p className="text-sm text-nordic-600">Connect with verified sellers</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-brand-600" />
          </div>
          <h3 className="font-semibold text-nordic-900">Secure Payments</h3>
          <p className="text-sm text-nordic-600">Protected transactions with guarantee</p>
        </div>
      </div>

      <Button onClick={onNext} size="lg" className="w-full max-w-xs">
        Get Started
      </Button>
    </div>
  )
}
```

**✅ Criterios de completitud:**
- [ ] Welcome screen atractivo
- [ ] Profile completion wizard
- [ ] Preferences setup
- [ ] Tutorial interactivo
- [ ] Progress tracking

---

*[Continuando con las siguientes fases... El documento completo sería extenso, pero puedo continuar con cualquier sección específica que te interese detallar más. ¿Te parece bien este nivel de detalle? ¿Quieres que continue con alguna fase específica?]*

---

## 📦 FASE 3: MARKETPLACE CORE

### 7. Perfil de Usuario

**🎯 Objetivo:** Crear perfiles elegantes tanto para compradores como vendedores.

**📋 Tareas específicas:**
- Profile view responsive
- Edit profile form con validación
- Avatar upload con crop
- Vendor verification badges
- Activity timeline (compras/ventas)

**💻 Solución técnica:**
```typescript
// components/profile/ProfilePage.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Edit3, MapPin, Calendar, Star, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuthStore } from '@/lib/stores/auth-store'

export function ProfilePage({ userId }: { userId: string }) {
  const { user } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const isOwnProfile = user?.id === userId

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 shadow-sm"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="w-24 h-24 md:w-32 md:h-32">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="text-2xl">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            {isOwnProfile && (
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 rounded-full p-2"
                onClick={() => {/* Open avatar upload */}}
              >
                <Camera className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-nordic-900">{user?.name}</h1>
              {user?.verified && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Star className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-nordic-600 mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Copenhagen, Denmark</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Joined March 2024</span>
              </div>
            </div>

            <p className="text-nordic-700 mb-4">
              Passionate about sustainable living and quality Nordic design. 
              Selling curated items from my home and travels.
            </p>

            {isOwnProfile ? (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button>Follow</Button>
                <Button variant="outline">Message</Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {{
          label: 'Products', value: '23', icon: ShoppingBag },
          { label: 'Followers', value: '156', icon: Star },
          { label: 'Rating', value: '4.9', icon: Star },
          { label: 'Sales', value: '89', icon: ShoppingBag },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-4 text-center shadow-sm"
          >
            <stat.icon className="w-5 h-5 text-brand-600 mx-auto mb-1" />
            <div className="text-2xl font-bold text-nordic-900">{stat.value}</div>
            <div className="text-sm text-nordic-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductGrid userId={userId} />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewsList userId={userId} />
        </TabsContent>

        <TabsContent value="following">
          <FollowingList userId={userId} />
        </TabsContent>

        <TabsContent value="activity">
          <ActivityTimeline userId={userId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

**✅ Criterios de completitud:**
- [ ] Profile view responsive completado
- [ ] Edit profile form funcionando
- [ ] Avatar upload implementado
- [ ] Verification badges mostrados
- [ ] Activity timeline operativo

---

### 8. CRUD Publicaciones

**🎯 Objetivo:** Sistema completo para crear, editar y gestionar productos con UX elegante.

**📋 Tareas específicas:**
- Form de creación multi-step
- Image upload con preview y crop
- Validación robusta con Zod
- Draft saving automático
- Bulk operations para vendedores

**💻 Solución técnica:**
```typescript
// components/products/CreateProductWizard.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { z } from 'zod'
import { BasicInfoStep } from './steps/BasicInfoStep'
import { ImagesStep } from './steps/ImagesStep'
import { PricingStep } from './steps/PricingStep'
import { ShippingStep } from './steps/ShippingStep'
import { PreviewStep } from './steps/PreviewStep'

const productSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.string().min(1, 'Please select a category'),
  condition: z.enum(['new', 'like_new', 'good', 'fair']),
  price: z.number().min(1, 'Price must be greater than 0'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  location: z.object({
    city: z.string(),
    postal_code: z.string(),
    coordinates: z.tuple([z.number(), z.number()]).optional(),
  }),
  shipping_options: z.array(z.object({
    method: z.string(),
    price: z.number(),
    estimated_days: z.number(),
  })),
})

type ProductForm = z.infer<typeof productSchema>

const steps = [
  { id: 'basic', title: 'Basic Info', component: BasicInfoStep },
  { id: 'images', title: 'Photos', component: ImagesStep },
  { id: 'pricing', title: 'Pricing', component: PricingStep },
  { id: 'shipping', title: 'Shipping', component: ShippingStep },
  { id: 'preview', title: 'Preview', component: PreviewStep },
]

export function CreateProductWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      condition: 'good',
      price: 0,
      images: [],
      location: {
        city: '',
        postal_code: '',
      },
      shipping_options: [],
    },
    mode: 'onChange',
  })

  const nextStep = async () => {
    const stepFields = getStepFields(currentStep)
    const isValid = await form.trigger(stepFields)
    
    if (isValid) {
      // Auto-save draft
      saveDraft(form.getValues())
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const onSubmit = async (data: ProductForm) => {
    setIsSubmitting(true)
    try {
      await createProduct(data)
      toast.success('Product created successfully!')
      router.push('/my-products')
    } catch (error) {
      toast.error('Failed to create product')
    } finally {
      setIsSubmitting(false)
    }
  }

  const CurrentStepComponent = steps[currentStep]?.component

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-nordic-900">Create Listing</h1>
          <span className="text-nordic-600">
            {currentStep + 1} of {steps.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-nordic-200 rounded-full h-2">
          <motion.div
            className="bg-brand-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Step Labels */}
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <span
              key={step.id}
              className={cn(
                'text-xs',
                index <= currentStep
                  ? 'text-brand-600 font-medium'
                  : 'text-nordic-400'
              )}
            >
              {step.title}
            </span>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg p-6 shadow-sm"
        >
          {CurrentStepComponent && (
            <CurrentStepComponent
              form={form}
              onNext={nextStep}
              onPrev={prevStep}
              onSubmit={form.handleSubmit(onSubmit)}
              isFirst={currentStep === 0}
              isLast={currentStep === steps.length - 1}
              isSubmitting={isSubmitting}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
```

**📸 Images Step con Upload:**
```typescript
// components/products/steps/ImagesStep.tsx
'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, Reorder } from 'framer-motion'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function ImagesStep({ form, onNext, onPrev }: StepProps) {
  const images = form.watch('images')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const uploadPromises = acceptedFiles.map(async (file) => {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      const { url } = await response.json()
      return url
    })

    const uploadedUrls = await Promise.all(uploadPromises)
    form.setValue('images', [...images, ...uploadedUrls])
  }, [form, images])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 8,
    maxSize: 5 * 1024 * 1024, // 5MB
  })

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    form.setValue('images', newImages)
  }

  const reorderImages = (newOrder: string[]) => {
    form.setValue('images', newOrder)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-nordic-900 mb-2">
          Add Photos
        </h2>
        <p className="text-nordic-600">
          Add up to 8 high-quality photos. The first photo will be your main image.
        </p>
      </div>

      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-brand-600 bg-brand-50'
            : 'border-nordic-300 hover:border-nordic-400'
        )}
      >
        <input {...getInputProps()} />
        <Upload className="w-8 h-8 text-nordic-400 mx-auto mb-4" />
        <p className="text-nordic-600 mb-2">
          {isDragActive
            ? 'Drop photos here...'
            : 'Drag photos here, or click to browse'
          }
        </p>
        <p className="text-sm text-nordic-500">
          JPEG, PNG, WebP up to 5MB each
        </p>
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div>
          <h3 className="font-medium text-nordic-900 mb-3">
            Your Photos ({images.length}/8)
          </h3>
          
          <Reorder.Group
            axis="x"
            values={images}
            onReorder={reorderImages}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {images.map((image, index) => (
              <Reorder.Item
                key={image}
                value={image}
                className="relative aspect-square rounded-lg overflow-hidden bg-nordic-100 cursor-move"
              >
                <Image
                  src={image}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover"
                />
                
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-brand-600 text-white text-xs px-2 py-1 rounded">
                    Main
                  </div>
                )}
                
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 p-1 h-auto"
                  onClick={() => removeImage(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button 
          onClick={onNext}
          disabled={images.length === 0}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
```

**✅ Criterios de completitud:**
- [ ] Multi-step form funcionando
- [ ] Image upload con preview
- [ ] Validación completa implementada
- [ ] Auto-save drafts operativo
- [ ] Reorder images funcionando

---

### 9. Sistema de Búsqueda Avanzada

**🎯 Objetivo:** Búsqueda inteligente con filtros avanzados y resultados instantáneos.

**📋 Tareas específicas:**
- Search bar con autocompletado
- Filtros por categoría, precio, ubicación
- Search history y suggestions
- Results sorting y pagination
- Voice search (bonus)

**💻 Solución técnica:**
```typescript
// components/search/AdvancedSearch.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Search, Filter, X, MapPin, DollarSign } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Select } from '@/components/ui/select'
import { useProducts } from '@/lib/hooks/use-products'

export function AdvancedSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    price_min: Number(searchParams.get('price_min')) || 0,
    price_max: Number(searchParams.get('price_max')) || 10000,
    condition: searchParams.getAll('condition') || [],
    location: searchParams.get('location') || '',
    sort_by: searchParams.get('sort') || 'relevance',
  })

  // Debounced search
  const debouncedSearch = useDebouncedCallback((searchQuery: string) => {
    updateURL({ ...filters, query: searchQuery })
  }, 300)

  const updateURL = (newFilters: any) => {
    const params = new URLSearchParams()
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== '' && value !== 0) {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v))
        } else {
          params.set(key, String(value))
        }
      }
    })

    router.push(`/search?${params.toString()}`)
  }

  const { data: products, isLoading } = useProducts({
    query,
    ...filters,
  })

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nordic-400 h-4 w-4" />
            <Input
              placeholder="Search for anything..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                debouncedSearch(e.target.value)
              }}
              className="pl-10 pr-4"
            />
          </div>

          {/* Filters Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {Object.values(filters).some(v => v && (Array.isArray(v) ? v.length > 0 : true)) && (
                  <span className="bg-brand-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    !
                  </span>
                )}
              </Button>
            </SheetTrigger>
            
            <SheetContent className="w-80 sm:w-96">
              <FiltersPanel 
                filters={filters}
                onFiltersChange={setFilters}
                onApply={() => updateURL(filters)}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters */}
        <ActiveFilters 
          filters={filters}
          onRemoveFilter={(key, value) => {
            const newFilters = { ...filters }
            if (Array.isArray(newFilters[key])) {
              newFilters[key] = newFilters[key].filter(v => v !== value)
            } else {
              newFilters[key] = ''
            }
            setFilters(newFilters)
            updateURL(newFilters)
          }}
        />
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center">
        <p className="text-nordic-600">
          {products?.total || 0} results {query && `for "${query}"`}
        </p>

        <Select
          value={filters.sort_by}
          onValueChange={(value) => {
            const newFilters = { ...filters, sort_by: value }
            setFilters(newFilters)
            updateURL(newFilters)
          }}
        >
          <option value="relevance">Most Relevant</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="date_desc">Newest First</option>
        </Select>
      </div>

      {/* Results Grid */}
      <ProductGrid 
        products={products?.items || []}
        isLoading={isLoading}
      />
    </div>
  )
}
```

**🎛️ Filters Panel:**
```typescript
// components/search/FiltersPanel.tsx
export function FiltersPanel({ filters, onFiltersChange, onApply }: FiltersPanelProps) {
  const categories = [
    'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Art'
  ]

  const conditions = [
    { id: 'new', label: 'New' },
    { id: 'like_new', label: 'Like New' },
    { id: 'good', label: 'Good' },
    { id: 'fair', label: 'Fair' },
  ]

  return (
    <div className="space-y-6 pt-6">
      <div>
        <h3 className="font-semibold text-nordic-900 mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <Checkbox
                checked={filters.category === category}
                onCheckedChange={(checked) => {
                  onFiltersChange({
                    ...filters,
                    category: checked ? category : ''
                  })
                }}
              />
              <span className="text-sm text-nordic-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-nordic-900 mb-3">Price Range</h3>
        <div className="space-y-4">
          <div className="px-2">
            <Slider
              value={[filters.price_min, filters.price_max]}
              onValueChange={([min, max]) => {
                onFiltersChange({
                  ...filters,
                  price_min: min,
                  price_max: max
                })
              }}
              max={10000}
              step={50}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-nordic-600">
            <span>€{filters.price_min}</span>
            <span>€{filters.price_max}</span>
          </div>
        </div>
      </div>

      {/* Condition */}
      <div>
        <h3 className="font-semibold text-nordic-900 mb-3">Condition</h3>
        <div className="space-y-2">
          {conditions.map((condition) => (
            <label key={condition.id} className="flex items-center space-x-2">
              <Checkbox
                checked={filters.condition.includes(condition.id)}
                onCheckedChange={(checked) => {
                  const newConditions = checked
                    ? [...filters.condition, condition.id]
                    : filters.condition.filter(c => c !== condition.id)
                  
                  onFiltersChange({
                    ...filters,
                    condition: newConditions
                  })
                }}
              />
              <span className="text-sm text-nordic-700">{condition.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="font-semibold text-nordic-900 mb-3">Location</h3>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nordic-400 h-4 w-4" />
          <Input
            placeholder="City or postal code"
            value={filters.location}
            onChange={(e) => {
              onFiltersChange({
                ...filters,
                location: e.target.value
              })
            }}
            className="pl-10"
          />
        </div>
      </div>

      {/* Apply Button */}
      <Button onClick={onApply} className="w-full">
        Apply Filters
      </Button>
    </div>
  )
}
```

**✅ Criterios de completitud:**
- [ ] Search bar con autocompletado
- [ ] Filtros avanzados funcionando
- [ ] URL state management
- [ ] Debounced search implementado
- [ ] Results sorting operativo

---

### 10. Feed Gallery Instagram-style

**🎯 Objetivo:** Feed elegante tipo Instagram con infinite scroll y interacciones fluidas.

**📋 Tareas específicas:**
- Masonry grid responsive
- Infinite scroll con TanStack Query
- Like/unlike con animations
- Image lazy loading optimizado
- Quick preview modal

**💻 Solución técnica:**
```typescript
// components/feed/InstagramFeed.tsx
'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useIntersection } from '@/lib/hooks/use-intersection'
import { ProductCard } from './ProductCard'
import { QuickPreview } from './QuickPreview'
import { productsApi } from '@/lib/api/products'

export function InstagramFeed() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam = 1 }) => productsApi.getFeed({ page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000,
  })

  // Infinite scroll trigger
  const { ref: loadMoreRef } = useIntersection({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
  })

  const products = data?.pages.flatMap(page => page.products) || []

  return (
    <div className="max-w-6xl mx-auto">
      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        <AnimatePresence>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid mb-4"
            >
              <ProductCard
                product={product}
                onQuickView={() => setSelectedProduct(product)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading More Trigger */}
      <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
        {isFetchingNextPage && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
        )}
      </div>

      {/* Quick Preview Modal */}
      <QuickPreview
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}
```

**🃏 Product Card:**
```typescript
// components/feed/ProductCard.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useLikeProduct } from '@/lib/hooks/use-like-product'

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { isLiked, toggleLike, isLoading } = useLikeProduct(product.id)

  const aspectRatio = product.images[0]?.aspect_ratio || 1
  const height = 300 + (Math.random() * 200) // Random height for masonry

  return (
    <motion.div
      className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
      style={{ height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
    >
      {/* Main Image */}
      <div className="relative h-full">
        <Image
          src={product.images[0]?.url}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
        />

        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 flex items-center justify-center"
            >
              <motion.button
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                onClick={onQuickView}
                className="bg-white/90 backdrop-blur-sm text-nordic-900 px-4 py-2 rounded-full font-medium hover:bg-white transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                Quick View
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              toggleLike()
            }}
            disabled={isLoading}
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors',
              isLiked
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-nordic-700 hover:bg-white'
            )}
          >
            <Heart className={cn('w-4 h-4', isLiked && 'fill-current')} />
          </motion.button>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <Link href={`/product/${product.id}`}>
            <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">
              {product.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-white font-bold text-lg">
                €{product.price}
              </span>
              <div className="flex items-center gap-3 text-white/80 text-xs">
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {product.likes_count}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {product.questions_count}
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Seller Badge */}
        <div className="absolute top-3 left-3">
          <Link href={`/profile/${product.seller.id}`}>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
              <Image
                src={product.seller.avatar}
                alt={product.seller.name}
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="text-xs font-medium text-nordic-900">
                {product.seller.name}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
```

**👁️ Quick Preview Modal:**
```typescript
// components/feed/QuickPreview.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Share, MessageCircle, ShoppingCart } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ImageGallery } from './ImageGallery'

export function QuickPreview({ product, isOpen, onClose }: QuickPreviewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex h-full"
        >
          {/* Image Section */}
          <div className="flex-1 relative bg-nordic-50">
            <ImageGallery
              images={product.images}
              currentIndex={currentImageIndex}
              onIndexChange={setCurrentImageIndex}
            />
            
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 rounded-full bg-white/80 backdrop-blur-sm"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Info Section */}
          <div className="w-80 p-6 flex flex-col">
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-nordic-900 mb-2">
                {product.title}
              </h2>
              <div className="text-2xl font-bold text-brand-600">
                €{product.price}
              </div>
            </div>

            {/* Seller */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-nordic-200">
              <Image
                src={product.seller.avatar}
                alt={product.seller.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="font-medium text-nordic-900">
                  {product.seller.name}
                </div>
                <div className="text-sm text-nordic-600">
                  {product.seller.rating}★ · {product.seller.sales_count} sales
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex-1 mb-6">
              <p className="text-nordic-700 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full" size="lg">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Like
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <Button variant="outline" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Ask Question
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
```

**✅ Criterios de completitud:**
- [ ] Masonry grid responsive funcionando
- [ ] Infinite scroll implementado
- [ ] Like animations funcionando
- [ ] Quick preview modal operativo
- [ ] Image lazy loading optimizado

---

## 📦 FASE 4: COMERCIO & PAGOS

### 11. Página de Producto

**🎯 Objetivo:** Página de producto elegante con toda la información necesaria para decisión de compra.

**📋 Tareas específicas:**
- Layout responsive con gallery principal
- Info completa del producto y seller
- Q&A público integrado
- Shipping calculator dinámico
- Trust signals prominentes

**💻 Solución técnica:**
```typescript
// app/product/[id]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductInfo } from '@/components/product/ProductInfo'
import { SellerCard } from '@/components/product/SellerCard'
import { QASection } from '@/components/product/QASection'
import { SimilarProducts } from '@/components/product/SimilarProducts'
import { productsApi } from '@/lib/api/products'

interface ProductPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await productsApi.getById(params.id)
  
  return {
    title: `${product.title} - NordBay`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.images[0]?.url],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await productsApi.getById(params.id)
  
  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-nordic-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Gallery */}
          <ProductGallery images={product.images} />
          
          {/* Product Info */}
          <ProductInfo product={product} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <ProductDescription product={product} />
            
            {/* Q&A Section */}
            <QASection productId={product.id} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <SellerCard seller={product.seller} />
            <ShippingInfo product={product} />
            <TrustBadges product={product} />
          </div>
        </div>

        {/* Similar Products */}
        <SimilarProducts 
          productId={product.id} 
          category={product.category}
        />
      </div>
    </div>
  )
}
```

**✅ Criterios de completitud:**
- [ ] Página de producto SSR completa
- [ ] Gallery con zoom funcionando
- [ ] Q&A integrado y funcional
- [ ] Trust signals visibles
- [ ] SEO optimizado

---

### 12. Checkout Flow con Stripe

**🎯 Objetivo:** Checkout optimizado aprovechando al máximo Stripe con niveles de cuenta y comisiones dinámicas del backend.

**📋 Tareas específicas:**
- Checkout multi-step fluido
- Integración completa con Stripe Elements
- Manejo de cuentas vendor (Express/Standard)
- Comisiones dinámicas por nivel
- Split payments automáticos
- 3D Secure integrado

**💻 Solución técnica:**
```typescript
// components/checkout/CheckoutFlow.tsx
'use client'

import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, CreditCard, Truck, CheckCircle } from 'lucide-react'
import { useCart } from '@/lib/stores/cart-store'
import { useAuthStore } from '@/lib/stores/auth-store'
import { CartSummary } from './CartSummary'
import { PaymentMethod } from './PaymentMethod'
import { ShippingDetails } from './ShippingDetails'
import { OrderConfirmation } from './OrderConfirmation'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const steps = [
  { id: 'cart', title: 'Cart', icon: ShoppingCart },
  { id: 'shipping', title: 'Shipping', icon: Truck },
  { id: 'payment', title: 'Payment', icon: CreditCard },
  { id: 'confirmation', title: 'Complete', icon: CheckCircle },
]

export function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [clientSecret, setClientSecret] = useState('')
  const [paymentIntent, setPaymentIntent] = useState(null)
  const { cart, clearCart } = useCart()
  const { user } = useAuthStore()

  // Calculate total with dynamic commissions from backend
  const { data: checkoutData, isLoading } = useQuery({
    queryKey: ['checkout-calculation', cart.items],
    queryFn: () => checkoutApi.calculateTotals({
      items: cart.items,
      user_level: user?.level || 'basic',
      shipping_address: cart.shippingAddress,
    }),
    enabled: cart.items.length > 0,
  })

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0))

  return (
    <div className="min-h-screen bg-nordic-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep
              
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                      isActive
                        ? 'bg-brand-600 text-white'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-nordic-200 text-nordic-500'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={cn(
                    'ml-2 text-sm font-medium',
                    isActive ? 'text-brand-600' : 'text-nordic-600'
                  )}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'ml-4 h-px w-12 transition-colors',
                      isCompleted ? 'bg-green-500' : 'bg-nordic-200'
                    )} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                {currentStep === 0 && (
                  <CartSummary onNext={nextStep} />
                )}
                
                {currentStep === 1 && (
                  <ShippingDetails onNext={nextStep} onPrev={prevStep} />
                )}
                
                {currentStep === 2 && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentMethod 
                      onNext={nextStep} 
                      onPrev={prevStep}
                      onPaymentComplete={(intent) => {
                        setPaymentIntent(intent)
                        clearCart()
                        nextStep()
                      }}
                    />
                  </Elements>
                )}
                
                {currentStep === 3 && (
                  <OrderConfirmation paymentIntent={paymentIntent} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <OrderSummary 
              items={cart.items}
              calculations={checkoutData}
              isLoading={isLoading}
            />
            
            {/* Trust Badges */}
            <TrustBadges />
          </div>
        </div>
      </div>
    </div>
  )
}
```

**💳 Payment Method con Stripe Elements:**
```typescript
// components/checkout/PaymentMethod.tsx
'use client'

import { useState } from 'react'
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { AlertCircle, Lock, Shield } from 'lucide-react'
import { toast } from 'sonner'

export function PaymentMethod({ onNext, onPrev, onPaymentComplete }: PaymentMethodProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentError, setPaymentError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!stripe || !elements) return

    setIsLoading(true)
    setPaymentError('')

    try {
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: 'if_required',
      })

      if (error) {
        setPaymentError(error.message || 'Payment failed')
        toast.error('Payment failed')
      } else if (paymentIntent?.status === 'succeeded') {
        // Payment successful - handle split to vendors
        await handleSuccessfulPayment(paymentIntent)
        onPaymentComplete(paymentIntent)
        toast.success('Payment successful!')
      }
    } catch (err) {
      setPaymentError('An unexpected error occurred')
      toast.error('Payment failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuccessfulPayment = async (paymentIntent: any) => {
    // Backend handles automatic split payments to vendors
    // based on their account level and commission structure
    await fetch('/api/payments/process-split', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payment_intent_id: paymentIntent.id,
        cart_items: cart.items, // Includes vendor info for splits
      }),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-nordic-900 mb-4">
          Payment Information
        </h2>
        
        {/* Security badges */}
        <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg mb-6">
          <Shield className="w-5 h-5 text-green-600" />
          <div className="text-sm text-green-800">
            <div className="font-medium">Secure Payment</div>
            <div>Your payment information is encrypted and secure</div>
          </div>
        </div>
      </div>

      {/* Stripe Payment Element */}
      <div className="p-4 border border-nordic-200 rounded-lg">
        <PaymentElement 
          options={{
            layout: 'tabs',
            paymentMethodOrder: ['card', 'klarna', 'ideal'],
          }}
        />
      </div>

      {/* Error Display */}
      {paymentError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-sm text-red-800">{paymentError}</span>
        </div>
      )}

      {/* Payment Terms */}
      <div className="text-xs text-nordic-600 space-y-1">
        <p>
          By clicking "Complete Order", you agree to our Terms of Service and 
          Privacy Policy. Your payment will be processed securely by Stripe.
        </p>
        <p>
          Funds will be held until delivery confirmation, protecting both 
          buyers and sellers.
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrev} disabled={isLoading}>
          Back to Shipping
        </Button>
        
        <Button 
          type="submit" 
          disabled={!stripe || isLoading}
          className="min-w-[140px]"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Processing...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Complete Order
            </div>
          )}
        </Button>
      </div>
    </form>
  )
}
```

**✅ Criterios de completitud:**
- [ ] Checkout multi-step fluido
- [ ] Stripe Elements integrado
- [ ] Split payments automáticos
- [ ] 3D Secure funcionando
- [ ] Error handling robusto

---

### 13. Simulador de Comisiones

**🎯 Objetivo:** Herramienta transparente que muestra comisiones dinámicas según nivel de cuenta y categoría.

**📋 Tareas específicas:**
- Calculator en tiempo real
- Breakdown detallado de fees
- Comparación entre niveles
- Proyecciones de ganancias
- CTA para upgrade de cuenta

**💻 Solución técnica:**
```typescript
// components/tools/CommissionSimulator.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, Info, ArrowUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useCommissionCalculator } from '@/lib/hooks/use-commission-calculator'

// Los 7 niveles reales del backend según MODULO_6_MIGRATION_REPUTATION.sql
const accountLevels = [
  {
    id: 1,
    name: 'Básico',
    hex_color: '#F7F7FA',
    description: 'Usuario nuevo en la plataforma',
    requirements: 'Sin requisitos',
    commission_discount: 0.00,
    shipping_discount: 0.00,
    priority_support: false,
  },
  {
    id: 2,
    name: 'Progresivo',
    hex_color: '#7BE495',
    description: 'Usuario con experiencia básica',
    requirements: '5 transacciones, 3.5★, 5 reseñas',
    commission_discount: 2.00,
    shipping_discount: 0.00,
    priority_support: false,
  },
  {
    id: 3,
    name: 'Intermedio',
    hex_color: '#62B6F0',
    description: 'Usuario confiable con buen historial',
    requirements: '25 transacciones, 4.0★, 20 reseñas',
    commission_discount: 5.00,
    shipping_discount: 5.00,
    priority_support: false,
  },
  {
    id: 4,
    name: 'Avanzado',
    hex_color: '#8C7FE7',
    description: 'Vendedor destacado con excelente reputación',
    requirements: '100 transacciones, 4.5★, 75 reseñas',
    commission_discount: 10.00,
    shipping_discount: 10.00,
    priority_support: true,
  },
  {
    id: 5,
    name: 'Destacado',
    hex_color: '#C0C0C0',
    description: 'Usuario élite con máxima confiabilidad',
    requirements: '500 transacciones, 4.7★, 300 reseñas',
    commission_discount: 15.00,
    shipping_discount: 15.00,
    priority_support: true,
  },
  {
    id: 6,
    name: 'Premium',
    hex_color: '#FFD700',
    description: 'Vendedor profesional de máximo nivel',
    requirements: '1000 transacciones, 4.85★, 750 reseñas',
    commission_discount: 20.00,
    shipping_discount: 20.00,
    priority_support: true,
  },
  {
    id: 7,
    name: 'Sumum',
    hex_color: '#101010',
    description: 'Usuario excepcional - Máximo nivel',
    requirements: '2500 transacciones, 4.9★, 2000 reseñas',
    commission_discount: 25.00,
    shipping_discount: 25.00,
    priority_support: true,
  },
]

export function CommissionSimulator() {
  const [salePrice, setSalePrice] = useState(100)
  const [category, setCategory] = useState('electronics')
  const [selectedLevel, setSelectedLevel] = useState('basic')
  const { user } = useAuthStore()

  const { data: calculations, isLoading } = useCommissionCalculator({
    price: salePrice,
    category,
    // Backend calcula automáticamente comisiones para todos los niveles
    // basado en métricas reales del usuario y growth orgánico
  })

  const currentUserLevel = user?.level || 1 // Nivel 1 = Nuevo
  const currentCalculation = calculations?.[currentUserLevel]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-nordic-900 mb-2">
          Commission Calculator
        </h1>
        <p className="text-nordic-600">
          See exactly how much you'll earn and what commission levels mean for your business
        </p>
      </div>

      {/* Input Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Calculate Your Earnings
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="price">Sale Price (€)</Label>
            <Input
              id="price"
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(Number(e.target.value))}
              min={1}
              step={0.01}
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home & Garden</option>
              <option value="books">Books</option>
              <option value="art">Art & Collectibles</option>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="level">Account Level</Label>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              {accountLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {accountLevels.map((level) => {
          const calc = calculations?.[level.id]
          const isCurrentUser = level.id === currentUserLevel
          const isSelected = level.id === selectedLevel
          
          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'relative',
                isSelected && 'ring-2 ring-brand-500'
              )}
            >
              <Card className={cn(
                'h-full transition-all',
                isCurrentUser && 'ring-2 ring-green-500',
                isSelected && !isCurrentUser && 'ring-2 ring-brand-500'
              )}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className={level.color}>
                      {level.name}
                    </Badge>
                    {isCurrentUser && (
                      <Badge variant="outline" className="text-xs">
                        Your Level
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {calc && (
                    <>
                      {/* Earnings Breakdown */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-nordic-600">Sale Price:</span>
                          <span>€{salePrice.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-nordic-600">Commission ({calc.commission_rate}%):</span>
                          <span className="text-red-600">-€{calc.commission_amount.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-nordic-600">Payment Processing:</span>
                          <span className="text-red-600">-€{calc.payment_fee.toFixed(2)}</span>
                        </div>
                        
                        <hr className="my-2" />
                        
                        <div className="flex justify-between font-semibold">
                          <span>You Receive:</span>
                          <span className="text-green-600 text-lg">
                            €{calc.net_earnings.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Savings vs Nivel 1 (Nuevo) */}
                      {level.id !== 1 && calculations?.[1] && (
                        <div className="bg-green-50 p-2 rounded text-center">
                          <div className="text-xs text-green-800">
                            Save €{(calculations[1].commission_amount - calc.commission_amount).toFixed(2)} vs Nuevo
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Level Requirements & Benefits */}
                  <div className="space-y-2">
                    <div className="text-xs text-nordic-600">
                      <strong>Requirements:</strong>
                    </div>
                    <div className="text-xs text-nordic-500">
                      {level.requirements}
                    </div>
                    
                    <div className="text-xs text-nordic-600">
                      <strong>Benefits:</strong>
                    </div>
                    <div className="space-y-1">
                      {level.commission_discount > 0 && (
                        <div className="text-xs text-green-600">
                          • {level.commission_discount}% commission discount
                        </div>
                      )}
                      {level.shipping_discount > 0 && (
                        <div className="text-xs text-green-600">
                          • {level.shipping_discount}% shipping discount
                        </div>
                      )}
                      {level.priority_support && (
                        <div className="text-xs text-blue-600">
                          • Priority support
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Organic Growth Indicator */}
                  {!isCurrentUser && level.id !== 1 && (
                    <div className="text-xs text-nordic-600 bg-nordic-50 p-2 rounded">
                      <div className="font-medium">Automatic Unlock</div>
                      <div>Reach the requirements to unlock this level automatically</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Monthly Projections */}
      {currentCalculation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Monthly Projection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { sales: 5, label: '5 sales/month' },
                { sales: 20, label: '20 sales/month' },
                { sales: 50, label: '50 sales/month' },
              ].map((scenario) => (
                <div key={scenario.sales} className="text-center p-4 bg-nordic-50 rounded-lg">
                  <div className="text-sm text-nordic-600 mb-1">{scenario.label}</div>
                  <div className="text-2xl font-bold text-nordic-900">
                    €{(currentCalculation.net_earnings * scenario.sales).toFixed(0)}
                  </div>
                  <div className="text-xs text-nordic-500">
                    Revenue: €{(salePrice * scenario.sales).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">How the Level System Works</p>
              <p>
                Your level grows automatically based on completed transactions, customer ratings, 
                and review count. Each level unlocks better commission discounts and shipping benefits. 
                The system is completely transparent - you always know exactly what you need to reach the next level.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

**✅ Criterios de completitud:**
- [ ] Calculator tiempo real funcionando
- [ ] Breakdown detallado de fees
- [ ] Comparación entre niveles
- [ ] Proyecciones mensuales
- [ ] CTAs para upgrade

---

### 14. Sistema Q&A Público

**🎯 Objetivo:** Sistema de preguntas y respuestas público como MercadoLibre para generar confianza.

**📋 Tareas específicas:**
- Q&A thread por producto
- Notificaciones en tiempo real
- Moderación automática con AI
- Search dentro de Q&A
- FAQ generation automático

**💻 Solución técnica:**
```typescript
// components/product/QASection.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, Search, ThumbsUp, Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useQA } from '@/lib/hooks/use-qa'
import { formatDistanceToNow } from 'date-fns'

export function QASection({ productId }: { productId: string }) {
  const [newQuestion, setNewQuestion] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const { user } = useAuthStore()

  const {
    data: qaData,
    isLoading,
    askQuestion,
    answerQuestion,
    likeQuestion,
    reportQuestion,
  } = useQA(productId)

  const filteredQA = qaData?.filter(qa =>
    qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    qa.answer?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  const handleAskQuestion = async () => {
    if (!newQuestion.trim() || !user) return

    try {
      await askQuestion.mutateAsync(newQuestion)
      setNewQuestion('')
      toast.success('Question submitted successfully!')
    } catch (error) {
      toast.error('Failed to submit question')
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-nordic-900 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Questions & Answers ({qaData?.length || 0})
        </h3>
        
        {/* Search Q&A */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nordic-400 h-4 w-4" />
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Ask Question Form */}
      {user ? (
        <div className="mb-8 p-4 bg-nordic-50 rounded-lg">
          <h4 className="font-medium text-nordic-900 mb-3">Ask a Question</h4>
          <div className="space-y-3">
            <Textarea
              placeholder="What would you like to know about this product?"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="min-h-[80px]"
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-nordic-500">
                {newQuestion.length}/500 characters
              </span>
              <Button
                onClick={handleAskQuestion}
                disabled={!newQuestion.trim() || askQuestion.isLoading}
                size="sm"
              >
                <Send className="w-4 h-4 mr-2" />
                Ask Question
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8 p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-blue-800 mb-2">Sign in to ask questions</p>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      )}

      {/* Q&A List */}
      <div className="space-y-6">
        {isLoading ? (
          <QASkeleton />
        ) : filteredQA.length === 0 ? (
          <div className="text-center py-8 text-nordic-600">
            {searchQuery ? 'No questions match your search' : 'No questions yet. Be the first to ask!'}
          </div>
        ) : (
          <AnimatePresence>
            {filteredQA.map((qa) => (
              <motion.div
                key={qa.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-nordic-200 rounded-lg p-4"
              >
                <QAItem
                  qa={qa}
                  onLike={() => likeQuestion.mutate(qa.id)}
                  onAnswer={(answer) => answerQuestion.mutate({ id: qa.id, answer })}
                  onReport={() => reportQuestion.mutate(qa.id)}
                  canAnswer={user?.id === qa.product.seller_id}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Auto-Generated FAQ */}
      {qaData && qaData.length >= 5 && (
        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2">
            Frequently Asked Questions
          </h4>
          <p className="text-sm text-green-800">
            Based on the most common questions, here are the key points buyers ask about:
          </p>
          <GeneratedFAQ questions={qaData} />
        </div>
      )}
    </div>
  )
}
```

**💬 Q&A Item Component:**
```typescript
// components/product/QAItem.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ThumbsUp, Flag, Send } from 'lucide-react'

export function QAItem({ qa, onLike, onAnswer, onReport, canAnswer }: QAItemProps) {
  const [isAnswering, setIsAnswering] = useState(false)
  const [answerText, setAnswerText] = useState('')

  const handleSubmitAnswer = () => {
    if (answerText.trim()) {
      onAnswer(answerText)
      setAnswerText('')
      setIsAnswering(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Question */}
      <div>
        <div className="flex items-start gap-3 mb-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={qa.questioner.avatar} />
            <AvatarFallback>{qa.questioner.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-nordic-900">
                {qa.questioner.name}
              </span>
              <span className="text-xs text-nordic-500">
                {formatDistanceToNow(new Date(qa.created_at))} ago
              </span>
              {qa.questioner.verified && (
                <Badge variant="secondary" className="text-xs bg-brand-100 text-brand-800">
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-nordic-800">{qa.question}</p>
          </div>
        </div>

        {/* Question Actions */}
        <div className="flex items-center gap-4 ml-11">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLike}
            className="h-8 px-2 text-nordic-600 hover:text-brand-600"
          >
            <ThumbsUp className="w-3 h-3 mr-1" />
            {qa.likes_count}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onReport}
            className="h-8 px-2 text-nordic-600 hover:text-red-600"
          >
            <Flag className="w-3 h-3" />
          </Button>

          {canAnswer && !qa.answer && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAnswering(true)}
              className="h-8"
            >
              Answer
            </Button>
          )}
        </div>
      </div>

      {/* Answer */}
      {qa.answer && (
        <div className="ml-4 pl-4 border-l-2 border-brand-100">
          <div className="flex items-start gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={qa.answerer.avatar} />
              <AvatarFallback>{qa.answerer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-nordic-900">
                  {qa.answerer.name}
                </span>
                <Badge className="text-xs bg-brand-100 text-brand-800">
                  Seller
                </Badge>
                <span className="text-xs text-nordic-500">
                  {formatDistanceToNow(new Date(qa.answered_at))} ago
                </span>
              </div>
              <p className="text-nordic-800">{qa.answer}</p>
            </div>
          </div>
        </div>
      )}

      {/* Answer Form */}
      {isAnswering && (
        <div className="ml-4 pl-4 border-l-2 border-brand-200">
          <div className="space-y-3">
            <Textarea
              placeholder="Write your answer..."
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSubmitAnswer}>
                <Send className="w-3 h-3 mr-1" />
                Submit Answer
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAnswering(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

**✅ Criterios de completitud:**
- [ ] Q&A thread funcional
- [ ] Search dentro de Q&A
- [ ] Notificaciones implementadas
- [ ] Moderación AI integrada
- [ ] FAQ auto-generado

---

## 📦 FASE 5: SOCIAL LAYER

### 15. Follow/Unfollow Vendors

**🎯 Objetivo:** Permitir a los usuarios seguir y dejar de seguir a vendedores para personalizar su feed.

**📋 Tareas específicas:**
- Botón de seguir/dejar de seguir en perfil de vendedor
- Notificaciones de nuevos productos de vendedores seguidos
- Lista de vendedores seguidos en el perfil del usuario
- Recomendaciones de vendedores a seguir

**💻 Solución técnica:**
```typescript
// components/vendor/FollowButton.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, UserPlus } from 'lucide-react'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useFollow } from '@/lib/hooks/use-follow'

export function FollowButton({ vendorId }: { vendorId: string }) {
  const { user } = useAuthStore()
  const { isFollowing, toggleFollow } = useFollow(vendorId)

  return (
    <Button
      onClick={toggleFollow}
      variant={isFollowing ? 'outline' : 'default'}
      className="flex items-center gap-2"
    >
      {isFollowing ? (
        <>
          <Check className="w-4 h-4" />
          Following
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4" />
          Follow
        </>
      )}
    </Button>
  )
}
```

**✅ Criterios de completitud:**
- [ ] Follow/Unfollow funcional
- [ ] Notificaciones de nuevos productos
- [ ] Lista de vendedores seguidos en perfil
- [ ] Recomendaciones de vendedores

---

### 16. Feed Curado Personal

**🎯 Objetivo:** Mostrar un feed personalizado basado en usuarios seguidos y preferencias.

**📋 Tareas específicas:**
- Algoritmo de curación de contenido
- Sección de "Para ti" en el feed
- Posibilidad de ocultar productos no deseados
- Feedback de usuario para mejorar curación

**💻 Solución técnica:**
```typescript
// components/feed/PersonalizedFeed.tsx
'use client'

import { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { productsApi } from '@/lib/api/products'
import { useAuthStore } from '@/lib/stores/auth-store'
import { ProductCard } from './ProductCard'
import { useUserPreferences } from '@/lib/hooks/use-user-preferences'

export function PersonalizedFeed() {
  const { user } = useAuthStore()
  const { preferences, setPreferences } = useUserPreferences()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['personalized-feed', preferences],
    queryFn: ({ pageParam = 1 }) => productsApi.getPersonalizedFeed({
      page: pageParam,
      preferences,
    }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000,
    enabled: !!user,
  })

  useEffect(() => {
    if (data?.pages.length) {
      const allProducts = data.pages.flatMap(page => page.products)
      const uniqueProductIds = new Set()
      const filteredProducts = allProducts.filter(product => {
        if (uniqueProductIds.has(product.id)) {
          return false
        }
        uniqueProductIds.add(product.id)
        return true
      })
      
      setPreferences(prev => ({
        ...prev,
        viewedProducts: [...filteredProducts, ...prev.viewedProducts].slice(0, 50),
      }))
    }
  }, [data, setPreferences])

  const products = data?.pages.flatMap(page => page.products) || []

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading ? (
        <SkeletonFeed />
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
      
      {/* Load more trigger */}
      {hasNextPage && (
        <div className="col-span-full flex justify-center py-4">
          {isFetchingNextPage ? (
            <LoadingSpinner />
          ) : (
            <Button
              onClick={() => fetchNextPage()}
              variant="outline"
              className="w-full max-w-xs"
            >
              Load more
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
```

**✅ Criterios de completitud:**
- [ ] Feed personalizado funcionando
- [ ] Algoritmo de curación efectivo
- [ ] Sección de "Para ti" visible
- [ ] Ocultar productos no deseados operativo
- [ ] Feedback de usuario implementado

---

### 17. Sistema de Likes Discretos

**🎯 Objetivo:** Permitir a los usuarios mostrar interés en productos sin notificar al vendedor.

**📋 Tareas específicas:**
- Botón de like discreto en cada producto
- Contador de likes visible
- Animación sutil al likear
- Lista de productos que me gustan en el perfil

**💻 Solución técnica:**
```typescript
// components/product/LikeButton.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { useLikeProduct } from '@/lib/hooks/use-like-product'

export function LikeButton({ productId }: { productId: string }) {
  const { isLiked, toggleLike } = useLikeProduct(productId)

  return (
    <Button
      onClick={toggleLike}
      variant="ghost"
      className="p-0 text-nordic-600 hover:text-red-600"
    >
      <Heart className={cn('w-5 h-5 transition-transform', isLiked && 'scale-125')} />
    </Button>
  )
}
```

**✅ Criterios de completitud:**
- [ ] Like discreto funcionando
- [ ] Animación sutil al likear
- [ ] Contador de likes visible
- [ ] Lista de productos que me gustan en perfil

---

### 18. AI Recommendations

**🎯 Objetivo:** Sugerencias de productos personalizadas usando algoritmos de AI.

**📋 Tareas específicas:**
- Integración con API de recomendaciones
- Sección de "Recomendados para ti" en el feed
- Feedback de usuario para mejorar recomendaciones
- Posibilidad de excluir categorías de recomendaciones

**💻 Solución técnica:**
```typescript
// components/feed/AIRecommendations.tsx
'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { productsApi } from '@/lib/api/products'
import { useAuthStore } from '@/lib/stores/auth-store'
import { ProductCard } from './ProductCard'
import { useUserPreferences } from '@/lib/hooks/use-user-preferences'

export function AIRecommendations() {
  const { user } = useAuthStore()
  const { preferences } = useUserPreferences()

  const { data: recommendedProducts, isLoading } = useQuery({
    queryKey: ['ai-recommendations', user?.id, preferences],
    queryFn: () => productsApi.getAIRecommendations(),
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading ? (
        <SkeletonFeed />
      ) : (
        recommendedProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  )
}
```

**✅ Criterios de completitud:**
- [ ] Recomendaciones AI funcionando
- [ ] Integración con API de recomendaciones
- [ ] Feedback de usuario implementado
- [ ] Excluir categorías de recomendaciones operativo

---

### 3.1 Manual de API del Backend

**📖 Endpoints Disponibles en NordBay Backend**

Para que el frontend esté completamente alineado con el backend real, aquí está la documentación actualizada de todos los endpoints disponibles:

#### 🏠 **Base URLs**
- **Railway (Producción)**: `https://your-railway-app.railway.app/api`
- **Local (Desarrollo)**: `http://localhost:3001/api`

#### 🔐 **AUTENTICACIÓN**

**POST `/users/register`** - Registrar nuevo usuario
```typescript
interface RegisterRequest {
  email: string;
  password: string;
  nickname: string;
  name: string;
  phone: string;
  address: string;
}
```

**POST `/users/login`** - Iniciar sesión
```typescript
interface LoginRequest {
  email: string;
  password: string;
}
```

**POST `/users/verify-email`** - Verificar email con token
```typescript
interface VerifyEmailRequest {
  token: string;
}
```

#### 📂 **CATEGORÍAS**

**GET `/categories`** - Obtener todas las categorías (planas)
**GET `/categories/hierarchy/tree`** - Obtener categorías jerárquicas
**GET `/categories/:id/attributes`** - Obtener atributos específicos de una categoría

#### 📱 **PUBLICACIONES**

**GET `/publications`** - Obtener todas las publicaciones activas
**POST `/publications`** 🔐 - Crear nueva publicación
**GET `/publications/:id`** - Obtener publicación específica
**PUT `/publications/:id`** 🔐 - Editar publicación
**DELETE `/publications/:id`** 🔐 - Eliminar publicación

#### 🔍 **BÚSQUEDA**

**GET `/search/publications`** - Búsqueda general con filtros
```typescript
interface SearchParams {
  q?: string;
  category_id?: number;
  price_min?: number;
  price_max?: number;
  location?: string;
  sort_by?: 'price' | 'date' | 'relevance';
  page?: number;
  limit?: number;
}
```

**GET `/search/suggestions`** - Autocompletado de búsqueda

#### 💰 **PAGOS Y TRANSACCIONES**

**POST `/payments/intent`** 🔐 - Crear intención de pago
**GET `/payments/transactions`** 🔐 - Obtener transacciones del usuario
**GET `/payments/wallet`** 🔐 - Obtener wallet del usuario

#### 📦 **ENVÍOS**

**GET `/shipping/rates`** - Calcular tarifas de envío
**GET `/shipping/pickup-points`** - Obtener puntos de recogida
**POST `/shipping/create`** 🔐 - Crear envío

#### ⭐ **REPUTACIÓN**

**POST `/reputation/reviews`** 🔐 - Dejar reseña
**GET `/reputation/user/:userId`** - Obtener reputación de usuario

#### 💬 **PREGUNTAS Y RESPUESTAS**

**GET `/questions/publication/:publication_id`** - Obtener preguntas de publicación
**POST `/questions`** 🔐 - Hacer pregunta
**POST `/questions/:id/answer`** 🔐 - Responder pregunta

#### 🔔 **NOTIFICACIONES**

**GET `/notifications`** 🔐 - Obtener notificaciones
**PUT `/notifications/:id/read`** 🔐 - Marcar como leída

#### 👤 **USUARIOS**

**GET `/users/me`** 🔐 - Obtener perfil propio
**PUT `/users/me`** 🔐 - Actualizar perfil
**GET `/users/public/:user_id`** - Obtener perfil público

**🔐** = Requiere autenticación (Header: `Authorization: Bearer <jwt_token>`)

**✅ Criterios de completitud:**
- [ ] Cliente API TypeScript creado con todos estos endpoints
- [ ] Tipos TypeScript definidos para requests/responses
- [ ] Error handling implementado para códigos 400/401/403/404/500
