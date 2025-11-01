import React, { createContext, useContext, useMemo, useState } from 'react'
type Dict = Record<string,string>
const es: Dict = {'app.title':'Gallinero','dashboard.title':'Resumen','offline':'Sin conexión'}
const dicts = { es }
const Ctx = createContext<{t:(k:string)=>string;lang:string;setLang:(l:string)=>void}|null>(null)
export function I18nProvider({children}:{children:React.ReactNode}){
  const [lang,setLang]=useState('es'); const t=useMemo(()=> (k:string)=> dicts[lang]?.[k]??dicts.es[k]??k,[lang])
  return <Ctx.Provider value={{t,lang,setLang}}>{children}</Ctx.Provider>
}
export const useT=()=>{const c=useContext(Ctx); if(!c) throw new Error('useT must be used within I18nProvider'); return c}
