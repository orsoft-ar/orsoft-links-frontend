import { useForm } from 'react-hook-form';
import type { LinkPage } from '@/types/linkPage';
import { Button } from '@/components/ui/Button';
import { FormError, Input, TextArea } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { normalizeUsername } from '@/utils/format';

interface ProfileFormValues {
  username: string;
  title: string;
  description: string;
  profileImageUrl: string;
  isPublic: boolean;
}

interface ProfileEditorProps {
  page: LinkPage;
  saving: boolean;
  error: string | null;
  onSave: (values: ProfileFormValues) => void;
}

export function ProfileEditor({ page, saving, error, onSave }: ProfileEditorProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    values: {
      username: page.username,
      title: page.title,
      description: page.description ?? '',
      profileImageUrl: page.profileImageUrl ?? '',
      isPublic: page.isPublic,
    },
  });

  const isPublic = watch('isPublic');

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSave)}>
      <Input
        label="Nombre de usuario"
        hint="Será tu URL pública."
        placeholder="mateo"
        {...register('username', {
          required: 'El username es obligatorio',
          minLength: { value: 3, message: 'Mínimo 3 caracteres' },
          maxLength: { value: 30, message: 'Máximo 30 caracteres' },
          pattern: {
            value: /^[a-z0-9_-]+$/,
            message: 'Solo letras, números, _ y -',
          },
          onChange: (e) =>
            setValue('username', normalizeUsername(e.target.value), { shouldValidate: true }),
        })}
        error={errors.username?.message}
      />

      <Input
        label="Título"
        placeholder="Mateo Gerbaudo"
        {...register('title', {
          required: 'El título es obligatorio',
          maxLength: { value: 120, message: 'Máximo 120 caracteres' },
        })}
        error={errors.title?.message}
      />

      <TextArea
        label="Descripción"
        placeholder="Desarrollador Full Stack"
        {...register('description', {
          maxLength: { value: 300, message: 'Máximo 300 caracteres' },
        })}
        error={errors.description?.message}
      />

      <Input
        label="Imagen de perfil (URL)"
        type="url"
        placeholder="https://ejemplo.com/perfil.png"
        {...register('profileImageUrl', {
          pattern: {
            value: /^https?:\/\/.+/,
            message: 'La URL debe empezar con http:// o https://',
          },
        })}
        error={errors.profileImageUrl?.message}
      />

      <div className="flex items-center justify-between rounded-xl border border-slate/15 bg-white px-4 py-3">
        <div>
          <p className="font-semibold text-slate">Página pública</p>
          <p className="text-xs text-slate/50">
            {isPublic
              ? 'Cualquiera puede ver tu página'
              : 'Solo vos podés ver tu página'}
          </p>
        </div>
        <Switch
          checked={isPublic}
          label="Página pública"
          onChange={(checked) => setValue('isPublic', checked)}
        />
      </div>

      {error && <FormError>{error}</FormError>}

      <Button type="submit" loading={saving} className="w-full sm:w-auto">
        Guardar cambios
      </Button>
    </form>
  );
}