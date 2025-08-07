```typescript
import React from 'react';
import { useAuthStore } from '../store/auth/authStore';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  const overviewStats = [
    { label: 'Proyectos Activos', value: 5, icon: '🚀' },
    { label: 'Tareas Pendientes', value: 12, icon: '✍️' },
    { label: 'Proyectos Completados (este mes)', value: 2, icon: '✅' },
    { label: 'Miembros del Equipo', value: 8, icon: '👥' },
  ];

  const recentActivities = [
    { id: 1, type: 'tarea', description: 'Creación de la API de autenticación', project: 'Plataforma Core', date: 'Hace 2 horas' },
    { id: 2, type: 'proyecto', description: 'Inicio del proyecto "Migración de Datos"', project: 'Migración de Datos', date: 'Ayer' },
    { id: 3, type: 'comentario', description: 'Revisión de diseño UI', project: 'Diseño Web', date: 'Hace 3 días' },
    { id: 4, type: 'tarea', description: 'Implementar formulario de registro', project: 'Plataforma Core', date: 'Hace 5 días' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        Bienvenido, {user?.username || user?.email || 'Usuario'}!
      </h1>
      <p className="text-gray-600 text-lg mb-8">Un vistazo rápido a tu progreso.</p>

      {/* Overview Statistics */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">Resumen General</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center transition-transform transform hover:scale-105 duration-200"
            >
              <div className="text-5xl mb-3">{stat.icon}</div>
              <p className="text-gray-500 text-sm font-medium uppercase">{stat.label}</p>
              <p className="text-4xl font-bold text-indigo-600 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activities */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">Actividad Reciente</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ul className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="py-4 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-indigo-600 uppercase mr-2">
                    {activity.type}:
                  </span>
                  <span className="text-gray-800 font-medium">{activity.description}</span>
                  <p className="text-gray-500 text-sm mt-1">
                    Proyecto: <span className="font-medium">{activity.project}</span>
                  </p>
                </div>
                <span className="text-gray-400 text-sm">{activity.date}</span>
              </li>
            ))}
            {recentActivities.length === 0 && (
              <li className="py-4 text-center text-gray-500">No hay actividad reciente.</li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;