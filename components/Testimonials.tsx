'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { translations, type Language } from '@/lib/translations'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

interface TestimonialsProps {
  lang: Language
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const t = (translations[lang] as any).testimonials
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const total = t.items.length

  const toSlug = (name: string) =>
    name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  const prev = () => setActive(i => (i - 1 + total) % total)
  const next = () => setActive(i => (i + 1) % total)

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActive(i => (i + 1) % total)
      }, 6000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, total])

  const current = t.items[active]

  // Which 3 dots to show around active (for a 10-item carousel)
  const visibleDots = Array.from({ length: total }, (_, i) => i)

  return (
    <section
      id="testimonials"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'oklch(0.14 0.025 255)' }}
    >
      {/* Subtle top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, oklch(0.78 0.12 75 / 0.4), transparent)' }}
      />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.78 0.12 75 / 0.04), transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            style={{
              background: 'oklch(0.78 0.12 75 / 0.1)',
              border: '1px solid oklch(0.78 0.12 75 / 0.3)',
              color: 'oklch(0.78 0.12 75)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {t.badge}
          </span>
          <h2
            className="text-3xl lg:text-5xl font-light text-balance"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: 'oklch(0.95 0.01 80)' }}
          >
            {t.title}{' '}
            <em className="not-italic" style={{ color: 'oklch(0.78 0.12 75)' }}>
              {t.titleAccent}
            </em>
          </h2>
        </div>

        {/* Card */}
        <div
          className="relative mx-auto max-w-3xl rounded-2xl p-8 lg:p-12"
          style={{
            background: 'oklch(0.16 0.025 255)',
            border: '1px solid oklch(0.24 0.03 255)',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gold top accent */}
          <div
            className="absolute top-0 left-12 right-12 h-px"
            style={{ background: 'linear-gradient(to right, transparent, oklch(0.78 0.12 75 / 0.6), transparent)' }}
          />

          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {Array.from({ length: current.rating }).map((_, i) => (
              <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="oklch(0.78 0.12 75)">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <blockquote
            className="text-lg lg:text-xl font-light leading-relaxed mb-8 text-balance"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: 'oklch(0.88 0.01 80)' }}
          >
            {'"'}{current.text}{'"'}
          </blockquote>

          {/* Author row */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar placeholder with initial */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-lg font-bold"
                style={{
                  background: 'oklch(0.78 0.12 75 / 0.15)',
                  border: '1px solid oklch(0.78 0.12 75 / 0.3)',
                  color: 'oklch(0.78 0.12 75)',
                  fontFamily: 'Playfair Display, Georgia, serif',
                }}
              >
                {current.name.charAt(0)}
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: 'oklch(0.95 0.01 80)', fontFamily: 'Inter, sans-serif' }}
                >
                  {current.name}
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'oklch(0.55 0.015 255)', fontFamily: 'Inter, sans-serif' }}
                >
                  {current.role}
                </p>
              </div>
            </div>

            {/* Location + service tag */}
            <div className="flex flex-col items-end gap-1.5">
              <span
                className="text-xs flex items-center gap-1.5"
                style={{ color: 'oklch(0.60 0.015 255)', fontFamily: 'Inter, sans-serif' }}
              >
                <span>{current.flag}</span>
                {current.location}
              </span>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full tracking-wider uppercase"
                style={{
                  background: 'oklch(0.78 0.12 75 / 0.08)',
                  border: '1px solid oklch(0.78 0.12 75 / 0.2)',
                  color: 'oklch(0.78 0.12 75)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {current.service}
              </span>
            </div>
          </div>

          {/* Case study link */}
          {current.caseStudy && (
            <div className="mt-7 pt-6" style={{ borderTop: '1px solid oklch(0.20 0.03 255)' }}>
              <Link
                href={`/${lang}/case-study/${toSlug(current.name)}`}
                className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide uppercase transition-all duration-200 group"
                style={{ color: 'oklch(0.78 0.12 75)', fontFamily: 'Inter, sans-serif' }}
              >
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 group-hover:scale-110"
                  style={{ background: 'oklch(0.78 0.12 75 / 0.12)', border: '1px solid oklch(0.78 0.12 75 / 0.3)' }}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                {current.caseStudy.label}
              </Link>
            </div>
          )}

          {/* Nav arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-x-0.5"
            style={{ background: 'oklch(0.20 0.03 255)', border: '1px solid oklch(0.30 0.03 255)', color: 'oklch(0.65 0.015 255)' }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:translate-x-0.5"
            style={{ background: 'oklch(0.20 0.03 255)', border: '1px solid oklch(0.30 0.03 255)', color: 'oklch(0.65 0.015 255)' }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {visibleDots.map(i => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: active === i ? '24px' : '8px',
                height: '8px',
                background: active === i ? 'oklch(0.78 0.12 75)' : 'oklch(0.30 0.03 255)',
              }}
            />
          ))}
        </div>

        {/* Counter */}
        <p
          className="text-center mt-4 text-xs"
          style={{ color: 'oklch(0.40 0.015 255)', fontFamily: 'Inter, sans-serif' }}
        >
          {active + 1} / {total}
        </p>
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, oklch(0.78 0.12 75 / 0.2), transparent)' }}
      />
    </section>
  )
}
