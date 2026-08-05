import type { ComponentType } from 'react'
import { Sparkles, Wrench, Palette, Shield, Zap, Car } from 'lucide-react'

// Gemeinsame Datenquelle für das Leistungs-Modal auf der Startseite
// (components/ServicesSection.tsx) und die Unterseiten unter
// app/leistungen/[slug]. Texte hier ändern — nie in einer der beiden
// Darstellungen einzeln.

export interface Service {
  id: number
  slug: string
  title: string
  subtitle: string
  description: string
  seoTitle: string
  seoDescription: string
  icon: ComponentType<{ className?: string }>
  image: string
  features: string[]
  price: string
  detailedDescription: string
  process: string[]
  benefits: string[]
  duration: string
  warranty: string
}

export const services: Service[] = [
  {
    id: 1,
    slug: 'auto-an-und-verkauf',
    title: 'AN- UND VERKAUF',
    subtitle: 'Autohandel',
    description: 'Wir kaufen Ihr Auto an oder nehmen es in Zahlung für ein Neues.',
    seoTitle: 'Auto An- und Verkauf in Oberhausen | KD-CAR',
    seoDescription:
      'Fairer Auto An- und Verkauf in Oberhausen: kostenlose Fahrzeugbewertung, technische Diagnose, Inzahlungnahme und schnelle, sichere Abwicklung bei KD-CAR.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: ['Schnelle Abwicklung', 'Garantie inklusive', 'Lieferung möglich'],
    price: 'ab €299',
    detailedDescription: 'Seriöser An- und Verkauf basiert auf Fakten: Deshalb durchläuft jedes Fahrzeug bei uns eine gründliche technische Analyse. Mit modernsten Diagnosegeräten ermitteln wir den exakten Zustand – das bedeutet für Sie: Faire Ankaufspreise und geprüfte Sicherheit beim Autokauf.',
    process: [
      'Kostenlose Fahrzeugbewertung',
      'Technische Diagnose und Zustandsprüfung',
      'Transparente Preisverhandlung',
      'Unkomplizierte Abwicklung',
      'Übergabe mit allen Dokumenten'
    ],
    benefits: [
      'Faire und marktgerechte Preise',
      'Geprüfte Gebrauchtfahrzeuge',
      'Inzahlungnahme möglich',
      'Schnelle und sichere Abwicklung'
    ],
    duration: '1-3 Tage',
    warranty: '1 Jahr'
  },
  {
    id: 2,
    slug: 'unfallinstandsetzung',
    title: 'UNFALLINSTANDSETZUNG',
    subtitle: 'Lackierung & Reparatur',
    description: 'Professionelle Fahrzeug-Instandsetzung mit modernsten Lackiertechniken und Smart Repair-Methoden für perfekte Ergebnisse.',
    seoTitle: 'Unfallinstandsetzung & Lackierung in Oberhausen | KD-CAR',
    seoDescription:
      'Unfallinstandsetzung in Oberhausen: Lackieren, Smart Repair und Gutachten aus einer Hand. Moderne Lackiertechniken und professionelle Aufbereitung bei KD-CAR.',
    icon: Palette,
    image: '/images/carwrap.jpg',
    features: ['Lackieren', 'Smart Repair', 'Gutachten', 'Professionelle Aufbereitung'],
    price: 'ab €150',
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
    duration: '2-3 Tage, bei größeren Arbeiten auch länger',
    warranty: 'garantiert saubere Arbeit'
  },
  {
    id: 3,
    slug: 'fahrzeugaufbereitung',
    title: 'FAHRZEUGAUFBEREITUNG',
    subtitle: 'Leasingrückläufer',
    description: 'Professionelle Aufbereitung für Leasingrückläufer – damit Ihr Fahrzeug bei der Rückgabe keine unnötigen Kosten verursacht.',
    seoTitle: 'Fahrzeugaufbereitung für Leasingrückläufer in Oberhausen | KD-CAR',
    seoDescription:
      'Professionelle Fahrzeugaufbereitung in Oberhausen: Innen- & Außenreinigung, Kratzerentfernung, Polster- und Lackaufbereitung – ideal vor der Leasingrückgabe.',
    icon: Car,
    image: '/images/body.jpg',
    features: ['Innen- & Außenreinigung', 'Kratzerentfernung', 'Polster- & Lederaufbereitung', 'Lackaufbereitung'],
    price: 'ab €100',
    detailedDescription: 'Bei der Leasingrückgabe zählt jedes Detail. Wir bereiten Ihr Fahrzeug so auf, dass es den strengen Prüfkriterien der Leasinggesellschaft standhält – und Sie teure Nachbelastungen vermeiden.',
    process: [
      'Zustandsanalyse und Dokumentation',
      'Professionelle Innen- und Außenreinigung',
      'Kratzer- und Dellenbehebung',
      'Polster-, Leder- und Kunststoffpflege',
      'Endkontrolle nach Leasingstandards'
    ],
    benefits: [
      'Vermeidung teurer Nachbelastungen',
      'Fahrzeug wie im Originalzustand',
      'Professionelle Dokumentation',
      'Stressfreie Leasingrückgabe'
    ],
    duration: '1-2 Tage',
    warranty: 'garantiert saubere Arbeit'
  },
  {
    id: 4,
    slug: 'beulendoktor',
    title: 'BEULENDOKTOR',
    subtitle: 'Dellenentfernung ohne Lackierung',
    description: 'Professionelle Dellenentfernung ohne Nachlackieren – schnell, schonend und kostengünstig mit der PDR-Methode.',
    seoTitle: 'Beulendoktor – Dellenentfernung ohne Lackieren | KD-CAR Oberhausen',
    seoDescription:
      'Beulendoktor in Oberhausen: Dellen, Hagelschäden und Parkdellen ohne Nachlackieren entfernen (PDR-Methode). Originallack bleibt erhalten – schnell und günstig.',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: ['Ohne Nachlackieren', 'Hagelschäden', 'Parkdellen', 'Originallack bleibt erhalten'],
    price: 'ab €30',
    detailedDescription: 'Mit der bewährten PDR-Methode (Paintless Dent Repair) entfernen wir Dellen und Beulen, ohne den Originallack Ihres Fahrzeugs zu beschädigen. Das spart Zeit, Geld und erhält den Wert Ihres Autos.',
    process: [
      'Begutachtung und Schadensanalyse',
      'Zugang zur Delle von der Rückseite',
      'Präzises Herausdrücken mit Spezialwerkzeug',
      'Feinarbeit und Kontrolle der Oberfläche',
      'Endkontrolle und Qualitätssicherung'
    ],
    benefits: [
      'Originallack bleibt erhalten',
      'Deutlich günstiger als Neulackierung',
      'Schnelle Bearbeitung',
      'Werterhalt des Fahrzeugs'
    ],
    duration: 'Je nach Umfang wenige Stunden bis 1 Tag',
    warranty: 'garantiert saubere Arbeit'
  },
  {
    id: 5,
    slug: 'felgenreparatur',
    title: 'FELGENREPARATUR',
    subtitle: 'Ohne Drehen',
    description: 'Professionelle Felgenreparatur ohne Abdrehen – Kratzer, Bordsteinschäden und Beschädigungen werden unsichtbar beseitigt.',
    seoTitle: 'Felgenreparatur ohne Abdrehen in Oberhausen | KD-CAR',
    seoDescription:
      'Felgenreparatur in Oberhausen ohne Abdrehen: Kratzer, Bordsteinschäden und Farbabplatzer fachgerecht aufbereitet – für alle Felgenarten, in wenigen Stunden.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1769899107195-aae414826ced?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: ['Ohne Abdrehen', 'Kratzer & Bordsteinschäden', 'Farbaufbereitung', 'Alle Felgenarten'],
    price: 'ab €99',
    detailedDescription: 'Unsere Felgenreparatur kommt ohne Abdrehen aus – das schont Material und Struktur Ihrer Felgen. Kratzer, Bordsteinschäden und Farbabplatzer werden fachgerecht aufgearbeitet, sodass Ihre Felgen wieder wie neu aussehen.',
    process: [
      'Schadensanalyse und Begutachtung',
      'Reinigung und Vorbereitung der Felge',
      'Professionelles Auffüllen und Glätten',
      'Farbanpassung und Lackierung',
      'Endkontrolle und Qualitätssicherung'
    ],
    benefits: [
      'Kein Abdrehen nötig',
      'Originalstruktur bleibt erhalten',
      'Schnelle Bearbeitung',
      'Deutlich günstiger als Neuanschaffung'
    ],
    duration: 'Wenige Stunden pro Felge',
    warranty: 'garantiert saubere Arbeit'
  },
  {
    id: 6,
    slug: 'autoglas',
    title: 'AUTOGLAS',
    subtitle: 'Reparatur & Austausch',
    description: 'Steinschlag, Risse oder kompletter Scheibentausch – wir reparieren und ersetzen Ihr Autoglas schnell und professionell.',
    seoTitle: 'Autoglas: Steinschlagreparatur & Scheibentausch | KD-CAR Oberhausen',
    seoDescription:
      'Autoglas-Service in Oberhausen: Steinschlagreparatur in ca. 30 Minuten, Scheibentausch für alle Fahrzeugtypen, auf Wunsch mit Versicherungsabwicklung.',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1676848649653-5b61b670a35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: ['Steinschlagreparatur', 'Scheibentausch', 'Alle Fahrzeugtypen', 'Versicherungsabwicklung'],
    price: 'ab €150',
    detailedDescription: 'Ob kleiner Steinschlag oder komplett beschädigte Windschutzscheibe – wir kümmern uns um die fachgerechte Reparatur oder den Austausch Ihres Autoglases. Auf Wunsch übernehmen wir auch die Abwicklung mit Ihrer Versicherung.',
    process: [
      'Schadensanalyse und Begutachtung',
      'Prüfung ob Reparatur oder Austausch nötig',
      'Professionelle Reparatur oder Einbau',
      'Kalibrierung der Fahrassistenzsysteme',
      'Endkontrolle und Qualitätssicherung'
    ],
    benefits: [
      'Schnelle Steinschlagreparatur',
      'Originalglas oder gleichwertig',
      'Versicherungsabwicklung möglich',
      'Alle Marken und Modelle'
    ],
    duration: 'Reparatur: ca. 30 Min. / Austausch: 2-3 Std.',
    warranty: 'garantiert saubere Arbeit'
  }
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}
