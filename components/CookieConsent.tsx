'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie, Shield, Info } from 'lucide-react'
import Link from 'next/link'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      setShowBanner(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowBanner(false)
  }

  const acceptNecessary = () => {
    localStorage.setItem('cookieConsent', 'necessary')
    setShowBanner(false)
  }

  const decline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
          {/* Close Button */}
          <button
            onClick={decline}
            aria-label="Schließen"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 -m-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6 pr-8 sm:pr-10 lg:pr-0">
            {/* Content */}
            <div className="flex-1 max-w-4xl">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                    Cookie-Einstellungen
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern.
                    Einige sind für die Funktionalität erforderlich, andere helfen uns, Ihnen relevante Inhalte anzuzeigen.
                  </p>
                  <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                    <Link href="#" className="hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1">
                      <Shield className="w-3 h-3" />
                      <span>Datenschutzerklärung</span>
                    </Link>
                    <Link href="#" className="hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1">
                      <Info className="w-3 h-3" />
                      <span>Cookie-Richtlinie</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-row items-stretch lg:items-center gap-2 lg:gap-3 w-full lg:w-auto">
              <button
                onClick={acceptAll}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors duration-200"
              >
                Alle akzeptieren
              </button>
              <button
                onClick={acceptNecessary}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors duration-200"
              >
                Nur notwendige
              </button>
              <button
                onClick={decline}
                className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium text-sm transition-colors duration-200"
              >
                Ablehnen
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
