import type { Metadata } from 'next'
import NosotrosPage from '@/components/NosotrosPage'

export const metadata: Metadata = {
  title: 'Quiénes Somos | ATREVIA Consultores',
  description:
    'Descubre la historia, visión y valores de ATREVIA Consultores, la agencia italo-peruana que conecta Europa y América Latina con precisión, puntualidad y empatía.',
  alternates: {
    canonical: 'https://www.atreviaconsultores.com/nosotros',
  },
  openGraph: {
    title: 'Quiénes Somos | ATREVIA Consultores',
    description:
      'Una visión global con corazón italo-peruano. Más de 20 años de experiencia en mercados globales.',
    url: 'https://www.atreviaconsultores.com/nosotros',
    type: 'website',
    images: [{ url: '/images/logo.png', width: 1200, height: 630, alt: 'ATREVIA Consultores - Chi Siamo' }],
  },
}

export default function Page() {
  return <NosotrosPage />
}
