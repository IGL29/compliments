/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import ssr from 'vite-plugin-ssr/plugin';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  define: {
    'import.meta.vitest': undefined,
  },
  build: {
    cssCodeSplit: true,
    manifest: true,
    ssrManifest: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    }
  },
  plugins: [
    react(),
    ssr({
      disableAutoFullBuild: true
    }),
    ViteImageOptimizer(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 1,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  base: '/',
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    onConsoleLog(log) {
      if (log.includes('React DevTools')) return false;
    },
  },
  resolve: {
    alias: {
      '~src': path.resolve(__dirname, './src'),
      '~styles': path.resolve(__dirname, './src/styles'),
      '~components': path.resolve(__dirname, './src/components'),
      '~containers': path.resolve(__dirname, './src/containers'),
      '~data': path.resolve(__dirname, './src/data'),
      '~services': path.resolve(__dirname, './src/services'),
      '~hooks': path.resolve(__dirname, './src/hooks'),
      '~store': path.resolve(__dirname, './src/store'),
      '~tests': path.resolve(__dirname, './src/__tests__'),
    },
  },
  envDir: path.resolve(__dirname, './environments'),
  ssr: {
    noExternal: ['@reduxjs/toolkit', 'redux-thunk'],
  },
});
