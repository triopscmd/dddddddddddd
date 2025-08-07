```typescript
import React, { useState, useEffect } from 'react';
import { Task } from '../../store/tasks/tasksStore';

// Define the shape of data for the form fields
interface TaskFormData {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'blocked' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string; // YYYY-MM-DD format
  assignedTo: string;
}

interface TaskDetailModalProps {
  task: Task; // The task object to view/edit
  onSave: (updatedTask: Task) => void; // Callback when save button is clicked with the updated task
  onClose: () => void; // Callback when modal is closed
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, onSave, onClose }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    assignedTo: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Effect to pre-fill the form when the modal opens or a different task is passed
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '', // Ensure description is a string
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate || '', // Ensure dueDate is a string
        assignedTo: task.assignedTo || '', // Ensure assignedTo is a string
      });
    }
    setErrors({}); // Clear any previous errors
  }, [task]);

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

    if (!formData.title.trim()) {
      newErrors.title = 'El título de la tarea es requerido.';
    }
    if (!formData.status) {
      newErrors.status = 'El estado es requerido.';
    }
    if (!formData.priority) {
      newErrors.priority = 'La prioridad es requerida.';
    }

    // Validate dueDate only if it's provided and not empty
    if (formData.dueDate) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.dueDate)) {
        newErrors.dueDate = 'Formato de fecha de vencimiento inválido (YYYY-MM-DD).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Construct the updated task object, preserving original id and projectId
      const updatedTask: Task = {
        ...task, // Keep original id and projectId
        ...formData,
        // Convert empty strings to undefined for optional fields as per Task interface
        description: formData.description || undefined,
        dueDate: formData.dueDate || undefined,
        assignedTo: formData.assignedTo || undefined,
      };
      onSave(updatedTask); // Call the onSave prop with the validated updated task
    }
  };

  return (
    // Modal overlay
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
      {/* Modal content area */}
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-auto transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Detalles de Tarea
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
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              aria-invalid={errors.title ? 'true' : 'false'}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && <p id="title-error" className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          {/* Status */}
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
              <option value="todo">Por Hacer</option>
              <option value="in-progress">En Progreso</option>
              <option value="blocked">Bloqueado</option>
              <option value="done">Hecho</option>
            </select>
            {errors.status && <p id="status-error" className="mt-1 text-sm text-red-600">{errors.status}</p>}
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Prioridad <span className="text-red-500">*</span>
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              aria-invalid={errors.priority ? 'true' : 'false'}
              aria-describedby={errors.priority ? 'priority-error' : undefined}
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
            {errors.priority && <p id="priority-error" className="mt-1 text-sm text-red-600">{errors.priority}</p>}
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Fecha de Vencimiento (Opcional)
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              aria-invalid={errors.dueDate ? 'true' : 'false'}
              aria-describedby={errors.dueDate ? 'dueDate-error' : undefined}
            />
            {errors.dueDate && <p id="dueDate-error" className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
          </div>

          {/* Assigned To */}
          <div>
            <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
              Asignado A (Opcional)
            </label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Action buttons */}
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
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailModal;