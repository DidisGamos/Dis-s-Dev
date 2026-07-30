import { useEffect, useState } from "react";
import { ArrowRight, Menu, X, Globe } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/lib/i18n";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#accueil", label: t.nav.home },
    { href: "#services", label: t.nav.services },
    { href: "#projets", label: t.nav.projects },
    { href: "#temoignages", label: t.nav.testimonials },
    { href: "#apropos", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

  const toggleLanguage = () => {
    setLang(lang === "fr" ? "en" : "fr");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
      >
        <a href="#accueil" className="shrink-0 focus:outline-none focus:ring-2 focus:ring-brand rounded-lg">
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:text-foreground focus:outline-none"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {/* Badge statut Disponibilité Projets */}
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{lang === "fr" ? "Disponible pour projets" : "Available for projects"}</span>
          </div>

          {/* Bouton Toggle Langue FR / EN */}
          <button
            onClick={toggleLanguage}
            aria-label="Changer la langue / Switch language"
            className="flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur transition-colors hover:border-brand/50 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <Globe className="h-3.5 w-3.5 text-brand" />
            <span className="font-mono tracking-wider">{lang === "fr" ? "FR" : "EN"}</span>
          </button>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-all hover:shadow-[var(--shadow-glow)] focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
          >
            {t.nav.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleLanguage}
            aria-label="Changer la langue"
            className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-foreground"
          >
            <Globe className="h-3.5 w-3.5 text-brand" />
            <span className="font-mono">{lang.toUpperCase()}</span>
          </button>

          <button
            type="button"
            className="rounded-md border border-border p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-brand"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground"
              >
                {t.nav.cta}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
