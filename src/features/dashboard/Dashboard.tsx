import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { EntornoCard, type EntornoState } from './components/EntornoCard'
import { CatalogoCard } from './components/CatalogoCard'
import { LoteEditor, type LoteEntryErrors, type LoteEntryForm } from './components/LoteEditor'
import { ResultadosCard, type ResultadoFila, type ResultadosResumen } from './components/ResultadosCard'
import { formatDietLabel } from './utils'
import { notify } from '@/lib/notifications'
import {
  SPECIES_CATALOG,
  calcularLote,
  type AveInput,
  type LoteResultado,
  type SpeciesDefinition,
} from '@/lib/calc'
import type { DietType, SpeciesId } from '@/types'

const DEFAULT_ENTORNO: EntornoState = {
  T_ambiente_C: 24,
  horas_pastoreo_dia: 6,
  calidad_pradera_Q: 0.8,
  area_finca_m2: 3000,
  f_actividad: 1,
}

interface DashboardResults {
  filas: ResultadoFila[]
  resumen: ResultadosResumen
}

function createEntry(speciesId: SpeciesId = 'gallina_ponedora'): LoteEntryForm {
  const species = SPECIES_CATALOG[speciesId]
  const fase = species.defaults?.fase ?? species.dietas[0]?.fase ?? 'layer'
  return {
    id: crypto.randomUUID(),
    speciesId,
    phase: fase,
    quantity: '10',
    weightKg: '',
    layingRate: '',
    eggWeight: '',
  }
}

interface ValidationResult {
  errors: Record<string, LoteEntryErrors>
  hasErrors: boolean
  totalAves: number
}

function parsePositiveNumber(value: string) {
  if (value.trim() === '') return NaN
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : NaN
}

function validateEntries(entries: LoteEntryForm[]): ValidationResult {
  const errors: Record<string, LoteEntryErrors> = {}
  let hasErrors = false
  let totalAves = 0

  for (const entry of entries) {
    const entryErrors: LoteEntryErrors = {}
    const species = SPECIES_CATALOG[entry.speciesId]
    const quantity = parsePositiveNumber(entry.quantity)
    if (!Number.isInteger(quantity) || quantity < 1) {
      entryErrors.quantity = 'Ingresa una cantidad ≥ 1'
      hasErrors = true
    } else {
      totalAves += quantity
    }

    if (entry.weightKg.trim() !== '') {
      const weight = parsePositiveNumber(entry.weightKg)
      if (!Number.isFinite(weight) || weight <= 0) {
        entryErrors.weightKg = 'Peso debe ser mayor que 0'
        hasErrors = true
      }
    }

    if (!species.dietas.some((diet) => diet.fase === entry.phase)) {
      entryErrors.phase = 'Fase no disponible para la especie'
      hasErrors = true
    }

    if (entry.layingRate.trim() !== '') {
      const rate = Number(entry.layingRate)
      if (!Number.isFinite(rate) || rate < 0 || rate > 1) {
        entryErrors.layingRate = 'Tasa entre 0 y 1'
        hasErrors = true
      }
    }

    if (entry.eggWeight.trim() !== '') {
      const egg = Number(entry.eggWeight)
      if (!Number.isFinite(egg) || egg <= 0) {
        entryErrors.eggWeight = 'Peso debe ser mayor que 0'
        hasErrors = true
      }
    }

    if (Object.keys(entryErrors).length > 0) {
      errors[entry.id] = entryErrors
    }
  }

  return { errors, hasErrors, totalAves }
}

function buildAveInputs(entries: LoteEntryForm[]): AveInput[] {
  const aves: AveInput[] = []

  for (const entry of entries) {
    const species = SPECIES_CATALOG[entry.speciesId]
    const quantity = Number.parseInt(entry.quantity, 10)
    if (!species || !Number.isFinite(quantity) || quantity <= 0) continue

    const weight = entry.weightKg.trim() === '' ? undefined : Number(entry.weightKg)
    const layingRate = entry.layingRate.trim() === '' ? undefined : Number(entry.layingRate)
    const eggWeight = entry.eggWeight.trim() === '' ? undefined : Number(entry.eggWeight)

    for (let index = 0; index < quantity; index += 1) {
      aves.push({
        especie_id: entry.speciesId,
        fase: entry.phase,
        peso_vivo_kg: weight,
        tasa_puesta: layingRate,
        peso_huevo_g: eggWeight,
      })
    }
  }

  return aves
}

interface AggregateBucket {
  species: SpeciesDefinition
  phase: DietType
  quantity: number
  feedTotal: number
  waterTotal: number
  fsSum: number
  alerts: Set<string>
}

