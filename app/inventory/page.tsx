import InventorySection from '@/components/InventorySection'
import ContactSection from '@/components/ContactSection'

export const metadata = {
  title: 'Fahrzeugbestand - KD-CAR | Premium Autos zum Verkauf',
  description: 'Entdecken Sie unseren exklusiven Fahrzeugbestand. Premium Autos, Supercars und Luxusfahrzeuge in höchster Qualität. Jetzt durchsuchen und Ihr Traumauto finden.',
  keywords: 'Fahrzeugbestand, Premium Autos, Supercars, Luxusfahrzeuge, Auto Verkauf, KD-CAR',
}

export default function Inventory() {
  return (
    <div className="pt-20">
      <InventorySection />
      <ContactSection />
    </div>
  )
}
