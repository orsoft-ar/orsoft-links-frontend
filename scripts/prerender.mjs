import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const API_URL = (process.env.VITE_API_URL ?? 'https://orsoft-links-backend.onrender.com/api').replace(/\/$/, '');
const SITE_URL = (process.env.VITE_PUBLIC_URL ?? 'https://linkorsoft.site').replace(/\/$/, '');

const SKIP_PATHS = new Set(['/', '/login', '/register']);

async function getSitemapUsernames() {
  const res = await fetch(`${API_URL}/public/sitemap.xml`, {
    headers: { Accept: 'application/xml' },
  });
  if (!res.ok) throw new Error(`Sitemap HTTP ${res.status}`);
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  return matches
    .map((loc) => loc.replace(/\/$/, ''))
    .filter((loc) => loc.startsWith(SITE_URL))
    .map((loc) => loc.slice(SITE_URL.length + 1))
    .filter((username) => username && !SKIP_PATHS.has(`/${username}`));
}

async function getProfile(username) {
  const res = await fetch(`${API_URL}/public/links/${encodeURIComponent(username)}`);
  if (!res.ok) return null;
  return res.json();
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildProfileHtml(template, username, profile) {
  const pageUrl = `${SITE_URL}/${username}`;
  const title = profile.title || username;
  const description = profile.description || `Mirá todos los links de ${title} en un solo lugar.`;
  const image = profile.profileImageUrl;

  const linksHtml = (profile.links ?? [])
    .map(
      (link) =>
        `<a href="${escapeHtml(link.url)}" rel="noopener" target="_blank" class="pr-link">${escapeHtml(link.title)}</a>`,
    )
    .join('\n');

  const rootHtml = `<main class="pr-main">
  <img class="pr-avatar" src="${escapeHtml(image || '/logo.png')}" alt="${escapeHtml(title)}" />
  <h1 class="pr-title">${escapeHtml(title)}</h1>
  ${profile.description ? `<p class="pr-desc">${escapeHtml(profile.description)}</p>` : ''}
  <div class="pr-links">${linksHtml || '<p class="pr-empty">Todavía no hay links publicados</p>'}</div>
</main>`;

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: title,
    url: pageUrl,
    description,
    image,
    mainEntity: {
      '@type': 'Person',
      name: title,
      url: pageUrl,
      description,
      image,
      sameAs: (profile.links ?? []).map((l) => l.url),
    },
  });

  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(`${title} | linkorsoft.site`)}</title>`)
    .replace(
      /<meta name="robots" content="[^"]*" \/>/,
      '<meta name="robots" content="index, follow, max-image-preview:large" />',
    );

  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${pageUrl}" />`,
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtml(`${title} | linkorsoft.site`)}" />`,
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${pageUrl}" />`,
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeHtml(`${title} | linkorsoft.site`)}" />`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  );
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  );

  if (image) {
    html = html.replace(
      /<meta name="twitter:card" content="[^"]*" \/>/,
      '<meta name="twitter:card" content="summary_large_image" />',
    );
    html = html.replace(
      /(<meta property="og:type" content="website" \/>)/,
      `$1\n    <meta property="og:image" content="${escapeHtml(image)}" />`,
    );
  }

  const watermark = `<style>
    .pr-main{font-family:Inter,system-ui,sans-serif;max-width:28rem;margin:4rem auto;padding:0 1.25rem;text-align:center;display:flex;flex-direction:column;align-items:center}
    .pr-avatar{width:6rem;height:6rem;border-radius:9999px;object-fit:cover}
    .pr-title{margin:1.25rem 0 0;font-size:1.5rem;font-weight:800;color:#002b5b}
    .pr-desc{margin:.5rem 0 0;color:#64748b}
    .pr-links{display:flex;flex-direction:column;gap:.75rem;width:100%;margin-top:2rem}
    .pr-link{border-radius:1rem;background:#002b5b;color:#fff;font-weight:600;padding:.875rem;text-decoration:none}
  </style>`;

  html = html.replace(
    /(<script type="application\/ld\+json">)/,
    `${watermark}\n    <script type="application/ld+json">${escapeJsonLd(jsonLd)}</script>\n    <script type="application/ld+json">`,
  );

  html = html.replace('<div id="root"></div>', `<div id="root">${rootHtml.replace(/\n/g, '')}</div>`);
  return html;
}

function escapeJsonLd(value) {
  return value.replace(/<\/script/g, '<\\/script');
}

async function main() {
  const template = readFileSync(path.join(DIST, 'index.html'), 'utf8');
  const usernames = await getSitemapUsernames();
  console.log(`Pre-renderizando ${usernames.length} perfiles publicos de ${SITE_URL}...`);

  let generated = 0;
  let skipped = 0;

  for (const username of [...new Set(usernames)]) {
    try {
      const profile = await getProfile(username);
      if (!profile) {
        skipped += 1;
        continue;
      }
      const dir = path.join(DIST, username);
      rmSync(dir, { recursive: true, force: true });
      mkdirSync(dir, { recursive: true });
      writeFileSync(path.join(dir, 'index.html'), buildProfileHtml(template, username, profile), 'utf8');
      generated += 1;
      console.log(`  ✓ ${username}`);
    } catch (err) {
      skipped += 1;
      console.warn(`  ✗ ${username}: ${err.message}`);
    }
  }

  console.log(`Listo: ${generated} generados, ${skipped} omitidos.`);
}

main().catch((err) => {
  console.warn(`[prerender] No se pudo pre-renderizar los perfiles: ${err.message}`);
});