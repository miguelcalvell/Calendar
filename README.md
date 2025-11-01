# Gallinero — PWA offline (mini‑ERP doméstico)

**Gallinero** es una PWA *offline‑first* para granjas pequeñas. MVP con React + TypeScript, Tailwind, shadcn‑style UI, IndexedDB (Dexie) y sin backend.

> Prioriza flujo móvil y acciones rápidas. Todo lo no esencial está marcado como `TODO:` en comentarios.

## Stack
- Vite + React + TypeScript
- Tailwind CSS (modo oscuro por defecto, con soporte claro)
- Componentes estilo **shadcn/ui** (Button, Card, Tabs, Dialog, Input, Select, Calendar, Badge, Toast)
- Iconos: **lucide-react**
- Persistencia **IndexedDB** con **Dexie**
- PWA con **vite-plugin-pwa** (Workbox) — cache de assets + fallback offline
- i18n muy simple (ES por defecto, preparado para futuras traducciones)
- Tests: **Vitest** (unit) + **Playwright** (E2E)

## Estructura
```
/src
  /app            # layout + routing (react-router)
  /components     # UI reutilizable (shadcn-style)
  /features
    /dashboard
    /animals
    /maintenance
    /health
    /history
    /settings
  /lib            # db (dexie), i18n, notificaciones, cálculos, fecha/hora, pwa utils
  /types          # tipos globales
/public           # manifest, iconos, offline.html
/tests/e2e        # playwright
```

## Modelo de datos (Dexie)
Base: `gallineroDB` con índices pensados para consultas simples.

Tablas:
- `animals`: `id, tag, type, status, createdAt, [type+status]`
- `maintenance`: `id, type, status, scheduledFor, completedAt`
- `supplies`: `id, name, category, updatedAt`
- `health`: `id, animalId, date, type`
- `history`: `id, date, type, refId`
- `settings`: `id`

> Ver `src/lib/db.ts` y `src/types/index.ts` para esquemas completos.

## Requisitos previos
- Node.js 18+
- pnpm, npm o yarn

## Instalación
```bash
npm install
# o
pnpm install
```

## Desarrollo
```bash
npm run dev
```
Abrirá `http://localhost:5173` (PWA habilitada en dev con `vite-plugin-pwa` `devOptions.enabled=true`).

## Build
```bash
npm run build
npm run preview   # sirve dist en http://localhost:4173
```

## Tests
### Unit (Vitest)
```bash
npm run test:unit
```

### E2E (Playwright)
```bash
# una vez construido o con preview automático por config:
npm run test:e2e
```
Incluye el flujo crítico: **“añadir gallinas y ver cálculo en Dashboard”**.

## Deploy a GitHub Pages
1. Actualiza el campo `homepage`/`base` si publicas en `usuario.github.io/repositorio`.
   - En `vite.config.ts`, si usas subruta: `base: '/<repo>/'` (añadir propiedad si hace falta).
2. Ejecuta:
```bash
npm run deploy
```
Publica `dist/` en la rama `gh-pages` usando `gh-pages`.

> Alternativa: GitHub Actions. (TODO: añadir workflow si se desea deploy automático en push a `main`)

## Accesibilidad & Offline
- **Offline fallback**: `public/offline.html` vía Workbox `navigateFallback`.
- **IndexedDB (Dexie)**: todas las operaciones clave funcionan sin conexión.

## Flujo MVP
- **Dashboard**: totales de animales + cálculo comida/agua diario, acciones rápidas (añadir, marcar limpieza).
- **Animales**: inventario básico + diálogo “Añadir animales” (permite cantidad).
- **Mantenimiento**: botón “Marcar limpieza hoy”. Se registra en historial.
- **Historial**: lista simple de eventos.
- **Ajustes**: tema oscuro/claro e idioma (persistidos).

## Licencia
MIT © 2025 Gallinero
