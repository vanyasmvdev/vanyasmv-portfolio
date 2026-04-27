export const SITE = {
  name: 'Ion Smoleaninov',
  handle: 'vanyasmv',
  url: 'https://vanyasmvdev.com',
  defaultTitle: 'Ion Smoleaninov — Product-focused Developer',
  defaultDescription:
    'Portfolio of Ion Smoleaninov (vanyasmv) — I build modern websites and web apps with AI-assisted workflows. Available for freelance.',
  ogImage: '/api/og',
  twitter: '@vanyasmv',
  locales: ['en', 'ro', 'ru'] as const,
  defaultLocale: 'en' as const,
} as const;

export type Locale = (typeof SITE.locales)[number];

export const OG_LOCALE: Record<string, string> = {
  en: 'en_US',
  ro: 'ro_RO',
  ru: 'ru_RU',
};

export function localeCanonical(locale: string): string {
  return locale === SITE.defaultLocale ? '/' : `/${locale}`;
}

export function projectCanonical(locale: string, slug: string): string {
  return locale === SITE.defaultLocale
    ? `/projects/${slug}`
    : `/${locale}/projects/${slug}`;
}
