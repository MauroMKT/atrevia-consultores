'use client'

import { translations, type Language } from '@/lib/translations'

interface MarqueeBannerProps {
  lang: Language
}

export default function MarqueeBanner({ lang }: MarqueeBannerProps) {
  const items = translations[lang].marquee.items
  const doubled = [...items, ...items, ...items, ...items]

  return (
    <div
      className="w-full overflow-hidden border-y border-[oklch(0.25_0.03_255)] py-4"
      style={{ background: 'oklch(0.16 0.025 255)' }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8 px-8">
            <span
              className="text-xs tracking-[0.3em] uppercase text-[oklch(0.65_0.015_255)]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-[oklch(0.78_0.12_75)] flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
