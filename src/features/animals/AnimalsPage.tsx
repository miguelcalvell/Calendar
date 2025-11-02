import { useState, useMemo } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Animal } from '@/types'
import { AddAnimalDialog } from './components/AddAnimalDialog'
import { VirtualCorral, ANIMAL_TYPE_LABELS } from './components/VirtualCorral'
import { notify } from '@/lib/notifications'

export default function AnimalsPage() {
  const animals = useLiveQuery(() => db.animals.toArray(), [], [])
  const [openAdd, setOpenAdd] = useState(false)

  const sortedAnimals = useMemo(() => {
    return (animals ?? []).slice().sort((a, b) => {
      const typeCompare = ANIMAL_TYPE_LABELS[a.type].localeCompare(ANIMAL_TYPE_LABELS[b.type])
      if (typeCompare !== 0) return typeCompare
      return (a.tag ?? a.id).localeCompare(b.tag ?? b.id)
    })
  }, [animals])

  const handleRemoveAnimal = async (animal: Animal) => {
    const label = ANIMAL_TYPE_LABELS[animal.type] ?? 'Ave'
    const confirmed = window.confirm(`¿Eliminar ${label} del corral? Esta acción no se puede deshacer.`)
    if (!confirmed) return
    try {
      await db.animals.delete(animal.id)
      notify.success(`${label} eliminada`)
    } catch (error) {
      console.error(error)
      notify.error('No se pudo eliminar el animal.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Animales</h1>
          <p className="text-sm text-slate-400">
            Consulta tu inventario y visualiza el corral virtual con tus aves.
          </p>
        </div>
        <Button onClick={() => setOpenAdd(true)} className="self-start">
          Añadir
        </Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Inventario</CardTitle>
            <CardDescription>Resumen de todas las aves registradas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {sortedAnimals.length ? (
              sortedAnimals.map((animal) => (
                <AnimalRow key={animal.id} animal={animal} onRemove={handleRemoveAnimal} />
              ))
            ) : (
              <div className="rounded-md border border-dashed border-white/10 p-6 text-center text-sm text-slate-400">
                Sin animales aún. Añade tu primera ave para verla en el corral.
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Corral virtual</CardTitle>
            <CardDescription>
              Visualización en planta del corral circular y las aves añadidas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sortedAnimals.length ? (
              <VirtualCorral animals={sortedAnimals} onRemoveAnimal={handleRemoveAnimal} />
            ) : (
              <div className="rounded-md border border-dashed border-white/10 p-6 text-center text-sm text-slate-400">
                Cuando registres aves aparecerán organizadas dentro del corral.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <AddAnimalDialog open={openAdd} onOpenChange={setOpenAdd} />
    </div>
  )
}

function AnimalRow({ animal, onRemove }: { animal: Animal; onRemove: (animal: Animal) => void }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-white/5 bg-slate-900/30 px-3 py-2">
      <div className="min-w-0">
        <div className="text-sm font-medium text-slate-100">
          {ANIMAL_TYPE_LABELS[animal.type]}
          {animal.tag ? <span className="text-slate-400"> · {animal.tag}</span> : null}
        </div>
        <div className="text-xs uppercase tracking-wide text-slate-400">{animal.status}</div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Badge className="border-emerald-500/40 bg-emerald-500/20 text-emerald-100">
          {animal.status}
        </Badge>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onRemove(animal)}
          className="h-8 border-rose-500/50 text-rose-200 hover:bg-rose-500/10"
        >
          Eliminar
        </Button>
      </div>
    </div>
  )
}
