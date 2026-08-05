import InventorySection from '@/components/InventorySection'
import ContactSection from '@/components/ContactSection'
import { getInventoryCars } from '@/lib/carms'

// Fahrzeuge serverseitig laden, damit Crawler echte Inhalte statt des
// Ladezustands sehen (GSC meldete sonst Soft 404).
export const dynamic = 'force-dynamic'

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

export default async function Inventory() {
  const { cars, source, error } = await getInventoryCars()

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <InventorySection initialCars={cars} initialSource={source} initialError={error ?? null} />
      <ContactSection />
    </div>
  )
}
