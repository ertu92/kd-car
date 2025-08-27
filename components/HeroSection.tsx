'use client'

import { useState, useEffect } from 'react'
import { Play, ChevronDown, Star, Shield, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    // Simulate video loading
    const timer = setTimeout(() => setIsVideoLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
             {/* Video Background */}
       <div className="absolute inset-0 w-full h-full">
                   <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/7727415-hd_1920_1080_25fps.mp4" type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
          </video>
         
         
         
                   {/* Enhanced Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 shadow-2xl"></div>
          
          {/* Additional Dark Shadow for Better Text Readability */}
          <div className="absolute inset-0 bg-black/30"></div>
       </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
                     

          {/* Main Heading */}
                     <motion.h1
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="text-5xl sm:text-6xl lg:text-8xl font-display font-black leading-tight"
           >
             <span className="bg-gradient-to-r from-blue-500 via-primary-500 to-blue-600 bg-clip-text text-transparent">
               PROFESSIONELLES
             </span>
             <br />
             <span className="text-white drop-shadow-2xl">FAHRZEUG-TUNING</span>
             <br />
             <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-300 font-medium">
               & FOLIERUNG
             </span>
           </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Verwandeln Sie Ihr Fahrzeug mit modernster Tuning-Technologie und Premium-Vinylfolierung. 
            Von Leistungssteigerungen bis hin zu atemberaubenden visuellen Transformationen - wir verwirklichen Ihre Vision.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center items-center pt-12"
          >
                         <button 
                           onClick={() => {
                             const contactSection = document.getElementById('contact');
                             if (contactSection) {
                               contactSection.scrollIntoView({ behavior: 'smooth' });
                             }
                           }}
                           className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-primary-600 hover:from-blue-700 hover:to-primary-700 text-white text-lg px-10 py-5 rounded-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
                         >
               <span className="flex items-center space-x-3">
                 <span>BERATUNG BUCHEN</span>
                 <Play className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
               </span>
               <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-primary-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             </button>
          </motion.div>

          {/* Premium Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 max-w-5xl mx-auto"
          >
                         <div className="group flex flex-col items-center space-y-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
               <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-primary-500/20 rounded-2xl flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-primary-500/30 transition-all duration-300">
                 <Shield className="w-8 h-8 text-blue-400" />
               </div>
               <span className="text-lg font-bold text-white">PREMIUM QUALITÄT</span>
               <span className="text-sm text-gray-300 text-center">Deutsche Ingenieursstandards mit Premium-Materialien</span>
             </div>
             <div className="group flex flex-col items-center space-y-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
               <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center group-hover:from-primary-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                 <Zap className="w-8 h-8 text-primary-400" />
               </div>
               <span className="text-lg font-bold text-white">SCHNELLER SERVICE</span>
               <span className="text-sm text-gray-300 text-center">Schnelle Bearbeitung mit Liebe zum Detail</span>
             </div>
             <div className="group flex flex-col items-center space-y-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
               <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-primary-500/20 rounded-2xl flex items-center justify-center group-hover:from-blue-600/30 group-hover:to-primary-500/30 transition-all duration-300">
                 <Star className="w-8 h-8 text-blue-400" />
               </div>
               <span className="text-lg font-bold text-white">INDIVIDUELLES DESIGN</span>
               <span className="text-sm text-gray-300 text-center">Einzigartige Designs nach Ihrer Vision</span>
             </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-white/60"
        >
          <span className="text-sm font-medium">MEHR ENTDECKEN</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

                     {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-primary-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-full blur-3xl"
        />
    </section>
  )
}
