// ===============================================
// AUTHENTICATION API - RAILWAY BACKEND
// 3-Tier Authentication System Implementation
// ===============================================

import { api } from './client';
import type { 
  User, 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest
} from '@/types';

// ✅ AUTHENTICATION ENDPOINTS
export const authApi = {
  // Register new user (creates Light Account)
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/users/register', data);
    
    if (response.success && response.data) {
      // Store tokens and user data
      const { access_token, refresh_token, user } = response.data;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('nordbay_access_token', access_token);
        localStorage.setItem('nordbay_refresh_token', refresh_token);
        localStorage.setItem('nordbay_user', JSON.stringify(user));
      }
      
      return response.data;
    }
    
    throw new Error(response.error || 'Registration failed');
  },

  // Login existing user
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/users/login', data);
    
    if (response.success && response.data) {
      // Store tokens and user data
      const { access_token, refresh_token, user } = response.data;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('nordbay_access_token', access_token);
        localStorage.setItem('nordbay_refresh_token', refresh_token);
        localStorage.setItem('nordbay_user', JSON.stringify(user));
      }
      
      return response.data;
    }
    
    throw new Error(response.error || 'Login failed');
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      // Call backend logout endpoint
      await api.post('/users/logout');
    } catch (error) {
      console.warn('Logout endpoint failed, clearing local storage anyway');
    } finally {
      // Always clear local storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('nordbay_access_token');
        localStorage.removeItem('nordbay_refresh_token');
        localStorage.removeItem('nordbay_user');
      }
    }
  },

  // Get current user profile
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/users/me');
    
    if (response.success && response.data) {
      // Update stored user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('nordbay_user', JSON.stringify(response.data));
      }
      
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to get user profile');
  },

  // Update user profile
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put<User>('/users/me', data);
    
    if (response.success && response.data) {
      // Update stored user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('nordbay_user', JSON.stringify(response.data));
      }
      
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to update profile');
  },

  // Email verification
  verifyEmail: async (token: string): Promise<void> => {
    const response = await api.post('/users/verify-email', { token });
    
    if (!response.success) {
      throw new Error(response.error || 'Email verification failed');
    }
  },

  // Resend email verification
  resendVerification: async (): Promise<void> => {
    const response = await api.post('/users/resend-verification');
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to resend verification');
    }
  },

  // Password reset request
  requestPasswordReset: async (email: string): Promise<void> => {
    const response = await api.post('/users/request-password-reset', { email });
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to request password reset');
    }
  },

  // Password reset confirmation
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    const response = await api.post('/users/reset-password', { 
      token, 
      new_password: newPassword 
    });
    
    if (!response.success) {
      throw new Error(response.error || 'Password reset failed');
    }
  },

  // MitID verification (Phase 2 - Currently placeholder)
  initiateMitIDVerification: async (): Promise<{ verification_url: string }> => {
    const response = await api.post<{ verification_url: string }>('/users/mitid/initiate');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.error || 'Failed to initiate MitID verification');
  },

  // Complete MitID verification
  completeMitIDVerification: async (code: string): Promise<User> => {
    const response = await api.post<User>('/users/mitid/complete', { code });
    
    if (response.success && response.data) {
      // Update stored user data with new verification status
      if (typeof window !== 'undefined') {
        localStorage.setItem('nordbay_user', JSON.stringify(response.data));
      }
      
      return response.data;
    }
    
    throw new Error(response.error || 'MitID verification failed');
  },

  // Check authentication status
  checkAuth: (): { isAuthenticated: boolean; user: User | null } => {
    if (typeof window === 'undefined') {
      return { isAuthenticated: false, user: null };
    }
    
    const token = localStorage.getItem('nordbay_access_token');
    const userStr = localStorage.getItem('nordbay_user');
    
    if (!token || !userStr) {
      return { isAuthenticated: false, user: null };
    }
    
    try {
      const user = JSON.parse(userStr) as User;
      return { isAuthenticated: true, user };
    } catch (error) {
      console.error('Invalid user data in localStorage:', error);
      return { isAuthenticated: false, user: null };
    }
  },

  // Get account level info
  getAccountLevelInfo: (user?: User) => {
    if (!user) return { level: 'public', canSell: false, canBuy: true };
    
    switch (user.account_level) {
      case 'public':
        return {
          level: 'Public',
          description: 'Browse and search products',
          canSell: false,
          canBuy: true,
          features: ['Browse products', 'Search marketplace', 'View seller profiles']
        };
      
      case 'light_account':
        return {
          level: 'Light Account',
          description: 'Buy and sell with email verification',
          canSell: true,
          canBuy: true,
          features: ['All Public features', 'Create listings', 'Buy products', 'Message sellers']
        };
      
      case 'mitid_verified':
        return {
          level: 'MitID Verified',
          description: 'Full marketplace access with Danish ID verification',
          canSell: true,
          canBuy: true,
          features: ['All Light Account features', 'Higher selling limits', 'Verified seller badge', 'Premium support']
        };
      
      default:
        return { level: 'Unknown', canSell: false, canBuy: false };
    }
  }
};

// ✅ AUTH UTILITIES
export const authUtils = {
  // Check if user can perform action based on account level
  canUserSell: (user?: User): boolean => {
    if (!user) return false;
    return user.account_level !== 'public';
  },
  
  canUserBuy: (_user?: User): boolean => {
    return true; // All users can buy, even public
  },
  
  isEmailVerified: (user?: User): boolean => {
    if (!user) return false;
    return user.email_verified;
  },
  
  isMitIDVerified: (user?: User): boolean => {
    if (!user) return false;
    return user.mitid_verified;
  },
  
  needsUpgrade: (user?: User, requiredLevel?: User['account_level']): boolean => {
    if (!user || !requiredLevel) return false;
    
    const levels = ['public', 'light_account', 'mitid_verified'];
    const currentIndex = levels.indexOf(user.account_level);
    const requiredIndex = levels.indexOf(requiredLevel);
    
    return currentIndex < requiredIndex;
  }
};

export default authApi;
