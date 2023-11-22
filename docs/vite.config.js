import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import autoprefixer from 'autoprefixer'
import scss from 'rollup-plugin-scss';
import postcss from 'postcss';

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'

  return {
    base: '',
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['last 1 version', 'ie >= 11'],
          }),
        ],
      },
    },
    plugins: [
      scss({
        processor: () => postcss([
          autoprefixer()
        ]),
        output: './public/global.css',
        outputStyle: 'compressed',
        watch: './src/styles'
      }),
      svelte()
    ],
    build: {
      minify: isProduction,
      outDir: 'build',
    }
  }
})
