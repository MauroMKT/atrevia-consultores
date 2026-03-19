import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { type Language } from '@/lib/translations'
import NosotrosPageClient from '@/components/NosotrosPageClient'

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
    es: 'Quiénes Somos | ATREVIA Consultores',
    en: 'About Us | ATREVIA Consultores',
    it: 'Chi Siamo | ATREVIA Consultores',
    fr: 'Qui Sommes-Nous | ATREVIA Consultores',
    de: 'Über Uns | ATREVIA Consultores',
  }

  const descriptions: Record<Language, string> = {
    es: 'Descubre la historia, visión y valores de ATREVIA Consultores, la agencia italo-peruana que conecta Europa y América Latina.',
    en: 'Discover the story, vision and values of ATREVIA Consultores, the Italian-Peruvian agency bridging Europe and Latin America.',
    it: 'Scopri la storia, la visione e i valori di ATREVIA Consultores, l\'agenzia italo-peruviana che connette Europa e America Latina.',
    fr: "Découvrez l'histoire, la vision et les valeurs d'ATREVIA Consultores, l'agence italo-péruvienne qui connecte l'Europe et l'Amérique latine.",
    de: 'Entdecken Sie die Geschichte, Vision und Werte von ATREVIA Consultores, der italienisch-peruanischen Agentur, die Europa und Lateinamerika verbindet.',
  }

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: {
      canonical: `${BASE_URL}/${lang}/nosotros`,
      languages: {
        es: `${BASE_URL}/es/nosotros`,
        en: `${BASE_URL}/en/nosotros`,
        it: `${BASE_URL}/it/nosotros`,
        fr: `${BASE_URL}/fr/nosotros`,
        de: `${BASE_URL}/de/nosotros`,
        'x-default': `${BASE_URL}/es/nosotros`,
      },
    },
  }
}

export default async function NosotrosLangPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params
  if (!VALID_LANGS.includes(langParam as Language)) redirect('/es/nosotros')
  return <NosotrosPageClient lang={langParam as Language} />
}
