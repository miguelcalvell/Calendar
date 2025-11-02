import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SPECIES_CATALOG, type SpeciesDefinition } from '@/lib/calc'
import type { DietType, SpeciesId } from '@/types'
import { formatDietLabel } from '../utils'

export interface LoteEntryForm {
  id: string
  speciesId: SpeciesId
  phase: DietType
  quantity: string
  weightKg: string
  layingRate: string
  eggWeight: string
}

export interface LoteEntryErrors {
  quantity?: string
  weightKg?: string
  layingRate?: string
  eggWeight?: string
  phase?: string
}

interface LoteEditorProps {
  entries: LoteEntryForm[]
  errors: Record<string, LoteEntryErrors>
  totalAves: number
  m2PorAve: number
  onChange: (entries: LoteEntryForm[]) => void
  onAdd: () => void
  onRemove: (id: string) => void
}

const SPECIES_LIST = Object.values(SPECIES_CATALOG) as SpeciesDefinition[]

function getSpecies(speciesId: SpeciesId) {
  return SPECIES_CATALOG[speciesId]
}

function shouldShowLayingFields(species: SpeciesDefinition | undefined, phase: DietType) {
  if (!species) return false
  if (species.sexo === 'macho') return false
  return phase === 'layer' || phase === 'gamebird_adulto' || phase === 'adulto'
}

export function LoteEditor({ entries, errors, totalAves, m2PorAve, onChange, onAdd, onRemove }: LoteEditorProps) {
  const updateEntry = (id: string, updates: Partial<LoteEntryForm>) => {
    onChange(entries.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry)))
  }

  const handleSpeciesChange = (entry: LoteEntryForm, speciesId: SpeciesId) => {
    const species = getSpecies(speciesId)
    const fallbackPhase = species.defaults?.fase ?? species.dietas[0]?.fase ?? entry.phase
    updateEntry(entry.id, {
      speciesId,
      phase: fallbackPhase,
      layingRate: species.sexo === 'hembra' ? entry.layingRate : '',
      eggWeight: species.sexo === 'hembra' ? entry.eggWeight : '',
    })
  }

  const handlePhaseChange = (entry: LoteEntryForm, phase: DietType) => {
    const species = getSpecies(entry.speciesId)
    const show = shouldShowLayingFields(species, phase)
    updateEntry(entry.id, {
      phase,
      layingRate: show ? entry.layingRate : '',
      eggWeight: show ? entry.eggWeight : '',
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <CardTitle>Composición del lote</CardTitle>
        </div>
        <Badge className="border-emerald-400/40 bg-emerald-900/30 text-emerald-200">
          Resumen: Total aves: {totalAves} — m²/ave: {totalAves > 0 ? m2PorAve.toFixed(2) : '0.00'} (auto)
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {entries.length === 0 ? (
          <p className="text-sm text-gray-400">Añade especies para definir tu lote.</p>
        ) : (
          entries.map((entry) => {
            const species = getSpecies(entry.speciesId)
            const entryErrors = errors[entry.id] ?? {}
            const dietOptions = species?.dietas ?? []
            const showLaying = shouldShowLayingFields(species, entry.phase)
            return (
              <div key={entry.id} className="space-y-4 rounded-lg border border-white/10 p-4">
                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Especie</label>
                      <Select value={entry.speciesId} onValueChange={(value) => handleSpeciesChange(entry, value as SpeciesId)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Especie" />
                        </SelectTrigger>
                        <SelectContent>
                          {SPECIES_LIST.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Fase</label>
                      <Select
                        value={entry.phase}
                        onValueChange={(value) => handlePhaseChange(entry, value as DietType)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Fase" />
                        </SelectTrigger>
                        <SelectContent>
                          {dietOptions.map((diet) => (
                            <SelectItem key={`${entry.id}-${diet.fase}`} value={diet.fase}>
                              {formatDietLabel(diet.fase)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {entryErrors.phase ? <p className="text-xs text-red-400">{entryErrors.phase}</p> : null}
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Cantidad</label>
                      <Input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="1"
                        value={entry.quantity}
                        onChange={(event) => {
                          const value = event.target.value.replace(/[^0-9]/g, '')
                          updateEntry(entry.id, { quantity: value })
                        }}
                      />
                      {entryErrors.quantity ? <p className="text-xs text-red-400">{entryErrors.quantity}</p> : null}
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Peso vivo (kg)</label>
                      <Input
                        type="number"
                        inputMode="decimal"
                        step={0.1}
                        min={0}
                        placeholder={species?.peso_vivo_defecto_kg.toString() ?? '0'}
                        value={entry.weightKg}
                        onChange={(event) => updateEntry(entry.id, { weightKg: event.target.value })}
                      />
                      {entryErrors.weightKg ? <p className="text-xs text-red-400">{entryErrors.weightKg}</p> : null}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="self-end border-none bg-transparent text-sm hover:bg-white/10"
                    onClick={() => onRemove(entry.id)}
                  >
                    🗑️
                  </Button>
                </div>

                {showLaying ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Tasa de puesta</label>
                      <Input
                        type="number"
                        inputMode="decimal"
                        step={0.05}
                        min={0}
                        max={1}
                        placeholder={species?.defaults?.tasa_puesta?.toString() ?? '0'}
                        value={entry.layingRate}
                        onChange={(event) => updateEntry(entry.id, { layingRate: event.target.value })}
                      />
                      {entryErrors.layingRate ? <p className="text-xs text-red-400">{entryErrors.layingRate}</p> : null}
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Peso huevo (g)</label>
                      <Input
                        type="number"
                        inputMode="decimal"
                        step={1}
                        min={0}
                        placeholder="58"
                        value={entry.eggWeight}
                        onChange={(event) => updateEntry(entry.id, { eggWeight: event.target.value })}
                      />
                      {entryErrors.eggWeight ? <p className="text-xs text-red-400">{entryErrors.eggWeight}</p> : null}
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })
        )}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="outline" onClick={onAdd} type="button">
            + Añadir especie
          </Button>
          <div className="text-sm text-gray-400">
            Resumen: Total aves: {totalAves} — m²/ave: {totalAves > 0 ? m2PorAve.toFixed(2) : '0.00'} (auto)
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
