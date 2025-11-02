import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const baseProps = {
  role: 'img' as const,
  width: 48,
  height: 48,
  viewBox: '0 0 64 64',
}

export function GallinaIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M16 36c0-10 9-18 20-18 10 0 18 6 22 14" stroke="#c2410c" strokeWidth={2} strokeLinecap="round" />
      <ellipse cx={28} cy={42} rx={16} ry={12} fill="#fb923c" stroke="#ea580c" strokeWidth={2} />
      <circle cx={46} cy={30} r={6} fill="#fdba74" stroke="#ea580c" strokeWidth={2} />
      <path d="M50 28 58 26" stroke="#ea580c" strokeWidth={2} strokeLinecap="round" />
      <path d="M42 50l-4 10" stroke="#ea580c" strokeWidth={2} strokeLinecap="round" />
      <path d="M32 50l-2 10" stroke="#ea580c" strokeWidth={2} strokeLinecap="round" />
      <path d="M46 22c2-3 4-6 4-8" stroke="#f97316" strokeWidth={2} strokeLinecap="round" />
      <circle cx={48} cy={30} r={2} fill="#1f2937" />
    </svg>
  )
}

export function GalloIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M14 38c0-11 10-20 22-20 10 0 18 6 22 14" stroke="#7f1d1d" strokeWidth={2} strokeLinecap="round" />
      <ellipse cx={28} cy={44} rx={17} ry={12.5} fill="#f87171" stroke="#dc2626" strokeWidth={2} />
      <circle cx={46} cy={30} r={6.5} fill="#fca5a5" stroke="#dc2626" strokeWidth={2} />
      <path d="M50 28 60 26" stroke="#dc2626" strokeWidth={2} strokeLinecap="round" />
      <path d="M44 50l-3 10" stroke="#dc2626" strokeWidth={2} strokeLinecap="round" />
      <path d="M32 50l-2 10" stroke="#dc2626" strokeWidth={2} strokeLinecap="round" />
      <path d="M46 22c3-4 5-7 5-10" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" />
      <circle cx={48} cy={30} r={2} fill="#1f2937" />
    </svg>
  )
}

export function PolloIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M18 38c0-9 8-16 18-16 9 0 16 5 20 12" stroke="#a16207" strokeWidth={2} strokeLinecap="round" />
      <ellipse cx={28} cy={44} rx={16} ry={12} fill="#fde68a" stroke="#f59e0b" strokeWidth={2} />
      <circle cx={44} cy={32} r={5.5} fill="#fef3c7" stroke="#f59e0b" strokeWidth={2} />
      <path d="M47 30 54 28" stroke="#f59e0b" strokeWidth={2} strokeLinecap="round" />
      <path d="M40 50l-2 10" stroke="#f59e0b" strokeWidth={2} strokeLinecap="round" />
      <path d="M30 50l-1.5 10" stroke="#f59e0b" strokeWidth={2} strokeLinecap="round" />
      <path d="M44 24c1.5-2.5 3-5 3-7" stroke="#facc15" strokeWidth={2} strokeLinecap="round" />
      <circle cx={46} cy={32} r={1.8} fill="#1f2937" />
    </svg>
  )
}

export function PollitoIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M18 40c0-8 7-14 16-14 8 0 14 4 18 10" stroke="#d97706" strokeWidth={2} strokeLinecap="round" />
      <ellipse cx={28} cy={46} rx={14} ry={10.5} fill="#fde047" stroke="#eab308" strokeWidth={2} />
      <circle cx={42} cy={34} r={5} fill="#fef3c7" stroke="#eab308" strokeWidth={2} />
      <path d="M45 32 52 30" stroke="#eab308" strokeWidth={2} strokeLinecap="round" />
      <path d="M36 50l-1.5 8" stroke="#eab308" strokeWidth={2} strokeLinecap="round" />
      <path d="M28 50l-1 8" stroke="#eab308" strokeWidth={2} strokeLinecap="round" />
      <circle cx={44} cy={34} r={1.6} fill="#1f2937" />
    </svg>
  )
}

