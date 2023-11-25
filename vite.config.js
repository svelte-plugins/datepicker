import { defineConfig } from 'vite';
import { svelte }  from '@sveltejs/vite-plugin-svelte';
import packageJson from './package.json';

console.log(packageJson);

export default defineConfig({
  plugins: [
    svelte({ emitCss: false })
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: packageJson.svelte,
      name: 'SvelteDatePicker',
      fileName: (format) => format === 'umd' ? 'index.js' : 'index.mjs'
    },
    rollupOptions: {
      external: ['svelte'], // Add other external dependencies here if needed
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
