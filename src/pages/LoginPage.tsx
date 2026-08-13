import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { FormError, Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { ApiError } from '@/types/apiError';
import { getErrorMessage } from '@/utils/format';

interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>();

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      const from = (location.state as { from?: string } | null)?.from;
      navigate(from ?? '/dashboard', { replace: true });
    } catch (err) {
      if (err instanceof ApiError && err.statusCode === 401) {
        setError('root', { message: 'Credenciales inválidas' });
      } else {
        setError('root', { message: getErrorMessage(err) });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-navy">
          Iniciar sesión
        </h1>
        <p className="mt-2 text-slate/60">
          Ingresá para administrar tu página
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          placeholder="mateo@orsoft.site"
          autoComplete="email"
          {...register('email', {
            required: 'El email es obligatorio',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email inválido' },
          })}
          error={errors.email?.message}
        />
        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          {...register('password', { required: 'La contraseña es obligatoria' })}
          error={errors.password?.message}
        />
        {errors.root && <FormError>{errors.root.message}</FormError>}
        <Button
          type="submit"
          size="lg"
          loading={isSubmitting}
          className="w-full"
        >
          Iniciar sesión
        </Button>
      </form>

      <p className="text-center text-sm text-slate/60">
        ¿No tenés una cuenta?{' '}
        <Link
          to="/register"
          className="font-semibold text-orange hover:text-coral"
        >
          Crear cuenta
        </Link>
      </p>
    </div>
  );
}