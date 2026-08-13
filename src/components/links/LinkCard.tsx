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
      className={`group flex items-center gap-3 rounded-2xl border bg-white px-3 py-3 shadow-sm transition-shadow hover:shadow-md ${
        link.active ? 'border-slate/15' : 'border-slate/10 opacity-70'
      }`}
    >
      <GripVertical
        className="h-5 w-5 shrink-0 cursor-grab text-slate/30 active:cursor-grabbing"
        aria-label="Arrastrar"
      />
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange/15 text-orange"
      >
        <LinkIcon name={link.icon} className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-slate">{link.title}</p>
        <p className="truncate text-xs text-slate/50">{link.url}</p>
      </div>

      <Switch
        checked={link.active}
        label={`${link.title} activo`}
        onChange={() => onToggleActive(link)}
      />

      <div className="flex items-center gap-1">
        <button
          onClick={() => onEdit(link)}
          aria-label={`Editar ${link.title}`}
          className="rounded-lg p-2 text-slate/50 transition-colors hover:bg-navy/10 hover:text-navy"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(link)}
          aria-label={`Eliminar ${link.title}`}
          className="rounded-lg p-2 text-slate/50 transition-colors hover:bg-coral/10 hover:text-coral"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}