import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'offline.html'],
      manifest: {
        name: 'Gallinero',
        short_name: 'Gallinero',
        description: 'Mini-ERP doméstico para granjas pequeñas – offline-first PWA',
        theme_color: '#111827',
        background_color: '#111827',
        display: 'standalone',
        lang: 'es',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallback: '/offline.html'
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  server: {
    port: 5173
  },
  preview: {
    port: 4173
  },
  test: {
    environment: 'jsdom',
    globals: true,
  }
})
