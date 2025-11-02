import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import './index.css'
import { Toaster } from 'sonner'
import { AppLayout } from './app/layout'
import { routes } from './app/routes'
import { I18nProvider } from './lib/i18n'
// 🔧 Si quieres aislar SW mientras resolvemos negro, comenta la siguiente línea:
// import { useRegisterSW } from './lib/pwa'
import { ErrorBoundary } from './app/ErrorBoundary'

const router = createHashRouter(routes)

function Root() {
  // useRegisterSW() // ← comenta temporalmente si sospechas del SW
  return (
    <I18nProvider>
      <AppLayout>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
        <Toaster richColors closeButton />
      </AppLayout>
    </I18nProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)