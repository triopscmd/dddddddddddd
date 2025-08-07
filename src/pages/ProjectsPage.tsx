```typescript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore, Project } from '../store/projects/projectsStore'; // Assuming Project type is exported from store
import ProjectFormModal from '../components/projects/ProjectFormModal';
import ProjectSummaryCard from '../components/reports/ProjectSummaryCard';

// Define the shape of data returned from the project form, for both creation and update
interface ProjectFormData {
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on_hold';
  startDate: string;
  endDate?: string;
}

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  // Destructure state and actions from the project store
  const { projects, loading, error, fetchProjects, addProject, updateProject, deleteProject } = useProjectStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Fetch projects when the component mounts
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Handler to open the modal for creating a new project
  const handleCreateProjectClick = () => {
    setEditingProject(null); // Clear any existing project data
    setIsModalOpen(true);
  };

  // Handler to open the modal for editing an existing project
  const handleEditProjectClick = (project: Project) => {
    setEditingProject(project); // Set the project to be edited
    setIsModalOpen(true);
  };

  // Handler to navigate to a project's detail page
  const handleViewProjectDetails = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  // Handler to delete a project
  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto? Esta acción no se puede deshacer.')) {
      try {
        await deleteProject(projectId);
      } catch (err) {
        console.error("Error al eliminar el proyecto:", err);
        // Optionally, show an error message to the user
      }
    }
  };

  // Handler to save (create or update) a project
  const handleSaveProject = async (data: ProjectFormData) => {
    try {
      if (editingProject) {
        // If editingProject exists, it's an update operation
        const updatedProject: Project = {
          ...editingProject, // Keep existing ID and other non-form fields
          ...data,           // Override with new form data
        };
        await updateProject(updatedProject);
      } else {
        // Otherwise, it's a creation operation
        // For a new project, assume the backend assigns ID, tasksCount, completedTasksCount
        // Here, we simulate with dummy values for now if the store's addProject expects a full Project
        const newProject: Project = {
          id: `proj-${Date.now()}`, // Temporary client-side ID for mock
          name: data.name,
          description: data.description,
          status: data.status,
          startDate: data.startDate,
          endDate: data.endDate,
          tasksCount: 0,        // Default for new project
          completedTasksCount: 0 // Default for new project
        };
        await addProject(newProject);
      }
      setIsModalOpen(false); // Close the modal on successful save
      setEditingProject(null); // Reset editing project state
    } catch (err) {
      console.error("Error al guardar el proyecto:", err);
      // Optionally, show an error message to the user within the modal or page
    }
  };

  // Handler to close the project form modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-xl text-gray-600">
        Cargando proyectos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-xl text-red-600">
        Error al cargar proyectos: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900">Mis Proyectos</h1>
        <button
          onClick={handleCreateProjectClick}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 ease-in-out flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Nuevo Proyecto
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-lg">
          No tienes proyectos aún. ¡Crea uno para empezar!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectSummaryCard
              key={project.id}
              project={project}
              onViewDetails={() => handleViewProjectDetails(project.id)}
              onEdit={() => handleEditProjectClick(project)}
              onDelete={() => handleDeleteProject(project.id)}
            />
          ))}
        </div>
      )}

      {/* Project Form Modal, shown conditionally */}
      {isModalOpen && (
        <ProjectFormModal
          project={editingProject} // Pass null for new project, or project object for editing
          onSave={handleSaveProject}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProjectsPage;