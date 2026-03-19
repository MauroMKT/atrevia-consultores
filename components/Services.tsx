'use client'

import { useState } from 'react'
import { translations, type Language } from '@/lib/translations'
import { CheckCircle, TrendingUp, Building2, Megaphone, Sofa, ArrowUpRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface ServicesProps {
  lang: Language
}

// 4 tabs: Marketing & Branding Digital | Desarrollo Empresarial | Inmuebles | Diseño de Interiores
const serviceIcons = [Megaphone, TrendingUp, Building2, Sofa]
const serviceRoutes = [
  '/servicios/marketing-branding',
  '/servicios/desarrollo-empresarial',
  '/servicios/inmuebles',
  '/servicios/diseno-interiores',
]

const serviceImages = [
  "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1000&q=80&fit=crop",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000&q=80&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80&fit=crop",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80&fit=crop",
]

export default function Services({ lang }: ServicesProps) {
  const t = translations[lang].services
  const [activeService, setActiveService] = useState(0)

  const scrollToContact = () => {
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="servicios"
      className="py-32 relative overflow-hidden"
      style={{ background: 'oklch(0.12 0.025 255)' }}
    >
      {/* Background decoration */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 opacity-[0.02] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at right, oklch(0.78 0.12 75), transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-[oklch(0.78_0.12_75)]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[oklch(0.78_0.12_75)]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t.badge}
            </span>
          </div>
          <div className="max-w-3xl">
            <h2
              className="text-4xl lg:text-6xl font-light text-[oklch(0.95_0.01_80)] leading-[1.1] mb-6 text-balance"
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
          </div>
        </div>

        {/* Service Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {t.items.map((service, i) => {
            const Icon = serviceIcons[i]
            return (
              <button
                key={i}
                onClick={() => setActiveService(i)}
                className={`flex items-center gap-3 px-6 py-3 rounded transition-all duration-300 ${
                  activeService === i
                    ? 'bg-[oklch(0.78_0.12_75)] text-[oklch(0.12_0.025_255)]'
                    : 'border border-[oklch(0.25_0.03_255)] text-[oklch(0.65_0.015_255)] hover:border-[oklch(0.78_0.12_75)] hover:text-[oklch(0.95_0.01_80)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span
                  className="text-sm font-medium tracking-wider"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {service.tag}
                </span>
              </button>
            )
          })}
        </div>

        {/* Active Service Detail */}
        {t.items.map((service, i) => (
          <div
            key={i}
            className={`transition-all duration-500 ${activeService === i ? 'block' : 'hidden'}`}
          >
            <div
              className="rounded overflow-hidden"
              style={{ border: '1px solid oklch(0.22 0.03 255)', background: 'oklch(0.16 0.025 255)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: Image */}
                <div className="relative aspect-video lg:aspect-auto min-h-[300px] overflow-hidden">
                  <img
                    src={serviceImages[i]}
                    alt={`${service.tag} - ATREVIA Consultores servicios profesionales`}
                    className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity duration-500"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to right, oklch(0.16 0.025 255 / 0.4), transparent)',
                    }}
                  />
                  {/* Tag */}
                  <div className="absolute top-6 left-6">
                    <span
                      className="px-4 py-2 rounded text-xs font-semibold tracking-wider uppercase"
                      style={{
                        background: 'oklch(0.78 0.12 75)',
                        color: 'oklch(0.12 0.025 255)',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {service.tag}
                    </span>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="p-8 lg:p-12 flex flex-col gap-6">
                  <div>
                    <h3
                      className="text-2xl lg:text-3xl font-light text-[oklch(0.95_0.01_80)] mb-4 leading-snug"
                      style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-sm text-[oklch(0.60_0.015_255)] leading-relaxed"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {service.desc}
                    </p>
                  </div>

                  {/* Features list */}
                  <div>
                    <p
                      className="text-xs tracking-[0.2em] uppercase text-[oklch(0.78_0.12_75)] mb-4"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {lang === 'es' ? 'Incluye' : lang === 'en' ? 'Includes' : lang === 'it' ? 'Include' : lang === 'fr' ? 'Inclut' : 'Beinhaltet'}
                    </p>
                    <ul className="grid grid-cols-1 gap-3">
                      {service.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-[oklch(0.78_0.12_75)] flex-shrink-0 mt-0.5" />
                          <span
                            className="text-sm text-[oklch(0.70_0.015_255)]"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <button
                      onClick={scrollToContact}
                      className="group flex items-center gap-3 w-fit px-6 py-3 rounded"
                      style={{
                        background: 'oklch(0.78 0.12 75 / 0.1)',
                        border: '1px solid oklch(0.78 0.12 75 / 0.4)',
                        color: 'oklch(0.78 0.12 75)',
                        fontFamily: 'Inter, sans-serif',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget
                        el.style.background = 'oklch(0.78 0.12 75)'
                        el.style.color = 'oklch(0.12 0.025 255)'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget
                        el.style.background = 'oklch(0.78 0.12 75 / 0.1)'
                        el.style.color = 'oklch(0.78 0.12 75)'
                      }}
                    >
                      <span className="text-sm font-medium tracking-wider">{service.cta}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </button>

                    <Link
                      href={serviceRoutes[i]}
                      scroll={true}
                      onClick={() => window.scrollTo({ top: 0 })}
                      className="group flex items-center gap-2 w-fit px-5 py-3 rounded transition-all duration-300 hover:bg-[oklch(0.20_0.03_255)]"
                      style={{
                        border: '1px solid oklch(0.28 0.03 255)',
                        color: 'oklch(0.60 0.015 255)',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      <span className="text-sm font-medium tracking-wider group-hover:text-[oklch(0.85_0.01_80)] transition-colors">
                        {lang === 'es' ? 'Ver detalles' :
                         lang === 'en' ? 'View details' :
                         lang === 'it' ? 'Vedi dettagli' :
                         lang === 'fr' ? 'Voir les détails' :
                         'Details ansehen'}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:text-[oklch(0.78_0.12_75)] transition-colors" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Service number navigation */}
        <div className="flex items-center gap-4 mt-8 justify-center">
          {t.items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveService(i)}
              className={`w-8 h-px transition-all duration-300 ${
                activeService === i
                  ? 'bg-[oklch(0.78_0.12_75)] w-12'
                  : 'bg-[oklch(0.30_0.03_255)] hover:bg-[oklch(0.50_0.03_255)]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
