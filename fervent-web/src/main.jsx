import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import Router from './components/browser-router/Router';
import AppProvider from './components/context-provider/AppContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={Router} />
    </AppProvider>
  </StrictMode>,
);
