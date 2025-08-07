```typescript
import React from 'react';
import { Task } from '../../store/tasks/tasksStore';

interface KanbanTaskCardProps {
  task: Task;
  // Future: onOpenDetails?: (taskId: string) => void;
}

const KanbanTaskCard: React.FC<KanbanTaskCardProps> = ({ task /*, onOpenDetails */ }) => {
  // Function to get priority badge styles based on priority level
  const getPriorityBadgeClass = (priority: Task['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format the due date for display
  const formattedDueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString('es-ES', {
    month: 'short',
    day: 'numeric',
  }) : null;

  // Handler for clicking the task card (e.g., to open a detail modal)
  const handleClick = () => {
    // Future: if (onOpenDetails) { onOpenDetails(task.id); }
    console.log('Task card clicked:', task.id);
    // This will eventually trigger opening the TaskDetailModal
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow duration-200 border border-gray-200"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-base font-semibold text-gray-900 leading-tight pr-2">{task.title}</h4>
        <span className={`flex-shrink-0 px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityBadgeClass(task.priority)}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {task.description || 'No hay descripción.'}
      </p>

      <div className="flex items-center justify-between text-gray-500 text-xs">
        {formattedDueDate && (
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formattedDueDate}</span>
          </div>
        )}

        {task.assignedTo && (
          <div className="flex items-center ml-auto">
            {/* Simple avatar placeholder for assigned user */}
            <span className="bg-indigo-100 text-indigo-700 h-6 w-6 flex items-center justify-center rounded-full text-xs font-medium mr-1 uppercase">
              {task.assignedTo.charAt(0)}
            </span>
            <span>{task.assignedTo}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanTaskCard;