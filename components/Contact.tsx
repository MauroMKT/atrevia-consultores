'use client'

import { useState } from 'react'
import { translations, type Language } from '@/lib/translations'
import { Send, MessageCircle, Clock, Languages, ChevronDown, CheckCircle2, AlertCircle, Check } from 'lucide-react'

interface ContactProps {
  lang: Language
}

interface FormState {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

type FieldErrors = Partial<Record<keyof FormState, string>>
type TouchedFields = Partial<Record<keyof FormState, boolean>>
type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_MESSAGE = 500

export default function Contact({ lang }: ContactProps) {
  const t = translations[lang].contact
  const f = t.form
  const v = f.validation

  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', service: '', message: '',
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')

  // ── Validation ──────────────────────────────────────────────────
  const validate = (data: FormState): FieldErrors => {
    const e: FieldErrors = {}
    if (!data.name.trim()) e.name = v.nameRequired
    else if (data.name.trim().length < 2) e.name = v.nameMin
    if (!data.email.trim()) e.email = v.emailRequired
    else if (!EMAIL_RE.test(data.email.trim())) e.email = v.emailInvalid
    if (!data.message.trim()) e.message = v.messageRequired
    else if (data.message.trim().length < 10) e.message = v.messageMin
    else if (data.message.trim().length > MAX_MESSAGE) e.message = v.messageMax
    return e
  }

  const validateField = (name: keyof FormState, value: string) => {
    const draft = { ...form, [name]: value }
    const all = validate(draft)
    setErrors(prev => ({ ...prev, [name]: all[name] }))
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (touched[name as keyof FormState]) {
      validateField(name as keyof FormState, value)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    validateField(name as keyof FormState, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Touch all fields to show all errors
    setTouched({ name: true, email: true, phone: true, service: true, message: true })
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
      setTouched({})
      setErrors({})
      setTimeout(() => setStatus('idle'), 7000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const openWhatsApp = () => {
    const phone = '51964243686'
    const msg = encodeURIComponent(t.whatsappMsg)
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  // ── Field style helpers ──────────────────────────────────────────
  const fieldState = (name: keyof FormState) => {
    if (!touched[name]) return 'idle'
    if (errors[name]) return 'error'
    if (name === 'name' && form.name.trim().length >= 2) return 'valid'
    if (name === 'email' && EMAIL_RE.test(form.email.trim())) return 'valid'
    if (name === 'message' && form.message.trim().length >= 10 && form.message.trim().length <= MAX_MESSAGE) return 'valid'
    if (name === 'phone' || name === 'service') return 'valid'
    return 'idle'
  }

  const inputBorder = (name: keyof FormState) => {
    const s = fieldState(name)
    if (s === 'error') return '1px solid oklch(0.65 0.20 25)'
    if (s === 'valid') return '1px solid oklch(0.65 0.18 145)'
    return '1px solid oklch(0.28 0.03 255)'
  }

  const inputBg = 'oklch(0.20 0.03 255)'
  const inputBase = 'w-full px-4 py-3 rounded text-sm text-[oklch(0.90_0.01_80)] placeholder-[oklch(0.38_0.015_255)] outline-none transition-all duration-200 focus:ring-2'

  const focusRing = (name: keyof FormState) => {
    const s = fieldState(name)
    if (s === 'error') return 'focus:ring-[oklch(0.65_0.20_25_/_0.25)]'
    return 'focus:ring-[oklch(0.78_0.12_75_/_0.20)]'
  }

  return (
    <section
      id="contacto"
      className="py-32 relative overflow-hidden"
      style={{ background: 'oklch(0.12 0.025 255)' }}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, oklch(0.78 0.12 75), transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="w-12 h-px bg-[oklch(0.78_0.12_75)]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[oklch(0.78_0.12_75)]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {t.badge}
            </span>
            <div className="w-12 h-px bg-[oklch(0.78_0.12_75)]" />
          </div>
          <h2
            className="text-4xl lg:text-6xl font-light text-[oklch(0.95_0.01_80)] mb-6 text-balance"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            {t.title}
          </h2>
          <p
            className="text-base text-[oklch(0.60_0.015_255)] leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* ── Left info column ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div
              className="relative w-full h-52 rounded overflow-hidden flex-shrink-0"
              style={{ border: '1px solid oklch(0.22 0.03 255)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=900&q=80&fit=crop"
                alt="Miraflores Lima Peru sede principal ATREVIA Consultores"
                className="w-full h-full object-cover opacity-70"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, oklch(0.12 0.025 255 / 0.8) 0%, transparent 50%)' }}
              />
              <div className="absolute bottom-4 left-5">
                <p className="text-xs tracking-[0.25em] uppercase text-[oklch(0.78_0.12_75)]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Lima, Perú
                </p>
                <p className="text-xs text-[oklch(0.60_0.015_255)] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Sede principal
                </p>
              </div>
            </div>

            <div
              className="p-7 rounded"
              style={{ background: 'oklch(0.16 0.025 255)', border: '1px solid oklch(0.22 0.03 255)' }}
            >
              <h3
                className="text-xl font-light text-[oklch(0.95_0.01_80)] mb-7"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                {t.info.title}
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'oklch(0.78 0.12 75 / 0.1)', border: '1px solid oklch(0.78 0.12 75 / 0.3)' }}
                  >
                    <Clock className="w-4 h-4 text-[oklch(0.78_0.12_75)]" />
                  </div>
                  <p className="text-sm text-[oklch(0.65_0.015_255)] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {t.info.response}
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'oklch(0.78 0.12 75 / 0.1)', border: '1px solid oklch(0.78 0.12 75 / 0.3)' }}
                  >
                    <Languages className="w-4 h-4 text-[oklch(0.78_0.12_75)]" />
                  </div>
                  <p className="text-sm text-[oklch(0.65_0.015_255)] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {t.info.languages}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={openWhatsApp}
              className="group flex items-center justify-center gap-3 py-4 px-6 rounded transition-all duration-300 hover:-translate-y-1 hover:shadow-xl w-full cursor-pointer"
              style={{
                background: 'oklch(0.25 0.09 145 / 0.2)',
                border: '1px solid oklch(0.50 0.12 145 / 0.5)',
              }}
            >
              <div
                className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
                style={{ background: 'oklch(0.45 0.12 145 / 0.25)' }}
              >
                <MessageCircle className="w-5 h-5 text-[oklch(0.68_0.15_145)]" />
              </div>
              <span
                className="text-sm font-semibold text-[oklch(0.68_0.15_145)] group-hover:text-[oklch(0.78_0.15_145)] transition-colors"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em' }}
              >
                {t.whatsapp}
              </span>
            </button>
          </div>

          {/* ── Right form column ── */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-8 lg:p-12 rounded"
              style={{ background: 'oklch(0.16 0.025 255)', border: '1px solid oklch(0.22 0.03 255)' }}
            >

              {/* Success banner */}
              {status === 'success' && (
                <div
                  className="flex items-start gap-3 mb-8 p-4 rounded"
                  style={{ background: 'oklch(0.45 0.12 145 / 0.12)', border: '1px solid oklch(0.55 0.15 145 / 0.4)' }}
                >
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-[oklch(0.65_0.18_145)]" />
                  <p className="text-sm text-[oklch(0.75_0.10_145)] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {f.success}
                  </p>
                </div>
              )}

              {/* Error banner */}
              {status === 'error' && (
                <div
                  className="flex items-start gap-3 mb-8 p-4 rounded"
                  style={{ background: 'oklch(0.65 0.20 25 / 0.10)', border: '1px solid oklch(0.65 0.20 25 / 0.35)' }}
                >
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-[oklch(0.72_0.18_25)]" />
                  <p className="text-sm text-[oklch(0.72_0.18_25)] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {f.error}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

                {/* Name */}
                <FieldWrapper label={f.name} error={touched.name ? errors.name : undefined} state={fieldState('name')}>
                  <input
                    name="name" type="text"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={f.placeholder.name}
                    className={`${inputBase} ${focusRing('name')}`}
                    style={{ background: inputBg, border: inputBorder('name'), fontFamily: 'Inter, sans-serif' }}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'err-name' : undefined}
                  />
                </FieldWrapper>

                {/* Email */}
                <FieldWrapper label={f.email} error={touched.email ? errors.email : undefined} state={fieldState('email')}>
                  <input
                    name="email" type="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={f.placeholder.email}
                    className={`${inputBase} ${focusRing('email')}`}
                    style={{ background: inputBg, border: inputBorder('email'), fontFamily: 'Inter, sans-serif' }}
                    aria-invalid={!!errors.email}
                  />
                </FieldWrapper>

                {/* Phone */}
                <FieldWrapper label={f.phone} state={fieldState('phone')}>
                  <input
                    name="phone" type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={f.placeholder.phone}
                    className={`${inputBase} ${focusRing('phone')}`}
                    style={{ background: inputBg, border: inputBorder('phone'), fontFamily: 'Inter, sans-serif' }}
                  />
                </FieldWrapper>

                {/* Service */}
                <FieldWrapper label={f.service} state={fieldState('service')}>
                  <div className="relative">
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputBase} appearance-none cursor-pointer ${focusRing('service')}`}
                      style={{ background: inputBg, border: inputBorder('service'), fontFamily: 'Inter, sans-serif' }}
                    >
                      <option value="" style={{ background: 'oklch(0.20 0.03 255)' }}>—</option>
                      {f.services.map((s: string, i: number) => (
                        <option key={i} value={s} style={{ background: 'oklch(0.20 0.03 255)' }}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-[oklch(0.55_0.015_255)]" />
                  </div>
                </FieldWrapper>

              </div>

              {/* Message */}
              <FieldWrapper
                label={f.message}
                error={touched.message ? errors.message : undefined}
                state={fieldState('message')}
                extra={
                  <span
                    className="text-xs tabular-nums"
                    style={{ color: form.message.length > MAX_MESSAGE ? 'oklch(0.65 0.20 25)' : 'oklch(0.42 0.015 255)', fontFamily: 'Inter, sans-serif' }}
                  >
                    {form.message.length}/{MAX_MESSAGE}
                  </span>
                }
              >
                <textarea
                  name="message" rows={5}
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={f.placeholder.message}
                  className={`${inputBase} resize-none ${focusRing('message')}`}
                  style={{ background: inputBg, border: inputBorder('message'), fontFamily: 'Inter, sans-serif' }}
                  aria-invalid={!!errors.message}
                />
              </FieldWrapper>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded font-semibold tracking-wider transition-all duration-300 disabled:opacity-70 hover:brightness-110 active:scale-[0.99]"
                  style={{
                    background: status === 'success' ? 'oklch(0.55 0.14 145)' : 'oklch(0.78 0.12 75)',
                    color: 'oklch(0.12 0.025 255)',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.08em',
                    fontSize: '0.8125rem',
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      {f.sending}
                    </>
                  ) : status === 'success' ? (
                    <>
                      <Check className="w-4 h-4" />
                      {f.success.split('.')[0]}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {f.submit}
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>

      {/* ── Full-width quote banner ── */}
      <div
        className="relative mt-24 w-full overflow-hidden"
        style={{
          background: 'oklch(0.09 0.022 255)',
          borderTop: '1px solid oklch(0.25 0.03 255)',
          borderBottom: '1px solid oklch(0.25 0.03 255)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.78 0.12 75 / 0.07), transparent)' }}
        />
        <div
          className="absolute top-0 inset-x-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, oklch(0.78 0.12 75 / 0.8) 40%, oklch(0.78 0.12 75) 50%, oklch(0.78 0.12 75 / 0.8) 60%, transparent)' }}
        />
        <div
          className="absolute bottom-0 inset-x-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, oklch(0.78 0.12 75 / 0.8) 40%, oklch(0.78 0.12 75) 50%, oklch(0.78 0.12 75 / 0.8) 60%, transparent)' }}
        />
        <div className="w-full px-6 lg:px-16 py-24 text-center">
          <div
            aria-hidden="true"
            className="text-[12rem] leading-[0.7] select-none opacity-[0.07] text-[oklch(0.78_0.12_75)] mb-0"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            &ldquo;
          </div>
          <blockquote className="relative z-10">
            <p
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.15]"
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(95deg, oklch(0.93 0.01 80) 0%, oklch(0.90 0.10 82) 50%, oklch(0.93 0.01 80) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t.quote}
            </p>
            <footer className="mt-10 flex flex-col items-center gap-3">
              <div
                className="w-16 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, oklch(0.78 0.12 75), transparent)' }}
              />
              <p
                className="text-xs tracking-[0.4em] uppercase text-[oklch(0.78_0.12_75)]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                ATREVIA Consultores
              </p>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

// ── FieldWrapper sub-component ─────────────────────────────────────
function FieldWrapper({
  label,
  error,
  state,
  extra,
  children,
}: {
  label: string
  error?: string
  state: 'idle' | 'valid' | 'error'
  extra?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label
          className="text-xs tracking-wider uppercase"
          style={{
            fontFamily: 'Inter, sans-serif',
            color: state === 'error'
              ? 'oklch(0.72 0.18 25)'
              : state === 'valid'
              ? 'oklch(0.65 0.18 145)'
              : 'oklch(0.55 0.015 255)',
          }}
        >
          {label}
        </label>
        <div className="flex items-center gap-2">
          {extra}
          {state === 'valid' && (
            <span className="flex items-center justify-center w-4 h-4 rounded-full" style={{ background: 'oklch(0.55 0.15 145 / 0.2)' }}>
              <Check className="w-2.5 h-2.5 text-[oklch(0.65_0.18_145)]" />
            </span>
          )}
        </div>
      </div>
      {children}
      {error && (
        <p
          role="alert"
          className="flex items-center gap-1.5 text-xs leading-snug"
          style={{ color: 'oklch(0.72 0.18 25)', fontFamily: 'Inter, sans-serif' }}
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
