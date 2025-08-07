```typescript
import { create } from 'zustand';

// Define the Project type
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on_hold';
  startDate: string;
  endDate?: string;
  tasksCount: number;
  completedTasksCount: number;
}

// Define the state structure for projects
interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

// Define the actions that can modify the project state
interface ProjectActions {
  fetchProjects: () => Promise<void>;
  addProject: (newProject: Project) => Promise<void>;
  updateProject: (updatedProject: Project) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  setError: (message: string | null) => void;
  clearError: () => void;
}

// Combine state and actions into a single type for the store
type ProjectStore = ProjectState & ProjectActions;

// Mock data (replace with actual API calls or localStorage persistence later)
const MOCK_PROJECTS_DATA: Project[] = [
  {
    id: 'p1',
    name: 'Desarrollo de Plataforma Core',
    description: 'Construcción de la infraestructura principal y módulos esenciales de la aplicación.',
    status: 'active',
    startDate: '2023-01-15',
    endDate: undefined,
    tasksCount: 15,
    completedTasksCount: 7,
  },
  {
    id: 'p2',
    name: 'Diseño y Prototipado UX/UI',
    description: 'Creación de wireframes, mockups y prototipos para una experiencia de usuario intuitiva.',
    status: 'active',
    startDate: '2023-02-01',
    endDate: undefined,
    tasksCount: 10,
    completedTasksCount: 3,
  },
  {
    id: 'p3',
    name: 'Optimización de Base de Datos',
    description: 'Análisis y mejora del rendimiento de las consultas y estructura de la base de datos.',
    status: 'completed',
    startDate: '2022-11-01',
    endDate: '2023-01-30',
    tasksCount: 8,
    completedTasksCount: 8,
  },
  {
    id: 'p4',
    name: 'Implementación de Autenticación OAuth',
    description: 'Integración de servicios de autenticación de terceros (Google, GitHub) en la aplicación.',
    status: 'planning',
    startDate: '2024-04-10',
    endDate: undefined,
    tasksCount: 6,
    completedTasksCount: 0,
  },
  {
    id: 'p5',
    name: 'Módulo de Reportes Avanzados',
    description: 'Desarrollo de funcionalidades para generar informes detallados y personalizables.',
    status: 'on_hold',
    startDate: '2024-03-01',
    endDate: undefined,
    tasksCount: 4,
    completedTasksCount: 0,
  },
];

export const useProjectStore = create<ProjectStore>((set, get) => ({
  // Initial state
  projects: [],
  loading: false,
  error: null,

  // Actions
  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real app, this would be an actual fetch call:
      // const response = await api.get('/projects');
      // set({ projects: response.data, loading: false });
      set({ projects: MOCK_PROJECTS_DATA, loading: false });
    } catch (err) {
      const errorMessage = (err instanceof Error) ? err.message : 'Error desconocido al cargar los proyectos.';
      set({ error: errorMessage, loading: false });
      console.error('Failed to fetch projects:', err);
    }
  },

  addProject: async (newProject: Project) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      set(state => ({
        projects: [...state.projects, newProject],
        loading: false,
      }));
      // In a real app, send newProject to API and handle response:
      // const response = await api.post('/projects', newProjectData);
      // set(state => ({ projects: [...state.projects, response.data], loading: false }));
    } catch (err) {
      const errorMessage = (err instanceof Error) ? err.message : 'Error desconocido al añadir el proyecto.';
      set({ error: errorMessage, loading: false });
      console.error('Failed to add project:', err);
    }
  },

  updateProject: async (updatedProject: Project) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      set(state => ({
        projects: state.projects.map(p =>
          p.id === updatedProject.id ? updatedProject : p
        ),
        loading: false,
      }));
      // In a real app:
      // await api.put(`/projects/${updatedProject.id}`, updatedProject);
    } catch (err) {
      const errorMessage = (err instanceof Error) ? err.message : 'Error desconocido al actualizar el proyecto.';
      set({ error: errorMessage, loading: false });
      console.error('Failed to update project:', err);
    }
  },

  deleteProject: async (projectId: string) => {
    set({ loading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      set(state => ({
        projects: state.projects.filter(p => p.id !== projectId),
        loading: false,
      }));
      // In a real app:
      // await api.delete(`/projects/${projectId}`);
    } catch (err) {
      const errorMessage = (err instanceof Error) ? err.message : 'Error desconocido al eliminar el proyecto.';
      set({ error: errorMessage, loading: false });
      console.error('Failed to delete project:', err);
    }
  },

  setLoading: (isLoading: boolean) => set({ loading: isLoading }),

  setError: (message: string | null) => set({ error: message, loading: false }),

  clearError: () => set({ error: null }),
}));