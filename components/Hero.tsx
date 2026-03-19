'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { translations, type Language } from '@/lib/translations'
import { ArrowRight, ArrowDown } from 'lucide-react'

interface HeroProps {
  lang: Language
}

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang].hero
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (!heroRef.current) return
        const x = (e.clientX / window.innerWidth - 0.5) * 20
        const y = (e.clientY / window.innerHeight - 0.5) * 20
        heroRef.current.style.setProperty('--mouse-x', `${x}px`)
        heroRef.current.style.setProperty('--mouse-y', `${y}px`)
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const scrollToServices = () => {
    document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background: 'oklch(0.12 0.025 255)',
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large circle */}
        <div
          className="absolute -top-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, oklch(0.78 0.12 75), transparent 70%)',
            transform: 'translate(var(--mouse-x, 0px), var(--mouse-y, 0px))',
            transition: 'transform 0.8s ease-out',
          }}
        />
        {/* Small circle */}
        <div
          className="absolute -bottom-1/4 -left-1/4 w-[50vw] h-[50vw] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, oklch(0.78 0.12 75), transparent 70%)',
            transform: 'translate(calc(var(--mouse-x, 0px) * -1), calc(var(--mouse-y, 0px) * -1))',
            transition: 'transform 1.2s ease-out',
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.78 0.12 75) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.78 0.12 75) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Diagonal accent */}
        <div
          className="absolute top-0 left-0 w-px h-full opacity-20"
          style={{
            background: 'linear-gradient(to bottom, transparent, oklch(0.78 0.12 75), transparent)',
            left: '8%',
          }}
        />
        <div
          className="absolute top-0 left-0 w-px h-full opacity-10"
          style={{
            background: 'linear-gradient(to bottom, transparent, oklch(0.78 0.12 75), transparent)',
            left: '16%',
          }}
        />
      </div>

      {/* Hero right image — desktop only */}
      <div className="absolute inset-y-0 right-0 w-2/5 hidden lg:block pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&fit=crop"
            alt="Vista aerea del distrito empresarial de Lima, Peru, con luces doradas nocturnas y arquitectura moderna"
            fill
            priority
            fetchPriority="high"
            sizes="40vw"
            className="object-cover opacity-35"
            style={{ objectPosition: 'center center' }}
          />
          {/* Gradient mask left */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, oklch(0.12 0.025 255) 0%, oklch(0.12 0.025 255 / 0.6) 30%, transparent 70%)',
            }}
          />
          {/* Gradient mask bottom */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, oklch(0.12 0.025 255) 0%, transparent 30%)',
            }}
          />
        </div>
        {/* Floating card over image */}
        <div className="absolute bottom-24 right-8 xl:right-16 z-10 pointer-events-auto">
          <div
            className="p-5 rounded max-w-[220px]"
            style={{
              background: 'oklch(0.16 0.025 255 / 0.92)',
              backdropFilter: 'blur(24px)',
              border: '1px solid oklch(0.30 0.03 255)',
            }}
          >
            <div className="flex gap-2 mb-3">
              <span className="text-xl">🇮🇹</span>
              <span className="text-xl">🇵🇪</span>
            </div>
            <p
              className="text-sm text-[oklch(0.85_0.01_80)] leading-snug"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              {t.badge}
            </p>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        {/* Badge */}
        <div className="flex items-center gap-3 mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 px-4 py-2 border border-[oklch(0.78_0.12_75/0.4)] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.78_0.12_75)] animate-pulse" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[oklch(0.78_0.12_75)]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t.badge}
            </span>
          </div>
          {/* Flags */}
          <div className="flex gap-1">
            <span className="text-lg" title="Italia">🇮🇹</span>
            <span className="text-lg" title="Perú">🇵🇪</span>
          </div>
        </div>

        {/* Main heading */}
        <h1
          className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-light leading-[0.9] mb-6 animate-fade-in-up"
          style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            animationDelay: '0.2s',
          }}
        >
          <span className="text-[oklch(0.95_0.01_80)] block">{t.title}</span>
          <span
            className="block"
            style={{
              background: 'linear-gradient(135deg, oklch(0.78 0.12 75), oklch(0.85 0.10 80))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t.titleAccent}
          </span>
        </h1>

        <div className="max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
          <p
            className="text-base lg:text-lg text-[oklch(0.65_0.015_255)] leading-relaxed mb-10"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={scrollToServices}
              className="group flex items-center gap-3 px-8 py-4 bg-[oklch(0.78_0.12_75)] text-[oklch(0.12_0.025_255)] font-semibold rounded hover:bg-[oklch(0.85_0.10_80)] transition-all duration-300"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
            >
              {t.cta1}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={scrollToContact}
              className="group flex items-center gap-3 px-8 py-4 border border-[oklch(0.35_0.03_255)] text-[oklch(0.75_0.015_255)] rounded hover:border-[oklch(0.78_0.12_75)] hover:text-[oklch(0.95_0.01_80)] transition-all duration-300"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
            >
              {t.cta2}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div
          className="mt-20 pt-12 border-t border-[oklch(0.22_0.03_255)] grid grid-cols-3 gap-8 max-w-xl animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          {[t.stat1, t.stat2, t.stat3].map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span
                className="text-3xl lg:text-4xl font-light mb-1"
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
                className="text-xs text-[oklch(0.55_0.015_255)] uppercase tracking-wider"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50 animate-bounce">
        <ArrowDown className="w-4 h-4 text-[oklch(0.78_0.12_75)]" />
      </div>

      {/* Floating year badge */}
      <div
        className="absolute top-1/2 right-8 lg:right-16 -translate-y-1/2 flex flex-col items-center gap-2 opacity-20 hidden lg:flex"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <div className="w-px h-16 bg-[oklch(0.78_0.12_75)]" />
        <span
          className="text-xs tracking-[0.4em] text-[oklch(0.78_0.12_75)] uppercase"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Est. 2004
        </span>
        <div className="w-px h-16 bg-[oklch(0.78_0.12_75)]" />
      </div>
    </section>
  )
}
