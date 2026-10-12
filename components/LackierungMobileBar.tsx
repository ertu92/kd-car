'use client'

import { MessageCircle, Phone } from 'lucide-react'

interface LackierungMobileBarProps {
  phoneTel: string
  whatsappLink: string
}

// Feste Leiste am unteren Rand (nur Mobil): Anrufen oder WhatsApp mit einem Tipp.
export default function LackierungMobileBar({ phoneTel, whatsappLink }: LackierungMobileBarProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden"
      style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl bg-green-500 text-sm font-semibold text-white shadow-sm transition active:scale-95"
        >
          <MessageCircle className="h-5 w-5" />
          <span>WhatsApp</span>
        </a>
        <a
          href={`tel:${phoneTel}`}
          className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary-600 text-sm font-semibold text-white shadow-sm transition active:scale-95"
        >
          <Phone className="h-5 w-5" />
          <span>Anrufen</span>
        </a>
      </div>
    </div>
  )
}
