import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        // Ensure WASM files are included in the build
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.wasm')) {
            return 'assets/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        }
      }
    },
    target: 'esnext'
  },
  server: {
    open: true,
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..']
    }
  }
});
