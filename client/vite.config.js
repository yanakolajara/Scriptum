import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    plugins: [react()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        api: path.resolve(__dirname, './src/api'),
        pages: path.resolve(__dirname, './src/pages'),
        components: path.resolve(__dirname, './src/components'),
        providers: path.resolve(__dirname, './src/providers'),
        utils: path.resolve(__dirname, './src/utils'),
      },
      extensions: ['.js', '.jsx', '.json'],
    },

    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          // configure: (proxy, _options) => {
          //   proxy.on('error', (err, _req, _res) => {
          //     console.log('proxy error', err);
          //   });
          //   proxy.on('proxyReq', (proxyReq, req, _res) => {
          //     console.log('Sending Request to the Target:', req.method, req.url);
          //   });
          //   proxy.on('proxyRes', (proxyRes, req, _res) => {
          //     console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          //   });
          // },
        },
      },
      port: 3000,
      open: false,
      cors: true,
    },
    esbuild: {
      loader: 'jsx',
      include: /.jsx?$/,
      exclude: [],
    },
    build: {
      outDir: './build',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  };
});
