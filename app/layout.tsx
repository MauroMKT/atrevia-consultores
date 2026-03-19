import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'


const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display-var',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const BASE_URL = 'https://www.atreviaconsultores.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'ATREVIA Consultores | Agencia Italo-Peruana de Marketing, Negocios e Inmuebles',
    template: '%s | ATREVIA Consultores',
  },
  description:
    'ATREVIA Consultores es una agencia italo-peruana especializada en marketing digital, desarrollo empresarial, consultoría inmobiliaria y diseño de interiores. Combinamos la innovación europea con el dinamismo latinoamericano.',
  keywords: [
    'consultoría empresarial',
    'marketing digital Perú',
    'inmuebles Lima',
    'agencia italo-peruana',
    'desarrollo empresarial',
    'inversión inmobiliaria Perú',
    'estrategias digitales',
    'ISO 9001',
    'ISO 14001',
    'ISO 45001',
    'diseño interiores Lima',
    'ATREVIA Consultores',
  ],
  authors: [{ name: 'ATREVIA Consultores', url: BASE_URL }],
  creator: 'ATREVIA Consultores',
  publisher: 'ATREVIA Consultores',
  category: 'business',
  alternates: {
    canonical: BASE_URL,
    languages: {
      'es': BASE_URL,
      'en': BASE_URL,
      'it': BASE_URL,
      'fr': BASE_URL,
      'de': BASE_URL,
      'x-default': BASE_URL,
    },
  },
  openGraph: {
    title: 'ATREVIA Consultores | Innovación Global con Alma Italo-Peruana',
    description:
      'Agencia italo-peruana especializada en marketing digital, desarrollo empresarial, inmuebles y diseño de interiores. Más de 20 años de experiencia en mercados globales.',
    type: 'website',
    url: BASE_URL,
    locale: 'es_PE',
    alternateLocale: ['en_US', 'it_IT', 'fr_FR', 'de_DE'],
    siteName: 'ATREVIA Consultores',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'ATREVIA Consultores - Agencia Italo-Peruana',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATREVIA Consultores | Marketing, Negocios e Inmuebles',
    description: 'Soluciones integrales con perspectiva global y enfoque local. Conectamos lo mejor de Italia y Perú.',
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'INSERISCI-QUI-GOOGLE-SITE-VERIFICATION',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0d0f1a' },
    { media: '(prefers-color-scheme: light)', color: '#0d0f1a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.atreviaconsultores.com/#organization',
      name: 'ATREVIA Consultores',
      url: 'https://www.atreviaconsultores.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.atreviaconsultores.com/images/logo.png',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+39-349-117-7007',
          contactType: 'customer service',
          areaServed: ['IT', 'EU', 'Asia'],
          availableLanguage: ['Italian', 'Spanish', 'English', 'French', 'German'],
        },
        {
          '@type': 'ContactPoint',
          telephone: '+51-964-243-686',
          contactType: 'customer service',
          areaServed: ['PE', 'US', 'LATAM'],
          availableLanguage: ['Spanish', 'English'],
        },
      ],
      email: 'info@atreviaconsultores.com',
      sameAs: [],
      foundingDate: '2004',
      description:
        'Agencia italo-peruana especializada en marketing digital, desarrollo empresarial, inmuebles y diseño de interiores.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios ATREVIA Consultores',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Marketing & Branding Digital' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desarrollo Empresarial' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Consultoría Inmobiliaria' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diseño de Interiores' } },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.atreviaconsultores.com/#website',
      url: 'https://www.atreviaconsultores.com',
      name: 'ATREVIA Consultores',
      publisher: { '@id': 'https://www.atreviaconsultores.com/#organization' },
      inLanguage: ['es', 'en', 'it', 'fr', 'de'],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Preconnect to external origins to reduce DNS + TLS latency */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.resend.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
      </head>
      <body className="antialiased font-sans bg-background text-foreground">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
