import React from 'react';
import { Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { TopBar } from '../components/TopBar';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
