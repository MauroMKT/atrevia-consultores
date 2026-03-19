'use client'

import { translations, type Language } from '@/lib/translations'
import { Flag, Award, Puzzle, BarChart3, Shield, Handshake } from 'lucide-react'

interface WhyUsProps {
  lang: Language
}

const icons = [Flag, Award, Puzzle, BarChart3, Shield, Handshake]

export default function WhyUs({ lang }: WhyUsProps) {
  const t = translations[lang].whyUs

  return (
    <section
      id="por-que"
      className="py-32 relative overflow-hidden"
      style={{ background: 'oklch(0.16 0.025 255)' }}
    >
      {/* Decorative */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px opacity-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, oklch(0.78 0.12 75), transparent)',
          left: '5%',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-start">
          {/* Left sticky header */}
          <div className="lg:col-span-2 lg:sticky lg:top-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-[oklch(0.78_0.12_75)]" />
              <span
                className="text-xs tracking-[0.3em] uppercase text-[oklch(0.78_0.12_75)]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {t.badge}
              </span>
            </div>
            <h2
              className="text-4xl lg:text-5xl xl:text-6xl font-light text-[oklch(0.95_0.01_80)] leading-[1.1] mb-6 text-balance"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              {t.title}
            </h2>
            <p
              className="text-base text-[oklch(0.60_0.015_255)] leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t.subtitle}
            </p>

            {/* Image accent */}
            <div
              className="mt-10 relative overflow-hidden rounded aspect-[4/3]"
              style={{ border: '1px solid oklch(0.25 0.03 255)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80&fit=crop"
                alt="Vista del Colosseo di Roma, simbolo della partnership italo-peruviana di ATREVIA Consultores"
                className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity duration-500"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, oklch(0.12 0.025 255 / 0.5), transparent)' }}
              />
            </div>
          </div>

          {/* Right: Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.items.map((item, i) => {
              const Icon = icons[i]
              return (
                <div
                  key={i}
                  className="group p-6 rounded transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  style={{
                    background: 'oklch(0.12 0.025 255)',
                    border: '1px solid oklch(0.22 0.03 255)',
                  }}
                >
                  {/* Hover top border */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: 'linear-gradient(to right, oklch(0.78 0.12 75), transparent)' }}
                  />

                  <div
                    className="w-10 h-10 rounded flex items-center justify-center mb-5"
                    style={{
                      background: 'oklch(0.78 0.12 75 / 0.08)',
                      border: '1px solid oklch(0.78 0.12 75 / 0.2)',
                    }}
                  >
                    <Icon className="w-4 h-4 text-[oklch(0.78_0.12_75)]" />
                  </div>
                  <h3
                    className="text-base font-semibold text-[oklch(0.90_0.01_80)] mb-3"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm text-[oklch(0.55_0.015_255)] leading-relaxed"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats band */}
        <div
          className="mt-24 pt-12 border-t border-[oklch(0.22_0.03_255)] grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '20+', label: lang === 'de' ? 'Jahre Erfahrung' : lang === 'fr' ? "Années d'expérience" : lang === 'it' ? 'Anni di esperienza' : lang === 'en' ? 'Years of experience' : 'Años de experiencia' },
            { value: '3', label: lang === 'de' ? 'Kontinente' : lang === 'fr' ? 'Continents' : lang === 'it' ? 'Continenti' : lang === 'en' ? 'Continents' : 'Continentes' },
            { value: '500+', label: lang === 'de' ? 'Projekte' : lang === 'fr' ? 'Projets réussis' : lang === 'it' ? 'Progetti' : lang === 'en' ? 'Projects' : 'Proyectos' },
            { value: '100%', label: lang === 'de' ? 'Engagement' : lang === 'fr' ? 'Engagement' : lang === 'it' ? 'Impegno' : lang === 'en' ? 'Commitment' : 'Compromiso' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span
                className="text-4xl lg:text-5xl font-light mb-2"
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  background: 'linear-gradient(135deg, oklch(0.78 0.12 75), oklch(0.85 0.10 80))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs text-[oklch(0.55_0.015_255)] tracking-wider uppercase"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
