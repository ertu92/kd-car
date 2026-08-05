'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { services, type Service } from '@/lib/services'
import {
  Shield,
  ArrowRight,
  Star,
  X,
  CheckCircle,
  Clock,
  Award,
  Users
} from 'lucide-react'

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const openModal = (service: Service) => {
    setSelectedService(service)
  }

  const closeModal = () => {
    setSelectedService(null)
  }

  return (
    <section id="services" className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-primary-100 text-blue-700 rounded-full px-6 py-3 mb-6 border border-blue-200"
          >
            <Star className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wider">UNSERE LEISTUNGEN</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-dark-900 mb-4 leading-tight">
            Ihr Zentrum für <span className="bg-gradient-to-r from-blue-500 via-primary-500 to-blue-600 bg-clip-text text-transparent">Lack und Karosserie</span>
          </h2>

          <p className="text-xl sm:text-3xl font-display font-bold text-dark-900 mb-6">
            UNSERE LEISTUNGEN
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  priority={service.image === '/images/carwrap.jpg'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-custom rounded-full p-2">
                    <service.icon className="w-5 h-5 text-primary-600" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {service.price}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-3">
                  <span className="text-sm text-primary-600 font-medium">
                    {service.subtitle}
                  </span>
                </div>
                
                <h3 className="text-xl font-display font-bold text-dark-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-auto">
                <button
                  onClick={() => openModal(service)}
                  className="w-full btn-outline group-hover:bg-primary-600 group-hover:text-white transition-all duration-300"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Mehr erfahren</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

                 {/* Bottom CTA */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="text-center mt-16"
         >
           <div className="bg-gradient-to-r from-blue-600 to-primary-600 rounded-2xl p-6 sm:p-8 text-white">
             <h3 className="text-xl sm:text-2xl font-display font-bold mb-4">
               Ihre Kreativität. Unsere Umsetzung.
             </h3>
             <p className="text-base sm:text-lg text-white/90 mb-6 max-w-2xl mx-auto">
               Haben Sie eine spezielle Anfrage oder möchten Sie Ihr Fahrzeug individuell gestalten? 
               Kontaktieren Sie uns für ein persönliches Beratungsgespräch!
             </p>
                           <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-secondary text-lg px-8 py-4"
              >
                Jetzt Termin vereinbaren
              </button>
           </div>
         </motion.div>

        {/* Service Modal */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="relative p-5 sm:p-8 border-b border-gray-200">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>

                  <div className="flex items-start space-x-3 sm:space-x-4 pr-12 sm:pr-14">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <selectedService.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-blue-600 font-medium">
                        {selectedService.subtitle}
                      </span>
                      <h2 className="text-xl sm:text-3xl font-display font-bold text-gray-900 mt-2 break-words">
                        {selectedService.title}
                      </h2>
                      <p className="text-base sm:text-lg text-gray-600 mt-3">
                        {selectedService.detailedDescription}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">
                  {/* Process */}
                  <div>
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <Clock className="w-6 h-6 text-blue-600" />
                      <span>Unser Prozess</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedService.process.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <Award className="w-6 h-6 text-blue-600" />
                      <span>Ihre Vorteile</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedService.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Arbeitszeit</h4>
                      <p className="text-gray-600">{selectedService.duration}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Shield className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Garantie</h4>
                      <p className="text-gray-600">{selectedService.warranty}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6 text-primary-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">Preis</h4>
                      <p className="text-gray-600">{selectedService.price}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                      Bereit für den nächsten Schritt?
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                      Kontaktieren Sie uns für ein persönliches Beratungsgespräch und lassen Sie uns gemeinsam Ihr Fahrzeug zum Strahlen bringen!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                             <button
                         onClick={() => {
                           const contactSection = document.getElementById('contact');
                           if (contactSection) {
                             contactSection.scrollIntoView({ behavior: 'smooth' });
                           }
                           closeModal();
                         }}
                         className="btn-primary text-lg px-8 py-4"
                       >
                         Jetzt Termin vereinbaren
                       </button>
                      <Link
                        href={`/leistungen/${selectedService.slug}`}
                        className="btn-outline text-lg px-8 py-4"
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <span>Zur Leistungsseite</span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </Link>
                      <button
                        onClick={closeModal}
                        className="btn-outline text-lg px-8 py-4"
                      >
                        Schließen
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
