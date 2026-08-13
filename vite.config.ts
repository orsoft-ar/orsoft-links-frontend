import path from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

function robotsTxtPlugin(): Plugin {
  let outDir = 'dist';
  return {
    name: 'generate-robots-txt',
    configResolved(config) {
      outDir = config.build.outDir ?? 'dist';
    },
    closeBundle() {
      const env = loadEnv('production', path.resolve(__dirname), '');
      const apiUrl = (env.VITE_API_URL ?? 'https://linkorsoft.site').replace(/\/+$/, '');
      const sitemapUrl = `${apiUrl}/public/sitemap.xml`;
      const robots = `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /login
Disallow: /register

Sitemap: ${sitemapUrl}
`;
      mkdirSync(outDir, { recursive: true });
      writeFileSync(path.join(outDir, 'robots.txt'), robots, 'utf8');
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), robotsTxtPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
  },
});