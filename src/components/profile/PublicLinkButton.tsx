import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import type { LinkPage } from '@/types/linkPage';
import { LinkIcon } from '@/components/ui/Brand';
import { Button } from '@/components/ui/Button';

const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL ?? 'https://linkorsoft.site';

interface PublicLinkButtonProps {
  page: LinkPage | null;
}

export function PublicLinkButton({ page }: PublicLinkButtonProps) {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const username = page?.username ?? user?.username ?? '';
  const publicUrl = `${PUBLIC_URL}/@${username}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      toast.success('Link copiado');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('No se pudo copiar el link');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button variant="secondary" size="sm" onClick={copyLink}>
        <LinkIcon name="link" />
        {copied ? 'Link copiado' : 'Copiar link'}
      </Button>
      <div className="flex items-center gap-2">
        <a
          href={publicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-w-0 flex-1 items-center gap-1 truncate rounded-xl text-sm font-semibold text-orange transition-colors hover:text-coral"
          title={publicUrl}
        >
          <LinkIcon name="link" />
          <span className="truncate">@{username}</span>
        </a>
      </div>
    </div>
  );
}