import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        research: resolve(__dirname, 'research.html'),
        dealers: resolve(__dirname, 'dealers.html'),
        technical: resolve(__dirname, 'technical-approach.html'),
        krishisetu: resolve(__dirname, 'krishisetu/index.html')
      }
    }
  }
});
