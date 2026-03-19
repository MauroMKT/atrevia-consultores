'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLang } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import { CheckCircle, ArrowLeft } from 'lucide-react'

export default function NosotrosPage() {
  const { lang } = useLang()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const t = (translations[lang] as any).nosotros
  const tContact = translations[lang].contact

  return (
    <div style={{ background: 'oklch(0.12 0.025 255)', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Navbar lang={lang} />

      {/* Hero */}
      <div className="relative pt-16 h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1400&q=80&fit=crop"
          alt="Equipo multicultural de ATREVIA Consultores reunido en sala de juntas moderna con vistas a la ciudad"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover opacity-25"
          style={{ objectPosition: 'center 30%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, oklch(0.12 0.025 255 / 0.2) 0%, oklch(0.12 0.025 255) 100%)' }}
        />
        {/* Back link */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[oklch(0.55_0.015_255)] hover:text-[oklch(0.78_0.12_75)] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <ArrowLeft className="w-3 h-3" />
            {t.backHome}
          </Link>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-end pb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[oklch(0.78_0.12_75)]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[oklch(0.78_0.12_75)]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              ATREVIA Consultores
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-6xl font-light text-[oklch(0.95_0.01_80)] leading-tight text-balance mb-4"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            {t.heroTitle}
          </h1>
          <p
            className="text-base lg:text-lg text-[oklch(0.65_0.015_255)] max-w-2xl"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t.heroSub}
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-20">

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-[oklch(0.78_0.12_75)]" />
              <h2
                className="text-2xl lg:text-3xl font-light text-[oklch(0.95_0.01_80)]"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                {t.introTitle}
              </h2>
            </div>
            <p
              className="text-base text-[oklch(0.65_0.015_255)] leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t.introText}
            </p>
          </div>
          {/* Flags card */}
          <div
            className="rounded p-8"
            style={{ background: 'oklch(0.16 0.025 255)', border: '1px solid oklch(0.22 0.03 255)' }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl">🇮🇹</span>
                <div>
                  <p className="text-xs font-semibold text-[oklch(0.95_0.01_80)] uppercase tracking-wider mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {(translations[lang] as any).about.italyLabel}
                  </p>
                  <p className="text-sm text-[oklch(0.55_0.015_255)]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {(translations[lang] as any).about.italyDesc}
                  </p>
                </div>
              </div>
              <div className="w-full h-px" style={{ background: 'oklch(0.22 0.03 255)' }} />
              <div className="flex items-center gap-4">
                <span className="text-4xl">🇵🇪</span>
                <div>
                  <p className="text-xs font-semibold text-[oklch(0.95_0.01_80)] uppercase tracking-wider mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {(translations[lang] as any).about.peruLabel}
                  </p>
                  <p className="text-sm text-[oklch(0.55_0.015_255)]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {(translations[lang] as any).about.peruDesc}
                  </p>
                </div>
              </div>
              <div className="w-full h-px" style={{ background: 'oklch(0.22 0.03 255)' }} />
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
                  style={{ background: 'oklch(0.78 0.12 75 / 0.12)', border: '1px solid oklch(0.78 0.12 75 / 0.3)' }}
                >
                  <span className="text-[oklch(0.78_0.12_75)] font-bold text-sm">20+</span>
                </div>
                <p className="text-sm text-[oklch(0.65_0.015_255)]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {(translations[lang] as any).about.text2}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Commitment + 3 pillars */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-[oklch(0.78_0.12_75)]" />
            <h2
              className="text-2xl lg:text-3xl font-light text-[oklch(0.95_0.01_80)]"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              {t.commitmentTitle}
            </h2>
          </div>
          <p
            className="text-base text-[oklch(0.65_0.015_255)] leading-relaxed mb-10 max-w-3xl"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t.commitmentText}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t.pillars.map((p: { title: string; desc: string }, i: number) => (
              <div
                key={i}
                className="p-6 rounded"
                style={{ background: 'oklch(0.16 0.025 255)', border: '1px solid oklch(0.22 0.03 255)' }}
              >
                <div
                  className="w-8 h-8 rounded flex items-center justify-center mb-4"
                  style={{ background: 'oklch(0.78 0.12 75 / 0.12)', border: '1px solid oklch(0.78 0.12 75 / 0.3)' }}
                >
                  <CheckCircle className="w-4 h-4 text-[oklch(0.78_0.12_75)]" />
                </div>
                <h3
                  className="text-base font-semibold text-[oklch(0.90_0.01_80)] mb-2"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  {p.title}
                </h3>
                <p className="text-sm text-[oklch(0.60_0.015_255)] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Global approach */}
        <div
          className="relative rounded overflow-hidden mb-24 p-10 lg:p-14"
          style={{ background: 'oklch(0.16 0.025 255)', border: '1px solid oklch(0.25 0.03 255)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 80% 50%, oklch(0.78 0.12 75 / 0.06), transparent 60%)' }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(to right, transparent, oklch(0.78 0.12 75 / 0.5), transparent)' }}
          />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-[oklch(0.78_0.12_75)]" />
            <h2
              className="text-2xl lg:text-3xl font-light text-[oklch(0.95_0.01_80)]"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              {t.globalTitle}
            </h2>
          </div>
          <p
            className="text-base text-[oklch(0.65_0.015_255)] leading-relaxed max-w-3xl"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t.globalText}
          </p>
        </div>

        {/* Why us */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-px bg-[oklch(0.78_0.12_75)]" />
            <h2
              className="text-2xl lg:text-3xl font-light text-[oklch(0.95_0.01_80)]"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              {t.whyTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.whyItems.map((item: { label: string; desc: string }, i: number) => (
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
                <div>
                  <p
                    className="text-sm font-semibold text-[oklch(0.88_0.01_80)] mb-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-sm text-[oklch(0.60_0.015_255)] leading-relaxed"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div
          className="relative rounded overflow-hidden p-10 lg:p-16 text-center"
          style={{ background: 'oklch(0.16 0.025 255)', border: '1px solid oklch(0.25 0.03 255)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, oklch(0.78 0.12 75 / 0.07), transparent 65%)' }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(to right, transparent, oklch(0.78 0.12 75), transparent)' }}
          />
          <h3
            className="text-2xl lg:text-3xl font-light text-[oklch(0.95_0.01_80)] mb-4 text-balance"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            {t.ctaTitle}
          </h3>
          <p
            className="text-sm text-[oklch(0.65_0.015_255)] mb-8 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t.ctaText}
          </p>
          <a
            href="#contacto"
            onClick={e => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            style={{ background: 'oklch(0.78 0.12 75)', color: 'oklch(0.12 0.025 255)' }}
          >
            {t.ctaBtn}
          </a>
        </div>
      </main>

      <Contact lang={lang} />

      <footer
        className="mt-8 py-8 text-center"
        style={{ borderTop: '1px solid oklch(0.18 0.025 255)' }}
      >
        <p className="text-xs text-[oklch(0.40_0.015_255)]" style={{ fontFamily: 'Inter, sans-serif' }}>
          © {new Date().getFullYear()} ATREVIA Consultores.{' '}
          <Link href="/privacy" className="hover:text-[oklch(0.78_0.12_75)] transition-colors ml-2">
            {translations[lang].footer.privacy}
          </Link>
        </p>
      </footer>

      <FloatingWhatsApp message={tContact.whatsappMsg} />
    </div>
  )
}
