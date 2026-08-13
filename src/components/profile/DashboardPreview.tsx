import { LinkIcon } from '@/components/ui/Brand';
import type { LinkPage } from '@/types/linkPage';
import type { Link } from '@/types/link';

interface DashboardPreviewProps {
  page: LinkPage;
  links: Link[];
}

export function DashboardPreview({ page, links }: DashboardPreviewProps) {
  const activeLinks = links.filter((link) => link.active);

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-slate/10 bg-white p-6 shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-orange/20 text-4xl font-black text-orange">
          {page.profileImageUrl ? (
            <img
              src={page.profileImageUrl}
              alt={page.title || page.username}
              className="h-full w-full object-cover"
            />
          ) : (
            (page.title || page.username).charAt(0).toUpperCase()
          )}
        </div>
        <h3 className="mt-4 text-xl font-bold text-navy">{page.title}</h3>
        {page.description && (
          <p className="mt-1 text-sm text-slate/60">{page.description}</p>
        )}
      </div>

      <div className="mt-6 space-y-3">
        {activeLinks.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate/40">
            Agregá links para verlos acá
          </p>
        ) : (
          activeLinks.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-center gap-2 rounded-2xl bg-navy px-4 py-3.5 font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              <LinkIcon name={link.icon} />
              <span className="truncate">{link.title}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}