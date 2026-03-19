'use client'

import { translations, type Language } from '@/lib/translations'
import { Globe2, Users2, Target } from 'lucide-react'

interface USPProps {
  lang: Language
}

const icons = [Globe2, Users2, Target]

const uspImages = [
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&fit=crop",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80&fit=crop",
]

export default function USP({ lang }: USPProps) {
  const t = translations[lang].usp

  return (
    <section
      className="py-32 relative overflow-hidden"
      style={{ background: 'oklch(0.16 0.025 255)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-[oklch(0.78_0.12_75)]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[oklch(0.78_0.12_75)]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t.badge}
            </span>
            <div className="w-12 h-px bg-[oklch(0.78_0.12_75)]" />
          </div>
          <h2
            className="text-4xl lg:text-5xl font-light text-[oklch(0.95_0.01_80)] text-balance"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            {t.title}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <div
                key={i}
                className="group relative flex flex-col rounded transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                style={{
                  background: 'oklch(0.12 0.025 255)',
                  border: '1px solid oklch(0.22 0.03 255)',
                }}
              >
                {/* Card image top */}
                <div className="relative w-full h-44 overflow-hidden flex-shrink-0">
                  <img
                    src={uspImages[i]}
                    alt={`${item.title} - ATREVIA Consultores servicio especializado`}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, transparent 40%, oklch(0.12 0.025 255) 100%)' }}
                  />
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at top left, oklch(0.78 0.12 75 / 0.06), transparent 60%)',
                  }}
                />

                {/* Content */}
                <div className="flex flex-col p-8 flex-1">
                {/* Number */}
                <div className="flex items-start justify-between mb-8">
                  <div
                    className="w-12 h-12 rounded flex items-center justify-center"
                    style={{ background: 'oklch(0.78 0.12 75 / 0.1)', border: '1px solid oklch(0.78 0.12 75 / 0.3)' }}
                  >
                    <Icon className="w-5 h-5 text-[oklch(0.78_0.12_75)]" />
                  </div>
                  <span
                    className="text-6xl font-light leading-none select-none"
                    style={{
                      fontFamily: 'Playfair Display, Georgia, serif',
                      color: 'oklch(0.22 0.03 255)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3
                  className="text-xl font-medium text-[oklch(0.95_0.01_80)] mb-4 leading-snug"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm text-[oklch(0.60_0.015_255)] leading-relaxed flex-1"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.desc}
                </p>

                {/* Bottom gold line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px rounded-b opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(to right, transparent, oklch(0.78 0.12 75), transparent)' }}
                />
                </div>{/* end content */}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
