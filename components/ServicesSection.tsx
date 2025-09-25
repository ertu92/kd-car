'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  Sparkles, 
  Wrench, 
  Palette, 
  Shield, 
  Zap, 
  Car,
  ArrowRight,
  Star,
  X,
  CheckCircle,
  Clock,
  Award,
  Users
} from 'lucide-react'

interface Service {
  id: number
  title: string
  subtitle: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  image: string
  features: string[]
  price: string
  detailedDescription: string
  process: string[]
  benefits: string[]
  duration: string
  warranty: string
}

const services: Service[] = [
  {
    id: 1,
    title: 'AN- UND VERKAUF',
    subtitle: 'Motor & ECU',
    description: 'Wir kaufen Ihr Auto an oder nehmen es in Zahlung für ein Neues.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: ['Schnelle Abwicklung', 'Garantie inklusive', 'Lieferung möglich'],
    price: 'ab €299',
    detailedDescription: 'Unser Performance Tuning beginnt mit einer gründlichen Analyse Ihres Fahrzeugs. Wir verwenden modernste Diagnosegeräte und Software, um das volle Potenzial Ihres Motors freizusetzen.',
    process: [
      'Fahrzeuganalyse und Leistungsmessung',
      'ECU-Programmierung und Optimierung',
      'Einbau von Performance-Komponenten',
      'Dyno-Test und Feinabstimmung',
      'Qualitätskontrolle und Garantie'
    ],
    benefits: [
      'Bis zu 30% Leistungssteigerung',
      'Verbesserte Beschleunigung',
      'Optimierter Kraftstoffverbrauch',
      'Professionelle Garantie'
    ],
    duration: '1-3 Tage',
    warranty: '2 Jahre'
  },
  {
    id: 2,
    title: 'INSTANDSETZUNG',
    subtitle: 'Lackierung & Reparatur',
    description: 'Professionelle Fahrzeug-Instandsetzung mit modernsten Lackiertechniken und Smart Repair-Methoden für perfekte Ergebnisse.',
    icon: Palette,
    image: '/images/carwrap.jpg',
    features: ['Lackieren', 'Smart Repair', 'Teilfolierung', 'Professionelle Aufbereitung'],
    price: 'ab €899',
    detailedDescription: 'Wir verwenden ausschließlich hochwertige Lackmaterialien und moderne Smart Repair-Techniken. Jede Instandsetzung wird mit höchster Präzision und Sorgfalt ausgeführt.',
    process: [
      'Beratung und Schadensanalyse',
      'Fahrzeugvorbereitung und Reinigung',
      'Smart Repair oder Volllackierung',
      'Professionelle Verarbeitung',
      'Qualitätskontrolle und Finish'
    ],
    benefits: [
      'Moderne Smart Repair-Techniken',
      'Hochwertige Lackmaterialien',
      'Professionelle Verarbeitung',
      'Langlebige Qualität'
    ],
    duration: '3-7 Tage',
    warranty: '3 Jahre'
  },
  {
    id: 3,
    title: 'BODY MODIFIKATIONEN',
    subtitle: 'Aero & Styling',
    description: 'Verbessern Sie das Aussehen Ihres Fahrzeugs mit individuellen Body-Kits, Spoiler und aerodynamischen Modifikationen.',
    icon: Car,
    image: '/images/body.jpg',
    features: ['Body-Kits', 'Spoiler', 'Seitenschweller', 'Individuelle Kühlergrills'],
    price: 'ab €199',
    detailedDescription: 'Unsere Body-Modifikationen verbinden Ästhetik mit Funktionalität. Jede Komponente wird individuell angepasst und perfekt integriert.',
    process: [
      'Design-Beratung und Planung',
      'Anpassung der Komponenten',
      'Professioneller Einbau',
      'Lackierung und Integration',
      'Finale Qualitätsprüfung'
    ],
    benefits: [
      'Einzigartiges Design',
      'Verbesserte Aerodynamik',
      'Professionelle Integration',
      'Hochwertige Materialien'
    ],
    duration: '2-5 Tage',
    warranty: '2 Jahre'
  },
  {
    id: 4,
    title: 'RAD- & REIFEN-UPGRADES',
    subtitle: 'Leistung & Stil',
    description: 'Upgraden Sie Ihre Räder und Reifen für bessere Leistung, Handling und atemberaubende Optik.',
    icon: Shield,
    image: '/images/reifen.jpg',
    features: ['Individuelle Räder', 'Performance-Reifen', 'Radausrichtung', 'TPMS-Systeme'],
    price: 'ab €399',
    detailedDescription: 'Wir bieten eine umfassende Auswahl an Rädern und Reifen, die perfekt auf Ihr Fahrzeug abgestimmt sind. Jede Montage erfolgt mit modernster Ausrüstung.',
    process: [
      'Beratung und Auswahl',
      'Fahrzeugvermessung',
      'Professionelle Montage',
      'Achseinstellung',
      'Testfahrt und Kontrolle'
    ],
    benefits: [
      'Verbesserte Fahrleistungen',
      'Einzigartiges Design',
      'Optimale Sicherheit',
      'Professionelle Montage'
    ],
    duration: '1-2 Tage',
    warranty: '2 Jahre'
  },
  {
    id: 5,
    title: 'INNENRAUM-MODIFIKATIONEN',
    subtitle: 'Luxus & Sport',
    description: 'Verwandeln Sie Ihren Innenraum mit individueller Polsterung, Lenkrädern und Performance-Zubehör.',
    icon: Sparkles,
    image: '/images/interior.jpg',
    features: ['Individuelle Polsterung', 'Sport-Lenkrad', 'Pedalsätze', 'Innenraum-Beleuchtung'],
    price: 'ab €199',
    detailedDescription: 'Verwandeln Sie Ihr Fahrzeug-Innenleben in eine Luxus-Oase. Wir verwenden nur die besten Materialien und achten auf jedes Detail.',
    process: [
      'Design-Beratung',
      'Materialauswahl',
      'Professionelle Verarbeitung',
      'Einbau und Integration',
      'Finale Kontrolle'
    ],
    benefits: [
      'Luxuriöses Ambiente',
      'Individuelles Design',
      'Hochwertige Materialien',
      'Perfekte Integration'
    ],
    duration: '2-4 Tage',
    warranty: '2 Jahre'
  },
  {
    id: 6,
    title: 'WARTUNG & REPARATUR',
    subtitle: 'Professioneller Service',
    description: 'Halten Sie Ihr getuntes Fahrzeug in perfektem Zustand mit unseren umfassenden Wartungs- und Reparaturservices.',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: ['Regelmäßige Wartung', 'Leistungsprüfungen', 'Diagnose-Services', 'Qualitätssicherung'],
    price: 'ab €89',
    detailedDescription: 'Unser Wartungs- und Reparaturservice sorgt dafür, dass Ihr getuntes Fahrzeug immer in Top-Zustand bleibt. Wir verwenden nur Original- oder hochwertige Ersatzteile.',
    process: [
      'Umfassende Fahrzeugdiagnose',
      'Detaillierte Inspektion',
      'Professionelle Wartung',
      'Qualitätskontrolle',
      'Testfahrt und Dokumentation'
    ],
    benefits: [
      'Längere Lebensdauer',
      'Optimale Leistung',
      'Sicherheit gewährleistet',
      'Wertstabilisierung'
    ],
    duration: '0.5-2 Tage',
    warranty: '1 Jahr'
  }
]

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const openModal = (service: Service) => {
    setSelectedService(service)
  }

  const closeModal = () => {
    setSelectedService(null)
  }

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
          
          <h2 className="text-5xl sm:text-6xl font-display font-black text-dark-900 mb-6">
            PREMIUM <span className="bg-gradient-to-r from-blue-500 via-primary-500 to-blue-600 bg-clip-text text-transparent">FAHRZEUG-TUNING</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto font-light">
            Verwandeln Sie Ihr Fahrzeug mit unserem umfassenden Angebot an professionellen Tuning- und Folierungsdienstleistungen. 
            Von Leistungssteigerungen bis hin zu atemberaubenden visuellen Transformationen - wir liefern Exzellenz in jedem Detail.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group overflow-hidden"
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
              <div className="p-6">
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
           <div className="bg-gradient-to-r from-blue-600 to-primary-600 rounded-2xl p-8 text-white">
             <h3 className="text-2xl font-display font-bold mb-4">
               Ihre Kreativität. Unsere Umsetzung.
             </h3>
             <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
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
                <div className="relative p-8 border-b border-gray-200">
                  <button
                    onClick={closeModal}
                    className="absolute top-6 right-6 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-primary-100 rounded-2xl flex items-center justify-center">
                      <selectedService.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm text-blue-600 font-medium">
                        {selectedService.subtitle}
                      </span>
                      <h2 className="text-3xl font-display font-bold text-gray-900 mt-2">
                        {selectedService.title}
                      </h2>
                      <p className="text-lg text-gray-600 mt-3">
                        {selectedService.detailedDescription}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8 space-y-8">
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
