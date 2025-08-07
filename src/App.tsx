```typescript
import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

function App() {
  // In a real app, you'd use a state management solution (e.g., Zustand with authStore)
  // or a context API to check if the user is authenticated.
  // For now, we'll assume a simple layout or add conditional rendering later.
  const isAuthenticated = false; // Placeholder for authentication status

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Conditionally render Sidebar and Header if authenticated */}
      {isAuthenticated ? (
        <>
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-1 p-6">
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </>
      ) : (
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/auth" element={<AuthPage />} />
            {/* Redirect any other path to auth page if not authenticated, or show 404 */}
            <Route path="*" element={<AuthPage />} /> {/* Or NotFoundPage */}
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;