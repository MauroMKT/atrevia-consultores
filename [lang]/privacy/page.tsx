import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { type Language } from '@/lib/translations'
import PrivacyClient from '@/components/PrivacyClient'

const VALID_LANGS: Language[] = ['es', 'en', 'it', 'fr', 'de']
const BASE_URL = 'https://www.atreviaconsultores.com'

export async function generateStaticParams() {
  return VALID_LANGS.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = VALID_LANGS.includes(langParam as Language) ? (langParam as Language) : 'es'

  const titles: Record<Language, string> = {
    es: 'Política de Privacidad | ATREVIA Consultores',
    en: 'Privacy Policy | ATREVIA Consultores',
    it: 'Informativa sulla Privacy | ATREVIA Consultores',
    fr: 'Politique de Confidentialité | ATREVIA Consultores',
    de: 'Datenschutzerklärung | ATREVIA Consultores',
  }

  return {
    title: titles[lang],
    alternates: {
      canonical: `${BASE_URL}/${lang}/privacy`,
      languages: {
        es: `${BASE_URL}/es/privacy`,
        en: `${BASE_URL}/en/privacy`,
        it: `${BASE_URL}/it/privacy`,
        fr: `${BASE_URL}/fr/privacy`,
        de: `${BASE_URL}/de/privacy`,
        'x-default': `${BASE_URL}/es/privacy`,
      },
    },
    robots: { index: false, follow: true },
  }
}

export default async function PrivacyLangPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params
  if (!VALID_LANGS.includes(langParam as Language)) redirect('/es/privacy')
  return <PrivacyClient lang={langParam as Language} />
}
