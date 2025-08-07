```typescript
import React from 'react';
import { Project } from '../../store/projects/projectsStore';
import { formatDate, formatStatusForDisplay } from '../../utils/helpers';

interface ProjectSummaryCardProps {
  project: Project;
  onViewDetails: (projectId: string) => void;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

const ProjectSummaryCard: React.FC<ProjectSummaryCardProps> = ({
  project,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  // Helper to get status badge classes based on project status
  const getStatusBadgeClass = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'planning':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-purple-100 text-purple-700';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Calculate completion percentage for the progress display
  const completionPercentage = project.tasksCount > 0
    ? Math.round((project.completedTasksCount / project.tasksCount) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div>
        {/* Project Name and Status Badge */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-tight pr-2">{project.name}</h3>
          <span className={`flex-shrink-0 px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(project.status)}`}>
            {formatStatusForDisplay(project.status)}
          </span>
        </div>

        {/* Project Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {project.description || 'No hay descripción disponible para este proyecto.'}
        </p>

        {/* Project Details (Dates and Task Progress) */}
        <div className="space-y-2 text-sm text-gray-700 mb-5">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Inicio: {formatDate(project.startDate, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Fin: {formatDate(project.endDate, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Progreso: {project.completedTasksCount}/{project.tasksCount} tareas ({completionPercentage}%)</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center space-x-2 pt-4 border-t border-gray-100">
        <button
          onClick={() => onViewDetails(project.id)}
          className="flex-1 py-2 px-3 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors duration-200 text-sm font-medium"
          aria-label={`Ver detalles de ${project.name}`}
        >
          Ver Detalles
        </button>
        <button
          onClick={() => onEdit(project)}
          className="py-2 px-3 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
          aria-label={`Editar ${project.name}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="py-2 px-3 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors duration-200 text-sm font-medium"
          aria-label={`Eliminar ${project.name}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectSummaryCard;