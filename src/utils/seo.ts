const SITE_URL = (import.meta.env.VITE_PUBLIC_URL as string | undefined)?.replace(/\/$/, '') ?? 'https://linkorsoft.site';
const SITE_NAME = 'linkorsoft.site';

interface SeoOptions {
  title: string;
  description?: string;
  path?: string;
  imageUrl?: string | null;
  type?: string;
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

function upsertJsonLd(id: string, data: Record<string, unknown>): void {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function useSeo({
  title,
  description,
  path = '/',
  imageUrl,
  type = 'website',
}: SeoOptions): void {
  const url = `${SITE_URL}${path}`;

  document.title = title;
  upsertLink('canonical', url);

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

export function useJsonLd(id: string, data: Record<string, unknown>): void {
  upsertJsonLd(id, data);
}

export { SITE_URL };
