```typescript
import React from 'react';
import KanbanTaskCard from './KanbanTaskCard';
import { Task } from '../../store/tasks/tasksStore';

interface KanbanColumnProps {
  id: string; // Unique ID for the column, e.g., 'todo', 'in-progress'
  title: string;
  tasks: Task[];
  // Future props for drag and drop functionality
  // onAddTask?: (columnId: string) => void;
  // onMoveTask?: (taskId: string, newColumnId: string, newIndex: number) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, title, tasks }) => {
  return (
    <div
      className="flex-shrink-0 w-80 bg-gray-100 rounded-lg shadow-md p-4 flex flex-col"
      data-column-id={id} // Useful for drag and drop
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
        {title} ({tasks.length})
      </h3>
      <div className="flex-1 space-y-4 overflow-y-auto pr-2 -mr-2"> {/* Added pr-2 -mr-2 for scrollbar inside padding */}
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">No hay tareas en esta columna.</p>
        ) : (
          tasks.map((task) => (
            <KanbanTaskCard key={task.id} task={task} />
          ))
        )}
      </div>
      {/* Optional: Add task button */}
      {/* <button
        onClick={() => onAddTask && onAddTask(id)}
        className="mt-4 w-full py-2 px-4 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors duration-200 text-sm font-medium flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Añadir Tarea
      </button> */}
    </div>
  );
};

export default KanbanColumn;