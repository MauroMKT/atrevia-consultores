import type { BlogPost, ServiceSlug } from '@/lib/blog-types'
export { SERVICE_LABELS } from '@/lib/blog-types'

import { posts as esMarketing } from './blog/es-marketing'
import { posts as esEmpresarial } from './blog/es-empresarial'
import { posts as esInmobiliaria } from './blog/es-inmobiliaria'
import { posts as esInteriores } from './blog/es-interiores'

import { posts as enMarketing } from './blog/en-marketing'
import { posts as enEmpresarial } from './blog/en-empresarial'
import { posts as enInmobiliaria } from './blog/en-inmobiliaria'
import { posts as enInteriores } from './blog/en-interiores'

import { posts as itMarketing } from './blog/it-marketing'
import { posts as itEmpresarial } from './blog/it-empresarial'
import { posts as itInmobiliaria } from './blog/it-inmobiliaria'
import { posts as itInteriores } from './blog/it-interiores'

import { posts as frMarketing } from './blog/fr-marketing'
import { posts as frEmpresarial } from './blog/fr-empresarial'
import { posts as frInmobiliaria } from './blog/fr-inmobiliaria'
import { posts as frInteriores } from './blog/fr-interiores'

import { posts as deMarketing } from './blog/de-marketing'
import { posts as deEmpresarial } from './blog/de-empresarial'
import { posts as deInmobiliaria } from './blog/de-inmobiliaria'
import { posts as deInteriores } from './blog/de-interiores'

const ALL: Record<string, BlogPost[]> = {
  es: [...esMarketing, ...esEmpresarial, ...esInmobiliaria, ...esInteriores],
  en: [...enMarketing, ...enEmpresarial, ...enInmobiliaria, ...enInteriores],
  it: [...itMarketing, ...itEmpresarial, ...itInmobiliaria, ...itInteriores],
  fr: [...frMarketing, ...frEmpresarial, ...frInmobiliaria, ...frInteriores],
  de: [...deMarketing, ...deEmpresarial, ...deInmobiliaria, ...deInteriores],
}

export function getAllPosts(lang: string): BlogPost[] {
  return ALL[lang] ?? ALL['es']
}

export function getPostsByService(lang: string, service: ServiceSlug): BlogPost[] {
  return getAllPosts(lang).filter(p => p.service === service)
}

export function getPostBySlug(lang: string, slug: string): BlogPost | undefined {
  return getAllPosts(lang).find(p => p.slug === slug)
}

export function getAllSlugs(): { lang: string; slug: string }[] {
  const result: { lang: string; slug: string }[] = []
  for (const lang of Object.keys(ALL)) {
    for (const post of ALL[lang]) {
      result.push({ lang, slug: post.slug })
    }
  }
  return result
}
