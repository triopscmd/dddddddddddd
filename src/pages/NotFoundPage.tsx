```typescript
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard'); // Or navigate('/') if auth page is the default root for unauthenticated
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-9xl font-extrabold text-indigo-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Página No Encontrada</h2>
        <p className="text-gray-600 text-lg mb-6">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <button
          onClick={handleGoHome}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Volver al Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;