export type ServiceSlug =
  | 'marketing-branding-digital'
  | 'desarrollo-empresarial'
  | 'consultoria-inmobiliaria'
  | 'diseno-de-interiores'

export interface BlogPost {
  slug: string
  service: ServiceSlug
  title: string
  excerpt: string
  date: string
  readingTime: number
  sections: { heading: string; body: string }[]
}

export const SERVICE_LABELS: Record<string, Record<ServiceSlug, string>> = {
  es: {
    'marketing-branding-digital': 'Marketing & Branding Digital',
    'desarrollo-empresarial': 'Desarrollo Empresarial',
    'consultoria-inmobiliaria': 'Consultoría Inmobiliaria',
    'diseno-de-interiores': 'Diseño de Interiores',
  },
  en: {
    'marketing-branding-digital': 'Marketing & Digital Branding',
    'desarrollo-empresarial': 'Business Development',
    'consultoria-inmobiliaria': 'Real Estate Consulting',
    'diseno-de-interiores': 'Interior Design',
  },
  it: {
    'marketing-branding-digital': 'Marketing & Branding Digitale',
    'desarrollo-empresarial': 'Sviluppo Aziendale',
    'consultoria-inmobiliaria': 'Consulenza Immobiliare',
    'diseno-de-interiores': "Design d'Interni",
  },
  fr: {
    'marketing-branding-digital': 'Marketing & Branding Digital',
    'desarrollo-empresarial': 'Développement Commercial',
    'consultoria-inmobiliaria': 'Conseil Immobilier',
    'diseno-de-interiores': "Design d'Intérieur",
  },
  de: {
    'marketing-branding-digital': 'Marketing & Digital Branding',
    'desarrollo-empresarial': 'Unternehmensentwicklung',
    'consultoria-inmobiliaria': 'Immobilienberatung',
    'diseno-de-interiores': 'Innenarchitektur',
  },
}
