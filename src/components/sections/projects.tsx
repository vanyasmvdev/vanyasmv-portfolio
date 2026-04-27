import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/container';
import { PROJECTS } from '@/content/projects';

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

export async function Projects() {
  const t = await getTranslations('home.projects');

  return (
    <section id="projects" className="py-20 md:py-32">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {t('label')}
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-foreground">
            {t('heading')}
          </h2>

          <div className="mt-10 space-y-6">
            {PROJECTS.map((project) => (
              <article
                key={project.slug}
                className="relative border border-border-subtle rounded-2xl p-6 bg-white/[0.02] hover:border-[#2a2a2a] transition-colors group"
              >
                {/* Preview area */}
                <div className="aspect-video rounded-xl border border-border-subtle bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
                  <span className="font-serif italic text-4xl text-accent">
                    {project.name}
                  </span>
                </div>

                {/* Header row — project name carries the stretched link */}
                <div className="flex items-start justify-between gap-3 mt-5 mb-2">
                  <h3 className="text-lg font-medium tracking-tight text-foreground">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="after:absolute after:inset-0 after:rounded-2xl after:content-['']"
                    >
                      {project.name}
                    </Link>
                  </h3>
                  <StatusBadge status={project.status} />
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4">
                  {t(`items.${project.slug as 'bromind'}.description`)}
                </p>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 border border-[#333] rounded-full text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Bottom row — z-10 floats above the stretched ::after */}
                <div className="relative z-10 flex items-center gap-4 text-xs">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {t('visit')} {new URL(project.liveUrl).hostname} →
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {t('caseStudy')} →
                  </Link>
                </div>
              </article>
            ))}

            {/* Coming soon placeholder */}
            <div className="border border-dashed border-border-subtle rounded-xl p-4 text-center text-sm text-muted-foreground">
              {t('comingSoon')}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
