import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { initAnalytics } from '@/utils/analytics';
import { ProtectedRoute, PublicOnlyRoute } from '@/router/guards';
import { DashboardPage } from '@/pages/DashboardPage';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PublicNotFoundPage } from '@/pages/PublicNotFoundPage';
import { PublicProfilePage } from '@/pages/PublicProfilePage';
import { RegisterPage } from '@/pages/RegisterPage';

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
        ],
      },
    ],
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: '/login', element: <AuthLayout />, children: [{ index: true, element: <LoginPage /> }] },
      { path: '/register', element: <AuthLayout />, children: [{ index: true, element: <RegisterPage /> }] },
    ],
  },
  { path: '/', element: <LandingPage /> },
  { path: '/:username', element: <PublicProfilePage /> },
  { path: '/404', element: <PublicNotFoundPage /> },
  { path: '*', element: <NotFoundPage /> },
]);

export function App() {
  initAnalytics();
  return (
    <>
      <RouterProvider router={router} />
      <CookieBanner />
    </>
  );
}