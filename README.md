# 🚀 NordBay Frontend

Modern marketplace frontend built with Next.js 15, TypeScript, and TailwindCSS.

## �️ Architecture

- **Backend + Database**: Railway (https://nordbay-backend-production.up.railway.app)
- **Frontend**: Vercel (this repo)
- **Stack**: Next.js 15 + React 19 + TypeScript + TailwindCSS 4

## �🎯 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5+
- **Styling**: TailwindCSS 4 + Radix UI
- **State Management**: Zustand + TanStack Query
- **Animations**: Framer Motion
- **Validation**: Zod + React Hook Form
- **Deployment**: Vercel
- **Backend**: Railway (separate service)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

### Environment Configuration

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://nordbay-backend-production.up.railway.app
NEXT_PUBLIC_APP_URL=https://nordbay.vercel.app
```

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=https://nordbay-production.up.railway.app/api
NEXT_PUBLIC_APP_NAME=NordBay
NEXT_PUBLIC_ENVIRONMENT=development
```

## ✅ FASE 3 COMPLETADA

- [x] **Multi-step Product Creation Wizard** (7 steps)
- [x] **Custom UI Component Library** (shadcn/ui based)  
- [x] **Railway Backend Integration**
- [x] **TypeScript Strict Configuration**
- [x] **Form Validation with Zod**
- [x] **Image Upload System**
- [x] **Progress Tracking**
- [x] **Danish Design Aesthetic**
