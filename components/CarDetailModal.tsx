'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Calendar, Gauge, Settings, Palette, Zap, Phone, ZoomIn } from 'lucide-react'
import Image from 'next/image'

interface Car {
  id: number
  make: string
  model: string
  year: number
  price: number
  mileage: number
  image: string
  images: string[]
  engine: string
  horsepower: string
  transmission: string
  exteriorColor: string
  interiorColor: string
  features: string[]
  description: string
}

interface CarDetailModalProps {
  car: Car
  onClose: () => void
}

export default function CarDetailModal({ car, onClose }: CarDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isImageFullscreen, setIsImageFullscreen] = useState(false)

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    // Handle keyboard navigation in fullscreen image mode
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isImageFullscreen) return
      
      switch (e.key) {
        case 'Escape':
          setIsImageFullscreen(false)
          break
        case 'ArrowLeft':
          prevImage()
          break
        case 'ArrowRight':
          nextImage()
          break
      }
    }

    if (isImageFullscreen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isImageFullscreen])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('de-DE').format(mileage) + ' km'
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${
              isFullscreen ? 'w-full h-full max-w-none max-h-none' : 'w-full max-w-6xl max-h-[90vh] sm:max-h-[85vh]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-dark-900 truncate">
                {car.make} {car.model}
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-600 mt-1">
                {formatPrice(car.price)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-120px)] sm:max-h-[calc(85vh-120px)] min-h-0">
            {/* Image Gallery */}
            <div className="lg:w-1/2 relative bg-gray-100">
              <div className="relative h-64 lg:h-full">
                <Image
                  src={car.images[currentImageIndex]}
                  alt={`${car.make} ${car.model} - Bild ${currentImageIndex + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                
                {/* Navigation Arrows */}
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-200"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-200"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-medium text-dark-900">
                    {currentImageIndex + 1} / {car.images.length}
                  </span>
                </div>

                {/* Fullscreen Button */}
                <button
                  onClick={() => setIsImageFullscreen(true)}
                  className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-200"
                  title="Vollbild anzeigen"
                >
                  <ZoomIn className="w-5 h-5 text-dark-900" />
                </button>
              </div>

              {/* Thumbnail Strip */}
              {car.images.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {car.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'ring-2 ring-primary-500 scale-105' 
                            : 'hover:scale-105'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="(max-width: 1024px) 25vw, 12.5vw"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="lg:w-1/2 p-4 sm:p-6 overflow-y-auto flex-1 min-h-0">
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-dark-500">Baujahr</p>
                      <p className="font-semibold text-dark-900">{car.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Gauge className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-dark-500">Laufleistung</p>
                      <p className="font-semibold text-dark-900">{formatMileage(car.mileage)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Settings className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-dark-500">Motor</p>
                      <p className="font-semibold text-dark-900">{car.engine}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Zap className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-dark-500">Leistung</p>
                      <p className="font-semibold text-dark-900">{car.horsepower}</p>
                    </div>
                  </div>
                </div>

                {/* Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Palette className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-dark-500">Außenfarbe</p>
                      <p className="font-semibold text-dark-900">{car.exteriorColor}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Palette className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-dark-500">Innenfarbe</p>
                      <p className="font-semibold text-dark-900">{car.interiorColor}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-dark-900 mb-3">Beschreibung</h3>
                  <p className="text-dark-600 leading-relaxed">{car.description}</p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold text-dark-900 mb-3">Ausstattung</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-sm text-dark-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 sm:pt-6 border-t border-gray-200 flex-shrink-0">
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Phone Icon */}
                    <a 
                      href="tel:+491773225218"
                      className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-primary-100 rounded-xl transition-colors duration-200 cursor-pointer"
                      title="Anrufen: 0177 3225218"
                    >
                      <Phone className="w-6 h-6 text-primary-600" />
                    </a>
                    
                    {/* Action Button */}
                    <button 
                      onClick={() => {
                        // Close modal first
                        onClose();
                        
                        // Scroll to contact section on current page
                        setTimeout(() => {
                          const contactSection = document.getElementById('contact');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 100); // Small delay to ensure modal is closed
                      }}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 sm:px-6 rounded-xl transition-colors duration-200 text-sm sm:text-base"
                    >
                      Jetzt anfragen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isImageFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsImageFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsImageFullscreen(false)}
                className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors duration-200"
                title="Schließen"
              >
                <X className="w-6 h-6 text-dark-900" />
              </button>

              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={car.images[currentImageIndex]}
                  alt={`${car.make} ${car.model} - Bild ${currentImageIndex + 1}`}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain"
                  priority
                />
              </div>

              {/* Navigation Arrows */}
              {car.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors duration-200"
                    title="Vorheriges Bild"
                  >
                    <ChevronLeft className="w-8 h-8 text-dark-900" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors duration-200"
                    title="Nächstes Bild"
                  >
                    <ChevronRight className="w-8 h-8 text-dark-900" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-sm font-medium text-dark-900">
                  {currentImageIndex + 1} / {car.images.length}
                </span>
              </div>

              {/* Thumbnail Strip */}
              {car.images.length > 1 && (
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-xl p-3">
                  <div className="flex space-x-2">
                    {car.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'ring-2 ring-primary-500 scale-105' 
                            : 'hover:scale-105'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="(max-width: 1024px) 25vw, 12.5vw"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
