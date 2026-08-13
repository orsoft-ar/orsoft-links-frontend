import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { OrSoftLogo } from '@/components/ui/Brand';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <OrSoftLogo />
      <h1 className="mt-8 text-6xl font-black text-navy">404</h1>
      <p className="mt-2 text-slate/60">
        La página que buscás no existe.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link to="/">
          <Button>Volver al inicio</Button>
        </Link>
        <Link to="/register">
          <Button variant="secondary">Crear mi linkorsoft.site</Button>
        </Link>
      </div>
    </div>
  );
}