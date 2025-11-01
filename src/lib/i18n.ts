import React, { createContext, useContext, useMemo, useState } from 'react'

type Dict = Record<string, string>
type Lang = 'es' | 'en'
type Ctx = { t: (k: string) => string; lang: Lang; setLang: (l: Lang) => void }

const ES: Dict = {
  'app.title': 'Gallinero',
  'dashboard.title': 'Resumen',
  'offline': 'Sin conexión',
}

// You can add EN strings later; keep it empty for now
const DICTS: Record<Lang, Dict> = { es: ES, en: {} }

const I18N = createContext<Ctx | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')

  // No optional chaining / nullish coalescing → safest for the parser
  const t = useMemo(() => {
    return (k: string) => {
      const current = DICTS[lang] || ES
      if (current && Object.prototype.hasOwnProperty.call(current, k)) {
        return current[k]
      }
      if (Object.prototype.hasOwnProperty.call(ES, k)) {
        return ES[k]
      }
      return k
    }
  }, [lang])

  return <I18N.Provider value={{ t, lang, setLang }}>{children}</I18N.Provider>
}

export function useT() {
  const ctx = useContext(I18N)
  if (!ctx) throw new Error('useT must be used within I18nProvider')
  return ctx
}