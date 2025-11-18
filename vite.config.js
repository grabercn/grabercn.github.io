import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'load-jsx-in-js',
      enforce: 'pre',
      async transform(code, id) {
        const isJsFile = id.endsWith('.js') || id.includes('.js?');
        const inSrc = id.includes('/src/') || id.includes('\\src\\');
        if (isJsFile && inSrc) {
          const esbuild = await import('esbuild');
          const result = await esbuild.transform(code, {
            loader: 'jsx',
            jsx: 'automatic',
            sourcemap: true,
          });
          return { code: result.code, map: result.map };
        }
        return null;
      },
    },
    react(),
  ],
  base: '/',
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});

