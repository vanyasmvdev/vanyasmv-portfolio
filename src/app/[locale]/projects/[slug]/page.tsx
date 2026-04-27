import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PROJECTS } from '@/content/projects';
import { SITE, projectCanonical } from '@/lib/seo';
import { Container } from '@/components/layout/container';
import { FadeIn } from '@/components/motion/fade-in';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

function StatusBadge({ status }: { status: 'live' | 'archived' | 'wip' }) {
  if (status === 'live') {
    return (
      <span className="border border-status-online text-status-online text-xs px-2.5 py-0.5 rounded-full">
        Live
      </span>
    );
  }
  if (status === 'wip') {
    return (
      <span className="border border-amber-500 text-amber-500 text-xs px-2.5 py-0.5 rounded-full">
        WIP
      </span>
    );
  }
  return (
    <span className="border border-muted-foreground text-muted-foreground text-xs px-2.5 py-0.5 rounded-full">
      Archived
    </span>
  );
}

const DECISION_KEYS = ['openrouter', 'sse', 'supabase'] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.name} — Case Study`;
  const description = project.description;
  const canonical = projectCanonical(locale, slug);
  const ogImageUrl = `/api/og?eyebrow=CASE+STUDY&title=${encodeURIComponent(project.name)}&subtitle=${encodeURIComponent(description)}`;

  return {
    metadataBase: new URL(SITE.url),
    title: { absolute: `${title} | ${SITE.handle}` },
    description,
    alternates: {
      canonical,
      languages: {
        en: `/projects/${slug}`,
        ro: `/ro/projects/${slug}`,
        ru: `/ru/projects/${slug}`,
        'x-default': `/projects/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      type: 'website',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: SITE.twitter,
      images: [ogImageUrl],
    },
  };
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const t = await getTranslations('projects');
  const s = project.slug as 'bromind';

  return (
    <main id="main-content" className="flex-1">
      <Container>
        {/* A. Back nav */}
        <FadeIn>
          <div className="mt-8">
            <Link
              href="/#projects"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
            >
              ← {t('backToProjects')}
            </Link>
          </div>
        </FadeIn>

        {/* B. Header block */}
        <FadeIn delay={0.05}>
          <div className="mt-8">
            <div className="flex items-center gap-3">
              <StatusBadge status={project.status} />
              <span className="text-muted-foreground/40 text-sm" aria-hidden="true">·</span>
              <span className="text-sm text-muted-foreground">{project.year}</span>
            </div>

            <h1 className="mt-4 text-5xl md:text-7xl font-medium tracking-tight text-foreground">
              {project.name}
            </h1>

            <p className="mt-3 text-xl md:text-2xl text-muted-foreground max-w-2xl leading-snug">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-accent-foreground px-5 py-3 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t('visitLive')} →
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border-subtle text-foreground hover:bg-white/5 px-5 py-3 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t('viewSource')} →
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              )}
            </div>
          </div>
        </FadeIn>

        {/* C. Preview area */}
        <FadeIn delay={0.1}>
          <div className="mt-12 aspect-video rounded-2xl border border-border-subtle bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
            {/* TODO: replace with real screenshot — add /public/projects/bromind-hero.png and use next/image */}
            <span className="font-serif italic text-6xl text-accent" aria-hidden="true">
              {project.name}
            </span>
          </div>
        </FadeIn>

        {/* D. Overview */}
        <FadeIn delay={0.15}>
          <div className="mt-24 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {t(`${s}.overview.label`)}
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground">
              {t(`${s}.overview.heading`)}
            </h2>
            <div className="mt-6 space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>{t(`${s}.overview.p1`)}</p>
              <p>{t(`${s}.overview.p2`)}</p>
            </div>
          </div>
        </FadeIn>

        {/* E. Stack */}
        <FadeIn delay={0.2}>
          <div className="mt-24 max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {t(`${s}.stack.label`)}
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground">
              {t(`${s}.stack.heading`)}
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.fullStack.map((group) => (
                <div
                  key={group.category}
                  className="border border-border-subtle rounded-xl p-5 bg-white/[0.02]"
                >
                  <p className="text-sm text-muted-foreground font-medium mb-3">
                    {group.category}
                  </p>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm text-foreground">
                        <span className="text-accent mr-1.5" aria-hidden="true">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* F. Technical decisions */}
        <FadeIn delay={0.25}>
          <div className="mt-24 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {t(`${s}.decisions.label`)}
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground">
              {t(`${s}.decisions.heading`)}
            </h2>
            <div className="mt-8">
              {DECISION_KEYS.map((key, i) => (
                <div
                  key={key}
                  className={i > 0 ? 'border-t border-border-subtle pt-6 mt-6' : ''}
                >
                  <p className="text-base font-medium text-foreground">
                    {t(`${s}.decisions.${key}.q`)}
                  </p>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {t(`${s}.decisions.${key}.a`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* G. Closing CTA */}
        <FadeIn delay={0.3}>
          <div className="mt-32 mb-32 max-w-xl mx-auto text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {t(`${s}.cta.label`)}
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-foreground">
              {t(`${s}.cta.heading`)}
            </h2>
            <p className="mt-3 text-muted-foreground">{t(`${s}.cta.subhead`)}</p>
            {project.liveUrl && (
              <div className="mt-8">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-accent text-accent-foreground px-5 py-3 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t('visitLive')} →
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </div>
            )}
            <div className="mt-4">
              <Link
                href="/#projects"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
              >
                {t(`${s}.cta.browseOther`)} →
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </main>
  );
}
