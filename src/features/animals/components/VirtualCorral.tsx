import { useMemo } from 'react'
import type { SVGProps } from 'react'
import type { Animal } from '@/types'
import {
  GallinaIcon,
  GalloIcon,
  GenericBirdIcon,
  KikoIcon,
  PavoIcon,
  PavoRealIcon,
  PolloIcon,
  PollitoIcon,
} from './AnimalIcons'

export const ANIMAL_TYPE_LABELS: Record<Animal['type'], string> = {
  gallina: 'Gallina',
  gallo: 'Gallo',
  pollo: 'Pollo',
  pollito: 'Pollito',
  pavo: 'Pavo',
  kiko: 'Kiko',
  pavo_real: 'Pavo real',
  otro: 'Otro',
}

type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element

const ICONS: Record<Animal['type'], IconComponent> = {
  gallina: GallinaIcon,
  gallo: GalloIcon,
  pollo: PolloIcon,
  pollito: PollitoIcon,
  pavo: PavoIcon,
  kiko: KikoIcon,
  pavo_real: PavoRealIcon,
  otro: GenericBirdIcon,
}

const RING_CAPACITY = 8

export function VirtualCorral({ animals }: { animals: Animal[] }) {
  const sorted = useMemo(() => {
    return [...animals].sort((a, b) => {
      const typeCompare = ANIMAL_TYPE_LABELS[a.type].localeCompare(ANIMAL_TYPE_LABELS[b.type])
      if (typeCompare !== 0) return typeCompare
      return (a.tag ?? a.id).localeCompare(b.tag ?? b.id)
    })
  }, [animals])

  const positions = useMemo(() => {
    const count = sorted.length
    if (!count) return []
    const size = 320
    const center = size / 2
    const maxRadius = center - 40
    const ringCount = Math.max(1, Math.ceil(count / RING_CAPACITY))
    const spacing = maxRadius / ringCount

    return sorted.map((animal, index) => {
      if (count === 1) {
        return {
          animal,
          left: center - 24,
          top: center - 24,
        }
      }

      const ring = Math.floor(index / RING_CAPACITY)
      const indexInRing = index % RING_CAPACITY
      const itemsInRing = Math.min(RING_CAPACITY, count - ring * RING_CAPACITY)
      const radius = spacing * (ring + 1)
      const angleStep = (2 * Math.PI) / itemsInRing
      const angle = -Math.PI / 2 + angleStep * indexInRing
      const left = center + radius * Math.cos(angle) - 24
      const top = center + radius * Math.sin(angle) - 24

      return {
        animal,
        left,
        top,
      }
    })
  }, [sorted])

  return (
    <div className="space-y-3">
      <div className="relative mx-auto h-80 w-80">
        <div className="absolute inset-0 rounded-full border-[6px] border-amber-600/60 bg-emerald-900/20 shadow-inner">
          <div className="absolute inset-4 rounded-full border-2 border-amber-500/40 border-dashed" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-200">
              Corral
            </span>
          </div>
          {[...Array(12)].map((_, idx) => (
            <div
              key={idx}
              className="absolute h-5 w-1 rounded-full bg-amber-500/70"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${idx * 30}deg) translate(0, -160px)`,
                transformOrigin: 'center 160px',
              }}
              aria-hidden="true"
            />
          ))}
        </div>
        {positions.map(({ animal, left, top }) => {
          const Icon = ICONS[animal.type] ?? GenericBirdIcon
          return (
            <div
              key={animal.id}
              className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/80 shadow-lg ring-2 ring-amber-200/60"
              style={{ left, top }}
            >
              <Icon aria-label={ANIMAL_TYPE_LABELS[animal.type]} />
            </div>
          )
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-300">
        {Object.entries(ANIMAL_TYPE_LABELS).map(([type, label]) => {
          const Icon = ICONS[type as Animal['type']] ?? GenericBirdIcon
          return (
            <div key={type} className="flex items-center gap-1">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/80">
                <Icon width={24} height={24} aria-hidden="true" />
              </div>
              <span>{label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
