// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/greek': {
        target: 'https://thegreekmythapi.vercel.app/api',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/greek/, ''),
      },
    },
  },
});
