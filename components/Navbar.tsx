'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { translations, type Language } from '@/lib/translations'
import { Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const langLabels = { es: 'ES', en: 'EN', it: 'IT', fr: 'FR', de: 'DE' } as const
const langFlags  = { es: '🇪🇸', en: '🇺🇸', it: '🇮🇹', fr: '🇫🇷', de: '🇩🇪' } as const
const langFull   = { es: 'Español', en: 'English', it: 'Italiano', fr: 'Français', de: 'Deutsch' } as const

interface NavbarProps {
  lang: Language
}

export default function Navbar({ lang }: NavbarProps) {
  const t        = translations[lang].nav
  const services = (translations[lang] as any).services.items
  const pathname = usePathname()
  const router   = useRouter()
  const isHome   = pathname === `/${lang}` || pathname === '/'

  const serviceRoutes = [
    `/${lang}/servicios/marketing-branding`,
    `/${lang}/servicios/desarrollo-empresarial`,
    `/${lang}/servicios/inmuebles`,
    `/${lang}/servicios/diseno-interiores`,
  ]

  const [scrolled,            setScrolled]            = useState(false)
  const [menuOpen,            setMenuOpen]            = useState(false)
  const [langOpen,            setLangOpen]            = useState(false)
  const [servicesOpen,        setServicesOpen]        = useState(false)
  const [mobileServicesOpen,  setMobileServicesOpen]  = useState(false)

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handle)
    return () => window.removeEventListener('scroll', handle)
  }, [])

  const blogLabel: Record<string, string> = {
    es: 'Blog', en: 'Blog', it: 'Blog', fr: 'Blog', de: 'Blog',
  }

  const allNavLinks = [
    { label: t.home,     href: '#inicio',    langs: null, external: false },
    { label: t.about,    href: '#nosotros',  langs: null, external: false },
    { label: t.services, href: '#servicios', langs: null, external: false },
    { label: t.whyUs,    href: '#por-que',   langs: null, external: false },
    { label: t.faq,      href: '#faq',       langs: ['es','en','it','fr'] as string[], external: false },
    { label: blogLabel[lang], href: `/${lang}/blog`, langs: null, external: true },
    { label: t.contact,  href: '#contacto',  langs: null, external: false },
  ]

  // On inner pages, hide the "why us" link (section only exists on homepage)
  // Also hide FAQ link for DE (no FAQ section in German)
  const navLinks = (isHome
    ? allNavLinks
    : allNavLinks.filter(l => l.href !== '#por-que')
  ).filter(l => l.langs === null || l.langs.includes(lang))

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    if (isHome) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      const anchorId = href.replace('#', '')
      sessionStorage.setItem('scrollToSection', anchorId)
      router.push(`/${lang}`)
    }
  }

  const switchLang = (newLang: Language) => {
    setLangOpen(false)
    // Replace current lang segment in pathname with new lang
    const newPath = pathname.replace(/^\/[a-z]{2}(\/|$)/, `/${newLang}$1`)
    router.push(newPath !== pathname ? newPath : `/${newLang}`)
  }

  const LogoImage = () => (
    <Image
      src="/images/logo.png"
      alt="ATREVIA Consultores"
      width={160}
      height={48}
      className="h-10 w-auto object-contain"
      priority
    />
  )

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[oklch(0.12_0.025_255/0.97)] backdrop-blur-xl border-b border-[oklch(0.25_0.03_255)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        {isHome ? (
          <button onClick={() => scrollTo('#inicio')} aria-label="ATREVIA Consultores - Inicio" className="group">
            <LogoImage />
          </button>
        ) : (
          <Link href={`/${lang}`} aria-label="ATREVIA Consultores - Inicio" className="group">
            <LogoImage />
          </Link>
        )}

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            if (link.href === '#servicios') {
              return (
                <div key={link.href} className="relative flex items-center">
                  {/* Label — click scrolls to section */}
                  <button
                    onClick={() => { setServicesOpen(false); scrollTo(link.href) }}
                    className="nav-link text-sm tracking-widest uppercase text-[oklch(0.75_0.015_255)] hover:text-[oklch(0.78_0.12_75)] transition-colors duration-300 pb-1"
                    style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}
                  >
                    {link.label}
                  </button>
                  {/* Chevron — hover/click toggles dropdown */}
                  <button
                    onClick={() => setServicesOpen(v => !v)}
                    onMouseEnter={() => setServicesOpen(true)}
                    className="ml-1 pb-1 text-[oklch(0.55_0.015_255)] hover:text-[oklch(0.78_0.12_75)] transition-colors"
                    aria-label="Toggle services menu"
                  >
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {servicesOpen && (
                    <div
                      className="absolute left-0 top-full mt-3 w-72 rounded shadow-2xl overflow-hidden z-[9999]"
                      style={{ background: 'oklch(0.16 0.025 255)', border: '1px solid oklch(0.25 0.03 255)' }}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, oklch(0.78 0.12 75), transparent)' }} />
                      {services.map((s: { tag: string; title: string }, i: number) => (
                        <Link
                          key={i}
                          href={serviceRoutes[i]}
                          onClick={() => setServicesOpen(false)}
                          className="flex items-start gap-3 px-5 py-3.5 transition-colors duration-200 group hover:bg-[oklch(0.20_0.03_255)]"
                        >
                          <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'oklch(0.78 0.12 75 / 0.12)' }}>
                            <span className="text-xs" aria-hidden="true">{i === 0 ? '📣' : i === 1 ? '📈' : i === 2 ? '🏢' : '🛋️'}</span>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[oklch(0.78_0.12_75)] tracking-wider uppercase mb-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{s.tag}</p>
                            <p className="text-xs text-[oklch(0.55_0.015_255)] group-hover:text-[oklch(0.75_0.015_255)] leading-snug transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {s.title.length > 52 ? s.title.slice(0, 52) + '…' : s.title}
                            </p>
                          </div>
                        </Link>
                      ))}
                      <div className="px-5 py-3 border-t" style={{ borderColor: 'oklch(0.22 0.03 255)' }}>
                        <button
                          onClick={() => { scrollTo('#servicios'); setServicesOpen(false) }}
                          className="text-xs text-[oklch(0.78_0.12_75)] hover:text-[oklch(0.90_0.10_80)] transition-colors tracking-wider uppercase"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {lang === 'es' ? 'Ver todos los servicios →' :
                           lang === 'en' ? 'View all services →' :
                           lang === 'it' ? 'Vedi tutti i servizi →' :
                           lang === 'fr' ? 'Voir tous les services →' :
                           'Alle Dienstleistungen →'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            }
            if (link.external) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold tracking-widest uppercase transition-all duration-300 px-3 py-1.5 rounded"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.12em',
                    color: 'oklch(0.78 0.12 75)',
                    border: '1px solid oklch(0.78 0.12 75 / 0.4)',
                    background: 'oklch(0.78 0.12 75 / 0.07)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'oklch(0.78 0.12 75 / 0.18)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.78 0.12 75 / 0.8)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'oklch(0.78 0.12 75 / 0.07)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.78 0.12 75 / 0.4)'
                  }}
                >
                  {link.label}
                </Link>
              )
            }
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="nav-link text-sm tracking-widest uppercase text-[oklch(0.75_0.015_255)] hover:text-[oklch(0.78_0.12_75)] transition-colors duration-300 pb-1"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}
              >
                {link.label}
              </button>
            )
          })}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 text-sm text-[oklch(0.65_0.015_255)] hover:text-[oklch(0.78_0.12_75)] transition-colors duration-300 px-3 py-2 rounded border border-[oklch(0.25_0.03_255)] hover:border-[oklch(0.78_0.12_75)]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="text-base leading-none">{langFlags[lang]}</span>
              <span className="tracking-widest uppercase">{langLabels[lang]}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-[oklch(0.16_0.025_255)] border border-[oklch(0.25_0.03_255)] rounded shadow-2xl overflow-hidden z-[9999]">
                {(Object.keys(langFull) as (keyof typeof langFull)[]).map((l) => (
                  <button
                    key={l}
                    onClick={(e) => { e.stopPropagation(); switchLang(l) }}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors duration-200 ${
                      lang === l ? 'text-[oklch(0.78_0.12_75)] bg-[oklch(0.20_0.03_255)]' : 'text-[oklch(0.75_0.015_255)] hover:text-[oklch(0.95_0.01_80)] hover:bg-[oklch(0.20_0.03_255)]'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <span className="text-base leading-none">{langFlags[l]}</span>
                    <span className="text-xs font-bold tracking-widest uppercase">{langLabels[l]}</span>
                    <span>{langFull[l]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollTo('#contacto')}
            className="px-6 py-2.5 text-sm bg-[oklch(0.78_0.12_75)] text-[oklch(0.12_0.025_255)] font-semibold tracking-wider uppercase rounded hover:bg-[oklch(0.85_0.10_80)] transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em' }}
          >
            {t.cta}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-xs text-[oklch(0.65_0.015_255)] hover:text-[oklch(0.78_0.12_75)] px-2 py-1.5 rounded border border-[oklch(0.25_0.03_255)]"
            >
              <span className="text-sm leading-none">{langFlags[lang]}</span>
              <span className="tracking-widest uppercase">{langLabels[lang]}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-[oklch(0.16_0.025_255)] border border-[oklch(0.25_0.03_255)] rounded shadow-2xl overflow-hidden z-[9999]">
                {(Object.keys(langFull) as (keyof typeof langFull)[]).map((l) => (
                  <button
                    key={l}
                    onClick={(e) => { e.stopPropagation(); switchLang(l) }}
                    className={`w-full text-left px-3 py-2.5 text-xs flex items-center gap-2.5 transition-colors ${
                      lang === l ? 'text-[oklch(0.78_0.12_75)] bg-[oklch(0.20_0.03_255)]' : 'text-[oklch(0.75_0.015_255)]'
                    }`}
                  >
                    <span className="text-sm leading-none">{langFlags[l]}</span>
                    <span className="font-bold uppercase">{langLabels[l]}</span>
                    <span>{langFull[l]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-[oklch(0.95_0.01_80)] p-2" aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[oklch(0.12_0.025_255/0.98)] backdrop-blur-xl border-t border-[oklch(0.25_0.03_255)] px-6 py-6 flex flex-col gap-2">
          {navLinks.map((link) => {
            if (link.href === '#servicios') {
              return (
                <div key={link.href}>
                  <button
                    onClick={() => { setMobileServicesOpen(!mobileServicesOpen); scrollTo(link.href) }}
                    className="w-full flex items-center justify-between text-left text-sm tracking-widest uppercase text-[oklch(0.75_0.015_255)] hover:text-[oklch(0.78_0.12_75)] transition-colors py-2.5 border-b border-[oklch(0.20_0.03_255)]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {link.label}
                    <ChevronDown className={`w-3 h-3 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="mt-1 ml-2 flex flex-col gap-1 mb-2">
                      {services.map((s: { tag: string; title: string }, i: number) => (
                        <Link
                          key={i}
                          href={serviceRoutes[i]}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded transition-colors hover:bg-[oklch(0.18_0.025_255)]"
                          style={{ border: '1px solid oklch(0.20 0.03 255)' }}
                        >
                          <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'oklch(0.78 0.12 75 / 0.12)' }}>
                            <span className="text-xs" aria-hidden="true">{i === 0 ? '📣' : i === 1 ? '📈' : i === 2 ? '🏢' : '🛋️'}</span>
                          </div>
                          <p className="text-xs font-semibold text-[oklch(0.78_0.12_75)] tracking-wider uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>{s.tag}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            if (link.external) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-left text-sm tracking-widest uppercase text-[oklch(0.75_0.015_255)] hover:text-[oklch(0.78_0.12_75)] transition-colors py-2.5 border-b border-[oklch(0.20_0.03_255)]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {link.label}
                </Link>
              )
            }
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left text-sm tracking-widest uppercase text-[oklch(0.75_0.015_255)] hover:text-[oklch(0.78_0.12_75)] transition-colors py-2.5 border-b border-[oklch(0.20_0.03_255)]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {link.label}
              </button>
            )
          })}
          <button
            onClick={() => scrollTo('#contacto')}
            className="mt-3 px-6 py-3 text-sm bg-[oklch(0.78_0.12_75)] text-[oklch(0.12_0.025_255)] font-semibold tracking-wider uppercase rounded text-center"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t.cta}
          </button>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(langOpen || servicesOpen) && (
        <div className="fixed inset-0 z-[9998]" onClick={() => { setLangOpen(false); setServicesOpen(false) }} />
      )}
    </header>
  )
}
