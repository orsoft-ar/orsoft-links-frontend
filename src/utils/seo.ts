const SITE_URL = (import.meta.env.VITE_PUBLIC_URL as string | undefined)?.replace(/\/$/, '') ?? 'https://linkorsoft.site';
const SITE_NAME = 'linkorsoft.site';

interface SeoOptions {
  title: string;
  description?: string;
  path?: string;
  imageUrl?: string | null;
  type?: string;
  noIndex?: boolean;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id: string, data: Record<string, unknown> | null): void {
  const el = document.getElementById(id) as HTMLScriptElement | null;
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    const node = document.createElement('script');
    node.type = 'application/ld+json';
    node.id = id;
    document.head.appendChild(node);
    node.textContent = JSON.stringify(data);
    return;
  }
  el.textContent = JSON.stringify(data);
}

export function useSeo({
  title,
  description,
  path = '/',
  imageUrl,
  type = 'website',
  noIndex = false,
}: SeoOptions): void {
  const url = `${SITE_URL}${path}`;

  document.title = title;
  upsertLink('canonical', url);
  if (noIndex) upsertMeta('name', 'robots', 'noindex, nofollow');

  upsertMeta('name', 'description', description ?? '');
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:type', type);
  upsertMeta('property', 'og:site_name', SITE_NAME);
  if (description) upsertMeta('property', 'og:description', description);
  if (imageUrl) upsertMeta('property', 'og:image', imageUrl);

  upsertMeta('name', 'twitter:card', imageUrl ? 'summary_large_image' : 'summary');
  upsertMeta('name', 'twitter:title', title);
  if (description) upsertMeta('name', 'twitter:description', description);
  if (imageUrl) upsertMeta('name', 'twitter:image', imageUrl);
}

export function useJsonLd(id: string, data: Record<string, unknown> | null): void {
  upsertJsonLd(id, data);
}

export { SITE_URL };
