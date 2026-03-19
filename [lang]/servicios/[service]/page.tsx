import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { translations, type Language } from '@/lib/translations'
import ServicePageLayout from '@/components/ServicePageLayout'

const VALID_LANGS: Language[] = ['es', 'en', 'it', 'fr', 'de']
const BASE_URL = 'https://www.atreviaconsultores.com'

const SERVICE_MAP: Record<string, { index: number; heroImage: string }> = {
  'marketing-branding':      { index: 0, heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80&fit=crop' },
  'desarrollo-empresarial':  { index: 1, heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80&fit=crop' },
  'inmuebles':               { index: 2, heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80&fit=crop' },
  'diseno-interiores':       { index: 3, heroImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80&fit=crop' },
}

export async function generateStaticParams() {
  const params = []
  for (const lang of VALID_LANGS) {
    for (const service of Object.keys(SERVICE_MAP)) {
      params.push({ lang, service })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; service: string }>
}): Promise<Metadata> {
  const { lang: langParam, service } = await params
  const lang = VALID_LANGS.includes(langParam as Language) ? (langParam as Language) : 'es'
  const s = SERVICE_MAP[service]
  if (!s) return {}

  const serviceData = translations[lang].services.items[s.index]

  return {
    title: `${serviceData.title} | ATREVIA Consultores`,
    description: serviceData.desc ?? serviceData.title,
    alternates: {
      canonical: `${BASE_URL}/${lang}/servicios/${service}`,
      languages: Object.fromEntries(
        VALID_LANGS.map((l) => [l, `${BASE_URL}/${l}/servicios/${service}`])
      ),
    },
  }
}

export default async function ServiceLangPage({
  params,
}: {
  params: Promise<{ lang: string; service: string }>
}) {
  const { lang: langParam, service } = await params

  if (!VALID_LANGS.includes(langParam as Language)) redirect(`/es/servicios/${service}`)

  const s = SERVICE_MAP[service]
  if (!s) redirect(`/${langParam}`)

  return (
    <ServicePageLayout
      serviceIndex={s.index}
      heroImage={s.heroImage}
      lang={langParam as Language}
    />
  )
}
