import type { Metadata } from 'next'
import ServicePageLayout from '@/components/ServicePageLayout'

const BASE_URL = 'https://www.atreviaconsultores.com'
const PAGE_URL = `${BASE_URL}/servicios/marketing-branding`

export const metadata: Metadata = {
  title: 'Marketing & Branding Digital | ATREVIA Consultores',
  description:
    'Construimos marcas poderosas y estrategias de marketing digital multicanal. Identidad corporativa, SEO, SEM, redes sociales y campañas internacionales. Agencia italo-peruana con presencia global.',
  keywords: [
    'marketing digital Peru',
    'branding corporativo',
    'identidad de marca',
    'SEO SEM Lima',
    'redes sociales empresa',
    'agencia marketing italo-peruana',
    'estrategia digital internacional',
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
    title: 'Marketing & Branding Digital | ATREVIA Consultores',
    description:
      'Estrategias de marketing digital y branding para empresas que quieren destacar en mercados locales e internacionales.',
    url: PAGE_URL,
    type: 'website',
    siteName: 'ATREVIA Consultores',
    locale: 'es_PE',
    alternateLocale: ['en_US', 'it_IT', 'fr_FR', 'de_DE'],
    images: [{ url: '/images/logo.png', width: 1200, height: 630, alt: 'Marketing & Branding Digital - ATREVIA Consultores' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing & Branding Digital | ATREVIA Consultores',
    description: 'Construimos marcas poderosas con estrategias digitales multicanal de alcance internacional.',
    images: ['/images/logo.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Marketing & Branding Digital',
  provider: {
    '@type': 'Organization',
    name: 'ATREVIA Consultores',
    url: BASE_URL,
  },
  serviceType: 'Marketing Digital',
  description:
    'Servicios de marketing digital, branding, identidad corporativa, SEO, SEM y gestión de redes sociales para empresas con visión internacional.',
  url: PAGE_URL,
  areaServed: ['PE', 'IT', 'ES', 'US', 'FR', 'DE'],
  inLanguage: ['es', 'en', 'it', 'fr', 'de'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Marketing & Branding',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Identidad de marca y branding corporativo' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO y posicionamiento orgánico' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEM y publicidad digital' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gestión de redes sociales' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Campañas internacionales' } },
    ],
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${BASE_URL}/#servicios` },
      { '@type': 'ListItem', position: 3, name: 'Marketing & Branding Digital', item: PAGE_URL },
    ],
  },
}

export default function MarketingBrandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        serviceIndex={0}
        heroImage="https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1400&q=80&fit=crop"
        lang="es"
      />
    </>
  )
}
