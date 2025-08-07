```typescript
import React, { useEffect, useMemo } from 'react';
import { useTaskStore, Task } from '../../store/tasks/tasksStore';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  projectId: string;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ projectId }) => {
  const { tasks, loading, error, fetchTasks } = useTaskStore();

  useEffect(() => {
    // Fetch tasks specifically for this projectId
    fetchTasks(projectId);
  }, [projectId, fetchTasks]);

  // Define Kanban columns
  const columns = [
    { id: 'todo', title: 'Por Hacer', status: 'todo' },
    { id: 'in-progress', title: 'En Progreso', status: 'in-progress' },
    { id: 'blocked', title: 'Bloqueado', status: 'blocked' },
    { id: 'done', title: 'Hecho', status: 'done' },
  ];

  // Filter tasks to only include those belonging to the current project
  const allTasksForThisProject = useMemo(() => {
    return tasks.filter(task => task.projectId === projectId);
  }, [tasks, projectId]);

  // Group tasks by status for each column
  const groupedTasks = useMemo(() => {
    const groups: { [key: string]: Task[] } = {};
    columns.forEach(column => {
      groups[column.status] = []; // Initialize each column with an empty array
    });

    allTasksForThisProject.forEach(task => {
      // Ensure task's status is one of our defined columns
      if (groups[task.status]) {
        groups[task.status].push(task);
      }
    });
    return groups;
  }, [allTasksForThisProject, columns]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-xl text-gray-600">
        Cargando tareas del tablero...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-10 text-xl text-red-600">
        Error al cargar tareas: {error}
      </div>
    );
  }

  // Display a message if there are no tasks for this specific project
  if (allTasksForThisProject.length === 0 && !loading && !error) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        No hay tareas asignadas a este proyecto. ¡Crea una para empezar!
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-4">
      {columns.map(column => (
        <KanbanColumn
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={groupedTasks[column.status] || []}
          // Future: Pass handlers for adding/moving tasks (e.g., onAddTask, onMoveTask)
        />
      ))}
    </div>
  );
};

export default KanbanBoard;