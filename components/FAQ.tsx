'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { translations, type Language } from '@/lib/translations'

interface FAQProps {
  lang: Language
}

export default function FAQ({ lang }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // FAQ only shown for ES, EN, IT, FR — never DE
  const t = (translations[lang] as any).faq
  if (!t || lang === 'de') return null

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section
      id="faq"
      className="relative py-24 lg:py-32"
      style={{ background: 'oklch(0.13 0.025 255)' }}
    >
      {/* Top border gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, oklch(0.78 0.12 75 / 0.4), transparent)' }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-8" style={{ background: 'oklch(0.78 0.12 75)' }} />
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: 'oklch(0.78 0.12 75)', fontFamily: 'Inter, sans-serif' }}
            >
              {t.badge}
            </span>
            <div className="h-px w-8" style={{ background: 'oklch(0.78 0.12 75)' }} />
          </div>

          <h2
            className="text-3xl lg:text-5xl font-light text-balance"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: 'oklch(0.95 0.01 80)' }}
          >
            {t.title}{' '}
            <em style={{ color: 'oklch(0.78 0.12 75)', fontStyle: 'italic' }}>{t.titleAccent}</em>
          </h2>

          <p
            className="mt-4 text-base leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'oklch(0.65 0.015 255)', fontFamily: 'Inter, sans-serif' }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {t.items.map((item: { q: string; a: string }, i: number) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className="rounded-lg overflow-hidden transition-all duration-300"
                style={{
                  background: isOpen ? 'oklch(0.16 0.03 255)' : 'oklch(0.15 0.025 255)',
                  border: `1px solid ${isOpen ? 'oklch(0.78 0.12 75 / 0.35)' : 'oklch(0.22 0.03 255)'}`,
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle
                      className="w-4 h-4 mt-0.5 flex-shrink-0 transition-colors duration-200"
                      style={{ color: isOpen ? 'oklch(0.78 0.12 75)' : 'oklch(0.45 0.03 255)' }}
                    />
                    <span
                      className="text-sm font-semibold leading-snug transition-colors duration-200"
                      style={{
                        color: isOpen ? 'oklch(0.95 0.01 80)' : 'oklch(0.82 0.01 80)',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {item.q}
                    </span>
                  </div>
                  <ChevronDown
                    className="w-4 h-4 flex-shrink-0 mt-0.5 transition-transform duration-300"
                    style={{
                      color: 'oklch(0.78 0.12 75)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>

                {/* Answer — animated with max-height */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '400px' : '0px' }}
                >
                  <div
                    className="px-6 pb-5 pl-[3.25rem] text-sm leading-relaxed"
                    style={{ color: 'oklch(0.65 0.015 255)', fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.a}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Privacy note */}
        <p
          className="mt-10 text-center text-xs"
          style={{ color: 'oklch(0.50 0.015 255)', fontFamily: 'Inter, sans-serif' }}
        >
          {t.privacyNote}{' '}
          <Link
            href="/privacy"
            className="underline underline-offset-2 transition-colors duration-200 hover:opacity-80"
            style={{ color: 'oklch(0.78 0.12 75)' }}
          >
            {t.privacyLink}
          </Link>
          .
        </p>

      </div>

      {/* Bottom border gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, oklch(0.78 0.12 75 / 0.2), transparent)' }}
      />
    </section>
  )
}
