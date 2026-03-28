import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './components/RootLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Destinations } from './pages/Destinations';
import { DestinationDetail } from './pages/DestinationDetail';
import { Safaris } from './pages/Safaris';
import { SafariDetail } from './pages/SafariDetail';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';

export const router = createBrowserRouter([
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
]);
