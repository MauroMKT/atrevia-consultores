import type { Metadata } from 'next'
import { BookOpen } from 'lucide-react'
import { translations, type Language } from '@/lib/translations'
import { getAllPosts, SERVICE_LABELS } from '@/lib/blog-registry'
import BlogFilters from '@/components/BlogFilters'

const BASE_URL = 'https://www.atreviaconsultores.com'

const LANG_LOCALE: Record<string, string> = {
  es: 'es_PE', en: 'en_US', it: 'it_IT', fr: 'fr_FR', de: 'de_DE',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const t = translations[lang as Language] ?? translations['es']
  const title = t.blog?.title ?? 'Artículos y Recursos'
  const description = t.blog?.subtitle ?? 'Insights, estrategias y guías para hacer crecer tu negocio.'
  const url = `${BASE_URL}/${lang}/blog`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: `${BASE_URL}/es/blog`,
        en: `${BASE_URL}/en/blog`,
        it: `${BASE_URL}/it/blog`,
        fr: `${BASE_URL}/fr/blog`,
        de: `${BASE_URL}/de/blog`,
        'x-default': `${BASE_URL}/es/blog`,
      },
    },
    openGraph: {
      title: `${title} | ATREVIA Consultores`,
      description,
      url,
      type: 'website',
      locale: LANG_LOCALE[lang] ?? 'es_PE',
      siteName: 'ATREVIA Consultores',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ATREVIA Consultores`,
      description,
    },
    robots: { index: true, follow: true },
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const t = translations[lang as Language] ?? translations['es']
  const labels = SERVICE_LABELS[lang] ?? SERVICE_LABELS['es']
  const allPosts = getAllPosts(lang)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${BASE_URL}/${lang}/blog`,
    name: t.blog?.title ?? 'Artículos y Recursos',
    description: t.blog?.subtitle ?? 'Insights, estrategias y guías para hacer crecer tu negocio.',
    url: `${BASE_URL}/${lang}/blog`,
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'ATREVIA Consultores',
    },
    hasPart: allPosts.map(p => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${BASE_URL}/${lang}/blog/${p.slug}`,
      datePublished: p.date,
      description: p.excerpt,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main
        className="min-h-screen"
        style={{ background: 'oklch(0.10 0.02 255)', color: 'oklch(0.92 0.02 255)' }}
      >
        {/* Hero */}
        <section
          className="relative py-24 px-6 text-center overflow-hidden"
          style={{ borderBottom: '1px solid oklch(0.20 0.03 255)' }}
        >
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 50%, oklch(0.78 0.12 75), transparent 60%)',
            }}
          />
          <div className="relative max-w-3xl mx-auto">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{
                background: 'oklch(0.78 0.12 75 / 0.10)',
                border: '1px solid oklch(0.78 0.12 75 / 0.25)',
                color: 'oklch(0.78 0.12 75)',
              }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Blog
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: 'oklch(0.96 0.02 80)' }}
            >
              {t.blog?.title ?? 'Artículos y Recursos'}
            </h1>
            <p className="text-lg opacity-70 max-w-xl mx-auto leading-relaxed">
              {t.blog?.subtitle ?? 'Insights, estrategias y guías para hacer crecer tu negocio.'}
            </p>
          </div>
        </section>

        {/* Interactive filters + grid (client component) */}
        <BlogFilters
          lang={lang}
          allPosts={allPosts}
          labels={labels}
          uiAll={t.blog?.all ?? 'Todos'}
          uiSearch={t.blog?.search ?? 'Buscar artículos...'}
          uiReadMore={t.blog?.readMore ?? 'Leer más'}
          uiNoResults={t.blog?.noResults ?? 'No se encontraron artículos.'}
        />
      </main>
    </>
  )
}
