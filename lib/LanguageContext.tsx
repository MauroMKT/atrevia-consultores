'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { type Language } from '@/lib/translations'

interface LanguageContextType {
  lang: Language
}

const LanguageContext = createContext<LanguageContextType>({ lang: 'es' })

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Language
  children: ReactNode
}) {
  return (
    <LanguageContext.Provider value={{ lang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
