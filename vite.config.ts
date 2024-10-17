import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // 절대 경로 import 설정
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
