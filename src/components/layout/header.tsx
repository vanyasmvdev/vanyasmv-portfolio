'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Container } from './container';

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'ro', label: 'RO' },
  { code: 'ru', label: 'RU' },
] as const;

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t('about'), href: '#about' },
    { label: t('projects'), href: '#projects' },
    { label: t('contact'), href: '#contact' },
  ];

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <header
      role="banner"
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border-subtle'
          : 'bg-transparent'
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className={cn(
              'font-serif italic text-lg text-foreground transition-colors hover:text-accent',
              FOCUS_RING
            )}
          >
            vanyasmv
          </Link>

          <div className="flex items-center gap-6 md:gap-8">
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm text-muted-foreground transition-colors hover:text-foreground',
                    FOCUS_RING
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1.5">
              {LOCALES.map((loc, i) => (
                <span key={loc.code} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <span
                      className="text-muted-foreground/40 text-xs select-none"
                      aria-hidden="true"
                    >
                      ·
                    </span>
                  )}
                  <button
                    onClick={() => switchLocale(loc.code)}
                    aria-label={`Switch language to ${loc.label}`}
                    aria-pressed={locale === loc.code}
                    className={cn(
                      'text-xs uppercase tracking-wider transition-colors',
                      FOCUS_RING,
                      locale === loc.code
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {loc.label}
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
