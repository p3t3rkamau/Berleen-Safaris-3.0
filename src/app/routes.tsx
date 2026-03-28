import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { RootLayout } from './components/RootLayout';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Destinations } from './pages/Destinations';
import { DestinationDetail } from './pages/DestinationDetail';
import { Safaris } from './pages/Safaris';
import { SafariDetail } from './pages/SafariDetail';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';

// Admin Components
import AdminLogin from './pages/AdminLogin';
import { AuthProvider } from './components/AuthContext';

// Admin wrapper that provides auth context to admin routes
const AdminWrapper = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'destinations', Component: Destinations },
      { path: 'destinations/:country', Component: DestinationDetail },
      { path: 'safaris', Component: Safaris },
      { path: 'safari/:id', Component: SafariDetail },
      { path: 'gallery', Component: Gallery },
      { path: 'contact', Component: Contact },
    ],
  },
  
  // Admin Routes (only login page)
  {
    path: '/admin',
    element: <AdminWrapper />,
    children: [
      { path: 'login', element: <AdminLogin /> },
    ],
  },
]);