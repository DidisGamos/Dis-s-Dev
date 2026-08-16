import {
  Code2,
  Smartphone,
  Palette,
  TrendingUp,
  Bot,
  Globe,
  Shield,
  Zap,
  Database,
  Layout,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/lib/i18n";
import { getPublicServices } from "@/lib/public-actions";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Smartphone,
  Palette,
  TrendingUp,
  Bot,
  Globe,
  Shield,
  Zap,
  Database,
  Layout,
};

const defaultIconCycle = [Code2, Smartphone, Palette, TrendingUp, Bot];

export function Services() {
  const { t } = useLanguage();

  const { data: dbServices } = useQuery({
    queryKey: ["public", "services"],
    queryFn: () => getPublicServices(),
  });

  // Use dynamic DB services if available, otherwise fallback to i18n
  const servicesList =
    dbServices && dbServices.length > 0
      ? dbServices.map((s) => ({
          title: s.title,
          desc: s.description,
          details: s.details,
          iconName: s.icon,
        }))
      : t.services.items.map((s) => ({
          title: s.title,
          desc: s.desc,
          details: s.details,
          iconName: "Code2",
        }));

  return (
    <section id="services" className="relative py-16 md:py-20" aria-label="Nos services">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">{t.services.badge}</p>
          <h2
            className="mt-3 text-4xl font-bold tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.services.title}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t.services.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((s, i) => {
            const IconComponent =
              iconMap[s.iconName] || defaultIconCycle[i % defaultIconCycle.length];

            return (
              <div
                key={s.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border glass p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand/50"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/0 blur-2xl transition-all duration-500 group-hover:bg-brand/20" />
                <div className="relative">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <ul className="mt-5 space-y-2 border-t border-border/60 pt-4">
                    {s.details.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand transition-colors hover:underline"
                  >
                    {t.services.startProject} <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
