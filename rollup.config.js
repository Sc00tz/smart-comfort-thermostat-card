import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

const dev = process.env.ROLLUP_WATCH;

export default {
  input: 'src/smart-comfort-thermostat-card.ts',
  output: {
    file: 'dist/smart-comfort-thermostat-card.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    resolve({
      browser: true,
    }),
    typescript({
      declaration: false,
    }),
    json(),
    !dev && terser({
      compress: {
        drop_console: true,
      },
    }),
  ].filter(Boolean),
  external: [],
};