import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  server: {
    host: true, // Exposes the server to local network (0.0.0.0) for testing on Android/iOS phones
    port: 5173,
  },
  preview: {
    host: true,
    port: 5173,
  }
});

