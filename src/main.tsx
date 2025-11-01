import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { Toaster } from 'sonner'
import { AppLayout } from './app/layout'
import { routes } from './app/routes'
import { I18nProvider } from './lib/i18n'
import { useRegisterSW } from './lib/pwa'

const router = createBrowserRouter(routes)

function Root() {
  useRegisterSW()
  return (
    <I18nProvider>
      <AppLayout>
        <RouterProvider router={router} />
      </AppLayout>
      <Toaster richColors closeButton />
    </I18nProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
