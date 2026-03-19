import { type ReactNode } from 'react'
import { type Language } from '@/lib/translations'
import { LanguageProvider } from '@/lib/LanguageContext'
import CookieConsent from '@/components/CookieConsent'

const VALID_LANGS: Language[] = ['es', 'en', 'it', 'fr', 'de']

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params
  const lang: Language = VALID_LANGS.includes(langParam as Language)
    ? (langParam as Language)
    : 'es'

  return (
    <LanguageProvider lang={lang}>
      {children}
      <CookieConsent />
    </LanguageProvider>
  )
}
