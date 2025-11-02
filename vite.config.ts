import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'

// Base RELATIVA → el HTML final usa "assets/..." relativo a /Calendar/
export default defineConfig({
  base: './',
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png','icons/icon-512.png','icons/maskable-512.png','offline.html'],
      manifest: {
        name: 'Gallinero',
        short_name: 'Gallinero',
        description: 'Mini-ERP doméstico para granjas pequeñas – offline-first PWA',
        theme_color: '#111827',
        background_color: '#111827',
        display: 'standalone',
        lang: 'es',
        start_url: '/Calendar/',   // instalación PWA en el subpath correcto
        scope: '/Calendar/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      }
    })
  ],
  // ⬇️ La clave: nombres de salida estables, para poder referenciarlos sin depender de transformaciones
  build: {
    manifest: false,
    rollupOptions: {
      input: 'index.html',
      output: {
        entryFileNames: 'assets/app.js',        // ← nombre fijo
        chunkFileNames: 'assets/chunk-[name].js',
        assetFileNames: 'assets/[name][extname]'
      }
    }
  },
  server: { port: 5173 },
  preview: { port: 4173 }
})