```typescript
import { create } from 'zustand';

// Define the Task type
export interface Task {
  id: string;
  projectId: string; // To link tasks to specific projects
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'blocked' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string; // ISO date string (YYYY-MM-DD)
  assignedTo?: string; // e.g., username or user ID
}

// Define the state structure for tasks
interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

// Define the actions that can modify the task state
interface TaskActions {
  fetchTasks: (projectId?: string) => Promise<void>;
  addTask: (newTask: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (updatedTask: Task) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  setError: (message: string | null) => void;
  clearError: () => void;
}

// Combine state and actions into a single type for the store
type TaskStore = TaskState & TaskActions;

// Mock data (replace with actual API calls or localStorage persistence later)
const MOCK_TASKS_DATA: Task[] = [
  {
    id: 't1',
    projectId: 'p1',
    title: 'Configurar entorno de desarrollo',
    description: 'Instalar Node.js, npm, Git, y configurar el proyecto Vite.',
    status: 'done',
    priority: 'high',
    dueDate: '2023-01-20',
    assignedTo: 'Alice',
  },
  {
    id: 't2',
    projectId: 'p1',
    title: 'Diseñar esquema de base de datos',
    description: 'Definir tablas para usuarios, proyectos, tareas y relaciones.',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2023-02-05',
    assignedTo: 'Bob',
  },
  {
    id: 't3',
    projectId: 'p1',
    title: 'Implementar autenticación de usuarios',
    description: 'Desarrollar funciones de registro, login y logout con JWT.',
    status: 'todo',
    priority: 'high',
    dueDate: '2023-02-20',
    assignedTo: 'Alice',
  },
  {
    id: 't4',
    projectId: 'p2',
    title: 'Crear wireframes para Dashboard',
    description: 'Diseñar la estructura de la página principal del dashboard.',
    status: 'done',
    priority: 'medium',
    dueDate: '2023-02-10',
    assignedTo: 'Charlie',
  },
  {
    id: 't5',
    projectId: 'p2',
    title: 'Prototipar flujo de creación de proyectos',
    description: 'Crear un prototipo interactivo para el formulario de nuevo proyecto.',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2023-02-25',
    assignedTo: 'Charlie',
  },
  {
    id: 't6',
    projectId: 'p1',
    title: 'Desarrollar API de Proyectos',
    description: 'Endpoints para CRUD de proyectos.',
    status: 'todo',
    priority: 'high',
    dueDate: '2023-03-01',
    assignedTo: 'Bob',
  },
  {
    id: 't7',
    projectId: 'p3',
    title: 'Análisis de índices existentes',
    description: 'Revisar y optimizar índices de la base de datos para mejorar el rendimiento de consulta.',
    status: 'completed',
    priority: 'high',
    dueDate: '2023-01-15',
    assignedTo: 'David',
  },
  {
    id: 't8',
    projectId: 'p3',
    title: 'Refactorizar consultas lentas',
    description: 'Identificar y reescribir consultas SQL con bajo rendimiento.',
    status: 'completed',
    priority: 'medium',
    dueDate: '2023-01-25',
    assignedTo: 'David',
  },
  {
    id: 't9',
    projectId: 'p1',
    title: 'Integrar componentes de UI (Tailwind CSS)',
    description: 'Aplicar estilos Tailwind a los componentes de React existentes.',
    status: 'blocked',
    priority: 'medium',
    dueDate: '2023-02-28',
    assignedTo: 'Alice',
  },
  {
    id: 't10',
    projectId: 'p2',
    title: 'Revisión de usabilidad con usuarios',
    description: 'Realizar pruebas de usabilidad con un grupo de usuarios y recoger feedback.',
    status: 'todo',
    priority: 'low',
    dueDate: '2023-03-10',
    assignedTo: 'Charlie',
  },
];

export const useTaskStore = create<TaskStore>((set, get) => ({
  // Initial state
  tasks: [],
  loading: false,
  error: null,

  // Actions
  fetchTasks: async (projectId?: string) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call delay
      let filteredTasks = MOCK_TASKS_DATA;
      if (projectId) {
        filteredTasks = MOCK_TASKS_DATA.filter(task => task.projectId === projectId);
      }
      set({ tasks: filteredTasks, loading: false });
    } catch (err) {
      const errorMessage = (err instanceof Error) ? err.message : 'Error desconocido al cargar las tareas.';
      set({ error: errorMessage, loading: false });
      console.error('Failed to fetch tasks:', err);
    }
  },

  addTask: async (newTaskData: Omit<Task, 'id'>) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call delay
      const newTask: Task = {
        ...newTaskData,
        id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // Generate a unique ID
      };
      set(state => ({
        tasks: [...state.tasks, newTask],
        loading: false,
      }));
      // In a real app, send newTaskData to API and handle response
      // const response = await api.post('/tasks', newTaskData);
      // set(state => ({ tasks: [...state.tasks, response.data], loading: false }));
    } catch (err) {
      const errorMessage = (err instanceof Error) ? err.message : 'Error desconocido al añadir la tarea.';
      set({ error: errorMessage, loading: false });
      console.error('Failed to add task:', err);
    }
  },

  updateTask: async (updatedTask: Task) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call delay
      set(state => ({
        tasks: state.tasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        ),
        loading: false,
      }));
      // In a real app:
      // await api.put(`/tasks/${updatedTask.id}`, updatedTask);
    } catch (err) {
      const errorMessage = (err instanceof Error) ? err.message : 'Error desconocido al actualizar la tarea.';
      set({ error: errorMessage, loading: false });
      console.error('Failed to update task:', err);
    }
  },

  deleteTask: async (taskId: string) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call delay
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== taskId),
        loading: false,
      }));
      // In a real app:
      // await api.delete(`/tasks/${taskId}`);
    } catch (err) {
      const errorMessage = (err instanceof Error) ? err.message : 'Error desconocido al eliminar la tarea.';
      set({ error: errorMessage, loading: false });
      console.error('Failed to delete task:', err);
    }
  },

  setLoading: (isLoading: boolean) => set({ loading: isLoading }),

  setError: (message: string | null) => set({ error: message, loading: false }),

  clearError: () => set({ error: null }),
}));