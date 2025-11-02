import type { DietType } from '@/types'

const DIET_LABELS: Record<DietType, string> = {
  starter: 'Inicio',
  grower: 'Crecimiento',
  finisher: 'Terminación',
  layer: 'Postura',
  breeder: 'Reproductoras',
  allflock: 'Mixto',
  adulto: 'Adulto',
  gamebird_adulto: 'Aves de ornato adultas',
}

export function formatDietLabel(fase: DietType | string) {
  if (fase in DIET_LABELS) {
    return DIET_LABELS[fase as DietType]
  }
  return fase
}
