import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('firebase')) return 'firebase-vendor';
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router/')) return 'react-vendor';
            if (id.includes('node_modules/')) return id.toString().split('node_modules/')[1].split('/')[0].toString();
          },
        },
      },
    },
});
