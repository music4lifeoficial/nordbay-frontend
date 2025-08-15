import axios from 'axios'

// Configuration for Railway backend + Vercel frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000')

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is required')
}

console.log('🚀 NordBay Frontend (Vercel) connecting to Railway backend:', API_BASE_URL)

// API Client optimizado para Railway Backend + Vercel Frontend
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT, // Railway needs more time for cold starts
  headers: {
    'Content-Type': 'application/json',
  },
  // Retry logic para Railway cold starts
  validateStatus: (status) => status < 500 || status === 503, // Retry on Railway timeouts
})

// Simple token manager used by some components
export const tokenManager = {
  getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('nordbay_token')
  },
  setToken(token: string) {
    if (typeof window === 'undefined') return
    localStorage.setItem('nordbay_token', token)
  },
  clear() {
    if (typeof window === 'undefined') return
    localStorage.removeItem('nordbay_token')
    localStorage.removeItem('nordbay_user')
  }
}

// Lightweight wrapper returning { success, data, error }
export type ApiResult<T = any> = { success: boolean; data?: T; error?: string }

async function wrap<T>(p: Promise<any>): Promise<ApiResult<T>> {
  try {
    const res = await p
    return { success: true, data: res.data }
  } catch (e: any) {
    const err = e?.response?.data?.error || e?.message || 'Unknown error'
    return { success: false, error: err }
  }
}

export const api = {
  get<T = any>(url: string, config?: any) {
    return wrap<T>(apiClient.get(url, config))
  },
  post<T = any>(url: string, data?: any, config?: any) {
    return wrap<T>(apiClient.post(url, data, config))
  },
  put<T = any>(url: string, data?: any, config?: any) {
    return wrap<T>(apiClient.put(url, data, config))
  },
  patch<T = any>(url: string, data?: any, config?: any) {
    return wrap<T>(apiClient.patch(url, data, config))
  },
  delete<T = any>(url: string, config?: any) {
    return wrap<T>(apiClient.delete(url, config))
  }
}

// Request interceptor para añadir token JWT automáticamente
apiClient.interceptors.request.use(
  (config) => {
    // Obtener token del localStorage o store
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('nordbay_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    
    console.log(`📡 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('❌ Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('❌ API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data?.error || error.message
    })

    if (error.response?.status === 401) {
      // Token expirado o inválido
      if (typeof window !== 'undefined') {
        localStorage.removeItem('nordbay_token')
        localStorage.removeItem('nordbay_user')
        // Redirigir a login
        window.location.href = '/login'
      }
    }

    // Handle Railway timeout or connection errors
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error('🐌 Railway backend timeout - this is normal for cold starts')
    }

    return Promise.reject(error)
  }
)

export default apiClient
