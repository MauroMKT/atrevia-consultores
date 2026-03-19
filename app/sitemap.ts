import type { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/blog-registry'

const BASE_URL = 'https://www.atreviaconsultores.com'
const LANGS = ['es', 'en', 'it', 'fr', 'de']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Blog index pages (one per language)
  const blogIndexPages: MetadataRoute.Sitemap = LANGS.map(lang => ({
    url: `${BASE_URL}/${lang}/blog`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // All individual blog articles
  const blogArticles: MetadataRoute.Sitemap = getAllSlugs().map(({ lang, slug }) => ({
    url: `${BASE_URL}/${lang}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/servicios/marketing-branding`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/servicios/desarrollo-empresarial`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/servicios/inmuebles`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/servicios/diseno-interiores`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...blogIndexPages,
    ...blogArticles,
  ]
}