function aggregateLote(lote: LoteResultado): DashboardResults {
  const buckets = new Map<string, AggregateBucket>()

  for (const detalle of lote.detalle_aves) {
    const species = SPECIES_CATALOG[detalle.especie_id]
    const key = `${detalle.especie_id}|${detalle.fase}`
    let bucket = buckets.get(key)
    if (!bucket) {
      bucket = {
        species,
        phase: detalle.fase,
        quantity: 0,
        feedTotal: 0,
        waterTotal: 0,
        fsSum: 0,
        alerts: new Set<string>(),
      }
      buckets.set(key, bucket)
    }

    bucket.quantity += 1
    bucket.feedTotal += detalle.consumo_final_g
    bucket.waterTotal += detalle.agua_L_d
    bucket.fsSum += detalle.fs_aplicada
    detalle.alertas.forEach((alerta) => bucket!.alerts.add(alerta))
  }

  const filas: ResultadoFila[] = Array.from(buckets.entries()).map(([key, bucket]) => {
    const feedPerAve = bucket.quantity > 0 ? bucket.feedTotal / bucket.quantity : 0
    const waterPerAve = bucket.quantity > 0 ? bucket.waterTotal / bucket.quantity : 0
    const fsPercent = bucket.quantity > 0 ? (bucket.fsSum / bucket.quantity) * 100 : 0
    return {
      key,
      speciesId: bucket.species.id,
      speciesName: bucket.species.nombre,
      phase: bucket.phase,
      dietLabel: formatDietLabel(bucket.phase),
      quantity: bucket.quantity,
      feedPerAve,
      feedTotal: bucket.feedTotal,
      waterPerAve,
      waterTotal: bucket.waterTotal,
      fsPercent,
      alerts: Array.from(bucket.alerts),
    }
  })

  filas.sort((a, b) => a.speciesName.localeCompare(b.speciesName))

  const feedBase = lote.resumen_pienso_base_g_dia
  const feedFinal = lote.resumen_pienso_g_dia
  const savings = feedBase - feedFinal
  const feedKgWeek = (feedFinal * 7) / 1000

  const resumen: ResultadosResumen = {
    feedBase,
    feedFinal,
    water: lote.resumen_agua_L_dia,
    reductionPercent: lote.reduccion_pastoreo_pct,
    savings,
    feedKgWeek,
    globalAlerts: lote.alertas_globales,
  }

  return { filas, resumen }
}

function buildActivePairs(entries: LoteEntryForm[]) {
  const active = new Set<string>()
  for (const entry of entries) {
    active.add(`${entry.speciesId}|${entry.phase}`)
  }
  return active
}

function csvEscape(value: string | number) {
  const str = String(value)
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export default function Dashboard() {
  const [entorno, setEntorno] = useState<EntornoState>(DEFAULT_ENTORNO)
  const [entries, setEntries] = useState<LoteEntryForm[]>([createEntry()])
  const [resultados, setResultados] = useState<DashboardResults | null>(null)

  const validation = useMemo(() => validateEntries(entries), [entries])
  const totalAves = validation.totalAves
  const m2PorAve = totalAves > 0 ? entorno.area_finca_m2 / totalAves : 0
  const activos = useMemo(() => buildActivePairs(entries), [entries])

  const handleEntornoChange = (changes: Partial<EntornoState>) => {
    setEntorno((prev) => ({ ...prev, ...changes }))
  }

  const handleEntriesChange = (nextEntries: LoteEntryForm[]) => {
    setEntries(nextEntries)
  }

  const handleAddEntry = () => {
    setEntries((prev) => [...prev, createEntry()])
  }

  const handleRemoveEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  const handleCalculate = () => {
    if (entries.length === 0) {
      notify.info('Añade al menos una especie al lote.')
      return
    }
    if (validation.hasErrors) {
      notify.error('Corrige los errores en el lote antes de calcular.')
      return
    }
    if (totalAves <= 0) {
      notify.error('Ingresa cantidades válidas para calcular el plan.')
      return
    }

    try {
      const aves = buildAveInputs(entries)
      const lote = calcularLote(
        {
          id: 'lote_ui',
          aves,
        },
        { ...entorno, n_aves_total: totalAves },
      )
      const agregados = aggregateLote(lote)
      setResultados(agregados)
      notify.success('Cálculo actualizado')
    } catch (error) {
      console.error(error)
      notify.error('No se pudo calcular el plan. Revisa los datos ingresados.')
    }
  }

  const handleExport = () => {
    if (!resultados || resultados.filas.length === 0) {
      notify.info('Calcula el lote antes de exportar el CSV.')
      return
    }
    const lines: string[] = []
    lines.push('especie,fase,tipo_dieta,cantidad,consumo_g_por_ave,consumo_total_g,agua_L_por_ave,agua_total_L,fs_pct,alertas')
    for (const fila of resultados.filas) {
      const fields = [
        csvEscape(fila.speciesName),
        csvEscape(fila.phase),
        csvEscape(fila.dietLabel),
        csvEscape(fila.quantity),
        csvEscape(fila.feedPerAve.toFixed(0)),
        csvEscape(fila.feedTotal.toFixed(0)),
        csvEscape(fila.waterPerAve.toFixed(2)),
        csvEscape(fila.waterTotal.toFixed(2)),
        csvEscape(fila.fsPercent.toFixed(1)),
        csvEscape(fila.alerts.join(' | ')),
      ]
      lines.push(fields.join(','))
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'gallinero-plan.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setEntorno(DEFAULT_ENTORNO)
    setEntries([createEntry()])
    setResultados(null)
    notify.info('Parámetros restablecidos')
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gallinero — Inicio</h1>
          <p className="text-gray-400">Plan de alimento y agua</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleCalculate}>Calcular</Button>
          <Button variant="outline" onClick={handleExport} disabled={!resultados}>
            Exportar CSV
          </Button>
          <Button
            variant="outline"
            className="border-none bg-transparent text-sm font-medium underline-offset-4 hover:bg-white/10 hover:underline"
            onClick={handleReset}
          >
            Restablecer
          </Button>
        </div>
      </header>

      <EntornoCard values={entorno} totalAves={totalAves} m2PorAve={m2PorAve} onChange={handleEntornoChange} />
      <CatalogoCard activos={activos} />
      <LoteEditor
        entries={entries}
        errors={validation.errors}
        totalAves={totalAves}
        m2PorAve={m2PorAve}
        onChange={handleEntriesChange}
        onAdd={handleAddEntry}
        onRemove={handleRemoveEntry}
      />
      <ResultadosCard filas={resultados?.filas ?? []} resumen={resultados?.resumen ?? null} />
    </div>
  )
}
