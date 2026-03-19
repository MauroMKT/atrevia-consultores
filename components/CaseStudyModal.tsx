'use client'

import { useEffect } from 'react'
import { X, Clock, TrendingUp, Building2, CheckCircle2 } from 'lucide-react'

interface CaseStudy {
  label: string
  title: string
  sector: string
  duration: string
  result: string
  challenge: string
  solution: string
  outcomes: string[]
}

interface CaseStudyModalProps {
  caseStudy: CaseStudy
  clientName: string
  clientRole: string
  clientFlag: string
  clientLocation: string
  onClose: () => void
}

export default function CaseStudyModal({
  caseStudy,
  clientName,
  clientRole,
  clientFlag,
  clientLocation,
  onClose,
}: CaseStudyModalProps) {
  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={caseStudy.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 cursor-pointer"
        style={{ background: 'oklch(0.08 0.02 255 / 0.85)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: 'oklch(0.13 0.025 255)',
          border: '1px solid oklch(0.24 0.03 255)',
          boxShadow: '0 32px 80px oklch(0 0 0 / 0.6)',
        }}
      >
        {/* Gold top line */}
        <div
          className="absolute top-0 left-12 right-12 h-px"
          style={{ background: 'linear-gradient(to right, transparent, oklch(0.78 0.12 75 / 0.8), transparent)' }}
        />

        {/* Header */}
        <div className="flex items-start justify-between p-7 pb-0">
          <div className="flex-1 pr-4">
            {/* Sector badge */}
            <span
              className="inline-block text-[10px] px-2.5 py-1 rounded-full tracking-widest uppercase mb-4"
              style={{
                background: 'oklch(0.78 0.12 75 / 0.1)',
                border: '1px solid oklch(0.78 0.12 75 / 0.3)',
                color: 'oklch(0.78 0.12 75)',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {caseStudy.sector}
            </span>
            <h2
              className="text-xl lg:text-2xl font-light leading-snug text-balance"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: 'oklch(0.95 0.01 80)' }}
            >
              {caseStudy.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Chiudi"
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80 mt-1"
            style={{ background: 'oklch(0.20 0.03 255)', border: '1px solid oklch(0.30 0.03 255)', color: 'oklch(0.65 0.015 255)' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Client + stats bar */}
        <div className="px-7 pt-5 pb-0">
          <div
            className="flex flex-wrap items-center gap-4 p-4 rounded-xl"
            style={{ background: 'oklch(0.16 0.025 255)', border: '1px solid oklch(0.20 0.03 255)' }}
          >
            {/* Client */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{
                  background: 'oklch(0.78 0.12 75 / 0.15)',
                  border: '1px solid oklch(0.78 0.12 75 / 0.3)',
                  color: 'oklch(0.78 0.12 75)',
                  fontFamily: 'Playfair Display, Georgia, serif',
                }}
              >
                {clientName.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'oklch(0.90 0.01 80)', fontFamily: 'Inter, sans-serif' }}>
                  {clientName}
                </p>
                <p className="text-xs truncate" style={{ color: 'oklch(0.50 0.015 255)', fontFamily: 'Inter, sans-serif' }}>
                  {clientRole} · {clientFlag} {clientLocation}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8" style={{ background: 'oklch(0.22 0.03 255)' }} />

            {/* Duration */}
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'oklch(0.78 0.12 75)' }} />
              <span className="text-xs" style={{ color: 'oklch(0.65 0.015 255)', fontFamily: 'Inter, sans-serif' }}>
                {caseStudy.duration}
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8" style={{ background: 'oklch(0.22 0.03 255)' }} />

            {/* Result */}
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'oklch(0.78 0.12 75)' }} />
              <span className="text-xs font-semibold" style={{ color: 'oklch(0.78 0.12 75)', fontFamily: 'Inter, sans-serif' }}>
                {caseStudy.result}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-7 flex flex-col gap-6">
          {/* Challenge */}
          <div>
            <h3
              className="text-xs font-semibold tracking-[0.18em] uppercase mb-3"
              style={{ color: 'oklch(0.78 0.12 75)', fontFamily: 'Inter, sans-serif' }}
            >
              La sfida
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'oklch(0.72 0.012 255)', fontFamily: 'Inter, sans-serif' }}
            >
              {caseStudy.challenge}
            </p>
          </div>

          {/* Separator */}
          <div className="h-px" style={{ background: 'oklch(0.20 0.03 255)' }} />

          {/* Solution */}
          <div>
            <h3
              className="text-xs font-semibold tracking-[0.18em] uppercase mb-3"
              style={{ color: 'oklch(0.78 0.12 75)', fontFamily: 'Inter, sans-serif' }}
            >
              La soluzione
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'oklch(0.72 0.012 255)', fontFamily: 'Inter, sans-serif' }}
            >
              {caseStudy.solution}
            </p>
          </div>

          {/* Separator */}
          <div className="h-px" style={{ background: 'oklch(0.20 0.03 255)' }} />

          {/* Outcomes */}
          <div>
            <h3
              className="text-xs font-semibold tracking-[0.18em] uppercase mb-4"
              style={{ color: 'oklch(0.78 0.12 75)', fontFamily: 'Inter, sans-serif' }}
            >
              Risultati chiave
            </h3>
            <ul className="flex flex-col gap-3">
              {caseStudy.outcomes.map((outcome, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    style={{ color: 'oklch(0.78 0.12 75)' }}
                  />
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: 'oklch(0.82 0.01 80)', fontFamily: 'Inter, sans-serif' }}
                  >
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, oklch(0.78 0.12 75 / 0.2), transparent)' }}
        />
      </div>
    </div>
  )
}
