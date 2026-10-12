'use client'

import { useState } from 'react'
import { CheckCircle, Loader2, Send } from 'lucide-react'
import { trackConversion } from '@/lib/tracking'

const damageOptions = [
  'Kratzer / Lackschaden',
  'Stoßstange lackieren',
  'Einzelteil lackieren (Tür, Kotflügel, Haube)',
  'Komplettlackierung',
  'Unfallschaden',
  'Smart Repair',
  'Felgen lackieren',
  'Sonstiges',
]

export default function LackierungLeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: damageOptions[0],
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: `Lackierung – ${formData.service}`,
        }),
      })
      const data = await response.json()

      if (response.ok && data.success) {
        trackConversion('lead', { form: 'lackierung', service: formData.service })
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Senden fehlgeschlagen. Bitte rufen Sie uns an.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Senden fehlgeschlagen. Bitte prüfen Sie Ihre Verbindung oder rufen Sie uns an.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
        <CheckCircle className="mx-auto mb-4 h-14 w-14 text-green-500" />
        <h3 className="mb-2 text-xl font-display font-bold text-dark-900">Anfrage gesendet</h3>
        <p className="text-gray-600">
          Vielen Dank! Wir melden uns schnellstmöglich mit einem Angebot bei Ihnen – in der
          Regel noch am selben Werktag.
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-4 py-3 text-dark-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30'

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
      <h3 className="mb-1 text-xl font-display font-bold text-dark-900">
        Kostenloses Angebot anfordern
      </h3>
      <p className="mb-6 text-sm text-gray-600">
        Kurz beschreiben, wir melden uns mit einem Preis. Unverbindlich.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="lf-name" className="mb-1 block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            id="lf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Ihr Name"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="lf-phone" className="mb-1 block text-sm font-medium text-gray-700">
              Telefon *
            </label>
            <input
              id="lf-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="0176 ..."
            />
          </div>
          <div>
            <label htmlFor="lf-email" className="mb-1 block text-sm font-medium text-gray-700">
              E-Mail
            </label>
            <input
              id="lf-email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="optional"
            />
          </div>
        </div>

        <div>
          <label htmlFor="lf-service" className="mb-1 block text-sm font-medium text-gray-700">
            Was soll lackiert werden?
          </label>
          <select
            id="lf-service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={inputClass}
          >
            {damageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="lf-message" className="mb-1 block text-sm font-medium text-gray-700">
            Fahrzeug &amp; Schaden *
          </label>
          <textarea
            id="lf-message"
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className={inputClass}
            placeholder="z. B. VW Golf 7, Kratzer an der hinteren Stoßstange, ca. 20 cm"
          />
        </div>

        {status === 'error' && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex w-full items-center justify-center gap-2 text-base disabled:opacity-60 disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
          <span>{isSubmitting ? 'Wird gesendet …' : 'Angebot anfordern'}</span>
        </button>

        <p className="text-center text-xs text-gray-500">
          Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur Bearbeitung der
          Anfrage zu. Keine Weitergabe an Dritte.
        </p>
      </div>
    </form>
  )
}
