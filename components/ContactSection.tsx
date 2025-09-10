'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  Star,
  MessageCircle
} from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefon',
    value: '0177 3225218',
    subtitle: 'Mo-Fr: 8:00 - 18:00'
  },
  {
    icon: Mail,
    title: 'E-Mail',
    value: 'inf@kd-car.de',
    subtitle: 'Antwort innerhalb 24h'
  },
  {
    icon: MapPin,
    title: 'Adresse',
    value: 'Tannenbergstraße 74, 46045 Oberhausen',
    subtitle: 'Deutschland'
  },
  {
    icon: Clock,
    title: 'Öffnungszeiten',
    value: 'Mo-Fr: 8:00 - 18:00',
    subtitle: 'Sa: 9:00 - 14:00'
  }
]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage('Ihre Nachricht wurde erfolgreich gesendet! Wir melden uns innerhalb von 24 Stunden bei Ihnen.')
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        })
        
        // Scroll to "Hier finden Sie uns" section after successful submission
        setTimeout(() => {
          // Find the map section by looking for the heading text
          const headings = Array.from(document.querySelectorAll('h3'));
          const mapHeading = headings.find(heading => heading.textContent?.includes('Hier finden Sie uns'));
          if (mapHeading) {
            mapHeading.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
        }, 1000); // 1 second delay to show success message first
      } else {
        setSubmitStatus('error')
        setSubmitMessage(data.error || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.')
      }
    } catch {
      setSubmitStatus('error')
      setSubmitMessage('Ein Fehler ist aufgetreten. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-dark-900 to-dark-800 text-white">
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
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-custom rounded-full px-4 py-2 mb-6"
          >
            <MessageCircle className="w-4 h-4 text-accent-400" />
            <span className="text-sm font-medium">Kontakt</span>
          </motion.div>
          
                     <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
             <span className="bg-gradient-to-r from-blue-500 via-primary-500 to-blue-600 bg-clip-text text-transparent">Kontaktieren</span> Sie uns
           </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Machen Sie jetzt einen Termin mit uns aus! Wir freuen uns darauf, 
            Ihr Fahrzeug professionell aufzubereiten.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-custom rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-display font-bold mb-6">
              Termin vereinbaren
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Ihr vollständiger Name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="ihre.email@beispiel.de"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+49 123 456 789"
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                    Gewünschte Leistung
                  </label>
                                     <select
                     id="service"
                     name="service"
                     value={formData.service}
                     onChange={handleChange}
                     className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                   >
                     <option value="" className="text-gray-900">Bitte wählen Sie eine Leistung</option>
                     <option value="performance-tuning" className="text-gray-900">Performance Tuning - Motor & ECU</option>
                                           <option value="autofolierung" className="text-gray-900">Autofolierung - Voll- & Teilfolierung</option>
                     <option value="body-modifications" className="text-gray-900">Body Modifikationen - Aero & Styling</option>
                     <option value="wheel-tire-upgrades" className="text-gray-900">Rad- & Reifen-Upgrades - Leistung & Stil</option>
                     <option value="interior-modifications" className="text-gray-900">Innenraum-Modifikationen - Luxus & Sport</option>
                     <option value="maintenance-repair" className="text-gray-900">Wartung & Reparatur - Professioneller Service</option>
                     <option value="other" className="text-gray-900">Sonstiges</option>
                   </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Beschreiben Sie Ihr Anliegen..."
                />
              </div>

                             {/* Status Message */}
               {submitStatus !== 'idle' && (
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className={`p-4 rounded-lg text-sm ${
                     submitStatus === 'success' 
                       ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                       : 'bg-red-500/20 border border-red-500/30 text-red-300'
                   }`}
                 >
                   {submitMessage}
                 </motion.div>
               )}

               <button
                 type="submit"
                 disabled={isSubmitting}
                 className={`w-full btn-secondary text-lg py-4 group ${
                   isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                 }`}
               >
                 <span className="flex items-center justify-center space-x-2">
                   {isSubmitting ? (
                     <>
                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       <span>Wird gesendet...</span>
                     </>
                   ) : (
                     <>
                       <span>Nachricht senden</span>
                       <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                     </>
                   )}
                 </span>
               </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-display font-bold mb-6">
                Kontaktinformationen
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Wir sind für Sie da und freuen uns darauf, Ihr Fahrzeug professionell 
                aufzubereiten. Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                                     <div className="flex-shrink-0 w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                     <info.icon className="w-6 h-6 text-blue-400" />
                   </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {info.title}
                    </h4>
                                                             {info.title === 'Adresse' ? (
                      <a 
                        href="https://www.google.com/maps/search/Tannenbergstraße+74,+46045+Oberhausen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 font-medium hover:text-blue-200 transition-colors duration-200 cursor-pointer"
                      >
                        {info.value}
                      </a>
                    ) : info.title === 'Telefon' ? (
                      <a 
                        href="tel:+491773225218"
                        className="text-blue-300 font-medium hover:text-blue-200 transition-colors duration-200 cursor-pointer"
                      >
                        {info.value}
                      </a>
                    ) : info.title === 'E-Mail' ? (
                      <a 
                        href="mailto:inf@kd-car.de"
                        className="text-blue-300 font-medium hover:text-blue-200 transition-colors duration-200 cursor-pointer"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-blue-300 font-medium">
                        {info.value}
                      </p>
                    )}
                    <p className="text-gray-400 text-sm">
                      {info.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
              className="bg-white/5 backdrop-blur-custom rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Star className="w-5 h-5 text-blue-400" />
                <h4 className="text-lg font-semibold text-white">
                  Warum KD-CAR?
                </h4>
              </div>
              <ul className="space-y-2 text-gray-300">
                                 <li className="flex items-center space-x-2">
                   <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                   <span>Kostenlose Beratung</span>
                 </li>
                 <li className="flex items-center space-x-2">
                   <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                   <span>Unverbindliches Angebot</span>
                 </li>
                 <li className="flex items-center space-x-2">
                   <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                   <span>Flexible Termine</span>
                 </li>
                 <li className="flex items-center space-x-2">
                   <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                   <span>Professioneller Service</span>
                 </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>



           {/* Google Maps */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 1.2 }}
             className="mt-12"
           >
             <h3 className="text-2xl font-display font-bold mb-6 text-center">
               Hier finden Sie uns
             </h3>
             <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.7355033712197!2d6.860323877544537!3d51.48136911260347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8c02af57e1f43%3A0x2f4c34a6a65d1e4e!2sTannenbergstra%C3%9Fe%2074%2C%2046045%20Oberhausen!5e0!3m2!1sde!2sde!4v1756282469919!5m2!1sde!2sde" 
                 width="100%" 
                 height="100%" 
                 style={{border:0}} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="w-full h-full"
               />
             </div>
           </motion.div>
         </div>
    </section>
  )
}
