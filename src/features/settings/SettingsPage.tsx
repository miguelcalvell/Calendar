import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { db } from '@/lib/db'
import type { Setting } from '@/types'

export default function SettingsPage(){
  const [theme,setTheme]=useState<'dark'|'light'>('dark'); const [lang,setLang]=useState<'es'|'en'>('es')
  useEffect(()=>{ document.documentElement.classList.toggle('dark', theme==='dark') },[theme])
  useEffect(()=>{ (async()=>{ const s=await db.settings.get('app'); if(s){ setTheme(s.theme==='light'?'light':'dark'); setLang((s.language as any)||'es') } else { await db.settings.put({ id:'app', theme:'dark', language:'es', createdAt:new Date().toISOString() } as Setting) } })() },[])
  useEffect(()=>{ db.settings.put({ id:'app', theme, language:lang, createdAt:new Date().toISOString(), updatedAt:new Date().toISOString() } as Setting) },[theme,lang])
  return (<div className="space-y-4"><h1 className="text-xl font-semibold">Ajustes</h1>
    <Card><CardHeader><CardTitle>Tema</CardTitle></CardHeader><CardContent><Select value={theme} onValueChange={(v)=>setTheme(v as any)}>
      <SelectTrigger><SelectValue placeholder="Tema"/></SelectTrigger><SelectContent><SelectItem value="dark">Oscuro</SelectItem><SelectItem value="light">Claro</SelectItem></SelectContent></Select></CardContent></Card>
    <Card><CardHeader><CardTitle>Idioma</CardTitle></CardHeader><CardContent><Select value={lang} onValueChange={(v)=>setLang(v as any)}>
      <SelectTrigger><SelectValue placeholder="Idioma"/></SelectTrigger><SelectContent><SelectItem value="es">Español</SelectItem><SelectItem value="en">English</SelectItem></SelectContent></Select></CardContent></Card>
  </div>)
}
