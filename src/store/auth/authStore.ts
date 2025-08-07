```typescript
import { create } from 'zustand';

// Define the User type
interface User {
  id: string;
  username: string;
  email: string;
  // Add other user properties as needed, e.g., role, avatar, etc.
}

// Define the state structure for authentication
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Define the actions that can modify the authentication state
interface AuthActions {
  login: (userData: User) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (message: string | null) => void;
  clearError: () => void;
}

// Combine state and actions into a single type for the store
type AuthStore = AuthState & AuthActions;

// Create the Zustand store for authentication
export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,

  // Actions
  login: (userData: User) => set({
    isAuthenticated: true,
    user: userData,
    error: null, // Clear any previous errors on successful login
    loading: false,
  }),

  logout: () => set({
    isAuthenticated: false,
    user: null,
    error: null, // Clear any errors on logout
    loading: false,
  }),

  setLoading: (isLoading: boolean) => set({
    loading: isLoading,
  }),

  setError: (message: string | null) => set({
    error: message,
    loading: false, // Assume if an error occurs, loading should stop
  }),

  clearError: () => set({
    error: null,
  }),
}));