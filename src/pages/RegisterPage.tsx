import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { FormError, Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { ApiError } from '@/types/apiError';
import { getErrorMessage, normalizeUsername } from '@/utils/format';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormValues>();

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser(values);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      if (err instanceof ApiError && err.statusCode === 409) {
        setError('root', { message: 'Ese nombre de usuario o email ya está en uso' });
      } else if (err instanceof ApiError && err.statusCode === 400) {
        setError('root', { message: getErrorMessage(err) });
      } else {
        setError('root', { message: getErrorMessage(err) });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-navy">
          Crear cuenta
        </h1>
        <p className="mt-2 text-slate/60">
          Creá tu página de links gratis
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nombre de usuario"
          placeholder="mateo"
          hint="3-30 caracteres. Letras, números, _ y -"
          autoComplete="username"
          {...register('username', {
            required: 'El username es obligatorio',
            minLength: { value: 3, message: 'Mínimo 3 caracteres' },
            maxLength: { value: 30, message: 'Máximo 30 caracteres' },
            pattern: {
              value: /^[a-z0-9_-]+$/,
              message: 'Solo letras, números, _ y -',
            },
            onChange: (e) =>
              setValue('username', normalizeUsername(e.target.value), {
                shouldValidate: true,
              }),
          })}
          error={errors.username?.message}
        />
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
          placeholder="Mínimo 6 caracteres"
          autoComplete="new-password"
          {...register('password', {
            required: 'La contraseña es obligatoria',
            minLength: { value: 6, message: 'Mínimo 6 caracteres' },
          })}
          error={errors.password?.message}
        />
        {errors.root && <FormError>{errors.root.message}</FormError>}
        <Button
          type="submit"
          size="lg"
          loading={isSubmitting}
          className="w-full"
        >
          Crear mi página gratis
        </Button>
      </form>

      <p className="text-center text-sm text-slate/60">
        ¿Ya tenés cuenta?{' '}
        <Link
          to="/login"
          className="font-semibold text-orange hover:text-coral"
        >
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}