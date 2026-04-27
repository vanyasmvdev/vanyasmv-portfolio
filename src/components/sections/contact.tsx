import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/container';
import { FadeIn } from '@/components/motion/fade-in';

export async function Contact() {
  const t = await getTranslations('home.contact');

  return (
    <section id="contact" className="py-32">
      <Container>
        <FadeIn>
          <div className="max-w-xl mx-auto text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {t('label')}
            </p>

            <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-foreground">
              {t('headingPart1')}
              <br />
              <span className="font-serif italic font-normal text-accent">
                {t('headingAccent')}
              </span>
            </h2>

            <p className="mt-5 text-base text-muted-foreground max-w-md mx-auto">
              {t('subhead')}
            </p>

            <div className="mt-8">
              <a
                href={`mailto:${t('email')}`}
                className="inline-block bg-accent text-accent-foreground px-5 py-3 rounded-lg font-medium text-sm hover:bg-accent/90 transition-colors"
              >
                {t('email')} →
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <a
                href="https://github.com/vanyasmvdev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <span className="opacity-40">·</span>
              <a
                href="https://www.linkedin.com/in/vanyasmv/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <span className="opacity-40">·</span>
              <a
                href="https://t.me/vanyasmv"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Telegram
              </a>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
