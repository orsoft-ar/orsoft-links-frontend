import { Link, Outlet } from 'react-router-dom';
import { OrSoftLogo } from '@/components/ui/Brand';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-center p-6">
        <Link to="/" aria-label="linkorsoft.site">
          <OrSoftLogo />
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
}