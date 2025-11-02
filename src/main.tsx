import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import './index.css'
import { AppLayout } from './app/layout'
import { routes } from './app/routes'
import { I18nProvider } from './lib/i18n'
// ❌ PWA desactivado para evitar cachés antiguas
// import { useRegisterSW } from './lib/pwa'

const router = createHashRouter([
  {
    element: <AppLayout />,
    children: routes,
  },
])

function Root() {
  // useRegisterSW()
  return (
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)