import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Default port for development
    open: true, // Opens the browser when the server starts
  },
  build: {
    outDir: 'dist', // Ensures output goes to `dist`, compatible with Docker
    sourcemap: true, // Helpful for debugging production builds
  },
  resolve: {
    alias: {
      '@': '/src', // Use @ for absolute imports from the `src` directory
    },
  },
});
