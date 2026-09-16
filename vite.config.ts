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
      const publicUrl = (env.VITE_PUBLIC_URL ?? 'https://linkorsoft.site').replace(/\/+$/, '');
      const sitemapUrl = `${publicUrl}/sitemap.xml`;
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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          dnd: ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
        },
      },
    },
  },
  server: {
    port: 5173,
  },
});