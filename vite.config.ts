import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync } from 'fs';
import { generateRssFeed } from './src/utils/rss';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'generate-rss',
      writeBundle() {
        const feed = generateRssFeed();
        writeFileSync('./dist/rss.xml', feed.rss2());
      },
    },
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});