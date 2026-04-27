import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Container } from '@/components/layout/container';

export default async function LocaleNotFound() {
  const t = await getTranslations('notFound');

  return (
    <main
      id="main-content"
      className="flex-1 flex items-center justify-center py-32"
    >
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <p className="font-serif italic text-7xl md:text-8xl text-accent leading-none">
            404
          </p>
          <h1 className="mt-6 text-2xl md:text-3xl font-medium text-foreground">
            {t('title')}
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-sm mx-auto">
            {t('subhead')}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Link
              href="/"
              className="bg-accent text-accent-foreground px-5 py-3 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t('backHome')}
            </Link>
            <Link
              href="/#projects"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
            >
              {t('browseProjects')} →
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
