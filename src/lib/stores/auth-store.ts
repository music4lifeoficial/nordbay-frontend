// ===============================================
// AUTH STORE - ZUSTAND STATE MANAGEMENT
// 3-Tier Authentication System State
// ===============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, authUtils } from '@/lib/api/auth';
import type { User, LoginRequest, RegisterRequest } from '@/types';

// ✅ AUTH STORE STATE INTERFACE
interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
  
  // Auth utilities
  canSell: () => boolean;
  canBuy: () => boolean;
  needsUpgrade: (requiredLevel?: User['account_level']) => boolean;
  getAccountInfo: () => ReturnType<typeof authApi.getAccountLevelInfo>;
  
  // MitID (Phase 2)
  initiateMitIDVerification: () => Promise<string>;
  completeMitIDVerification: (code: string) => Promise<void>;
}

// ✅ AUTH STORE IMPLEMENTATION
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // ✅ LOGIN
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          const authResponse = await authApi.login(credentials);
          
          set({
            user: authResponse.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed',
          });
          throw error;
        }
      },

      // ✅ REGISTER
      register: async (data: RegisterRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          const authResponse = await authApi.register(data);
          
          set({
            user: authResponse.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Registration failed',
          });
          throw error;
        }
      },

      // ✅ LOGOUT
      logout: async () => {
        set({ isLoading: true });
        
        try {
          await authApi.logout();
        } catch (error) {
          console.warn('Logout API call failed:', error);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      // ✅ GET CURRENT USER
      getCurrentUser: async () => {
        const { isAuthenticated } = get();
        if (!isAuthenticated) return;
        
        set({ isLoading: true, error: null });
        
        try {
          const user = await authApi.getCurrentUser();
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          // If token is invalid, logout
          if (error instanceof Error && error.message.includes('401')) {
            get().logout();
          } else {
            set({
              isLoading: false,
              error: error instanceof Error ? error.message : 'Failed to get user',
            });
          }
        }
      },

      // ✅ UPDATE PROFILE
      updateProfile: async (data: Partial<User>) => {
        set({ isLoading: true, error: null });
        
        try {
          const updatedUser = await authApi.updateProfile(data);
          
          set({
            user: updatedUser,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to update profile',
          });
          throw error;
        }
      },

      // ✅ CLEAR ERROR
      clearError: () => {
        set({ error: null });
      },

      // ✅ AUTH UTILITIES
      canSell: () => {
        const { user } = get();
        return authUtils.canUserSell(user ?? undefined);
      },

      canBuy: () => {
        const { user } = get();
        return authUtils.canUserBuy(user ?? undefined);
      },

      needsUpgrade: (requiredLevel?: User['account_level']) => {
        const { user } = get();
        return authUtils.needsUpgrade(user ?? undefined, requiredLevel);
      },

      getAccountInfo: () => {
        const { user } = get();
        return authApi.getAccountLevelInfo(user ?? undefined);
      },

      // ✅ MITID VERIFICATION (Phase 2)
      initiateMitIDVerification: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const { verification_url } = await authApi.initiateMitIDVerification();
          set({ isLoading: false });
          return verification_url;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'MitID verification failed',
          });
          throw error;
        }
      },

      completeMitIDVerification: async (code: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const updatedUser = await authApi.completeMitIDVerification(code);
          
          set({
            user: updatedUser,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'MitID verification failed',
          });
          throw error;
        }
      },
    }),
    {
      name: 'nordbay-auth',
      // Only persist essential data
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// ✅ AUTH SELECTORS (for performance)
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);

// ✅ AUTH ACTIONS (for cleaner components)
export const authActions = {
  login: () => useAuthStore.getState().login,
  register: () => useAuthStore.getState().register,
  logout: () => useAuthStore.getState().logout,
  getCurrentUser: () => useAuthStore.getState().getCurrentUser,
  updateProfile: () => useAuthStore.getState().updateProfile,
  clearError: () => useAuthStore.getState().clearError,
};

// ✅ INITIALIZE AUTH ON APP START
export const initializeAuth = () => {
  const { getCurrentUser } = useAuthStore.getState();
  
  // Check localStorage for existing auth
  const localAuth = authApi.checkAuth();
  
  if (localAuth.isAuthenticated && localAuth.user) {
    useAuthStore.setState({
      user: localAuth.user,
      isAuthenticated: true,
    });
    
    // Refresh user data from backend
    getCurrentUser().catch(console.error);
  }
};

export default useAuthStore;
