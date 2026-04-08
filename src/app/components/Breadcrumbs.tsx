// src/components/Breadcrumbs.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  path: string;
}

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    ...pathnames.map((value, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      const name = value.charAt(0).toUpperCase() + value.slice(1);
      return { name, path };
    })
  ];

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="bg-gray-50 py-3 px-4 border-b" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <li key={item.path} className="flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-600 font-medium">{item.name}</span>
              ) : (
                <Link 
                  to={item.path}
                  className="text-[var(--safari-gold)] hover:text-[var(--safari-orange)] transition-colors flex items-center gap-1"
                >
                  {index === 0 && <Home className="w-4 h-4" />}
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};