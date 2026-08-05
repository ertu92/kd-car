import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#0ea5e9',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kd-car.de'),
  title: 'KD-CAR - Autoaufbereitung und mehr | Professionelle Fahrzeugaufbereitung',
  description: 'Professionelle Autoaufbereitung, Beulendoktor, Autofolierung, Autoglas-Reparatur, Smart Repair und Tuning. Ihr zuverlässiger Partner für alles rund ums Auto in Deutschland.',
  keywords: 'Autoaufbereitung, Beulendoktor, Autofolierung, Autoglas-Reparatur, Smart Repair, Tuning, Fahrzeugaufbereitung, Deutschland',
  authors: [{ name: 'KD-CAR' }],
  openGraph: {
    title: 'KD-CAR - Autoaufbereitung und mehr',
    description: 'Professionelle Autoaufbereitung und mehr - Qualität, die begeistert',
    url: 'https://www.kd-car.de',
    siteName: 'KD-CAR',
    locale: 'de_DE',
    type: 'website',
  },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  '@id': 'https://www.kd-car.de/#business',
  name: 'KD-CAR',
  description:
    'Professionelle Autoaufbereitung, Beulendoktor, Autofolierung, Autoglas-Reparatur, Smart Repair und Tuning in Oberhausen.',
  url: 'https://www.kd-car.de',
  telephone: '+491773225218',
  email: 'info@kd-car.de',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Mülheimerstraße 33',
    addressLocality: 'Oberhausen',
    postalCode: '46045',
    addressCountry: 'DE',
  },
  areaServed: [
    { '@type': 'City', name: 'Oberhausen' },
    { '@type': 'Place', name: 'Ruhrgebiet' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="overflow-x-clip">
      <body className={`${inter.className} ${poppins.variable} overflow-x-clip`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
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
