```typescript
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Proyectos', path: '/projects', icon: '📂' },
    // { name: 'Informes', path: '/reports', icon: '📈' }, // Uncomment when ReportsPage is implemented
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 shadow-xl">
      <div className="text-3xl font-bold text-indigo-400 mb-8 text-center py-2">
        ProjectPilot
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-md transition-colors duration-200 ease-in-out
                  ${isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <span className="mr-3 text-xl">{link.icon}</span>
                <span className="font-medium text-lg">{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* Optional: Footer or user info section in sidebar */}
      {/* <div className="mt-auto pt-4 border-t border-gray-700 text-sm text-gray-400">
        <p className="text-center">© 2024 ProjectPilot</p>
      </div> */}
    </aside>
  );
};

export default Sidebar;