import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KD-CAR - Autoaufbereitung und mehr | Professionelle Fahrzeugaufbereitung',
  description: 'Professionelle Autoaufbereitung, Beulendoktor, Autofolierung, Autoglas-Reparatur, Smart Repair und Tuning. Ihr zuverlässiger Partner für alles rund ums Auto in Deutschland.',
  keywords: 'Autoaufbereitung, Beulendoktor, Autofolierung, Autoglas-Reparatur, Smart Repair, Tuning, Fahrzeugaufbereitung, Deutschland',
  authors: [{ name: 'KD-CAR' }],
  openGraph: {
    title: 'KD-CAR - Autoaufbereitung und mehr',
    description: 'Professionelle Autoaufbereitung und mehr - Qualität, die begeistert',
    url: 'https://kd-car.de',
    siteName: 'KD-CAR',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
