import { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { initAnalytics } from '@/utils/analytics';
import { ProtectedRoute, PublicOnlyRoute } from '@/router/guards';

const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);
const LandingPage = lazy(() =>
  import('@/pages/LandingPage').then((m) => ({ default: m.LandingPage })),
);
const LoginPage = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);
const PublicNotFoundPage = lazy(() =>
  import('@/pages/PublicNotFoundPage').then((m) => ({ default: m.PublicNotFoundPage })),
);
const PublicProfilePage = lazy(() =>
  import('@/pages/PublicProfilePage').then((m) => ({ default: m.PublicProfilePage })),
);
const RegisterPage = lazy(() =>
  import('@/pages/RegisterPage').then((m) => ({ default: m.RegisterPage })),
);

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-8">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-navy border-t-transparent" />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <DashboardPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: '/login',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <LoginPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '/register',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <RegisterPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  { path: '/', element: <Suspense fallback={<PageLoader />}><LandingPage /></Suspense> },
  { path: '/:username', element: <Suspense fallback={<PageLoader />}><PublicProfilePage /></Suspense> },
  { path: '/404', element: <Suspense fallback={<PageLoader />}><PublicNotFoundPage /></Suspense> },
  { path: '*', element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense> },
]);

export function App() {
  useEffect(() => {
    initAnalytics();
  }, []);
  return (
    <>
      <RouterProvider router={router} />
      <CookieBanner />
    </>
  );
}