import type { Metadata } from 'next'
import ServicePageLayout from '@/components/ServicePageLayout'

const BASE_URL = 'https://www.atreviaconsultores.com'
const PAGE_URL = `${BASE_URL}/servicios/desarrollo-empresarial`

export const metadata: Metadata = {
  title: 'Desarrollo Empresarial & Sistemas de Gestión ISO | ATREVIA Consultores',
  description:
    'Crecimiento estratégico con Sistemas Integrados de Gestión ISO 9001, ISO 14001, ISO 45001 y mejora continua PDCA. Lean, Kaizen, expansión internacional y consultoría organizacional. ATREVIA Consultores.',
  keywords: [
    'desarrollo empresarial',
    'sistemas de gestión integrados',
    'ISO 9001 Peru',
    'ISO 14001',
    'ISO 45001',
    'mejora continua PDCA',
    'Lean Kaizen',
    'consultoría estratégica',
    'expansión internacional empresas',
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
    title: 'Desarrollo Empresarial & Sistemas de Gestión ISO | ATREVIA Consultores',
    description:
      'Consultoría estratégica con implementación de sistemas ISO y metodologías de mejora continua para empresas con visión internacional.',
    url: PAGE_URL,
    type: 'website',
    siteName: 'ATREVIA Consultores',
    locale: 'es_PE',
    alternateLocale: ['en_US', 'it_IT', 'fr_FR', 'de_DE'],
    images: [{ url: '/images/logo.png', width: 1200, height: 630, alt: 'Desarrollo Empresarial - ATREVIA Consultores' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desarrollo Empresarial & ISO | ATREVIA Consultores',
    description: 'Sistemas integrados de gestión ISO y mejora continua PDCA para empresas que aspiran a la excelencia.',
    images: ['/images/logo.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Desarrollo Empresarial & Sistemas de Gestión',
  provider: {
    '@type': 'Organization',
    name: 'ATREVIA Consultores',
    url: BASE_URL,
  },
  serviceType: 'Consultoría Empresarial',
  description:
    'Planificación estratégica, implementación de sistemas ISO, mejora continua PDCA, Lean, Kaizen y expansión internacional para empresas.',
  url: PAGE_URL,
  areaServed: ['PE', 'IT', 'ES', 'US', 'FR', 'DE'],
  inLanguage: ['es', 'en', 'it', 'fr', 'de'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Desarrollo Empresarial',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diagnóstico y análisis organizacional' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ISO 9001 - Sistema de gestión de calidad' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ISO 14001 - Sistema de gestión ambiental' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ISO 45001 - Seguridad y salud ocupacional' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mejora continua PDCA, Lean y Kaizen' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Expansión a mercados internacionales' } },
    ],
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${BASE_URL}/#servicios` },
      { '@type': 'ListItem', position: 3, name: 'Desarrollo Empresarial', item: PAGE_URL },
    ],
  },
}

export default function DesarrolloEmpresarialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageLayout
        serviceIndex={1}
        heroImage="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1400&q=80&fit=crop"
      />
    </>
  )
}
