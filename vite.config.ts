import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// ⚠️ Ruta EXACTA (sensible a mayúsculas) de tu repo en Pages
const base = '/Calendar/'

export default defineConfig({
  base,
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  plugins: [react()],
  // Forzamos nombre de entry, así es fácil de verificar
  build: {
    rollupOptions: {
      input: 'index.html',
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/chunk-[name].js',
        assetFileNames: 'assets/[name][extname]'
      }
    }
  },
  server: { port: 5173 },
  preview: { port: 4173 }
})