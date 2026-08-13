import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import type { Link } from '@/types/link';
import { Button } from '@/components/ui/Button';
import { FormError, Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { LINK_ICONS } from '@/constants/linkIcons';
import { getErrorMessage } from '@/utils/format';

interface LinkFormValues {
  title: string;
  url: string;
  icon: string;
  whatsappNumber: string;
  emailAddress: string;
}

type LinkSubmitValues = Pick<LinkFormValues, 'title' | 'url' | 'icon'>;

const WHATSAPP_URL_RE = /^https?:\/\/wa\.me\/(\d+)/;
const MAILTO_RE = /^mailto:([^?]+)/;

interface LinkEditorModalProps {
  open: boolean;
  link: Link | null;
  saving: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (values: LinkSubmitValues) => void;
}

export function LinkEditorModal({
  open,
  link,
  saving,
  error,
  onClose,
  onSubmit,
}: LinkEditorModalProps) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LinkFormValues>({
    defaultValues: {
      title: link?.title ?? '',
      url: link?.url ?? '',
      icon: link?.icon ?? 'globe',
      whatsappNumber: getWhatsappNumber(link),
      emailAddress: getEmailAddress(link),
    },
    values: {
      title: link?.title ?? '',
      url: link?.url ?? '',
      icon: link?.icon ?? 'globe',
      whatsappNumber: getWhatsappNumber(link),
      emailAddress: getEmailAddress(link),
    },
  });

  const isEditing = Boolean(link);
  const selectedIcon = watch('icon');
  const isWhatsapp = selectedIcon === 'whatsapp';
  const isMail = selectedIcon === 'mail';
  const [waMode, setWaMode] = useState<'number' | 'url'>(
    getWhatsappNumber(link) ? 'number' : 'url',
  );
  const [mailMode, setMailMode] = useState<'email' | 'url'>(
    getEmailAddress(link) ? 'email' : 'url',
  );

  const submit = handleSubmit((values) => {
    let url = values.url;
    if (isWhatsapp && waMode === 'number' && values.whatsappNumber.trim()) {
      url = buildWhatsappUrl(values.whatsappNumber);
    } else if (isMail && mailMode === 'email' && values.emailAddress.trim()) {
      url = buildMailtoUrl(values.emailAddress);
    }
    onSubmit({
      title: values.title,
      icon: values.icon,
      url,
    });
  });

  const handleIconChange = (iconValue: string) => {
    const isNewIcon = iconValue !== selectedIcon;
    setValue('icon', iconValue);
    if (isNewIcon) {
      setValue('url', '');
      setValue('whatsappNumber', '');
      setValue('emailAddress', '');
      const icon = LINK_ICONS.find((i) => i.value === iconValue);
      if (icon) setValue('title', icon.label);
    }
  };

  return (
    <Modal
      open={open}
      title={isEditing ? 'Editar link' : 'Agregar link'}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={submit} loading={saving}>
            {isEditing ? 'Guardar cambios' : 'Agregar link'}
          </Button>
        </>
      }
    >
      <form className="space-y-4" onSubmit={submit}>
        <Input
          label="Título"
          placeholder="Mi Portfolio"
          {...register('title', {
            required: 'El título es obligatorio',
            maxLength: { value: 120, message: 'Máximo 120 caracteres' },
          })}
          error={errors.title?.message}
        />
        {isWhatsapp && (
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-slate">Destino del link</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setWaMode('number')}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                  waMode === 'number'
                    ? 'border-coral bg-coral/10 text-coral'
                    : 'border-slate/15 bg-white text-slate/60 hover:border-orange hover:text-orange'
                }`}
              >
                Número de WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setWaMode('url')}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                  waMode === 'url'
                    ? 'border-coral bg-coral/10 text-coral'
                    : 'border-slate/15 bg-white text-slate/60 hover:border-orange hover:text-orange'
                }`}
              >
                Link propio
              </button>
            </div>
            {waMode === 'number' ? (
              <Input
                label="Número de WhatsApp"
                type="tel"
                inputMode="numeric"
                placeholder="5493547651736"
                hint="Solo números, con código de país. Ej: 5493547651736"
                {...register('whatsappNumber', {
                  required: 'El número es obligatorio',
                  pattern: {
                    value: /^\d+$/,
                    message: 'Solo se permiten números',
                  },
                })}
                error={errors.whatsappNumber?.message}
              />
            ) : (
              <Input
                label="URL del chat"
                type="url"
                placeholder="https://wa.me/5493547651736"
                hint="Pegá el link completo de tu chat de WhatsApp."
                {...register('url', {
                  required: 'La URL es obligatoria',
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: 'La URL debe empezar con http:// o https://',
                  },
                })}
                error={errors.url?.message}
              />
            )}
          </div>
        )}
        {isMail && (
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-slate">Destino del link</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMailMode('email')}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                  mailMode === 'email'
                    ? 'border-coral bg-coral/10 text-coral'
                    : 'border-slate/15 bg-white text-slate/60 hover:border-orange hover:text-orange'
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setMailMode('url')}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                  mailMode === 'url'
                    ? 'border-coral bg-coral/10 text-coral'
                    : 'border-slate/15 bg-white text-slate/60 hover:border-orange hover:text-orange'
                }`}
              >
                Link propio
              </button>
            </div>
            {mailMode === 'email' ? (
              <Input
                label="Tu email"
                type="email"
                placeholder="hola@ejemplo.com"
                hint="El link se genera solo y abre el correo con tu dirección."
                {...register('emailAddress', {
                  required: 'El email es obligatorio',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Ingresá un email válido',
                  },
                })}
                error={errors.emailAddress?.message}
              />
            ) : (
              <Input
                label="URL"
                type="url"
                placeholder="https://ejemplo.com"
                hint="Pegá el link completo que quieras usar."
                {...register('url', {
                  required: 'La URL es obligatoria',
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: 'La URL debe empezar con http:// o https://',
                  },
                })}
                error={errors.url?.message}
              />
            )}
          </div>
        )}
        {!isWhatsapp && !isMail && (
          <Input
            label="URL"
            type="url"
            placeholder="https://ejemplo.com"
            {...register('url', {
              required: 'La URL es obligatoria',
              pattern: {
                value: /^https?:\/\/.+/,
                message: 'La URL debe empezar con http:// o https://',
              },
            })}
            error={errors.url?.message}
          />
        )}

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-slate">Ícono</span>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {LINK_ICONS.map((icon) => (
              <Controller
                key={icon.value}
                name="icon"
                control={control}
                render={({ field }) => {
                  const selected = field.value === icon.value;
                  return (
                    <button
                      type="button"
                      onClick={() => handleIconChange(icon.value)}
                      className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-2 text-xs font-medium transition-colors ${
                        selected
                          ? 'border-coral bg-coral/10 text-coral'
                          : 'border-slate/15 bg-white text-slate/60 hover:border-orange hover:text-orange'
                      }`}
                    >
                      <span className="text-lg leading-none">{iconToGlyph(icon.value)}</span>
                      {icon.label}
                    </button>
                  );
                }}
              />
            ))}
          </div>
        </div>

        {error && <FormError>{getErrorMessage(error)}</FormError>}
      </form>
    </Modal>
  );
}

function iconToGlyph(value: string): string {
  const glyphs: Record<string, string> = {
    globe: '🌐',
    github: '⌥',
    linkedin: 'in',
    instagram: '◎',
    whatsapp: '✆',
    twitter: '𝕏',
    youtube: '▶',
    tiktok: '♪',
    facebook: 'ƒ',
    mail: '✉',
    link: '⛓',
    store: '🛒',
  };
  return glyphs[value] ?? '🔗';
}

function getWhatsappNumber(link: Link | null): string {
  if (!link) return '';
  const match = link.url.match(WHATSAPP_URL_RE);
  return match ? match[1] : '';
}

function buildWhatsappUrl(number: string): string {
  return `https://wa.me/${number}`;
}

function getEmailAddress(link: Link | null): string {
  if (!link) return '';
  const match = link.url.match(MAILTO_RE);
  return match ? match[1] : '';
}

function buildMailtoUrl(email: string): string {
  return `mailto:${email}`;
}