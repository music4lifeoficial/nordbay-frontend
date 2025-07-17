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

  // Account level helpers
  accountLevel: () => User['account_level'];
  hasLevel: (level: User['account_level']) => boolean;
  isLightAccount: () => boolean;
  isMitIDVerified: () => boolean;
  isAdmin: () => boolean;
  canAccess: (level: User['account_level']) => boolean;
  
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

      // ===== ACCOUNT LEVEL HELPERS =====
      accountLevel: () => {
        const { user } = get();
        return user?.account_level ?? 'public';
      },
      hasLevel: (level) => {
        const { user } = get();
        return user?.account_level === level;
      },
      isLightAccount: () => {
        const { user } = get();
        return user?.account_level === 'light_account';
      },
      isMitIDVerified: () => {
        const { user } = get();
        return user?.account_level === 'mitid_verified' && user?.mitid_verified;
      },
      isAdmin: () => {
        // TODO: usar user cuando el backend lo soporte
        return false; // Placeholder, ajustar según backend
      },
      canAccess: (level) => {
        const { user } = get();
        const levels = ['public', 'light_account', 'mitid_verified'];
        const userLevelIdx = user ? levels.indexOf(user.account_level) : 0;
        const requiredIdx = levels.indexOf(level);
        return userLevelIdx >= requiredIdx;
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
  if (typeof window === 'undefined') return; // Solo en cliente
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
