import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { db } from '@/lib/db'
import type { Animal } from '@/types'
import { nowIso } from '@/lib/time'
import { notify } from '@/lib/notifications'
import { useState } from 'react'

export function AddAnimalDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean)=>void }){
  const [type, setType] = useState<'gallina'|'gallo'|'pollito'|'otro'>('gallina')
  const [count, setCount] = useState(1)
  const [tag, setTag] = useState('')
  const addAnimals = async () => {
    const n = Math.max(1, Math.floor(count))
    const createdAt = nowIso()
    const toAdd: Animal[] = Array.from({ length: n }, (_, i) => ({
      id: crypto.randomUUID(), type, tag: tag ? `${tag}${n>1?'-'+String(i+1).padStart(2,'0'):''}` : undefined, status: 'activo', createdAt
    }))
    await db.animals.bulkAdd(toAdd)
    await db.history.add({ id: crypto.randomUUID(), date: createdAt, type: 'add_animal', summary: `Añadidos ${n} ${type}` })
    notify.success(`${n} animales añadidos`); onOpenChange(false)
  }
  return (<Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent><DialogHeader><DialogTitle>Añadir animales</DialogTitle></DialogHeader>
      <div className="space-y-3">
        <div className="space-y-1"><label className="text-sm">Tipo</label>
          <Select value={type} onValueChange={(v)=>setType(v as any)}>
            <SelectTrigger><SelectValue placeholder="Tipo"/></SelectTrigger>
            <SelectContent><SelectItem value="gallina">Gallina</SelectItem><SelectItem value="gallo">Gallo</SelectItem><SelectItem value="pollito">Pollito</SelectItem><SelectItem value="otro">Otro</SelectItem></SelectContent>
          </Select>
        </div>
        <div className="space-y-1"><label htmlFor="count" className="text-sm">Cantidad</label>
          <Input id="count" type="number" min={1} value={count} onChange={(e)=>setCount(Number(e.target.value))} placeholder="1"/>
        </div>
        <div className="space-y-1"><label htmlFor="tag" className="text-sm">Identificador base (opcional)</label>
          <Input id="tag" value={tag} onChange={(e)=>setTag(e.target.value)} placeholder="G-001"/>
        </div>
        <div className="pt-2 flex gap-2 justify-end"><Button variant="outline" onClick={()=>onOpenChange(false)}>Cancelar</Button><Button onClick={addAnimals}>Guardar</Button></div>
      </div>
    </DialogContent>
  </Dialog>)
}
