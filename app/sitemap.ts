// app/sitemap.ts
import { MetadataRoute } from 'next'
import { NAV_LINKS, SITE_URL } from '@/constants'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = NAV_LINKS.map(link => ({
    url: `${SITE_URL}${link.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: link.href === '/' ? 1 : 0.8,
  }));
 
  return staticPages;
}