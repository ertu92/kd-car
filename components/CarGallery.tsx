'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

interface CarGalleryProps {
  images: string[]
  alt: string
}

const SWIPE_THRESHOLD = 40

export default function CarGallery({ images, alt }: CarGalleryProps) {
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const total = images.length
  const touchStartX = useRef<number | null>(null)

  const prev = () => setIndex((i) => (i - 1 + total) % total)
  const next = () => setIndex((i) => (i + 1) % total)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || total <= 1) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    if (deltaX > SWIPE_THRESHOLD) prev()
    else if (deltaX < -SWIPE_THRESHOLD) next()
    touchStartX.current = null
  }

  if (total === 0) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100">
        <div className="flex h-full items-center justify-center text-gray-400">
          Kein Bild verfügbar
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-2 sm:space-y-3">
        {/* Hero image */}
        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 shadow-md sm:rounded-2xl sm:shadow-lg"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="absolute inset-0 cursor-zoom-in"
            aria-label="Bild vergrößern"
          >
            <Image
              src={images[index]}
              alt={`${alt} – Bild ${index + 1} von ${total}`}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </button>

          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="absolute right-2 top-2 rounded-full bg-white/95 p-2 shadow-md transition hover:bg-white sm:right-4 sm:top-4"
            aria-label="Bild vergrößern"
          >
            <ZoomIn className="h-4 w-4 text-dark-900 sm:h-5 sm:w-5" />
          </button>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/95 p-2.5 shadow-md transition hover:bg-white sm:flex sm:left-3"
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft className="h-5 w-5 text-dark-900 sm:h-6 sm:w-6" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/95 p-2.5 shadow-md transition hover:bg-white sm:flex sm:right-3"
                aria-label="Nächstes Bild"
              >
                <ChevronRight className="h-5 w-5 text-dark-900 sm:h-6 sm:w-6" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur sm:bottom-3 sm:px-3 sm:text-xs">
                {index + 1} / {total}
              </div>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {total > 1 && (
          <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 sm:gap-2 lg:grid-cols-7">
            {images.slice(0, 8).map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                className={`relative aspect-[4/3] overflow-hidden rounded-md transition sm:rounded-lg ${
                  i === index
                    ? 'ring-2 ring-primary-600 ring-offset-1'
                    : 'ring-1 ring-gray-200 hover:ring-primary-300'
                }`}
                aria-label={`Bild ${i + 1} anzeigen`}
              >
                <Image
                  src={src}
                  alt={`${alt} Thumbnail ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 25vw, 12vw"
                  className="object-cover"
                />
              </button>
            ))}
            {total > 8 && (
              <button
                type="button"
                onClick={() => setLightbox(true)}
                className="relative flex aspect-[4/3] items-center justify-center rounded-md bg-dark-900 text-xs font-semibold text-white hover:bg-dark-800 sm:rounded-lg sm:text-sm"
              >
                +{total - 8}
              </button>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 p-2 backdrop-blur sm:p-4"
            onClick={() => setLightbox(false)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox(false)
              }}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/95 p-2.5 shadow-lg transition hover:bg-white sm:right-4 sm:top-4 sm:p-3"
              aria-label="Schließen"
            >
              <X className="h-5 w-5 text-dark-900 sm:h-6 sm:w-6" />
            </button>

            <div
              className="relative h-full w-full max-w-7xl"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={images[index]}
                alt={`${alt} – Bild ${index + 1}`}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    prev()
                  }}
                  className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/95 p-2.5 shadow-lg transition hover:bg-white sm:flex sm:left-4 sm:p-3"
                  aria-label="Vorheriges Bild"
                >
                  <ChevronLeft className="h-6 w-6 text-dark-900 sm:h-7 sm:w-7" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    next()
                  }}
                  className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/95 p-2.5 shadow-lg transition hover:bg-white sm:flex sm:right-4 sm:p-3"
                  aria-label="Nächstes Bild"
                >
                  <ChevronRight className="h-6 w-6 text-dark-900 sm:h-7 sm:w-7" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-dark-900 sm:bottom-6 sm:px-4 sm:py-2 sm:text-sm">
                  {index + 1} / {total}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
