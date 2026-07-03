import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: mode === 'production' ? './' : '/',
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('firebase')) return 'firebase-vendor';
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) return 'react-vendor';
              if (id.includes('motion') || id.includes('framer-motion') || id.includes('lucide-react') || id.includes('clsx') || id.includes('tailwind-merge') || id.includes('@base-ui/react') || id.includes('@radix-ui/react-slot')) return 'ui-vendor';
              if (id.includes('maplibre-gl')) return 'map-vendor';
              if (id.includes('three') || id.includes('gsap')) return '3d-vendor';
              if (id.includes('recharts')) return 'chart-vendor';
              if (id.includes('@google/genai')) return 'genai-vendor';
              if (id.includes('hls.js') || id.includes('react-markdown')) return 'other-vendor';
            }
          }
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/setupTests.ts',
    },
  };
});
