import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/container';
import { FadeIn } from '@/components/motion/fade-in';
import { Stagger, StaggerItem } from '@/components/motion/stagger';

const SKILLS: { category: string; items: string[]; highlighted?: boolean }[] = [
  { category: 'frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'HTML/CSS'] },
  { category: 'cms', items: ['Shopify', 'WordPress', 'Liquid', 'SEO basics'] },
  { category: 'ai', items: ['Claude Code', 'Cursor', 'v0', 'Prompting'], highlighted: true },
  { category: 'tools', items: ['Git', 'Figma', 'VS Code', 'Vercel', 'Supabase'] },
];

type CategoryKey = 'frontend' | 'cms' | 'ai' | 'tools';

export async function Skills() {
  const t = await getTranslations('home.skills');

  return (
    <section id="skills" className="py-20 md:py-32">
      <Container>
        <div className="max-w-3xl">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {t('label')}
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-foreground">
              {t('heading')}
            </h2>
          </FadeIn>

          <Stagger className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILLS.map((card) => (
              <StaggerItem key={card.category}>
                <div className="border border-border-subtle rounded-xl p-5 bg-white/[0.02]">
                  <p className="text-sm text-muted-foreground font-medium mb-3">
                    {t(`categories.${card.category as CategoryKey}`)}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {card.items.map((item) => (
                      <span
                        key={item}
                        className={
                          card.highlighted
                            ? 'text-xs px-2.5 py-1 border border-accent rounded-full text-accent'
                            : 'text-xs px-2.5 py-1 border border-[#333] rounded-full text-foreground'
                        }
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
