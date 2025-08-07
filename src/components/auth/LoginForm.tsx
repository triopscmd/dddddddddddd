```typescript
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth'; // Adjust path based on actual file structure

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Use the useAuth hook to get login function, loading state, and error message
  const { login, loading, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError(); // Clear previous errors from the auth store

    // Basic client-side validation for form fields
    if (!email || !password) {
      // Set an error specific to missing fields if needed, or rely on hook's error for API issues
      // For simplicity, we'll let the hook handle API-related errors.
      // If we want a separate UI-level validation, we'd add `setLocalError('...'); return;`
      // For now, we'll just return and let the user see the empty fields.
      return; 
    }

    // Call the login function from the useAuth hook
    const success = await login({ email, password });
    
    if (success) {
      // If login is successful, the useAuth hook (and App.tsx) will handle redirection.
      // No explicit navigate('/dashboard') needed here.
      console.log('Login successful, App.tsx will redirect.');
    } else {
      // If login failed, the error state in useAuth hook will be updated,
      // and displayed by this component.
      console.log('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {(error) && ( // Display error from the useAuth hook
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}

      <div>
        <button
          type="submit"
          disabled={loading} // Disable button when loading
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;