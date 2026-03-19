'use client'

import { useEffect, lazy, Suspense } from 'react'
import { type Language, translations } from '@/lib/translations'
import Navbar from '@/components/Navbar'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import Hero from '@/components/Hero'
import MarqueeBanner from '@/components/MarqueeBanner'

const About      = lazy(() => import('@/components/About'))
const USP        = lazy(() => import('@/components/USP'))
const Services   = lazy(() => import('@/components/Services'))
const WhyUs      = lazy(() => import('@/components/WhyUs'))
const Testimonials = lazy(() => import('@/components/Testimonials'))
const FAQ        = lazy(() => import('@/components/FAQ'))
const Contact    = lazy(() => import('@/components/Contact'))
const Footer     = lazy(() => import('@/components/Footer'))

interface Props {
  lang: Language
}

export default function HomePageClient({ lang }: Props) {
  useEffect(() => {
    const section = sessionStorage.getItem('scrollToSection')
    if (section) {
      sessionStorage.removeItem('scrollToSection')
      setTimeout(() => {
        const el = document.getElementById(section)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }, [])

  return (
    <main className="min-h-screen" style={{ background: 'oklch(0.12 0.025 255)' }}>
      <Navbar lang={lang} />
      <Hero lang={lang} />
      <MarqueeBanner lang={lang} />
      <Suspense fallback={null}>
        <About lang={lang} />
        <USP lang={lang} />
        <Services lang={lang} />
        <WhyUs lang={lang} />
        <Testimonials lang={lang} />
        <FAQ lang={lang} />
        <Contact lang={lang} />
        <Footer lang={lang} />
      </Suspense>
      <FloatingWhatsApp message={translations[lang].contact.whatsappMsg} />
    </main>
  )
}
