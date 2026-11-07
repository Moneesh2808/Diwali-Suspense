import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          framer: ['framer-motion'],
          lucide: ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
