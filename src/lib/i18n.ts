import React, { createContext, useContext, useMemo, useState } from 'react'

type Dict = Record<string, string>
type Ctx = { t: (k: string) => string; lang: string; setLang: (l: string) => void }

const es: Dict = {
  'app.title': 'Gallinero',
  'dashboard.title': 'Resumen',
  'offline': 'Sin conexión',
}

const dicts: Record<string, Dict> = { es }

const I18N = createContext<Ctx | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<'es' | 'en'>('es')
  const t = useMemo(() => (k: string) => dicts[lang]?.[k] ?? dicts.es[k] ?? k, [lang])
  return <I18N.Provider value={{ t, lang, setLang }}>{children}</I18N.Provider>
}

export function useT() {
  const ctx = useContext(I18N)
  if (!ctx) throw new Error('useT must be used within I18nProvider')
  return ctx
}