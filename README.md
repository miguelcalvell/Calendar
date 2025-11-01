# Gallinero — PWA offline (ready for **GitHub Pages**)

Este proyecto está **preconfigurado para GitHub Pages** en el repo `calendar`:
- Vite `base` = **`/calendar/`**
- Router = **hash** (`createHashRouter`) → **no** requiere rewrites en el server.
- PWA (`vite-plugin-pwa`) con `start_url` y `scope` = `/calendar/`.
- Archivos estáticos únicamente (HTML/JS/CSS) → válido para Pages.
- Incluye `public/.nojekyll` y `public/404.html`.

## Stack
Vite + React + TypeScript · Tailwind · shadcn-style UI · Dexie (IndexedDB) · PWA · i18n ES · Vitest · Playwright.

## Comandos
```bash
npm install
npm run dev
npm run build && npm run preview
npm run test:unit
npm run test:e2e
```

## Deploy en GitHub Pages (Actions)
1. En tu repo `calendar`, activa **Settings → Pages → Source: GitHub Actions**.
2. Haz push del código a `main`. El workflow `.github/workflows/pages.yml` compilará y publicará **/calendar/**.

> Alternativa: `npm run build` + `npx gh-pages -d dist -b gh-pages` (ya incluido).

## Notas
- Si el nombre de repo cambia, puedes build con otra base sin tocar código:
  ```bash
  BASE_PATH=/otro-repo/ npm run build
  ```

## Licencia
MIT © 2025 Gallinero
