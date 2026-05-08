'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

interface CarGalleryProps {
  images: string[]
  alt: string
}

export default function CarGallery({ images, alt }: CarGalleryProps) {
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const total = images.length

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

  if (total === 0) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100">
        <div className="flex h-full items-center justify-center text-dark-400">
          Kein Bild verfügbar
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-3">
        {/* Hero image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
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
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>

          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="absolute right-4 top-4 rounded-full bg-white/95 p-2 shadow-md transition hover:bg-white"
            aria-label="Bild vergrößern"
          >
            <ZoomIn className="h-5 w-5 text-dark-900" />
          </button>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-2 shadow-md transition hover:bg-white"
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft className="h-6 w-6 text-dark-900" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-2 shadow-md transition hover:bg-white"
                aria-label="Nächstes Bild"
              >
                <ChevronRight className="h-6 w-6 text-dark-900" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {index + 1} / {total}
              </div>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {total > 1 && (
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 lg:grid-cols-7">
            {images.slice(0, 14).map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                className={`relative aspect-[4/3] overflow-hidden rounded-lg ring-offset-2 transition ${
                  i === index ? 'ring-2 ring-primary-600' : 'ring-1 ring-gray-200 hover:ring-primary-300'
                }`}
                aria-label={`Bild ${i + 1} anzeigen`}
              >
                <Image
                  src={src}
                  alt={`${alt} Thumbnail ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 20vw, 12vw"
                  className="object-cover"
                />
              </button>
            ))}
            {total > 14 && (
              <button
                type="button"
                onClick={() => setLightbox(true)}
                className="relative flex aspect-[4/3] items-center justify-center rounded-lg bg-dark-900 text-sm font-semibold text-white hover:bg-dark-800"
              >
                +{total - 14}
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
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 p-4 backdrop-blur"
            onClick={() => setLightbox(false)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox(false)
              }}
              className="absolute right-4 top-4 rounded-full bg-white/95 p-3 shadow-lg transition hover:bg-white"
              aria-label="Schließen"
            >
              <X className="h-6 w-6 text-dark-900" />
            </button>

            <div className="relative h-full w-full max-w-7xl" onClick={(e) => e.stopPropagation()}>
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-3 shadow-lg transition hover:bg-white"
                  aria-label="Vorheriges Bild"
                >
                  <ChevronLeft className="h-7 w-7 text-dark-900" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    next()
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-3 shadow-lg transition hover:bg-white"
                  aria-label="Nächstes Bild"
                >
                  <ChevronRight className="h-7 w-7 text-dark-900" />
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-dark-900">
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
