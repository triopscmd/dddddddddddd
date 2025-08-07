```typescript
import React, { useState, useEffect } from 'react';
import { Project } from '../../store/projects/projectsStore';

// Define the shape of data returned from the project form, for both creation and update
// This interface matches the one in ProjectsPage.tsx
interface ProjectFormData {
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on_hold';
  startDate: string;
  endDate?: string;
}

interface ProjectFormModalProps {
  project: Project | null; // The project to edit, or null for a new project
  onSave: (data: ProjectFormData) => void;
  onClose: () => void;
}

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({ project, onSave, onClose }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    status: 'planning', // Default status for new projects
    startDate: new Date().toISOString().split('T')[0], // Today's date by default
    endDate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Effect to pre-fill the form when a project is passed for editing
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        status: project.status,
        startDate: project.startDate,
        endDate: project.endDate || '', // Ensure it's an empty string if undefined
      });
    } else {
      // Reset form for a new project if no project is provided or if it was previously editing
      setFormData({
        name: '',
        description: '',
        status: 'planning',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
      });
    }
    setErrors({}); // Clear errors when project changes or modal opens
  }, [project]);

  // Handler for input changes to update form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error message for the specific field as user types
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Function to validate form fields
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del proyecto es requerido.';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida.';
    }
    if (!formData.status) {
      newErrors.status = 'El estado es requerido.';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'La fecha de inicio es requerida.';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.startDate)) {
      newErrors.startDate = 'Formato de fecha de inicio inválido (YYYY-MM-DD).';
    }

    // Validate endDate only if it's provided
    if (formData.endDate) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.endDate)) {
        newErrors.endDate = 'Formato de fecha de fin inválido (YYYY-MM-DD).';
      } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
        newErrors.endDate = 'La fecha de fin no puede ser anterior a la fecha de inicio.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Convert empty endDate string to undefined as per Project type if applicable
      const dataToSave: ProjectFormData = {
        ...formData,
        endDate: formData.endDate || undefined,
      };
      onSave(dataToSave); // Call the onSave prop with validated data
    }
  };

  return (
    // Modal overlay
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
      {/* Modal content area */}
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-auto transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {project ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Cerrar modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre del Proyecto <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              aria-invalid={errors.description ? 'true' : 'false'}
              aria-describedby={errors.description ? 'description-error' : undefined}
            ></textarea>
            {errors.description && <p id="description-error" className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Estado <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              aria-invalid={errors.status ? 'true' : 'false'}
              aria-describedby={errors.status ? 'status-error' : undefined}
            >
              <option value="planning">Planificación</option>
              <option value="active">Activo</option>
              <option value="completed">Completado</option>
              <option value="on_hold">En Espera</option>
            </select>
            {errors.status && <p id="status-error" className="mt-1 text-sm text-red-600">{errors.status}</p>}
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Fecha de Inicio <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              aria-invalid={errors.startDate ? 'true' : 'false'}
              aria-describedby={errors.startDate ? 'startDate-error' : undefined}
            />
            {errors.startDate && <p id="startDate-error" className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              Fecha de Fin (Opcional)
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              aria-invalid={errors.endDate ? 'true' : 'false'}
              aria-describedby={errors.endDate ? 'endDate-error' : undefined}
            />
            {errors.endDate && <p id="endDate-error" className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              {project ? 'Guardar Cambios' : 'Crear Proyecto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;