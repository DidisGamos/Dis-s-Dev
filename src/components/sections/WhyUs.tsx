import { useEffect, useState, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

function AnimatedMetric({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const numericMatch = value.match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : null;

  useEffect(() => {
    if (targetNumber === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1600;
          const startTime = performance.now();

          const updateCount = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * targetNumber);

            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              setCount(targetNumber);
            }
          };

          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetNumber, hasAnimated]);

  if (targetNumber === null) {
    return <div>{value}</div>;
  }

  const formattedValue = hasAnimated ? value.replace(/\d+/, count.toString()) : value.replace(/\d+/, "0");

  return <div ref={elementRef}>{formattedValue}</div>;
}

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
                  <AnimatedMetric value={s.k} />
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
