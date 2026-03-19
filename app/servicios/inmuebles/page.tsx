import type { Metadata } from 'next'
import ServicePageLayout from '@/components/ServicePageLayout'

const BASE_URL = 'https://www.atreviaconsultores.com'
const PAGE_URL = `${BASE_URL}/servicios/inmuebles`

export const metadata: Metadata = {
  title: 'Consultoría Inmobiliaria Internacional | ATREVIA Consultores',
  description:
    'Inversiones inmobiliarias en Perú, Italia, España, EE.UU., Francia y Alemania. Due diligence, portafolio prime, asesoría integral pre y post-compra. Expertos en real estate internacional.',
  keywords: [
    'inmuebles Peru',
    'inversión inmobiliaria internacional',
    'real estate Italia',
    'propiedades España',
    'compra inmuebles USA',
    'due diligence inmobiliaria',
    'portafolio prime',
    'consultoría inmobiliaria Lima',
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
    title: 'Consultoría Inmobiliaria Internacional | ATREVIA Consultores',
    description:
      'Real estate prime en Perú, Italia, España, Francia, Alemania y EE.UU. Due diligence y asesoría integral para inversores internacionales.',
    url: PAGE_URL,
    type: 'website',
    siteName: 'ATREVIA Consultores',
    locale: 'es_PE',
    alternateLocale: ['en_US', 'it_IT', 'fr_FR', 'de_DE'],
    images: [{ url: '/images/logo.png', width: 1200, height: 630, alt: 'Consultoría Inmobiliaria - ATREVIA Consultores' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consultoría Inmobiliaria Internacional | ATREVIA Consultores',
    description: 'Inversiones inmobiliarias en 6 países con asesoría integral pre y post-compra.',
    images: ['/images/logo.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'ATREVIA Consultores - Consultoría Inmobiliaria',
  url: PAGE_URL,
  provider: {
    '@type': 'Organization',
    name: 'ATREVIA Consultores',
    url: BASE_URL,
  },
  description:
    'Consultoría inmobiliaria internacional con operaciones en Perú, Italia, España, Francia, Alemania y EE.UU. Due diligence, portafolio prime y acompañamiento integral.',
  areaServed: ['PE', 'IT', 'ES', 'US', 'FR', 'DE'],
  inLanguage: ['es', 'en', 'it', 'fr', 'de'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios Inmobiliarios',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Inversión inmobiliaria internacional' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Due diligence legal y técnica' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Portafolio de propiedades prime' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Asesoría pre y post-compra' } },
    ],
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${BASE_URL}/#servicios` },
      { '@type': 'ListItem', position: 3, name: 'Consultoría Inmobiliaria', item: PAGE_URL },
    ],
  },
}

export default function InmueblesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        serviceIndex={2}
        heroImage="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80&fit=crop"
      />
    </>
  )
}
