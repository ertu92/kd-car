'use client'

import Link from 'next/link'
import { Phone, MessageCircle, Mail, BadgeCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatPrice } from '@/lib/format'

interface CarPriceCardProps {
  price: number
  netPrice?: number
  vat: boolean
  priceType?: string
  warranty?: boolean
  warrantyMonths?: number
  title: string
}

const PRIMARY_PHONE_TEL = '+4917662333406'
const PRIMARY_PHONE_DISPLAY = '0176 62333406'
const SECONDARY_PHONE_TEL = '+491773225218'
const SECONDARY_PHONE_DISPLAY = '0177 3225218'
const WHATSAPP_NUMBER = '4917662333406'
const CONTACT_EMAIL = 'info@kd-car.de'

export default function CarPriceCard({
  price,
  netPrice,
  vat,
  priceType,
  warranty,
  warrantyMonths,
  title,
}: CarPriceCardProps) {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hallo KD-CAR, ich interessiere mich für das Fahrzeug "${title}". Können Sie mir mehr Informationen geben?`
  )}`
  const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Anfrage zu "${title}"`
  )}&body=${encodeURIComponent(
    `Guten Tag,\n\nich interessiere mich für das Fahrzeug "${title}" und bitte um weitere Informationen.\n\nVielen Dank.`
  )}`

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="lg:sticky lg:top-28"
    >
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="border-b border-gray-100 bg-gradient-to-br from-primary-50 to-white p-6">
          <p className="text-xs uppercase tracking-wide text-dark-500">Preis</p>
          <p className="mt-1 text-3xl font-display font-bold text-dark-900 sm:text-4xl">
            {formatPrice(price)}
          </p>
          <p className="mt-1 text-xs text-dark-500">
            {vat ? 'Inkl. MwSt. (ausweisbar)' : 'Inkl. MwSt. (nicht ausweisbar)'}
            {priceType ? ` · ${priceType}` : ''}
          </p>
          {netPrice ? (
            <p className="mt-1 text-xs text-dark-400">Netto: {formatPrice(netPrice)}</p>
          ) : null}
        </div>

        <div className="space-y-3 p-6">
          {warranty ? (
            <div className="flex items-start gap-3 rounded-xl bg-green-50 p-3 text-sm text-green-800">
              <BadgeCheck className="mt-0.5 h-5 w-5 flex-shrink-0" />
              <span>
                {warrantyMonths
                  ? `${warrantyMonths} Monate Gewährleistung inklusive`
                  : 'Gewährleistung inklusive'}
              </span>
            </div>
          ) : null}

          <Link
            href={`tel:${PRIMARY_PHONE_TEL}`}
            className="group flex w-full flex-col items-center justify-center gap-0.5 rounded-xl bg-primary-600 px-5 py-3.5 text-white shadow-sm transition hover:bg-primary-700"
          >
            <span className="flex items-center gap-2 text-base font-semibold">
              <Phone className="h-5 w-5" />
              {PRIMARY_PHONE_DISPLAY}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wide text-primary-100">
              Direkt anrufen
            </span>
          </Link>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-green-500 bg-green-50 px-3 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-100"
            >
              <MessageCircle className="h-5 w-5" />
              <span>WhatsApp</span>
            </Link>

            <Link
              href={`tel:${SECONDARY_PHONE_TEL}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-semibold text-dark-900 transition hover:bg-gray-50"
            >
              <Phone className="h-4 w-4 text-primary-600" />
              <span className="truncate">{SECONDARY_PHONE_DISPLAY}</span>
            </Link>
          </div>

          <p className="text-center text-[11px] text-dark-400">
            Bitte zuerst die {PRIMARY_PHONE_DISPLAY} versuchen.
          </p>

          <Link
            href={mailtoLink}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-dark-900 transition hover:bg-gray-50"
          >
            <Mail className="h-5 w-5" />
            <span>E-Mail-Anfrage</span>
          </Link>
        </div>

        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 text-xs text-dark-500">
          <p className="font-semibold text-dark-700">KD-CAR</p>
          <p>Mo–Fr: 09:00 – 18:00 Uhr</p>
          <p>Sa: 10:00 – 15:00 Uhr</p>
        </div>
      </div>
    </motion.aside>
  )
}
