import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      api: path.resolve(__dirname, './src/api'),
      features: path.resolve(__dirname, './src/features'),
      components: path.resolve(__dirname, './src/components'),
      providers: path.resolve(__dirname, './src/providers'),
      utils: path.resolve(__dirname, './src/utils'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      cors:false
      },
    port: 3000,
    open: false,
  },
  esbuild: {
    loader: 'jsx',
    include: /.jsx?$/,
    exclude: [],
  },
  build: {
    outDir: './build',
  },
});
