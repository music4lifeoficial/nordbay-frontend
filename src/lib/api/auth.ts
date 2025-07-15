import { apiClient } from './client'
import type { AuthResponse, RegisterRequest, LoginRequest, User, ApiResponse } from '@/types/api'

export const authApi = {
  // Registro de usuario (backend: POST /api/users/register)
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/users/register', data)
    return response.data
  },

  // Login (backend: POST /api/users/login)
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/users/login', data)
    return response.data
  },

  // Verificar email (backend: POST /api/users/verify-email)
  verifyEmail: async (token: string): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/api/users/verify-email', { token })
    return response.data
  },

  // Refresh token (backend: POST /api/users/refresh - TODO: verificar endpoint)
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/users/refresh', { refresh: refreshToken })
    return response.data
  },

  // Obtener perfil propio (backend: GET /api/users/me)
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await apiClient.get<ApiResponse<User>>('/api/users/me')
    return response.data
  },

  // Actualizar perfil (backend: PUT /api/users/me)
  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await apiClient.put<ApiResponse<User>>('/api/users/me', data)
    return response.data
  },

  // Solicitar reseteo de contraseña (backend: POST /api/users/request-password-reset)
  requestPasswordReset: async (email: string): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/api/users/request-password-reset', { email })
    return response.data
  },

  // Resetear contraseña (backend: POST /api/users/reset-password)
  resetPassword: async (token: string, newPassword: string): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/api/users/reset-password', { 
      token, 
      new_password: newPassword 
    })
    return response.data
  },

  // Obtener perfil público (backend: GET /api/users/public/:user_id)
  getPublicProfile: async (userId: string): Promise<ApiResponse<User>> => {
    const response = await apiClient.get<ApiResponse<User>>(`/api/users/public/${userId}`)
    return response.data
  }
}

export default authApi
