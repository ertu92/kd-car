'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import {
  CONSENT_EVENT,
  GOOGLE_ADS_ID,
  hasMarketingConsent,
  trackConversion,
} from '@/lib/tracking'

// Lädt das Google-Ads-Tag (gtag.js) mit Consent Mode v2: Standard ist
// "denied", erst nach "Alle akzeptieren" im Cookie-Banner wird auf "granted"
// umgeschaltet. Zusätzlich werden Klicks auf tel:- und WhatsApp-Links auf
// allen Seiten als Conversions gemeldet.

export default function GoogleAdsTag() {
  const pathname = usePathname()

  useEffect(() => {
    if (!GOOGLE_ADS_ID) return

    const applyConsent = () => {
      if (!window.gtag) return
      const granted = hasMarketingConsent() ? 'granted' : 'denied'
      window.gtag('consent', 'update', {
        ad_storage: granted,
        ad_user_data: granted,
        ad_personalization: granted,
        analytics_storage: granted,
      })
    }

    applyConsent()
    window.addEventListener(CONSENT_EVENT, applyConsent)
    return () => window.removeEventListener(CONSENT_EVENT, applyConsent)
  }, [])

  useEffect(() => {
    if (!GOOGLE_ADS_ID) return

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a[href]') as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute('href') ?? ''
      if (href.startsWith('tel:')) {
        trackConversion('call', { page_path: pathname })
      } else if (href.includes('wa.me/') || href.includes('whatsapp.com')) {
        trackConversion('whatsapp', { page_path: pathname })
      }
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname])

  if (!GOOGLE_ADS_ID) return null

  return (
    <>
      <Script id="google-ads-consent" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}', { allow_enhanced_conversions: true });
        `}
      </Script>
      <Script
        id="google-ads-gtag"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
      />
    </>
  )
}