export function PavoIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M10 42c0-14 12-26 26-26s26 12 26 26" stroke="#94a3b8" strokeWidth={2} strokeLinecap="round" />
      <path d="M18 44c0-10 9-18 18-18 9 0 16 5 20 12" stroke="#cbd5f5" strokeWidth={2} strokeLinecap="round" />
      <ellipse cx={30} cy={48} rx={16} ry={11.5} fill="#f8fafc" stroke="#cbd5f5" strokeWidth={2} />
      <circle cx={48} cy={36} r={6} fill="#e2e8f0" stroke="#cbd5f5" strokeWidth={2} />
      <path d="M52 34 60 32" stroke="#94a3b8" strokeWidth={2} strokeLinecap="round" />
      <path d="M40 52l-3 10" stroke="#94a3b8" strokeWidth={2} strokeLinecap="round" />
      <path d="M30 52l-2 10" stroke="#94a3b8" strokeWidth={2} strokeLinecap="round" />
      <circle cx={50} cy={36} r={2} fill="#1f2937" />
    </svg>
  )
}

export function PavoRealIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M8 44c0-16 12-30 28-30s28 14 28 30" stroke="#047857" strokeWidth={2} strokeLinecap="round" />
      <path d="M16 46c0-11 10-20 20-20 10 0 18 6 22 14" stroke="#34d399" strokeWidth={2} strokeLinecap="round" />
      <ellipse cx={30} cy={50} rx={16} ry={11.5} fill="#4ade80" stroke="#047857" strokeWidth={2} />
      <circle cx={48} cy={38} r={6} fill="#bbf7d0" stroke="#047857" strokeWidth={2} />
      <path d="M52 36 60 34" stroke="#0f766e" strokeWidth={2} strokeLinecap="round" />
      <path d="M38 52l-3 10" stroke="#0f766e" strokeWidth={2} strokeLinecap="round" />
      <path d="M28 52l-2 10" stroke="#0f766e" strokeWidth={2} strokeLinecap="round" />
      <circle cx={50} cy={38} r={2} fill="#1f2937" />
      <circle cx={36} cy={24} r={4} fill="#22d3ee" stroke="#0f766e" strokeWidth={2} />
    </svg>
  )
}

export function KikoIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M20 40c0-9 8-16 17-16 8 0 14 4 18 10" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
      <ellipse cx={28} cy={46} rx={14} ry={10.5} fill="#e5e7eb" stroke="#64748b" strokeWidth={2} />
      <circle cx={42} cy={34} r={5.5} fill="#f1f5f9" stroke="#64748b" strokeWidth={2} />
      <path d="M45 32 52 30" stroke="#64748b" strokeWidth={2} strokeLinecap="round" />
      <path d="M34 50l-1.5 9" stroke="#64748b" strokeWidth={2} strokeLinecap="round" />
      <path d="M26 50l-1 9" stroke="#64748b" strokeWidth={2} strokeLinecap="round" />
      <circle cx={44} cy={34} r={1.6} fill="#1f2937" />
    </svg>
  )
}

export function KikaIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M18 40c0-9 8-16 17-16 8 0 14 4 18 10" stroke="#b56475" strokeWidth={2} strokeLinecap="round" />
      <ellipse cx={28} cy={46} rx={15} ry={11} fill="#f5d0e6" stroke="#b45468" strokeWidth={2} />
      <circle cx={44} cy={34} r={5.5} fill="#f8d7ec" stroke="#b45468" strokeWidth={2} />
      <path d="M47 32 54 30" stroke="#b45468" strokeWidth={2} strokeLinecap="round" />
      <path d="M36 50l-2 9" stroke="#b45468" strokeWidth={2} strokeLinecap="round" />
      <path d="M28 50l-1.5 9" stroke="#b45468" strokeWidth={2} strokeLinecap="round" />
      <circle cx={46} cy={34} r={1.6} fill="#1f2937" />
    </svg>
  )
}

export function GenericBirdIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M18 38c0-10 9-18 20-18 9 0 16 5 20 12" stroke="#64748b" strokeWidth={2} strokeLinecap="round" />
      <ellipse cx={30} cy={44} rx={16} ry={12} fill="#e2e8f0" stroke="#475569" strokeWidth={2} />
      <circle cx={46} cy={32} r={6} fill="#f1f5f9" stroke="#475569" strokeWidth={2} />
      <path d="M50 30 58 28" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
      <path d="M38 50l-2 10" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
      <path d="M28 50l-2 10" stroke="#475569" strokeWidth={2} strokeLinecap="round" />
      <circle cx={48} cy={32} r={1.8} fill="#1f2937" />
    </svg>
  )
}
