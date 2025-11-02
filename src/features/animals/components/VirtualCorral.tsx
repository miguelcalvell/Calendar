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
} from './AnimalIcons'

export const ANIMAL_TYPE_LABELS: Record<Animal['type'], string> = {
  gallina: 'Gallina ponedora',
  gallo: 'Gallo',
  kiko: 'Kiko (gallo enano)',
  kika: 'Kika (gallina enana)',
  pavo_hembra: 'Pavo hembra',
  pavo_macho: 'Pavo macho',
  pavoreal_hembra: 'Pavo real hembra',
  pavoreal_macho: 'Pavo real macho',
}

type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element

const ICONS: Partial<Record<Animal['type'], IconComponent>> = {
  gallina: GallinaIcon,
  gallo: GalloIcon,
  kiko: KikoIcon,
  kika: KikaIcon,
  pavo_hembra: PavoIcon,
  pavo_macho: PavoIcon,
  pavoreal_hembra: PavoRealIcon,
  pavoreal_macho: PavoRealIcon,
}

const DEFAULT_SIZE = 320
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))

interface PositionedAnimal {
  animal: Animal
  x: number
  y: number
  order: number
  orbitRadius: number
  orbitDuration: number
  orbitDelay: number
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
      const labelA = ANIMAL_TYPE_LABELS[a.type] ?? 'Ave'
      const labelB = ANIMAL_TYPE_LABELS[b.type] ?? 'Ave'
      const typeCompare = labelA.localeCompare(labelB)
      if (typeCompare !== 0) return typeCompare
      return (a.tag ?? a.id).localeCompare(b.tag ?? b.id)
    })
  }, [animals])

  const { iconSize, effectiveSize, positions } = useMemo(() => {
    const count = sorted.length
    const size = Math.max(220, containerSize)
    const center = size / 2
    const resolvedIconSize = Math.max(32, Math.min(size / 6, 64))
    const iconRadius = resolvedIconSize / 2
    const maxRadius = Math.max(resolvedIconSize * 0.75, center - iconRadius - 6)
    if (!count) {
      return { iconSize: resolvedIconSize, effectiveSize: size, positions: [] as PositionedAnimal[] }
    }
    const boundaryRadius = maxRadius - iconRadius * 0.1

    const points = sorted.map((animal, index) => {
      if (count === 1) {
        return { animal, x: center, y: center }
      }
      const angle = index * GOLDEN_ANGLE
      const radialFactor = Math.sqrt((index + 0.5) / count)
      const radius = Math.min(boundaryRadius, radialFactor * boundaryRadius)
      return {
        animal,
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
      }
    })

    if (count > 1) {
      const minDistance = resolvedIconSize * 1.05
      const adjustments = points.map(() => ({ x: 0, y: 0 }))
      const maxIterations = 120

      for (let iteration = 0; iteration < maxIterations; iteration += 1) {
        let maxShift = 0
        for (let i = 0; i < count; i += 1) {
          adjustments[i].x = 0
          adjustments[i].y = 0
        }

        for (let i = 0; i < count; i += 1) {
          for (let j = i + 1; j < count; j += 1) {
            let dx = points[i].x - points[j].x
            let dy = points[i].y - points[j].y
            let distSq = dx * dx + dy * dy
            if (distSq === 0) {
              const fallbackAngle = GOLDEN_ANGLE * (i + 1)
              dx = Math.cos(fallbackAngle) * 0.01
              dy = Math.sin(fallbackAngle) * 0.01
              distSq = dx * dx + dy * dy
            }
            const dist = Math.sqrt(distSq)
            if (dist < minDistance) {
              const overlap = (minDistance - dist) / 2
              const nx = dx / dist
              const ny = dy / dist
              adjustments[i].x += nx * overlap
              adjustments[i].y += ny * overlap
              adjustments[j].x -= nx * overlap
              adjustments[j].y -= ny * overlap
            }
          }
        }

        for (let i = 0; i < count; i += 1) {
          points[i].x += adjustments[i].x
          points[i].y += adjustments[i].y

          const offsetX = points[i].x - center
          const offsetY = points[i].y - center
          const distanceFromCenter = Math.sqrt(offsetX * offsetX + offsetY * offsetY)
          if (distanceFromCenter > boundaryRadius) {
            const scale = boundaryRadius / distanceFromCenter
            points[i].x = center + offsetX * scale
            points[i].y = center + offsetY * scale
          }

          const shift = Math.sqrt(adjustments[i].x * adjustments[i].x + adjustments[i].y * adjustments[i].y)
          if (shift > maxShift) {
            maxShift = shift
          }
        }

        if (maxShift < 0.35) {
          break
        }
      }
    }

    const baseOrbit = resolvedIconSize * 0.22
    const orbitVariance = resolvedIconSize * 0.07
    const positioned: PositionedAnimal[] = points.map((point, index) => {
      const orbitRadius = Math.max(4, Math.min(resolvedIconSize * 0.32, baseOrbit + ((index % 3) - 1) * orbitVariance))
      const orbitDuration = 14 + (index % 4) * 3
      const orbitDelay = -index * 0.85
      return {
        animal: point.animal,
        x: point.x,
        y: point.y,
        order: index,
        orbitRadius,
        orbitDuration,
        orbitDelay,
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
        {positions.map(({ animal, x, y, order, orbitRadius, orbitDuration, orbitDelay }) => {
          const Icon = ICONS[animal.type] ?? GenericBirdIcon
          const style: CSSProperties & {
            ['--orbit-radius']?: string
            ['--orbit-duration']?: string
            ['--orbit-delay']?: string
          } = {
            left: x,
            top: y,
            width: iconSize,
            height: iconSize,
            marginLeft: -iconSize / 2,
            marginTop: -iconSize / 2,
          }
          style['--orbit-radius'] = `${orbitRadius}px`
          style['--orbit-duration'] = `${orbitDuration}s`
          style['--orbit-delay'] = `${orbitDelay}s`

          return (
            <div
              key={animal.id}
              className="absolute flex items-center justify-center rounded-full bg-slate-950/70 shadow-lg ring-1 ring-amber-200/50 corral-float"
              style={style}
            >
              <Icon
                aria-label={ANIMAL_TYPE_LABELS[animal.type] ?? 'Ave'}
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
