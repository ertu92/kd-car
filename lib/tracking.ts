// Google-Ads-Conversion-Tracking. Alle Werte kommen aus NEXT_PUBLIC_*-Variablen,
// damit die Website ohne Ads-Konto weiterhin ohne Tracking läuft.

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? ''

export type ConversionType = 'lead' | 'call' | 'whatsapp'

const CONVERSION_LABELS: Record<ConversionType, string | undefined> = {
  lead: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL,
  call: process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL,
  whatsapp: process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL,
}

// Google-Ads-Ereignisnamen, falls keine Conversion-Labels gesetzt sind.
const EVENT_NAMES: Record<ConversionType, string> = {
  lead: 'generate_lead',
  call: 'phone_call',
  whatsapp: 'whatsapp_click',
}

export const CONSENT_STORAGE_KEY = 'cookieConsent'
export const CONSENT_EVENT = 'kdcar:cookie-consent'

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

export function hasMarketingConsent(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY) === 'accepted'
  } catch {
    return false
  }
}

export function trackConversion(type: ConversionType, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !window.gtag || !GOOGLE_ADS_ID) return

  const label = CONVERSION_LABELS[type]
  if (label) {
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${label}`,
      ...params,
    })
  }
  window.gtag('event', EVENT_NAMES[type], params)
}
