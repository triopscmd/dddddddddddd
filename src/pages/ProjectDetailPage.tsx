```typescript
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjectStore, Project } from '../../store/projects/projectsStore';
import KanbanBoard from '../../components/kanban/KanbanBoard'; // Assuming this component will be created

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, loading, error, fetchProjects } = useProjectStore();

  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  // Effect to ensure projects are fetched on component mount or if store is empty
  useEffect(() => {
    if (projects.length === 0 && !loading && !error) {
      fetchProjects();
    }
  }, [projects.length, loading, error, fetchProjects]);

  // Effect to find the specific project once projects are loaded or ID changes
  useEffect(() => {
    if (id && projects.length > 0) {
      const foundProject = projects.find(p => p.id === id);
      if (foundProject) {
        setCurrentProject(foundProject);
      } else if (!loading) { // If projects are loaded but the specific project is not found
        navigate('/404'); // Redirect to a 404 page
      }
    }
  }, [id, projects, loading, navigate]);

  // Handle loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-xl text-gray-600">
        Cargando detalles del proyecto...
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-xl text-red-600">
        Error al cargar el proyecto: {error}
      </div>
    );
  }

  // Handle project not found after loading
  if (!currentProject) {
    return (
      <div className="flex justify-center items-center h-full text-xl text-gray-600">
        Proyecto no encontrado.
      </div>
    );
  }

  // Helper function to render status badge
  const getStatusBadge = (status: Project['status']) => {
    let colorClass = 'bg-gray-100 text-gray-700';
    switch (status) {
      case 'active':
        colorClass = 'bg-green-100 text-green-700';
        break;
      case 'planning':
        colorClass = 'bg-blue-100 text-blue-700';
        break;
      case 'completed':
        colorClass = 'bg-purple-100 text-purple-700';
        break;
      case 'on_hold':
        colorClass = 'bg-yellow-100 text-yellow-700';
        break;
      default:
        break;
    }
    const displayName = status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' '); // Format 'on_hold' to 'On Hold'
    return (
      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${colorClass}`}>
        {displayName}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Project Details Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 sm:mb-0">
            {currentProject.name}
          </h1>
          {getStatusBadge(currentProject.status)}
        </div>
        <p className="text-gray-700 text-lg mb-4">{currentProject.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-600">
          <div>
            <span className="font-semibold text-gray-800">Fecha de Inicio:</span> {currentProject.startDate}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Fecha de Fin:</span> {currentProject.endDate || 'N/A'}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Tareas Totales:</span> {currentProject.tasksCount}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Tareas Completadas:</span> {currentProject.completedTasksCount}
          </div>
          {/* Add more project details here as needed */}
        </div>
      </div>

      {/* Kanban Board Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Tablero Kanban</h2>
        {/* The KanbanBoard component will handle fetching and displaying tasks for this project */}
        <KanbanBoard projectId={currentProject.id} />
      </section>
    </div>
  );
};

export default ProjectDetailPage;