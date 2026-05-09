'use client'

import Link from 'next/link'
import { Phone, MessageCircle } from 'lucide-react'
import { formatPrice } from '@/lib/format'

interface MobileContactBarProps {
  price: number
  vat: boolean
  title: string
}

const PRIMARY_PHONE_TEL = '+4917662333406'
const WHATSAPP_NUMBER = '4917662333406'

export default function MobileContactBar({ price, vat, title }: MobileContactBarProps) {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hallo KD-CAR, ich interessiere mich für das Fahrzeug "${title}". Können Sie mir mehr Informationen geben?`
  )}`

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden"
      style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2">
        <div className="min-w-0 flex-shrink pr-1">
          <p className="text-[10px] uppercase tracking-wide text-dark-500">Preis</p>
          <p className="truncate text-base font-bold text-dark-900">{formatPrice(price)}</p>
          <p className="truncate text-[10px] text-dark-500">
            {vat ? 'inkl. MwSt.' : '§25a UStG'}
          </p>
        </div>

        <Link
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Anfrage"
          className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl bg-green-500 text-sm font-semibold text-white shadow-sm transition active:scale-95"
        >
          <MessageCircle className="h-5 w-5" />
          <span>WhatsApp</span>
        </Link>

        <Link
          href={`tel:${PRIMARY_PHONE_TEL}`}
          aria-label="Anrufen"
          className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary-600 text-sm font-semibold text-white shadow-sm transition active:scale-95"
        >
          <Phone className="h-5 w-5" />
          <span>Anrufen</span>
        </Link>
      </div>
    </div>
  )
}
