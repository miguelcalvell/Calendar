import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SPECIES_CATALOG, type DietPhaseSpec, type SpeciesDefinition } from '@/lib/calc'
import type { SpeciesId } from '@/types'
import { formatDietLabel } from '../utils'

interface CatalogoCardProps {
  activos: Set<string>
}

function buildRows() {
  const rows: Array<{
    speciesId: SpeciesId
    speciesName: string
    diet: DietPhaseSpec
  }> = []
  const entries = Object.values(SPECIES_CATALOG) as SpeciesDefinition[]
  for (const species of entries) {
    for (const diet of species.dietas) {
      rows.push({ speciesId: species.id, speciesName: species.nombre, diet })
    }
  }
  return rows
}

const CATALOG_ROWS = buildRows()

function formatCa(diet: DietPhaseSpec) {
  const { ca_min_pct, ca_max_pct } = diet
  if (typeof ca_min_pct === 'number' && typeof ca_max_pct === 'number') {
    if (ca_min_pct === ca_max_pct) return `${ca_min_pct.toFixed(1)}%`
    return `${ca_min_pct.toFixed(1)}–${ca_max_pct.toFixed(1)}%`
  }
  if (typeof ca_min_pct === 'number') {
    return `≥${ca_min_pct.toFixed(1)}%`
  }
  if (typeof ca_max_pct === 'number') {
    return `≤${ca_max_pct.toFixed(1)}%`
  }
  return '—'
}

export function CatalogoCard({ activos }: CatalogoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Catálogo de comida</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-gray-400">
            <tr>
              <th className="px-3 py-2 font-semibold">Especie/Fase</th>
              <th className="px-3 py-2 font-semibold">Tipo de dieta</th>
              <th className="px-3 py-2 font-semibold">PB (%) / Ca (%)</th>
              <th className="px-3 py-2 font-semibold">ME (kcal/kg)</th>
            </tr>
          </thead>
          <tbody>
            {CATALOG_ROWS.map((row) => {
              const key = `${row.speciesId}|${row.diet.fase}`
              const isActive = activos.has(key)
              return (
                <tr
                  key={key}
                  className={
                    'border-t border-white/10 transition-colors ' +
                    (isActive ? 'bg-emerald-900/30 text-white' : 'hover:bg-white/5')
                  }
                >
                  <td className="px-3 py-2 font-medium">
                    <div className="flex flex-col">
                      <span>{row.speciesName}</span>
                      <span className="text-xs text-gray-400">Fase: {formatDietLabel(row.diet.fase)}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">{formatDietLabel(row.diet.fase)}</td>
                  <td className="px-3 py-2">
                    PB {row.diet.pb_min_pct.toFixed(0)}% / Ca {formatCa(row.diet)}
                  </td>
                  <td className="px-3 py-2">{row.diet.me_kcal_kg ?? '—'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
