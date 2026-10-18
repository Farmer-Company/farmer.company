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
          manualChunks: {
            'firebase-vendor': ['firebase/app', 'firebase/auth', '@firebase/app', 'firebase/firestore', 'firebase/database', 'firebase/storage', 'firebase/app-check'],
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'three-vendor': ['three'],
            'lucide-icons': ['lucide-react'],
            'ui-vendor': ['@base-ui/react', '@radix-ui/react-slot', 'framer-motion', 'motion'],
            'market-data': ['src/data/Market.json']
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/setupTests.ts',
    },
  };
});
