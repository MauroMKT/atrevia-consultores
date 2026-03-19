'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { BlogPost, ServiceSlug } from '@/lib/blog-types'
import { ArrowRight, BookOpen, Clock, Search } from 'lucide-react'

const SERVICES: ServiceSlug[] = [
  'marketing-branding-digital',
  'desarrollo-empresarial',
  'consultoria-inmobiliaria',
  'diseno-de-interiores',
]

function serviceColor(service: ServiceSlug): string {
  const map: Record<ServiceSlug, string> = {
    'marketing-branding-digital': 'oklch(0.78 0.12 75)',
    'desarrollo-empresarial': 'oklch(0.65 0.15 200)',
    'consultoria-inmobiliaria': 'oklch(0.70 0.14 145)',
    'diseno-de-interiores': 'oklch(0.72 0.14 30)',
  }
  return map[service] ?? 'oklch(0.78 0.12 75)'
}

interface Props {
  lang: string
  allPosts: BlogPost[]
  labels: Record<ServiceSlug, string>
  uiAll: string
  uiSearch: string
  uiReadMore: string
  uiNoResults: string
}

export default function BlogFilters({
  lang,
  allPosts,
  labels,
  uiAll,
  uiSearch,
  uiReadMore,
  uiNoResults,
}: Props) {
  const [activeService, setActiveService] = useState<ServiceSlug | 'all'>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    let posts = activeService === 'all'
      ? allPosts
      : allPosts.filter(p => p.service === activeService)
    if (query.trim()) {
      const q = query.toLowerCase()
      posts = posts.filter(
        p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      )
    }
    return posts
  }, [allPosts, activeService, query])

  return (
    <>
      {/* Filters + Search bar */}
      <div
        className="sticky top-0 z-20 py-4 px-6"
        style={{
          background: 'oklch(0.12 0.025 255 / 0.95)',
          borderBottom: '1px solid oklch(0.20 0.03 255)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveService('all')}
              className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200"
              style={
                activeService === 'all'
                  ? { background: 'oklch(0.78 0.12 75)', color: 'oklch(0.10 0.02 255)' }
                  : { background: 'oklch(0.18 0.03 255)', border: '1px solid oklch(0.25 0.04 255)', color: 'oklch(0.70 0.03 255)' }
              }
            >
              {uiAll}
            </button>
            {SERVICES.map(s => (
              <button
                key={s}
                onClick={() => setActiveService(s)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200"
                style={
                  activeService === s
                    ? { background: 'oklch(0.78 0.12 75)', color: 'oklch(0.10 0.02 255)' }
                    : { background: 'oklch(0.18 0.03 255)', border: '1px solid oklch(0.25 0.04 255)', color: 'oklch(0.70 0.03 255)' }
                }
              >
                {labels[s]}
              </button>
            ))}
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full w-full md:w-64"
            style={{ background: 'oklch(0.18 0.03 255)', border: '1px solid oklch(0.25 0.04 255)' }}
          >
            <Search className="w-3.5 h-3.5 opacity-50 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={uiSearch}
              className="bg-transparent text-sm outline-none w-full placeholder:opacity-40"
              style={{ color: 'oklch(0.92 0.02 255)' }}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-24 opacity-50">
            <BookOpen className="w-12 h-12 mx-auto mb-4" />
            <p>{uiNoResults}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <Link
                key={post.slug}
                href={`/${lang}/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'oklch(0.14 0.025 255)', border: '1px solid oklch(0.20 0.03 255)' }}
              >
                <div className="h-1 w-full" style={{ background: serviceColor(post.service) }} />
                <div className="flex flex-col flex-1 p-6 gap-4">
                  <span
                    className="self-start text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{
                      background: `${serviceColor(post.service)}18`,
                      color: serviceColor(post.service),
                      border: `1px solid ${serviceColor(post.service)}30`,
                    }}
                  >
                    {labels[post.service]}
                  </span>
                  <h2
                    className="text-base font-bold leading-snug text-balance group-hover:opacity-80 transition-opacity"
                    style={{ fontFamily: "'Playfair Display', serif", color: 'oklch(0.96 0.02 80)' }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed opacity-60 line-clamp-3">{post.excerpt}</p>
                  <div
                    className="flex items-center justify-between mt-auto pt-4"
                    style={{ borderTop: '1px solid oklch(0.20 0.03 255)' }}
                  >
                    <div className="flex items-center gap-1.5 text-xs opacity-50">
                      <Clock className="w-3 h-3" />
                      <span>{post.readingTime} min</span>
                    </div>
                    <span
                      className="flex items-center gap-1 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
                      style={{ color: 'oklch(0.78 0.12 75)' }}
                    >
                      {uiReadMore}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
