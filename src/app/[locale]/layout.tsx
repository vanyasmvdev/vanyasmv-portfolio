import type { Metadata } from 'next';
import { Geist, Instrument_Serif } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { SITE, OG_LOCALE, localeCanonical } from '@/lib/seo';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-serif',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const description = t('siteDescription');
  const canonical = localeCanonical(locale);
  const ogLocale = OG_LOCALE[locale] ?? 'en_US';

  const ogImageUrl = `/api/og?eyebrow=PORTFOLIO&title=${encodeURIComponent(SITE.defaultTitle)}&subtitle=${encodeURIComponent(description)}`;

  return {
    metadataBase: new URL(SITE.url),
    title: {
      template: `%s — ${SITE.name}`,
      default: SITE.defaultTitle,
    },
    description,
    alternates: {
      canonical,
      languages: {
        en: '/',
        ro: '/ro',
        ru: '/ru',
        'x-default': '/',
      },
    },
    openGraph: {
      title: SITE.defaultTitle,
      description,
      url: canonical,
      siteName: SITE.name,
      locale: ogLocale,
      type: 'website',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: SITE.defaultTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE.defaultTitle,
      description,
      creator: SITE.twitter,
      images: [ogImageUrl],
    },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${instrumentSerif.variable} dark h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          {/* Skip-to-content link — visible on keyboard focus only */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-accent focus:text-accent-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium focus:outline-none"
          >
            Skip to content
          </a>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
