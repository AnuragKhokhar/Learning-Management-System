import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://learning-management-system-w6jc.onrender.com', // Specify the URL of your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Rewrite '/api' to '' in request path
      },
    },
  },
});
