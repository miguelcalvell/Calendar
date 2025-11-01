import type { RouteObject } from 'react-router-dom'
import Dashboard from '@/features/dashboard/Dashboard'
import AnimalsPage from '@/features/animals/AnimalsPage'
import MaintenancePage from '@/features/maintenance/MaintenancePage'
import HealthPage from '@/features/health/HealthPage'
import HistoryPage from '@/features/history/HistoryPage'
import SettingsPage from '@/features/settings/SettingsPage'

export const routes: RouteObject[] = [
  { path: '/', element: <Dashboard /> },
  { path: '/animals', element: <AnimalsPage /> },
  { path: '/maintenance', element: <MaintenancePage /> },
  { path: '/health', element: <HealthPage /> },
  { path: '/history', element: <HistoryPage /> },
  { path: '/settings', element: <SettingsPage /> },
]
