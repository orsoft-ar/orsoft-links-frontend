import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { OrSoftLogo } from '@/components/ui/Brand';
import { PublicLinkButton } from '@/components/profile/PublicLinkButton';
import { useAuth } from '@/context/AuthContext';
import { DashboardProvider, useDashboard } from '@/context/DashboardContext';
import { DashboardSkeleton } from '@/components/ui/Loading';
import { Button } from '@/components/ui/Button';

function DashboardShell() {
  const { isAuthenticated, logout } = useAuth();
  const { page, loading } = useDashboard();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="p-6">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="flex flex-col border-b border-slate/10 bg-white lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-4">
          <Link to="/" aria-label="linkorsoft.site">
            <OrSoftLogo />
          </Link>
          <button
            className="rounded-lg p-2 text-slate/60 hover:bg-navy/10 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menú"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <nav className={`px-3 pb-4 ${menuOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="space-y-1 text-sm font-medium">
            <Link
              to="/dashboard"
              className="block rounded-xl bg-orange/10 px-4 py-2.5 text-orange"
            >
              Mi página
            </Link>
            <div className="pt-3">
              <PublicLinkButton page={page} />
            </div>
          </div>
        </nav>

        <div className="mt-auto hidden border-t border-slate/10 px-3 py-4 lg:block">
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-center"
          >
            Cerrar sesión
          </Button>
        </div>
        {menuOpen && (
          <div className="border-t border-slate/10 px-3 py-4 lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="w-full justify-center"
            >
              Cerrar sesión
            </Button>
          </div>
        )}
      </aside>

      <main className="flex-1 px-5 py-6 lg:px-10 lg:py-8">
        <Outlet />
      </main>
    </div>
  );
}

export function DashboardLayout() {
  return (
    <DashboardProvider>
      <DashboardShell />
    </DashboardProvider>
  );
}