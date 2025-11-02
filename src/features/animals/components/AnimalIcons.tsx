import type { SVGProps } from 'react'

const baseProps = {
  role: 'img' as const,
  width: 48,
  height: 48,
  viewBox: '0 0 64 64',
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  strokeWidth: 2,
}

type IconProps = SVGProps<SVGSVGElement>

export function GallinaIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M20 34c0-8 6-14 14-14h6" stroke="#f97316" />
      <path d="M40 20s2-6 6-6" stroke="#f97316" />
      <path d="M46 18c0 4-3 7-7 7" stroke="#f97316" />
      <path d="M18 38c0 8 6 16 16 16s16-8 16-16-6-14-16-14-16 6-16 14Z" fill="#fb923c" stroke="#f97316" />
      <circle cx={24} cy={32} r={2} fill="#1f2937" />
      <path d="M44 44l6 6" stroke="#f97316" />
      <path d="M38 48l4 8" stroke="#f97316" />
    </svg>
  )
}

export function GalloIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M22 36c0-6 5-12 14-12" stroke="#c026d3" />
      <path d="M42 24c2-6 6-10 10-10" stroke="#dc2626" />
      <path d="M46 18c0 5-4 9-9 9" stroke="#dc2626" />
      <path d="M20 40c0 10 7 18 18 18s18-8 18-18-7-16-18-16-18 6-18 16Z" fill="#f87171" stroke="#dc2626" />
      <circle cx={28} cy={36} r={2} fill="#1f2937" />
      <path d="M48 48l8 4" stroke="#dc2626" />
      <path d="M38 52l4 8" stroke="#dc2626" />
    </svg>
  )
}

export function PolloIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M36 24c6 0 12 6 12 12" stroke="#facc15" />
      <path d="M22 34c0-6 6-12 14-12" stroke="#facc15" />
      <path d="M18 38c0 8 6 16 16 16s16-8 16-16-6-14-16-14-16 6-16 14Z" fill="#fde047" stroke="#facc15" />
      <circle cx={28} cy={36} r={2} fill="#1f2937" />
      <path d="M44 46l6 6" stroke="#facc15" />
      <path d="M38 48l4 8" stroke="#facc15" />
    </svg>
  )
}

export function PollitoIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M32 24c-8 0-14 6-14 12" stroke="#fbbf24" />
      <path d="M18 38c0 7 5 14 14 14s14-7 14-14-5-12-14-12-14 5-14 12Z" fill="#fcd34d" stroke="#fbbf24" />
      <circle cx={28} cy={36} r={2} fill="#1f2937" />
      <path d="M40 44l6 6" stroke="#fbbf24" />
      <path d="M34 46l2 8" stroke="#fbbf24" />
    </svg>
  )
}

export function PavoIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M32 18c12 0 22 10 22 22" stroke="#0f172a" />
      <path d="M10 40c0-12 10-22 22-22" stroke="#0f172a" />
      <path d="M14 42c0 10 8 18 18 18s18-8 18-18-8-16-18-16-18 6-18 16Z" fill="#38bdf8" stroke="#0ea5e9" />
      <path d="M18 34c0-6 5-10 14-10" stroke="#0ea5e9" />
      <circle cx={30} cy={36} r={2} fill="#1f2937" />
      <path d="M46 48l8 6" stroke="#0ea5e9" />
      <path d="M36 50l4 8" stroke="#0ea5e9" />
    </svg>
  )
}

export function KikoIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M22 32c0-8 8-14 16-14" stroke="#7c3aed" />
      <path d="M40 22c2-4 6-6 10-6" stroke="#22d3ee" />
      <path d="M18 38c0 9 7 18 18 18s18-9 18-18-7-15-18-15-18 6-18 15Z" fill="#a855f7" stroke="#7c3aed" />
      <circle cx={28} cy={34} r={2} fill="#1f2937" />
      <path d="M44 46l8 6" stroke="#7c3aed" />
      <path d="M36 48l4 8" stroke="#7c3aed" />
    </svg>
  )
}

export function PavoRealIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 40c0-14 10-24 22-24s22 10 22 24" stroke="#0ea5e9" />
      <path d="M18 42c0 10 8 18 18 18s18-8 18-18-8-16-18-16-18 6-18 16Z" fill="#34d399" stroke="#059669" />
      <path d="M22 30c0-4 5-8 14-8s14 4 14 8" stroke="#22d3ee" />
      <circle cx={32} cy={34} r={2} fill="#1f2937" />
      <path d="M44 46l10 6" stroke="#14b8a6" />
      <path d="M36 48l4 8" stroke="#14b8a6" />
      <circle cx={32} cy={22} r={3} fill="#0ea5e9" stroke="#14b8a6" />
    </svg>
  )
}

export function GenericBirdIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M22 34c0-8 6-14 14-14" stroke="#94a3b8" />
      <path d="M18 38c0 8 6 16 16 16s16-8 16-16-6-14-16-14-16 6-16 14Z" fill="#cbd5f5" stroke="#94a3b8" />
      <circle cx={28} cy={36} r={2} fill="#1f2937" />
      <path d="M40 46l6 6" stroke="#94a3b8" />
      <path d="M34 48l4 8" stroke="#94a3b8" />
    </svg>
  )
}
