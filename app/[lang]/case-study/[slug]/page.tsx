import { notFound } from 'next/navigation'
import Link from 'next/link'
import { translations, type Language } from '@/lib/translations'
import { ArrowLeft, Clock, TrendingUp, Building2, CheckCircle2 } from 'lucide-react'

const VALID_LANGS: Language[] = ['es', 'en', 'it', 'fr', 'de']

function toSlug(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function generateStaticParams() {
  const slugs: { lang: string; slug: string }[] = []
  for (const lang of VALID_LANGS) {
    const items = (translations[lang] as any).testimonials.items as any[]
    for (const item of items) {
      if (item.caseStudy) {
        slugs.push({ lang, slug: toSlug(item.name) })
      }
    }
  }
  return slugs
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang: langParam, slug } = await params
  const lang: Language = VALID_LANGS.includes(langParam as Language)
    ? (langParam as Language)
    : 'es'

  const t = (translations[lang] as any)
  const items = t.testimonials.items as any[]
  const item = items.find((i: any) => i.caseStudy && toSlug(i.name) === slug)

  if (!item) notFound()

  const cs = item.caseStudy
  const labels = t.caseStudyPage

  return (
    <main
      className="min-h-screen"
      style={{ background: 'oklch(0.11 0.022 255)' }}
    >
      {/* Top accent line */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent, oklch(0.78 0.12 75 / 0.5), transparent)' }}
      />

      <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">

        {/* Back link */}
        <Link
          href={`/${lang}#testimonials`}
          className="inline-flex items-center gap-2 text-sm mb-12 transition-opacity duration-200 hover:opacity-70"
          style={{ color: 'oklch(0.60 0.015 255)', fontFamily: 'Inter, sans-serif' }}
        >
          <ArrowLeft className="w-4 h-4" />
          {labels.back}
        </Link>

        {/* Sector badge */}
        <div className="mb-6">
          <span
            className="inline-flex items-center gap-2 text-[10px] px-3 py-1.5 rounded-full tracking-widest uppercase"
            style={{
              background: 'oklch(0.78 0.12 75 / 0.1)',
              border: '1px solid oklch(0.78 0.12 75 / 0.3)',
              color: 'oklch(0.78 0.12 75)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <Building2 className="w-3 h-3" />
            {cs.sector}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl lg:text-4xl font-light leading-snug text-balance mb-10"
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: 'oklch(0.95 0.01 80)' }}
        >
          {cs.title}
        </h1>

        {/* Client + stats bar */}
        <div
          className="flex flex-wrap items-center gap-5 p-5 rounded-2xl mb-12"
          style={{
            background: 'oklch(0.16 0.025 255)',
            border: '1px solid oklch(0.22 0.03 255)',
          }}
        >
          {/* Avatar + name */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0"
              style={{
                background: 'oklch(0.78 0.12 75 / 0.15)',
                border: '1px solid oklch(0.78 0.12 75 / 0.35)',
                color: 'oklch(0.78 0.12 75)',
                fontFamily: 'Playfair Display, Georgia, serif',
              }}
            >
              {item.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p
                className="text-sm font-semibold truncate"
                style={{ color: 'oklch(0.92 0.01 80)', fontFamily: 'Inter, sans-serif' }}
              >
                {item.name}
              </p>
              <p
                className="text-xs truncate"
                style={{ color: 'oklch(0.50 0.015 255)', fontFamily: 'Inter, sans-serif' }}
              >
                {item.role} &middot; {item.flag} {item.location}
              </p>
            </div>
          </div>

          <div className="h-8 w-px hidden sm:block" style={{ background: 'oklch(0.22 0.03 255)' }} />

          {/* Duration */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 flex-shrink-0" style={{ color: 'oklch(0.78 0.12 75)' }} />
            <div>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: 'oklch(0.45 0.015 255)', fontFamily: 'Inter, sans-serif' }}>{labels.duration}</p>
              <p className="text-xs font-medium" style={{ color: 'oklch(0.75 0.01 80)', fontFamily: 'Inter, sans-serif' }}>{cs.duration}</p>
            </div>
          </div>

          <div className="h-8 w-px hidden sm:block" style={{ background: 'oklch(0.22 0.03 255)' }} />

          {/* Result */}
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 flex-shrink-0" style={{ color: 'oklch(0.78 0.12 75)' }} />
            <div>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: 'oklch(0.45 0.015 255)', fontFamily: 'Inter, sans-serif' }}>{labels.result}</p>
              <p className="text-xs font-semibold" style={{ color: 'oklch(0.78 0.12 75)', fontFamily: 'Inter, sans-serif' }}>{cs.result}</p>
            </div>
          </div>
        </div>

        {/* Testimonial quote */}
        <div
          className="relative rounded-2xl p-7 mb-12"
          style={{
            background: 'oklch(0.15 0.025 255)',
            border: '1px solid oklch(0.20 0.03 255)',
          }}
        >
          <div
            className="absolute top-0 left-10 right-10 h-px"
            style={{ background: 'linear-gradient(to right, transparent, oklch(0.78 0.12 75 / 0.5), transparent)' }}
          />
          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {Array.from({ length: item.rating }).map((_: unknown, i: number) => (
              <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="oklch(0.78 0.12 75)">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote
            className="text-base lg:text-lg font-light leading-relaxed italic text-balance"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: 'oklch(0.85 0.012 80)' }}
          >
            {'"'}{item.text}{'"'}
          </blockquote>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10">

          {/* Challenge */}
          <section>
            <h2
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: 'oklch(0.78 0.12 75)', fontFamily: 'Inter, sans-serif' }}
            >
              {labels.challenge}
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'oklch(0.70 0.012 255)', fontFamily: 'Inter, sans-serif' }}
            >
              {cs.challenge}
            </p>
          </section>

          <div className="h-px" style={{ background: 'oklch(0.18 0.025 255)' }} />

          {/* Solution */}
          <section>
            <h2
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: 'oklch(0.78 0.12 75)', fontFamily: 'Inter, sans-serif' }}
            >
              {labels.solution}
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'oklch(0.70 0.012 255)', fontFamily: 'Inter, sans-serif' }}
            >
              {cs.solution}
            </p>
          </section>

          <div className="h-px" style={{ background: 'oklch(0.18 0.025 255)' }} />

          {/* Outcomes */}
          <section>
            <h2
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
              style={{ color: 'oklch(0.78 0.12 75)', fontFamily: 'Inter, sans-serif' }}
            >
              {labels.outcomes}
            </h2>
            <ul className="flex flex-col gap-4">
              {cs.outcomes.map((outcome: string, i: number) => (
                <li key={i} className="flex items-start gap-3.5">
                  <CheckCircle2
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: 'oklch(0.78 0.12 75)' }}
                  />
                  <span
                    className="text-base leading-relaxed"
                    style={{ color: 'oklch(0.82 0.01 80)', fontFamily: 'Inter, sans-serif' }}
                  >
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* CTA back */}
        <div className="mt-16 pt-10 border-t" style={{ borderColor: 'oklch(0.18 0.025 255)' }}>
          <Link
            href={`/${lang}#testimonials`}
            className="inline-flex items-center gap-2 text-sm transition-opacity duration-200 hover:opacity-70"
            style={{ color: 'oklch(0.60 0.015 255)', fontFamily: 'Inter, sans-serif' }}
          >
            <ArrowLeft className="w-4 h-4" />
            {labels.back}
          </Link>
        </div>
      </div>
    </main>
  )
}
