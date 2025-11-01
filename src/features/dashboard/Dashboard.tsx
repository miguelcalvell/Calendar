import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { dailyFeedGrams, dailyWaterMl, gramsToKg, mlToL } from '@/lib/calc'
import { Plus, CheckSquare } from 'lucide-react'
import { AddAnimalDialog } from '@/features/animals/components/AddAnimalDialog'
import { useState } from 'react'
import { notify } from '@/lib/notifications'
import { nowIso } from '@/lib/time'

export default function Dashboard(){
  const animals = useLiveQuery(() => db.animals.where('status').equals('activo').toArray(), [], [])
  const count = animals?.length ?? 0
  const [openAdd, setOpenAdd] = useState(false)
  const handleCleanToday = async () => {
    const id = crypto.randomUUID()
    await db.maintenance.add({ id, type: 'limpieza', status: 'hecho', completedAt: nowIso() })
    await db.history.add({ id: crypto.randomUUID(), date: nowIso(), type: 'maintenance', refId: id, summary: 'Limpieza marcada' })
    notify.success('Limpieza marcada para hoy')
  }
  const feedG = dailyFeedGrams(count)
  const waterMl = dailyWaterMl(count)
  return (<div className="space-y-4">
    <div className="flex gap-2">
      <Button onClick={()=>setOpenAdd(true)} className="flex-1"><Plus className="mr-2" size={16}/> Añadir animales</Button>
      <Button variant="outline" onClick={handleCleanToday} className="flex-1"><CheckSquare className="mr-2" size={16}/> Marcar limpieza</Button>
    </div>
    <Card><CardHeader><CardTitle>Totales</CardTitle></CardHeader><CardContent className="grid grid-cols-2 gap-4 text-center">
      <div><div className="text-3xl font-bold">{count}</div><div className="text-sm text-gray-300">Animales activos</div></div>
      <div><div className="text-3xl font-bold">{Math.round(feedG)} g</div><div className="text-sm text-gray-300">Comida diaria</div></div>
      <div><div className="text-3xl font-bold">{gramsToKg(feedG)} kg</div><div className="text-sm text-gray-300">Comida (kg)</div></div>
      <div><div className="text-3xl font-bold">{mlToL(waterMl)} L</div><div className="text-sm text-gray-300">Agua diaria</div></div>
    </CardContent></Card>
    <AddAnimalDialog open={openAdd} onOpenChange={setOpenAdd}/>
  </div>)
}
