import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ChangeEvent } from 'react'

export interface EntornoState {
  T_ambiente_C: number
  horas_pastoreo_dia: number
  calidad_pradera_Q: number
  area_finca_m2: number
  f_actividad: number
}

interface EntornoCardProps {
  values: EntornoState
  totalAves: number
  m2PorAve: number
  onChange: (changes: Partial<EntornoState>) => void
}

function parseNumber(value: string) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function EntornoCard({ values, totalAves, m2PorAve, onChange }: EntornoCardProps) {
  const handleInputNumber = (event: ChangeEvent<HTMLInputElement>, key: keyof EntornoState) => {
    const nextValue = event.target.value
    if (nextValue === '') {
      onChange({ [key]: 0 } as Partial<EntornoState>)
      return
    }
    onChange({ [key]: parseNumber(nextValue) } as Partial<EntornoState>)
  }

  const handleSlider = (event: ChangeEvent<HTMLInputElement>, key: keyof EntornoState) => {
    onChange({ [key]: parseNumber(event.target.value) } as Partial<EntornoState>)
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <CardTitle>Entorno</CardTitle>
          <CardDescription>Parámetros ambientales del lote</CardDescription>
        </div>
        <div className="text-xs text-gray-400 sm:text-right">
          Ajusta temperatura y pastoreo para ver cómo cambian los consumos.
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="temp-input">
              Temperatura (°C)
            </label>
            <Input
              id="temp-input"
              type="number"
              inputMode="decimal"
              min={-5}
              max={45}
              placeholder="24"
              value={Number.isFinite(values.T_ambiente_C) ? values.T_ambiente_C : ''}
              onChange={(event) => handleInputNumber(event, 'T_ambiente_C')}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="pasture-hours">
              Horas de pastoreo (H)
            </label>
            <div className="flex items-center gap-3">
              <input
                id="pasture-hours"
                type="range"
                min={0}
                max={10}
                step={0.5}
                value={values.horas_pastoreo_dia}
                onChange={(event) => handleSlider(event, 'horas_pastoreo_dia')}
                className="h-2 flex-1 appearance-none rounded bg-white/10"
              />
              <Input
                className="w-20"
                type="number"
                inputMode="decimal"
                min={0}
                max={10}
                step={0.5}
                value={values.horas_pastoreo_dia}
                onChange={(event) => handleInputNumber(event, 'horas_pastoreo_dia')}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="pasture-quality">
              Calidad de pradera (Q)
            </label>
            <div className="flex items-center gap-3">
              <input
                id="pasture-quality"
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={values.calidad_pradera_Q}
                onChange={(event) => handleSlider(event, 'calidad_pradera_Q')}
                className="h-2 flex-1 appearance-none rounded bg-white/10"
              />
              <Input
                className="w-20"
                type="number"
                inputMode="decimal"
                min={0}
                max={1}
                step={0.1}
                value={values.calidad_pradera_Q}
                onChange={(event) => handleInputNumber(event, 'calidad_pradera_Q')}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="area-input">
              Área de finca (m²)
            </label>
            <Input
              id="area-input"
              type="number"
              inputMode="decimal"
              min={0}
              placeholder="3000"
              value={Number.isFinite(values.area_finca_m2) ? values.area_finca_m2 : ''}
              onChange={(event) => handleInputNumber(event, 'area_finca_m2')}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="total-birds">
              Nº total de aves
            </label>
            <Input id="total-birds" value={totalAves > 0 ? totalAves : 0} readOnly />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="area-per-bird">
              m² por ave
            </label>
            <Input
              id="area-per-bird"
              value={totalAves > 0 ? m2PorAve.toFixed(2) : '0.00'}
              readOnly
            />
          </div>
        </div>
        <p className="text-sm text-gray-400">
          El consumo de agua aumenta con el calor. El pastoreo reduce el pienso si hay buena pradera.
        </p>
      </CardContent>
    </Card>
  )
}
