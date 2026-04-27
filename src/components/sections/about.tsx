import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";

export async function About() {
  const t = await getTranslations("home.about");

  return (
    <section id="about" className="py-24 md:py-32">
      <Container>
        <FadeIn>
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {t("label")}
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-foreground">
              {t("heading")}
            </h2>
            <div className="mt-8 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
