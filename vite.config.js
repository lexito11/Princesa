import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  publicDir: 'images'
}) 