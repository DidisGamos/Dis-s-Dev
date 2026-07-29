import { Facebook, Linkedin, Github } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-12" aria-label="Pied de page">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">
            {t.footer.tagline}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {[
            { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
            { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: Github, href: "https://github.com/DidisGamos/Dis-s-Dev", label: "GitHub" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:border-brand/50 hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
