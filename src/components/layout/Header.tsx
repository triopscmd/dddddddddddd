```typescript
import React from 'react';
import { useAuthStore } from '../../store/auth/authStore';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth'); // Redirect to auth page after logout
  };

  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="text-2xl font-semibold text-indigo-700">
        <span className="hidden sm:inline">ProjectPilot</span>
        <span className="sm:hidden">PP</span>
      </div>

      <div className="flex items-center space-x-4">
        {user && (
          <span className="text-gray-700 text-sm sm:text-base font-medium">
            Hola, {user.username || user.email}!
          </span>
        )}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 ease-in-out"
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};

export default Header;