import InventorySection from '@/components/InventorySection'
import ContactSection from '@/components/ContactSection'

export const metadata = {
  title: 'Fahrzeugbestand - KD-CAR | Premium Autos zum Verkauf',
  description: 'Entdecken Sie unseren exklusiven Fahrzeugbestand. Premium Autos, Supercars und Luxusfahrzeuge in höchster Qualität. Jetzt durchsuchen und Ihr Traumauto finden.',
  keywords: 'Fahrzeugbestand, Premium Autos, Supercars, Luxusfahrzeuge, Auto Verkauf, KD-CAR',
  alternates: { canonical: '/inventory' },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://www.kd-car.de/' },
    { '@type': 'ListItem', position: 2, name: 'Fahrzeugbestand', item: 'https://www.kd-car.de/inventory' },
  ],
}

export default function Inventory() {
  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <InventorySection />
      <ContactSection />
    </div>
  )
}
