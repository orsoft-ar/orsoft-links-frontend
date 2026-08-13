import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { OrSoftLogo, PoweredByOrSoft } from '@/components/ui/Brand';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Loading';
import * as publicService from '@/services/public.service';
import type { PublicLinkPage } from '@/types/linkPage';
import { getErrorMessage } from '@/utils/format';
import { useJsonLd, useSeo } from '@/utils/seo';

const DEFAULT_PROFILE_DESCRIPTION =
  'Mirá todos mis links, redes y contacto en un solo lugar.';

export function PublicProfilePage() {
  const { username: rawUsername } = useParams<{ username: string }>();
  const username = rawUsername?.replace(/^@/, '') ?? '';
  const [page, setPage] = useState<PublicLinkPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useSeo({
    title: notFound
      ? 'Página no encontrada | linkorsoft.site'
      : page
        ? `${page.title || page.username} | linkorsoft.site`
        : 'linkorsoft.site',
    description: notFound
      ? 'Esa página no existe o no es pública. Creá tu propia página de links gratis.'
      : (page?.description ?? DEFAULT_PROFILE_DESCRIPTION),
    path: `/${username}`,
    imageUrl: page?.profileImageUrl,
  });

  useJsonLd('profile-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: page?.title || page?.username,
      description: page?.description,
      url: page ? `/${page.username}` : undefined,
      image: page?.profileImageUrl,
      sameAs: page?.links.map((link) => link.url),
    },
  });

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!username) return;
      setLoading(true);
      setNotFound(false);
      setError(null);
      try {
        const data = await publicService.getPublicPage(username);
        if (!active) return;
        setPage(data);
      } catch (err) {
        if (!active) return;
        const apiError = err as { statusCode?: number };
        if (apiError.statusCode === 404) {
          setNotFound(true);
        } else {
          setError(getErrorMessage(err));
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [username]);

  if (loading) {
    return (
      <div className="mx-auto min-h-screen max-w-md px-5 py-10">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
          <div className="mt-6 w-full space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <h1 className="text-3xl font-extrabold text-navy">Esta página no existe</h1>
        <p className="mt-2 max-w-sm text-slate/60">
          Esa página no fue encontrada o no es pública.
        </p>
        <Link to="/register" className="mt-6">
          <Button size="lg">
            Crear mi linkorsoft.site
            <ArrowLeft className="h-5 w-5 rotate-180" />
          </Button>
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <h1 className="text-3xl font-extrabold text-navy">Algo salió mal</h1>
        <p className="mt-2 max-w-sm text-slate/60">{error}</p>
        <Link to="/" className="mt-6">
          <Button variant="secondary">Volver al inicio</Button>
        </Link>
      </div>
    );
  }

  if (!page) {
    return null;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 py-10">
      <div className="flex flex-1 flex-col items-center text-center">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-orange/20 text-4xl font-black text-orange ring-4 ring-orange/15">
          {page.profileImageUrl ? (
            <img
              src={page.profileImageUrl}
              alt={page.title || page.username}
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{page.title?.charAt(0).toUpperCase() || page.username.charAt(0).toUpperCase()}</span>
          )}
        </div>

        <h1 className="mt-5 text-2xl font-extrabold text-navy">{page.title}</h1>
        {page.description && (
          <p className="mt-2 text-slate/60">{page.description}</p>
        )}

        <div className="mt-8 w-full space-y-3">
          {page.links.length === 0 ? (
            <p className="text-slate/40">Todavía no hay links publicados</p>
          ) : (
            page.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-2xl bg-navy px-5 py-4 font-semibold text-white transition-all hover:scale-[1.02] hover:bg-navy/90 active:scale-[0.99]"
              >
                <span className="h-4 w-4" />
                <span className="truncate">{link.title}</span>
              </a>
            ))
          )}
        </div>
      </div>

      <div className="mt-12 flex items-center justify-center gap-2">
        <a
          href="/"
          className="flex items-center gap-2 text-slate/40 transition-colors hover:text-slate"
          aria-label="linkorsoft.site"
        >
          <OrSoftLogo className="h-5 w-auto" />
        </a>
        <PoweredByOrSoft />
      </div>
    </div>
  );
}