import { useState, useMemo } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Animal } from '@/types'
import { AddAnimalDialog } from './components/AddAnimalDialog'
import { VirtualCorral, ANIMAL_TYPE_LABELS } from './components/VirtualCorral'

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
              sortedAnimals.map((animal) => <AnimalRow key={animal.id} animal={animal} />)
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
              <VirtualCorral animals={sortedAnimals} />
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

function AnimalRow({ animal }: { animal: Animal }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-white/5 bg-slate-900/30 px-3 py-2">
      <div>
        <div className="text-sm font-medium text-slate-100">
          {ANIMAL_TYPE_LABELS[animal.type]}
          {animal.tag ? <span className="text-slate-400"> · {animal.tag}</span> : null}
        </div>
        <div className="text-xs uppercase tracking-wide text-slate-400">{animal.status}</div>
      </div>
      <Badge className="border-emerald-500/40 bg-emerald-500/20 text-emerald-100">
        {animal.status}
      </Badge>
    </div>
  )
}
