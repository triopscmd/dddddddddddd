```typescript
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import { useAuth } from './hooks/useAuth'; // Import the useAuth hook

function App() {
  const { isAuthenticated, loading: authLoading } = useAuth(); // Get authentication status from the hook

  // If authentication status is still loading, you might want to show a spinner or a blank page
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700 text-lg">
        Cargando autenticación...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {isAuthenticated ? (
        // Authenticated layout
        <>
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-1 p-6">
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetailPage />} />
                {/* Fallback for authenticated users if they try to access non-existent paths */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/auth" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </>
      ) : (
        // Unauthenticated layout (only AuthPage accessible)
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/auth" element={<AuthPage />} />
            {/* Redirect any other path to auth page if not authenticated */}
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;