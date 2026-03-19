import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { translations, type Language } from '@/lib/translations'
import HomePageClient from '@/components/HomePageClient'

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
  const lang = VALID_LANGS.includes(langParam as Language)
    ? (langParam as Language)
    : 'es'

  const titles: Record<Language, string> = {
    es: 'ATREVIA Consultores | Agencia Italo-Peruana de Marketing, Negocios e Inmuebles',
    en: 'ATREVIA Consultores | Italian-Peruvian Agency for Marketing, Business & Real Estate',
    it: 'ATREVIA Consultores | Agenzia Italo-Peruviana di Marketing, Business e Immobili',
    fr: 'ATREVIA Consultores | Agence Italo-Péruvienne de Marketing, Business et Immobilier',
    de: 'ATREVIA Consultores | Italienisch-Peruanische Agentur für Marketing, Business & Immobilien',
  }

  const descriptions: Record<Language, string> = {
    es: 'Agencia italo-peruana especializada en marketing digital, desarrollo empresarial, consultoría inmobiliaria y diseño de interiores.',
    en: 'Italian-Peruvian agency specialised in digital marketing, business development, real estate consulting and interior design.',
    it: 'Agenzia italo-peruviana specializzata in marketing digitale, sviluppo aziendale, consulenza immobiliare e design d\'interni.',
    fr: 'Agence italo-péruvienne spécialisée en marketing digital, développement commercial, conseil immobilier et design d\'intérieur.',
    de: 'Italienisch-peruanische Agentur für digitales Marketing, Unternehmensentwicklung, Immobilienberatung und Innenarchitektur.',
  }

  const locales: Record<Language, string> = {
    es: 'es_PE', en: 'en_US', it: 'it_IT', fr: 'fr_FR', de: 'de_DE',
  }

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: {
        es: `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
        it: `${BASE_URL}/it`,
        fr: `${BASE_URL}/fr`,
        de: `${BASE_URL}/de`,
        'x-default': `${BASE_URL}/es`,
      },
    },
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: `${BASE_URL}/${lang}`,
      locale: locales[lang],
      alternateLocale: Object.values(locales).filter((l) => l !== locales[lang]),
      type: 'website',
      siteName: 'ATREVIA Consultores',
    },
  }
}

export default async function LangHomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params

  if (!VALID_LANGS.includes(langParam as Language)) {
    redirect('/es')
  }

  return <HomePageClient lang={langParam as Language} />
}
