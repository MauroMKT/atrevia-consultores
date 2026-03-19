'use client'

import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to every element with class `.reveal`
 * inside the given container. When visible, `.is-visible` is added.
 * Works with the CSS defined in globals.css:
 *   .reveal { opacity: 0; transform: translateY(24px); transition: ... }
 *   .reveal.is-visible { opacity: 1; transform: translateY(0); }
 */
export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const elements = container.querySelectorAll<HTMLElement>('.reveal')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target) // fire once
          }
        })
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
