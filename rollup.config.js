import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;

export default () => {
  return ['es', 'umd'].map((format) => {
    const UMD = format === 'umd';

    return {
      input: pkg.svelte,
      output: {
        format,
        file: UMD ? pkg.main : pkg.module,
        name: UMD ? pkg.name : undefined,
      },
      plugins: [
        resolve(),
        commonjs(),
        svelte({
          compilerOptions: {
            dev: !production,
            generate: 'ssr'
          },
          emitCss: false
        }),
        babel({
          "extensions": [".js", ".mjs", ".html", ".svelte"],
          "babelHelpers": "bundled",
          "exclude": ["/node_modules/**"]
        }),
        production && terser()
      ]
    };
  });
};
