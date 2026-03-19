'use client'

import { useEffect } from 'react'
import { translations, type Language } from '@/lib/translations'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

interface ServicePageLayoutProps {
  serviceIndex: number
  heroImage: string
  lang: Language
}

export default function ServicePageLayout({ serviceIndex, heroImage, lang }: ServicePageLayoutProps) {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const t = translations[lang]
  const service = t.services.items[serviceIndex]

  const openWhatsApp = () => {
    const msg = encodeURIComponent(t.contact.whatsappMsg)
    window.open(`https://wa.me/51964243686?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  const includesLabel: Record<Language, string> = {
    es: 'Qué incluye este servicio',
    en: 'What this service includes',
    it: 'Cosa include questo servizio',
    fr: 'Ce que comprend ce service',
    de: 'Was dieser Service beinhaltet',
  }

  const relatedLabel: Record<Language, string> = {
    es: 'Otros servicios',
    en: 'Other services',
    it: 'Altri servizi',
    fr: 'Autres services',
    de: 'Andere Dienstleistungen',
  }

  const serviceRoutes = [
    `/${lang}/servicios/marketing-branding`,
    `/${lang}/servicios/desarrollo-empresarial`,
    `/${lang}/servicios/inmuebles`,
    `/${lang}/servicios/diseno-interiores`,
  ]

  return (
    <div style={{ background: 'oklch(0.12 0.025 255)', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      <Navbar lang={lang} />

      {/* Hero */}
      <div className="relative pt-16 h-[55vh] min-h-[360px] overflow-hidden">
        <img
          src={heroImage}
          alt={`${service?.tag} — ATREVIA Consultores`}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, oklch(0.12 0.025 255 / 0.3) 0%, oklch(0.12 0.025 255) 100%)' }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-end pb-16">
          <span
            className="inline-block mb-4 px-4 py-1.5 rounded text-xs font-semibold tracking-widest uppercase"
            style={{ background: 'oklch(0.78 0.12 75)', color: 'oklch(0.12 0.025 255)' }}
          >
            {service?.tag}
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-6xl font-light text-[oklch(0.95_0.01_80)] leading-tight text-balance"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            {service?.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-20">

        {/* Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2">
            <p
              className="text-lg text-[oklch(0.70_0.015_255)] leading-relaxed mb-8"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {service?.desc}
            </p>
            <a
              href="#contacto"
              onClick={e => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{
                background: 'oklch(0.78 0.12 75)',
                color: 'oklch(0.12 0.025 255)',
              }}
            >
              {service?.cta}
            </a>
          </div>

          {/* Sidebar info card */}
          <div
            className="rounded p-6 h-fit"
            style={{ background: 'oklch(0.16 0.025 255)', border: '1px solid oklch(0.22 0.03 255)' }}
          >
            <div className="w-8 h-px bg-[oklch(0.78_0.12_75)] mb-4" />
            <p
              className="text-xs tracking-[0.2em] uppercase text-[oklch(0.78_0.12_75)] mb-3"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              ATREVIA Consultores
            </p>
            <p
              className="text-sm text-[oklch(0.65_0.015_255)] leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t.about.text1.slice(0, 160)}...
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-px bg-[oklch(0.78_0.12_75)]" />
            <h2
              className="text-2xl lg:text-3xl font-light text-[oklch(0.95_0.01_80)]"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              {includesLabel[lang]}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service?.features.map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'oklch(0.16 0.025 255)', border: '1px solid oklch(0.22 0.03 255)' }}
              >
                <div
                  className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'oklch(0.78 0.12 75 / 0.12)', border: '1px solid oklch(0.78 0.12 75 / 0.3)' }}
                >
                  <CheckCircle className="w-4 h-4 text-[oklch(0.78_0.12_75)]" />
                </div>
                <p
                  className="text-sm text-[oklch(0.72_0.015_255)] leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {feat}
                </p>
              </div>
            ))}
          </div>
        </div>



        {/* Related services */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-[oklch(0.78_0.12_75)]" />
            <h2
              className="text-xl font-light text-[oklch(0.75_0.015_255)]"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              {relatedLabel[lang]}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.services.items
              .filter((_, i) => i !== serviceIndex)
              .map((s, i) => {
                const originalIndex = t.services.items.findIndex(item => item.tag === s.tag)
                return (
                  <Link
                    key={i}
                    href={serviceRoutes[originalIndex]}
                    className="group p-5 rounded transition-all duration-300 hover:-translate-y-1"
                    style={{ background: 'oklch(0.16 0.025 255)', border: '1px solid oklch(0.22 0.03 255)' }}
                  >
                    <span
                      className="text-xs tracking-[0.2em] uppercase text-[oklch(0.78_0.12_75)] block mb-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {s.tag}
                    </span>
                    <p
                      className="text-sm text-[oklch(0.65_0.015_255)] group-hover:text-[oklch(0.85_0.01_80)] transition-colors leading-snug"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {s.title}
                    </p>
                  </Link>
                )
              })}
          </div>
        </div>
      </main>

      {/* Full contact section — same as homepage */}
      <Contact lang={lang} />

      {/* Footer mini */}
      <footer
        className="mt-8 py-8 text-center"
        style={{ borderTop: '1px solid oklch(0.18 0.025 255)' }}
      >
        <p className="text-xs text-[oklch(0.40_0.015_255)]" style={{ fontFamily: 'Inter, sans-serif' }}>
          © {new Date().getFullYear()} ATREVIA Consultores. {t.footer.rights}{' '}
          <Link href={`/${lang}/privacy`} className="hover:text-[oklch(0.78_0.12_75)] transition-colors ml-2">
            {t.footer.privacy}
          </Link>
        </p>
      </footer>

      <FloatingWhatsApp message={t.contact.whatsappMsg} />
    </div>
  )
}
