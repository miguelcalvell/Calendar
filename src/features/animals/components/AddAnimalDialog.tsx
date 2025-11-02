import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { db } from '@/lib/db'
import type { Animal, AnimalType } from '@/types'
import { SPECIES_CATALOG, getDefaultPhaseForSpecies } from '@/lib/calc'
import { nowIso } from '@/lib/time'
import { notify } from '@/lib/notifications'
import { useState } from 'react'

const ANIMAL_OPTIONS: Array<{ value: AnimalType; label: string; speciesId: Animal['speciesId'] }> = [
  { value: 'gallina', label: 'Gallina ponedora', speciesId: 'gallina_ponedora' },
  { value: 'gallo', label: 'Gallo', speciesId: 'gallo' },
  { value: 'kika', label: 'Kika (gallina enana)', speciesId: 'kika' },
  { value: 'kiko', label: 'Kiko (gallo enano)', speciesId: 'kiko' },
  { value: 'pavo_hembra', label: 'Pavo (hembra)', speciesId: 'pavo_hembra' },
  { value: 'pavo_macho', label: 'Pavo (macho)', speciesId: 'pavo_macho' },
  { value: 'pavoreal_hembra', label: 'Pavo real (hembra)', speciesId: 'pavoreal_hembra' },
  { value: 'pavoreal_macho', label: 'Pavo real (macho)', speciesId: 'pavoreal_macho' },
]

export function AddAnimalDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [type, setType] = useState<AnimalType>('gallina')
  const [count, setCount] = useState('1')
  const [tag, setTag] = useState('')
  const addAnimals = async () => {
    const sanitized = count.replace(/[^0-9]/g, '')
    const parsed = sanitized === '' ? NaN : Number.parseInt(sanitized, 10)
    const n = Number.isFinite(parsed) && parsed > 0 ? parsed : 1
    const createdAt = nowIso()
    const option = ANIMAL_OPTIONS.find((opt) => opt.value === type) ?? ANIMAL_OPTIONS[0]
    const species = option.speciesId ? SPECIES_CATALOG[option.speciesId] : undefined
    const defaultPhase = option.speciesId ? getDefaultPhaseForSpecies(option.speciesId) : 'layer'
    const defaultLaying = species?.defaults?.tasa_puesta
    const defaultEggWeight = species?.defaults?.peso_huevo_g

    const toAdd: Animal[] = Array.from({ length: n }, (_, i) => ({
      id: crypto.randomUUID(),
      type,
      speciesId: option.speciesId ?? 'gallina_ponedora',
      dietPhase: defaultPhase,
      layingRate: defaultLaying,
      eggWeightGrams: defaultEggWeight,
      tag: tag ? `${tag}${n > 1 ? '-' + String(i + 1).padStart(2, '0') : ''}` : undefined,
      status: 'activo',
      createdAt,
    }))
    await db.animals.bulkAdd(toAdd)
    await db.history.add({ id: crypto.randomUUID(), date: createdAt, type: 'add_animal', summary: `Añadidos ${n} ${type}` })
    notify.success(`${n} animales añadidos`)
    setCount('1')
    setTag('')
    onOpenChange(false)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir animales</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-sm">Tipo</label>
            <Select value={type} onValueChange={(v) => setType(v as AnimalType)}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                {ANIMAL_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label htmlFor="count" className="text-sm">
              Cantidad
            </label>
            <Input
              id="count"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="1"
              value={count}
              onChange={(event) => {
                const value = event.target.value.replace(/[^0-9]/g, '')
                setCount(value)
              }}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="tag" className="text-sm">
              Identificador base (opcional)
            </label>
            <Input id="tag" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="G-001" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={addAnimals}>Guardar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
