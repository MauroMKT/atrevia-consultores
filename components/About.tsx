'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { translations, type Language } from '@/lib/translations'

interface AboutProps {
  lang: Language
}

export default function About({ lang }: AboutProps) {
  const t = (translations[lang] as any).about

  return (
    <section
      id="nosotros"
      className="py-32 relative overflow-hidden"
      style={{ background: 'oklch(0.12 0.025 255)' }}
    >
      {/* Decorative background line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px opacity-20"
        style={{
          background: 'linear-gradient(to bottom, transparent, oklch(0.78 0.12 75), transparent)',
          left: '10%',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Badge */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-px bg-[oklch(0.78_0.12_75)]" />
          <span
            className="text-xs tracking-[0.3em] uppercase text-[oklch(0.78_0.12_75)]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t.badge}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div
              className="relative aspect-[4/5] rounded overflow-hidden"
              style={{ background: 'oklch(0.16 0.025 255)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=900&q=80&fit=crop"
                alt="Profesionales italo-peruanos de ATREVIA Consultores sellando alianza internacional en oficina elegante"
                className="w-full h-full object-cover opacity-80"
              />
              {/* Overlay accent */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'linear-gradient(to top, oklch(0.12 0.025 255), transparent 60%)',
                }}
              />
              {/* Floating badge */}
              <div className="absolute bottom-8 left-8 right-8">
                <div
                  className="p-6 rounded"
                  style={{ background: 'oklch(0.12 0.025 255/0.9)', backdropFilter: 'blur(20px)', border: '1px solid oklch(0.25 0.03 255)' }}
                >
                  <blockquote
                    className="text-sm italic text-[oklch(0.85_0.01_80)] leading-relaxed mb-3"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1rem' }}
                  >
                    {t.quote}
                  </blockquote>
                  <cite
                    className="text-xs text-[oklch(0.78_0.12_75)] not-italic tracking-wider"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {t.quoteAuthor}
                  </cite>
                </div>
              </div>
            </div>

            {/* Decorative border offset */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full rounded border opacity-20 pointer-events-none"
              style={{ borderColor: 'oklch(0.78 0.12 75)' }}
            />
          </div>

          {/* Right: Text */}
          <div className="flex flex-col gap-8">
            <h2
              className="text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1] text-[oklch(0.95_0.01_80)]"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              {t.title}
            </h2>

            <div className="space-y-6">
              <p
                className="text-base text-[oklch(0.65_0.015_255)] leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {t.text1}
              </p>
              <p
                className="text-base text-[oklch(0.65_0.015_255)] leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {t.text2}
              </p>
            </div>

            {/* Discover more link */}
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.78_0.12_75)] hover:gap-3 transition-all duration-300 group"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t.discoverMore}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Flags accent */}
            <div className="flex items-center gap-6 pt-4 border-t border-[oklch(0.22_0.03_255)]">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🇮🇹</span>
                <div>
                  <p
                    className="text-xs font-semibold text-[oklch(0.95_0.01_80)] uppercase tracking-wider"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {t.italyLabel}
                  </p>
                  <p
                    className="text-xs text-[oklch(0.55_0.015_255)]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {t.italyDesc}
                  </p>
                </div>
              </div>
              <div
                className="w-px h-10"
                style={{ background: 'oklch(0.25 0.03 255)' }}
              />
              <div className="flex items-center gap-3">
                <span className="text-3xl">🇵🇪</span>
                <div>
                  <p
                    className="text-xs font-semibold text-[oklch(0.95_0.01_80)] uppercase tracking-wider"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {t.peruLabel}
                  </p>
                  <p
                    className="text-xs text-[oklch(0.55_0.015_255)]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {t.peruDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
