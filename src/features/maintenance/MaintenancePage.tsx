import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { nowIso } from '@/lib/time'
import { notify } from '@/lib/notifications'

export default function MaintenancePage(){
  const tasks = useLiveQuery(() => db.maintenance.toCollection().reverse().toArray(), [], [])
  const markClean = async () => {
    const id = crypto.randomUUID()
    await db.maintenance.add({ id, type: 'limpieza', status: 'hecho', completedAt: nowIso() })
    await db.history.add({ id: crypto.randomUUID(), date: nowIso(), type: 'maintenance', refId: id, summary: 'Limpieza marcada' })
    notify.success('Limpieza marcada')
  }
  return (<div className="space-y-4">
    <div className="flex items-center justify-between"><h1 className="text-xl font-semibold">Mantenimiento</h1><Button onClick={markClean}>Marcar limpieza de gallinero (hoy)</Button></div>
    <Card><CardHeader><CardTitle>Últimas acciones</CardTitle></CardHeader><CardContent className="space-y-2">
      {tasks?.length? tasks.map(t=>(<div key={t.id} className="flex items-center justify-between border-b border-white/10 pb-2">
        <div>{t.type}</div><div className="text-xs text-gray-400">{t.completedAt? new Date(t.completedAt).toLocaleString():'-'}</div>
      </div>)): <div className="text-gray-400">No hay registros aún.</div>}
    </CardContent></Card>
  </div>)
}
