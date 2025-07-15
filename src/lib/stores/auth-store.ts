import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authApi } from '@/lib/api/auth'
import type { User, LoginRequest, RegisterRequest } from '@/types/api'

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isLoading: boolean
  isAuthenticated: boolean
  
  // Actions
  login: (credentials: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  socialAuth: (provider: 'google' | 'facebook' | 'apple', token: string) => Promise<void>
  logout: () => void
  refreshAuth: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  setLoading: (loading: boolean) => void
  
  // Helper getters para los 3 niveles de auth del backend
  isVerified: () => boolean
  isMitIDVerified: () => boolean
  canSell: () => boolean
  getAuthLevel: () => 'public' | 'light' | 'mitid'
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (credentials: LoginRequest) => {
        try {
          set({ isLoading: true })
          const response = await authApi.login(credentials)
          
          // Store token for axios interceptor (siguiendo backend response format)
          if (response.success) {
            localStorage.setItem('nordbay_token', response.jwt)
            localStorage.setItem('nordbay_refresh', response.refresh)
            
            set({ 
              user: response.user,
              token: response.jwt,
              refreshToken: response.refresh,
              isAuthenticated: true,
              isLoading: false
            })
          } else {
            throw new Error('Login failed')
          }
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      register: async (data: RegisterRequest) => {
        try {
          set({ isLoading: true })
          const response = await authApi.register(data)
          
          if (response.success) {
            // Note: Registro solo crea usuario, requiere verificación de email
            set({ isLoading: false })
          } else {
            throw new Error('Registration failed')
          }
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      socialAuth: async (provider: 'google' | 'facebook' | 'apple', token: string) => {
        try {
          set({ isLoading: true })
          // TODO: Implementar OAuth flow según backend
          set({ isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: () => {
        localStorage.removeItem('nordbay_token')
        localStorage.removeItem('nordbay_refresh')
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false
        })
      },

      refreshAuth: async () => {
        try {
          const refreshToken = get().refreshToken
          if (!refreshToken) throw new Error('No refresh token')
          
          const response = await authApi.refreshToken(refreshToken)
          if (response.success) {
            localStorage.setItem('nordbay_token', response.jwt)
            set({ 
              token: response.jwt,
              user: response.user 
            })
          }
        } catch (error) {
          get().logout()
          throw error
        }
      },

      updateProfile: async (data: Partial<User>) => {
        try {
          set({ isLoading: true })
          const response = await authApi.updateProfile(data)
          
          if (response.success && response.data) {
            set({ 
              user: response.data,
              isLoading: false
            })
          }
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      // Helper getters para niveles de autenticación del backend
      isVerified: () => {
        const { user } = get()
        return user?.verified || false
      },

      isMitIDVerified: () => {
        const { user } = get()
        return user?.mitid_verified || false
      },

      canSell: () => {
        const { user } = get()
        return user?.mitid_verified || false // Solo MitID verified puede vender
      },

      getAuthLevel: () => {
        const state = get()
        if (!state.isAuthenticated) return 'public'
        if (state.isMitIDVerified()) return 'mitid'
        if (state.isVerified()) return 'light'
        return 'public'
      }
    }),
    {
      name: 'nordbay-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
)

// Helper functions for token management
export const getAuthToken = () => {
  const store = useAuthStore.getState()
  return store.token
}

export const clearAuth = () => {
  const store = useAuthStore.getState()
  store.logout()
}
