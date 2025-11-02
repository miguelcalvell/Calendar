import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, SVGProps } from 'react'
import type { Animal } from '@/types'
import {
  GallinaIcon,
  GalloIcon,
  GenericBirdIcon,
  KikaIcon,
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
  kika: 'Kika',
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
  kika: KikaIcon,
  pavo_real: PavoRealIcon,
  otro: GenericBirdIcon,
}

const RING_CAPACITY = 10
const DEFAULT_SIZE = 320

interface PositionedAnimal {
  animal: Animal
  x: number
  y: number
  floatX: number
  floatY: number
  order: number
}

export function VirtualCorral({ animals }: { animals: Animal[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState(DEFAULT_SIZE)

  useEffect(() => {
    if (!containerRef.current || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return
      setContainerSize(entry.contentRect.width)
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const sorted = useMemo(() => {
    return [...animals].sort((a, b) => {
      const typeCompare = ANIMAL_TYPE_LABELS[a.type].localeCompare(ANIMAL_TYPE_LABELS[b.type])
      if (typeCompare !== 0) return typeCompare
      return (a.tag ?? a.id).localeCompare(b.tag ?? b.id)
    })
  }, [animals])

  const { iconSize, effectiveSize, positions } = useMemo(() => {
    const count = sorted.length
    const size = Math.max(220, containerSize)
    const center = size / 2
    const resolvedIconSize = Math.max(32, Math.min(size / 6, 64))
    const maxRadius = Math.max(resolvedIconSize * 0.75, center - resolvedIconSize / 2 - 6)
    if (!count) {
      return { iconSize: resolvedIconSize, effectiveSize: size, positions: [] as PositionedAnimal[] }
    }
    const ringCount = Math.max(1, Math.ceil(count / RING_CAPACITY))
    const spacing = Math.max(resolvedIconSize * 0.95, maxRadius / ringCount)
    const floatAmplitude = Math.max(1.5, resolvedIconSize * 0.06)

    const positioned = sorted.map((animal, index) => {
      if (count === 1) {
        return {
          animal,
          x: center,
          y: center,
          floatX: 0,
          floatY: 0,
          order: index,
        }
      }

      const ring = Math.floor(index / RING_CAPACITY)
      const indexInRing = index % RING_CAPACITY
      const itemsInRing = Math.min(RING_CAPACITY, count - ring * RING_CAPACITY)
      const radius = Math.min(maxRadius, spacing * (ring + 1))
      const angleStep = (2 * Math.PI) / itemsInRing
      const angle = -Math.PI / 2 + angleStep * indexInRing

      return {
        animal,
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
        floatX: Math.cos(angle + Math.PI / 2) * floatAmplitude,
        floatY: Math.sin(angle + Math.PI / 2) * floatAmplitude,
        order: index,
      }
    })

    return { iconSize: resolvedIconSize, effectiveSize: size, positions: positioned }
  }, [containerSize, sorted])

  const borderWidth = Math.max(4, effectiveSize * 0.015)
  const innerBorderWidth = Math.max(2, borderWidth / 2)
  const markerLength = Math.max(14, iconSize * 0.75)
  const markerWidth = Math.max(3, borderWidth / 2.5)
  const markerTranslate = Math.max(iconSize * 0.6, effectiveSize / 2 - markerLength / 2)
  const labelFontSize = Math.max(10, iconSize * 0.32)
  const labelPaddingX = Math.max(8, iconSize * 0.25)
  const labelPaddingY = Math.max(4, iconSize * 0.18)

  return (
    <div className="space-y-3">
      <div ref={containerRef} className="relative mx-auto aspect-square w-full max-w-xl">
        <div
          className="absolute inset-0 rounded-full bg-emerald-900/20 shadow-inner"
          style={{ border: `${borderWidth}px solid rgba(217, 119, 6, 0.55)` }}
        >
          <div
            className="absolute inset-4 rounded-full border-dashed"
            style={{ border: `${innerBorderWidth}px dashed rgba(245, 158, 11, 0.4)` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="rounded-full uppercase tracking-wide text-amber-100"
              style={{
                padding: `${labelPaddingY}px ${labelPaddingX}px`,
                fontSize: labelFontSize,
                backgroundColor: 'rgba(245, 158, 11, 0.18)',
              }}
            >
              Corral
            </span>
          </div>
          {Array.from({ length: 12 }).map((_, idx) => {
            const markerStyle: CSSProperties = {
              position: 'absolute',
              left: '50%',
              top: '50%',
              height: markerLength,
              width: markerWidth,
              borderRadius: markerWidth,
              backgroundColor: 'rgba(245, 158, 11, 0.65)',
              transform: `translate(-50%, -50%) rotate(${idx * 30}deg) translateY(-${markerTranslate}px)`,
              transformOrigin: 'center center',
            }
            return <div key={idx} style={markerStyle} aria-hidden="true" />
          })}
        </div>
        {positions.map(({ animal, x, y, floatX, floatY, order }) => {
          const Icon = ICONS[animal.type] ?? GenericBirdIcon
          const style: CSSProperties & { ['--float-x']?: string; ['--float-y']?: string } = {
            left: x,
            top: y,
            width: iconSize,
            height: iconSize,
            marginLeft: -iconSize / 2,
            marginTop: -iconSize / 2,
            animationDelay: `${order * 0.6}s`,
          }
          style['--float-x'] = `${floatX}px`
          style['--float-y'] = `${floatY}px`

          return (
            <div
              key={animal.id}
              className="absolute flex items-center justify-center rounded-full bg-slate-950/70 shadow-lg ring-1 ring-amber-200/50 corral-float"
              style={style}
            >
              <Icon
                aria-label={ANIMAL_TYPE_LABELS[animal.type]}
                width={iconSize * 0.82}
                height={iconSize * 0.82}
              />
            </div>
          )
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-300">
        {Object.entries(ANIMAL_TYPE_LABELS).map(([type, label]) => {
          const Icon = ICONS[type as Animal['type']] ?? GenericBirdIcon
          return (
            <div key={type} className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-full bg-slate-900/80 p-1">
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
