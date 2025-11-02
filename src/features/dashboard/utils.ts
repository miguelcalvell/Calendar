import type { DietType } from '@/types'

export function formatDietLabel(fase: DietType | string) {
  switch (fase) {
    case 'allflock':
      return 'All-flock'
    case 'gamebird_adulto':
      return 'Gamebird adulto'
    default:
      return fase.charAt(0).toUpperCase() + fase.slice(1)
  }
}
