import type { MetadataRoute } from 'next'
import { getInventoryCars } from '@/lib/carms'
import { services } from '@/lib/services'

const BASE_URL = 'https://www.kd-car.de'

// Fahrzeugbestand ändert sich — Sitemap täglich neu erzeugen.
export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/inventory`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/lackierung`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/leistungen`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...services.map<MetadataRoute.Sitemap[number]>((service) => ({
      url: `${BASE_URL}/leistungen/${service.slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    {
      url: `${BASE_URL}/impressum`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const { cars } = await getInventoryCars()
  const carRoutes: MetadataRoute.Sitemap = cars.map((car) => ({
    url: `${BASE_URL}/fahrzeuge/${car.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...carRoutes]
}
