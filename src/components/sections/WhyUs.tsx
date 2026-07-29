import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function WhyUs() {
  const { t } = useLanguage();

  return (
    <section id="apropos" className="relative py-24 md:py-32" aria-label="Pourquoi nous choisir">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">{t.whyUs.badge}</p>
            <h2
              className="mt-3 text-4xl font-bold tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.whyUs.title}
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              {t.whyUs.subtitle}
            </p>

            <ul className="mt-8 space-y-3.5">
              {t.whyUs.advantages.map((a) => (
                <li key={a} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {t.whyUs.metrics.map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-border glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
              >
                <div
                  className="text-4xl font-bold tracking-tight text-brand md:text-5xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.k}
                </div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
