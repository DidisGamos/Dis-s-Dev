import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/lib/i18n";
import { getPublicProcessSteps } from "@/lib/public-actions";

export function Process() {
  const { t } = useLanguage();

  const { data: dbSteps } = useQuery({
    queryKey: ["public", "process"],
    queryFn: () => getPublicProcessSteps(),
  });

  const stepsList =
    dbSteps && dbSteps.length > 0
      ? dbSteps.map((s) => ({ n: s.stepNumber, t: s.title, d: s.description }))
      : t.process.steps;

  return (
    <section className="relative py-16 md:py-20" aria-label="Notre processus de travail">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">{t.process.badge}</p>
          <h2
            className="mt-3 text-4xl font-bold tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.process.title}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t.process.subtitle}
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent md:block" />
          <div className="grid gap-8 md:grid-cols-4">
            {stepsList.map((s) => (
              <div key={s.n} className="relative flex flex-col items-start">
                <div className="grid h-16 w-16 place-items-center rounded-full border border-brand/40 bg-background text-lg font-bold text-brand shadow-md">
                  {s.n}
                </div>
                <h3 className="mt-6 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
