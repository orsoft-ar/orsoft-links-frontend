import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import type { Link } from '@/types/link';
import { LinkIcon } from '@/components/ui/Brand';
import { Switch } from '@/components/ui/Switch';

interface LinkCardProps {
  link: Link;
  onToggleActive: (link: Link) => void;
  onEdit: (link: Link) => void;
  onDelete: (link: Link) => void;
}

export function LinkCard({ link, onToggleActive, onEdit, onDelete }: LinkCardProps) {
  return (
    <div
      className={`group flex items-center gap-2 rounded-2xl border bg-white px-2 py-2.5 shadow-sm transition-shadow hover:shadow-md sm:gap-3 sm:px-3 sm:py-3 ${
        link.active ? 'border-slate/15' : 'border-slate/10 opacity-70'
      }`}
    >
      <GripVertical
        className="h-5 w-5 shrink-0 cursor-grab text-slate/30 active:cursor-grabbing"
        aria-label="Arrastrar"
      />
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange/15 text-orange sm:h-10 sm:w-10"
      >
        <LinkIcon name={link.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-slate">{link.title}</p>
        <p className="hidden truncate text-xs text-slate/50 sm:block">{link.url}</p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Switch
          checked={link.active}
          label={`${link.title} activo`}
          onChange={() => onToggleActive(link)}
        />
        <button
          onClick={() => onEdit(link)}
          aria-label={`Editar ${link.title}`}
          className="rounded-lg p-1.5 text-slate/50 transition-colors hover:bg-navy/10 hover:text-navy sm:p-2"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(link)}
          aria-label={`Eliminar ${link.title}`}
          className="rounded-lg p-1.5 text-slate/50 transition-colors hover:bg-coral/10 hover:text-coral sm:p-2"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}