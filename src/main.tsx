import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { App } from '@/App';
import { AuthProvider } from '@/context/AuthContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#002b5b',
            color: '#f9f5eb',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#ea5455', secondary: '#f9f5eb' } },
        }}
      />
    </AuthProvider>
  </StrictMode>,
);