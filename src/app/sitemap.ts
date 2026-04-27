import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/content/projects';
import { SITE } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = SITE.locales;

  const homeEntries = locales.map((locale) => ({
    url: locale === SITE.defaultLocale ? SITE.url : `${SITE.url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1.0,
  }));

  const projectEntries = locales.flatMap((locale) =>
    PROJECTS.map((project) => ({
      url:
        locale === SITE.defaultLocale
          ? `${SITE.url}/projects/${project.slug}`
          : `${SITE.url}/${locale}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  return [...homeEntries, ...projectEntries];
}
