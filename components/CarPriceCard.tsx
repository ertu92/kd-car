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

const PHONE_NUMBER = '+491773225218'
const PHONE_DISPLAY = '0177 3225218'
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
            {vat ? 'Inkl. MwSt., MwSt. ausweisbar' : 'Differenzbesteuert nach §25a UStG'}
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
            href={`tel:${PHONE_NUMBER}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
          >
            <Phone className="h-5 w-5" />
            <span>{PHONE_DISPLAY}</span>
          </Link>

          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-500 bg-green-50 px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-100"
          >
            <MessageCircle className="h-5 w-5" />
            <span>WhatsApp</span>
          </Link>

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
