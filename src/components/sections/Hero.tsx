import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useLanguage } from "@/lib/i18n";

export function Hero() {
  const { t } = useLanguage();
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="accueil"
      className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20"
      aria-label="Section d'accueil"
    >
      {/* Background image + overlays avec parallaxe */}
      <div
        className="absolute inset-0 -z-10 transition-transform duration-75 ease-out"
        style={{ transform: `translateY(${offsetY * 0.25}px)` }}
      >
        <img
          src={heroBg}
          alt="Illustration technologique fond d'écran Dis's Dev"
          width={1920}
          height={1080}
          fetchPriority="high"
          loading="eager"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 grid-bg opacity-40" />

        {/* Floating particles */}
        <div className="absolute left-[10%] top-[30%] h-2 w-2 rounded-full bg-brand/70 animate-float" />
        <div
          className="absolute right-[15%] top-[50%] h-1.5 w-1.5 rounded-full bg-brand/60 animate-float"
          style={{ animationDelay: "1.2s" }}
        />
        <div
          className="absolute left-[30%] bottom-[20%] h-1 w-1 rounded-full bg-brand/80 animate-float"
          style={{ animationDelay: "2.4s" }}
        />

        {/* Radial glow */}
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center animate-reveal">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            <span>{t.hero.badge}</span>
          </div>

          <h1
            className="text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.hero.titleStart}
            <span className="text-gradient">{t.hero.titleGradient}</span>
            {t.hero.titleEnd}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground transition-all hover:shadow-[var(--shadow-glow)] focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-surface focus:outline-none focus:ring-2 focus:ring-brand"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          <p className="mt-12 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t.hero.tags}
          </p>
        </div>
      </div>
    </section>
  );
}
