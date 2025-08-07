```typescript
import { useEffect } from 'react';
import { useAuthStore, User } from '../store/auth/authStore';
import { localStorageService } from '../utils/localStorageService';
import { isValidEmail } from '../utils/helpers';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

const USER_STORAGE_KEY = 'currentUser'; // Key for storing user data in localStorage

export const useAuth = () => {
  // Destructure state and actions from the authentication store
  const {
    isAuthenticated,
    user,
    loading,
    error,
    login: storeLogin, // Renamed to avoid conflict with the hook's own login function
    logout: storeLogout, // Renamed to avoid conflict with the hook's own logout function
    setLoading,
    setError,
    clearError,
  } = useAuthStore();

  // Effect to restore authentication state from localStorage on initial component mount
  useEffect(() => {
    const storedUser = localStorageService.getItem<User>(USER_STORAGE_KEY);
    if (storedUser) {
      // If a user is found in local storage, log them in to the Zustand store
      storeLogin(storedUser);
    }
    // The dependency array is empty because this effect should only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Handles user login logic.
   * @param credentials - An object containing user email and password.
   * @returns A Promise that resolves to true if login is successful, false otherwise.
   */
  const login = async ({ email, password }: LoginCredentials): Promise<boolean> => {
    setLoading(true); // Set loading state to true
    clearError();     // Clear any previous errors

    try {
      // Simulate an asynchronous API call for login
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay

      // Mock authentication logic:
      if (email === 'user@example.com' && password === 'password123') {
        const loggedInUser: User = {
          id: 'user-mock-1',
          username: 'Demo User',
          email: email,
        };
        storeLogin(loggedInUser); // Update Zustand store with logged-in user data
        localStorageService.setItem(USER_STORAGE_KEY, loggedInUser); // Persist user in local storage
        return true; // Login successful
      } else {
        setError('Email o contraseña incorrectos.'); // Set specific error message
        return false; // Login failed
      }
    } catch (err) {
      // Catch any unexpected errors during the process
      setError('Error al iniciar sesión. Inténtalo de nuevo más tarde.');
      console.error('Login error:', err);
      return false;
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  /**
   * Handles user registration logic.
   * @param credentials - An object containing username, email, and password.
   * @returns A Promise that resolves to true if registration is successful, false otherwise.
   */
  const register = async ({ username, email, password }: RegisterCredentials): Promise<boolean> => {
    setLoading(true); // Set loading state to true
    clearError();     // Clear any previous errors

    try {
      // Client-side validation using utility function
      if (!isValidEmail(email)) {
        setError('Por favor, ingresa un email válido.');
        return false;
      }
      if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
        return false;
      }

      // Simulate an asynchronous API call for registration
      await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 second delay

      // Mock registration logic:
      if (email === 'test@example.com') { // Simulate a pre-existing email
        setError('Este email ya está registrado.');
        return false;
      }

      const newUser: User = {
        id: `user-mock-${Date.now()}`, // Generate a simple mock ID
        username: username,
        email: email,
      };
      storeLogin(newUser); // Automatically log in the new user after successful registration
      localStorageService.setItem(USER_STORAGE_KEY, newUser); // Persist new user in local storage
      return true; // Registration successful
    } catch (err) {
      // Catch any unexpected errors during the process
      setError('Error al registrarse. Inténtalo de nuevo más tarde.');
      console.error('Registration error:', err);
      return false;
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  /**
   * Handles user logout logic.
   */
  const logout = () => {
    storeLogout(); // Update Zustand store to log out user
    localStorageService.removeItem(USER_STORAGE_KEY); // Remove user data from local storage
  };

  // Return the authentication state and actions for components to consume
  return {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  };
};