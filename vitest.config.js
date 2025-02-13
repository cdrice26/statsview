import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      statmaster: resolve(__dirname, '../statmaster/pkg/statmaster.js')
    }
  },
  test: {
    globals: true,
    include: [
      'src/lib/helper/**/*.test.js',
      'src/lib/stats/**/*.test.js',
      'src/lib/cleaner/**/*.test.ts'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html']
    },
    environment: 'node',
    setupFiles: ['./test-setup.js']
  }
});
