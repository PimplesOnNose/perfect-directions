import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// For GitHub Pages project sites, assets are served from
// https://<user>.github.io/perfect-directions/ — so we set the base path.
export default defineConfig({
  plugins: [react()],
  base: '/perfect-directions/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
