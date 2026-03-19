'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X, ChevronDown, ChevronUp, Shield, BarChart2, Megaphone } from 'lucide-react'
import { translations, type Language } from '@/lib/translations'
import { useLang } from '@/lib/LanguageContext'

const STORAGE_KEY = 'atrevia_cookie_consent'

interface ConsentState {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  decided: boolean
}

const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  decided: false,
}

export default function CookieConsent() {
  const { lang } = useLang()
  const t = (translations[lang] as any).cookie

  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [consent, setConsent] = useState<ConsentState>(defaultConsent)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        // Small delay so the page loads first
        const timer = setTimeout(() => setVisible(true), 800)
        return () => clearTimeout(timer)
      }
      const parsed: ConsentState = JSON.parse(stored)
      if (!parsed.decided) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const save = (state: ConsentState) => {
    const final = { ...state, decided: true }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(final)) } catch {}
    setVisible(false)
  }

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true, decided: true })
  const acceptNecessary = () => save({ necessary: true, analytics: false, marketing: false, decided: true })
  const savePrefs = () => save(consent)

  const toggle = (key: keyof Omit<ConsentState, 'decided' | 'necessary'>) =>
    setConsent(prev => ({ ...prev, [key]: !prev[key] }))

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 animate-fade-in-up"
      style={{ animationDuration: '0.4s' }}
    >
      <div
        className="max-w-4xl mx-auto rounded-2xl border overflow-hidden shadow-2xl"
        style={{
          background: 'oklch(0.14 0.025 255)',
          borderColor: 'oklch(0.30 0.04 255)',
          boxShadow: '0 -4px 60px oklch(0 0 0 / 0.6), 0 0 0 1px oklch(0.78 0.12 75 / 0.15)',
        }}
      >
        {/* Top gold accent line */}
        <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.78 0.12 75), transparent)' }} />

        <div className="p-5 md:p-6">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: 'oklch(0.78 0.12 75 / 0.15)' }}>
                <Cookie className="w-4 h-4" style={{ color: 'oklch(0.78 0.12 75)' }} />
              </div>
              <h2 className="text-base font-semibold" style={{ fontFamily: 'Playfair Display, Georgia, serif', color: 'oklch(0.95 0.01 80)' }}>
                {t.title}
              </h2>
            </div>
            <button
              onClick={acceptNecessary}
              aria-label="Close"
              className="p-1 rounded-full transition-colors hover:bg-white/10 shrink-0 mt-0.5"
              style={{ color: 'oklch(0.65 0.015 255)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'oklch(0.72 0.015 255)' }}>
            {t.description}{' '}
            <span style={{ color: 'oklch(0.72 0.015 255)' }}>{t.privacyNote} </span>
            <Link href={`/${lang}/privacy`} className="underline underline-offset-2 transition-colors hover:opacity-80" style={{ color: 'oklch(0.78 0.12 75)' }}>
              {t.privacyLink}
            </Link>.
          </p>

          {/* Expandable details */}
          {showDetails && (
            <div className="mb-4 space-y-2 rounded-xl p-4" style={{ background: 'oklch(0.18 0.028 255)', border: '1px solid oklch(0.28 0.035 255)' }}>
              {/* Necessary — always on */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Shield className="w-4 h-4" style={{ color: 'oklch(0.78 0.12 75)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium" style={{ color: 'oklch(0.90 0.01 80)' }}>{t.categories.necessary.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'oklch(0.78 0.12 75 / 0.15)', color: 'oklch(0.78 0.12 75)' }}>
                      {lang === 'es' ? 'Siempre activas' : lang === 'it' ? 'Sempre attive' : lang === 'fr' ? 'Toujours actives' : lang === 'de' ? 'Immer aktiv' : 'Always on'}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'oklch(0.62 0.015 255)' }}>{t.categories.necessary.desc}</p>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <BarChart2 className="w-4 h-4" style={{ color: 'oklch(0.65 0.015 255)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium" style={{ color: 'oklch(0.90 0.01 80)' }}>{t.categories.analytics.label}</span>
                    <button
                      role="switch"
                      aria-checked={consent.analytics}
                      onClick={() => toggle('analytics')}
                      className="relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0"
                      style={{ background: consent.analytics ? 'oklch(0.78 0.12 75)' : 'oklch(0.28 0.035 255)' }}
                    >
                      <span
                        className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200"
                        style={{ left: consent.analytics ? '1.375rem' : '0.125rem' }}
                      />
                    </button>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'oklch(0.62 0.015 255)' }}>{t.categories.analytics.desc}</p>
                </div>
              </div>

              {/* Marketing */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Megaphone className="w-4 h-4" style={{ color: 'oklch(0.65 0.015 255)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium" style={{ color: 'oklch(0.90 0.01 80)' }}>{t.categories.marketing.label}</span>
                    <button
                      role="switch"
                      aria-checked={consent.marketing}
                      onClick={() => toggle('marketing')}
                      className="relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0"
                      style={{ background: consent.marketing ? 'oklch(0.78 0.12 75)' : 'oklch(0.28 0.035 255)' }}
                    >
                      <span
                        className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200"
                        style={{ left: consent.marketing ? '1.375rem' : '0.125rem' }}
                      />
                    </button>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'oklch(0.62 0.015 255)' }}>{t.categories.marketing.desc}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action row */}
          <div className="flex flex-wrap items-center gap-2 justify-between">
            {/* Left: manage toggle */}
            <button
              onClick={() => setShowDetails(v => !v)}
              className="flex items-center gap-1 text-xs transition-opacity hover:opacity-80"
              style={{ color: 'oklch(0.65 0.015 255)' }}
            >
              {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              {showDetails ? t.savePrefs : t.manage}
            </button>

            {/* Right: primary actions */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={acceptNecessary}
                className="px-4 py-2 text-xs font-medium rounded-lg border transition-colors duration-200 hover:bg-white/5"
                style={{ borderColor: 'oklch(0.32 0.04 255)', color: 'oklch(0.72 0.015 255)' }}
              >
                {t.acceptNecessary}
              </button>

              {showDetails ? (
                <button
                  onClick={savePrefs}
                  className="px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 hover:brightness-110"
                  style={{ background: 'oklch(0.78 0.12 75)', color: 'oklch(0.12 0.025 255)' }}
                >
                  {t.savePrefs}
                </button>
              ) : (
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 hover:brightness-110"
                  style={{ background: 'oklch(0.78 0.12 75)', color: 'oklch(0.12 0.025 255)' }}
                >
                  {t.acceptAll}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
