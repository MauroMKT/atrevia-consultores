import type { Metadata } from 'next'
import ServicePageLayout from '@/components/ServicePageLayout'

const BASE_URL = 'https://www.atreviaconsultores.com'
const PAGE_URL = `${BASE_URL}/servicios/diseno-interiores`

export const metadata: Metadata = {
  title: 'Diseño de Interiores Residencial y Comercial | ATREVIA Consultores',
  description:
    'Diseño de interiores con elegancia italiana para espacios residenciales y comerciales en Perú e Italia. Renders 3D, dirección de obra, materiales premium y estilismo de vanguardia.',
  keywords: [
    'diseño de interiores Lima',
    'interior design Peru',
    'diseño interiores Italia',
    'diseño residencial comercial',
    'renders 3D arquitectura',
    'dirección de obra',
    'materiales premium decoración',
    'estudio diseño italo-peruano',
    'ATREVIA Consultores',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'es': PAGE_URL,
      'en': PAGE_URL,
      'it': PAGE_URL,
      'fr': PAGE_URL,
      'de': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'Diseño de Interiores Residencial y Comercial | ATREVIA Consultores',
    description:
      'Espacios únicos con elegancia italiana. Diseño de interiores residencial y comercial con renders 3D, materiales premium y dirección de obra.',
    url: PAGE_URL,
    type: 'website',
    siteName: 'ATREVIA Consultores',
    locale: 'es_PE',
    alternateLocale: ['en_US', 'it_IT', 'fr_FR', 'de_DE'],
    images: [{ url: '/images/logo.png', width: 1200, height: 630, alt: 'Diseño de Interiores - ATREVIA Consultores' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diseño de Interiores | ATREVIA Consultores',
    description: 'Espacios únicos con elegancia italiana. Diseño residencial y comercial con renders 3D y materiales premium.',
    images: ['/images/logo.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Diseño de Interiores Residencial y Comercial',
  provider: {
    '@type': 'Organization',
    name: 'ATREVIA Consultores',
    url: BASE_URL,
  },
  serviceType: 'Interior Design',
  description:
    'Diseño de interiores residencial y comercial con estética italiana, renders 3D fotorrealistas, selección de materiales premium y dirección completa de obra.',
  url: PAGE_URL,
  areaServed: ['PE', 'IT'],
  inLanguage: ['es', 'en', 'it', 'fr', 'de'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Diseño de Interiores',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diseño residencial premium' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diseño de locales comerciales' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Renders 3D fotorrealistas' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dirección de obra' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Selección de materiales y estilismo' } },
    ],
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${BASE_URL}/#servicios` },
      { '@type': 'ListItem', position: 3, name: 'Diseño de Interiores', item: PAGE_URL },
    ],
  },
}

export default function DisenoInterioresPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        serviceIndex={3}
        heroImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=80&fit=crop"
      />
    </>
  )
}
