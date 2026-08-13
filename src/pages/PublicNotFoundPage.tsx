import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function PublicNotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <h1 className="text-3xl font-extrabold text-navy">Esta página no existe</h1>
      <p className="mt-2 max-w-sm text-slate/60">
        Esa página no fue encontrada o no es pública.
      </p>
      <Link to="/register" className="mt-6">
        <Button size="lg">Crear mi linkorsoft.site</Button>
      </Link>
    </div>
  );
}