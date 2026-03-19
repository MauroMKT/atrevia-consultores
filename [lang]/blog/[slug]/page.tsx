import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react'
import { translations, type Language } from '@/lib/translations'
import { getPostBySlug, getAllPosts, getAllSlugs, SERVICE_LABELS } from '@/lib/blog-registry'
import type { ServiceSlug } from '@/lib/blog-types'

const BASE_URL = 'https://www.atreviaconsultores.com'

const LANG_LOCALE: Record<string, string> = {
  es: 'es_PE', en: 'en_US', it: 'it_IT', fr: 'fr_FR', de: 'de_DE',
}

function serviceColor(service: ServiceSlug): string {
  const map: Record<ServiceSlug, string> = {
    'marketing-branding-digital': 'oklch(0.78 0.12 75)',
    'desarrollo-empresarial': 'oklch(0.65 0.15 200)',
    'consultoria-inmobiliaria': 'oklch(0.70 0.14 145)',
    'diseno-de-interiores': 'oklch(0.72 0.14 30)',
  }
  return map[service] ?? 'oklch(0.78 0.12 75)'
}

export async function generateStaticParams() {
  return getAllSlugs().map(({ lang, slug }) => ({ lang, slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const post = getPostBySlug(lang, slug)
  if (!post) return {}

  const t = translations[lang as Language] ?? translations['es']
  const labels = SERVICE_LABELS[lang] ?? SERVICE_LABELS['es']
  const url = `${BASE_URL}/${lang}/blog/${slug}`
  const serviceLabel = labels[post.service]

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [serviceLabel, 'ATREVIA Consultores', post.title.split(' ').slice(0, 5).join(', ')],
    authors: [{ name: 'ATREVIA Consultores', url: BASE_URL }],
    alternates: {
      canonical: url,
      languages: {
        es: `${BASE_URL}/es/blog/${slug}`,
        en: `${BASE_URL}/en/blog/${slug}`,
        it: `${BASE_URL}/it/blog/${slug}`,
        fr: `${BASE_URL}/fr/blog/${slug}`,
        de: `${BASE_URL}/de/blog/${slug}`,
        'x-default': `${BASE_URL}/es/blog/${slug}`,
      },
    },
    openGraph: {
      title: `${post.title} | ATREVIA Consultores`,
      description: post.excerpt,
      url,
      type: 'article',
      locale: LANG_LOCALE[lang] ?? 'es_PE',
      siteName: 'ATREVIA Consultores',
      publishedTime: post.date,
      tags: [serviceLabel, 'ATREVIA Consultores'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    robots: { index: true, follow: true },
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const t = translations[lang as Language] ?? translations['es']
  const labels = SERVICE_LABELS[lang] ?? SERVICE_LABELS['es']

  const post = getPostBySlug(lang, slug)
  if (!post) notFound()

  const related = getAllPosts(lang)
    .filter(p => p.service === post.service && p.slug !== post.slug)
    .slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${BASE_URL}/${lang}/blog/${slug}`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: lang,
    url: `${BASE_URL}/${lang}/blog/${slug}`,
    author: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'ATREVIA Consultores',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'ATREVIA Consultores',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo.png`,
      },
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': `${BASE_URL}/${lang}/blog`,
      name: t.blog?.title ?? 'Blog ATREVIA Consultores',
      url: `${BASE_URL}/${lang}/blog`,
    },
    about: {
      '@type': 'Service',
      name: labels[post.service],
      provider: { '@id': `${BASE_URL}/#organization` },
    },
    articleBody: post.sections.map(s => `${s.heading}\n${s.body}`).join('\n\n'),
    wordCount: post.sections.reduce((acc, s) => acc + s.body.split(' ').length, 0),
    timeRequired: `PT${post.readingTime}M`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/${lang}/blog/${slug}`,
    },
  }

  const formattedDate = new Date(post.date).toLocaleDateString(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

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
        {/* Back link */}
        <div className="max-w-3xl mx-auto px-6 pt-10">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-opacity hover:opacity-60 mb-10"
            style={{ color: 'oklch(0.78 0.12 75)' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t.blog?.back ?? 'Volver al blog'}
          </Link>
        </div>

        <article className="max-w-3xl mx-auto px-6 pb-20">
          {/* Service tag */}
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
            style={{
              background: `${serviceColor(post.service)}18`,
              color: serviceColor(post.service),
              border: `1px solid ${serviceColor(post.service)}30`,
            }}
          >
            {labels[post.service]}
          </span>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight text-balance mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: 'oklch(0.96 0.02 80)' }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-6 mb-10 text-sm opacity-50">
            <time
              dateTime={post.date}
              className="flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </time>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime} min
            </span>
          </div>

          {/* Excerpt */}
          <p
            className="text-xl leading-relaxed mb-12 opacity-80"
            style={{
              borderLeft: `3px solid ${serviceColor(post.service)}`,
              paddingLeft: '1.25rem',
            }}
          >
            {post.excerpt}
          </p>

          {/* Sections */}
          <div className="flex flex-col gap-10">
            {post.sections.map((section, i) => (
              <section key={i}>
                <h2
                  className="text-xl font-bold mb-4"
                  style={{ fontFamily: "'Playfair Display', serif", color: 'oklch(0.96 0.02 80)' }}
                >
                  {section.heading}
                </h2>
                <p className="text-base leading-relaxed opacity-75">{section.body}</p>
              </section>
            ))}
          </div>

          <div className="my-16" style={{ borderTop: '1px solid oklch(0.20 0.03 255)' }} />

          {/* Related articles */}
          {related.length > 0 && (
            <nav aria-label={t.blog?.related ?? 'Artículos relacionados'}>
              <h3
                className="text-lg font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: 'oklch(0.96 0.02 80)' }}
              >
                {t.blog?.related ?? 'Artículos relacionados'}
              </h3>
              <div className="flex flex-col gap-4">
                {related.map(r => (
                  <Link
                    key={r.slug}
                    href={`/${lang}/blog/${r.slug}`}
                    className="flex items-start justify-between gap-4 p-4 rounded-xl transition-all duration-200 hover:opacity-80 group"
                    style={{
                      background: 'oklch(0.14 0.025 255)',
                      border: '1px solid oklch(0.20 0.03 255)',
                    }}
                  >
                    <div className="flex-1">
                      <p
                        className="text-sm font-semibold leading-snug mb-1 group-hover:opacity-70 transition-opacity"
                        style={{ fontFamily: "'Playfair Display', serif", color: 'oklch(0.96 0.02 80)' }}
                      >
                        {r.title}
                      </p>
                      <div className="flex items-center gap-1 text-xs opacity-40">
                        <Clock className="w-3 h-3" />
                        {r.readingTime} min
                      </div>
                    </div>
                    <ArrowLeft
                      className="w-4 h-4 rotate-180 shrink-0 mt-0.5 opacity-40 group-hover:opacity-70 transition-opacity"
                      style={{ color: 'oklch(0.78 0.12 75)' }}
                    />
                  </Link>
                ))}
              </div>
            </nav>
          )}

          {/* CTA */}
          <div
            className="mt-16 p-8 rounded-2xl text-center"
            style={{
              background: 'oklch(0.14 0.025 255)',
              border: '1px solid oklch(0.78 0.12 75 / 0.20)',
            }}
          >
            <BookOpen
              className="w-8 h-8 mx-auto mb-4"
              style={{ color: 'oklch(0.78 0.12 75)' }}
            />
            <h3
              className="text-lg font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif", color: 'oklch(0.96 0.02 80)' }}
            >
              {t.blog?.ctaTitle ?? '¿Te resultó útil este artículo?'}
            </h3>
            <p className="text-sm opacity-60 mb-6">
              {t.blog?.ctaSubtitle ?? 'Descubre cómo podemos ayudarte a implementar estas estrategias en tu negocio.'}
            </p>
            <Link
              href={`/${lang}/#contacto`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-80"
              style={{ background: 'oklch(0.78 0.12 75)', color: 'oklch(0.10 0.02 255)' }}
            >
              {t.contact?.form?.submit ?? 'Contactar'}
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}
