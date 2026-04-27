import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { FadeIn } from '@/components/motion/fade-in';
import { cn } from '@/lib/utils';

export async function Hero() {
  const t = await getTranslations('home.hero');

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center py-20">
      <Container>
        <div className="max-w-3xl w-full">
          {/* Status row */}
          <FadeIn delay={0}>
            <div className="flex items-center gap-2 mb-8">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-status-online animate-pulse"
                aria-hidden="true"
              />
              <span className="text-sm text-muted-foreground">
                {t('status')}
              </span>
            </div>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05] text-foreground">
              {t('headlineGreeting')}
              <br />
              {t('headlinePart1')}{' '}
              <span className="font-serif italic font-normal text-accent">
                {t('headlineAccent')}
              </span>{' '}
              {t('headlinePart2')}
            </h1>
          </FadeIn>

          {/* Subhead */}
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-prose">
              {t('subhead')}
            </p>
          </FadeIn>

          {/* CTA row */}
          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg px-5 py-6 text-sm font-medium inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                )}
              >
                {t('ctaPrimary')}
                <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'border-border-subtle text-foreground hover:bg-white/5 rounded-lg px-5 py-6 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                )}
              >
                {t('ctaSecondary')}
              </a>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
