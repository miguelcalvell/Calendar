import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AddAnimalDialog } from './components/AddAnimalDialog'
import { useState } from 'react'

export default function AnimalsPage(){
  const animals = useLiveQuery(() => db.animals.toArray(), [], [])
  const [openAdd, setOpenAdd] = useState(false)
  return (<div className="space-y-4">
    <div className="flex items-center justify-between"><h1 className="text-xl font-semibold">Animales</h1><Button onClick={()=>setOpenAdd(true)}>Añadir</Button></div>
    <Card><CardHeader><CardTitle>Inventario</CardTitle></CardHeader><CardContent className="space-y-2">
      {animals?.length? animals.map(a=>(<div key={a.id} className="flex items-center justify-between border-b border-white/10 pb-2">
        <div><div className="font-medium">{a.type} {a.tag?`· ${a.tag}`:''}</div><div className="text-xs text-gray-400">{a.status}</div></div>
        <Badge>{a.status}</Badge>
      </div>)): <div className="text-gray-400">Sin animales aún.</div>}
    </CardContent></Card>
    <AddAnimalDialog open={openAdd} onOpenChange={setOpenAdd}/>
  </div>)
}
