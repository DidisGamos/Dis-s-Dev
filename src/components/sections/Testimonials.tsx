import { Star, Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/lib/i18n";
import { getPublicTestimonials } from "@/lib/public-actions";

export function Testimonials() {
  const { t } = useLanguage();

  const { data: dbTestimonials } = useQuery({
    queryKey: ["public", "testimonials"],
    queryFn: () => getPublicTestimonials(),
  });

  const testimonialsList =
    dbTestimonials && dbTestimonials.length > 0
      ? dbTestimonials.map((item) => ({
          name: item.name,
          role: item.role,
          content: item.content,
          rating: item.rating,
        }))
      : t.testimonials.items;

  return (
    <section id="temoignages" className="relative py-24 md:py-32" aria-label="Avis et témoignages clients">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">{t.testimonials.badge}</p>
          <h2
            className="mt-3 text-4xl font-bold tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.testimonials.title}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonialsList.map((test, idx) => (
            <div
              key={`${test.name}-${idx}`}
              className="relative flex flex-col justify-between rounded-2xl border border-border glass p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-brand/30" />
                </div>
                <p className="mt-4 text-sm leading-relaxed italic text-foreground/90">
                  "{test.content}"
                </p>
              </div>

              <div className="mt-6 border-t border-border/50 pt-4">
                <div className="font-semibold text-foreground text-sm">{test.name}</div>
                <div className="text-xs text-muted-foreground">{test.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
