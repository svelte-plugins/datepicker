import { defineConfig } from 'vite';
import { svelte }  from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [
    svelte({ emitCss: false })
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: './src/index.js',
      name: 'SvelteDatePicker',
      fileName: (format) => format === 'umd' ? 'index.js' : 'index.mjs'
    },
    rollupOptions: {
      external: ['svelte'],
      output: {
        globals: {
          svelte: 'svelte',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['./src/**/*.test.js'],
    resolveSnapshotPath: (testPath, snapExtension) => testPath.replace(/\.test\.([tj]s?)/, `${snapExtension}.$1`)
  }
});
