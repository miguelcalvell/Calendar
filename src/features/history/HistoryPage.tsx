import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
export default function HistoryPage(){
  const events = useLiveQuery(() => db.history.toCollection().reverse().toArray(), [], [])
  return (<div className="space-y-4"><h1 className="text-xl font-semibold">Historial</h1>
    <Card><CardHeader><CardTitle>Eventos</CardTitle></CardHeader><CardContent className="space-y-2">
      {events?.length? events.map(e=>(<div key={e.id} className="flex items-center justify-between border-b border-white/10 pb-2">
        <div>{e.summary || e.type}</div><div className="text-xs text-gray-400">{new Date(e.date).toLocaleString()}</div>
      </div>)): <div className="text-gray-400">Sin eventos aún.</div>}
    </CardContent></Card></div>)
}
