# 🚀 NordBay Frontend

**Nordic Marketplace for Conscious Consumers**  
Professional Next.js 15 frontend deployed on Vercel, connected to Railway backend.

## 📋 Project Overview

- **Frontend**: Next.js 15 + React 19 + TypeScript (Vercel)
- **Backend**: Railway PostgreSQL + Express.js API  
- **URL Backend**: `https://nordbay-production.up.railway.app/api`
- **Style**: Nordic minimalist design inspired by MercadoLibre patterns
- **Authentication**: 3-tier system (Public → Light Account → MitID Verified)

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy the `.env` file (already configured):
- ✅ Railway backend URL configured
- ✅ Vercel deployment ready
- ✅ All necessary environment variables set

### 3. Development
```bash
npm run dev
```
Visit: `http://localhost:3000`

### 4. Build & Deploy
```bash
npm run build        # Local build
npm run vercel-build # Vercel production build
```

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5+ (strict mode)
- **Styling**: TailwindCSS 4 + Nordic design system
- **State**: Zustand + TanStack Query  
- **Forms**: React Hook Form + Zod validation
- **UI**: Radix UI + Custom Nordic components
- **Animations**: Framer Motion
- **Backend**: Railway API integration

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Nordic design system
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # UI components
├── lib/
│   ├── api/               # Railway API client
│   │   ├── client.ts      # Axios client with Railway optimization
│   │   ├── auth.ts        # 3-tier authentication
│   │   └── publications.ts # Products/marketplace
│   ├── stores/            # Zustand state management
│   └── utils/             # Utilities + constants
└── types/                 # TypeScript definitions
```

## 🎨 Design System

### Nordic Color Palette
- **Primary**: Nordic Blue-Grey (`#0f172a`)
- **Secondary**: Warm Nordic Green (`#22c55e`)  
- **Accent**: Danish Red (`#ef4444`)
- **Neutral**: Warm Grey scale

### Component Patterns
- `.nordic-card` - Card components
- `.nordic-button-*` - Button variants
- `.nordic-input` - Form inputs
- `.nordic-container` - Layout container

## 🔐 Authentication System

### 3-Tier Architecture
1. **Public** - Browse and search only
2. **Light Account** - Email verified, can buy/sell
3. **MitID Verified** - Danish ID verified, full access

### Implementation Status
- ✅ API client with JWT handling
- ✅ Zustand auth store
- ✅ Token refresh logic
- ⏳ UI components (in progress)
- ⏸️ MitID integration (Phase 2)

## 📡 API Integration

### Railway Backend
- **Base URL**: `https://nordbay-production.up.railway.app/api`
- **Timeout**: 30s (optimized for Railway cold starts)
- **Retry Logic**: Automatic retry on cold start errors
- **Authentication**: JWT Bearer tokens

### Available Endpoints
- `/users/*` - Authentication & user management
- `/publications/*` - Products/marketplace
- `/categories/*` - Product categories
- `/search/*` - Search & suggestions
- `/payments/*` - Stripe integration
- `/shipping/*` - Danish carriers (PostNord, GLS, DAO)

## 🛠️ Development

### Scripts
```bash
npm run dev              # Development server
npm run build            # Production build  
npm run start            # Start production server
npm run lint             # ESLint check
npm run lint:fix         # ESLint fix
npm run type-check       # TypeScript check
npm run format           # Prettier format
```

### Code Quality
- ✅ TypeScript strict mode
- ✅ ESLint + Prettier configuration
- ✅ Husky pre-commit hooks
- ✅ Path aliases configured (`@/*`)

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Automatic deployment on push to main
git push origin main
```

Environment variables are pre-configured in `.env`:
- ✅ `NEXT_PUBLIC_API_URL` - Railway backend
- ✅ `NEXT_PUBLIC_APP_URL` - Vercel frontend
- ✅ All necessary configuration

### Manual Deploy
```bash
npm run vercel-build
vercel deploy --prod
```

## 📦 Implementation Roadmap

### Phase 1: Foundation ✅
- [x] Next.js 15 + TypeScript setup
- [x] TailwindCSS Nordic design system  
- [x] API client with Railway integration
- [x] Authentication API & store
- [x] Basic project structure

### Phase 2: Authentication ⏳
- [ ] Login/Register components
- [ ] User profile management
- [ ] Account level upgrade flows
- [ ] Protected route handling

### Phase 3: Marketplace Core ⏸️
- [ ] Product listing & search
- [ ] Category navigation
- [ ] Product detail pages
- [ ] Create product wizard

### Phase 4: Commerce ⏸️
- [ ] Shopping cart & checkout
- [ ] Stripe payment integration
- [ ] Order management
- [ ] Danish shipping (PostNord, GLS, DAO)

### Phase 5: Social Features ⏸️
- [ ] Questions & answers
- [ ] Reviews & ratings
- [ ] User following
- [ ] Notifications

## 🔧 Configuration Files

### Essential Files
- `next.config.ts` - Next.js configuration with Vercel optimization
- `tailwind.config.ts` - Nordic design system configuration
- `tsconfig.json` - TypeScript strict configuration
- `.env` - Environment variables (Railway + Vercel)
- `package.json` - Dependencies and scripts

### Key Features
- ✅ Image optimization (Vercel + Cloudinary)
- ✅ Bundle analysis capability
- ✅ Security headers configured
- ✅ Performance optimizations
- ✅ Accessibility improvements

## 📚 Documentation

- [Backend API Documentation](./BACKEND_FOR_FRONTEND.txt) - Complete API reference
- [Implementation Plan](./FRONTEND_IMPLEMENTATION_PLAN.md) - Detailed technical roadmap
- [Authentication Architecture](./ARQUITECTURA_AUTENTICACION.md) - 3-tier auth system
- [Frontend Research](./FRONTEND_RESEARCH_2025.md) - Tech stack decisions

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Make changes following TypeScript/ESLint rules
3. Test with Railway backend integration
4. Submit PR with clear description

### Code Standards
- Use TypeScript strict mode
- Follow Nordic design patterns
- Maintain API consistency with Railway backend
- Write meaningful commit messages

## 📞 Support

For technical issues or questions:
- Check Railway backend status: `https://nordbay-production.up.railway.app/health`
- Review API documentation in `/BACKEND_FOR_FRONTEND.txt`
- Verify environment variables configuration

---

**Built with ❤️ for the Nordic marketplace community**  
*Professional implementation • Railway backend • Vercel deployment*
